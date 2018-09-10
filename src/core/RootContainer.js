import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Root from './Root'
const RootContainer = props => <Root {...props} />

const mapStateToProps = (store) => {
    const language = store.profile && store.profile.settings && store.profile.settings.languageId

    return {
        lastStartDate: store.app.lastStartDate,
        isFirstStart: store.app.isFirstStart,
        loggedIn: store.profile.loggedIn,
        language
    }
}

export default withRouter(connect(mapStateToProps)(RootContainer))
