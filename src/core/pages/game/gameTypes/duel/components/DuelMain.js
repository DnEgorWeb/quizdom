import React, { Component } from 'react'
import e from '../../../../../../langs';
import { withRouter } from 'react-router-dom'

import url from '../../../../../../constants/urlConstants'
import TopBar from '../../../../../modules/components/GameResultsTopBar'

import {
    DecoratedLink,
    CountBlock,
    AdditionalButton,
    AdditionalButtonsWrapper,
    Title,
    Separator,
    Text,
    SectionButton
} from './styledComponents'

class DuelMain extends Component{
    constructor(props) {
        super(props)
        e.setLanguage(props.language)
    }
    
    componentWillReceiveProps(nextProps) {
        e.setLanguage(nextProps.language)
    }

    toInvitations = (type) => {
        if((type === 'user' && this.props.userInvitesCount) || (type === 'friends' && this.props.friendsInvitesCount)
            || (type === 'public' && this.props.publicGamesCount) || (type === 'public-mine' && this.props.createdPublicGamesCount)){
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
                    caption={e.game_duelle} />
                <DecoratedLink to={url.game.duel.creation}>
                    <SectionButton src='images/30010_START_Duel_Basic.png'>
                        <Title>{e.game_vsFriends}</Title>
                        <Separator />
                        <Text>
                            {e.game_duelOpen}
                        </Text>
                    </SectionButton>
                </DecoratedLink>
                <AdditionalButtonsWrapper>
                    <div>
                        <AdditionalButton onClick={() => this.toInvitations('user')}>
                            <img src='images/30010_START_Duel_Basic_to.png' alt="start"/>
                            <CountBlock width='110px' height='64px' active={this.props.userInvitesCount}>
                                {this.props.userInvitesCount}
                            </CountBlock>
                        </AdditionalButton>
                        <p>
                            <span>{e.game_invitations}</span> <br/>
                            {e.game_fromFriends}
                        </p>
                    </div>
                    <div>
                        <AdditionalButton onClick={() => this.toInvitations('friends')}>
                            <img src='images/30010_START_Duel_Basic_from.png' alt="start"/>
                            <CountBlock width='110px' height='64px' active={this.props.friendsInvitesCount} >
                                {this.props.friendsInvitesCount}
                            </CountBlock>
                        </AdditionalButton>
                        <p>
                            <span>{e.game_myInvitations}</span><br/>
                            {e.game_toFriends}
                        </p>
                    </div>
                </AdditionalButtonsWrapper>
                <DecoratedLink to={url.game.duel.all}>
                    <SectionButton src='images/30010_START_Duel_Basic_ALLE.png'>
                        <Title>{e.game_againstAll}</Title>
                        <Separator />
                        <Text>
                            {e.game_duelOpen}
                        </Text>
                    </SectionButton>
                </DecoratedLink>
                <AdditionalButtonsWrapper>
                    <div>
                        <AdditionalButton onClick={() => this.toInvitations('public')}>
                            <CountBlock width='310px' height='64px' active={this.props.publicGamesCount} >
                                {this.props.publicGamesCount}
                            </CountBlock>
                        </AdditionalButton>
                        <p>
                            <span>{e.game_openDuel}</span><br/>
                            {e.game_fromAll}
                        </p>
                    </div>
                    <div>
                        <AdditionalButton onClick={() => this.toInvitations('public-mine')}>
                            <img src='images/30010_START_Duel_Basic_to_world.png' alt="start"/>
                            <CountBlock width='110px' height='64px' active={this.props.friendsInvitesCount /* this.props.creatdPublicGamesCount */ } >
                                {this.props.friendsInvitesCount /* this.props.createdPublicGamesCount */}
                            </CountBlock>
                        </AdditionalButton>
                        <p>
                            <span>{e.game_myInvitations}</span> <br/>
                            {e.game_toAll}
                        </p>
                    </div>
                </AdditionalButtonsWrapper>
                <DecoratedLink to={url.game.duel.finished}>
                    <SectionButton src='images/30010_START_Duel_Basic_ERGEBNISSE.png'>
                        <Title>{e.game_results}</Title>
                        <Separator />
                        <Text>
                            {e.game_duelsEnded} | <span className='yellow'>{this.props.numberOfPlayedDuels}</span>
                        </Text>
                    </SectionButton>
                </DecoratedLink>
            </div>


        )
    }
}

export default withRouter(DuelMain)
