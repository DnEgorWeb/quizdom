import styled from 'styled-components'
import {Link} from "react-router-dom";

import {
    Button,
} from '../../../myWinnings/components/styledComponents'

export const DecoratedLink = styled(Link)`
    text-decoration: none;
`

export const GroupsWrapper = styled.div``

export const TopPanel = styled.div`
  height: 595px;
  background-color: #232324;
  box-shadow: 0 4px 8px 0 #000000;
  position: relative;
  z-index: 1;
  overflow: hidden;
`

export const BottomPanel = styled.div`
  height: 641px;
  background-color: #232324;
  position: relative;
  z-index: 0;
  &:after {
    content: '';
    position: absolute;
    left: 50%;
    height: 100%;
    width: 2px;
    background-image: linear-gradient(to bottom, rgba(59,59,58, 1), rgba(59,59,58, 0));
  }
`

export const Panel = styled.div`
  width: 710px;
  height: 400px;
  background: url('images/groups-panel.png') center no-repeat;
  box-shadow: 0px 4px 8px 0 rgba(0, 0, 0, 0.35);
  margin: 138px auto 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
`

export const GameTypeBlock = styled.div`
  font: 900 40px Univers-condensed;
  text-align: center;
  color: #dadada;
  text-transform: uppercase;
  text-shadow: 0 -5px 0 rgba(0,0,0,.4);
  padding: 305px 0 0 0;
  background: url(${({imgUrl}) => imgUrl}) center top no-repeat;
  width: 290px;
  margin-top: -15px;
  position: relative;
  cursor: pointer;
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    width: 80px;
    height: 112px;
    &:hover {
      border: 1px solid rgb(65, 113, 156);
      border-radius: 15px;
    }
  }
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

export const Highlighter = styled.span`
  text-transform: capitalize;
  color: ${({color = '#ffe600'}) => color};
`
