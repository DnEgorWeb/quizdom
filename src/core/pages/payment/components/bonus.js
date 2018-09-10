import React from 'react'
import e from "../../../../langs"
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import url from '../../../../constants/urlConstants'
import TopBar from '../../../modules/components/TopBar'

const DecoratedLink = styled(Link)`
    text-decoration: none;
`

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
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.7);
`

const MoneyTitle = styled.div`
	margin-top: 58px;
    box-shadow: 0 -2px 0 rgb(242,242,242),  0 -4px 0 rgb(209,209,209);

	&:first-child {
		margin-top: 0;
		box-shadow: none;
	}
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

const MoneyValue = styled.div`
	display: flex;
    align-items: center;
    padding-left: 192px;
    margin-bottom: 4px;
    box-shadow:  0 2px 0 rgb(209,209,209), 0 4px 0 rgb(242,242,242);
    position: relative;
    text-transform: uppercase;

    color: #4d4d4d;
    font: 500 42px Univers-condensed;

    height: 125px;
    background: url('images/orange-arrow.png') 659px center rgb(247,247,247) no-repeat;
    background-size: 68px;

    cursor: pointer;
`

const kontos = [
	{
		title: e.payment_bonusPointsPrograms,
		src: 'images/05130_my_account.png',
		list: [
            {text : e.payment_tombolaLoose, link : url.tombola.index},
            {text : e.payment_exchangeCoupons, link : url.voucher.index}
		]
	},
	{
		title: e.payment_bonusPointsSpecials,
		src: 'images/05130_my_account.png',
		list: [
			{text: e.payment_rewardVideos},
			{text: e.payment_offerwall}
		]
	},
]

class Bonus extends React.Component {
	constructor(props) {
		super(props);
		props.initBonus();
		e.setLanguage(props.language)
	}

	componentWillReceiveProps(nextProps) {
        e.setLanguage(nextProps.language)
    }

	render() {
		const {bonus} = this.props;
		const bonusValue = this.props.formatBonuses(bonus)
		return (
			<Wrapper>
				<TopBar caption={e.payment_bonusPoints} />
				<Title>{`${bonusValue} bp`}</Title>
				<div>
					{
						kontos.map((konto, index)=> (
							<MoneyTitle key={index}>
								<MoneySymbolLabel src={konto.src}>{konto.title}</MoneySymbolLabel>
								{
									konto.list.map((item, index) => (
										<DecoratedLink key={index} to={item.link || url.payment.bonus}>
											<MoneyValue>
												<span>{item.text}</span>
											</MoneyValue>
										</DecoratedLink>
									))
								}
							</MoneyTitle>
						))
					}
				</div>
			</Wrapper>
		)
	}
}
export default Bonus;
