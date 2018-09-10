import React from 'react'
import e from '../../../../../../../langs';

import {
    StartBlockWrapper,
    InfoButton,
    StartButton,
    GLButton,
} from './styledComponents'

const StartBlock = (props) => (
    <StartBlockWrapper>
        <GLButton isOn={props.trainingMode} imgSrc='images/game-level.png' />
        <StartButton onClick={props.startGame}>{e.game_start}</StartButton>
        <InfoButton onClick={props.openInfoPanel} imgSrc='images/i-with-shadow.png' />
    </StartBlockWrapper>
)

export default StartBlock;
