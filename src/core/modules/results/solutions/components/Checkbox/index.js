import React from 'react'
import styled from 'styled-components'

const Label = styled.label`
    font: normal 14px Roboto;

    display: inline-block;
    margin: 10px 10px 10px 0;
    vertical-align: middle;
    
    user-select: none;
    cursor: pointer;
    
    & > div {        
        position: relative;
        width: ${({size = 54}) => size}px;
		height: ${({size = 54}) => size}px;
		border-radius: 10px;
		background-color: rgb(157,157,157);
		border: solid 2px rgb(33,33,33);
                
        &::after{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate3d(-50%, -50%, 0);
            width: 42px;
            height: 42px;
    
            display: flex;
            justify-content: center;
            align-items: center;
            
            content: '';
            background: url("images/feedback-checkbox.png") center no-repeat;
            opacity: 0;
            color: white;            
            border-radius: 50%;
            
            transition: all .1s ease;
        }
    }
    
    [type="checkbox"], [type="radio"]{
        display: none;
    
        &:checked + div::after {
            opacity: 1;
        }
        
        &:checked + div {
            background-color: rgb(31,240,254);
        }
    }
    
`

const Checkbox = (props) => (
    <Label className={props.className} style={props.style}>
        <input onChange={props.onChange} type='checkbox' checked={props.checked} />
        <div />
    </Label>
)

export default Checkbox
