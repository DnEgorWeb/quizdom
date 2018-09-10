import React from 'react'
import { connect } from 'react-redux'

import GraphicWinn from './components/graphicWinn'

const GraphicWinnContainer = props => <GraphicWinn {...props} />

const mapStateToProps = store => {
    const language = store.profile && store.profile.settings && store.profile.settings.languageId

    return {
        currentWinn: store.myWinnings.currentWinn || {},
        language
    }
}

export default connect(mapStateToProps, {
})(GraphicWinnContainer)
