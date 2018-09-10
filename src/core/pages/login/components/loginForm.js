import React from 'react'
import e from '../../../../langs'
import jsSHA from 'jssha'
import styled from 'styled-components'
// import { loginFacebook } from '../duck.js'
import FacebookLogin from 'react-facebook-login';

import { MetallicButton, MetallicButtonWrapper } from '../../../modules/components/MetallicButton'
import {
     AuthFacebookBlock,
     AuthFormBlock,
     AuthBottomBlock,
     SeparatorLine,
     AuthBlockCaption,
     FacebookLogo,
     TextInput
 } from '../../../modules/components/AuthComponents'

import TopBar from '../../../modules/components/TopBar'

const FacebookLoginStyled = styled.div`
     position: absolute;
     top: 114px;
     opacity: 0;
     button{
         height: 100px;
         width: 600px;
     }
 `

const ForgotPassword = styled.div`
    margin-top: 60px;
    text-align: center;
    p{
        font-family: Overpass, sans-serif;
        font-size: 28px;
        text-align: center;
        color: #333333;
        margin-top: 0px;
        margin-bottom: 10px;
    }
    a{
        font-family: 'Univers-condensed';
        font-size: 38px;
        font-weight: bold;
        color: #ff7f00;
        cursor: pointer;
    }
`

export default class LoginForm extends React.Component{
    constructor(props) {
        super(props)
        e.setLanguage(props.language)
    }

    state = {
        email: '',
        password: ''
    }

    componentWillReceiveProps(nextProps) {
        e.setLanguage(nextProps.language)
    }
    
    login = () => {
        let {email, password} = this.state

        let error = false

        if(!email && !password){
            window.notification.alert(e.login_attention, e.login_youMustFillOutEveryField, e.login_ok, () => {})
            error = true;
        }else if(!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email || '')){
            window.notification.alert(e.login_attention, e.login_emailYouEnteredIsNotValid, e.login_ok, () => {})
            error = true
        }else if(!password || password.length < 8){
            window.notification.alert(e.login_attention, e.login_passwordYouEnteredIsNotValid, e.login_ok, () => {})
            error = true
        }
        if(!error){
            let hashPass = new jsSHA("SHA-256", 'TEXT')
            hashPass.update(password + 'oewfgu9348u349erbuh89ghi3948bh9g84vhjnb934hg0j');// string literal is a SHA keyForTypeList
            this.props.loginEmail(email, hashPass.getHash('HEX'))
        }
    }

    inputHandler = (type, value) => {
        this.setState({ [type]: value })
    }

    // facebookLogin = () => {
    //     loginFacebook('EAACuBBvqz0wBAEW1vilo2GnkIvsstAh20OfahJZAhZAcHVG06cFNGt1wJOamBzkBZAtkXc5NZBL0E3nAbGSbn2CiClowlbxACq5gqSfG6uoZAI0PhdcMQRR7gN54CszwfJWc9i6qSH33vrbgf2rP7hQPDSx0gng4Y54nnDvav7WfbWrpkDiBNxTOrWPta6G8ZD')
    // }

    responseFacebook = (response) => {
        if(response.accessToken){
            this.props.setFacebookToken(response.accessToken)
            this.props.makeFacebookRegisterRequest(response.accessToken)
        }
    }

    authorizeFacebook = () => {
	    if(!window.cordova) return;
        const self = this

        const openFB = window.openFB
        openFB.init({appId: '191332671475532'})

        openFB.login(
            function(response) {
                if(response.status === 'connected') {
                    self.props.setFacebookToken(response.authResponse.accessToken)
                    self.props.makeFacebookRegisterRequest(response.authResponse.accessToken)
                } else {
                    alert('Facebook login failed: ' + response.error);
                }
            }, {scope: 'email'});
    }

    render(){
        return (
            <div>
                <TopBar caption={e.login_reLogin} close={this.props.close}/>
                <AuthFacebookBlock>
                    <AuthBlockCaption captionColor='#b4b4b4'>
                        <SeparatorLine
                            width='240px'
                            bgcolor='#1c1818'
                            borderBottomColor='rgba(255, 255, 255, .3)'
                        />
                        <p>{e.reg_With}</p>
                        <SeparatorLine
                            width='240px'
                            bgcolor='#1c1818'
                            borderBottomColor='rgba(255, 255, 255, 0.3)'
                        />
                    </AuthBlockCaption>
                    <FacebookLogo onClick={this.authorizeFacebook}>
                        <img
                            className="fb-login-button" data-auto-logout-link="true" src="images/facebook.png"
                            data-onlogin="checkLoginState();" alt=""
                        />
                            <FacebookLoginStyled>
	                            {window.cordova ? null :
	                                <FacebookLogin
	                                    appId="191332671475532"
	                                    autoLoad={false}
	                                    fields="name,email,picture"
	                                    callback={this.responseFacebook}
	                                />
	                            }
                            </FacebookLoginStyled>
                    </FacebookLogo>
                </AuthFacebookBlock>
                <AuthFormBlock>
                    <AuthBlockCaption captionColor='#ff7f00'>
                        <SeparatorLine width='240px' bgcolor='#c6c6c6' borderBottomColor='rgb(255, 255, 255)'/><p>{e.login_or}</p><SeparatorLine width='240px' bgcolor='#c6c6c6' borderBottomColor='rgb(255, 255, 255)'/>
                    </AuthBlockCaption>
                    <TextInput type='email' placeholder={e.login_eMail} value={this.state.email} onChange={(e) => {this.inputHandler('email', e.target.value.toLowerCase())}} />
                    <br/>
                    <TextInput type='password' placeholder={e.login_password} value={this.state.password} onChange={(e) => {this.inputHandler('password', e.target.value)}} /><br/>
                    <MetallicButtonWrapper>
                        <MetallicButton onClick={this.login}>{e.login_send}</MetallicButton>
                    </MetallicButtonWrapper>
                </AuthFormBlock>
                <AuthBottomBlock>
                    <ForgotPassword>
                        <p><a onClick={this.props.restorePassword}>{e.login_forgotPassword}?</a></p>
                        <p>{e.login_justClickHere}</p>
                    </ForgotPassword>
                    <SeparatorLine style={{margin: '40px auto'}} width='610px' bgcolor='#c6c6c6' borderBottomColor='rgb(255, 255, 255)'/>
                </AuthBottomBlock>
            </div>
        )
    }
}
