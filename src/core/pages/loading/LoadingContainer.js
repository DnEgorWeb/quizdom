import React from 'react'
import { connect } from 'react-redux'
import Loading from './components/'
import { initApp, loadApp } from './duck.js'
const LoadingContainer = props => <Loading {...props} />

const mapStateToProps = (store) => {
    const language = store.profile && store.profile.settings && store.profile.settings.languageId
    
    return {
        loadingPercent: store.loading.loadingPercent,
        language
    }
}

export default connect(mapStateToProps, {
    loadApp,
    initApp
})(LoadingContainer)
