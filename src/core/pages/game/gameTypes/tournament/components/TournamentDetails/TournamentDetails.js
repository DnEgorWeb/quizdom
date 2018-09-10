import React, { Component } from 'react'
import e                    from '../../../../../../../langs';
import styled               from 'styled-components'
import { withRouter }       from 'react-router-dom'
import moment               from 'moment'

import TopBar          from '../../../../../../modules/components/GameResultsTopBar/index'
import url             from '../../../../../../../constants/urlConstants'
import { StartButton } from '../../../quickgame/components/gameCategoryList/styledComponents'

import {
	Account,
	AccountSumm,
	AccountSeparator,
	Section,
	Info,
	GameInfo,
	Cost,
	Date,
	Attention,
	StartButtonWrapper,
}                     from '../../../duel/components/InvitationInfo'
import ProfilePicture from '../../../../../../modules/components/ProfilePicture/components'
import InfoPanel      from '../../../../../tombola/components/infoPanel'
import Game           from '../../../../../../modules/game/GameContainer'

const JackpotWrapper = styled.div`
	position: relative;
	margin: -1rem 0 -1rem 1rem;
`

const Jackpot = styled.div`
	font-family: Overpass, sans-serif;
	position: absolute;
	background-color: #3e3e3e;
	color: #e6e6e6;
	font-size: 32px;
	height: 140px;
	width: 550px;
	top: 50px;
	right: 0;
	padding-left: 100px;
    box-sizing: border-box;
`

const JackpotText = styled.div`
	margin: .5rem auto;
	text-align: center;
	color:#e6e6e6;
	font-size: 32px;
`

const JackpotAmount = styled.div`
	margin: auto;
	text-align: center;
	color:#ffe600;
	font-size: 70px;
`

const JackpotSharing = styled.div`
	margin: 1rem auto;
	width: 344px;
	height: 102px;
	font-size: 24px;
	font-family: Overpass, sans-serif;
	color: rgb(31, 242, 255);
	font-weight: bold;
	line-height: 1.2;
	text-align: center;
	text-transform: uppercase;
	border-radius: 16px;
	background-image: linear-gradient(0deg, rgb(42,39,42) 0%, rgb(72,72,75) 100%);
    box-shadow: 0px 4px 3px rgba(40,40,40,1), 0px -2px 0px rgba(255,255,255,1);
    cursor: pointer;
    user-select: none;	
    
    &:active {
    	background-image: linear-gradient(180deg, rgb(42,39,42) 0%, rgb(72,72,75) 100%);
    	box-shadow: none;
    	padding-top: 2px;
    }
    
    & > div {
    	padding-top: 10px;
    }
    
    & > div:first-child {
    	font-size: 28px;
    }
    
    & > div:last-child {
    	font-size: 34px;
    }
`

const Flag = styled.img`
	position:absolute;
	left: 50px;
    bottom: 20px;
    width: 70px;
`

class TournamentDetail extends Component{
    state = {
        isInfoPanelOpen: false,
        infoPanelTitle: '',
        photoUrl: "images/Anonymus.png",
        tryToPlay: false,
        game: null,
        needShowNotification: false
	}
	
	componentWillReceiveProps(nextProps) {
        this.setState({game: nextProps.game});
    
        const { needShowNotification } = this.state;
    
        if(this.props.game.entryFeeAmount) {
            this.setState({
                    needShowNotification : false
            });
        }
        if (needShowNotification) this.accept();
    }

	componentDidMount() {
        const {userId, cdnMedia} = this.props
        const pictureUrl = `${cdnMedia}profile/${userId}.jpg?crossorigin`
        return fetch(pictureUrl)
            .then(response => {
                if (response.status === 403) {
                    throw new Error('forbidden')
                }
                return response.url
            })
            .then(url => {
                this.setState({
                    photoUrl: url
                })
            })
            .catch(error => {
                console.error(error.message)
            })
	}

    componentWillMount(){
    	if (!this.props.gameId) {
    		this.props.history.push(url.game.tournament.index)
	    } else {
		    this.props.getProfile()
		    this.props.getBalance()
		    this.props.getGame(this.props.gameId)
	    }
    }

	toggleInfoPanel = () => {
    	this.setState({isInfoPanelOpen: !this.state.isInfoPanelOpen})
	}

	getPayType = (type) => {
		switch(type || this.props.game.entryFeeCurrency){
			case 'BONUS':
				return 'BP'
			case 'MONEY':
				return '€'
			case 'CREDIT':
				return 'CR'
			default:
				return ''
		}
	}

	getBalance = () => {
		switch(this.props.game.entryFeeCurrency){
			case 'BONUS':
				return this.props.balance.bonus
			case 'MONEY':
				return this.props.balance.money
			case 'CREDIT':
				return this.props.balance.credit
			default:
				return ''
		}
	}

	goBack = () => {
		this.props.history.goBack()
	}

	close = () => {
		this.props.history.push('/dashboard');
	}

	accept = () => {
		const { profile, history } = this.props;

		if(!(profile.roles && profile.roles.includes('FULLY_REGISTERED'))) {
			window.notification.confirm(
				e.module_attention,
				e.module_youNeedToBeFullyRegisteredDoYouWantToCompleteYourProfile,
				[ e.game_editProfile, e.game_skip ], () => {
					history.push(url.profile.index);
				}
			);
			return false;
		}

        if(!this.state.game.gameIsFree && !(this.state.game && this.state.game.entryFeeAmount)) {
            this.setState({ needShowNotification : true });
        } else {
            const balance     = this.getBalance();
            const needBalance = this.state.game.entryFeeAmount;
            const entry       = balance < needBalance;

            if(!entry) {
                this.props.joinMultiplayerGame(this.props.game.multiplayerGameInstanceId);
            //} else if(!this.state.tryToPlay) {
            //    window.notification.alert('Hinweis', 'Du hast zu wenig Bonuspunkte!', 'Ok', () => {})
            //    this.setState({tryToPlay : true});
            } else {
                window.notification.confirm(e.game_note, e.game_yourBalanceIsNotSufficientWantToChargeNow, e.game_okCancel, (button) => {
                    if (Number(button) !== 2) {
                        this.props.history.push('/payment');
                    }
                });
            }
        }
	}

    render(){
	    const mapCurrToSymbol       = {
		    "CREDIT" : "CR",
		    "BONUS"  : "BP",
		    "USD"    : "$",
		    "EUR"    : "€",
		    "MONEY"  : "€"
	    };
        const {photoUrl} = this.state;
        const currentGame = this.props.game;
	    if (!currentGame) return null;

	    const { minimumJackpotGarantie } = currentGame;
	    const jackpot                    = currentGame && currentGame.game && currentGame.game.jackpot;
	    let jackpotAmountWithCurrency;

	    if(jackpot && minimumJackpotGarantie !== 0) {
		    const jBalance      = jackpot && jackpot.balance;
		    const jackpotAmount = minimumJackpotGarantie > 0 ?
		                          ((jBalance - minimumJackpotGarantie) > minimumJackpotGarantie ?
		                           (jBalance - minimumJackpotGarantie) : minimumJackpotGarantie) :
		                          jBalance;

		    jackpotAmountWithCurrency = `${jackpotAmount || 0} ${(jackpot && mapCurrToSymbol[ jackpot.currency ]) || ''}`;
	    } else if(minimumJackpotGarantie === 0 || (currentGame && currentGame.entryFeeAmount)) {
		    jackpotAmountWithCurrency = `${currentGame.entryFeeAmount || ''} ${mapCurrToSymbol[currentGame.entryFeeCurrency] || ''}`;
	    } else {
		    jackpotAmountWithCurrency = 0;
	    }

	    return this.props.isGameLoaded ?
		    <Game /> : (
            <div>
                <TopBar
                    leftButtonClickHandler={this.goBack}
                    rightButtonClickHandler={this.close}
                    caption={e.game_quickTournament}
                />
                <Section background='#232324' height='450px' zIndex='3'>
                    <Account>
                        <AccountSumm>{this.getBalance()} {this.getPayType()}</AccountSumm>
                        <AccountSeparator />
                        <div>{e.game_bankBalance}</div>
                    </Account>
	                <JackpotWrapper>
		                <Jackpot>
			                <JackpotText>{e.game_jackpot}</JackpotText>
			                <JackpotAmount>{jackpotAmountWithCurrency}</JackpotAmount>
		                </Jackpot>
	                    <ProfilePicture
		                    size={228}
		                    level={this.props.handicap}
                            pictureUrl={photoUrl}
	                    />
	                </JackpotWrapper>
	                <JackpotSharing onClick={this.toggleInfoPanel}>
		                <div>{e.game_jackpot}</div>
	                    <div>{e.game_distribution}</div>
	                </JackpotSharing>
                </Section>
                <Section background='#3e3e3e' height='370px' zIndex='2'>
                    <Info>
                        <GameInfo>
	                        {this.props.game.title} <br/>
	                        {this.props.game.numberOfQuestions} {e.game_ask}
                        </GameInfo>
                        <p>{e.game_commitment}:</p>
                        <Cost>{this.props.game.entryFeeAmount ? `${this.props.game.entryFeeAmount} ${this.getPayType()}` : 'FREE'}</Cost>
                        <p>{e.game_tournamentEnd}</p>
                        <Date>{moment(this.props.game.endDateTime).format('DD.MM.YYYY | HH:mm')} {e.game_clock}</Date>
						<Flag src="images/flag.png"/>
                    </Info>
                </Section>
                <Attention>
                    <p>{e.game_signUpForTheTournament}</p>
                    {e.game_200willBeBlocked}
                </Attention>
                <StartButtonWrapper>
                    <StartButton onClick={this.accept}>{e.game_ok}</StartButton>
                </StartButtonWrapper>
	            <InfoPanel
		            title={this.props.game.title}
		            isOpen={this.state.isInfoPanelOpen}
		            onCloseHandler={this.toggleInfoPanel}
		            noTitlePicture
					colorScheme={"blue"}
	            >
		            {this.props.game &&
		                <div dangerouslySetInnerHTML={{__html: this.props.game.description}} />
		            }
	            </InfoPanel>
            </div>
        )
    }
}

export default withRouter(TournamentDetail)
