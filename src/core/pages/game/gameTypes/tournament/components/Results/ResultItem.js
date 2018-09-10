import React, {Component} from 'react'
import e from '../../../../../../../langs';
import moment from "moment"
import styled from 'styled-components'
import {
    DuelResultItemWrapper,
    DetailsPanel,
    DetailsPanelLabel,
    DuelRate,
    DuelDate,
    DuelGameTitle,
    // RemoveButton,
} from "../../../duel/components/CompletedGames/styledComponents"

const PictureProfile = styled.div`
  width: 176px;
  height: 176px;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  background-color: rgb(71, 71, 71);
  border: 8px solid ${({type}) => {
    switch (type) {
        case 'TIE':
            return 'grey' 
        default:
            return 'rgb(54, 165, 0)' //green
    }
}};
  border-radius: 50%;
  box-sizing: border-box;
  &:before {
    content: '';
    width: 78px;
    height: 64px;
    position: absolute;
    left: -38px;
    top: -38px;
    background: url('images/duel-crown.png') center no-repeat;
    display: ${({type}) => type === 'VICTORY' ? 'block' : 'none' };
  }
  &:after {
    content: '';
    width: 146px;
    height: 146px;
    border-radius: 50%;
    background-size: cover/*146px*/;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(${({imgSrc}) => imgSrc ? imgSrc : ''}), url('images/Anonymus.png');
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

const LeftPictureProfile = styled(PictureProfile)`
  left: -126px;
`

const RightPictureProfile = styled.div`
    width: 200px;
    height: 200px;
    position: absolute;
    top: -40px;
    right: -155px;
    background: url(${({gameStatus}) => gameStatus==="TOURNAMENT" ? "images/tournament_finish.png" : "images/tournament-alarm.png"}) center no-repeat;}
`

class ResultItem extends Component {
    constructor(props) {
        super(props);
        if(props.language) e.setLanguage(props.language);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.language) e.setLanguage(nextProps.language);
    }

    removeTournament = (tournament) => {
        window.notification.confirm(
            e.game_Attention,
            e.game_areYouSureYouWannaDeleteThisTournament,
            e.game_okCancel,
            () => {}
        )
    }

    didUserWin = () => {
        if (this.props.tournament.gameOutcome === "win") {
            return "VICTORY"
        }
        if (this.props.tournament.gameOutcome === "lose") {
            return "LOSE"
        }
        return "TIE"
    }

    getGameStatus = () => {
        return this.props.tournament.gameType
    }

    render() {
        const dateObj = moment(this.props.tournament.game.endDateTime);
        // const day     = dateObj.format('dd');
        const date    = dateObj.format('DD.MM.YYYY');
        const time    = dateObj.format('kk:mm');
    
        const gameStatus           = this.getGameStatus();
        const localUserIdImg       = localStorage.getItem('avatarImage');
        const { userId, cdnMedia } = this.props;
        const profilePicture       = `${cdnMedia}profile/${(localUserIdImg || `${userId}.jpg`)}`;

        const didUserWin= this.didUserWin();

        return (
            <DuelResultItemWrapper>
                <DetailsPanel>
                    <LeftPictureProfile
                        type={didUserWin}
                        imgSrc={profilePicture}
                    />
                    <DetailsPanelLabel onClick={() => this.props.showResult(this.props.tournament)}>details</DetailsPanelLabel>
                    <RightPictureProfile
                        gameStatus={gameStatus}
                        imgSrc=""
                    />
                </DetailsPanel>
                <DuelRate>{gameStatus}</DuelRate>
                <DuelDate>
                    {`${date} | ${time} Uhr`}
                </DuelDate>
                <DuelGameTitle>{this.props.tournament.game.title}</DuelGameTitle>
            </DuelResultItemWrapper>
        )
    }
}

export default ResultItem