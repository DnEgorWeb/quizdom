import styled from 'styled-components'

import {
    Button,
    ButtonText,
} from '../../myWinnings/components/styledComponents'

export const MyFriendsWrapper = styled.div`
  height: 100%;
  background-color: rgb(236,236,236);
`

export const FrindsButtonsPannelWrapper = styled.div`
  background-color: #343435;
  box-shadow: 0px 4px 8px 0 rgba(0, 0, 0, 0.7);
  height: 340px;
`

export const FrindsButtonsPannelContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Text = styled.div`
  font: 500 28px Overpass;
  color: #b4b4b4;
  margin: 81px 0 0 119px;
  text-transform: uppercase;
  position: relative;
  height: 42px;
`

export const PlusButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 355px;
`

export const PlusButton = styled(Button)`
  width: 96px;
  height: 94px;
  border-radius: 50%;
  margin: 0;
  &:before {
    background: url(${({imgSrc = 'images/friends-plus.png'}) => imgSrc}) center no-repeat;
  }
`

export const InfoButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 505px;
`

export const InfoButton = styled(Button)`
  width: 96px;
  height: 94px;
  border-radius: 50%;
  margin: 0;
  &:before {
    background: url('images/friends-info.png') center no-repeat;
  }
`

export const FiendsButtonText = styled(ButtonText)`
  line-height: 1;
`

export const ListPanel = styled.div``

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

export const FriendsListWrapper = styled.div`
  margin-top: 10px;
  overflow: hidden;
    height: ${({showSearchInput}) => showSearchInput ? '781px' : '887px'};
    max-height: ${({showSearchInput}) => showSearchInput ? '781px' : '887px'};
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

export const AlphabetSubListWrapper = styled.div`
  height: 50px;
  display: flex;
  margin-top: 20px;
`

export const ColorBox = styled.div`
  width: 24px;
  //height: 50px;
  height: 100%;
  background-color: #f57a00;
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

export const FriendItemWrapper = styled.div`
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
    background-size: cover;
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

export const EmptyList = styled.div`
  font: 500 50px Overpass;
  color: rgb(51,51,51);
  width: 630px;
  text-align: center;
  margin: 160px auto;
`

export const FriendOverviewWrapper = styled.div``

export const ProfileBlock = styled.div`
  width: 520px;
  //height: 480px;
  border-radius: 10px;
  background-color: #343434;
  border: solid 2px #5a5a5a;
  margin-left: 20px;
  position: relative;
`

export const PictureBlock = styled.div`
  width: 300px;
  height: 300px;
  margin: 20px auto;
  border-radius: 50%;
  position: relative;
  background: linear-gradient(to bottom, rgb(35,35,36), rgb(101,101,106));
  
  & > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

export const TextBlock = styled.div`
  text-align: center;
  font: 500 34px Overpass;
  color: #e6e6e6;
  margin-bottom: 20px;
`

export const FlagBlock = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 49px;
  height: 53px;
`

export const Country = styled(Name)``

export const FunktionalityBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: ${({view}) => view === 'friend' ? 'flex-start' : 'center'};
  width: 520px;
  height: 450px;
  margin: 28px 0 0 20px;
`

export const Option = styled.div`
  width: 50%;
  padding-top: 142px;
  background-image: url(${({imgSrc}) => imgSrc ? imgSrc : ''});
  background-position: center top;
  background-repeat: no-repeat;
  background-size: 140px;
  font: 500 34px Overpass;
  text-align: center;
  color: #e6e6e6;
  text-transform: uppercase;
  cursor: pointer;
  & > div {
    line-height: 1.2;
  }
  .highlight {
    color: #ff7f00;
  }
`

export const BlockOption = styled(Option)`
  background-image: url(${({checked}) => checked ? 'images/Slider-Icons_B01b_.png' : 'images/Slider-Icons_B02b_.png'});
`

export const BlockIcon = styled.div`
  position: absolute;
  bottom: 10px;
  left: 20px;
  width: 50px;
  height: 50px;
  background-size: cover;
  background-image: url('images/Slider-Icons_B01b_.png');
`

export const FavoritOption = styled(Option)`
  background-image: url(${({checked}) => checked ? 'images/Slider-Icons_B04b_.png' : 'images/Slider-Icons_B04a_.png'});
`

export const TrashOption = styled(Option)`
  width: 410px;
  background-image: url(${({checked}) => checked ? 'images/Slider-Icons_B03b_.png' : 'images/Slider-Icons_B03a_.png'});
  .info {
    font-size: 25px;
  }
`

export const AddOption = styled(Option)`
  width: 410px;
  background-image: url(${({checked}) => checked ? 'images/Slider-Icons_B05b_.png' : 'images/Slider-Icons_B05a_.png'});
  .info {
    font-size: 25px;
  }
`

export const PlayerListListWrapper = styled(FriendsListWrapper)`
  margin-top: 34px;
  height: ${({showSearchInput}) => showSearchInput ? '650px' : '887px'};
  max-height: ${({showSearchInput}) => showSearchInput ? '650px' : '887px'};
`