import React, {Fragment} from 'react'
import e from '../../../../langs'
import styled from 'styled-components'
import { Link, withRouter } from 'react-router-dom'
import url from '../../../../constants/urlConstants'
import TopBar from '../../../modules/components/TopBar'
import Avatar from '../../../modules/components/ProfilePicture/ProfilePictureContainer'

const Wrapper = styled.div`
	height: 100%;
	font-family: Univers-condensed;
	background: rgb(236,236,236);
`

const Title = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	color: white;
	font: 500 40px Overpass-Reg;
	height: 500px;
	background-color: #232324;
	margin-bottom: 8px;
	box-shadow: 0px 4px 8px 0 rgba(0, 0, 0, 0.7);
`

const DecoratedLink = styled(Link)`
    text-decoration: none;
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

const Curency = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 180px;
    background-color: #dbdbdb;
`

const CurencyWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 150px;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    position:relative;
    
    &:nth-child(2)::before, &:nth-child(2)::after {
        content: '';
        position:absolute;
        display: block;
        width: 2px;
        height: 150px;
        background-color: #7d7d7d;
        border-right: 4px solid white;
    }
    
    &:nth-child(2)::before {
        left: 0;
    }
    
    &:nth-child(2)::after {
        right: 0;
    }
`

const CurrencyImg = styled.img``

const Value = styled.span`
    font-size: 38px;
    font-family: Univers-condensed-Medium;
    color: #4d4d4d;
`

const LinkWrapper = styled.div`
    margin-bottom: 10px;
    height: 120px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
    background-color:#fff;
`

const LinkTitle = styled.span`
    font-size: 44px;
    color: #7d7d7d;
    flex: 0 0 300px;
    text-align: center;
`

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
            currency,
            user
        } = this.props

        const moneyValue = this.props.formatAmount(money)
        const bonusesValue = this.props.formatBonuses(bonus)

        const kontos = [
            {
                title: e.payment_credits,
                src: 'images/payment_money.png',
                value: `${moneyValue} ${currency}`,
                to: url.payment.money
            },
            {
                title: e.payment_credits,
                src: 'images/payment_credits.png',
                value: `${credit} CR`,
                to: url.payment.credit
            },
            {
                title: e.payment_bonusPoints,
                src: 'images/payment_bonuspoints.png',
                value: `${bonusesValue} BP`,
                to: url.payment.bonus
            },
        ]

        const links = [
            {
                title: 'MONEY',
                src: 'images/payment_money.png',
                to: url.payment.money
            },
            {
                title: 'CREDITS',
                src: 'images/payment_credits.png',
                to: url.payment.topCreditMobile
            },
            {
                title: 'EXCHANGE',
                src: 'images/payment_credits.png',
                to: ""
            },
            {
                title: 'TRANSACTIONS',
                src: 'images/payment_credits.png',
                to: ""
            }
        ]

        return (
            <Wrapper>
                <TopBar caption={e.payment_myAccount} />
                <Title>
                    <Avatar size={340}/>
                    {`${user.firstName} ${user.lastName}`}
                </Title>
                {
                    <Curency>
                        {kontos.map((konto, index) => (
                            <CurencyWrapper key={index}>
                                <CurrencyImg src={konto.src}/>
                                <Value>{konto.value}</Value>
                            </CurencyWrapper>
                        ))}
                    </Curency>
                }
                {
                    links.map((link, index) => (
                        <DecoratedLink to={link.to} key={index}>
                            <LinkWrapper>
                                <CurrencyImg src={link.src}/>
                                <LinkTitle>{link.title}</LinkTitle>
                                <img src="images/info-arrow.png" alt="arrow"/>
                            </LinkWrapper>
                        </DecoratedLink>
                    ))
                }
            </Wrapper>
        )
    }
}

export default withRouter(Payment)