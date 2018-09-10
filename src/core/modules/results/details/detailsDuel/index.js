import React from 'react'
import e from '../../../../../langs'
import formatCurency from '../../../../../services/formatCurrency'

import {
    DetailsWrapper,
    DetailOverviewWrapper,
    OverviewItemWrapper,
    Title,
    ContentWrapper,
    LeftResult,
    RightResult,
    TableBlock,
} from './styledComponents'

import {
    ExtraPoints,
    ExtraPointsTitle,
} from '../../../components/DuelComponents/DetailsOther/styledComponents'

import TopBar from '../../../components/GameResultsTopBar'
import DetailPanel from '../../../components/DuelComponents/DetailPanel'
import UserDetailsCard from '../../../components/DuelComponents/UserDetailsCard'
import DetailResultsTable from '../../../components/DuelComponents/DetailResultsTable'
import convertNumber from "../../../../../services/convertNumber";

export default class DetailsDuel extends React.Component {
    constructor(props) {
        super(props)
        e.setLanguage(props.language)
        typeof props.initSolutions === 'function' && props.initSolutions();
    }
    
    componentWillReceiveProps(nextProps) {
        e.setLanguage(nextProps.language)
    }

    formatBonuses = (bonuses) => `${String(bonuses).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`

    getCurrencySymbol = () => {
        const currency = this.formatBonuses(convertNumber(this.props.bet.currency));
        switch (currency) {
            case 'MONEY': return '€';
            case 'BONUS': return 'BP';
            case 'CREDIT': return 'CR';
            default: return ''
        }
    }

    render() {
        const { multiplayerResults } = this.props;
        const playerResults          = multiplayerResults && multiplayerResults.playerResults;
        const duelOpponentResults    = multiplayerResults && multiplayerResults.duelOpponentResults;
        const results                = { ...playerResults, ...duelOpponentResults };
        const {
                  playerAnswerResults,
                  playerResultItems,
                  playerUserInfo,
                  opponentAnswerResults,
                  opponentResultItems,
                  opponentUserInfo
              } = results;

        let playerResultItemsObj = {}, opponentResultItemsObj = {};
        if(playerResultItems && opponentResultItems){
            playerResultItems.forEach((item) => {
                playerResultItemsObj[item.resultType] = item.amount
            })
            opponentResultItems.forEach((item) => {
                opponentResultItemsObj[item.resultType] = item.amount
            })
        }
    
        const playerUserId     = results.userId || '';
        const opponentUserId   = results.userId || '';
        const localUserIdImg   = localStorage.getItem('avatarImage');
        const playerImageUrl   = `${this.props.cdnMedia}profile/${ (localUserIdImg || `${playerUserId}.jpg`) }`;
        const opponentImageUrl = `${this.props.cdnMedia}profile/${ (localUserIdImg || `${opponentUserId}.jpg`) }`;
        const type             = results.gameOutcome || '';

        return (
            <DetailsWrapper>
                <TopBar
                    caption='details'
                    leftButtonClickHandler={this.props.back}
                    rightButtonClickHandler={this.props.close}
                />

                <div className='scrollable-wrapper'>
                    <DetailPanel
                        type={type}
                        leftPicture={playerImageUrl}
                        rightPicture={opponentImageUrl}
                    />
                    <DetailOverviewWrapper>
                        <OverviewItemWrapper>
                            <Title>{e.game_correctAnswers}</Title>
                            <ContentWrapper>
                                <LeftResult>{`${playerResultItemsObj.correctAnswers} von ${playerResultItemsObj.totalQuestions}`}</LeftResult>
                                <RightResult>{`${opponentResultItemsObj.correctAnswers} von ${opponentResultItemsObj.totalQuestions}`}</RightResult>
                            </ContentWrapper>
                        </OverviewItemWrapper>
                        <OverviewItemWrapper>
                            <Title>{e.game_timeInSeconds}</Title>
                            <ContentWrapper>
                                <LeftResult>{Math.floor((playerResultItemsObj.answerTime / 1000)) || 0}</LeftResult>
                                <RightResult>{Math.floor((opponentResultItemsObj.answerTime / 1000)) || 0}</RightResult>
                            </ContentWrapper>
                        </OverviewItemWrapper>
                        <OverviewItemWrapper>
                            <Title>{e.game_points}</Title>
                            <ContentWrapper>
                                <LeftResult>{playerResultItemsObj.handicapPoints || 0}</LeftResult>
                                <RightResult>{opponentResultItemsObj.handicapPoints || 0}</RightResult>
                            </ContentWrapper>
                        </OverviewItemWrapper>
                        <OverviewItemWrapper>
                            <Title>{e.game_commitment}</Title>
                            <ContentWrapper>
                                <LeftResult>{formatCurency(this.props.bet)}</LeftResult>
                                <RightResult>{formatCurency(this.props.bet)}</RightResult>
                            </ContentWrapper>
                        </OverviewItemWrapper>
                        <OverviewItemWrapper>
                            <Title>{e.game_profit}</Title>
                            <ContentWrapper>
                                <LeftResult win={type === 'win'}>{formatCurency({amount: playerResultItemsObj.bonusPoints, currency: 'BONUS'})}</LeftResult>
                                <RightResult win={type === 'lose'}>{formatCurency({amount: opponentResultItemsObj.bonusPoints, currency: 'BONUS'})}</RightResult>
                            </ContentWrapper>
                        </OverviewItemWrapper>

                        <TableBlock>
                            <UserDetailsCard
                                userInfo={playerUserInfo}
                                cdnMedia={this.props.cdnMedia}
                            />
                            <DetailResultsTable
                                answerResults={playerAnswerResults}
                                questionLetterMap={this.props.questionLetterMap}
                            />
                            <ExtraPoints>
                                <ExtraPointsTitle>{e.game_extraPoints}</ExtraPointsTitle>
                                <span className='points'>{playerResultItemsObj.totalGamePoints || 0}</span>
                            </ExtraPoints>

                            <UserDetailsCard
                                userInfo={opponentUserInfo}
                                cdnMedia={this.props.cdnMedia}
                            />
                            <DetailResultsTable
                                answerResults={opponentAnswerResults}
                                questionLetterMap={this.props.questionLetterMap}
                            />
                            <ExtraPoints>
                                <ExtraPointsTitle>{e.game_extraPoints}</ExtraPointsTitle>
                                <span className='points'>{opponentResultItemsObj.totalGamePoints || 0}</span>
                            </ExtraPoints>
                        </TableBlock>
                    </DetailOverviewWrapper>
                </div>
            </DetailsWrapper>
        )
    }
}
