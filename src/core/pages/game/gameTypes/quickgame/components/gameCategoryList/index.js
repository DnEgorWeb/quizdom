import React from 'react'
import e from '../../../../../../../langs';

import {
    GameCategoryListWrapper,
    GameCategoryListContent,
    TotalPoolLabel,
} from './styledComponents'

import TopBar       from '../../../../../../modules/components/GameResultsTopBar'
import LastGame     from './lastGame'
import CategoryList from './categoryList'
import StartBlock   from "./startBlock";
import getFullPath  from '../../../../../../../services/fullPathForPoolIcon'
import InfoPanel    from '../../../../../tombola/components/infoPanel'

class GameCategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.setLastGame(props);
        e.setLanguage(props.language)
    }

    componentWillReceiveProps(nextProps) {
        e.setLanguage(nextProps.language)
    }

    componentDidMount() {
        this.setLastGame(this.props);
    }
    
    state = {
        isInfoPanelOpen: false
    }

    setLastGame = (props) => {
        const lastGameResults = JSON.parse(localStorage.getItem('lastGameOptions'));
        const lastGameId = lastGameResults ? lastGameResults.gameId : null;
	    let lastGame;

        if (lastGameId && props.lastGame && (props.lastGame.gameId !== lastGameId)) {
            lastGame = props.gameList && props.gameList.filter(game => game.gameId === lastGameId)[0];
        } else if (lastGameId && props.gameList){
			lastGame = props.gameList.filter(game => game.gameId === lastGameId)[0];
        }
	    if (lastGame) { props.selectGame(lastGame) }
    }

    toggleInfoPanel = () => {
        this.setState(({isInfoPanelOpen}) => ({isInfoPanelOpen: !isInfoPanelOpen}))
    }
    
    getGameDataFromGameList() {
        const { gameListAll } = this.props;
        const jsonLastGameData = localStorage.getItem('lastGameOptions');
        const lastGame         = (jsonLastGameData && JSON.parse(jsonLastGameData)) || null;
        let game;

        if(Array.isArray(gameListAll)) {
            gameListAll.forEach(item => {
                if(lastGame && item.gameId === lastGame.gameId) game = item;
            });
        }
        return game;
    }
    
    /**
     * Check if you need to show the last game
     * @returns boolean
     */
    checkDoNeedToShowLastGame = () => {
        const gameData = this.getGameDataFromGameList();
        const language = this.props.languageId;
        let result = false;

        if(gameData) {
            if(language === 'en') {
                result = gameData.playingRegions.indexOf('GB') !== -1;
            } else {
                result = gameData.playingRegions.indexOf(this.props.languageId.toUpperCase()) !== -1;
            }
        }

        return result;
    }

    render() {
        const {
                  gameList = [],
                  initGame,
                  specialGameList,
                  selectGame
              }                  = this.props;
        const gameData              = this.getGameDataFromGameList();
        const jsonLastGameData      = localStorage.getItem('gameResult');
        const lastGame              = (jsonLastGameData && JSON.parse(jsonLastGameData)) || null;
        const showLastGame          = this.checkDoNeedToShowLastGame();
        const lastGameTitle         = gameData ? gameData.title : '';
        const assignedPoolsIcons    = gameData ? gameData.assignedPoolsIcons[ 0 ] : '';
        const assignedPoolsNamesArr = gameData ? gameData.assignedPoolsNames : '';
        const lastGameOptions       = JSON.parse(localStorage.getItem('lastGameOptions'));
        const trainingMode          = lastGameOptions ? lastGameOptions.trainingMode : false;
        const numberOfQuestions     = lastGameOptions ? lastGameOptions.numberOfQuestions : 0;
        const description           = lastGameOptions ? lastGameOptions.description : '';
        const entryFeeAmount        = gameData ? gameData.entryFeeAmount : '';
        const entryFeeCurrency      = gameData ? gameData.entryFeeCurrency : '';
        const formatAmount          = (amount) => parseFloat(amount).toFixed(2).replace('.', ',');
        const formatBonuses         = (bonuses) => `${String(bonuses).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
        const assignedPoolsNames    = Array.isArray(assignedPoolsNamesArr) && assignedPoolsNamesArr[ assignedPoolsNamesArr.length - 1 ]
        const mapCurrToSymbol       = {
            "CREDIT" : "CR",
            "BONUS"  : "BP",
            "USD"    : "$",
            "EUR"    : "€",
            "MONEY"  : "€"
        }

        return (
            <GameCategoryListWrapper>
                <TopBar
                    leftButtonClickHandler={this.props.goBack}
                    rightButtonClickHandler={this.props.close}
                    caption="quick quiz" />
                <GameCategoryListContent>
                    {
                        showLastGame ?
                            <LastGame
                                title={lastGameTitle}
                                numberOfQuestions={numberOfQuestions}
                                iconSrc={getFullPath(assignedPoolsIcons || '')}
                                entryFeeAmount={formatAmount(entryFeeAmount)}
                                entryFeeCurrency={mapCurrToSymbol[formatBonuses(entryFeeCurrency)]}
                                assignedPoolsNames={assignedPoolsNames}
                            >
                                <StartBlock
                                    startGame={this.props.startGame.bind(this, trainingMode, numberOfQuestions)}
                                    openInfoPanel={this.toggleInfoPanel}
                                    trainingMode={!trainingMode}/>
                            </LastGame>
                            :
                            null
                    }

                    <TotalPoolLabel>{`${gameList.length} kategorien`}</TotalPoolLabel>
                    <CategoryList
                        goToGameOptions={this.props.goToGameOptions}
                        goToSpecialGameList={this.props.goToSpecialGameList}
                        initGame={initGame}
                        showLastGame={showLastGame}
                        gameList={gameList}
                        specialGameList={specialGameList}
                        selectGame={selectGame}
                    />
                </GameCategoryListContent>
                <InfoPanel
                    title='Game Info'
                    isOpen={this.state.isInfoPanelOpen}
                    onCloseHandler={this.toggleInfoPanel}
                    noTitlePicture
                >
                    <div>
                        <h3>{e.game_description}</h3>
                        {description}
                        <h3>{e.game_prizes}</h3>
                        {lastGame && lastGame.prizes}
                    </div>
                </InfoPanel>
            </GameCategoryListWrapper>
        )
    }
}

export default GameCategoryList;
