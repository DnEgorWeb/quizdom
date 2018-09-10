import styled from 'styled-components'

export const PlayerItemWrapper = styled.div`
  position: relative;
  cursor: pointer;
`

export const ItemTopBlock = styled.div`
  height: 106px;
  background: url(${({noArrow}) => noArrow ? '' : 'images/voucher-arrow-right.png'}) right 35px center no-repeat;
  background-color: #a7a7a7;
  padding-left: 193px;
  overflow: hidden;
`

export const ItemBottomBlock = styled.div`
  height: 54px;
  background-color: #d9d9d9;
  padding-left: 193px;
  overflow: hidden;
  
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

export const Icon = styled.div`
  width: 144px;
  height: 144px;
  border-radius: 50%;
  background-color: rgb(217,217,217);
  
  position: absolute;
  top: 50%;
  left: 24px;
  transform: translate(0, -50%);
  &:before, &:after {
      content: '';
      width: 140px;
      height: 140px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
  }
  &:before {
    background: url('images/Anonymus.png') center no-repeat;
    background-size: contain;
  }
  &:after {
    background: url(${({imgSrc}) => imgSrc}) center no-repeat;
    background-size: cover;
  }
`

export const Flag = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 49px;
  height: 53px;
  margin-right: 10px;
`

export const Name = styled.div`
  font: 500 40px Overpass;
  color: white;
  line-height: 1;
  margin-top: 10px;
`

export const Nickname = styled(Name)`
  color: ${({color}) => color ? color : '#333333'};
  margin-top: 5px;
`

export const City = styled(Nickname)``

export const AlphabetSubListWrapper = styled.div`
  height: 50px;
  display: flex;
  margin-top: 20px;
`

export const ColorBox = styled.div`
  width: 24px;
  //height: 50px;
  height: 100%;
  background-color: ${({rectangleColor}) => rectangleColor ? rectangleColor : '#1ff2ff'};
  display: inline-block;
`

export const Letter = styled.div`
  width: ${({noLine}) => noLine ? '250px' : '46px'};
  height: 100%;
  
  font: 900 46px Univers-condensed;
  color: #818181;
  text-transform: uppercase;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`

export const LineBlock = styled.div`
  display: inline-block;
  height: 100%;
  width: 650px;
  
`

export const SearchWrapper = styled.div`
  width: 642px;
  margin: 34px auto 0;
  position: relative;
`

export const SearchInput = styled.input`
  border: 2px solid rgb(128,128,128);
  outline: none;
  width: 100%;
  height: 70px;
  border-radius: 16px;
  background: url(${({value}) => value ? '' : 'images/friends-search-loupe.png'}) right center no-repeat;
  background-color: #ffffff;
  background-size: 80px;
  display: block;
  
  font: 500 40px Calibri;
  padding: 0 70px 0 30px;
  box-sizing: border-box;
  margin-top: 30px;
  &:first-child {
    margin-top: 0;
  }
`

export const ClearSearch = styled.div`
  width: 80px;
  height: 70px;
  background: url('images/friends-search-clean.png') center no-repeat;
  background-size: 80px;
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
`
