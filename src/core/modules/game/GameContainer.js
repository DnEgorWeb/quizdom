import React from 'react'
import { connect } from 'react-redux'
import Game from './Game'
import {
    answerQuestion,
    showAdvertisement,
    setQuestionLetterMap,
    setNewQuestion,
    setCloseGame,
    nextStep,
    setNewImage,
    setTypeList
} from '../../models/gameEngine/duck.js'
import { restartGame } from '../../pages/game/gameTypes/quickgame/duck'

const GameContainer = (props) => <Game {...props} />

const mapStateToProps = (store) => {
    const typeList = store.game ? store.game.typeList : []
    const questionLetterMap = store.game ? store.game.questionLetterMap : []
    const gameData = store.game ? store.game.game : {}
    const language = store.profile && store.profile.settings && store.profile.settings.languageId;
    const { sound } = store.profile.settings;

    return {
	    currentQuestion          : gameData.currentQuestion || {},
	    advertisement            : gameData.advertisement,
	    showAdvertisement        : gameData.showAdvertisement,
	    questionBlobKeys         : gameData.questionBlobKeys,
	    ended                    : gameData.ended,
	    answer                   : gameData.answer,
	    serverMsT                : gameData.answer && gameData.answer.serverMsT,
	    multiplayerGameInstanceId: gameData.multiplayerGameInstanceId,
	    typeList,
	    questionLetterMap,
	    language,
	    sound
    }
}

export default connect(
    mapStateToProps,{
        answerQuestion,
        setQuestionLetterMap,
        showAdvertisement,
        setNewQuestion,
        setNewImage,
        setCloseGame,
        restartGame,
        nextStep,
        setTypeList
    }
)(GameContainer)
