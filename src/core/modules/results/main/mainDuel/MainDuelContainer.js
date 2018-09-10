import React from 'react'
import { connect } from 'react-redux'

import Main from './index'
import {initSolutions, setDefaultMultiplayerResults} from '../../duck'
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
    const {cdnMedia} = store.app.application.configuration;

    return {
        firstName: firstName,
        lastName: lastName,
        nickname: nickname,
        isRegistered: isRegistered,
        results: store.results.singleplayerResults,
        sound: sound,
        gameType: "Duel", /* should pass real type of game */
        multiplayerResults: store.results.multiplayerResults,
        cdnMedia,
    }
}

export default connect(mapStateToProps, {
    initSolutions,
    toggleSound,
    setDefaultMultiplayerResults
})(ResultsContainer)
