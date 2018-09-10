import React from 'react'
import {
    CheckboxLabel,
    CheckboxCaption,
} from './styledComponents'
import Checkbox from "../Checkbox";

const FeedbackCheckboxItem = ({checked, caption, onChange}) => {
    return (
        <CheckboxLabel checked={checked}>
            <CheckboxCaption>{caption}</CheckboxCaption>
            <Checkbox checked={checked} onChange={onChange} size={51}/>
        </CheckboxLabel>
    )
}

export default FeedbackCheckboxItem;