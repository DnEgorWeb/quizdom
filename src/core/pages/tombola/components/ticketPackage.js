import React from 'react'

import convertNumber from '../../../../services/convertNumber'

import {
    TicketPackageWrapper,
    DrawsLabel,
    AmountLabel,
} from './styledComponents'

const currencyMap = {
    BONUS: 'BP',
    CREDIT: 'CR',
    MONEY: 'EUR'
}

const TicketPackage = (props) => (
    <TicketPackageWrapper isEnabled={props.isEnabled} onClick={props.onClickHandle} index={props.index}>
        <DrawsLabel>{`${props.amount} Lose`}</DrawsLabel>
        <AmountLabel>{`${convertNumber(props.price, false)} ${currencyMap[props.currency]}`}</AmountLabel>
    </TicketPackageWrapper>
)

export default TicketPackage;
