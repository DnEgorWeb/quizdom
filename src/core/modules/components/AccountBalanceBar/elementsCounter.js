import React from 'react'

import {
    ElementsCounterContainer
} from './styledComponents'

import Counter from '../Counter/components'

const ElementsCounter = (props) => (
    <ElementsCounterContainer>
        <Counter color={props.color} current={props.current} max={props.max} />
    </ElementsCounterContainer>
)

export default ElementsCounter;
