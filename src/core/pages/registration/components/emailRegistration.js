import React from 'react'
import e from '../../../../langs'
import jsSHA from 'jssha'
import {Link} from 'react-router-dom'
import url from '../../../../constants/urlConstants'
import FacebookLogin from 'react-facebook-login';

import styled from 'styled-components'

import TopBar from '../../../modules/components/TopBar'

import {
    AuthFacebookBlock,
    AuthFormBlock,
    AuthBottomBlock,
    SeparatorLine,
    AuthBlockCaption,
    FacebookLogo,
    TextInput
} from '../../../modules/components/AuthComponents'

import { MetallicButton, MetallicButtonWrapper } from '../../../modules/components/MetallicButton'

const TermsBlock = styled.div`

    display: flex;
    justify-content: space-between;

    padding-top: 40px;

    width: 610px;
    height: 100px;
    margin: auto;

p{
    margin-top: 0px;
    width: 540px;
    font-size: 28px;
    text-align: center;
    color: #333333;
    font-family: Overpass, sans-serif;
}

a{
    text-decoration: none;
    color: #ff7f00;
}

/* Customize the label (the container) */
.container {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

/* Hide the browser's default checkbox */
.container input {
    position: absolute;
    opacity: 0;
}

/* Create a custom checkbox */
.checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 54px;
    width: 54px;
    background-color: white;
    border: solid 2px #818181;
    border-radius: 10px;
}

/* On mouse-over, add a grey background color */
//.container:hover input ~ .checkmark {
//    background-color: #ccc;
//}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
    background-color: white;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
    content: "";
    position: absolute;
    display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
    display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
    left: 15px;
    top: 15px;
    width: 20px;
    height: 15px;
    border: solid #818181;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
}
`
 const PasswordCaption = styled.p`
     font-family: Overpass, sans-serif;
     font-size: 28px;
     color: #333333;
     width: 600px;
     margin: auto;
 `

 const FacebookLoginStyled = styled.div`
     position: absolute;
     top: 114px;
     opacity: 0;
     button{
         height: 100px;
         width: 600px;
     }
 `

export default class EmailRegistration extends React.Component{
    constructor(props) {
        super(props)
        e.setLanguage(props.language)
        
        this.state = {
            email     : props.savedParams ? props.savedParams.email : '',
            password  : props.savedParams ? props.savedParams.password : '',
            agreement : false,
            passHelp  : false
        }
    }
    
    componentWillReceiveProps(nextProps) {
        e.setLanguage(nextProps.language)
    }

    componentWillUnmount() {
        const {email, password} = this.state;
        this.props.saveRegistrationParams({email, password})
    }

    inputHandler = (type, value) => {
        this.setState({ [type]: value })
    }

    close = () => {
        window.notification.confirm(e.reg_attention, e.reg_doYouReallyWantToAbortRegistrationProcess, e.reg_okCancel, (button) => {
            if (Number(button) !== 2) {
                this.props.exitRegistration()
            }
        })
    }

    toggleAgreement = () => {
        this.setState({agreement: !this.state.agreement})
    }

    register = () => {
        let error = false
        let {email, password, agreement} = this.state

        if(!email && !password && !agreement){
            window.notification.alert(e.reg_attention, e.reg_youMustFillOutEveryField, 'Ok', () => {})
            error = true;
        }else if(!agreement){
             window.notification.alert(e.reg_attention, e.reg_youMustAcceptTermsAndConditionsAndPrivacyPolicy, 'Ok', () => {})
             error = true;
        }else if(!/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email || '')){
            window.notification.alert(e.reg_attention, e.reg_emailYouEnteredIsNotValid, 'Ok', () => {})
            error = true
        }else if(!password || password.length < 8){
            window.notification.alert(e.reg_attention, e.reg_passwordYouEnteredIsNotValid, 'Ok', () => {})
            error = true
        }
        if(!error){
            let hashPass = new jsSHA("SHA-256", 'TEXT')
            hashPass.update(password + 'oewfgu9348u349erbuh89ghi3948bh9g84vhjnb934hg0j');// string literal is a SHA keyForTypeList
            this.props.registerEmail(email, hashPass.getHash('HEX'))
            this.props.setEmail(email)
        }

    }

    responseFacebook = (response) => {
        if(response.accessToken){
            this.props.setFacebookToken(response.accessToken)
            this.props.makeFacebookRegisterRequest(response.accessToken)
        }
    }

    togglePassHelp = () => {
        this.setState({passHelp: !this.state.passHelp})
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
        return(
            <div>
                <TopBar caption={e.reg_newRegistration} close={this.close} />
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
                        <FacebookLoginStyled>{
	                        window.cordova ? null :
                                <FacebookLogin
                                    appId="191332671475532"
                                    autoLoad={ false }
                                    fields="name,email,picture"
                                    callback={ this.responseFacebook }
                                />
                        }</FacebookLoginStyled>
                    </FacebookLogo>
                </AuthFacebookBlock>
                <AuthFormBlock>
                    <AuthBlockCaption captionColor='#ff7f00'>
                        <SeparatorLine width="240px" bgcolor="#c6c6c6" borderBottomColor="rgb(255, 255, 255)" />
                        <p>{e.reg_or}</p><SeparatorLine
                        width="240px" bgcolor="#c6c6c6" borderBottomColor="rgb(255, 255, 255)"
                    />
                    </AuthBlockCaption>
                    <TextInput
                        type="email" placeholder={e.reg_eMail} value={this.state.email}
                        onChange={(e) => {this.inputHandler('email', e.target.value.toLowerCase())}}
                    />
                    <br/>
                    <TextInput
                        onBlur={this.togglePassHelp} onFocus={this.togglePassHelp} type="password"
                        placeholder={e.reg_password} value={this.state.password}
                        onChange={(e) => {this.inputHandler('password', e.target.value)}}
                    /><br />
                    {
                        this.state.passHelp ?
                        <PasswordCaption>
                            {e.reg_passwordMustContainMinimum8Characters}
                        </PasswordCaption>
                        :
                        null
                    }
                </AuthFormBlock>
                <AuthBottomBlock>
                    <TermsBlock>
                        <label className='container needsclick'>
                            <input value={this.state.agreement} onClick={this.toggleAgreement} type='checkbox' className="needsclick"/>
                            <span className='checkmark needsclick'/>
                        </label>
                        <p>
                            {e.formatString(
                                e.reg_byRegisteringWithQuiz4YouIAcceptAndAgreeToTheFollowingAnd,
                                <br />,
                                <Link to={url.info.gtc}>{e.reg_termsAndConditions}</Link>,
                                <Link to={url.info.privacy}>{e.reg_privacyPolicy}</Link>
                            )}
                        </p>
                    </TermsBlock>
                    <SeparatorLine style={{margin: '40px auto'}} width='610px' bgcolor='#c6c6c6' borderBottomColor='rgb(255, 255, 255)'/>
                    <MetallicButtonWrapper>
                        <MetallicButton onClick={this.register}>
                            {e.reg_send}
                        </MetallicButton>
                    </MetallicButtonWrapper>
                </AuthBottomBlock>
            </div>
        )
    }
}
