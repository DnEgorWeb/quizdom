import React from 'react'
import { connect } from 'react-redux'

import { submitCode, resendEmailRegistrationCode } from '../registration/duck'
import { changePassword } from './duck'
import { updateProfile } from '../../models/profile/duck'

import MyData from './components'

const MyDataContainer = props => <MyData {...props} />

const mapStateToProps = store => {
    const redirectionFlag = store.myData.redirection
    const { firstName,  lastName, sex, nickname, birthDate } = store.profile.person
    const { address, email, phone } = store.profile
    const { gameLevel } = store.profile.stats
    const language = store.profile && store.profile.settings && store.profile.settings.languageId

	return {
        roles: store.profile.roles,
        redirectionFlag: redirectionFlag,
        firstName: firstName,
        lastName: lastName,
        sex: sex,
        nickname: nickname,
        birthDate: birthDate,
        address: address,
        email: email,
        phone: phone,
        level: gameLevel,
        language,
        urlMediaService: store.app.environment.urlMediaService,
        token: store.app.token
    }
}

export default connect(mapStateToProps, {
    updateProfile,
    resendEmailRegistrationCode,
    submitCode,
    changePassword
})(MyDataContainer)
