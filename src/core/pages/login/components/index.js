import React, {  Component } from 'react'

import LoginForm from './loginForm'
import RestorePassword from './restorePassword'
import ConfirmationCode from './confirmationCode'
import NewPasswordForm from './setPassword'

class Login extends Component{
    state = {
        restorePassword: false
    }

    close = () => {
        this.props.resetLogin()
        this.props.history.push('/home')
    }

    restorePassword = (flag) => {
	    this.setState({restorePassword: flag})
    }

    toLogin = () => {
        this.props.resetLogin()
        this.setState({restorePassword: false})
    }

    render(){
        let Component = null;
        if(this.props.enterCode){
            Component = (
                <ConfirmationCode
                    recoverPassword={this.props.recoverPassword}
                    email={this.props.email}
                    submitCode={this.props.submitCode}
                    close={this.toLogin}
                    language={this.props.language}
                />
            )
        }else if(this.props.enterNewPass){
            Component = (
                <NewPasswordForm
                    close={this.toLogin}
                    setNewPassword={this.props.setNewPassword}
                    language={this.props.language}
                    restorePassword={() => this.restorePassword(false)}
                    resetLoginData={this.props.resetLoginData}
                />
            )
        }else if(this.state.restorePassword){
            Component = (
                <RestorePassword
                    close={this.toLogin}
                    recoverPassword={this.props.recoverPassword}
                    language={this.props.language}
                />
            )
        }else{
            Component = (
                <LoginForm
                    close={this.close}
                    loginEmail={this.props.loginEmail}
                    restorePassword={() => this.restorePassword(true)}
                    language={this.props.language}
                    setFacebookToken={this.props.setFacebookToken}
                    makeFacebookRegisterRequest={this.props.makeFacebookRegisterRequest}
                />
            )
        }

        return Component
    }
}

export default Login
