import React, { Component } from 'react'
import e from '../../../../../../langs';
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import moment from 'moment'

import TopBar from '../../../../../modules/components/GameResultsTopBar'
import { StartButton } from '../../quickgame/components/gameCategoryList/styledComponents'

import { Avatar } from './styledComponents'

export const Account = styled.div`
    font-family: Overpass, sans-serif;
    padding-top: 1rem;
    width: 640px;
    text-align: center;
    margin: auto;
    div{
        &:last-child{
            color: #b4b4b4;
            font-size: 30.4px;
        }
    }
`
export const AccountSumm = styled.div`
    font-size: 36.3px;
    color: #1ff2ff;
    font-weight: bold;
`
export const AccountSeparator = styled.div`
    margin: 3px 0;
    width: 640px;
    height: 2px;
    opacity: 0.2;
    background-color: #ffffff;
`
export const PlayersWrapper = styled.div`
    height: 160px;
    position: relative;
    margin: 40px auto;
    padding-top: 40px;
    width: 400px;
`
export const PlayerSeparator = styled.div`
    margin: auto;
    width: 320px;
    height: 96px;
    border-radius: 10px;
    div{
        height: 25px;
        border-top: 2px solid rgb(147, 147, 147);
        border-bottom: 1px solid black;
        &:first-child{
            background-image: linear-gradient(to bottom, rgb(71, 71, 74), rgb(67, 66, 69));
        }
        &:last-child{
            background-image: linear-gradient(to bottom, rgb(47, 45, 48), rgb(43, 40, 43));
        }
    }
    p{
        font-family: Overpass, sans-serif;
        margin: 0;
        height: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 38px;
        color: #1ff2ff;
    }
`
export const AvatarWrapper = styled.div`
    position: absolute;
    top: 0px;
    p{
        font-family: Overpass, sans-serif;
        font-size: 30px;
        color: #b4b4b4;
        text-align: center;
        margin-top: 10px;
    }
    &:first-child{
        left: -70px;
    }
    &:last-child{
        right: -70px;
    }
`
export const Section = styled.div`
    position: relative;
    background: ${props => props.background};
    height: ${props => props.height};
    z-index: ${props => props.zIndex};
    box-shadow: 0px 4px 8px 0 #000000;
`
export const Info = styled.div`
    text-align:center;
    padding: 20px 0;
    font-family: Overpass, sans-serif;
    position:relative;
    p{
        font-size: 32px;
        color: #e6e6e6;
        margin: 10px 0;
    }
`
export const GameInfo = styled.div`
    font-size: 40px;
    color: #1ff2ff;
`
export const Cost = styled.div`
    font-weight: bold;
    font-size: 56px;
    color: #ffe600;
`
export const Date = styled.div`
    font-size: 36px;
    color: #ffe600;
`
export const Attention = styled.div`
    font-family: Overpass, sans-serif;
    text-align: center;
    font-size: 32px;
    color: #e6e6e6;
    p{
        font-size: 36px;
        color: #e6e6e6;
        margin-bottom: 10px;
    }
`
export const StartButtonWrapper = styled.div`
    width: 340px;
    margin: auto;
    margin-top: 40px;
`
export const BottomBlock = styled.div`
    display: flex;
    margin: auto;
    width: 710px;
    height: 110px;
    margin-top: 34px;
    border-radius: 10px 10px 0 0;
    background-image: linear-gradient(to bottom, rgb(71,71,74), rgb(43,40,43));
`
export const BottomButton = styled.div`
    box-shadow: 0 4px 8px rgba(0,0,0,0.35);
    width: 50%;
    height: 100%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
        height: 42px;
    }
`

class InvitationInfo extends Component{
    constructor(props) {
        super(props)
        e.setLanguage(props.language)
    }

    state = {
        tryToplay: false
    }

    componentWillMount(){
        if(!this.props.selectedInvitation){
            this.props.goBack()
        }
        this.props.getBalance()
    }

    componentWillReceiveProps(nextProps){
        if(!nextProps.selectedInvitation){
            this.props.goBack()
        }

        e.setLanguage(nextProps.language)
    }

    getPayType = (type) => {
        switch(type){
            case 'BONUS':
                return 'BP'
            default:
                return ''
        }
    }

    getBalance = (type) => {
        switch(type){
            case 'MONEY':
                return this.props.balance.money;
            case 'BONUS' || 'BP':
                return this.props.balance.bonus;
            case 'CREDIT' || 'CR':
                return this.props.balance.credit;
            default:
                return ''
        }
    }

    acceptDuel = () => {
        const userBalance = this.getBalance(this.props.selectedInvitation.gameEntryFeeCurrency)
        const gameCost = this.props.selectedInvitation.gameEntryFeeAmount;

        if(userBalance < gameCost){
            if(!this.state.tryToPlay){
                window.notification.alert(e.game_note, e.game_youHaveTooFewBonusPoints, e.game_ok, () => {})
                this.setState({tryToPlay: true})
            }else{
                window.notification.confirm(e.game_note, e.game_yourBalanceIsNotSufficientWantToChargeNow, e.game_okCancel, (button) => {
                    if (Number(button) !== 2) {
                        this.props.history.push('/payment')
                    }
                })
            }
        }else{
            this.props.startDuel();
            // this.props.history.push(url.game.duel.gameStart)
        }
    }

    cancelInvitation = () => {
        window.notification.confirm(e.game_note, e.game_doYouWantToRemoveInvitation, e.game_yesNo,
            (button) => {
                if (Number(button) !== 2) {
                    this.props.respondToInvitation(false, this.props.selectedInvitation.multiplayerGameInstanceId)
                }
            })
    }

    render(){
        let selectedInvitation = this.props.selectedInvitation ? this.props.selectedInvitation : {}

        return(
            <div>
                <TopBar
                    leftButtonClickHandler={this.props.goBack}
                    rightButtonClickHandler={this.props.close}
                    caption={e.game_openDuel}
                />
                <Section background='#232324' height='445px' zIndex='3'>

                    <Account>
                        {
                            selectedInvitation.gameEntryFeeAmount ?
                                <AccountSumm>{this.getBalance(selectedInvitation.gameEntryFeeCurrency) + ' ' + this.getPayType(selectedInvitation.gameEntryFeeCurrency)}</AccountSumm>
                                :
                                <AccountSumm>{e.game_free}</AccountSumm>
                        }
                        <AccountSeparator />
                        <div>{e.game_bankBalance}</div>
                    </Account>

                    <PlayersWrapper>
                        <AvatarWrapper>
                            <Avatar img={`${window.config.urls.MEDIA_PROFILE_FOLDER_LINK}${this.props.userId}.jpg?crossorigin`}/>
                            <p>{this.props.userName}</p>
                        </AvatarWrapper>
                        <PlayerSeparator>
                            <div/>
                            <p>vs</p>
                            <div/>
                        </PlayerSeparator>
                        <AvatarWrapper>
                            <Avatar img={`${window.config.urls.MEDIA_PROFILE_FOLDER_LINK}${selectedInvitation.inviterId}.jpg?crossorigin`}/>
                            <p>{selectedInvitation.inviter ? selectedInvitation.inviter.nickname : ''}</p>
                        </AvatarWrapper>
                    </PlayersWrapper>
                </Section>
                <Section background='#3e3e3e' height='370px' zIndex='2'>
                    <Info>
                        <GameInfo>
                            {selectedInvitation.game ? selectedInvitation.game.title: ''} <br/>
                            {selectedInvitation.numberOfQuestions} {e.game_ask}
                        </GameInfo>
                        <p>{e.game_commitment}:</p>
                        <Cost>{(selectedInvitation.gameEntryFeeAmount || 'FREE') + ' ' + this.getPayType(selectedInvitation.gameEntryFeeCurrency)}</Cost>
                        <p>{e.game_openUntil}:</p>
                        <Date>{moment(selectedInvitation.expiryDateTime).format('dd | DD.MM.YYYY | HH:mm')} {e.game_clock}</Date>
                    </Info>
                </Section>
                <Attention>
                    <p>{e.game_doYouWantToAcceptTheDuel}</p>
                    {(selectedInvitation.gameEntryFeeAmount || 0) + ' ' + this.getPayType(selectedInvitation.gameEntryFeeCurrency)} {e.game_willBeBlocked}
                </Attention>
                <StartButtonWrapper>
                    <StartButton onClick={this.acceptDuel}>OK</StartButton>
                </StartButtonWrapper>
                <BottomBlock>
                    <BottomButton onClick={this.props.goBack}><img src='images/02_back_256.png' alt=''/></BottomButton>
                    <BottomButton onClick={this.cancelInvitation}><img src='images/DI_104_Take_Duell_from_FR.png' alt=''/></BottomButton>
                </BottomBlock>
            </div>
        )
    }
}

export default withRouter(InvitationInfo)
