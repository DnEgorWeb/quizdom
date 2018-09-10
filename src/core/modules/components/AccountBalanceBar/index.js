import React from 'react'
import convertNumber from '../../../../services/convertNumber'

import {
    AccountBalanceBarWrapper,
    AccountBalanceLabel,
    CurrencyValue,
} from './styledComponents'

import ElementsCounter from './elementsCounter'

const AccountBalanceBar = (props) => (
    <AccountBalanceBarWrapper>
        <AccountBalanceLabel>{props.caption || 'KONTO'}</AccountBalanceLabel>
        <CurrencyValue>{`${convertNumber(props.balance || 0, false)} ${props.currency || 'BP'}`}</CurrencyValue>
        <ElementsCounter color={props.color} current={props.current || 0} max={props.max || 0}/>
    </AccountBalanceBarWrapper>
)

export default AccountBalanceBar;
