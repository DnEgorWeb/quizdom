import React from 'react'
import { connect } from 'react-redux'

import Promocode from './index'

const PromocodeContainer = props => <Promocode {...props} />

const mapStateToProps = store => {
    const answer = store.promocode.answer
    const error = store.promocode.error
    const language = store.profile && store.profile.settings && store.profile.settings.languageId

    return {
        answer: answer,
        error: error,
        language
    }
}

export default connect(mapStateToProps, null)(PromocodeContainer)