import React from 'react'
import e from '../../../../langs'
import styled from 'styled-components'
import TopBar from '../../../modules/components/TopBar'

const Wrapper = styled.div`
	height: 100%;
	font-family: Univers-condensed;
	background: rgb(236,236,236);
`

const Title = styled.div`
	text-transform: uppercase;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #ff7f00;
	font: 500 42px Univers-condensed;

	height: 112px;
	background-color: #232324;
	margin-bottom: 8px;
	box-shadow: 0px 4px 8px 0 rgba(0, 0, 0, 0.7);
`

const MoneyTitle = styled.div`

`

const MoneySymbolLabel = styled.div`
    display: flex;
    align-items: center;
    padding-left: 192px;

	height: 125px;
	background: url(${props => props.src}) left center rgb(236,236,236) no-repeat;

	text-transform: uppercase;
	font: 500 42px Univers-condensed;
`

const Form = styled.div`
	padding-bottom: 36px;
	margin-bottom: 4px;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
`

const FormGroup = styled.div`
	padding: 0 76px;
	display: flex;
	justify-content: flex-start;
`

const FormInput = styled.input`
	display: block;
	width: 100%;
	height: 100px;
	border-radius: 50px;
	background-color: #ffffff;
	border: solid 2px #a6a6a6;
	color: ${props => props.money ? '#ff7f00' : '#818181'};
	font: 500 40px Univers-condensed;
	padding: 0 41px;
	box-sizing: border-box;

	margin-top: 30px;

	&:first-child {
		margin: 0;
	}

	&:focus {
		outline: none;
	}
`

const Label = styled.label`
	font-size: 40px;
	font-weight: 500;
	color: #818181;

	& > input {
		display: inline-block;
		width: 500px;
	}
`

const Separator = styled.div`
	width: 100%;
	height: 4px;
	background-image: linear-gradient(rgb(198,198,198), white);
	margin: 40px 0;
`

const Text = styled.div`
	font-size: 36px;
	font-weight: 500;
	text-transform: uppercase;
	text-align: center;
	color: #333333;
	margin: 66px 0 25px;
`

const ButtonWrapper = styled.div`
	margin: 0 auto;
	padding: 0 14px;
	height: 112px;
	border-radius: 56px;
	background-image: linear-gradient(to top, #f8f8f8, #d0cece);
	border: solid 2px #f2f2f2;

	display: inline-flex;
	justify-content: center;
	align-items: center;
`

const SendButton = styled.button`
	border: none;

	background-image: linear-gradient(to right, rgb(239,239,239), white);
	height: 78px;
	border-radius: 38px;
	font-size: 48px;
	font-weight: bold;
	color: #ff7f00;
	text-transform: uppercase;

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

class Payout extends React.Component {
	constructor(props) {
		super(props);
		e.setLanguage(props.language)
		this.state = {
			moneyValue: this.props.money,
			iban: '',
			bic: ''
		}
		props.initPayout();
	}

	componentWillReceiveProps(nextProps) {
        e.setLanguage(nextProps.language)
    }

	inputChangeHandler = (prop, e) => {
		this.setState({[prop]: e.target.value});
	}

	sendPayoutResponse = () => {
		const {moneyValue, iban, bic} = this.state;
		const {firstName, lastName} = this.props.person;
		const contentResponse = {
			amount: -moneyValue,
			cashoutData: {
				iban,
				bic,
				beneficiary: `${firstName} ${lastName}`
			}
		}
		this.props.initExternalPayment(contentResponse);
	}

	render() {
		const {money, currency} = this.props
		const {moneyValue, iban, bic} = this.state
		return (
			<Wrapper>
				<TopBar caption={e.payment_credits} />
				<Title>{`${this.props.formatAmount(money)} ${currency}`}</Title>
				<Form>
					<MoneyTitle>
						<MoneySymbolLabel src='images/guthaben.png'>{e.payment_toPayOff}</MoneySymbolLabel>
					</MoneyTitle>
					<FormGroup>
						<Label>
							<FormInput type='text' value={this.props.formatAmount(moneyValue)} money onChange={this.inputChangeHandler.bind(this, 'moneyValue')}/> EURO
						</Label>
					</FormGroup>

					<FormGroup>
						<Separator />
					</FormGroup>

					<FormGroup>
						<FormInput value={iban} placeholder="IBAN" onChange={this.inputChangeHandler.bind(this, 'iban')}/>
					</FormGroup>

					<FormGroup style={{marginTop: 30}}>
						<FormInput value={bic} placeholder="BIC" onChange={this.inputChangeHandler.bind(this, 'bic')} />
					</FormGroup>

					<Text>{e.payment_payNow}</Text>
					<FormGroup>
						<ButtonWrapper>
							<SendButton onClick={this.sendPayoutResponse}>{e.payment_send}</SendButton>
						</ButtonWrapper>
					</FormGroup>

				</Form>
			</Wrapper>
		)
	}
}

export default Payout;
