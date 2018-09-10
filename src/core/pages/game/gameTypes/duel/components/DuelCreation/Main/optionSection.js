import React from 'react'
import e from '../../../../../../../../langs';

import {
    OptionSectionWrapper,
    OptionLinearWrapper,
    OptionTitle,
    LinearWrapper,
    EmptyOptionCell,
    OptionCell,
    NonActiveOptionCell,
    ActiveOptionCell,
    AddButton,
} from './styledComponents'

import {SeparatorLineVert} from '../../../../../../../modules/components/SeparatorLine'

const OptionSection = (props) => {
    const getCurrencySymbol = (currency) => {
        let currencySymbol = '';
        if (currency === 'MONEY') {
            currencySymbol = '€'
        } else if (currency === 'CR') {
            currencySymbol = 'CR'
        } else if(currency === 'BP') {
            currencySymbol = 'BP'
        } else {
            currencySymbol = '0'
        }
        return currencySymbol
    }

    const correctCompareCurrency = (currency) => {
        let correctCurrency;

        switch(currency) {
            case 'BONUS'  : correctCurrency = 'BP'; break;
            case 'CREDIT' : correctCurrency = 'CR'; break;
            case 'MONEY'  : correctCurrency = 'MONEY'; break;
            default : correctCurrency = currency;
        }

        return correctCurrency;
    }

    return (
        <OptionSectionWrapper>

            <LinearWrapper>
                <SeparatorLineVert style={{position: 'absolute', top: 30}} />
                <OptionLinearWrapper>
                    <OptionTitle>{e.game_categories}</OptionTitle>
                    {
                        props.gameList && props.gameList.map((game, index) => {
                            if (game) {
                                const isActive = props.currentGameId === game.gameId;
                                if (isActive) {
                                    return (
                                        <ActiveOptionCell
                                            key={`${game.gameId}${index}`}
                                            imgSrc={`images/pool_icons/${game.assignedPoolsIcons[0]}.svg`}
                                        />
                                    )
                                } else {
                                    return (
                                        <NonActiveOptionCell
                                            key={`${game.gameId}${index}`}
                                            imgSrc={`images/pool_icons/${game.assignedPoolsIcons[0]}.svg`}
                                            handler={props.setCurrentGame.bind(null, game.gameId)}
                                        />
                                    )
                                }
                            } else {
                                return <OptionCell key={index} />
                            }
                        })
                    }

                    {
                        props.gameList && props.gameList.filter(game => game && (game.gameId === props.currentGameId))[0] ?
                            <EmptyOptionCell>
                                <AddButton imgSrc='images/add-enemy.png' onClick={props.showGameList} />
                            </EmptyOptionCell>
                            :
                            <ActiveOptionCell>
                                <AddButton isMoBtn imgSrc='images/add-enemy-active.png' onClick={props.showGameList} />
                            </ActiveOptionCell>
                    }

                </OptionLinearWrapper>
            </LinearWrapper>

            <LinearWrapper>
                <SeparatorLineVert style={{position: 'absolute', top: 30}} />
                <OptionLinearWrapper>
                    <OptionTitle>{e.game_ask}</OptionTitle>
                    {
                        props.numberOfQuestionsList.map((number, index) => {
                            const isActive = (index === props.currentNumberOfQuestionsIndex);

                            if (isActive) {
                                return (
                                    <ActiveOptionCell
                                        key={`${number}${index}`}
                                        handler={props.selectNumberOfQuestion.bind(null, index)}
                                    >
                                        {number}
                                    </ActiveOptionCell>
                                )
                            } else if (number !== 0) {
                                return (
                                    <NonActiveOptionCell
                                        handler={props.selectNumberOfQuestion.bind(null, index)}
                                        key={`${number}${index}`}
                                    >
                                        {number}
                                    </NonActiveOptionCell>
                                )
                            } else {
                                return (
                                    <OptionCell key={Math.random()} />
                                )
                            }
                        })
                    }
                </OptionLinearWrapper>
            </LinearWrapper>

            <LinearWrapper>
                <SeparatorLineVert style={{position: 'absolute', top: 30}} />
                <OptionLinearWrapper>
                    <OptionTitle>{e.game_commitment}</OptionTitle>
                    {
                        props.currencyList.map((currency, index) => {
                            const isActive = (correctCompareCurrency(props.currency) === currency);
    
                            if (isActive) {
                                return (
                                    <ActiveOptionCell
                                        key={currency}
                                        fontSize={currency === 'MONEY' ? 62 : 46}
                                        handler={props.canChangeRate ? props.selectCurrency.bind(null, currency) : null}
                                    >
                                        {getCurrencySymbol(currency, true)}
                                    </ActiveOptionCell>
                                )
                            } else {
                                return (
                                    <NonActiveOptionCell
                                        handler={props.canChangeRate ? props.selectCurrency.bind(null, currency) : null}
                                        key={currency}
                                        fontSize={currency === 'MONEY' ? 62 : 46}
                                    >
                                        {getCurrencySymbol(currency, true)}
                                    </NonActiveOptionCell>
                                )
                            }
                        })
                    }
                </OptionLinearWrapper>
            </LinearWrapper>

        </OptionSectionWrapper>
    );
}

export default OptionSection;
