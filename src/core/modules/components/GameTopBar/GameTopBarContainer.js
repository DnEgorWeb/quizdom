import React from 'react'
import { connect } from 'react-redux'

import {closeGame} from '../../../models/gameEngine/duck'
import {toggleSound} from '../../../models/profile/duck'

import GameTopBar from './components'

const GameTopBarContainer = props => <GameTopBar {...props} />

const mapStateToProps = store => {
    const language = store.profile && store.profile.settings && store.profile.settings.languageId
	const {
		      game,
		      game     : {
			      game: { numberOfQuestions, type }
		      },
		      quickgame: { gameInfo }
	      } = store;
    const {sound} = store.profile.settings;
    let questionCount;

	if(game.game.type === 'TOURNAMENT') {
		questionCount = numberOfQuestions;
	} else if(type === 'DUEL'){
		questionCount = gameInfo.numberOfQuestions;
	} else {
		questionCount = gameInfo.numberOfQuestions
	}

    return {
        max: questionCount,
        current: game.game ? (game.game.currentQuestion && game.game.currentQuestion.question + 1) : null,
        sound: sound,
        gameId: game.gameId,
        language
    }
}

export default connect(mapStateToProps, {
    toggleSound,
    closeGame
})(GameTopBarContainer)
