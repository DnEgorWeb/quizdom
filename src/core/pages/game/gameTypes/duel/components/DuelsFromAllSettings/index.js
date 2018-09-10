import React from 'react'
import e from '../../../../../../../langs';

import {SeparatorLineVert} from "../../../../../../modules/components/SeparatorLine";
import CheckboxWithText from './CheckboxWithText'
import ScrollContainer from './ScrollContainer'

import {
    CategoryItem,
    NonActiveIcon,
    ActiveIcon,
    GameTitle,
} from '../DuelCreation/Main/gameCategoryFullList/styledComponents'

import {
    DuelsFromAllSettingsWrapper,
    DuelAmountBlock,
    DuelAmount,
    AmountText,
    CurrencyAmountBlock,
    CurrencyTitle,
    CheckboxContainer,
    NonCurrencyTitle,
    NumberOfQuestionBlock,
    NumberOfQuestionCheckboxContainer,
    NumberOfQuestionBlockTitle,
    CatigoryTitle,
} from './styledComponents'
import convertCurrency from "../../../../../../../services/convertNumber";

class DuelsFromAllSettings extends React.Component {

    state = {
        isMoneyBlockOpen: false,
        isCreditBlockOpen: false,
        isBonusBlockOpen: false,
        currentCurrencyAmount: {
            amount: 0,
            currency: ''    //'MONEY', 'BONUS', 'CREDIT', 'NON'
        },
        numberOfQuestion: 0,
        selectedPoolIds: [],
    }

    moneyAmounts = [1,2,3,4,5,6,7,8,9,10]
    creditAmounts = [1,2,3,4,5,6,7,8,9,10]
    bonusAmounts = [500,1000,2000,5000,10000,15000,20000,30000,50000,100000]

    numberOfQuestionList = [3,5,7,10,15,20,25,30]

    toggleMoneyBlock = () => {
        this.setState(({isMoneyBlockOpen}) => ({isMoneyBlockOpen: !isMoneyBlockOpen}));
    }

    toggleCreditBlock = () => {
        this.setState(({isCreditBlockOpen}) => ({isCreditBlockOpen: !isCreditBlockOpen}));
    }

    toggleBonusBlock = () => {
        this.setState(({isBonusBlockOpen}) => ({isBonusBlockOpen: !isBonusBlockOpen}));
    }

    onCurrencyChangeHandler = (amount, currency) => {
        this.setState(({currentCurrencyAmount}) => {
            if (currentCurrencyAmount.amount === amount && currentCurrencyAmount.currency === currency) {
                this.props.changePrevFilter('amount', 0);
                this.props.changePrevFilter('currency', '');
                return {
                    currentCurrencyAmount: {
                        amount: 0,
                        currency: ''
                    }
                }
            } else {
                this.props.changePrevFilter('amount', amount);
                this.props.changePrevFilter('currency', currency);
                return {
                    currentCurrencyAmount: {
                        amount,
                        currency,
                    }
                }
            }
        })
    }

    onNumberOfQuestionChangeHandler = (numberOfQuestion) => {
        this.setState((state) => {
            if (state.numberOfQuestion === numberOfQuestion) {
                this.props.changePrevFilter('numberOfQuestion', 0);
                return {
                    numberOfQuestion: 0
                }
            } else {
                this.props.changePrevFilter('numberOfQuestion', numberOfQuestion);
                return {
                    numberOfQuestion
                }
            }
        })
    }

    addPoolId = (poolId) => {
        this.setState(({selectedPoolIds}) => {
            let newPoolIds = [];
            if (!~selectedPoolIds.indexOf(poolId)) {
                newPoolIds = [...selectedPoolIds, poolId];
            } else {
                newPoolIds = selectedPoolIds.filter(id => id !== poolId);
            }

            this.props.changePrevFilter('pools', newPoolIds);
            return {
                selectedPoolIds: newPoolIds
            }
        })
    }

    render() {
        const {currency: currentCurrency, amount: currentAmount} = this.state.currentCurrencyAmount;
        return (
            <DuelsFromAllSettingsWrapper>
                <ScrollContainer
                    total={this.props.poolList.total}
                    onScrollEnd={(offset) => {
                        this.props.getPoolList(offset);
                    }
                }>
                    <DuelAmountBlock>
                        <DuelAmount>{20}</DuelAmount>
                        <AmountText>
                            <div className='big'>{e.game_openDuels}</div>
                            {e.game_fromAll}
                        </AmountText>
                    </DuelAmountBlock>

                    <SeparatorLineVert margin='20px 0 0 0'/>

                    <CurrencyAmountBlock>
                        <CurrencyTitle
                            onClick={this.toggleMoneyBlock}
                            isOpen={this.state.isMoneyBlockOpen}
                        >
                            {e.game_useIn}
                        </CurrencyTitle>
                        <CheckboxContainer isOpen={this.state.isMoneyBlockOpen}>
                            {this.moneyAmounts.map((item, i) => (
                                <CheckboxWithText
                                    key={i}
                                    text={`${item},00 €`}
                                    checked={currentCurrency === 'MONEY' && currentAmount === item}
                                    onChange={this.onCurrencyChangeHandler.bind(null, item, 'MONEY')}
                                />
                            ))}
                        </CheckboxContainer>
                    </CurrencyAmountBlock>

                    <SeparatorLineVert margin='20px 0 30px 0'/>

                    <CurrencyAmountBlock>
                        <CurrencyTitle
                            onClick={this.toggleCreditBlock}
                            isOpen={this.state.isCreditBlockOpen}
                        >
                            {`Einsatz in CR`}
                        </CurrencyTitle>
                        <CheckboxContainer isOpen={this.state.isCreditBlockOpen}>
                            {this.creditAmounts.map((item, i) => (
                                <CheckboxWithText
                                    key={i}
                                    text={`${item} CR`}
                                    checked={currentCurrency === 'CREDIT' && currentAmount === item}
                                    onChange={this.onCurrencyChangeHandler.bind(null, item, 'CREDIT')}
                                />
                            ))}
                        </CheckboxContainer>
                    </CurrencyAmountBlock>

                    <SeparatorLineVert margin='20px 0 30px 0'/>

                    <CurrencyAmountBlock>
                        <CurrencyTitle
                            onClick={this.toggleBonusBlock}
                            isOpen={this.state.isBonusBlockOpen}
                        >
                            {`Einsatz in BP`}
                        </CurrencyTitle>
                        <CheckboxContainer isOpen={this.state.isBonusBlockOpen}>
                            {this.bonusAmounts.map((item, i) => (
                                <CheckboxWithText
                                    key={i}
                                    text={`${convertCurrency(item, false)}`}
                                    checked={currentCurrency === 'BONUS' && currentAmount === item}
                                    onChange={this.onCurrencyChangeHandler.bind(null, item, 'BONUS')}
                                />
                            ))}
                        </CheckboxContainer>
                    </CurrencyAmountBlock>

                    <SeparatorLineVert margin='20px 0 30px 0'/>

                    <CurrencyAmountBlock>
                        <NonCurrencyTitle>
                            {e.game_toTheHonor}
                        </NonCurrencyTitle>
                        <CheckboxContainer isOpen>
                            <CheckboxWithText
                                checked={currentCurrency === 'NON'}
                                onChange={this.onCurrencyChangeHandler.bind(null, 0, 'NON')}
                            />
                        </CheckboxContainer>
                    </CurrencyAmountBlock>

                    <SeparatorLineVert margin='20px 0 30px 0'/>

                    <NumberOfQuestionBlock>
                        <NumberOfQuestionBlockTitle>
                            {e.game_numberOfQuestions}
                        </NumberOfQuestionBlockTitle>
                        <NumberOfQuestionCheckboxContainer>
                            {
                                this.numberOfQuestionList.map((numberOfQuestion, index) => (
                                    <CheckboxWithText
                                        style={{width: 140}}
                                        key={index}
                                        text={numberOfQuestion}
                                        checked={this.state.numberOfQuestion === numberOfQuestion}
                                        onChange={this.onNumberOfQuestionChangeHandler.bind(null, numberOfQuestion)}
                                    />
                                ))
                            }
                        </NumberOfQuestionCheckboxContainer>
                    </NumberOfQuestionBlock>

                    <SeparatorLineVert margin='20px 0 30px 0'/>

                    <CatigoryTitle>{e.game_categories}</CatigoryTitle>
                    {
                        this.props.poolList.items.map((game, index) => {
                            const isActive = ~this.state.selectedPoolIds.indexOf(game.id);
                            if (isActive) {
                                return (
                                    <div key={index}>
                                        <SeparatorLineVert margin='20px 0'/>
                                        <CategoryItem
                                            onClick={() => {this.addPoolId(game.id)}}
                                        >
                                            <ActiveIcon
                                                imgSrc={`images/pool_icons/${game.iconId}.svg`}
                                            />
                                            <GameTitle>{game.name}</GameTitle>
                                        </CategoryItem>
                                    </div>
                                )
                            } else {
                                return (
                                    <div key={index}>
                                        <SeparatorLineVert margin='20px 0'/>
                                        <CategoryItem
                                            onClick={() => {this.addPoolId(game.id)}}
                                        >
                                            <NonActiveIcon
                                                imgSrc={`images/pool_icons/${game.iconId}.svg`}
                                            />
                                            <GameTitle>{game.name}</GameTitle>
                                        </CategoryItem>
                                    </div>
                                )
                            }

                        })
                    }
                </ScrollContainer>
            </DuelsFromAllSettingsWrapper>
        )
    }
}

export default DuelsFromAllSettings
