import React from 'react'

import {
    StartBlockWrapper,
    InfoButton,
    StartButton,
} from '../../../quickgame/components/gameCategoryList/styledComponents'

import {
	FlagButton
} from './styledComponents'

const StartBlock = (props) => (
    <StartBlockWrapper>
        <FlagButton />
        <StartButton onClick={props.startGame}>start</StartButton>
        <InfoButton onClick={props.openInfoPanel} imgSrc='images/i-with-shadow.png' />
    </StartBlockWrapper>
)

export default StartBlock;
