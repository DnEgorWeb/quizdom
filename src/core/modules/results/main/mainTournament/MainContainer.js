import React from 'react'
import { connect } from 'react-redux'

import Main from './index'
import {initSolutions} from '../../duck'
import {toggleSound} from '../../../../models/profile/duck'

const ResultsContainer = props => <Main {...props} />

const mapStateToProps = store => {
    const {roles} = store.profile
    let isRegistered = false;
    if (roles && roles.indexOf("REGISTERED") !== -1) {
        isRegistered = true
    }
    const { firstName, lastName, nickname } = store.profile.person
    const {sound} = store.profile.settings
    const language = store.profile && store.profile.settings && store.profile.settings.languageId

    return {
        firstName: firstName,
        lastName: lastName,
        nickname: nickname,
        isRegistered: isRegistered,
        results: store.gameResults,
        isWinningComponentUnavailable: store.myWinnings.isWinningComponentUnavailable,
        sound: sound,
        gameType: "Quiz" /* should pass real type of game */,
        endDateTime: store.game.game.endDateTime,
        language
    }
}

export default connect(mapStateToProps, {
    initSolutions,
    toggleSound
})(ResultsContainer)
