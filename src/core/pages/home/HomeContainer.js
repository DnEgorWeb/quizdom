import React from 'react'
import Home from './components'
import { connect } from 'react-redux'

const HomeContainer = props => <Home {...props} />

const mapStateToProps = store => {
    const language = store.profile && store.profile.settings && store.profile.settings.languageId
    
    return {
        language
    }
}

export default connect(mapStateToProps, {})(HomeContainer)