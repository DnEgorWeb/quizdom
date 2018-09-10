import React from 'react'
import Feedback from './index'
import { connect } from 'react-redux'

const FeedbackContainer = props => <Feedback {...props} />

const mapStateToProps = store => {
    const language = store.profile && store.profile.settings && store.profile.settings.languageId
    const { email} = store.profile

    return {
        email,
        language
    }
}

export default connect(mapStateToProps, null)(FeedbackContainer)