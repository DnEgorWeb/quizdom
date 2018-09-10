import styled from 'styled-components'
import {Link} from "react-router-dom";

import {
    Button,
} from '../../../myWinnings/components/styledComponents'

export const DecoratedLink = styled(Link)`
    text-decoration: none;
`

export const TopPanel = styled.div`
  height: 595px;
  background-color: #232324;
  box-shadow: 0 4px 8px 0 #000000;
  position: relative;
  z-index: 1;
  overflow: hidden;
`

export const Text = styled.div`
  font: 500 44px Univers-condensed;
  text-align: center;
  color: #b4b4b4;
  display: inline-block;
  width: 240px;
  margin: 95px 67px 0;
  cursor: pointer;
  .yellow {
    color: #ffe600;
  }
`

export const InfoButton = styled(Button)`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  &:before {
    top: 46%;
    background-image: url(${({imgSrc}) => imgSrc});
  }
`

export const AddFriendsWrapper = styled.div`
 background: rgb(235,235,235);
`

export const AddFriendsButtonPanelWrapper = styled.div`
  background-color: #343435;
  box-shadow: 0px 4px 8px 0 rgba(0, 0, 0, 0.7);
  height: 222px;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
`

export const AddFriendsButtonWrapper = styled.div`
  margin-top: 18px;
  width: 206px;
  height: 96px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const FriendsListWrapper = styled.div`
  overflow: hidden;
    height: ${({showSearchInput}) => showSearchInput ? '910px' : '1014px'};
    max-height: ${({showSearchInput}) => showSearchInput ? '910px' : '1014px'};
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

export const ListPanel = styled.div``

export const EmptyList = styled.div`
  font: 500 34px Univers-condensed;
`
