import styled from 'styled-components'
import {Link} from "react-router-dom";

export const DecoratedLink = styled(Link)`
    text-decoration: none;
`

export const SectionButton = styled.div`
    cursor: pointer;
    background-image: linear-gradient(rgb(72,72,72), rgb(36,36,37));
    width: 710px;
    margin:auto;
    margin-top: 40px;
    height: 200px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.35), 0 -2px 0 rgb(143,143,143);
    padding: 30px 0 0 28px;
    box-sizing: border-box;
    position: relative;
    &:after {
        content: '';
        width: 290px;
        height: 290px;
        background: url(${props => props.src}) center no-repeat;

        position: absolute;
        right: 10px;
        top: -60px;
    }
`

export const Text = styled.div`
    max-width: 400px;
    font-size: 44px;
    font-weight: 500;
    text-align: left;
    color: #b4b4b4;
    .yellow {
        font-size: 46px;
        font-weight: bold;
        color: #ffe600;
    }
    .big{
        font-size: 56px;
    }
    p{
        margin: 0;
    }
`

export const YellowText = styled.span`
    font-weight: bold;
    color: #ffe600;
`

export const HeadText = styled.h2`
	color: #b4b4b4;
	font-size: 30px;
	line-height: 50px;
	text-align: center;
`

export const Separator = styled.div`
    width: 350px;
    height: 4px;
    background-image: linear-gradient(rgb(32,32,32), rgb(103,103,103));
    margin: 0 0 7px;
`

export const Title = styled.h2`
    font-size: 50px;
    font-weight: bold;
    color: rgb(218,218,218);
    text-shadow: 0 -4px 2px black;
    text-transform: uppercase;
    margin: 0;
`

export const AdditionalButtonsWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 20px;
    box-shadow: 0px 4px 8px 0 #000000;
    p{
        font-family: Corbel;
        font-size: 22px;
        color: #b4b4b4;
        text-align: center;
        font-weight: bold;
        span{
            font-size: 28px;
        }
    }
    .active{
        color: #1ff2ff;
    }
`

export const AdditionalButton = styled.div`
    cursor: pointer;
    box-shadow: 0px 4px 8px 0 #000000;
    width: 342px;
    height: 96px;
    margin: auto;
    border-radius: 10px;
    background-image: linear-gradient(rgb(72,72,72), rgb(36,36,37));
    display: flex;
    justify-content: space-around;
    align-items: center;
`

export const CountBlock = styled.div`
    background: ${props => props.active ? '#1ff2ff' : '#232324'};
    width: ${props => props.width};
    height: ${props => props.height};
    border-radius: 10px;
    box-shadow: inset 3.3px 2.3px 8px 0 rgba(0, 0, 0, 0.7);
    color: ${props => props.active ? '#232324' : '#d7d7d7'};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 47.8px;
    font-weight: bold;
    font-family: Arial;
`

export const Avatar = styled.div`
    position:relative;
    width: 160px;
    height: 160px;
    border-radius: 50%;
    border: 8px solid #1ff2ff;
    margin: auto;
    &:before, &:after{
        position: absolute;
        content: "";
        border-radius: 50%;
        display: block;
        top: 0;
        border: 10px solid rgb(35,35,35);
        left: 0;
        width: 140px;
        height: 140px;
    }
    &:before{
        background: url('images/Anonymus.png');
        background-size: contain;
    }
    &:after{
        background:url(${(props) => props.img});
        background-size: contain;
    }
`

export const Account = styled.div`
    font-family: Overpass, sans-serif;
    padding-top: 30px;
    width: 640px;
    text-align: center;
    margin: auto;
    div{
        &:last-child{
            color: #b4b4b4;
            font-size: 30.4px;
        }
    }
`
export const AccountSumm = styled.div`
    font-size: 36.3px;
    color: #1ff2ff;
    font-weight: bold;
`
export const AccountSeparator = styled.div`
    margin: 10px 0;
    width: 640px;
    height: 2px;
    opacity: 0.2;
    background-color: #ffffff;
`
