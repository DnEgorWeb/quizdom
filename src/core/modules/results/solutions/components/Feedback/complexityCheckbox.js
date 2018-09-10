import React from 'react'
import Checkbox from '../Checkbox'

const ComplexityCheckbox = ({checked, onChange}) =>
    <Checkbox checked={checked} onChange={onChange} style={{margin: '0 0 0 50px'}} />

export default ComplexityCheckbox;