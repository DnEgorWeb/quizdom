import React from 'react'
import e from '../../../../langs'
import styled from 'styled-components'
import { Link, withRouter } from 'react-router-dom'
import url from '../../../../constants/urlConstants'
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
    margin-bottom: 4px;
    box-shadow:  0 2px 0 rgb(224,224,224), 0 4px 0 white;

	height: 125px;
	background: url(${props => props.src}) left center rgb(236,236,236) no-repeat;

	text-transform: uppercase;
	font: 500 42px Univers-condensed;
`

const DecoratedLink = styled(Link)`
    text-decoration: none;
`

const MoneyValue = styled.div`
	display: flex;
    align-items: center;
    padding-left: 192px;margin-bottom: 4px;
    box-shadow:  0 2px 0 rgb(209,209,209), 0 4px 0 rgb(242,242,242);
    position: relative;

    color: #ff7f00;
    font: 900 58px Univers-condensed;

    height: 125px;
    background: url('images/info-arrow.png') 659px center rgb(247,247,247) no-repeat;
    background-size: 68px;

    cursor: pointer;
`

const Footer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	position: relative;
	height: 239px;

	padding: 0 90px;
	margin-top: 35px;
	&::before {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		content: '';
		height: 239px;
		width: 4px;
		background-image: linear-gradient(to right, rgb(198,198,198), white)
	}
`

const FooterButtonWrapper = styled.div`
	width: 260px;
	height: 112px;
	border-radius: 18px;
	background-image: linear-gradient(to top, white, rgb(209,207,207));
	border: solid 2px #f2f2f2;

	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
`

const FooterButton = styled.div`
	background: url(${props => props.src}) center rgb(241,241,241) no-repeat;
	width: 232px;
	height: 76px;
	border-radius: 8px;

	box-shadow: 0 10px 25px #888888, 0 -4px 0 white, 0 -8px 0 rgb(224,224,224);
	cursor: pointer;

	&:active {
		box-shadow: 0 3px 8px #888888;
		background-position-Y: calc(50% + 2px);
	}
`

const ButtonTitle = styled.div`
	font-size: 36px;
	font-weight: 500;
	text-align: center;
	text-transform: uppercase;
	margin-top: 10px;
	color: #333333;
`

const buttons = [
	{
		title: e.payment_bills,
		src: 'images/rechnungen.png',
		to: url.payment.bill
	},

	{
		title: e.payment_history,
		src: 'images/historie.png',
		to: url.payment.history
	},
]

class Payment extends React.Component {
	constructor(props) {
		super(props)
		props.initPayment()
        e.setLanguage(props.language)
	}

	componentWillReceiveProps(nextProps) {
        e.setLanguage(nextProps.language)
    }

    checkFullRegistration = () => {
		if (this.props.isFullyRegistered) return;
        window.notification.confirm(e.payment_attention, e.payment_ouMustBeRegisteredInOrderToGetAccessToThisFeature, e.payment_okCancel, (button) => {
            if (Number(button) !== 2) {
                this.props.history.push('/profile')
			}
		})
	}

	render() {
		const {
			money,
			bonus,
			credit,
			currency
		} = this.props

		const moneyValue = this.props.formatAmount(money)
        const bonusesValue = this.props.formatBonuses(bonus)

		const kontos = [
			{
				title: e.payment_credits,
				src: 'images/guthaben.png',
				value: `${moneyValue} ${currency}`,
				to: url.payment.money
			},
			{
				title: e.payment_credits,
				src: 'images/credits.png',
				value: `${credit} CR`,
				to: url.payment.credit
			},
			{
				title: e.payment_bonusPoints,
				src: 'images/05130_my_account.png',
				value: `${bonusesValue} BP`,
				to: url.payment.bonus
			},
		]

		return (
			<Wrapper>
				<TopBar caption={e.payment_myAccount} />
				<Title>{e.payment_overview}</Title>
				{
					kontos.map((konto, index) => (
						<MoneyTitle key={index} onClick={this.checkFullRegistration}>
							<MoneySymbolLabel src={konto.src}>{konto.title}</MoneySymbolLabel>
							{
								this.props.isFullyRegistered ?
                                    <DecoratedLink to={konto.to}>
                                        <MoneyValue>
                                            <span>{konto.value}</span>
                                        </MoneyValue>
                                    </DecoratedLink>
									:
                                    <MoneyValue>
                                        <span>{konto.value}</span>
                                    </MoneyValue>
							}
						</MoneyTitle>
					))
				}
				<Footer>
					{
						buttons.map((button, index) => (
							<DecoratedLink to={button.to} key={index}>
								<FooterButtonWrapper>
									<FooterButton src={button.src} />
								</FooterButtonWrapper>
								<ButtonTitle>{button.title}</ButtonTitle>
							</DecoratedLink>
						))
					}
				</Footer>
			</Wrapper>
		)
	}
}

export default withRouter(Payment)