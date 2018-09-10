import styled from 'styled-components'

export const MetallicButtonWrapper = styled.div`
    margin: auto;
    position: relative;
    box-sizing: border-box;
    height:112px;
    width: 342px;
    border-radius: 56px;
    border: solid 2px #f2f2f2;
    background-image: linear-gradient(to top, rgb(247,247,247), rgb(208,207,207));
`
export const MetallicButton = styled.button`
    outline: none;
    cursor: pointer;
    position: absolute;
    font-size: 48px;
    font-weight: bold;
    color: #ff7f00;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    border: solid 2px #f2f2f2;
    width: 314px;
    height: 78px;
    border-radius: 38px;
    background-color: #ffffff;
    background-image: linear-gradient(to right, rgb(239,239,239), rgb(255,255,255));
    box-shadow: 0px 8px 8px 0 rgba(0, 0, 0, 0.35);
    font-family: 'Univers-condensed';
    text-transform: uppercase;
    &:active{
        box-shadow: none;
    }
    a {
      text-decoration: none;
      color: #ff7f00 !important;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
      &:active {
        color: #ff7f00;
      }
    }
`
