import styled from 'styled-components'
import {Link} from "react-router-dom";

import {
    FrindsButtonsPannelWrapper,
} from '../../../myFriends/components/styledComponents'

import {
    Button,
} from '../../../myWinnings/components/styledComponents'

export const DecoratedLink = styled(Link)`
    text-decoration: none;
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

export const GroupsDetailsWrapper = styled.div`
  height: 100%;
  background: rgb(236,236,236);
`

export const GroupsDetailsButtonsPannelWrapper = styled(FrindsButtonsPannelWrapper)`
  overflow: hidden;
  height: auto;
  padding-bottom: 25px;
`

export const GroupTitle = styled.div`
  margin: 25px;
  line-height: 1;
  color: #b4b4b4;
  font: 500 34px Overpass;
`

export const PlayListWrapper = styled.div`
  overflow: hidden;
    height: 826px;
    max-height: 826px;
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

export const GroupConfiguratorWrapper = styled.div``

export const GroupConfiguratorOption = styled.div`
  padding-top: 147px;
  background: url(${({imgSrc}) => imgSrc}) center top no-repeat;
  background-size: 142px;
  text-align: center;
  color: #e6e6e6;
  font: 500 34px Univers-condensed;
  cursor: pointer;
  margin-top: 95px;
  text-transform: capitalize;
  &:first-child {
    margin-top: 270px;
  }
`

export const EmptyList = styled.div`
  font: 500 44px Overpass;
  text-align: center;
  width: 460px;
  margin: 270px auto 0;
`
