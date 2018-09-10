import React from 'react'
import {Wrapper, TopBarButtons} from './styledComponents'

const GameResultsTopBar = (props) => (
    <Wrapper whithOutImages={props.leftButtonPictureSrc}>
        <TopBarButtons
            src={props.protectTopBarBtn ? null : (props.leftButtonPictureSrc || "images/topbar-back.png")}
            onClick={props.leftButtonClickHandler} />
        <span className='top-bar-title'>{
            props.caption ? props.caption.toString().toUpperCase() : ''
        }</span>
        <TopBarButtons
            src={props.protectTopBarBtn ? null : (props.rightButtonPictureSrc || "images/11_x-close_256.png")}
            onClick={props.rightButtonClickHandler}/>
    </Wrapper>
)

export default GameResultsTopBar
