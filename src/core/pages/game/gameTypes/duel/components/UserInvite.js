import React, { Component } from 'react'
import e from '../../../../../../langs';
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import moment from 'moment'

import url from '../../../../../../constants/urlConstants'
import { Avatar } from './styledComponents'

const InviteWrapper = styled.div`
    cursor: pointer;
    display: flex;
    justify-content:space-around;
    align-items: center;
    margin-top: 20px;
    width: 750px;
    //height: 200px;
    background-color: #3e3e3e;
`


const DuelInfo = styled.div`
    font-family: Overpass, sans-serif;
    font-size: 28px;
    color: #e6e6e6;
    width: 400px;
    p{
        margin: 0px;
    }
    .payment{
        font-family: Overpass, sans-serif;
        color: #1ff2ff;
        font-size: 42px;
        font-weight: bold;
    }
`
const ToGame = styled.div`
    padding-bottom: 80px;
    margin-right: 30px;
    img{
        width: 25px;
    }
`

class Invite extends Component{
    constructor(props) {
        super(props)
        e.setLanguage(props.language)
    }
    
    componentWillReceiveProps(nextProps) {
        e.setLanguage(nextProps.language)
    }

    toInvitationinfo = () => {
        const invitations = this.props.invitations || [];
        const selectedGameMultiInstansId = this.props.data.multiplayerGameInstanceId;
        let game = {};

        invitations.forEach(item => {
            if(item.multiplayerGameInstanceId === selectedGameMultiInstansId) {
                game = item;
            }
        })

        if (game.status !== 'DELETED') {
            this.props.selectInvitation(selectedGameMultiInstansId);
            this.props.startDuel(() => {
                this.props.history.push(url.payment.index)
            });
        } else {
            window.notification.confirm(e.game_note, e.game_thisDuelHasAlreadyBeenAcceptedByAnotherPlayer, e.game_okCancel, (button) => {
                if (Number(button) !== 2) {
                    game.needSetEnemy = true;
                    localStorage.setItem('lastGame', JSON.stringify(game));
                    this.props.history.push(url.game.duel.creation);
                }
            })
        }
    }

    getPayType = (type) => {
        switch(type){
            case 'BONUS':
                return 'BP';
            case 'CREDIT':
                return 'CR';
            case 'MONEY':
                return '€';
            default:
                return ''
        }
    }

    render(){
        const opponentName = this.props.data.creator.firstName ?
                             `${this.props.data.creator.firstName} ${this.props.data.creator.lastName}` :
                             this.props.data.creator.nickname;

        return(
            <InviteWrapper onClick={this.toInvitationinfo}>
                <Avatar img={`${window.config.urls.MEDIA_PROFILE_FOLDER_LINK}${this.props.data.inviter.userId}.jpg`} />
                <DuelInfo>
                    <p style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{opponentName}</p>
                    <p>{this.props.data.numberOfQuestions} | {this.props.data.gameTitle}</p>
                    <p className='payment'>{
                        this.props.data.gameEntryFeeAmount ?
                            this.props.data.gameEntryFeeAmount + ' ' + this.getPayType(this.props.data.gameEntryFeeCurrency)
                            :
                            e.game_free
                    }</p>
                    <p>{moment(this.props.data.expiryDateTime).format('dd | DD.MM.YYYY | HH:mm')} {e.game_clock}</p>
                </DuelInfo>
                <ToGame>
                    <img src='images/my-winnings-arrow.png' alt=''/>
                </ToGame>

            </InviteWrapper>
        )
    }
}

export default withRouter(Invite)
