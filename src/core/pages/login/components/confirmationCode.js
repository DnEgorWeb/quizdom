import React from 'react'
import e from '../../../../langs';
import styled from 'styled-components'
import {
	AuthFacebookBlock,
	AuthFormBlock,
	TextInput,
	TopText,
    Text
} from '../../../modules/components/AuthComponents'

import { MetallicButton, MetallicButtonWrapper } from '../../../modules/components/MetallicButton'

import TopBar from '../../../modules/components/TopBar'

const Wrapper = styled.div`
	background: rgb(236,236,236);
	height: 100%;
`

const TopPanel = styled(AuthFacebookBlock)`
	height: 280px;
	overflow: hidden;
`

const MiddlePanel = styled(AuthFormBlock)`
	height: 460px;
`

const ReturnButtonWrapper = styled(MetallicButtonWrapper)`
    margin: 35px auto 0;
	width: 132px;
	height: 132px;
	border-radius: 50%;
`

const ReturnButton = styled(MetallicButton)`
	width: 96px;
	height: 96px;
	border-radius: 50%;
	background: url('images/back-arrow.png') center rgb(250,250,250) no-repeat;
`

export default class ConfirmationCode extends React.Component{

    state = {
        code: ''
    }

    inputHandler = (type, value) => {
        this.setState({ [type]: value.toUpperCase() })
    }

    submitCode = () => {
        const { code } = this.state
        if(code && code.length){
            this.props.submitCode(code)
        }else{
            window.notification.alert(e.login_attention, e.login_youNotEnterRestoreCode, e.login_ok, () => {})
        }
    }

	resendCode = () => {
			this.props.recoverPassword(this.props.email)
			window.notification.alert(e.login_attention, e.formatString(e.login_confirmationCodeWasResendedTo,this.props.email), e.login_ok, () => {})
	}

    render(){
        return (
            <Wrapper>
                <TopBar caption={e.login_activateEMail} close={this.props.close} />
                <TopPanel>
                    <TopText margin='55px 0 0'>
                        {
                            e.formatString(
                                e.login_underYourEMailAddressYouWillFindThe6DigitCode,
                                <span className="email">{this.props.email}</span>
                            )
                        }
                    </TopText>
                </TopPanel>
                <MiddlePanel>
                    <TextInput margin="70px 0 0"
                               onChange={(e) => {this.inputHandler('code', e.target.value)}}
                               placeholder={e.login_enterActivationCode}
                               value={this.state.code} />
					<MetallicButtonWrapper>
						<MetallicButton onClick={this.submitCode}>
                            {e.login_send}
						</MetallicButton>
					</MetallicButtonWrapper>
                </MiddlePanel>
                <Text margin="70px 0 0">
                    {e.login_shouldNotYouHaveReceivedAnActivationCodeJustHaveItSentAgain}
                </Text>
                <ReturnButtonWrapper>
                    <ReturnButton onClick={this.resendCode}/>
                </ReturnButtonWrapper>
            </Wrapper>
        )
    }
}
