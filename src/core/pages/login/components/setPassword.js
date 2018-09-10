import React from 'react'
import e from '../../../../langs'
import jsSHA from 'jssha'
import styled from 'styled-components'


import { MetallicButton, MetallicButtonWrapper } from '../../../modules/components/MetallicButton'
import {
     AuthFacebookBlock,
     AuthFormBlock,
     TextInput,
     TopText
 } from '../../../modules/components/AuthComponents'

import TopBar from '../../../modules/components/TopBar'

const TopPanel = styled(AuthFacebookBlock)`
	height: 280px;
	overflow: hidden;
`
const AuthMiddleBlock = styled(AuthFormBlock)`
    height: 950px;
    input{
        margin-top: 60px;
        margin-bottom: 0px;
    }
`

const PasswordCaption = styled.p`
    font-family: Overpass, sans-serif;
    font-size: 32px;
    color: #333333;
    margin: auto;
    margin-bottom: 50px;
    width: 600px;
`

const Note = styled.p`
    margin-top: 45px;
    margin-bottom: 0px;
    font-weight: bold;
    color: #ff7f00;
    font-size: 32px;
`

export default class SetPasswordForm extends React.Component{

    state = {
        newPassword: '',
        confirmPassword: ''
    }

    inputHandler = (type, value) => {
        this.setState({ [type]: value })
    }

    submit = () => {
        const { newPassword, confirmPassword } = this.state
        if(!newPassword || !newPassword.length ){
            window.notification.alert(e.login_attention, e.login_youDoNotEnterNewPassword, 'Ok', () => {})
        }else if(newPassword && newPassword.length < 8){
            window.notification.alert(e.login_attention, e.login_passwordTooShort, 'Ok', () => {})
        }else if(newPassword !== confirmPassword){
            window.notification.alert(e.login_attention, e.login_passwordsDoNotMatch, 'Ok', () => {})
        }else{
            let hashPass = new jsSHA("SHA-256", 'TEXT')
            hashPass.update(newPassword + 'oewfgu9348u349erbuh89ghi3948bh9g84vhjnb934hg0j');// string literal is a SHA keyForTypeList
            this.props.setNewPassword(hashPass.getHash('HEX'))
            this.props.restorePassword();
            this.props.resetLoginData();
        }
    }

    render(){
        return (
            <div>
                <TopBar caption={e.login_reLogin} close={this.props.close}/>
                <TopPanel>
                    <TopText margin="60px 0 0">
                        {e.formatString(
                            e.login_pleaseEnter,
                            <br/>,
                            <span className="email">{e.login_newPassword}</span>
                        )}!
                    </TopText>
                </TopPanel>
                <AuthMiddleBlock>
                    <TextInput type='password' placeholder='NEW PASSWORD' value={this.state.newPassword} onChange={(e) => {this.inputHandler('newPassword', e.target.value)}} />
                    <br/>
                    <TextInput type='password' placeholder='CONFIRM PASSWORD' value={this.state.confirmPassword} onChange={(e) => {this.inputHandler('confirmPassword', e.target.value)}} /><br/>
                    <Note>Note:</Note>
                    <PasswordCaption>
                        {e.login_passwordMustContainMinimum8Characters}
                    </PasswordCaption>
                    <MetallicButtonWrapper>
                        <MetallicButton onClick={this.submit}>{e.login_send}</MetallicButton>
                    </MetallicButtonWrapper>
                </AuthMiddleBlock>
            </div>
        )
    }
}
