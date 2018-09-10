import React from 'react'
import { connect } from 'react-redux'

import {initTombola, tombolaBuy, getUserTombola} from './duck'

import Tombola from './components'

const TombolaContainer = props => <Tombola {...props} />

const mapStateToProps = store => {
    const {tombolaList, userTombola} = store.tombola;
    const {balance} = store.payment;
    const {configuration} = store.app.application;
    const {cdnMedia} = configuration;
    const language = store.profile && store.profile.settings && store.profile.settings.languageId
    // const userTombola = store
    
    if (tombolaList) {
        for (let tombola of tombolaList) {
            tombola.bundles = tombola.bundles.sort((b1, b2) => b1.amount < b2.amount);
        }
    }

    return {
        tombolaList,
        balance: parseFloat(balance['bonus']),
        cdnMedia,
        userTombola,
        language
    }
}

export default connect(mapStateToProps, {
    initTombola,
    tombolaBuy,
    getUserTombola
})(TombolaContainer)
