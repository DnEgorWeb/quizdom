import React, {Component} from 'react'
import e from '../../../../../langs'
import styled from 'styled-components'
import Avatar from '../../../components/ProfilePicture/ProfilePictureContainer'
import TopBar from '../../../components/GameResultsTopBar'
// import convertNumber from '../../../../../services/convertNumber'
import {withRouter} from 'react-router-dom'
import Prize from '../Prize'

import {
    WrapperResults,
    Statistics,
    UserBlock,
    ScoreTable,
    Values,
    Properties,
    BonusPoints,
    Amount,
    Footer,
} from '../styledComponents'
import moment from "moment/moment";

const TournierEnded = styled.div`
	font: 500 32px Overpass;
    margin-top: 1rem;
    text-align: center;
    color: #b4b4b4;
`

const YellowText = styled.span`
    color: #ffe600;
`

const Timer = styled.div`
    color: #ffe600;
    text-align:center;
    font-size: 36px;
`

class MainTournament extends Component {
    constructor(props) {
        super(props);
        if(props.language) e.setLanguage(props.language);
    }

    state = {
        timer: false,
        restTime: 0,
        showDetails: false,
        showSolutions: false
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.language) e.setLanguage(nextProps.language);
    }

    componentWillMount() {
        this.props.initSolutions();
        if (this.props.winningComponentId) {
            this.props.startWinningComponent(this.props.winningComponentId)
        }

        const restTime = new Date(this.props.endDateTime) - new Date()
        const hourInMilisec = 3600*1000
        if (restTime < hourInMilisec) {
            this.setState({
                timer: true
            })
        }
    }

    componentDidMount() {
        const {timer} = this.state
        if (timer) {
            this.timer = setInterval(this.tick, 1000)
        }
    }

    componentWillUnmount() {
        const {timer} = this.state
        if (timer) {
            clearInterval(this.timer)
        }
    }

    tick = () => {
        const restTime = new Date(this.props.endDateTime) - new Date()
        if (restTime<=1000) clearInterval(this.timer)
        this.setState({
            restTime: restTime
        })
    }

    startGame = () => {
        // this.props.closeGame() /* temporary */
        this.props.clearWinningComponent()
        const {gameId} = this.props.results
        // this.props.loadGame(gameId)
        this.props.restartGame(gameId)
    }

    toggleSound = () => {
        localStorage.setItem('sound', !this.props.sound);
        this.props.toggleSound()
    }

    getGameResults = (results) => {
        let resultItems = null

        if (results.playerResults) {
            resultItems = results.playerResults.resultItems
        } else {
            resultItems = results.resultItems || (results.singleplayerResults && results.singleplayerResults.resultItems)
        }

        let rightAnswersAmount = 0, questionsAmount = 0, bonusesEarned = 0

        if (resultItems) {
            resultItems.forEach(result => {
                const {amount} = result
                switch (result.resultType) {
                    case "totalQuestions":
                        questionsAmount = amount;
                        break;
                    case "correctAnswers":
                        rightAnswersAmount = amount;
                        break;
                    case "bonusPoints":
                        bonusesEarned = amount;
                        break;
                    default: return;
                }
            })
        }
        return {rightAnswersAmount, questionsAmount, bonusesEarned}
    }

    getHourAndSeconds = () => {
        let minutes = Math.floor(this.state.restTime/(1000*60))
        let seconds = Math.floor(this.state.restTime/1000)%60
        if (minutes < 10) minutes = '0' + minutes
        if (seconds < 10) seconds = '0' + seconds
        return {minutes, seconds}
    }

    close = () => {
        typeof this.props.close === 'function' ?
            this.props.close() :
            this.props.history.push('/dashboard')
    }

    getCurrentAttri = (attr) => {
    	if (!attr) return '';

	    switch(attr.toLowerCase()) {
		    case 'money' :
			    return { currency: '€', img: 'my-winnings-currency-type-eur.png' };
		    case 'bonus' :
			    return { currency: 'BP', img: '03_BonusPunkte_LG.png' };
		    case 'credit' :
			    return { currency: 'CR', img: 'my-winnings-currency-type-credits.png' };
		    default :
			    return { currency: '', img: '' };
	    }
    }

    render() {
	    const { timer }                  = this.state
	    const { sound, isSpinnerPlayed } = this.props
	    const {
		          rightAnswersAmount,
		          questionsAmount
	          }                          = this.getGameResults(this.props.results);
	    const isDuel                     = (this.props.gameType === "Duel")
	    const endDate                    = moment(this.props.endDateTime)
	    const { minutes, seconds }       = this.getHourAndSeconds()
	    const results                    = this.props.results.singleplayerResults;
	    const {
		          jackpotWinning,
		          jackpotWinningCurrency,
		          entryFeeCurrency,
		          resultItems
	          }                          = results || {};
	    const currency                   = jackpotWinningCurrency || entryFeeCurrency;
	    const atts                       = this.getCurrentAttri(currency);
	    const labelImgSrc                = `images/${isDuel ? (`${jackpotWinningCurrency}.png`) : atts.img}`;
	    let winningPointsItem            = 0;

		if(resultItems) {
			resultItems.forEach(item => {
				if(item.resultType === 'bonusPoints') {
					winningPointsItem = item.amount;
				}
			});
		}

        return(
            <WrapperResults>
                <TopBar
                    caption={e.game_tournaments}
                    leftButtonPictureSrc={`images/${sound ? "sound.png" : "sound-no.png"}`}
                    leftButtonClickHandler={this.toggleSound}
                    rightButtonClickHandler={this.close}/>
                <Statistics>
                    <UserBlock>
                        <Avatar size={230}/>
                        {this.props.isRegistered ?
                            <p style={{ textOverflow: 'ellipsis', overflow: 'hidden', width: 650 }}>{`${this.props.firstName || this.props.nickname} ${this.props.lastName || ""}`}</p>
                            :
                            <p>{e.game_guest}</p>
                        }
                    </UserBlock>
                    <ScoreTable>
                        <Values>
                            <span>{rightAnswersAmount}</span>
                            <span>{questionsAmount}</span>
                        </Values>
                        <Properties>
                            <span>{e.game_correct}</span>
                            <span>{e.game_from}</span>
                        </Properties>
                    </ScoreTable>
                </Statistics>
	                {
		                endDate.isAfter(moment().toISOString()) ?
			                <BonusPoints>
				                <img src={'images/03_BonusPunkte_LG.png'} alt="label"/>
			                    <Amount>{`${winningPointsItem} BP`}</Amount>
				                <img src={'images/03_BonusPunkte_LG.png'} alt="label"/>
			                </BonusPoints>
			            :
			                <BonusPoints>
				                <img src={labelImgSrc} alt="label"/>
				                <Amount>{jackpotWinning || 0} {atts.currency || ''}</Amount>
				                <img src={labelImgSrc} alt="label"/>
			                </BonusPoints>
	                }
                <Prize isDuel={isDuel}
                       toggleComponent={this.props.toggleComponent}
                       freeWinningComponent={this.props.freeWinningComponent}
                       isSpinnerPlayed={isSpinnerPlayed}
                       clearWinningComponents={this.props.clearWinningComponents}
                />
                <TournierEnded>{
                    e.formatString(
                        e.game_tournamentResultInYourResultList,
                        <br />,
                        <YellowText>{`${endDate.format('DD.MM.YYYY')} | `}</YellowText>,
                        <YellowText>{`${endDate.format('HH:mm')} Uhr`}</YellowText>
                    )
                }</TournierEnded>
                {timer ?
                    <Timer>
                        {`00:${minutes}:${seconds}`}
                    </Timer>
                    :
                    null
                }
                <Footer>
                    <span onClick={() => this.props.toggleComponent('showDetails')}>{e.game_details}</span>
                    <span onClick={this.props.close}>{e.game_home}</span>
                    <span onClick={() => this.props.toggleComponent('showSolutions')}>{e.game_solutions}</span>
                </Footer>
            </WrapperResults>
        )
    }
}

export default withRouter(MainTournament)
