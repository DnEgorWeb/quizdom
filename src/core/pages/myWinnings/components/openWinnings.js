import React from 'react'
import e from "../../../../langs";
import url from "../../../../constants/urlConstants";

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
    EmptyWrapper,
    Game,
    Title,
    HorzSeparator,
    Text,
} from './styledComponents'

const mapGameTypesToUrl = {
    duel: 'images/my-winnings-game-type-duel.png',
    tournament: 'images/my-winnings-game-type-turnier.png',
    winning_component: 'images/my-winnings-game-type-spinner.png',
    tombola: 'images/my-winnings-game-type-spinner.png',
    quiz24: 'images/quick-game.png'
}

const mapCurrencyTypeToUrl = {
    credits: 'images/my-winnings-currency-type-credits.png',
    bonus: 'images/my-winnings-currency-type-bonus.png',
    money: 'images/my-winnings-currency-type-eur.png',
    voucher: 'images/my-winnings-currency-type-percent.png'
}

const SpinnerItem = ({gameTypeImageSrc, gameTypeTitle, gameDate, gameTime, amount, currency, selectSpinner}) => {
    return (
        <OverviewWrapper gameTypeImageSrc={gameTypeImageSrc} onClick={selectSpinner}>
            <TimePanel>
                <DateAndGameWrapper>
                    <DatePanel>
                        <span className='date'>{gameDate}</span>
                        <Separator/>
                        <span className='time'>{gameTime}</span>
                        <span>{e.mywinnings_clock}</span>
                    </DatePanel>
                    <GameTypeTitle>{gameTypeTitle}</GameTypeTitle>
                </DateAndGameWrapper>
            </TimePanel>
            <MoneyPanel>
                <span className='money'>{amount}</span>
                <span className='currency'>{currency}</span>
            </MoneyPanel>
        </OverviewWrapper>
    )
}

const OpenWinnings = ({spinnersList, ...props}) => {
    if (spinnersList.length) {
        return <List>
            <div className='scrollable-wrapper'>
                {
                    spinnersList.map(winning => {
                        const {title, amount, currency, date, time, userWinningComponentId} = winning;
                        return (
                            <SpinnerItem
                                key={userWinningComponentId}
                                amount={amount}
                                gameDate={date}
                                gameTime={time.replace(/(\d{1,2}:\d{1,2}):\d{1,2}/,'$1')}
                                gameTypeTitle={title}
                                gameTypeImageSrc={mapGameTypesToUrl['tombola']}
                                currencyTypeImageSrc={mapCurrencyTypeToUrl[currency]}
                                currency={currency}
                                selectSpinner={props.selectSpinner.bind(null, winning)}
                            />
                        )
                    })
                }
            </div>
        </List>
    } else {
        return <EmptyWrapper>
            <Text center margin='100px 0 0'>Es liegen noch keine Gewinne vor.</Text>
            <Text center margin='55px 21px 0'>Gehe auf <span className='white'>QUICK QUIZ</span>, spiele und hole Dir
                Deine ersten Gewinne.</Text>
            <DecoratedLink to={url.game.quiz.index}>
                <Game src='images/quick-game.png'>
                    <Title>quick quiz</Title>
                    <HorzSeparator/>
                    <Text>
                        Preise bis zu<br/><span className="yellow big">10.000 €</span><br/>erwarten Dich!
                    </Text>
                </Game>
            </DecoratedLink>
        </EmptyWrapper>
    }
}

export default OpenWinnings;
