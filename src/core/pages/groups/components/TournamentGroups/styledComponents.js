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

export const TournamentGroupWrapper = styled.div``

export const ButtonPanelWrapper = styled.div`
  overflow: hidden;
  width: 750px;
  //height: 285px;
  background-color: #343435;
  box-shadow: 0px 4px 8px 0 rgba(0, 0, 0, 0.7);
  padding: 35px 30px;
  box-sizing: border-box;
`

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const CreateTournamentButton = styled(Button)`
  width: 206px;
  height: 95px;
  border-radius: 10px;
  margin: 0 25px 0 5px;
  &:before {
    background-image: url(${({imgSrc}) => imgSrc});
  }
`

export const ButtonText = styled.div`
  font: 500 28px Overpass;
  color: #ff7f00;
  width: 320px;
  margin-right: 25px;
  text-transform: uppercase;
  line-height: 1.2;
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

export const TournamentGroupLabel = styled.div`
  font: 500 28px Overpass;
  color: #b4b4b4;
  margin-top: 50px;
  text-transform: uppercase;
`

export const TournamentListWrapper = styled.div`
  margin-top: 40px;
  background-color: #ececec;
  overflow: hidden;
    height: 880px;
    max-height: 880px;
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

export const TournamentItemWrapper = styled.div`
  margin-top: 10px;
  &:first-child {
    margin-top: 0;
  }
`
