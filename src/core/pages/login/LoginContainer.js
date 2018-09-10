import React from 'react'
import { connect } from 'react-redux'
import Login from './components/'

import {
    loginEmail,
    recoverPassword,
    resetLogin,
    submitCode,
    setNewPassword,
	resetLoginData
} from './duck'
import {makeFacebookRegisterRequest} from '../registration/duck'
import { setFacebookToken, updateProfile } from '../../models/profile/duck.js'

const LoginContainer = props => <Login {...props} />

const mapStateToProps = (store) => {
    const language = store.profile && store.profile.settings && store.profile.settings.languageId

    return {
        enterCode: store.login.showEnterCodeForm,
        enterNewPass: store.login.showEnterPasswordForm,
        email: store.login.email,
        language
    }
}

export default connect(mapStateToProps, {
    loginEmail,
    resetLogin,
    submitCode,
    recoverPassword,
    setNewPassword,
	resetLoginData,
    setFacebookToken,
    updateProfile,
    makeFacebookRegisterRequest
})(LoginContainer)
