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
	padding-top: 100px;
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

const ReturnButtonWrapper = styled(MetallicButtonWrapper)`
	margin: 30px auto 0;
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
        window.notification.alert(e.mydata_attention, e.mydata_codeWasResend, 'Ok', () => {})
    }

    inputHandler = (type, value) => {
        this.setState({ [type]: value.toUpperCase() })
    }

    render(){
        return (
            <Wrapper>
                <TopBar caption={e.mydata_activateEMail} />
                <TopPanel>
                    <Title>{e.mydata_thankYouForYourRegistration}</Title>
                    <TopText>
                        {
                            e.formatString(
                                e.mydata_underYourEMailAddressYouWillFindThe6DigitCode,
                                <span className="email">{this.props.email}</span>
                            )
                        }
                    </TopText>
                </TopPanel>
                <MiddlePanel>
                    <TextInput onChange={(e) => {this.inputHandler('code', e.target.value)}}
                               placeholder="ACTIVIRUNGSCODE EINGEBEN"
                               value={this.state.code} />
                    <MetallicButtonWrapper>
                        <MetallicButton onClick={this.submitCode}>{e.mydata_send}</MetallicButton>
                    </MetallicButtonWrapper>
                </MiddlePanel>
                <Text margin="50px 0 0">
                    {e.mydata_ifYouDidNotReceiveAnActivationCodeJustHaveItSentAgain}
                </Text>
                <ReturnButtonWrapper>
                    <ReturnButton onClick={this.resendCode}/>
                </ReturnButtonWrapper>
            </Wrapper>
        )
    }

}
