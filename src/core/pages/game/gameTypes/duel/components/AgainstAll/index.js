import React from 'react'
import e from '../../../../../../../langs';

import TopBar from '../../../../../../modules/components/GameResultsTopBar'

import StartSection from '../DuelCreation/Main/startSection'
import OptionSection from '../DuelCreation/Main/optionSection'
import InfoPanel from '../DuelCreation/Main/infoPanel'
import ChooseCurrencyValue from '../DuelCreation/Main/chooseCurrencyValue'
import GameCategoryFullList from '../DuelCreation/Main/gameCategoryFullList'

import convertNumber        from "../../../../../../../services/convertNumber";
// import { createPublicDuel } from "../../duck";

class AgainstAll extends React.Component {
    constructor(props) {
        super(props);
        props.initDuelCreation();
        e.setLanguage(props.language);
    
        const lastCurrentRate = JSON.parse(localStorage.getItem('lastGameOptions')) || {};

        this.state = {
            isInfoPanelOpened    : false,
            infoPanelContentType : 'INFO',   // 'ENEMY', 'CATEGORIES', 'CURRENCY_MONEY', 'CURRENCY_CR', 'CURRENCY_BP'
            currentRate                   : {
                currency : lastCurrentRate.entryFeeCurrency || 'NON',    // 'MONEY', 'CR', 'BP'
                value    : lastCurrentRate.entryFeeAmount || 0
            },
        
            currentGameId                 : "",
            currentNumberOfQuestionsIndex : 0,
            selectedGameId                : '',
            enemyIds        : [],
            searchValue     : '',
            pausedEnemyIds  : [],
            selectedEnemyId : '',
            settingsChangedByUser : false,
            isMyRegionActive : true,
        }
    }

    currencyList = ['MONEY', 'CR', 'BP', 'NON']

    componentWillReceiveProps = (props) => {
        if (!props.currentGame && props.gameList && props.gameList.length > 0) {
            const defaultCurrentGameId = props.gameList[0].gameId;
            props.getGame(defaultCurrentGameId);
        }
    
        const game = JSON.parse(localStorage.getItem('lastGame'));
    
        if(this.state.settingsChangedByUser) {
            const objForState = {};
            objForState.currentGame = props.currentGame;

            if(objForState.currentGame && !objForState.currentGame.entryFeeDecidedByPlayer) {
                objForState.currentRate = {
                    currency : objForState.currentGame.entryFeeCurrency,
                    value     : objForState.currentGame.entryFeeAmount
                };
        
                this.setState(objForState);
            }

            this.setState({ currentGame : props.currentGame });
        } else {
            const currentGame = (game && game.gameId && game) || props.currentGame
        
            this.setState({ currentGame : currentGame });
        }

        const listOfQuestions                   = this.getNumberOfQuestionsList();
        const { currentNumberOfQuestionsIndex } = this.state;
        const questionsIndex  = listOfQuestions[currentNumberOfQuestionsIndex] === 0 ? 0 : currentNumberOfQuestionsIndex;

        this.setState({ currentNumberOfQuestionsIndex: questionsIndex });
        
        e.setLanguage(props.language);
    }

    checkBalance = () => {
        const {currency, value} = this.state.currentRate;
        const {balance} = this.props;
        let result = true;
        
        switch (currency) {
            case 'MONEY':
                result = balance.money >= value; break;
            case 'BONUS':
                result = balance.bonus >= value; break;
            case 'CREDIT':
                result = balance.credit >= value; break;
            default:
                result = true
        }

        return result;
    }

	checkForAge = () => {
		const game = this.getCurrentGame();

		if (game.entryFeeCurrency === 'MONEY' && game.entryFeeAmount > 0) {
			console.log(game.entryFeeCurrency);
			const { profile = {} } = this.props;
			const { birthDate }    = profile && profile.person;
			const cleanBirthDate   = (new Date(birthDate.split(/[T]/igm).slice(0, 1))).getFullYear();
			const now              = (new Date()).getFullYear();
			const difference       = now - cleanBirthDate;

			if(difference < 18) {
				window.notification.alert(e.game_Attention, e.game_youMustBeOlderThen18ToPlayThisGame, 'Ok', () => {});
				return false;
			}
		}
		return true;
	}

    startGame = () => {
        if (!this.checkForAge()) return false;
        if (this.checkBalance()) {
            const {currentRate, currentNumberOfQuestionsIndex} = this.state;
            const currentGame = this.getCurrentGame();
            const currentGameId = currentGame.gameId;
            let {currency, value} = currentRate;

            currency = currency === 'CR' ? 'CREDIT' :
                currency === 'BP' ? 'BONUS' :
                    currency;
            
            const numberOfQuestions = this.getNumberOfQuestionsList()[currentNumberOfQuestionsIndex];

            const canChangeRate = currentGame ? currentGame.entryFeeDecidedByPlayer : false;

            if (currency === 'NON' || !(canChangeRate)) {
                this.props.createDuel({gameId: currentGameId, numberOfQuestions});
            } else {
                this.props.createDuel({gameId: currentGameId, numberOfQuestions, entryFeeCurrency: currency, entryFeeAmount: value});
            }
        } else {
            window.notification.confirm(e.game_creditNotSufficient, e.game_wantToChargeYourAccount, e.game_yesNo, (button) => {
                if (Number(button) !== 2) {
                    this.props.goToPayment();
                }
            })
        }
    }

    getAmountBar = (currency = this.state.currentRate.currency) => {
        const minValue = this.getMinAmount(currency);
        const maxValue = this.getMaxAmount(currency);
        const increment = this.getIncrementForAmount(currency);
        let amountBar = [];
        if (increment) {
            for (let i = minValue; i <= maxValue; i += increment) {
                if (i > 0) {
                    amountBar.push(i);
                }
            }
        }
        return amountBar;
    }

    getMinAmount = (currency = this.getCurrentRate().currency) => {
        const currentGame = this.getCurrentGame();
        let amount = null;
        switch (currency) {
            case 'MONEY':
                amount = currentGame.entryFeeSettings.moneyMin;
                break;
            case 'CR':
                amount = currentGame.entryFeeSettings.creditsMin;
                break;
            case 'BP':
                amount = currentGame.entryFeeSettings.bonuspointsMin;
                break;
            default:
                amount = 0;
        }

        return amount;
    }

    getMaxAmount = (currency = this.getCurrentRate().currency) => {
        const currentGame = this.getCurrentGame();
        let amount = null;
        switch (currency) {
            case 'MONEY':
                amount = currentGame.entryFeeSettings.moneyMax;
                break;
            case 'CR':
                amount = currentGame.entryFeeSettings.creditsMax;
                break;
            case 'BP':
                amount = currentGame.entryFeeSettings.bonuspointsMax;
                break;
            default:
                amount = 0
        }

        return amount;
    }

    getIncrementForAmount = (currency = this.getCurrentRate().currency) => {
        const currentGame = this.getCurrentGame();
        let increment = null;
        switch (currency) {
            case 'MONEY':
                increment = currentGame.entryFeeSettings.moneyIncrement;
                break;
            case 'CR':
                increment = currentGame.entryFeeSettings.creditsIncrement;
                break;
            case 'BP':
                increment = currentGame.entryFeeSettings.bonuspointsIncrement;
                break;
            default:
                increment = 0
        }

        return increment;
    }

    //enemy methods

    selectMyRegion = () => {
        this.setState({isMyRegionActive: true});
    }

    selectWorldRegion = () => {
        this.setState({isMyRegionActive: false});
        this.changedByUser();
    }

    //END enemy methods

    //game methods

    selectGame = (gameId) => {
        this.setState({selectedGameId: gameId, currentNumberOfQuestionsIndex: 0 });
        this.changedByUser();
    }

    setCurrentGame = (gameId) => {
        this.props.getGame(gameId)
    }

    getCurrentGame = () => {
        return this.state.currentGame
    }

    getShortGameList = () => {
        const gameList = [...this.props.gameList];
        const gameListLength = gameList.length;
        if (gameListLength >= 3) {
            return gameList.slice(0, 3);
        } else {
            for (let i = gameListLength; i < 3; i++) {
                gameList.push(null);
            }
            return gameList
        }
    }

    //END game methods

    //question methods

    getNumberOfQuestionsList = () => {
        let numberOfQuestionsList = [0, 0, 0, 0];
        const currentGame = this.getCurrentGame();
        if (currentGame) {
            const numberOfQuestions = currentGame.numberOfQuestions;
            numberOfQuestionsList = numberOfQuestions === 0 ? [3, 5, 7, 0]: [numberOfQuestions, 0, 0, 0];
        }
        return numberOfQuestionsList;
    }

    selectNumberOfQuestion = (index) => {
        this.setState({currentNumberOfQuestionsIndex: index});
    }

    //END question methods

    //rate methods

    setCurrentRate = (value, currency) => {
        this.setState({
            currentRate: {currency, value}
        })
        this.changedByUser();
    }

    getCurrentRate = () => {
        return this.state.currentRate
    }

    setDefaultRate = (currency) => {
        this.setState({currentRate: this.getDefaultRate(currency)})
    }

    getDefaultRate = (currency) => {
        const amountBar = this.getAmountBar(currency);
        const value = amountBar[0];
        return {
            currency,
            value
        }
    }

    selectCurrency = (currency) => {
        if (this.state.currentRate.currency !== currency) {
            this.setDefaultRate(currency);
        }

        if (currency !== 'NON') {
            this.showCurrencyValues(currency);
        }
    }

    getCurrencySymbol = (currency) => {
        let currencySymbol = '';
        if (currency === 'MONEY') {
            currencySymbol = '€'
        } else if (currency === 'CR') {
            currencySymbol = 'CR'
        } else if(currency === 'BP') {
            currencySymbol = 'BP'
        } else {
            currencySymbol = '0'
        }
        return currencySymbol
    }

    getRateValueWithSymbol = (value = this.state.currentRate.value, currency = this.state.currentRate.currency, showCurrency = true) => {
        switch (currency) {
            case 'MONEY':
                return `${parseInt(value, 10).toFixed(2).toString().replace('.', ',')} ${showCurrency ? this.getCurrencySymbol(currency) : ''}`
            case 'CR':
                return `${parseInt(value, 10).toFixed(2).toString().replace('.', ',')} ${showCurrency ? this.getCurrencySymbol(currency) : ''}`
            case 'BP':
                return `${convertNumber(value, false)} ${showCurrency ? this.getCurrencySymbol(currency) : ''}`
            default:
                return e.game_toTheHonor
        }
    }

    //END rate methods

    //InfoPanel methods

    closeInfoPanel = () => {
        this.setState({isInfoPanelOpened: false});
        setTimeout(() => {
            this.setState({
                selectedEnemyId: '',
                selectedGameId: '',
            });
        }, 500)
    }

    showInfo = () => {
        this.setState({
            isInfoPanelOpened: true,
            infoPanelContentType: 'INFO'
        })
    }

    showGameList = () => {
        this.setState({
            isInfoPanelOpened: true,
            infoPanelContentType: 'CATEGORIES'
        })
    }

    showCurrencyValues = (currecy) => {
        this.setState({
            isInfoPanelOpened: true,
            infoPanelContentType: `CURRENCY_${currecy}`,
        })
    }

    getInfoPanelContent = () => {
        const currentGame = this.getCurrentGame();

        switch (this.state.infoPanelContentType) {
            case 'INFO': return 'info';
            case 'CATEGORIES':
                return (
                    <GameCategoryFullList
                        gameList={this.props.gameList}
                        selectedGameId={this.state.selectedGameId || (currentGame && currentGame.gameId)}
                        selectGame={this.selectGame}
                    />);
            case 'CURRENCY_MONEY':
            case 'CURRENCY_CR':
            case 'CURRENCY_BP':
                return (
                    <ChooseCurrencyValue
                        setCurrentRate={this.setCurrentRate}
                        getRateValueWithSymbol={this.getRateValueWithSymbol}
                        currentValue={this.getCurrentRate().value}
                        valueBar={this.getAmountBar()}
                        currency={this.getCurrentRate().currency}
                        balance={this.props.balance}
                    />);

            default: return ''
        }
    }

    getImgSrcForInfoPanelTitle = () => {
        switch (this.state.infoPanelContentType) {
            case 'CURRENCY_MONEY': return 'images/01_Credits_LG.png';
            case 'CURRENCY_CR': return 'images/02_Credits_LG.png';
            case 'CURRENCY_BP': return 'images/03_BonusPunkte_LG.png';

            default: return ''
        }
    }

    getInfoPanelTitle = () => {
        switch (this.state.infoPanelContentType) {
            case 'INFO': return <p>{e.formatString(e.game_againstFriends,<span className='blue'>{e.game_duel}</span>)}</p>;
            case 'ENEMY': return <p>{e.formatString(e.game_opponent,<span className='blue'>{e.game_duel}</span>)}</p>;
            case 'CATEGORIES': return `${this.props.gameList.length} Kategorien`;
            case 'CURRENCY_MONEY': return 'Euro';
            case 'CURRENCY_CR': return 'Credits';
            case 'CURRENCY_BP': return 'Bonuspunkte';

            default: return ''
        }
    }

    changedByUser() {
        this.setState({ settingsChangedByUser: true});
    }
    
    //END InfoPanel methods

    render() {
        const currentGame = this.getCurrentGame();

        return (
            <div>
                <TopBar
                    leftButtonClickHandler={this.props.goBack}
                    rightButtonClickHandler={this.props.close}
                    caption={e.game_duelAll}
                />
                <StartSection
                    rate={this.getRateValueWithSymbol(this.state.currentRate.value, this.state.currentRate.currency)}
                    numberOfQuestions={this.getNumberOfQuestionsList()[this.state.currentNumberOfQuestionsIndex]}
                    title={currentGame ? currentGame.title : ''}
                    userName={this.props.userName}
                    iconSrc={currentGame ? `images/pool_icons/${(currentGame.assignedPoolsIcons && currentGame.assignedPoolsIcons[0])}.svg` : ''}
                    showInfo={this.showInfo}
                    startGame={this.startGame}
                />
                <OptionSection
                    gameList={this.getShortGameList()}
                    currentGameId={currentGame && currentGame.gameId}
                    setCurrentGame={this.setCurrentGame}
                    showGameList={this.showGameList}

                    numberOfQuestionsList={this.getNumberOfQuestionsList()}
                    currentNumberOfQuestionsIndex={this.state.currentNumberOfQuestionsIndex}
                    selectNumberOfQuestion={this.selectNumberOfQuestion}

                    currencyList={this.currencyList}
                    currency={this.state.currentRate.currency}
                    selectCurrency={this.selectCurrency}
                    canChangeRate={currentGame ? currentGame.entryFeeDecidedByPlayer : false}
                    changedByUser={this.changedByUser}
                />
                <InfoPanel
                    isOpen={this.state.isInfoPanelOpened}
                    onCloseHandler={this.closeInfoPanel}
                    title={this.getInfoPanelTitle()}
                    noTitlePicture={this.state.infoPanelContentType.indexOf('CURRENCY_') === -1}
                    imgSrc={this.getImgSrcForInfoPanelTitle()}
                    noInfoBlock={this.state.infoPanelContentType !== 'INFO'}
                    onOkButtonClick={this.state.infoPanelContentType === 'CATEGORIES' ? this.setCurrentGame.bind(null, this.state.selectedGameId) : null}
                >
                    {
                        this.getInfoPanelContent()
                    }
                </InfoPanel>
            </div>
        );
    }
}

export default AgainstAll;
