import React, {Component} from 'react'
import e from '../../../../../langs'
import Avatar from '../../../components/ProfilePicture/ProfilePictureContainer'
import TopBar from '../../../components/GameResultsTopBar'

import Prize from '../Prize'

import {
    WrapperResults,
    Statistics,
    UserBlock,
    ScoreTable,
    Values,
    Properties,
    ReplayButton,
    Footer,
    RematchButton,
    ButtonBlock,
} from '../styledComponents'

import {
    DetailsPanelWrapper,
    DetailsPanelLabel,
    LeftPictureProfile,
    RightPictureProfile,
}                        from '../../../components/DuelComponents/DetailPanel/styledComponents'

// import {
//     DetailsPanel,
//     DetailsPanelLabel,
//     LeftPictureProfile,
//     RightPictureProfile,
// } from '../../../../pages/game/gameTypes/duel/components/CompletedGames/styledComponents'

export default class MainDuel extends Component {
    constructor(props) {
        super(props)
        e.setLanguage(props.language)
        props.initSolutions();
    }

    state = {
        isSecondPlayer: false
    }

    componentWillReceiveProps(nextProps) {
        e.setLanguage(nextProps.language)
    }
    
    componentWillMount() {
        this.props.initSolutions();
        // if (this.props.winningComponentId) {
        //     this.props.startWinningComponent(this.props.winningComponentId)
        // }
    }

    componentWillUnmount() {
        this.props.setDefaultMultiplayerResults()
    }

    startWinningComponent = () => {
        if(this.state.isSecondPlayer) {
        } else {
            this.props.startWinningComponent(this.props.winningComponentId)
        }
    }

    startGame = () => {
        if(this.props.results) {
            // this.props.closeGame() /* temporary */
            this.props.clearWinningComponent()
    
            const results           = this.props.results;
            const gameId            = results.gameId;
            // const multiplayerGameId = results.multiplayerResults && results.multiplayerResults.duelOpponentResults.gameId;
            // const id                = gameId || multiplayerGameId;
    
            if(this.props.loadGame) this.props.loadGame(gameId);
    
            // this.props.restartDuelGame(id);
            const needStartDuel = false;
            this.props.goToDuelCreation(needStartDuel);
        }
    }

    toggleSound = () => {
        localStorage.setItem('sound', !this.props.sound);
        this.props.toggleSound()
    }

    getGameResults = (results) => {
        const resultItems = results && results.resultItems;
        let rightAnswersAmount = 0, questionsAmount = 0, bonusesEarned = 0

        if (resultItems) {
            resultItems.forEach(result => {
                const {amount} = result
                switch (result.resultType) {
                    case "totalQuestions":
                        questionsAmount = amount;
                        break;
                    case "correctAnswers":
                        rightAnswersAmount = amount;
                        break;
                    case "bonusPoints":
                        bonusesEarned = amount;
                        break;
                    default: return;
                }
            })
        }
        return {rightAnswersAmount, questionsAmount, bonusesEarned}
    }

    render() {
        const {
                  sound,
                  close,
                  goToDuelCreation,
                  isSpinnerPlayed
              } = this.props
        const {
                  rightAnswersAmount,
                  questionsAmount,
              } = this.getGameResults(this.props.results)

        // const isDuel           = (this.props.gameType === "Duel")
        const playerUserId        = this.props.multiplayerResults ? this.props.multiplayerResults.playerResults.userId : '';
        const duelOpponentResults = this.props.multiplayerResults && this.props.multiplayerResults.duelOpponentResults;
        const opponentUserId      = duelOpponentResults ? duelOpponentResults.userId : '';
        const localUserIdImg      = localStorage.getItem('avatarImage');
        const playerImageUrl      = `${this.props.cdnMedia}profile/${(localUserIdImg || `${playerUserId}.jpg`)}`;
        const opponentImageUrl    = `${this.props.cdnMedia}profile/${opponentUserId}.jpg`;
        const {gameId}            = this.props

        // + "?" + Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, 5);
        return(
            <WrapperResults>
                <TopBar
                    caption={`DUELL Ergebnis`}
                    leftButtonPictureSrc={`images/${sound ? "sound.png" : "sound-no.png"}`}
                    leftButtonClickHandler={this.toggleSound}
                    rightButtonClickHandler={close}/>
                <Statistics>
                    <UserBlock>
                        <Avatar size={230}/>
                        {this.props.isRegistered ?
                            <p style={{ textOverflow: 'ellipsis', overflow: 'hidden', width: 650 }}>{`${this.props.firstName || this.props.nickname} ${this.props.lastName || ""}`}</p>
                            :
                            <p>{e.game_guest}</p>
                        }
                    </UserBlock>
                    <ScoreTable>
                        <Values>
                            <span>{rightAnswersAmount}</span>
                            <span>{questionsAmount}</span>
                        </Values>
                        <Properties>
                            <span>{e.game_correct}</span>
                            <span>{e.game_from}</span>
                        </Properties>
                    </ScoreTable>
                </Statistics>
                <DetailsPanelWrapper onClick={() => this.props.toggleComponent('showDetails')}>
                    <LeftPictureProfile
                        type={this.props.multiplayerResults ? this.props.multiplayerResults.playerResults.gameOutcome : ''}
                        imgSrc={playerImageUrl}
                    />
                    <DetailsPanelLabel style={{color: 'rgb(31,242,255)'}}>{e.game_details}</DetailsPanelLabel>
                    <RightPictureProfile
                        type={this.props.multiplayerResults ? (duelOpponentResults && duelOpponentResults.gameOutcome) : ''}
                        imgSrc={opponentImageUrl}
                    />
                </DetailsPanelWrapper>
                <Prize isDuel={false}
                       toggleComponent={this.props.toggleComponent}
                       freeWinningComponent={this.props.freeWinningComponent}
                       isSpinnerPlayed={isSpinnerPlayed}
                       clearWinningComponents={this.props.clearWinningComponents}
                       gameId={gameId}
                       startWinningComponent={this.startWinningComponent} />
                <ButtonBlock>
                    <ReplayButton onClick={goToDuelCreation.bind(this, false)}>
                        <img src="images/back_arrow.png" alt="arrow"/>
                    </ReplayButton>
                    <RematchButton
                        onClick={goToDuelCreation}
                    >
                        {e.game_rematch}
                    </RematchButton>
                </ButtonBlock>
                <Footer>
                    <span onClick={() => this.props.toggleComponent('showDetails')}>{e.game_details}</span>
                    <span onClick={this.props.close}>{e.game_home}</span>
                    <span onClick={() => this.props.toggleComponent('showSolutions')}>{e.game_solutions}</span>
                </Footer>
            </WrapperResults>
        )
    }
}
