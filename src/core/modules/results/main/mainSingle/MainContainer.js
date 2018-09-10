import React from 'react'
import { connect } from 'react-redux'

import Main from './index'
import {initSolutions} from '../../duck'
import {toggleSound} from '../../../../models/profile/duck'
import { getGame, closeGame } from '../../../../models/gameEngine/duck';
import { setSpinnerDelayed, assignWinningComponent } from '../../../../pages/myWinnings/duck';

const ResultsContainer = props => <Main {...props} />

const mapStateToProps = store => {
    const {roles} = store.profile
    let isRegistered = false;

    if (roles && roles.indexOf("REGISTERED") !== -1) {
        isRegistered = true
    }
    
    const { firstName, lastName, nickname } = store.profile.person
    const { sound }                         = store.profile.settings
    const resultGameId                      = store.results.singleplayerResults && store.results.singleplayerResults.gameId;

    const spinner = store.myWinnings.winningOption && store.myWinnings.winningOption;

    return {
        firstName                     : firstName,
        lastName                      : lastName,
        nickname                      : nickname,
        isRegistered                  : isRegistered,
        results                       : store.results.singleplayerResults,
        isWinningComponentUnavailable : store.myWinnings.isWinningComponentUnavailable,
        sound                         : sound,
        resultGameId,
        spinner
    }
}

export default connect(mapStateToProps, {
    initSolutions,
    toggleSound,
    getGame,
    closeGame,
    setSpinnerDelayed,
    assignWinningComponent
})(ResultsContainer)
