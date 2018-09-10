import React from 'react'
import e from '../../../../langs'
import styled from 'styled-components'

import TopBar from '../../../modules/components/TopBar'
import {
	AuthFacebookBlock,
	AuthFormBlock,
	TextInput,
	TopText,
    Text
} from '../../../modules/components/AuthComponents'

import { MetallicButton, MetallicButtonWrapper } from '../../../modules/components/MetallicButton'

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

const Title = styled.h2`
	color: rgb(255,149,0);
	font-size: 38px;
	font-weight: 500;
	text-transform: uppercase;
	text-align: center;

	margin: 20px 0 0;
	padding: 0;
`

const SubmitCodeTopText = styled(TopText)`
    span.email {
        font-size: 34px;
    }
`

const ReturnButtonWrapper = styled(MetallicButtonWrapper)`
	margin: 10px auto 0;
	width: 132px;
	height: 132px;
	border-radius: 50%;
	border: 2px solid rgb(242,242,242);
`

const ReturnButton = styled(MetallicButton)`
	width: 96px;
	height: 96px;
	border-radius: 50%;
	background: url('images/back-arrow.png') center rgb(250,250,250) no-repeat;
`

const TextUnderLine = styled.div`
    color: rgb(255,149,0);
	font-size: 38px;
	font-weight: 900;
	position: relative;
	margin: 10px 70px 0;
	.text {
	    position: relative;
	    width: 120px;
        margin: 0 auto;
        z-index: 2;
        background: rgb(236,236,236);
        text-align: center;
	}

`

const Line = styled.div`
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 4px;
    background: linear-gradient(to bottom, rgb(198,198,198), white);
    z-index: 1;
`

const BackSubmit = styled(Text)`
    cursor: pointer;
`

export default class SubmitCode extends React.Component{
    constructor(props) {
        super(props)
        e.setLanguage(props.language)
    }
    
    state = {
        code: ''
    }
    
    componentWillReceiveProps(nextProps) {
        e.setLanguage(nextProps.language)
    }

    submitCode = () => {
        let {code} = this.state
        let {email} = this.props
        this.props.submitCode(code, email)
    }

    resendCode = () => {
        let {token, email} = this.props
        this.props.resendEmailRegistrationCode(token, email)
        window.notification.alert(e.reg_attention, e.reg_codeWasResend, 'Ok', () => {})
    }

    close = () => {
        window.notification.confirm(e.reg_attention, e.reg_doYouReallyWantToAbortRegistrationProcess, e.reg_okCancel, (button) => {
            if (Number(button) !== 2) {
                this.props.exitRegistration()
            }
        })
    }

    inputHandler = (type, value) => {
        this.setState({ [type]: value.toUpperCase() })
    }

    backToEmail = () => {
	    this.props.resetRegistrationToken();
    }

    render(){
        return (
            <Wrapper>
                <TopBar caption={e.reg_activateEMail} close={this.close} />
                <TopPanel>
                    <Title>{e.reg_thankYouForYourRegistration}</Title>
                    <SubmitCodeTopText>
                        {
                            e.formatString(
                                e.reg_underYourEMailAddressYouWillFindThe6DigitCode,
                                <span className="email">{this.props.email}</span>
                            )
                        }
                    </SubmitCodeTopText>
                </TopPanel>
                <MiddlePanel>
                    <Text margin="40px">
                        {e.formatString(
                            e.reg_forTheActivationYouGet,
                            <span className="bonus">{e.reg_2000bonusPoints}</span>
                        )}
                    </Text>
                    <TextInput 
                        onChange={(e) => {this.inputHandler('code', e.target.value)}} 
                        placeholder={e.reg_enterActivationCode} 
                        value={this.state.code} />
                    <MetallicButtonWrapper>
                        <MetallicButton onClick={this.submitCode}>{e.reg_send}</MetallicButton>
                    </MetallicButtonWrapper>
                </MiddlePanel>
                <Text margin="30px 0 0">
                    {e.reg_ifYouDidNotReceiveAnActivationCodeJustHaveItSentAgain}
                </Text>
                <ReturnButtonWrapper>
                    <ReturnButton onClick={this.resendCode}/>
                </ReturnButtonWrapper>
                <TextUnderLine>
                    <div className="text">{e.reg_or}</div>
                    <Line />
                </TextUnderLine>
                <BackSubmit margin="10px 0 0" onClick={this.backToEmail}>
                    {e.reg_backToTheEmailProcessing}
                </BackSubmit>
            </Wrapper>
        )
    }

}
