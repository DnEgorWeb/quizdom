import React from 'react'
import e from "../../../../langs";
import url from "../../../../constants/urlConstants";

import ScrollContainer from '../../game/gameTypes/duel/components/DuelsFromAllSettings/ScrollContainer'

import {
    DecoratedLink,
    List,
    OverviewWrapper,
    TimePanel,
    DateAndGameWrapper,
    GameTypeTitle,
    DatePanel,
    Separator,
    MoneyPanel,
    CurrencyImage,
    EmptyWrapper,
    Game,
    Title,
    HorzSeparator,
    Text,
} from './styledComponents'

const mapGameTypesToUrl = {
	duel             : 'images/my-winnings-game-type-duel.png',
	tournament       : 'images/my-winnings-game-type-turnier.png',
	winning_component: 'images/my-winnings-game-type-spinner.png',
	tombola          : 'images/my-winnings-game-type-spinner.png',
	quiz24           : 'images/quick-game.png'
}

const mapCurrencyTypeToUrl = {
	credit : 'images/my-winnings-currency-type-credits.png',
	bonus  : 'images/my-winnings-currency-type-bonus.png',
	money  : 'images/my-winnings-currency-type-eur.png',
	voucher: 'images/my-winnings-currency-type-percent.png'
}

const OverviewItem = ({
                          gameTypeImageSrc, currencyTypeImageSrc,
                          gameTypeTitle, gameDate, gameTime,
                          amount, currency, ...props
}) => {
    return (
        <OverviewWrapper gameTypeImageSrc={gameTypeImageSrc} onClick={props.selectWinning}>
            <TimePanel>
                <DateAndGameWrapper>
                    <GameTypeTitle>{gameTypeTitle}</GameTypeTitle>
                    <DatePanel>
                        <span className='date'>{gameDate}</span>
                        <Separator/>
                        <span className='time'>{gameTime}</span>
                        <span>{e.mywinnings_clock}</span>
                    </DatePanel>
                </DateAndGameWrapper>
            </TimePanel>
            <MoneyPanel>
                <span className='money'>{amount}</span>
                <span className='currency'>{currency}</span>
            </MoneyPanel>

            <CurrencyImage currencyTypeImageSrc={gameTypeImageSrc === 'tombola' ? 'voucher' : currencyTypeImageSrc} />

        </OverviewWrapper>
    )
}

const Overview = ({winningsList,setCurrentWinn, getVoucher, ...props}) => {
    if (winningsList.length) {
        return <List>
            <ScrollContainer
                total={999}
                onScrollEnd={(offset) => {
                    props.getUserWinningsList(offset);
                }
            }>
                {
                    winningsList
                        .map((winning, index) => {
                        const {title, amount, currency, type, date, time, tombolaId, gameInstanceId} = winning;

                        return (
                            ~['duel', 'quiz24', 'tournament'].indexOf(type) ?
                                <OverviewItem getVoucher={() => getVoucher(tombolaId)}
                                              setCurrentWinn={() => setCurrentWinn({amount, currency})}
                                              amount={amount}
                                              gameDate={date}
                                              gameTime={time}
                                              gameTypeTitle={title}
                                              gameTypeImageSrc={mapGameTypesToUrl[type]}
                                              type={type}
                                              key={index}
                                              currencyTypeImageSrc={mapCurrencyTypeToUrl[currency]}
                                              currency={currency}
                                              selectWinning={props.selectWinning.bind(null, gameInstanceId, type)}
                                />
                                :
                                    <OverviewItem getVoucher={() => getVoucher(tombolaId)}
                                                  setCurrentWinn={() => setCurrentWinn({amount, currency})}
                                                  amount={amount}
                                                  gameDate={date}
                                                  gameTime={time}
                                                  gameTypeTitle={title}
                                                  gameTypeImageSrc={mapGameTypesToUrl[type]}
                                                  type={type}
                                                  key={index}
                                                  currencyTypeImageSrc={mapCurrencyTypeToUrl[currency]}
                                                  currency={currency}
                                                  selectWinning={props.onClick.bind(null, amount, currency)}
                                                  onClick={props.onClick}
                                    />
                        )
                    })
                }
            </ScrollContainer>
        </List>
    } else {
        return <EmptyWrapper>
            <Text center margin='100px 0 0'>{e.mywinnings_thereAreNoProfitsYet}</Text>
            <Text center margin='55px 21px 0'>
                {
                    e.formatString(
                        e.mywinnings_goOnPlayAndGetYourFirstWinnings,
                        <span className='white' style={{textTransform: 'uppercase'}}>{e.mywinnings_quickQuiz}</span>
                    )
                }
            </Text>
            <DecoratedLink to={url.game.quiz.index}>
                <Game src='images/quick-game.png'>
                    <Title>{e.mywinnings_quickQuiz}</Title>
                    <HorzSeparator/>
                    <Text>
                        {
                            e.formatString(
                                e.mywinnings_pricesUpToExpectYou,
                                <br/>,
                                <span className="yellow big">10.000 €</span>,
                                <br/>
                            )
                        }
                    </Text>
                </Game>
            </DecoratedLink>
        </EmptyWrapper>
    }
}

export default Overview;
