import React from 'react'
import e from '../../../../../../../langs';

import {
    GameStartWrapper,
    GameStartContent,
} from './styledComponents'

import TopBar from '../../../../../../modules/components/GameResultsTopBar'

import CurrentGame from '../gameCategoryList/lastGame'
import StartBlock from '../gameCategoryList/startBlock'

import GameInfo from './gameInfo'

import getFullPath from '../../../../../../../services/fullPathForPoolIcon'

import InfoPanel from '../../../../../tombola/components/infoPanel'

class GameStart extends React.Component {
    /*constructor(props) {
        super(props);
        // todo: вызывается повторно
        /!*
        const gameId = this.props.currentGame && this.props.currentGame.gameId;
        if (gameId) {
            
            // this.props.initGame(gameId);
        }
        *!/
    }*/

    state = {
        selectedNumberOfQuestion: 0,
        isGameLevelOn: true,
        isInfoPanelOpen: false,
        infoText: [],
        person: null,
        infoPanelTitle: ''
    }

    selectNumberOfQuestion = (index) => {
        this.setState({selectedNumberOfQuestion: index});
    }

    turnGameLevel = (type) => {
        this.setState({isGameLevelOn: type})
    }

    startGame = () => {
	    const trainingMode      = !this.state.isGameLevelOn;
	    const number            = this.getNumberOfQuestionList()[ this.state.selectedNumberOfQuestion ];
	    const numberOfQuestions = number && number.value;
        const {
                  gameId,
                  entryFeeCurrency,
                  entryFeeAmount,
                  description
              }                 = this.props.currentGame;
        const objGameOptions    = { trainingMode, numberOfQuestions, entryFeeCurrency, gameId, entryFeeAmount, description };

        window.objGameOptions = objGameOptions;
        window.numberOfQuestions = numberOfQuestions;

        this.props.startGame(trainingMode, numberOfQuestions);
    }

    showAllPools = (assignedPoolsNames) => {
        this.setState({infoPanelTitle: 'Pool List', infoText: assignedPoolsNames, isInfoPanelOpen: true});
    }

    showUserAccountInfo = () => {
        const person = [];
        Object.keys(this.props.person).forEach(prop => person.push(prop, this.props.person[prop]))
        this.setState({infoPanelTitle: 'User account informations', infoText: person, isInfoPanelOpen: true});
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
            numberOfQuestionList = [{ value: numberOfQuestions }]
        }

        return numberOfQuestionList
    }

    toggleInfoPanel = () => {
        const newText = this.state.infoText.length ? [] : this.state.infoText
        this.setState(({isInfoPanelOpen}) => ({infoPanelTitle: 'Game Info', assignedPoolsNames: [], isInfoPanelOpen: !isInfoPanelOpen, infoText: newText}))
    }
    
    render() {
        const {currentGame : game} = this.props;
        const numberOfQuestionList = this.getNumberOfQuestionList();
        const assignedPoolsNames   = game && game.assignedPoolsNames ? game.assignedPoolsNames : [];
        const hideCategories       = game && game.hideCategories;
        const entryFeeAmount       = game ? game.entryFeeAmount : '';
        const entryFeeCurrency     = game ? game.entryFeeCurrency : '';
        const formatAmount         = (amount) => parseFloat(amount).toFixed(2).replace('.', ',');
        const formatBonuses        = (bonuses) => `${String(bonuses).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
        const mapCurrToSymbol      = {
            "CREDIT" : "CR",
            "BONUS"  : "BP",
            "USD"    : "$",
            "EUR"    : "€",
            "MONEY"  : "€"
        }

        return (
            <GameStartWrapper>
                <TopBar
                    leftButtonClickHandler={this.props.goToCategoryList}
                    rightButtonClickHandler={this.props.close}
                    caption="quick quiz"
                />
                <GameStartContent>
                    <CurrentGame
                        title={game ? game.title : ''}
                        numberOfQuestions={numberOfQuestionList[this.state.selectedNumberOfQuestion] && numberOfQuestionList[this.state.selectedNumberOfQuestion].value}
                        iconSrc={getFullPath(game && game.assignedPoolsIcons ? game.assignedPoolsIcons[0] : '')}
                        entryFeeAmount={formatAmount(entryFeeAmount)}
                        entryFeeCurrency={mapCurrToSymbol[formatBonuses(entryFeeCurrency)]}
                    >
                        <StartBlock
                            startGame={this.startGame}
                            openInfoPanel={this.toggleInfoPanel}
                            trainingMode={this.state.isGameLevelOn}
                        />
                    </CurrentGame>
                    <GameInfo
                        selectNumberOfQuestion={this.selectNumberOfQuestion}
                        selectedNumberOfQuestion={this.state.selectedNumberOfQuestion}
                        numberOfQuestionList={numberOfQuestionList}
                        isGameLevelOn={this.state.isGameLevelOn}
                        turnGameLevelOn={this.turnGameLevel.bind(this, true)}
                        turnGameLevelOff={this.turnGameLevel.bind(this, false)}
                        assignedPoolsNames={assignedPoolsNames}
                        startGame={this.startGame}
                        openInfoPanel={this.toggleInfoPanel}
                        firstName={this.props.firstName}
                        lastName={this.props.lastName}
                        nickName={this.props.nickName}
                        showAllPools={this.showAllPools}
                        showUserAccountInfo={this.showUserAccountInfo}
                        hideCategories={hideCategories}
                    />
                </GameStartContent>
                <InfoPanel
                    title={this.state.infoPanelTitle}
                    isOpen={this.state.isInfoPanelOpen}
                    onCloseHandler={this.toggleInfoPanel}
                    noTitlePicture
                >
                    {
                        this.state.infoText.length ?
                            this.state.infoText.map(info => <div key={info}>{info}</div>)
                            :
                            <div>
                                <h3>{e.game_description}</h3>
                                {game.description}
                                <h3>{e.game_Prizes}</h3>
                                {game.prizes}
                            </div>
                    }
                </InfoPanel>
            </GameStartWrapper>
        )
    }
}

export default GameStart;
