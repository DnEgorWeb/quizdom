import React from 'react'
import e from '../../../../langs'
import styled from 'styled-components'
import TopBar from '../../../modules/components/TopBar'
import {connect} from 'react-redux'
import {Items, ItemAmount, ItemPrice, ToAllPackagesItem} from './topCreditsMobile'
import { withRouter } from 'react-router-dom'
import url from '../../../../constants/urlConstants'

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
        overflow-y: scroll;
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

const ToPopularPackagesItem = styled(ToAllPackagesItem)`
    img {
        transform: scale(-1, 1);
    }
`

class CreditsMobile extends React.Component {
    constructor(props) {
        super(props)
        e.setLanguage(props.language)
    }

    state = {
        presets: []
    }

    componentDidMount() {
        if (window.cordova && window.inAppPurchase) {
            window.inAppPurchase
                .getProducts(['qdw_package_0001', 'qdw_package_0002','qdw_package_0003', 'qdw_package_0004','qdw_package_0005', 'qdw_package_0006'])
                .then(products => {
                    this.setProducts(products);
                })
                .catch(err => {
                    alert(err);
                });
        }
    }

    setProducts = products => {
        const presets = []
        products.forEach((product) => {
            const toAmount = product.description.split(' ')[0]
            presets.push({
                toAmount: toAmount,
                fromAmount: product.priceAsDecimal,
                price: product.price,
                productId: product.productId,
                currency: product.currency,
                best: (toAmount == '50' || toAmount == '600'),
            });
        });
        this.presetsSmall = presets.slice(0, 3)
        this.presets = this.presetsSmall

        this.setState({presets})
    }

    toPreviuosScreen = () => {
        this.props.history.goBack()
    }

    buyCredit = index => () => {
        const {presets} = this.state

        window.inAppPurchase
            .buy(presets[index].productId)
            .then(data => {
                alert("data: " + data)
            })
            .catch(err => {
                alert('err: ' + err)
            })
    }

    render() {
        const {presets} = this.state
        return (
            <Wrapper>
                <TopBar caption={e.payment_myAccount} />
                <Title>Buy Credits</Title>
                <MoneyTitle>
                    <MoneySymbolLabel src='images/credits.png'>{this.props.credits}</MoneySymbolLabel>
                    <CreditsList>
                        <div className='scrollable-wrapper'>
                            {
                                presets.map((item, index) => (
                                    <Items key={item.productId} onClick={this.buyCredit(index)}>
                                        <ItemAmount>
                                            <img src="images/payment_credits.png" alt="credits"/>
                                            <span>{item.toAmount}</span>
                                        </ItemAmount>
                                        <ItemPrice>
                                            {`${item.price}`}
                                        </ItemPrice>
                                    </Items>
                                ))
                            }
                            <ToPopularPackagesItem onClick={this.toPreviuosScreen}>
                                <img src="images/info-arrow.png" alt="arrow"/>
                                <span>POPULAR PACKAGES</span>
                            </ToPopularPackagesItem>
                        </div>
                    </CreditsList>
                </MoneyTitle>
            </Wrapper>
        )
    }
}

export default withRouter(connect(state => {
    return {
        language: state.profile.settings.languageId,
        credits: state.profile.stats.creditsAmount
    }
})(CreditsMobile));
