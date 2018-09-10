import React from 'react'
import e from '../../../../langs'
import styled from 'styled-components'
import TopBar from '../../../modules/components/TopBar'
import {getCurrencySymbol} from '../duck'

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

const CreditsList = styled.div`
	overflow: hidden;
    height: 986px;
    max-height: 986px;
    position: relative;

    border-bottom: 9px solid #ff7f00;
    box-sizing: border-box;
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

const MoneyValue = styled.div`
	display: flex;
	justify-content: center;
    align-items: center;
    margin-bottom: 4px;
    box-shadow:  0 2px 0 rgb(209,209,209), 0 4px 0 rgb(242,242,242);
    position: relative;

    text-transform: uppercase;
    color: #7d7d7d;
    font: 500 44px Univers-condensed;

    height: 125px;
    background: url('images/info-arrow.png') 659px center rgb(247,247,247) no-repeat;
    background-size: 68px;

    cursor: pointer;

    & > div > span {
    	color: #ff7f00;
    	font-weight: 900;
    	&:first-child {
    		padding-right: 15px;
    	}
    	&:last-child {
    		padding-left: 15px;
    	}
    }
`

class Credits extends React.Component {
	constructor(props) {
		super(props);
		props.initCredit();
		e.setLanguage(props.language)
	}

	state = {
        credit: 0
	}
	
	componentDidMount() {
		if (window.cordova && window.inAppPurchase) {
            window.inAppPurchase
                .getProducts(['qdw_package_0001', 'qdw_package_0002','qdw_package_0003', 'qdw_package_0004','qdw_package_0005', 'qdw_package_0006'])
                .then(products => {
                    this.setProducts(products);
                })
                .catch(err => {
                    console.log('!!!!!!', err);
                    alert('err');
                    alert(err);
                });
		}
    }


	componentWillReceiveProps(nextProps) {
        e.setLanguage(nextProps.language)
        
		if (this.state.credit === 0) {
			this.setState({
                credit: nextProps.credit
			})
		}
	}

    setProducts = products => {
        const presets = [];
        products.forEach((product) => {
            const toAmount = product.description.split(' ')[0];
            presets.push({
                toAmount: toAmount,
                fromAmount: product.priceAsDecimal,
                price: product.price,
                productId: product.productId,
                currency: product.currency,
                best: (toAmount == '50' || toAmount == '600'),
            });
        });
        this.presetsSmall = presets.slice(0, 3);
        this.presetsAll = presets;
        this.presets = this.presetsSmall;
	}

	formatValue = (rate)=> {
		if (rate.fromCurrency === "EUR") {
			return this.props.formatAmount(rate.fromAmount)
		}
		return this.props.formatBonuses(rate.fromAmount)
	}

	getPurchase = (rate) => {
		const amount = rate.fromAmount
		let currencyType = rate.fromCurrency
        const {money, bonus} = this.props
		const value = (currencyType === "BONUS") ? bonus : money
		if (amount > value) {
			return window.notification.alert(e.payment_attention, `${e.payment_youDonTHaveEnough} ${currencyType === "BONUS" ? 'bonus points' : 'money'}`, 'Ok', () => {})
		}
		this.confirmPurchase(rate, currencyType)
	};

	increaseCredits = (amount) => {
        this.setState({
            credit: this.state.credit + amount
        })
	}

	confirmPurchase = (rate, currencyType) => {
		const value = (currencyType === "BONUS") ? "BONUS" : "MONEY"
        const {convertBetweenCurrencies} = this.props

        window.notification.confirm(e.payment_attention, e.payment_areYouSure, e.payment_okCancel, (button) => {
            if (Number(button) !== 2) {
                convertBetweenCurrencies(value, "CREDIT", rate.fromAmount)
                this.increaseCredits(rate.toAmount)
                this.props.initCredit();
			}
        })
	}

	render() {
		const {exchangeRates} = this.props;
		// const {credit} = this.state;

		return (
			<Wrapper>
				<TopBar caption={e.payment_credits} />
				<Title>{`${this.state.credit} cr`}</Title>
				<MoneyTitle>
					<MoneySymbolLabel src='images/credits.png'>{e.payment_chargeCredits}</MoneySymbolLabel>
					<CreditsList>
						<div className='scrollable-wrapper'>
							{
								exchangeRates && exchangeRates.map((rate, index) => (
									<MoneyValue key={index} onClick={() => this.getPurchase(rate)}>
										<div>
											<span>{`${rate.toAmount} ${getCurrencySymbol(rate.toCurrency)}`}</span>
                                            {e.payment_for}
											<span>{`${this.formatValue(rate)} ${getCurrencySymbol(rate.fromCurrency)}`}</span>
										</div>
									</MoneyValue>
								))
							}
						</div>
					</CreditsList>
				</MoneyTitle>
			</Wrapper>
		)
	}
}

export default Credits;
