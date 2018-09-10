import React, { Component, Fragment } from 'react'
import e from '../../../../../../langs';
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import moment from 'moment'

import convertNumber from '../../../../../../services/convertNumber'

import TopBar from '../../../../../modules/components/GameResultsTopBar'
import {
    Account,
    AccountSumm,
    AccountSeparator
} from './styledComponents.js'
import {
    InformationList,
    RightAnswersItem,
    AnswersTimeItem,
    BonusPointsItem
} from '../../../../../modules/components/infoList/styledComponents'

const StyledInfoList = styled(InformationList)`
    margin: 25px auto;
    &::after{
        content: none;
    }
`
const Separator = styled.div`
  width: 4px;
  height: 33px;
  margin: 0 10px;
  position: relative;
  display: inline-block;
  &:after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 7px;
    background: white;
  }
`

const Section = styled.div`
    position: relative;
    background: ${props => props.background};
    height: ${props => props.height || ''};
    z-index: ${props => props.zIndex};
    box-shadow: 0px 4px 8px 0 #000000;
`

const Info = styled.div`
    text-align:center;
    padding: 20px 0;
    font-family: Overpass, sans-serif;
    p{
        font-size: 32px;
        color: #e6e6e6;
        margin: 10px 0;
    }
`
const GameInfo = styled.div`
    font-size: 40px;
    color: #1ff2ff;
`
const Cost = styled.div`
    font-weight: bold;
    font-size: 56px;
    color: #ffe600;
`
const Date = styled.div`
    font-size: 36px;
    color: #ffe600;
`

class UserDuelInfoFriends extends Component {
    constructor(props) {
        super(props)
        e.setLanguage(props.language)
    }

    componentWillReceiveProps(nextProps) {
        e.setLanguage(nextProps.language)
    }

    componentWillMount(){
        if(!this.props.selectedInvitation){
            this.props.goBack()
        }else{
            this.props.getMultiplayerResults()
            this.props.getResults(this.props.selectedInvitation.gameInstance.gameInstanceId)
        }
    }

    getPayType = (type) => {
        switch(type){
            case 'BONUS':
                return 'BP'
            default:
                return ''
        }
    }

    formatBonuses = (bonuses) => `${String(bonuses).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`

    render(){
        const resultItems  = (this.props.results && this.props.results.resultItems) || []
        let resultItemsObj = {}

        if(resultItems){
            resultItems.forEach((item) => {
                resultItemsObj[item.resultType] = item.amount
            })
        }

        return(
            <Fragment>
                <Section background='#232324' zIndex={'2'}>
                    <TopBar
                        leftButtonClickHandler={this.props.goBack}
                        rightButtonClickHandler={this.props.close}
                        caption="OFFENE DUELLE"
                    />
                    <Account>
                        <AccountSumm>
                            25,75
                        </AccountSumm>
                        <AccountSeparator />
                        <div>{e.game_myPoints}</div>
                    </Account>
                    <StyledInfoList>
                        <RightAnswersItem>
                            {e.game_correctAnswers}
                            <span className='value'>
                                {resultItemsObj.correctAnswers}<Separator /><span className='white'>{resultItemsObj.totalQuestions}</span>
                            </span>
                        </RightAnswersItem>
                        <AnswersTimeItem>
                            {
                                e.formatString(
                                    e.game_answerTimeSec,
                                    <span className='value'>{Math.floor((resultItemsObj.answerTime / 1000)) || 0}</span>,
                                    <span className='white'>{e.game_sec}</span >
                                )
                            }
                        </AnswersTimeItem>
                        <BonusPointsItem>
                            {
                                e.formatString(
                                    e.game_bonusPoints,
                                    <span className='value'>
                                        {this.formatBonuses(convertNumber(resultItemsObj.bonusPoints))}
                                    </span >
                                )
                            }
                        </BonusPointsItem>
                    </StyledInfoList>
                </Section>
                <Section background='#3e3e3e' height='370px' zIndex='1'>
                    <Info>
                        <GameInfo>
                            {this.props.selectedInvitation && this.props.selectedInvitation.game ? this.props.selectedInvitation.game.title: ''} <br/>
                            {this.props.selectedInvitation && this.props.selectedInvitation.numberOfQuestions} {e.game_ask}
                        </GameInfo>
                        <p>{e.game_commitment}:</p>
                        <Cost>
                            {((this.props.selectedInvitation && this.props.selectedInvitation.gameEntryFeeAmount) || 'FREE') + ' ' + this.getPayType(this.props.selectedInvitation && this.props.selectedInvitation.gameEntryFeeCurrency)}
                        </Cost>
                        <p>{e.game_openUntil}:</p>
                        <Date>
                            {moment(this.props.selectedInvitation && this.props.selectedInvitation.expiryDateTime).format('dd | DD.MM.YYYY | HH:mm')} {e.game_clock}
                        </Date>
                    </Info>
                </Section>
            </Fragment>
        )
    }
}

export default withRouter(UserDuelInfoFriends)
