import React from 'react'
import styled from 'styled-components'

import TopBar from '../../../modules/components/TopBar'

const Wrapper = styled.div`
	background: rgb(236,236,236);
	height: 100%;
`

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

const MiddlePanel = styled.div`
    position: relative;
    z-index: 2;
	padding: 30px 80px 0;
	width: 100%;
	height: 460px;
	background-color: #ececec;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
	border: solid 1px #c9c9c9;
	box-sizing: border-box;

	display: flex;
	flex-flow: column;
	justify-content: space-around;
	align-items: center;
`

const BottomPanel = styled.div`
    position: relative;
    z-index: 1;
	padding: 25px 70px 55px;
    height: 440px;
	background: rgb(236,236,236);
`


const TopText = styled.p`
	margin: 27px 0 0;
	text-align: center;
	font-size: 38px;
	font-weight: 500;
	color: rgb(230,230,230);
	span.email {
		color: rgb(255,149,0);
		display: block;
	}
`

const Input = styled.input`
	box-sizing: border-box;
	width: 100%;
	height: 96px;
	font: 500 38px Overpass;
	text-transform: uppercase;
	color: rgb(50,50,50);
	border-radius: 48px;
	border: 2px solid rgb(129,129,129);
	padding: 0 30px;
	&:focus {
		outline: none;
	}
	&::placeholder {
		font-size: 30px;
	}
`

const SendButtonWrapper = styled.div`
	padding: 0 13px;
	height: 112px;
	border-radius: 66px;
	background-image: linear-gradient(to top, #f8f8f8, #d0cece);
	border: solid 2px #f2f2f2;

	display: inline-flex;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
`

const SendButton = styled.button`
	border: none;

	background-image: linear-gradient(to right, rgb(239,239,239), white);
	height: 78px;
	border-radius: 38px;
	font-size: 38px;
	font-weight: bold;
	color: #ff7f00;
	text-transform: uppercase;
	cursor: pointer;

	box-shadow: 0 10px 25px #888888, 0 -4px 0 white, 0 -8px 0 rgb(224,224,224);

	padding: 0 83px;

	&:focus {
		outline: none;
	}

	&:active {
		box-shadow: 0 3px 8px #888888;
		transform: translate(2px, 0);
	}
`

export default class NicknameSet extends React.Component{

    state = {
        email: ''
    }


    inputHandler = (type, value) => {
        this.setState({ [type]: value })
    }

    submit = () => {
        if(this.state.phone){
            this.props.updateProfile(
				{
	               profile: {
	                   person: {
	                       email: this.state.phone
	                   }
	               }
	           },
			   'setNickname'
			)
        }else{
            window.notification.alert('Attention', 'Email must be filled', 'Ok', () => {})
        }
    }

    render(){
        return (
            <Wrapper>
                <TopBar caption={e.mydata_email.toUpperCase()} />
                <TopPanel>
                    <TopText>
                        {
                            e.formatString(
                                e.mydata_pleaseEnterPersonal,
                                <span className="email">{e.mydata_email}</span>
                            )
                        }
                    </TopText>
                </TopPanel>
                <MiddlePanel>
                    <Input placeholder={e.mydata_email.toUpperCase()} value={this.state.email} onChange={(e) => {this.inputHandler('email', e.target.value)}} />
                    <SendButtonWrapper>
                        <SendButton onClick={this.submit}>{e.mydata_send}</SendButton>
                    </SendButtonWrapper>
                </MiddlePanel>
                <BottomPanel/>
            </Wrapper>
        )
    }

}
