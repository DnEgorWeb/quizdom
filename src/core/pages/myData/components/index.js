import React from 'react'
import {Switch, Route} from 'react-router-dom'
import url from '../../../../constants/urlConstants'

import NicknameForm from './changeNickname'
import MainProfile from './mainProfile'
import PasswordForm from './changePassword'
import PhoneForm from './changePhone'
import VerifyEmailForm from './submitCode'

export default class Profile extends React.Component{
    render(){
        return(
            <Switch>
                <Route path={url.profile.nickname}>
                    <NicknameForm
                        redirectionFlag={this.props.redirectionFlag}
                        updateProfile={this.props.updateProfile}
                        nickname={this.props.nickname}
                        language={this.props.language}
                    />
                </Route>
                <Route path={url.profile.password}>
                    <PasswordForm
                        redirectionFlag={this.props.redirectionFlag}
                        changePassword={this.props.changePassword}
                        language={this.props.language}
                    />
                </Route>
                <Route path={url.profile.phone} component={PhoneForm} />
                <Route path={url.profile.email.verification}>
                    <VerifyEmailForm
                        resendEmailRegistrationCode={this.props.resendEmailRegistrationCode}
                        submitCode={this.props.submitCode}
                        email={this.props.email}
                        language={this.props.language}
                    />
                </Route>
                <MainProfile
                    {...this.props}
                    updateProfile={this.props.updateProfile}
                />
            </Switch>
        )
    }
}
