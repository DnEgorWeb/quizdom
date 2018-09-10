import styled from 'styled-components'

export const AccountBalanceBarWrapper = styled.div`
	height: 100px;
	background-color: #343435;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.35);

	font-family: Univers-condensed;
	padding: 0 32px;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #e6e6e6;

	position: relative;
    z-index: 1;
`

export const AccountBalanceLabel = styled.div`
    position: absolute;
    left: 31px;
    top: 50%;
    transform: translate(0, -50%);
	font-size: 37px;
	color: #e6e6e6;
	text-transform: uppercase;
`

export const CurrencyValue = styled.div`
	width: 300px;
	height: 56px;
	border-radius: 10px;
	background-color: #111111;
	font-size: 44px;
	text-align: center;
	color: #e6e6e6;

	box-shadow: 0 -2px 0 0 rgb(17,17,17), 0 2px 0 0 rgb(112,112,112);
`

export const ElementsCounterContainer = styled.div`
  position: absolute;
  right: 31px;
  top: 50%;
  transform: translate(0, -50%);

  height: 48px;
`
