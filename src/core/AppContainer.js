import React from 'react'
import { connect } from 'react-redux'
import App from './App'
const AppContainer = props => <App {...props} />

const mapStateToProps = (store) => {
    const language = store.profile && store.profile.settings && store.profile.settings.languageId

    return { language };
}

export default connect(mapStateToProps)(AppContainer)
