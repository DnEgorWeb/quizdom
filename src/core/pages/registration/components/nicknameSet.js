import React from 'react'
import e from '../../../../langs'
import styled from 'styled-components'

import TopBar from '../../../modules/components/TopBar'
import { MetallicButton, MetallicButtonWrapper } from '../../../modules/components/MetallicButton'
import {
    AuthFacebookBlock,
    AuthFormBlock,
    TextInput,
    TopText
} from '../../../modules/components/AuthComponents'

const Wrapper = styled.div`
	background: rgb(236,236,236);
	height: 100%;
`

const TopPanel = styled(AuthFacebookBlock)`
	overflow: hidden;
`

const MiddlePanel = styled(AuthFormBlock)`
	height: 460px;
`

const CodeTextInput = styled(TextInput)`
	margin: 94px 0 38px;
`

export default class NicknameSet extends React.Component{
    constructor(props) {
        super(props)
        e.setLanguage(props.language)
    }
    
    state = {
        defaultNickname: '',
        nickname: ''
    }

    componentWillReceiveProps(nextProps) {
        e.setLanguage(nextProps.language)
    }

    componentDidMount(){
        this.generateDefaultNickname();
    }


    close = (text) => {
        window.notification.confirm(
            e.reg_attention,
            `${text} ${this.state.defaultNickname}`,
            e.reg_okCancel, (button) => {
                if (Number(button) !== 2) {
                    this.props.updateProfile(
                        {
                            profile: {
                                person: {
                                    nickname: this.state.defaultNickname
                                }
                            }
                        },
                        'setNickname'
                    )
                }
            }
        )
    }

    inputHandler = (type, value) => {
        this.setState({ [type]: value })
    }

    generateDefaultNickname = () => {
        const defaultNickname = 'Guest' + Math.floor(Math.random() * (100000 - 1)) + 1
        this.setState({defaultNickname: defaultNickname})
    }

    submit = () => {
        if(this.state.nickname){
            this.props.updateProfile(
                {
                    profile: {
                        person: {
                            nickname: this.state.nickname
                        }
                    }
                },
                'setNickname'
            )
        } else {
            this.close(e.reg_doYouWantToAcceptDefaultNameYourNicknameWantsToBe)
        }
    }

    render(){
        return (
            <Wrapper>
                <TopBar caption='NICKNAME' close={() => this.close(e.reg_doYouReallyWantToAbortRegistrationProcessYouNicknameWantsToBeSetAs)} />
                <TopPanel>
                    <TopText margin='62px 0 0 '>
                        {
                            e.formatString(
                                e.reg_pleaseEnterPersonal,
                                <span className="email">{e.reg_username}</span>
                            )
                        }
                    </TopText>
                </TopPanel>
                <MiddlePanel>
                    <CodeTextInput placeholder={this.state.defaultNickname} value={this.state.nickname} onChange={(e) => {this.inputHandler('nickname', e.target.value)}} />
                    <MetallicButtonWrapper>
                        <MetallicButton onClick={this.submit}>{e.reg_send}</MetallicButton>
                    </MetallicButtonWrapper>
                </MiddlePanel>
            </Wrapper>
        )
    }

}
