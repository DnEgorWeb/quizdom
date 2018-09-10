import React from 'react'
import e from '../../../../../../../../../langs';

import {
    ChooseCurrencyValueWrapper,
    Score,
    BankBalance,
    Text,
    CurrecyValueListWrapper,
    LinesListWrapper,
    ValueWrapper,
    ActiveCurrencyValue,
    CurrencyValue,
} from './styledComponents'

import {SeparatorLineVert}   from '../../../../../../../../modules/components/SeparatorLine'
// import { setCurrentVoucher } from "../../../../../../../voucher/duck";

class ChooseCurrencyValue extends React.Component {
    getBalanceAndCurrensySymbol = (currency, balance = {}) => {
        let currentBalance = ""
        let currencySymbol = ""
        switch (currency) {
            case "MONEY":
                currentBalance = balance.money
                currencySymbol = "€"
                break
            case "CR":
                currentBalance = balance.credit
                currencySymbol = "CR"
                break
            default:
                currentBalance = balance.bonus
                currencySymbol = "BP"
                break
        }

        currentBalance = currentBalance === undefined ? '' : currentBalance;
        return {currentBalance, currencySymbol}
    }

    render() {
        const {currency, balance} = this.props
        const {currentBalance, currencySymbol} = this.getBalanceAndCurrensySymbol(currency, balance)
	    const correctTitle = currency === 'BP' ?
	                    e.game_howManyBonusPointsDoYouWantToPlay :
	                         (currency === 'CR' ? e.game_howManyCreditDoYouWantToPlay :
	                            (currency === 'MONEY' ? e.game_howManyMoneyDoYouWantToPlay : ''));

        return (
            <ChooseCurrencyValueWrapper>
                <Score>{`${currentBalance} ${currencySymbol}`}</Score>
                <SeparatorLineVert style={{margin: '10px 0'}} />
                <BankBalance>{e.game_bankBalance}</BankBalance>
                <SeparatorLineVert style={{margin: '104px 0 10px 0'}} />
                <Text>{e.formatString(
	                correctTitle,
	                <br />)
                }</Text>
                <CurrecyValueListWrapper>
                    <div className='scrollable-wrapper'>
                        <LinesListWrapper>
                            {
                                this.props.valueBar.map((value, index, valueBar) => {
                                    const maxIndex = Math.ceil(valueBar.length / 2);

                                    return index < maxIndex ?  <SeparatorLineVert key={value} /> : null;
                                })
                            }
                        </LinesListWrapper>
                        <ValueWrapper>
                            {
                                this.props.valueBar.map(value => {
                                    const isActive = this.props.currentValue === value;

                                    if (isActive) {
                                        return (
                                            <ActiveCurrencyValue key={value}>
                                                {
                                                    this.props.currency === 'BP' ?
                                                        this.props.getRateValueWithSymbol(value, this.props.currency, false)
                                                        :
                                                        this.props.getRateValueWithSymbol(value, this.props.currency)
                                                }
                                            </ActiveCurrencyValue>
                                        )
                                    } else {
                                        return (
                                            <CurrencyValue
                                                key={value}
                                                onClick={this.props.setCurrentRate.bind(null, value, this.props.currency)}
                                            >
                                                {
                                                    this.props.currency === 'BP' ?
                                                        this.props.getRateValueWithSymbol(value, this.props.currency, false)
                                                        :
                                                        this.props.getRateValueWithSymbol(value, this.props.currency)
                                                }
                                            </CurrencyValue>
                                        )
                                    }
                                })
                            }
                        </ValueWrapper>
                    </div>
                </CurrecyValueListWrapper>
            </ChooseCurrencyValueWrapper>
        )
    }
}

export default ChooseCurrencyValue;
