import React from 'react'
import e from '../../../../langs'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import url from '../../../../constants/urlConstants'
import TopBar from '../../../modules/components/TopBar'
import Services from "./services2";

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
	font: 900 42px Univers-condensed;

	height: 112px;
	background-color: #232324;
	margin-bottom: 8px;
	box-shadow: 0px 4px 8px 0 rgba(0, 0, 0, 0.7);
`

const MoneyTitle = styled.div``

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

const MoneyList = styled.div`
	overflow: hidden;
    height: 860px;
    max-height: 860px;
    position: relative;
    .scrollable-wrapper{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: -17px;
        overflow-y: scroll;@media (max-width: 768px) {
            right: 0;
        }
    }
`

const DecoratedLink = styled(Link)`
    text-decoration: none;
`

const MoneyValue = styled.div`
	display: flex;
	justify-content: center;
    align-items: center;
    margin-bottom: 4px;
    box-shadow:  0 2px 0 rgb(209,209,209), 0 4px 0 rgb(242,242,242);
    position: relative;

    color: #ff7f00;
    font: 900 58px Univers-condensed;

    height: 125px;
    background: url('images/info-arrow.png') 659px center rgb(247,247,247) no-repeat;
    background-size: 68px;

    cursor: pointer;
`

const Footer = styled(MoneyValue)`
	font-size: 42px;
	font-weight: 500;
	color: #4d4d4d;
	text-transform: uppercase;
	position: fixed;
	bottom: 0;
	width: 100%;
	box-sizing: border-box;
	margin-bottom: 0;
	background: url('images/orange-arrow.png') 659px center rgb(247,247,247) no-repeat;
	background-size: 68px;
	border-bottom: 8px solid #ff7f00;
	box-shadow: none;
`

class Money extends React.Component {
	constructor(props) {
		super(props);
		props.initMoney();
		e.setLanguage(props.language)
	}

	state = {
		view: "MONEY",	// "SERVICES"
	}

	componentWillReceiveProps(nextProps) {
        e.setLanguage(nextProps.language);
        if (
            (!this.props.externalPayment && nextProps.externalPayment) ||
			(nextProps.externalPayment && (nextProps.externalPayment.transactionId !== this.props.externalPayment.transactionId))
		) {
        	this.setState({view: "SERVICES"});
		}
    }

    onMoneySelectHandler = (value) => {
        this.props.setCurrentDeposite(value);
        const contentResponse = {
            amount: value/2, /* it`s temp decision! wait fix from backend */
            currency: "MONEY",
            description: "Paying into account",
            redirectUrlError: url.payment.services,
            redirectUrlSuccess: url.payment.services
        }
        this.props.initExternalPayment(contentResponse);
	}

	back = () => {
		this.setState({view: "MONEY"});
	}

	render() {
		const {
			money,
			currency,
		} = this.props;

        const moneyValue = this.props.formatAmount(money)

		const deposits = [{value: 5}, {value: 10}, {value: 20}, {value: 30}, {value: 40}, {value: 50},];

		return (
				this.state.view === "MONEY" ?
					<Wrapper>
						<TopBar caption={e.payment_credits} />
						<Title>{`${moneyValue} ${currency}`}</Title>
						<MoneyTitle>
							<MoneySymbolLabel src='images/guthaben.png'>{e.payment_rechargeCredit}</MoneySymbolLabel>
							<MoneyList>
								<div className='scrollable-wrapper'>
									{
										deposits.map(deposite => (
                                            <MoneyValue
												key={deposite.value}
												onClick={this.onMoneySelectHandler.bind(this, deposite.value)}
											>
                                                <span>{`${this.props.formatAmount(deposite.value)} ${currency}`}</span>
                                            </MoneyValue>
										))
									}
								</div>
							</MoneyList>
						</MoneyTitle>
						<DecoratedLink to={url.payment.payout}>
							<Footer>
								<span>{e.payment_payOff}</span>
							</Footer>
						</DecoratedLink>
					</Wrapper>
					:
					<Services
                        money={money}
                        currency={currency}
                        currentDeposite={this.props.currentDeposite}
                        externalPayment={this.props.externalPayment}
                        lastPaymentService={this.props.lastPaymentService}
    					language={this.props.language}
                        initServices={this.props.initServices}
                        setLastPaymentService={this.props.setLastPaymentService}
                        formatAmount={this.props.formatAmount}
						back={this.back}
					/>
		)
	}
}

export default Money;
