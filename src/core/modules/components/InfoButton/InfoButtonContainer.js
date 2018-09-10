import React from 'react'
import {connect} from 'react-redux'
import InfoButton from './index'

const InfoButtonContainer = props => <InfoButton {...props} />

const mapStateToProps = store => {
    const language = store.profile && store.profile.settings && store.profile.settings.languageId

    return {
        language
    }
}

export default connect(mapStateToProps, {})(InfoButtonContainer)
