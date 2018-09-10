import { connect } from 'react-redux'

import Details from '../../../../../../modules/results/details/detailsDuel'

import { initSolutions } from '../../../../../../modules/results/duck'

const mapStateToProps = (store) => {
    const selectedInvitation = store.duelgame.invitations && store.duelgame.invitations
        .filter(({multiplayerGameInstanceId}) => multiplayerGameInstanceId === store.duelgame.selectedInvitation)[0];
    const language = store.profile && store.profile.settings && store.profile.settings.languageId

    return {
        results: store.results.singleplayerResults,
        questionLetterMap: store.game.questionLetterMap,
        selectedInvitation,
        cdnMedia: store.app.application.configuration.cdnMedia,
        multiplayerResults: store.results.multiplayerResults,
        bet: {
            amount: selectedInvitation && selectedInvitation.game.entryFeeAmount,
            currency: selectedInvitation && selectedInvitation.game.entryFeeCurrency
        },
        language
    }
}

export default connect(mapStateToProps, {
    initSolutions
})(Details)
