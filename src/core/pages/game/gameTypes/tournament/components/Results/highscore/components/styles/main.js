import styled from 'styled-components'
import {MetallicButton, MetallicButtonWrapper} from "../../../../../../../../../modules/components/MetallicButton";

export const Wrapper = styled.div`
  height: 100%;
  background-color:#ececec;
`

export const UserInfo = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 455px;
  background-image: url("images/highscore_background.png");
  background-size: contain;
  background-color:#232323;
  box-shadow: 0 8px 10px -4px #232323;
  position:relative;
  z-index: 2;
`

export const UserName = styled.span`
  font-size: 40px;
  font-family: Overpass, sans-serif;
  color: #ff7f00;
`

export const Header = styled.div`
  background-color:#dadada;
  text-align: center;
  padding: 69px 0 23px 0;
  position:relative;
  z-index: 1;
  span {
    font-size: 42px;
    color: #333333;
  }
`

export const ButtonsSection = styled.div`
  border-top: 2px solid white;
  background-color:#ececec;
  display:flex;
  justify-content: space-evenly;
`

export const Separator = styled.div`
  width: 4px;
  height: 260px;
  background: linear-gradient(to right, #b4b4b4, #fff);
  position:absolute;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;

`

export const StyledButton = styled(MetallicButton)`
  border-radius: 8px;
  width: 230px;
  img {
  vertical-align:middle;
  }
`

export const StyledButtonWrapper = styled(MetallicButtonWrapper)`
  border-radius: 18px;
  width: 255px;
  margin: 0;
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
`

export const Column = styled.div`
    text-align: center;
    font-size: 36px;
    color: #333333;
`
