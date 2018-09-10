import React, {  Component } from 'react'
import e from '../../../../../../langs';

import Game from '../../../../../modules/game/GameContainer'
import GamesList from './gameCategoryList'
import GameOptions from './GameOptions'
import SpecialGameList from './specialGameList'

class QuickGame extends Component{

    constructor(props){
        super(props)
        this.props.loadGamesList()
        e.setLanguage(props.language)
    }

    state = {
        isSettingOptions: false,
        isSpecialGameList: false,
    }
    
    componentWillReceiveProps(nextProps) {
        e.setLanguage(nextProps.language)
    }

    loadGame = (gameId) => {
        this.props.initGame(gameId)
        this.props.startGame()
    }

    goToGameOptions = () => {
        this.setState({isSettingOptions: true});
    }

    goToCategoryList = () => {
        this.setState({isSettingOptions: false, isSpecialGameList: false});
    }

    goToSpecialGameList = () => {
        this.setState({isSpecialGameList: true});
    }

    goBack = () => {
        this.props.history.goBack()
    }

    close = () => {
        this.props.history.push('/dashboard');
    }

    render(){
        return this.props.isGameLoaded ?
        <Game />
        :
            this.state.isSettingOptions ?
                <GameOptions
                    currentGame={this.props.game}
                    close={this.close}
                    startGame={this.props.startGame}
                    goToCategoryList={this.goToCategoryList}
                    firstName={this.props.firstName}
                    lastName={this.props.lastName}
                    nickName={this.props.nickName}
                    person={this.props.person}
                    initGame={this.props.initGame}
                    language={this.props.language}
                    completedDuels={this.props.completedDuels}
                />
                :
                    this.state.isSpecialGameList ?
                        <SpecialGameList
                            specialGameList={this.props.specialGameList}
                            initGame={this.props.initGame}
                            goToCategoryList={this.goToCategoryList}
                            goToGameOptions={this.goToGameOptions}
                            selectGame={this.props.selectGame}
                            cdnMedia={this.props.cdnMedia}
                            close={this.close}
                            language={this.props.language}
                        />
                        :
                        <GamesList
                            startGame={this.props.startGame}
                            lastGame={this.props.game}
                            goBack={this.goBack}
                            close={this.close}
                            history={this.props.history}
                            gameList={this.props.gameList}
                            loadGame={this.loadGame}
                            initGame={this.props.initGame}
                            goToGameOptions={this.goToGameOptions}
                            goToSpecialGameList={this.goToSpecialGameList}
                            specialGameList={this.props.specialGameList}
                            selectGame={this.props.selectGame}
                            gameListAll={this.props.gameListAll}
                            languageId={this.props.languageId}
                            language={this.props.language}
                        />
    }

}

export default QuickGame
