import React from 'react'
import { connect } from 'react-redux'

import Settings from './components'
import { updateProfile, setLoggedOut, getProfile } from '../../models/profile/duck';
// import { setUserTombola } from ''
import {registerAnonymous} from '../../pages/loading/duck';

const SettingsContainer = props => <Settings {...props} />

const mapStateToProps = store => {
    const { firstName, lastName, nickname } = store.profile.person || {};
    const { address, userId, settings }     = store.profile
    const { configuration }                 = store.app.application
    const { cdnMedia }                      = configuration
    const language                          = store.profile && store.profile.settings && store.profile.settings.languageId
    const langsList                         = store.app.environment && store.app.environment.regionalSettings;

    return {
        firstName : firstName,
        lastName  : lastName,
        nickname  : nickname,
        country   : address.country || '',
        city      : address.city,
        lang      : store.app.language || '',
        cdnMedia  : cdnMedia,
        userId    : userId,
        settings  : settings,
        langsList,
        language
    }
}

export default connect(mapStateToProps, {
    updateProfile,
    setLoggedOut,
    getProfile,
    registerAnonymous
})(SettingsContainer)
