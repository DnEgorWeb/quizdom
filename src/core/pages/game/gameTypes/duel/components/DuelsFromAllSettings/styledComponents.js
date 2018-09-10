import styled from 'styled-components'

export const DuelsFromAllSettingsWrapper = styled.div`
    .scrollable-wrapper {
      height: 1000px;
      overflow: scroll;
      overflow-x: hidden;
      width: calc(100% + 18px);
    }
`

export const DuelAmountBlock = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

export const DuelAmount = styled.div`
  width: 280px;
  height: 64px;
  border-radius: 10px;
  background-color: #1ff2ff;
  
  font: 900 48px Arial;
  color: #232324;
  
  display: flex;
  justify-content: center;
  align-items: center;
`

export const AmountText = styled.div`
  margin-left: 10px;
  text-align: left;
  font: 900 22px Corbel;
  color: #9e9e96;
  text-transform: uppercase;
  .big {
    font-size: 28px;
  }
`

export const CurrencyAmountBlock = styled.div`
  position: relative;
  margin-top: 30px;
  min-height: 40px;
`

export const NonCurrencyTitle = styled.div`
  font: 500 40px Overpass;
  color: ${({isOpen}) => isOpen ? '#1ff2ff' : '#9e9e96'};
  line-height: 1.4;
  
  width: 310px;
  height: 40px;
  position: absolute;
  left: 3px;
  top: 0;
`

export const CurrencyTitle = styled(NonCurrencyTitle)`
  &:after {
    content: '▼';
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
    display: ${({isOpen}) => isOpen ? 'block' : 'none'};
    cursor: pointer;
    color: #1ff2ff;
  }
  
  &:before {
    content: '▲';
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
    display: ${({isOpen}) => !isOpen ? 'block' : 'none'};
    cursor: pointer;
    color: #9e9e96;
  }
`

export const CheckboxContainer = styled.div`
  width: 570px;
  display: ${({isOpen}) => isOpen ? 'flex' : 'none'};
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  & > div:first-child {
    margin-left: 381px;
  }
`

export const CheckboxWithTextWrapper = styled.div`
  width: 190px;
  margin-top: 16px;
  &:first-child {
    margin-top: 0;
  }
`

export const CheckboxText = styled.div`
  display: inline-block;
  margin-left: 7px;
  font: 500 32px Overpass;
  color: white;
  line-height: 1;
  position: relative;
  top: 18px;
`

export const NumberOfQuestionBlock = styled.div``

export const NumberOfQuestionBlockTitle = styled.div`
  font: 500 40px Overpass;
  color: #9e9e96;
  line-height: 1.4;
`

export const NumberOfQuestionCheckboxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`

export const CatigoryTitle = styled.div`
  font: 500 40px Overpass;
  color: #9e9e96;
  line-height: 1.4;
`
