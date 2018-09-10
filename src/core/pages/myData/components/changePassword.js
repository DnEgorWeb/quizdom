import React from 'react'
import e from '../../../../langs'
import jsSHA from 'jssha'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import { MetallicButton, MetallicButtonWrapper } from '../../../modules/components/MetallicButton'
import {
     AuthFormBlock,
     TextInput
 } from '../../../modules/components/AuthComponents'

import TopBar from '../../../modules/components/TopBar'

const TopPanel = styled.div`
	width: 100%;
	height: 280px;
	background-color: #343435;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.7);
	margin-bottom: 4px;
	box-sizing: border-box;
    position: relative;
    z-index: 3;
	padding: 20px 88px 0;
`

const TopText = styled.p`
    font-family: Overpass, sans-serif;
	margin: 27px 0 0;
	text-align: center;
	font-size: 38px;
	font-weight: 500;
	color: rgb(230,230,230);
	span.email {
		color: rgb(255,149,0);
		display: block;
        font-size: 54px;
	}
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

class SetPasswordForm extends React.Component{
    constructor(props) {
        super(props)
        e.setLanguage(props.language)
    }

    state = {
        newPassword: '',
        confirmPassword: '',
        oldPassword: ''
    }

    inputHandler = (type, value) => {
        this.setState({ [type]: value })
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.redirectionFlag){
            this.props.history.push('/profile')
        }
        e.setLanguage(nextProps.language)
    }

    submit = () => {
        const {oldPassword, newPassword, confirmPassword } = this.state
        if(!oldPassword){
            window.notification.alert(e.mydata_attention, e.mydata_youDoNotEnterOldPassword, e.mydata_ok, () => {})
        }else if(!newPassword || !newPassword.length ){
            window.notification.alert(e.mydata_attention, e.mydata_youDoNotEnterNewPassword, e.mydata_ok, () => {})
        }else if(newPassword && newPassword.length < 8){
            window.notification.alert(e.mydata_attention, e.mydata_passwordTooShort, e.mydata_ok, () => {})
        }else if(newPassword !== confirmPassword){
            window.notification.alert(e.mydata_attention, e.mydata_passwordsDoNotMatch, e.mydata_ok, () => {})
        }else{
            let hashPass = new jsSHA("SHA-256", 'TEXT')
            let oldHashPass = new jsSHA("SHA-256", 'TEXT')
            hashPass.update(newPassword + 'oewfgu9348u349erbuh89ghi3948bh9g84vhjnb934hg0j');// string literal is a SHA keyForTypeList
            oldHashPass.update(oldPassword + 'oewfgu9348u349erbuh89ghi3948bh9g84vhjnb934hg0j');
            this.props.changePassword({newPassword:hashPass.getHash('HEX'), oldPassword: oldHashPass.getHash('HEX')})
        }
    }

    render(){
        return (
            <div>
                <TopBar caption={e.mydata_reLogin} />
                <TopPanel>
                    <TopText>
                        {
                            e.formatString(
                                e.mydata_pleaseEnter,
                                <br/>,
                                <span className="email">{e.mydata_newPassword}</span>
                            )
                        }
                    </TopText>
                </TopPanel>
                <AuthMiddleBlock>
                    <TextInput
                        type='password'
                        placeholder={e.mydata_oldPassword.toUpperCase()}
                        value={this.state.oldPassword}
                        onChange={(e) => {this.inputHandler('oldPassword', e.target.value)}}
                    />
                    <br/>
                    <TextInput
                        type='password'
                        placeholder={e.mydata_newPassword.toUpperCase()}
                        value={this.state.newPassword}
                        onChange={(e) => {this.inputHandler('newPassword', e.target.value)}}
                    />
                    <br/>
                    <TextInput
                        type='password'
                        placeholder={e.mydata_confirmPassword.toUpperCase()}
                        value={this.state.confirmPassword}
                        onChange={(e) => {this.inputHandler('confirmPassword', e.target.value)}}
                    /><br/>
                    <Note>Note:</Note>
                    <PasswordCaption>
                        {e.mydata_passwordMustContainMinimumOf8Characters}
                    </PasswordCaption>
                    <MetallicButtonWrapper>
                        <MetallicButton onClick={this.submit}>{e.mydata_send}</MetallicButton>
                    </MetallicButtonWrapper>
                </AuthMiddleBlock>
            </div>
        )
    }
}

export default withRouter(SetPasswordForm)
