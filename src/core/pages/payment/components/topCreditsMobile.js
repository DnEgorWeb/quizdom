import React from 'react'
import e from "../../../../langs"
import TopBar from '../../../modules/components/TopBar'
import styled from 'styled-components'
import { Link, withRouter } from 'react-router-dom'
import url from '../../../../constants/urlConstants'

const Wrapper = styled.div`
    height: 100%;
    background-color: #f1f1f1;
`

const DecoratedLink = styled(Link)`
    text-decoration: none;
`

const Title = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	color: #ff7f00;
	height: 120px;
	background-color: #232324;
	margin-bottom: 8px;
	box-shadow: 0px 4px 8px 0 rgba(0, 0, 0, 0.7);
	font-family: 'Univers-Condensed-Medium', sans-serif;
	font-size: 42px;
	line-height: 38px;
`

const CreditsAmount = styled.div`
    display: flex;
    align-items: center;
    height: 150px;
`

const Credits = styled.span`
    font-size: 42px;
    color: #4d4d4d;
    line-height: 38px;
    margin-left: 20px;
    font-family: "Univers-Condensed-Medium";
`

export const Items = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
    background-color:#fff;
    margin-bottom: 10px;
    border-bottom: 2px solid #c2c2c2;
    cursor:pointer;
`

export const ItemAmount = styled.div`
    display: flex;
    width: 230px;
    align-items: center;
    justify-content: flex-end;
    
    & span {
        font-size: 44px;
        line-height: 38px;
        color: #7d7d7d;
        font-family: "Univers-Condensed-Bold";
        margin-left: 20px;
    }
`

export const ItemPrice = styled.span`
    margin-right: 70px;
    font-size: 58px;
    line-height: 38px;
    color: #ff7f00;
    font-family: "Univers-Condensed-Bold";
`

export const ToAllPackagesItem = styled(Items)`
    justify-content: space-evenly;
    
    span {
        font-size: 42px;
        line-height: 38px;
        font-family: "Univers-Condensed-Medium", sans-serif;
        color: #7d7d7d;
    }
`

class TopCreditsMobile extends React.Component {
    render() {
        const {credit} = this.props
        return(
            <Wrapper>
                <TopBar caption={e.payment_myAccount}/>
                <Title>BUY CREDITS</Title>
                <CreditsAmount>
                    <img src='images/credits.png' alt="credits"/>
                    <Credits>{credit}</Credits>
                </CreditsAmount>
                <Items>
                    <ItemAmount>
                        <img src="images/payment_credits.png" alt="credits"/>
                        <span>10</span>
                    </ItemAmount>
                    <ItemPrice>
                        2,99 €
                    </ItemPrice>
                </Items>
                <Items>
                    <ItemAmount>
                        <img src="images/payment_credits.png" alt="credits"/>
                        <span>20</span>
                    </ItemAmount>
                    <ItemPrice>
                        4,99 €
                    </ItemPrice>
                </Items>
                <Items>
                    <ItemAmount>
                        <img src="images/payment_credits.png" alt="credits"/>
                        <span>50</span>
                    </ItemAmount>
                    <ItemPrice>
                        9,99 €
                    </ItemPrice>
                </Items>
                <DecoratedLink to={url.payment.creditMobile}>
                    <ToAllPackagesItem>
                        <span>VIEW ALL PACKAGES</span>
                        <img src="images/info-arrow.png" alt="arrow"/>
                    </ToAllPackagesItem>
                </DecoratedLink>
            </Wrapper>
        )
    }
}

export default withRouter(TopCreditsMobile)