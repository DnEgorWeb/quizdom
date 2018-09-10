import React from 'react'
import e from '../../../../langs'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import url from '../../../../constants/urlConstants';

import {
	AuthFacebookBlock,
	AuthFormBlock,
	TextInput,
	TopText,
	Text
} from '../../../modules/components/AuthComponents'

import { MetallicButton, MetallicButtonWrapper } from '../../../modules/components/MetallicButton'

import TopBar from '../../../modules/components/TopBar'

const ForgotPasswordWrapper = styled.div`
	a{
		text-decoration: none;
	}
	background: rgb(236,236,236);
	height: 100%;
`

const ForgotPasswordTopPanel = styled(AuthFacebookBlock)`
	height: 270px;
	overflow: hidden;
`

const ForgotPasswordTopText = styled(TopText)`
	margin: 48px 0 0;
	font-size: 42px;
	span.email {
		font-size: 65px;
	}
`

export default class ForgotPassword extends React.Component {

	state = {
		email: ''
	}

	recoverPassword = () => {
		const {email} = this.state
		let error = false
		if(!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email || '')){
            window.notification.alert(e.login_attention, e.login_emailYouEnteredIsNotValid, 'Ok', () => {})
            error = true
		}

		if(!error){
			this.props.recoverPassword(email)
		}
	}


    inputHandler = (type, value) => {
        this.setState({ [type]: value })
    }

	render(){
		return (
			<ForgotPasswordWrapper>
				<TopBar caption='PASSWORT VERGESSEN' close={this.props.close}/>
				<ForgotPasswordTopPanel>
					<ForgotPasswordTopText>
						{e.formatString(
						    e.login_pleaseEnterYourEMailAddress,
                            <span className="email">{e.login_eMailAddress}</span>
                        )}!
					</ForgotPasswordTopText>
				</ForgotPasswordTopPanel>
				<AuthFormBlock>
					<TextInput margin="94px 0 0" placeholder="E-MAIL" onChange={(e) => {this.inputHandler('email', e.target.value)}} />
					<MetallicButtonWrapper>
						<MetallicButton onClick={this.recoverPassword}>{e.login_send}</MetallicButton>
					</MetallicButtonWrapper>
				</AuthFormBlock>
				<Link to={url.feedback ? url.feedback.index : ''}><Text margin="70px 0 0">{e.login_youNeedHelp}?</Text></Link>
			</ForgotPasswordWrapper>
		)
	}
}
