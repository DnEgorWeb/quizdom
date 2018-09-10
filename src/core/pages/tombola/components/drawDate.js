import React from 'react'
import e from '../../../../langs'

import {
    DrawDateWrapper,
    DrawDateTitle,
    DrawDateContent,
    DayOfWeek,
    Date,
} from './styledComponents'

const DrawDate = (props) => (
    <DrawDateWrapper>
        <DrawDateTitle>{props.title}</DrawDateTitle>
        <DrawDateContent>
            <DayOfWeek>{props.dayOfWeek}</DayOfWeek>
            <Date>{`${props.date}, ${props.time} ${e.tombola_clock}`}</Date>
        </DrawDateContent>
    </DrawDateWrapper>
)

export default DrawDate;
