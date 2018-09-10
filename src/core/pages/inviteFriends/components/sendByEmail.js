import React from 'react'
import e from '../../../../langs'
import styled from 'styled-components'
import TopBar from '../../../modules/components/TopBar'
import {
	TextInput,
	AuthFormBlock
} from '../../../modules/components/AuthComponents'

import {MetallicButtonWrapper, MetallicButton} from '../../../modules/components/MetallicButton'

const ContentBlock = styled.div`
	background-color: #ececec;
	height: calc(100% - 98px);
`

const BlackBlock = styled.div`
	height: 155px;
	background-color: #232324;
	box-shadow: 0px 4px 8px 0 rgba(0, 0, 0, 0.7);
	position: relative;
    z-index: 3;

    font-family: Univers-condensed;
	font-size: 42px;
	font-weight: 500;
	color: #ff7f00;
	display: flex;
	justify-content: center;
    align-items: center;
`

const FormBlock = styled(AuthFormBlock)`
	height: auto;
`

const TextArea = styled.textarea`
	width: 672px;
	height: 500px;
	border-radius: 20px;
	background-color: #ffffff;
	border: solid 2px #818181;
	display: block;
	margin: 40px auto;
	resize: none;

    font-family: Univers-condensed;
	font-size: 40px;
    color: #818181;
    padding: 35px;
    box-sizing: border-box;
`

const Input = styled(TextInput)`
	width: 672px;
	display: block;
	margin: 40px auto 40px;
`

const SendButtonWrapper = styled(MetallicButtonWrapper)`
	width: 342px;
	height: 112px;
	border-radius: 56px;
	margin-top: 130px;
`

const SendButton = styled(MetallicButton)`
	width: 314px;
	height: 78px;
	border-radius: 38px;
	font-size: 48px;
	text-transform: uppercase;
`

class SendByEmail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			text: ''
		}
		e.setLanguage(props.language)
	}
	
	componentWillReceiveProps(nextProps) {
        e.setLanguage(nextProps.language)
    }

	sendInvite = (options) => {
		this.props.sendInviteResponse(options)
	}

	onChangeHandler = (e, type) => {
		this.setState({[type]: e.target.value})
	}

	render() {
		const {email, text} = this.state;
		return (
			<div style={{height: '100%'}}>
				<TopBar caption={e.invite_invitePeople}/>
				<ContentBlock>
					<BlackBlock>
                        {e.invite_informationTextMaybeBigMaybeLittle}
					</BlackBlock>
					<FormBlock>
						<Input onChange={(e) => this.onChangeHandler(e, 'email')} type='email' placeholder={e.invite_addEmail} />
						<TextArea onChange={(e) => this.onChangeHandler(e, 'text')} placeholder={e.invite_inviteText} />
					</FormBlock>
					<SendButtonWrapper>
						<SendButton onClick={() => this.sendInvite({email, text})}>{e.invite_send}</SendButton>
					</SendButtonWrapper>
				</ContentBlock>
			</div>
		)
	}
}

export default SendByEmail;
