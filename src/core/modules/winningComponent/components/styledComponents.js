import styled from 'styled-components'
import {MetallicButton, MetallicButtonWrapper} from "../../components/MetallicButton";

export const Wrapper = styled.div`
    background-color: rgb(50, 50, 50);
`

export const SpinnerItem = styled.div`
    border-top: 3px solid #939393;
    box-sizing: border-box;
    width: 670px;
    
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 60px;
    padding: 20px;
    
    position: relative;
    
    background-color: #434346;    
    border-radius: 10px;
    text-align: center;
    
    img {
      border-radius: 5px;
      cursor: pointer;
    }
`

export const ItemInfo = styled.div`
    width: 75px;
    height: 75px;
    position:absolute;
    bottom: -37px;
    right: 40px;
    border-radius: 100%;
    border-top: 3px solid #939393;
    background: linear-gradient(to bottom,#474747,#2a2a2a);
    cursor: pointer;
    img {
        position:absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
    }
`

export const MainInformation = styled.div`
    width: 670px;
    
    margin: 30px auto 80px auto;
    
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    font-family: Overpass, sans-serif;
    font-size: 34px;
    color: #1ff2ff;
`

export const InfoButton = styled.div`
    width: 150px;
    height: 100px;
    position:relative;
    border-radius: 5px;
    background: linear-gradient(to bottom,#505050,#2f2f2f);
    text-align: center;
    cursor: pointer;
    img {
        position: absolute;
        margin: auto;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        border-radius: 100%;
        border: 4px solid white;
        padding: 5px;
    }
`

export const Separator = styled.div`
    height: 4px;
    width: 630px;
    
    background: linear-gradient(to bottom, #242021, #68686a);
    
    margin: 35px auto 35px auto;
`

export const InfoText = styled.div`
    width: 630px;
    display:flex;
    flex-direction: column;
    justify-content: space-around;
    text-align:center;
    margin-left: auto;
    margin-right: auto;
    font-family: Overpass, sans-serif;
    margin-top: 20px;
    margin-bottom: 25px;
    div {
        margin: 25px 0;
        font-size: 38px;
        color: white;
    }
`

export const ExitButtonBlock = styled.div`
    color: #1ff2ff;
    font-size: 34px;
    text-align: center;
    font-family: Overpass, sans-serif;
`

export const Button = styled.div`
    box-sizing: border-box;
    width: 345px;
    
    border-radius: 45px;
    border-top: 2px solid white;
    border-bottom: 2px solid #1b1b1b;
    
    margin-top: 40px;
    margin-left: auto;
    margin-right: auto;
    padding: 20px 30px;
    
    text-align:center;
    font-size: 48px;
    text-transform: uppercase;
    background: linear-gradient(to bottom, #48484b, #2a272a);
    color: #1ff2ff;
    text-shadow: 0 -4px 0 #272729;
    cursor: pointer;
`

export const SpinnerWrapper = styled.div`
    width: 710px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
    border: 2px solid #949494;
    border-radius: 15px;
`

export const Stars = styled.div`
    width: 300px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 5px;
`

export const StarImg = styled.img`
    width: 40px;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 10px;
`

export const OuterWrapper = styled.div`
    box-sizing: border-box;
    width: 670px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 30px;
    background-image: linear-gradient(to bottom, #171717, #6D6D6D);
    padding: 25px;
    position:relative;
`

export const InnerWrapper = styled.div`
    margin-left: auto;
    margin-right: auto;
    border-radius: 20px;
    background-color: black;
    padding: 10px;
`

export const BlueInnerWrapper = styled.div`
    margin-left: auto;
    margin-right: auto;
    border-radius: 20px;
    background-color: black;
    padding: 15px;
    border: 2px solid #1FF2FF;
`

export const BlueWrap = styled.div`
    background-color: #1FF2FF;
    width: calc(100% - 10px);
    position:absolute;
`

export const SpinnerBarrelWrapper = styled.div`
    padding: 10px;
    background-image: linear-gradient(to bottom, #181818, #6B6B6B);
    border-radius: 15px;
`

export const SpinnerBarrel = styled.div`
    height: 750px;
    border-radius: 10px;
    background-color: #cdcdcd;
    overflow: hidden;
    text-align: center;
    cursor: pointer;
    position:relative;
    &:after {
        content: '';
        position:absolute;
        top: 50%;
        left: 50%;
        width: 480px;
        height: 265px;
        margin: -155px 0 0 -240px;
        border: 2px solid #1ff2ff;
        border-radius: 16px;
        z-index: 2;
    }
`

export const SpinnerImg = styled.img`
    box-sizing: border-box;
    width: 450px;
    height: 240px;
    border: 3px solid #ebebeb;
`

export const StyledButtonWrapper = styled(MetallicButtonWrapper)`
    height: 105px;
    border-radius: 45px;
    border: 1px solid white;
    transform: translateY(50%);
    background: #2c2c2c none;
`

export const StyledButton = styled(MetallicButton)`
    background: linear-gradient(to bottom, #474747, #2C2C2C);
    font-family: Overpass, sans-serif;
    border: solid 2px #2c2c2c;
    color: ${({canPress, children}) => canPress || children === 'ok' ? '#1FF2FF' : '#999' };
    box-shadow: none;
    border-radius: 35px;
`

export const StyledInfoItem = styled(ItemInfo)`
    bottom: -80px;
    border: 10px solid rgb(50, 50, 50);
    div {
        border-radius: 100%;
        border-top: 3px solid #939393;
    }
    
`

/*export const BlueSpinnerWrapper = styled.div`
    position:absolute;
    width: 100%;
    height: 100%;
    &:after {
        content: '';
        position:absolute;
        top: 50%;
        left: 50%;
        width: 480px;
        height: 265px;
        margin: -155px 0 0 -240px;
        border: 2px solid #1ff2ff;
        border-radius: 16px;
        z-index: 2;
    }
`*/

export const Arrow = styled.img`
    position:absolute;
    width: 80px;
    z-index: 3;
    top: 390px;
`

const shadowWidth = 110;
export const SpinnerContainer = styled.div`
    position: relative;
    height: 100%;
    width: 103%;

    &:after{
        content: '';
        display: block;
        margin-left: -${(shadowWidth - 100) / 2}%;
        width: ${shadowWidth}%;
        height: 100%;
        position: relative;
        box-shadow: 
            inset 0  30px 50px 50px rgba(0,0,0,0.9),
            inset 0 -30px 50px 50px rgba(0,0,0,0.9);
    }
`;

export const Slide = styled.div`
    position: absolute;
    top: ${({slidePosition}) => slidePosition}px;
    height: ${({slideHeight}) => slideHeight || 238}px;

    & > .slideInner {
        margin-top: -80px;
        position: relative;
        padding: 40px 40px;
    }
`;

export const HiddenCurtain = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: ${({ protect }) => protect ? 0 : 150}px;
	z-index: 100;
	overflow: hidden;

	&:before, &:after {
		content: '';
		display: ${({ protect }) => protect ? 'none' : 'block'};	
		position: fixed;
		width: 80px;
		height: 80px;
		background: linear-gradient(to bottom,#474747,#2a2a2a);
		border-radius: 50%;
}

	&:before {
		top: 10px;
		left: 28px;
	}

	&:after {
		top: 10px;
		right: 10px;
	}
`;