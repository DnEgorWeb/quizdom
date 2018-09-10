import React, { Component, Fragment } from 'react'
import e from '../../../../../../langs';
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import TopBar from '../../../../../modules/components/GameResultsTopBar'
import UserInvite from './UserInvite'
import FriendInvite from './FriendInvite'
import InfoPanel from './DuelCreation/Main/infoPanel'
import DuelsFromAllSettings from './DuelsFromAllSettings'

import {
    CountBlock,
    AdditionalButton,
    AdditionalButtonsWrapper,
} from './styledComponents'
import url from "../../../../../../constants/urlConstants";

const InvitesList = styled.div`
    height: 1000px;
    overflow: hidden;
`
const InvitesListWrapper = styled.div`
    height: 100%;
    overflow: auto;
    width: 102%;
`


class Invitations extends Component{
    constructor(props) {
        super(props);
        props.initInvitations();
        props.getBalance();
        e.setLanguage(props.language);
    }

    state = {
        invitesType: '',
        publicType: 'random',
        settingsOpened: false,
        filter: {
            amount: 0,
            currency: '',
            numberOfQuestion: 0,
            pools: []
        },
        prevFilter: {
            amount: 0,
            currency: '',
            numberOfQuestion: 0,
            pools: []
        }
    }

    componentWillReceiveProps(props) {
        const invitesType = this.getInvitesType(props)
        this.setState({invitesType: invitesType})
        e.setLanguage(props.language);
    }

    componentWillMount(){
        const invitesType = this.getInvitesType()
        this.setState({invitesType: invitesType})
        if(invitesType === 'public'){
            // большой костыль, так как для публичных и приватных игр разные методы запуска :\
            this.props.setGameType('public')
        }else{
            this.props.setGameType('private')
        }
    }

    getThreeRandomGames = () => {
        let invites = [...this.props.publicGames]

        let selectedInvites = []

        function getRandomArbitrary(max) {
          return Math.floor(Math.random() * (max - 0) + 0);
        }

        while(selectedInvites.length !== (this.props.publicGames.length >= 3 ? 3 : this.props.publicGames.length)){
            let selectedNumber = getRandomArbitrary(this.props.publicGames.length)
            let invite = invites[selectedNumber]
            if(invite){
                selectedInvites.push(invites[selectedNumber])
                invites.splice(selectedNumber, 1)
            }
        }
        return selectedInvites
    }

    getInvitesList = () => {
        const invitesType = this.state.invitesType

        const Invite = (invitesType === 'user' || invitesType === 'public') ? UserInvite : FriendInvite
        let invites = []
        if(invitesType === 'user'){
            invites = this.props.userInvites
        }else if(invitesType === 'public'){
            if(this.state.publicType === 'random'){
                invites = this.getThreeRandomGames()
            }
            if(this.state.publicType === 'filtered'){
                invites = this.props.publicGames
                const {numberOfQuestion, pools, amount, currency} = this.state.filter;
                if (numberOfQuestion > 0) {
                    invites = invites.filter(game => {
                        return game.numberOfQuestions === numberOfQuestion;
                    })
                }
                if (pools.length > 0) {
                    invites = invites.filter(invite => {
                        return invite.game.assignedPools.every(id => ~pools.indexOf(parseInt(id, 10)))
                    })
                }
                if (currency && currency !== 'NON') {
                    invites = invites.filter(invite => {
                        return invite.entryFeeCurrency === currency && parseInt(invite.entryFeeAmount, 10) <= amount
                    })
                } else if (currency === 'NON') {
                    invites = invites.filter(invite => {
                        return parseInt(invite.entryFeeAmount, 10) === 0
                    })
                }
            }
        }else if('public-mine'){
            invites = this.props.createdPublicGames
        }else{
            invites = this.props.friendsInvites
        }

        invites.sort((a, b) => {
            const arrA = a.expiryDateTime.split(/[T\-:Z]/ig);
            const arrB = b.expiryDateTime.split(/[T\-:Z]/ig);
            const duelAEndDate = new Date(arrA[0],arrA[1],arrA[2],arrA[3],arrA[4]);
            const duelBEndDate = new Date(arrB[0],arrB[1],arrB[2],arrB[3],arrB[4]);

            return duelAEndDate.getTime() > duelBEndDate.getTime();
        });

        invites = invites.filter(item => !(item.status === "DELETED"));

        let InvitesList = invites.map((item) => {
            return (
                <Invite
                    selectInvitation={this.props.selectInvitation}
                    startDuel={this.props.startDuel}
                    key={'item' + item.multiplayerGameInstanceId}
                    data={item}
                    language={this.props.language}
                    invitations={this.props.invitations}
                />
            )
        })
        return InvitesList
    }

    getInvitesType = (props) => {
        const params = new URLSearchParams((props && props.location.search) || this.props.location.search);
        const type = params.get('type');
        return type
    }

    closeSettings = () => {
        this.setState({settingsOpened: false})
    }

    changePrevFilter = (prop, value) => {
        this.setState(({prevFilter}) => ({prevFilter: {...prevFilter, [prop]: value}}))
    }

    okButtonClickHandler = () => {
        this.setState(({prevFilter}) => ({filter: {...prevFilter}}))
    }

    switchInvitesType = (newInvitesType) => {
        this.setState({invitesType: newInvitesType})
    }

    toInvitations = (type) => {
        const {
                  userInvitesCount,
                  friendsInvitesCount,
                  publicGamesCount,
                  createdPublicGamesCount
        } = this.props;

        if(
           (type === 'user'        && userInvitesCount) ||
           (type === 'friends'     && friendsInvitesCount) ||
           (type === 'public'      && publicGamesCount) ||
           (type === 'public-mine' && createdPublicGamesCount)
        ){
            this.props.history.push(url.game.duel.invitations + '?type=' + type)
        }else{
            window.notification.alert(e.game_note, e.game_thereAreNoContents, e.game_ok, () => {})
        }
    }

    render(){
        return(
            <div>
                <TopBar
                    leftButtonClickHandler={this.props.goBack}
                    rightButtonClickHandler={this.props.close}
                    caption={e.game_openDuel} />
                <AdditionalButtonsWrapper>
                    <div>
                        {
                            (this.state.invitesType === 'public' || this.state.invitesType === 'public-mine') ?
                            <Fragment>
                                <AdditionalButton onClick={() => this.toInvitations('public')}>
                                    <CountBlock width='310px' height='64px' active={this.state.invitesType === 'public'} >
                                        {this.props.numberOfPublicDuels}
                                    </CountBlock>
                                </AdditionalButton>
                                <p className={this.getInvitesType() === 'public' ? 'active' : ''}>
                                    <span>{e.game_openDuel}</span> <br/>
                                    {e.game_something}
                                </p>
                            </Fragment>
                            :
                            <Fragment>
                                <AdditionalButton onClick={() => this.toInvitations('user')}>
                                    <img
                                        src={(this.getInvitesType() === 'user' && this.props.userInvitesCount)?
                                                'images/DI_102_Duell_INV.png' : 'images/30010_START_Duel_Basic_to.png'}
                                        alt="duel"
                                    />
                                    <CountBlock width='110px' height='64px' active={this.state.invitesType === 'user' && this.props.userInvitesCount}>
                                        {this.props.userInvitesCount}
                                    </CountBlock>
                                </AdditionalButton>
                                <p className={(this.getInvitesType() === 'user' && this.props.userInvitesCount )? 'active' : ''}>
                                    <span>{e.game_invitations}</span> <br/>
                                    {e.game_fromFriends}
                                </p>
                            </Fragment>
                        }
                    </div>
                    <div>
                        <AdditionalButton onClick={() => this.toInvitations(this.getInvitesType() === 'public' ? 'public-mine' : 'friends')}>
                            <img
                                 src={this.getInvitesType() === 'friends' ? 'images/DI_103_Duell_INV_to_FR.png' : 'images/30010_START_Duel_Basic_from.png'}
                                 alt="duel"
                             />
                            <CountBlock width='110px' height='64px' active={this.state.invitesType === 'friends' || this.state.invitesType === 'public-mine'} >
                                {this.props.friendsInvitesCount}
                            </CountBlock>
                        </AdditionalButton>
                        <p className={(this.state.invitesType === 'friends' || this.state.invitesType === 'public-mine') ? 'active' : ''}>
                            <span>{e.game_myInvitations}</span><br/>
                            {e.game_toFriends}
                        </p>
                    </div>
                </AdditionalButtonsWrapper>
                {
                    this.state.invitesType === 'public' ?
                    <AdditionalButtonsWrapper>
                        <div>
                            <AdditionalButton onClick={() => {
                                this.setState({publicType: 'random'})
                                this.forceUpdate()
                            }} style={{width: '200px'}}>
                                <img
                                     src={this.state.publicType !== 'random' ? 'images/33000_Open_Duels_From_ALL.png' : 'images/33000_Open_Duels_From_ALL (3).png'}
                                     alt="duel"
                                 />
                            </AdditionalButton>
                            <p className={this.getInvitesType() === 'friends' ? 'active' : ''}>
                                <span>{e.formatString(e.game_chooseRandomly,<br/>)}</span>
                            </p>
                        </div>
                        <div>
                            <AdditionalButton onClick={() => {
                                this.setState({publicType: 'filtered'})
                                this.forceUpdate()
                            }} style={{width: '200px'}}>
                                <img
                                     src={ this.state.publicType !== 'filtered' ? 'images/33000_Open_Duels_From_ALL (1).png' : 'images/33000_Open_Duels_From_ALL (5).png'}
                                     alt="duel"
                                 />
                            </AdditionalButton>
                            <p className={this.getInvitesType() === 'friends' ? 'active' : ''}>
                                <span>{e.formatString(e.game_myChoiceEnd,<br/>)}</span>
                            </p>
                        </div>
                        <div>
                            <AdditionalButton style={{width: '200px'}} onClick={() => {this.setState({settingsOpened: true})}}>
                                <img
                                     src={'images/33000_Open_Duels_From_ALL (2).png'}
                                     alt="duel"
                                 />
                            </AdditionalButton>
                            <p className={this.getInvitesType() === 'friends' ? 'active' : ''}>
                                <span>{e.formatString(e.game_changeSelection,<br/>)}</span>
                            </p>
                        </div>
                    </AdditionalButtonsWrapper>
                    :
                    null
                }
                <InvitesList>
                    <InvitesListWrapper>
                        {this.getInvitesList()}
                    </InvitesListWrapper>
                </InvitesList>
                <InfoPanel
                    isOpen={this.state.settingsOpened}
                    onCloseHandler={this.closeSettings}
                    title={e.game_myChoice}
                    imgSrc='images/06_Clear_all.png'
                    noInfoBlock
                    onOkButtonClick={this.okButtonClickHandler}
                    component={
                        <DuelsFromAllSettings
                            poolList={this.props.poolList}
                            changePrevFilter={this.changePrevFilter}
                            getPoolList={this.props.getPoolList}
                            language={this.props.language}
                        />
                    }
                />
            </div>
        )
    }
}

export default withRouter(Invitations)
