import React, {Component} from 'react'
import e from '../../../../../langs'
import styled from 'styled-components'
import Avatar from '../../../components/ProfilePicture/ProfilePictureContainer'
import TopBar from '../../../components/GameResultsTopBar'
import convertNumber from '../../../../../services/convertNumber'

import Prize from '../Prize'

import {
    WrapperResults,
    Statistics,
    UserBlock,
    ScoreTable,
    Values,
    Properties,
    BonusPoints,
    Amount,
    Footer,
}                from '../styledComponents'
// import gameTypes from "../../../../../constants/gameTypes";

const ReplayButton = styled.div`
  cursor: pointer;
  width: 105px;
  margin-top: 50px;
  margin-left: 310px;
`

export default class MainSingle extends Component {
    constructor(props) {
        super(props)
        e.setLanguage(props.language)

        if(props.resultGameId) props.getGame(props.resultGameId);
    }

    state = {
        isSecondPlayer: false
    }
    
    componentWillReceiveProps(nextProps) {
        e.setLanguage(nextProps.language)
        if (!nextProps.spinnerDelayed && (nextProps.winningComponentIdForDuelSecondPlayer !== this.props.winningComponentIdForDuelSecondPlayer)) {
            this.setState({ isSecondPlayer: true });
            //this.props.startWinningComponent(nextProps.winningComponentIdForDuelSecondPlayer)
        }
    }
    
    componentWillMount() {
        this.props.initSolutions()
        if (this.props.winningComponentId) {
            // this.props.startWinningComponent(this.props.winningComponentId)
        }
    }

    startWinningComponent = () => {
        if(this.state.isSecondPlayer) {
            this.props.startWinningComponent(this.props.winningComponentIdForDuelSecondPlayer);
        } else {
            this.props.startWinningComponent(this.props.winningComponentId);
        }
    }

    startGame = () => {
        const gameId = this.props.results && this.props.results.gameId
        const lastGameOptions = JSON.parse(localStorage.getItem('lastGameOptions'));

        this.saveSpiner();

        if(lastGameOptions && gameId) {
            this.props.restartGame(gameId, lastGameOptions.trainingMode, lastGameOptions.numberOfQuestions);
        } else {
            this.props.closeGame();
            this.props.clearWinningComponent()
        }
    }

    toggleSound = () => {
        localStorage.setItem('sound', !this.props.sound);
        this.props.toggleSound()
    }

    getGameResults = (results) => {
        const resultItems = results && results.resultItems
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
                    default: return false;
                }
            })
        }
        return {rightAnswersAmount, questionsAmount, bonusesEarned}
    }

    saveSpiner = () => {
        const {gameInstanceId} = this.props;
        const {spinner}        = this.props;
        const spinnerType      = spinner && spinner.type;

        if (gameInstanceId && spinnerType) {
            this.props.assignWinningComponent(gameInstanceId, spinnerType);
        } else {
            console.log(gameInstanceId && spinnerType);
        }
    }

    close = () => {
        this.saveSpiner();
        this.props.close();
    }

    render() {
        const {gameType, sound, isSpinnerPlayed, gameId} = this.props
        const {rightAnswersAmount, questionsAmount, bonusesEarned} = this.getGameResults(this.props.results)
        const isDuel = (this.props.gameType === "DUEL")

        return(
            <WrapperResults>
                <TopBar
                    // caption={(gameType === 'QUIZ24' ? `Quiz24 ${e.game_result}` : gameType)}
                    caption={(gameType === 'QUIZ24' ? `Quick quiz` : gameType)}
                    leftButtonPictureSrc={`images/${sound ? "sound.png" : "sound-no.png"}`}
                    leftButtonClickHandler={this.toggleSound}
                    rightButtonClickHandler={this.close} />
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
                <BonusPoints>
                    <img src={`images/${isDuel ? "Bonuspunkte" : "03_BonusPunkte_LG"}.png`} alt="diamond"/>
                    <Amount>{convertNumber(bonusesEarned, false)} BP</Amount>
                    <img src={`images/${isDuel ? "Bonuspunkte" : "03_BonusPunkte_LG"}.png`} alt="diamond"/>
                </BonusPoints>
                <Prize
                    isDuel={false}
                    toggleComponent={this.props.toggleComponent}
                    freeWinningComponent={this.props.freeWinningComponent}
                    isSpinnerPlayed={isSpinnerPlayed}
                    clearWinningComponents={this.props.clearWinningComponents}
                    gameId={gameId}
                    winningOption={this.props.winningOption}
                    startWinningComponent={this.startWinningComponent}
                />
                <ReplayButton onClick={this.startGame}><img src="images/back_arrow.png"  alt="arrow"/></ReplayButton>
                <Footer>
                    <span onClick={() => this.props.toggleComponent('showDetails')}>{e.game_details}</span>
                    <span onClick={this.props.close}>{e.game_home}</span>
                    <span onClick={() => this.props.toggleComponent('showSolutions')}>{e.game_solutions}</span>
                </Footer>
            </WrapperResults>
        )
    }
}
