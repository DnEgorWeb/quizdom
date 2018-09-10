import React from 'react'
import styled from 'styled-components'

export const AuthFacebookBlock = styled.div`
    position: relative;
    height: 270px;
    background-color: #343435;
    box-shadow: 0px 4px 8px 0 rgba(0, 0, 0, 0.7);
    z-index: 3;
`
export const AuthFormBlock = styled.div`
    text-align: center;
    position: relative;
    height: 535px;
    background-color: #ececec;
    box-shadow: 0px 4px 8px 0 rgba(0, 0, 0, 0.4);
    border: solid 1px #c9c9c9;
    z-index: 2;
`
export const AuthBottomBlock = styled.div`
    height: 425px;
    position: relative;
    background-color: #ececec;
    border: solid 1px #c9c9c9;
    z-index: 1;
`
export const SeparatorLine = styled.div`
    width: ${props => props.width};
    height: 2px;
    opacity: 0.8;
    background-color: ${props => props.bgcolor};
    border-bottom: 2px solid;
    border-bottom-color: ${props => props.borderBottomColor}
`
export const AuthBlockCaption = styled.div`
    margin: auto;
    width: 610px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    p{
        font-size: 36px;
        font-weight: bold;
        color: ${props => props.captionColor};
    }
`
export const FacebookLogo = styled.div`
    width: 600px;
    margin: auto;
    cursor: pointer;
`
export const TextInput = styled(props => <input type='text' {...props}/>)`
    width: 600px;
    box-sizing: border-box;
    height: 100px;
    border-radius: 50px;
    background-color: #ffffff;
    border: solid 2px #818181;
    font-size: 40px;
    color: black;
    padding: 0 35px;
    margin: ${props => props.margin};
    margin-bottom: 30px;
    font-family: 'Univers-condensed';
`
export const TopText = styled.p`
	font-family: Overpass, sans-serif;
	margin: ${props => props.margin || '27px 0 0'};
	text-align: center;
	font-size: 38px;
	font-weight: 500;
	color: rgb(230,230,230);
	span.email {
		color: rgb(255,149,0);
		display: block;
		font-size: 54px;
	}
`

export const Text = styled.p`
	margin: ${props => props.margin || 0};
	font: 500 38px Overpass;
	color: rgb(50,50,50);
	text-align: center;
	span.bonus {
		color: rgb(255,127,0);
	}
`
