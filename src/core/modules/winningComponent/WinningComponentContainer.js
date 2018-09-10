import React from 'react'
import { connect } from 'react-redux'
import {toggleSound} from '../../models/profile/duck'
import {
    assignWinningComponent,
    userWinningComponentLoad,
    startWinningComponent,
    stopWinningComponent,
    setWinningComponentGot,
    setItemInfo,
    setSpinnerPlayed,
    clearWinningComponent,
    setSpinnerDelayed
} from '../../pages/myWinnings/duck'

import WinningComponent from './components/';

const WinningComponentContainer = (props) => <WinningComponent {...props} />

const mapStateToProps = (store) => {
	const { profile }                             = store;
	const { sound }                               = profile.settings;
	const { resultItems, userWinningComponentId } = (store.results.singleplayerResults && store.results.singleplayerResults) || {}
	const { winningComponents }                   = store.myWinnings
	const { spinnerPlayed }                       = store.myWinnings;
	const { bonus }                               = store.payment.balance
	const { gameInstanceId }                      = store.game
	const { isUserFullRegistered }                = profile
	const language                                = profile && profile.settings && profile.settings.languageId

	return {
	    gameId                       : store.game && store.game.gameId,
	    gameType                     : store.game.game.gameType,
	    cdnMedia                     : store.app.application.configuration.cdnMedia,
	    winningComponentId           : userWinningComponentId,
	    winningOption                : store.myWinnings.winningOption,
	    winningOptions               : store.myWinnings.winningOptions,
	    winningComponentGot          : store.myWinnings.winningComponentGot,
	    isWinningComponentUnavailable: store.myWinnings.isWinningComponentUnavailable,
	    infoItem                     : store.myWinnings.itemInfo,
	    balance                      : store.payment.balance,
	    resultItems,
	    winningComponents,
	    bonus,
	    gameInstanceId,
	    isUserFullRegistered,
	    spinnerPlayed,
	    sound,
	    language,
		profile
    }
}

export default connect(mapStateToProps, {
    toggleSound,
    assignWinningComponent,
    userWinningComponentLoad,
    startWinningComponent,
    stopWinningComponent,
    setWinningComponentGot,
    setItemInfo,
    setSpinnerPlayed,
    clearWinningComponent,
    setSpinnerDelayed
})(WinningComponentContainer)