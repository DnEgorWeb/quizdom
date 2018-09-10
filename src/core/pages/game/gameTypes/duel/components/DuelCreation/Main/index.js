import React from 'react'
import e from "../../../../../../../../langs";

import TopBar from '../../../../../../../modules/components/GameResultsTopBar'

import StartSection from './startSection'
import EnemySection from './enemySection'
import OptionSection from './optionSection'
import InfoPanel from './infoPanel'
import ChooseCurrencyValue from './chooseCurrencyValue'
import GameCategoryFullList from './gameCategoryFullList'
import EnemyOptions from './enemyOptions'

import convertNumber from "../../../../../../../../services/convertNumber";

class Main extends React.Component {
    constructor(props) {
        super(props);
        e.formatString(props.language);
    
        // const lastCurrentRate = JSON.parse(localStorage.getItem('lastGameOptions')) || {};
        const currentGame     = this.props.getCurrentGame();

	    const { entryFeeSettings : { moneyMin } } = currentGame || {entryFeeSettings: {}};

        this.state = {
            isInfoPanelOpened             : false,
            infoPanelContentType          : 'INFO',   // 'ENEMY', 'CATEGORIES', 'CURRENCY_MONEY', 'CURRENCY_CR', 'CURRENCY_BP'
            currentRate                   : {
                currency : 'MONEY' || 'NON',    // 'MONEY', 'CR', 'BP'
                value    : moneyMin
            },
            currentGameId                 : currentGame && currentGame.gameId,
            currentNumberOfQuestionsIndex : 0,
            selectedGameId                : '',
        }
    }

    currencyList = ['MONEY', 'CR', 'BP', 'NON']

    componentWillReceiveProps = (nextProps) => {
        const currentGame           = this.props.getCurrentGame();
        const currentGameId         = currentGame && currentGame.gameId;
        const gameList              = nextProps.gameList;
        const defaultCurrentGameId  = Array.isArray(gameList) && gameList.length && gameList[ 0 ].gameId;

        const listOfQuestions                   = this.getNumberOfQuestionsList();
        const { currentNumberOfQuestionsIndex } = this.state;

        const questionsIndex  = listOfQuestions[currentNumberOfQuestionsIndex] === 0 ? 0 : currentNumberOfQuestionsIndex;

        if(defaultCurrentGameId && !currentGame) {
            nextProps.getGame(defaultCurrentGameId);
        }

        if(currentGame && !currentGame.entryFeeDecidedByPlayer) {
            const currentRate = {
                currency : currentGame.entryFeeCurrency,
                value     : currentGame.entryFeeAmount
            }

            this.setState({ currentRate });
        }

        if(currentGame && this.props.settingsChangedByUser && currentGame.entryFeeDecidedByPlayer) {
	        const {
		              entryFeeSettings: { moneyMin, creditsMin, bonuspointsMin }
	              } = currentGame || { entryFeeSettings: {} };

            let currency;
            let value;

	        switch (true) {
		        case moneyMin :
			        currency = 'MONEY';
			        value    = moneyMin;
			        break;
		        case creditsMin :
			        currency = 'CREDITS';
			        value    = creditsMin;
			        break;
		        case bonuspointsMin :
			        currency = 'BONUS';
			        value    = bonuspointsMin;
			        break;
                default: currency = 'NON';
	        }

	        const currentRate = { currency, value };
	        this.setState({ currentRate });
        }

        this.setState({
            currentGameId,
            currentNumberOfQuestionsIndex: questionsIndex
        });

        e.setLanguage(nextProps.language);
    }

    checkBalance = () => {
        const { currency, value } = this.state.currentRate;
        const { balance }         = this.props;
        const currentValue        = value ? parseInt(value, 10) : 0;
        const currentCurrency     = currentValue === 0 ? 'BP' : currency;
        let result                = true;

        switch (currentCurrency) {
            case 'MONEY'  : result = balance.money  >= currentValue; break;
            case 'BONUS'  : result = balance.bonus  >= currentValue; break;
            case 'BP'     : result = balance.bonus  >= currentValue; break;
            case 'CREDIT' : result = balance.credit >= currentValue; break;
            case 'CR'     : result = balance.credit >= currentValue; break;
            default       : result = false
        }

        return result;
    }

	checkForAge = () => {
    	const game = this.props.getCurrentGame();

		if (game.entryFeeCurrency === 'MONEY' && game.entryFeeAmount > 0) {
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

        const { enemyIds } = this.props;
        if(!enemyIds.length) {
            window.notification.alert(e.game_Attention, e.game_opponentsAreNotSelected, e.game_ok, () => {});
            return false;
        }

        if (this.checkBalance()) {
            const {
                      currentRate,
                      currentNumberOfQuestionsIndex
                  }                 = this.state;
            const currentGame       = this.props.getCurrentGame();
            const currentGameId     = currentGame.gameId;
            let { currency, value } = currentRate;
    
            currency = currency === 'CR' ? 'CREDIT' :
                            currency === 'BP' ? 'BONUS' :
                                currency === 'NON' ? 'BONUS' : currency;
            value    = value || 0;
    
            const numberOfQuestions            = this.getNumberOfQuestionsList()[ currentNumberOfQuestionsIndex ];
            const { enemyIds, pausedEnemyIds } = this.props;
            const enabledEnemyIds              = enemyIds.filter(enemyId => !~pausedEnemyIds.indexOf(enemyId))
            const canChangeRate                = currentGame ? currentGame.entryFeeDecidedByPlayer : false;

            const paramsForCreateDuel = canChangeRate ?
                                        {
                                            gameId           : currentGameId,
                                            usersIds         : enabledEnemyIds,
                                            entryFeeCurrency : currency,
                                            entryFeeAmount   : value,
                                            numberOfQuestions
                                        } :
                                        {
                                            usersIds : enabledEnemyIds,
                                            gameId   :
                                            currentGameId,
                                            numberOfQuestions
                                        };

            this.props.createDuel(paramsForCreateDuel);

        } else {
            window.notification.confirm(e.game_creditNotSufficient, e.game_wantToChargeYourAccount, e.game_yesNo, (button) => {
                if (Number(button) !== 2) {
                    this.props.goToPayment();
                }
            })
        }
    }

    getAmountBar = (currency = this.state.currentRate.currency) => {
        const minValue  = this.getMinAmount(currency);
        const maxValue  = this.getMaxAmount(currency);
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
        const currentGame = this.props.getCurrentGame();
        let amount = null;

        if(currentGame) {
            switch(currency) {
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
        }

        return amount;
    }

    getMaxAmount = (currency = this.getCurrentRate().currency) => {
        const currentGame = this.props.getCurrentGame();
        let amount = null;
        
        if(currentGame) {
            switch(currency) {
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
        }

        return amount;
    }

    getIncrementForAmount = (currency = this.getCurrentRate().currency) => {
        const currentGame = this.props.getCurrentGame();
        let increment = null;

        if(currentGame) {
            switch(currency) {
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
        }

        return increment;
    }

    //enemy methods

    getEnemyList = () => {
        const enemyList = this.props.enemyIds.map(enemyId => {
            return this.props.myFriendList.filter(friend => friend.profile.userId === enemyId)[0] &&
                this.props.myFriendList.filter(friend => friend.profile.userId === enemyId)[0].profile;
        });
        for (let i = enemyList.length; i < 4; i++) {
            enemyList.push(null);
        }
        return enemyList;
    }

    selectEnemy = (userId) => {
        // this.setState(() => ({currentEnenyId: user.userId}));
        this.props.selectEnemy(userId)
        this.showEnemyOptions();
    }

    getSelectedEnemy = () => {
        const selectedEnemyId = this.props.selectedEnemyId;
        const friendList = this.props.myFriendList;
        if (friendList) {
            return (
                this.props.myFriendList.filter(friend => friend.profile.userId === selectedEnemyId)[0]
                && this.props.myFriendList.filter(friend => friend.profile.userId === selectedEnemyId)[0].profile
            )
        }
        return null;
    }

    closeInfoPanelRemoveEnemy = () => {
        this.props.removeEnemy()
        this.closeInfoPanel();
    }

    //END enemy methods

    //game methods

    selectGame = (gameId) => {
        this.setCurrentGame(gameId);
        this.props.changedByUser();
    }

    setCurrentGame = (gameId) => {
        this.props.getGame(gameId)
        this.props.changedByUser();
    }

    /*getCurrentGame = () => {
        return this.props.currentGame
    }*/

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
        const currentGame = this.props.getCurrentGame();
        if (currentGame) {
            const numberOfQuestions = currentGame.numberOfQuestions;
            numberOfQuestionsList = numberOfQuestions === 0 ? [3, 5, 7, 0]: [numberOfQuestions, 0, 0, 0];
        }
        return numberOfQuestionsList;
    }

    selectNumberOfQuestion = (index) => {
        this.setState({ currentNumberOfQuestionsIndex: index });
    }

    //END question methods

    //rate methods

    setCurrentRate = (value, currency) => {
        this.setState({
            currentRate: {currency, value}
        });
        this.props.changedByUser();
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
            this.props.selectEnemy('');
            this.setState({
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

    showEnemyOptions = () => {
        this.setState({
            isInfoPanelOpened: true,
            infoPanelContentType: 'ENEMY'
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
        const currentGame = this.props.getCurrentGame();
        const selectedEnemy = this.getSelectedEnemy();
        switch (this.state.infoPanelContentType) {
            case 'INFO': return 'info';
            case 'ENEMY':
                return (
                    selectedEnemy ?
                        <EnemyOptions
                            userId={selectedEnemy.userId}
                            name={selectedEnemy.name}
                            lastName={selectedEnemy.lastName}
                            nickname={selectedEnemy.nickname}
                            image={(this.props.cdnMedia + selectedEnemy.image).replace(/\/\//g, '/')}
                            city={selectedEnemy.address.city}
                            country={selectedEnemy.address.country}
                            handicap={selectedEnemy.handicap}
                            paused={this.props.pausedEnemyIds.indexOf(selectedEnemy.userId) !== -1}
                            enemyIds={this.props.enemyIds}
                            pauseEnemyInvitation={this.props.pauseEnemyInvitation}
                            goToAddFriend={this.props.goToAddFriend}
                            removeEnemy={this.closeInfoPanelRemoveEnemy}
                        />
                        :
                        null
                );
            case 'CATEGORIES':
                return (
                    <GameCategoryFullList
                        gameList={this.props.gameList}
                        selectedGameId={this.state.selectedGameId || this.state.currentGameId || (currentGame && currentGame.gameId)}
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
            case 'INFO':
                return (
                    <p>{
                        e.formatString(
                            e.game_againstFriends,
                            <span className='blue'>{e.game_duel}</span>
                        )
                    }</p>
                );
            case 'ENEMY':
                return (
                    <p>{
                        e.formatString(
                            e.game_opponentEnd,
                            <span className='blue'>{e.game_duel}</span>
                        )
                    }</p>
                );
            case 'CATEGORIES': return `${this.props.gameList.length} ${e.game_categories}`;
            case 'CURRENCY_MONEY': return e.game_euro;
            case 'CURRENCY_CR': return e.game_credits;
            case 'CURRENCY_BP': return e.game_bonusPoints;

            default: return ''
        }
    }

    //END InfoPanel methods

    render() {
        const currentGame        = this.props.currentGame;
        const enemyList          = this.getEnemyList();
        const listOfQuestions    = this.getNumberOfQuestionsList();
        const assignedPoolsIcons = (currentGame && currentGame.assignedPoolsIcons && currentGame.assignedPoolsIcons[ 0 ]) || '';
    
        const {
                  currentNumberOfQuestionsIndex,
                  currentRate
              } = this.state;

        return (
            <div>
                <TopBar
                    leftButtonClickHandler={this.props.goBack}
                    rightButtonClickHandler={this.props.close}
                    caption={e.game_duelFriends}
                />
                <StartSection
                    rate={this.getRateValueWithSymbol(currentRate.value, currentRate.currency)}
                    numberOfQuestions={listOfQuestions[currentNumberOfQuestionsIndex]}
                    title={currentGame ? currentGame.title : ''}
                    userName={this.props.userName}
                    iconSrc={currentGame ? `images/pool_icons/${assignedPoolsIcons}.svg` : ''}
                    showInfo={this.showInfo}
                    startGame={this.startGame}
                />
                <EnemySection
                    goToAddFriend={this.props.goToAddFriend}
                    enemyList={enemyList}
                    cdnMedia={this.props.cdnMedia}
                    selectEnemy={this.selectEnemy}
                    pausedEnemyIds={this.props.pausedEnemyIds}
                    goToGroups={this.props.goToGroups}
                />
                <OptionSection
                    gameList={this.getShortGameList()}
                    currentGameId={this.state.currentGameId || (currentGame && currentGame.gameId)}
                    setCurrentGame={this.setCurrentGame}
                    showGameList={this.showGameList}

                    numberOfQuestionsList={listOfQuestions}
                    currentNumberOfQuestionsIndex={currentNumberOfQuestionsIndex}
                    selectNumberOfQuestion={this.selectNumberOfQuestion}

                    currencyList={this.currencyList}
                    currency={currentRate.currency}
                    selectCurrency={this.selectCurrency}
                    canChangeRate={currentGame && currentGame.entryFeeDecidedByPlayer}
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

export default Main;
