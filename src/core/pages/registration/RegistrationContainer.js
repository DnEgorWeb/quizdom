import React from 'react'
import { connect } from 'react-redux'
import Register from './components/'
import {
    registerEmail,
    submitCode,
    resendEmailRegistrationCode,
    resetRegistration,
    makeFacebookRegisterRequest,
    resetRegistrationToken,
    saveRegistrationParams
} from './duck'
import { setFacebookToken, updateProfile } from '../../models/profile/duck.js'
const RegisterContainer = props => <Register {...props} />

const mapStateToProps = (store) => {
    const language = store.profile && store.profile.settings && store.profile.settings.languageId

    return {
        confirmEmail: store.registration.confirmEmail,
        registrationToken: store.registration.registrationToken,
        savedParams: store.registration.registrationParams,
        language
    }
}

export default connect(mapStateToProps, {
    updateProfile,
    registerEmail,
    setFacebookToken,
    makeFacebookRegisterRequest,
    resetRegistration,
    submitCode,
    resendEmailRegistrationCode,
	resetRegistrationToken,
	saveRegistrationParams
})(RegisterContainer)
