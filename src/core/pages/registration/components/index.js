import React, {  Component } from 'react'
import e from '../../../../langs'

import SubmitCode from './submitCode'
import EmailRegistration from './emailRegistration'
import NicknameSet from './nicknameSet'


class Register extends Component{
    constructor(props) {
        super(props)
        e.setLanguage(props.language)
    }

    state = {
        email: '',
        code: '',
    }
    
    componentWillReceiveProps(nextProps) {
        e.setLanguage(nextProps.language)
    }

    setEmail = (email) => {
        this.setState({email:email})
    }

    exitRegistration = () => {
        this.props.resetRegistration()
        this.props.history.push('/dashboard')
    }

    render(){
        let Component = null;

        if(this.props.confirmEmail){
            Component = (
                <NicknameSet
                    exitRegistration={this.exitRegistration}
                    updateProfile={this.props.updateProfile}
                    language={this.props.language}
                />
            )
        }else if(!this.props.registrationToken){
            Component = (
                <EmailRegistration
                    savedParams={this.props.savedParams}
                    saveRegistrationParams={this.props.saveRegistrationParams}
                    setFacebookToken={this.props.setFacebookToken}
                    makeFacebookRegisterRequest={this.props.makeFacebookRegisterRequest}
                    exitRegistration={this.exitRegistration}
                    setEmail={this.setEmail}
                    registerEmail={this.props.registerEmail}
                    language={this.props.language}
                />
            )
        }else{
            Component = (
                <SubmitCode
                    resetRegistrationToken={this.props.resetRegistrationToken}
                    exitRegistration={this.exitRegistration}
                    token={this.props.registrationToken}
                    resendEmailRegistrationCode={this.props.resendEmailRegistrationCode}
                    email={this.state.email}
                    submitCode={this.props.submitCode}
                    language={this.props.language}
                />
            )
        }

        return Component;

    }
}

export default Register
