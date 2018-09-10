import React from 'react'
import e from '../../../../langs'
import styled from 'styled-components'
// import url from '../../../../constants/urlConstants'
import TopBar from '../../../modules/components/TopBar'
import { MetallicButton, MetallicButtonWrapper } from '../../../modules/components/MetallicButton'

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

/*const LastServiceWarpper = styled.div`
	padding: 26px 55px 0;
	display: flex;
	justify-content: space-between;

	margin-bottom: 4px;
	box-shadow: 0 2px 0 rgb(209,209,209), 0 4px 0 rgb(242,242,242);
`*/

/*const Label = styled.div`
	font: 900 34px Overpass;
  	color: #4d4d4d;

  	width: 300px;
	height: 136px;
	display: flex;
	flex-flow: column;
	justify-content: center;
	align-items: flex-end;

	& > p {
		margin: 0;
	}
`*/

/*const Service = styled.a`
	width: 300px;
	height: 136px;
	background: url(${props => props.src}) center #ffffff no-repeat;
	border: solid 2px #dadada;
	margin: 26px;
	cursor: pointer;

	display: inline-block;
`*/

/*const ServicesWrapper = styled.div`
	overflow: hidden;
    height: 635px;
    max-height: 635px;
    position: relative;
    .scrollable-wrapper{
        //display: flex;
		//justify-content: space-between;
		//align-items: flex-start;
		//flex-wrap: wrap;
		//padding: 26px 55px;

        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: -17px;
        overflow-y: scroll;
    }
`*/

const MoneyList = styled.div`
	overflow: hidden;
    height: 260px;
    max-height: 260px;
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
    background: rgb(247,247,247);
    background-size: 68px;
`

/*const services = [
	{src: 'bank-uber.png'},
	{src: 'sofort-uber.png'},
	{src: 'master-card.png', settingId: 5},
	{src: 'visa.png'},
	{src: 'pay-pal.png', settingId: 4},
	{src: 'u-kash.png', settingId: 6},
	{src: 'neteller.png'},
	{src: 'skrill.png'},
]*/

class Services extends React.Component {
	constructor(props) {
		super(props);
		e.setLanguage(props.language)
		props.initServices();
	}

	componentWillReceiveProps(nextProps) {
        e.setLanguage(nextProps.language)
    }

	/*useService = (service) => {
		this.props.setLastPaymentService(service)
	}*/

	render() {
		const {
			currentDeposite,
			money,
			currency,
			externalPayment,
			// lastPaymentService,
		} = this.props;

		const {forwardUrl = ''} = externalPayment ? externalPayment : {};
        const moneyValue = this.props.formatAmount(money);
		return (
			<Wrapper>
				<TopBar back={this.props.back} caption={e.payment_credits} />
				<Title>{`${moneyValue} ${currency}`}</Title>
                <MoneyTitle>
                    <MoneySymbolLabel src='images/guthaben.png'>{e.payment_rechargeCredit}</MoneySymbolLabel>
                    <MoneyList>
                        <div className='scrollable-wrapper'>
                            <MoneyValue>
                                <span>{`${currentDeposite} ${currency}`}</span>
                            </MoneyValue>
						</div>
					</MoneyList>
                </MoneyTitle>
                <MetallicButtonWrapper>
                    <MetallicButton>
                        <a href={forwardUrl}>
                            EINZAHLEN
						</a>
                    </MetallicButton>
                </MetallicButtonWrapper>
			</Wrapper>
		)
	}
}

export default Services;
