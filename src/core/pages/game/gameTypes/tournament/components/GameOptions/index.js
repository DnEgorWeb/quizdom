import React from 'react'
import e from '../../../../../../../langs';
import moment from 'moment'

import {
    GameStartWrapper,
    GameStartContent,
	TournierEnded,
} from './styledComponents'

import {
	YellowText,
} from '../../../duel/components/styledComponents'

import CurrentGame from '../../../quickgame/components/gameCategoryList/lastGame'
import StartBlock from './startBlock'

import getFullPath from '../../../../../../../services/fullPathForPoolIcon'

import InfoPanel from '../../../../../tombola/components/infoPanel'

class GameOptions extends React.Component {
    state = {
        selectedNumberOfQuestion: 0,
        isGameLevelOn: true,
        isInfoPanelOpen: false,
        infoText: [],
        person: null,
        infoPanelTitle: '',
    }

    selectNumberOfQuestion = (index) => {
        this.setState({selectedNumberOfQuestion: index})
    }

	checkForAge = () => {
		const { person, currentGame } = this.props;
		const { entryFeeAmount, entryFeeCurrency } = currentGame;

		if (entryFeeCurrency === 'MONEY' && entryFeeAmount > 0) {
			const { birthDate }  = person;
			const cleanBirthDate = (new Date(birthDate.split(/[T]/igm).slice(0, 1))).getFullYear();
			const now            = (new Date()).getFullYear();
			const difference     = now - cleanBirthDate;

			if (difference < 18) {
				window.notification.alert(e.game_Attention, e.game_youMustBeOlderThen18ToPlayThisGame, 'Ok', () => {});
				return false;
			}
		}
		return true;
	}

    startGame = () => {
        if (!this.props.isRegistered) {
            return window.notification.alert(e.game_Attention, e.game_youMustBeRegistered, 'Ok', () => {})
        }

	    if(!this.checkForAge()) return false;

        this.props.initGame(this.props.currentGame.gameId);
        this.props.startGame();
    }

    showAllPools = (assignedPoolsNames) => {
        this.setState({infoPanelTitle: 'Pool List', infoText: assignedPoolsNames, isInfoPanelOpen: true});
    }

    showUserAccountInfo = () => {
        const person = [];
        Object.keys(this.props.person).forEach(prop => person.push(prop, this.props.person[prop]))
        this.setState({infoPanelTitle: e.game_userAccountInformation, infoText: person, isInfoPanelOpen: true});
    }

    getNumberOfQuestionList = () => {
        const {currentGame} = this.props;
        let numberOfQuestions = currentGame ? currentGame.numberOfQuestions : null;
        let numberOfQuestionList = [];
        if (numberOfQuestions === 0) {
            numberOfQuestionList = [
                { value: 3 },
                { value: 5 },
                { value: 7 },
                { value: null }
            ];
        } else if (numberOfQuestions) {
            numberOfQuestionList = [
                {
                    value: numberOfQuestions
                }
            ]
        }
        return numberOfQuestionList
    }

    toggleInfoPanel = () => {
        const { currentGame } = this.props
        const newText = this.state.infoText.length ? [] : this.state.infoText
        this.setState(({isInfoPanelOpen}) => ({infoPanelTitle: currentGame.game.title, assignedPoolsNames: [], isInfoPanelOpen: !isInfoPanelOpen, infoText: newText}))
    }

    getTournamentEndText = () => {
    	const endDate = moment(this.props.currentGame.endDateTime)
	    return <TournierEnded>{e.game_tournamentEnd} | <YellowText>{endDate.format('DD.MM.YYYY')}</YellowText> | <YellowText>{endDate.format('HH:mm')} Uhr</YellowText></TournierEnded>
    }

    render() {
	    const mapCurrToSymbol       = {
		    "CREDIT" : "CR",
		    "BONUS"  : "BP",
		    "USD"    : "$",
		    "EUR"    : "€",
		    "MONEY"  : "€"
	    };
	    const { currentGame }            = this.props;
	    if (!currentGame) return null;

	    const { minimumJackpotGarantie } = currentGame;
	    const { jackpot }                = currentGame.game;
	    let jackpotAmountWithCurrency;

	    if(jackpot && minimumJackpotGarantie !== 0) {
		    const jBalance      = jackpot && jackpot.balance;
		    const jackpotAmount = minimumJackpotGarantie > 0 ?
		                          ((jBalance - minimumJackpotGarantie) > minimumJackpotGarantie ?
		                            (jBalance - minimumJackpotGarantie) : minimumJackpotGarantie) :
		                          jBalance;

		    jackpotAmountWithCurrency = `${jackpotAmount || 0} ${(jackpot && mapCurrToSymbol[ jackpot.currency ]) || ''}`;
	    } else if(minimumJackpotGarantie === 0 || (currentGame && currentGame.entryFeeAmount)) {
		    jackpotAmountWithCurrency = `${currentGame.entryFeeAmount || ''} ${mapCurrToSymbol[currentGame.entryFeeCurrency] || ''}`;
	    } else {
		    jackpotAmountWithCurrency = 0;
	    }

        return (
            <GameStartWrapper>
                <GameStartContent>
                    <CurrentGame
                        title={currentGame ? currentGame.gameTitle : ''}
                        numberOfQuestions={currentGame.numberOfQuestions || 0}
                        iconSrc={getFullPath(currentGame && currentGame.game && currentGame.game.assignedPoolsIcons[0])}
                        jackpot={jackpotAmountWithCurrency}
                        entryFeeAmount={currentGame.entryFeeAmount}
                        entryFeeCurrency={currentGame.entryFeeCurrency}
                        minimumJackpotGarantie={currentGame.minimumJackpotGarantie}
                    >
                        <StartBlock
                            startGame={this.startGame}
                            openInfoPanel={this.toggleInfoPanel}
                            trainingMode={this.state.isGameLevelOn}
                        />
                        {this.getTournamentEndText()}
                    </CurrentGame>
                </GameStartContent>
                <InfoPanel
                    title={this.state.infoPanelTitle}
                    isOpen={this.state.isInfoPanelOpen}
                    onCloseHandler={this.toggleInfoPanel}
                    noTitlePicture
                    colorScheme={"blue"}
                >
                    {currentGame &&
                        <div dangerouslySetInnerHTML={{__html: currentGame.game && currentGame.game.description}} />
                    }
                </InfoPanel>
            </GameStartWrapper>
        )
    }
}

export default GameOptions;
