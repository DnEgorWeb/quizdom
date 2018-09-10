import styled from 'styled-components'

import {
    GameCategoryListWrapper,
    GameCategoryListContent,
    StartBlockWrapper,
    Button,
    GradientPanel,
    QuestionBall,
    SimpleButton,
} from '../gameCategoryList/styledComponents'
import {Link} from "react-router-dom";

export const GameStartWrapper = styled(GameCategoryListWrapper)``

export const GameStartContent = styled(GameCategoryListContent)``

export const StartNewGameBlockWrapper = styled(StartBlockWrapper)``

export const GLButton = styled(Button)`
  &:before {
    content: '';
    width: 69px;
    height: 69px;
    border-radius: 50%;
    position: absolute;
    right: -8px;
    top: -8px;
    background: url( ${({isOn}) => isOn ? 'images/gl-on.png': 'images/gl-off.png'} ) center no-repeat;
  }
  &:after {
    background-position: left 10px center;
  }
`

export const InfoButton = styled(Button)`
  &:after {
    background-size: 25px;
  }
`

export const GameInfoWrapper = styled(GradientPanel)`
  width: 710px;
  margin: 25px auto 0;
  padding: 20px;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
`

export const QuestionNumbersPanel = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`

export const GameInfoLabel = styled.div`
  font: 500 26px Overpass;
  color: rgb(31,242,255);
  width: 145px;
  text-transform: uppercase;
`

export const EmptyCircle = styled.div`
  width: 99px;
  height: 99px;
  border-radius: 50%;
  border: 4px solid rgb(91,91,95);
  box-sizing: border-box;
  margin-right: 30px;
`

export const NumberOfQuestion = styled.div`
  width: 99px;
  height: 99px;
  border-radius: 50%;
  border: 4px solid rgb(91,91,95);
  box-sizing: border-box;
  margin-right: 30px;
  
  display: flex;
  justify-content: center;
  align-items: center;
  
  font: 900 52px Arial;
  color: rgb(215,215,215);
  cursor: pointer;
`

export const SelectedNumberOfQuestion = styled(QuestionBall)`
  cursor: pointer;
  margin-right: 30px;
`

export const GameLevelLabel = styled.div`
  font: 500 36px Nasalization;
  color: rgb(31,242,255);
  text-transform: uppercase;
`

export const ProfileInfoBlock = styled.div`
  margin-top: 25px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`

export const ButtonsBlock = styled.div``

export const ProfileBlock = styled.div`
  margin-top: -35px;
`

export const GLButtonOn = styled(SimpleButton)`
  background-image: ${({isSelected}) => isSelected ? 'linear-gradient(to bottom, #36a500, #267600)' : 'linear-gradient(to top, #2a272a, #48484b)'};
  box-shadow: 0 -2px 0 ${({isSelected}) => isSelected ? 'rgb(109,253,34)' : 'rgb(147,147,147)'}, 0 0 0 2px rgb(27,27,27);
  
  &:before, &:after {
    font: 500 36px Nasalization; 
    text-transform: uppercase;
    color: white;
    position: absolute;
    text-shadow: 0 -4px rgb(41,41,43);
  }
  &:before {
    content: 'gl';
    top: 50%;
    transform: translate(0, -50%);
    left: 29px;
    font-size: 60px;
  }
  &:after {
    content: 'on';
    top: 18px;
    right: 20px;
    font-size: 30px;
  }
  &:active {
    background-image: ${({isSelected}) => isSelected ? 'linear-gradient(to bottom, #e30613, #9d1006)' : 'linear-gradient(to bottom, #2a272a, #48484b)'};
  }
`

export const GLButtonOff = styled(GLButtonOn)`
  background-image: ${({isSelected}) => isSelected ? 'linear-gradient(to top, #e30613, #9d1006)' : 'linear-gradient(to top, #2a272a, #48484b)'};
  box-shadow: 0 -2px 0 ${({isSelected}) => isSelected ? 'rgb(253,136,136)' : 'rgb(147,147,147)'}, 0 0 0 2px rgb(27,27,27);
  margin-top: 12px;
  &:after {
    content: 'off';
    right: 10px;
  }
`

export const NameLabel = styled.div`
  font: 500 36px Overpass;
  color: rgb(31,242,255);
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;  
`

export const ProfilePictureWrapper = styled.div`
  width: 297px;
  height: 297px;
  border-radius: 50%;
  background: linear-gradient(to bottom, rgb(28,30,29), rgb(162,162,163));
  position: relative;
  & > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

export const PoolsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

export const PoolsLabel = styled.div`
  font: 500 30px Overpass;
  color: rgb(31,242,255);
  text-transform: uppercase;
`

export const PoolsList = styled.div`
  width: 412px;
  height: 145px;
  margin-top: -27px;
  box-shadow: inset 0 0 20px black;
  background: rgb(37,37,37);
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  padding: 15px;
  box-sizing: border-box;
`

export const ActionButtonBlock = styled.div`
  
`

export const ActionButton = styled(Button)`
  width: 95px;
  height: 95px;
  border-radius: 50%;
  margin-top: -27px;
  &:after {
    background-size: 30px;
    background-position: 35px 21px;
  }  
`

export const QuestionPool = styled.div`
  color: rgb(180,180,180);
  font: 500 30px Overpass;
  line-height: 1.1;
`

export const DecoratedLink = styled(Link)`
    text-decoration: none;
`
