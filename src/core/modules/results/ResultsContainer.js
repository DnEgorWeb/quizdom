import React       from 'react'
import { connect } from 'react-redux'
import Results     from './index'

import {startWinningComponent, clearWinningComponent, userWinningComponentLoad} from "../../pages/myWinnings/duck";
import { createDuel, inviteUsersToGameOnlyId }                                  from '../../pages/game/gameTypes/duel/duck';

import {
    initSolutions,
    restartDuelGame,
    setDefaultSingleResults
} from './duck'

import {
    setGameLoaded,
    startGame,
    getGame,
    restartGame,
    setGameInstanseId,
    closeGame
} from '../../models/gameEngine/duck'

const ResultsContainer = (props) => <Results {...props} />

const mapStateToProps = (store) => {
	const selectedInvitation = store.duelgame.invitations && store.duelgame.invitations
	                                                              .filter(({ multiplayerGameInstanceId }) => multiplayerGameInstanceId === store.duelgame.selectedInvitation)[ 0 ];
	const language           = store.profile && store.profile.settings && store.profile.settings.languageId
	const gameData           = store.game;
	const gameId             = store.game.game.gameId;

    return {
	    isSecondPlayer                       : !!store.results.multiplayerResults,
	    gameInstanceId                       : store.game.game.gameInstanceId,
	    winningIds                           : store.game.game.winningComponentIds || [],
	    results                              : store.results.singleplayerResults,
	    questionLetterMap                    : store.game.questionLetterMap,
	    isPrize                              : !!store.voucher.currentVoucher,
	    isSpinnerPlayed                      : store.myWinnings.spinnerPlayed,
	    winningComponentId                   : store.results.singleplayerResults && store.results.singleplayerResults.userWinningComponentId,
	    winningComponentIdForDuelSecondPlayer: store.myWinnings.winningComponentId,
	    gameType                             : store.game.game.type,
	    multiplayerResults                   : store.results.multiplayerResults,
	    completedDuels                       : store.duelgame.completedDuelsOrTournaments,
	    cdnMedia                             : store.app.application.configuration.cdnMedia,
	    spinnerDelayed                       : store.myWinnings.spinnerDelayed,
	    winningOption                        : store.myWinnings.winningOption,
	    selectedInvitation,
	    gameId,
	    language,
	    gameData,
	    bet                                  : {
		    amount  : store.results.singleplayerResults && store.results.singleplayerResults.entryFeePaid,
		    currency: store.results.singleplayerResults && store.results.singleplayerResults.entryFeeCurrency
	    }
    }
}

export default connect(mapStateToProps,{
    initSolutions,
    userWinningComponentLoad,
    startWinningComponent,
    clearWinningComponent,
    setGameLoaded,
    startGame,
    getGame,
    createDuel,
    restartGame,
    restartDuelGame,
    inviteUsersToGameOnlyId,
    setGameInstanseId,
    closeGame,
    setDefaultSingleResults
})(ResultsContainer)
