import styled from 'styled-components'

export const ChooseCurrencyValueWrapper = styled.div`
  margin-right: 20px;
`

export const Score = styled.div`
  font: 900 42px Overpass;
  color: white;
  margin-left: 26px;
  line-height: 1;
`

export const BankBalance = styled.div`
  font: 500 32px Overpass;
  color: #1ff2ff;
  margin-left: 26px;
  line-height: 1;
`

export const Text = styled.div`
  font: 500 36px Overpass;
  color: white;
`

export const CurrecyValueListWrapper = styled.div`
  margin: 34px 20px 0 0;
  overflow: hidden;
    height: 600px;
    max-height: 600px;
    position: relative;
	.scrollable-wrapper{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: -17px;
        overflow-y: scroll;
      
        @media (max-width: 768px) {
            right: 0;
        }
    }
`

export const LinesListWrapper = styled.div`
  position: absolute;
  width: 100%;
  margin-top: 70px;
  & > div {
    margin-top: 118px;
    &:first-child {
      margin-top: 0;
    }
  }
`

export const ValueWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
  position: relative;
  //top: -64px;
`

export const CurrencyValue = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 226px;
  height: 80px;
  border-radius: 40px;
  background-color: #232324;
  box-sizing: border-box;
  border: 4px solid rgb(75,75,78);
  font: 900 42px Arial;
  margin-top: 42px;
  color: #d7d7d7;
  cursor: pointer;
`

export const ActiveCurrencyValue = styled(CurrencyValue)`
  border: none;
  background-color: #1ff2ff;
  box-shadow: inset 3.3px 2.3px 8px 0 rgba(0, 0, 0, 0.7);
  color: #232324;
`
