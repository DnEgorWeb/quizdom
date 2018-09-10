import styled from "styled-components";
import {Link} from "react-router-dom";

export const ButtonsPannel = styled.div`
	height: 225px;
	background-color: #343435;
	box-shadow: 0px 4px 8px 0 rgba(0, 0, 0, 0.7);
	display: flex;
	justify-content: center;
	align-items: center;
`

export const ButtonWrapper = styled.div`

`

export const Button = styled.div`
	width: 206px;
	height: 96px;
	border-radius: 10px;
	background-image: linear-gradient(to top, #2a272a, #48484b);
	box-shadow: 0 -2px 0 rgb(148,148,148), 0 0 0 5px rgb(28,28,28);
	position: relative;
	margin: 18px 17px 10px 17px;
	cursor: pointer;
	&:before {
		content: '';
		width: 80px;
		height: 80px;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		background: url(${ ({source = {}, active}) => active ? source.active : source.nonActive }) center no-repeat;
	}

	&:active {
		box-shadow: 0 0 0 2px rgb(28,28,28);
		transform: translate(0, 2px);
	}
`

export const ButtonText = styled.div`
	font: 500 28px Overpass;
	color: ${({active}) => active ? '#ff7f00' : '#b4b4b4'};
	text-align: center;
    margin: 0 auto;
    text-transform: uppercase;
`

export const DecoratedLink = styled(Link)`
    text-decoration: none;
`

export const MyWinningsWrapper = styled.div`
	height: 100%;
	background: rgb(46,46,46);
`

export const List = styled.div`
	overflow: hidden;
    height: 1010px;
    max-height: 1010px;
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

export const OverviewWrapper = styled.div`
    cursor: pointer;
	min-height: 188px;
	position: relative;
	box-shadow: 0 -2px 0 0 rgb(135,135,135);
	&:first-child {
		margin-top: 29px;
	}
	&:before {
		content: '';
		position: absolute;
		top: 50%;
		margin-top: -81px;
		left: 24px;
		width: 162px;
		height: 162px;
		background: url(${ ({gameTypeImageSrc}) => gameTypeImageSrc }) center no-repeat;
		background-size: 162px;
	}`
export const TimePanel = styled.div`
	min-height: 63%;
	background: rgb(70,70,70);
	padding-left: 217px;
`
export const DateAndGameWrapper = styled.div`
	padding: 15px 0;
	div {
		margin-bottom: 8px;
		&:last-child {
			margin-bottom: 0;
		}
	}
`
export const GameTypeTitle = styled.div`
	font: 500 40px Overpass;
	color: #e6e6e6;
	line-height: 1;
	box-sizing: border-box;
	max-width: 80%;
	overflow: hidden;
`
export const DatePanel = styled.div`
	padding-left: 37px;
	background: url('images/my-winnings-date.png') left 6px no-repeat;
	height: 50%;
	font: 500 30px Overpass;
	color: #b8b8b8;
	display: flex;
	align-items: flex-start;
	.date, .time {
		color: #777777;
	}
	.time {
		margin-right: 10px;
	}
`
export const Separator = styled.div`
	display: inline-block;
	width: 4px;
	height: 100%;
	margin: 0 10px;
	position: relative;
	&:after {
		content: '';
		width: 100%;
		height: 31px;
		position: absolute;
		top: 7px;
		left: 0;
		background: rgb(119,119,119);
	}
`
export const MoneyPanel = styled.div`
	height: 37%;
	background: url('images/my-winnings-arrow.png') right 60px center rgb(114,113,113) no-repeat;
	font: 500 40px Overpass;
	color: #e6e6e6;
	display: flex;
	align-items: center;
	padding-left: 217px;
	span {
		margin-right: 10px;
		max-width: 50%;
		overflow: hidden;
	}
	.currency {
		&:first-letter {
			text-transform: uppercase;
		}
	}
`
export const CurrencyImage = styled.div`
	position: absolute;
	z-index: 1;
	top: 17px;
	right: 32px;
	width: 76px;
	height: 76px;
	background: url(${ ({currencyTypeImageSrc}) => currencyTypeImageSrc }) center no-repeat;
	background-size: contain;
`

export const EmptyWrapper = styled.div``

export const Game = styled.div`
    background-image: linear-gradient(rgb(72,72,72), rgb(36,36,37));
    width: 710px;
    height: 300px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.35), 0 -2px 0 rgb(143,143,143);
    margin: 85px auto 0;
    padding: 30px 0 0 28px;
    box-sizing: border-box;
    position: relative;
    &:after {
        content: '';
        width: 290px;
        height: 290px;
        background: url(${props => props.src}) center no-repeat;

        position: absolute;
        right: 10px;
        top: -18px;
    }
`
export const Title = styled.h2`
    font-size: 50px;
    font-weight: bold;
    color: rgb(218,218,218);
    text-shadow: 0 -4px 2px black;
    text-transform: uppercase;
    margin: 0;
`
export const HorzSeparator = styled.div`
    width: 350px;
    height: 4px;
    background-image: linear-gradient(rgb(32,32,32), rgb(103,103,103));
    margin: 0 0 7px;
`
export const Text = styled.div`
    font-size: 44px;
    font-weight: 500;
    text-align: left;
    color: #b4b4b4;
    text-align: ${({center}) => center ? 'center' : 'none'};
    margin: ${({margin}) => margin ? margin : '0'};
    .yellow {
        font-size: 46px;
        font-weight: bold;
        color: #ffe600;
    }
    .orange {
    	color: #ff7f00;
    }
    .big{
        font-size: 56px;
    }
    .white {
    	text-transform: uppercase;
    	color: rgb(230,230,230)
    }
`