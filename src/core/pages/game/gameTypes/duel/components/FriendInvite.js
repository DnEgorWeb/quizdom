import React, { Component } from 'react'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

import url from '../../../../../../constants/urlConstants'
import e   from "../../../../../../langs";

const GameAvatar = styled.div`
    display: flex;
    justify-content:center;
    align-items: center;
    width: 180px;
    height: 120px;
    border-radius: 6px;
    background-color: #1ff2ff;
    box-shadow: inset 4.1px 2.9px 9px 0 rgba(0, 0, 0, 0.7);
    img{
        width: 100px;
        height: 95px
    }
`

const InviteWrapper = styled.div`
    cursor: pointer;
    display: flex;
    justify-content:space-around;
    align-items: center;
    margin-top: 20px;
    width: 750px;
    height: 200px;
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

class FriendsInvite extends Component{
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
                return 'BP'
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
                <GameAvatar><img src={'images/pool_icons/' + this.props.data.game.assignedPoolsIcons[0] + '.svg'} alt=''/></GameAvatar>
                <DuelInfo>
                    <p>{opponentName}</p>
                    <p>{this.props.data.numberOfQuestions} | {this.props.data.gameTitle}</p>
                    <p className='payment'>{this.props.data.gameEntryFeeAmount ? this.props.data.gameEntryFeeAmount + ' ' + this.getPayType(this.props.data.gameEntryFeeCurrency) : 'FREE'}</p>
                    <p>{moment(this.props.data.expiryDateTime).format('dd | DD.MM.YYYY | HH:mm')} Uhr</p>
                </DuelInfo>
                <ToGame>
                    <img src='images/my-winnings-arrow.png' alt=''/>
                </ToGame>

            </InviteWrapper>
        )
    }
}

export default withRouter(FriendsInvite)
