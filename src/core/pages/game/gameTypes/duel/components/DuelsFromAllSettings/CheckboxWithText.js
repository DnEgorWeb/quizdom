import React from 'react'
import Checkbox from "../../../../../../modules/results/solutions/components/Checkbox";

import {
    CheckboxWithTextWrapper,
    CheckboxText,
} from './styledComponents'

const CheckboxWithText = ({text, style, ...props}) => (
    <CheckboxWithTextWrapper style={style}>
        <Checkbox  style={{margin: 0}} {...props} />
        <CheckboxText>{text}</CheckboxText>
    </CheckboxWithTextWrapper>
)

export default CheckboxWithText
