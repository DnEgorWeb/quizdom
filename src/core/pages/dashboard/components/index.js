import React, {  Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import e from '../../../../langs'

import url from '../../../../constants/urlConstants'

import DashboardTopBar from '../../../modules/components/DashboardTopBar'

const DecoratedLink = styled(Link)`
    text-decoration: none;
`

const DashboardWrapper = styled.div`
    background: rgb(35,35,35);
    height: 100%;
    font-family: Univers-condensed;
`

const GameList = styled.div`
    overflow: hidden;
    height: 1236px;
    max-height: 1236px;
    position: relative;
    .scrollable-wrapper{
        padding-top: 46px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: -17px; /* Increase/Decrease this value for cross-browser compatibility */
        overflow-y: scroll;
        
        @media (max-width: 768px) {
            right: 0;
        }
    }
`

const Game = styled(DecoratedLink)`
    display: block;
    background-image: linear-gradient(rgb(72,72,72), rgb(36,36,37));
    width: 710px;
    height: 300px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.35), 0 -2px 0 rgb(143,143,143);
    margin: 40px auto 0;
    padding: 30px 0 0 28px;
    box-sizing: border-box;
    position: relative;
    &:first-child {
        margin-top: 0;
    }
    &:after {
        content: '';
        width: 290px;
        height: 290px;
        background: url(${props => props.src}) center no-repeat;

        position: absolute;
        right: 10px;
        top: -18px;
    }
`

const Title = styled.h2`
    font-size: 50px;
    font-weight: bold;
    color: rgb(218,218,218);
    text-shadow: 0 -4px 2px black;
    text-transform: uppercase;
    margin: 0;
`

const Separator = styled.div`
    width: 350px;
    height: 4px;
    background-image: linear-gradient(rgb(32,32,32), rgb(103,103,103));
    margin: 0 0 7px;
`

const Text = styled.div`
    font-size: 44px;
    font-weight: 500;
    text-align: left;
    color: #b4b4b4;
    .yellow {
        font-size: 46px;
        font-weight: bold;
        color: #ffe600;
    }
    .big{
        font-size: 56px;
    }
    p{
        margin: 0;
    }
`

class Dashboard extends Component{

    constructor(props){
        super(props)
        props.initDashboard()
        e.setLanguage(props.language);
    }
    
    componentWillReceiveProps(nextProps) {
        e.setLanguage(nextProps.language);
    }

    render(){
	    const {props} = this;
	    const tournamentGameList = this.props.tournamentGameList;

        return(
            <DashboardWrapper>
                <DashboardTopBar {...props} caption={e.dashboard_home && e.dashboard_home.toUpperCase()} unreadMessageCount={props.unreadMessageCount} />
                <GameList>
                    <div className='scrollable-wrapper'>
                        <Game to={url.game.quiz.index} src='images/quick-game.png'>
                            <Title>quick quiz</Title>
                            <Separator />
                            <Text>
                                {e.formatString(
                                    e.dashboard_preseUpTo,
                                    <br />,
                                    <span className="yellow big">JACKPOT</span>
                                )}
                            </Text>
                        </Game>
                        <Game to={url.game.duel.index} src='images/duell-game.png'>
                            <Title>{e.dashboard_quizDuell}</Title>
                            <Separator />
                            <Text>
                                {this.props.dashboard.DUEL && this.props.dashboard.DUEL.numberOfInvitations ?
                                    <p>
                                        {
                                            e.formatString(
                                                e.dashboard_invitationsAnd,
                                                <span className="yellow">{
                                                    this.props.dashboard.DUEL.numberOfInvitations || 0
                                                }</span>
                                            )
                                        }
                                    </p>
                                    :
                                    null
                                }
                                <span className="yellow">{
                                    this.props.dashboard.DUEL ? this.props.dashboard.DUEL.numberOfPublicGames : null
                                }</span>{` ${e.dashboard_publicDuels} `}<br />
                                {e.dashboard_areReady}
                            </Text>
                        </Game>

                        <Game to={url.game.tournament.index} src='images/turnier-game.png'>
                            <Title>{e.dashboard_quizTournament}</Title>
                            <Separator />
                            {this.props.tournamentGameList && this.props.tournamentGameList.length ?
                                <Text>{
                                    e.formatString(
                                        e.dashboard_tournamentsAreReadyForYou,
                                        <span className="yellow">{ tournamentGameList.length }</span>,
                                        <br/>
                                    )
                                }</Text>
                                :
                                <Text>{
                                    e.formatString(e.dashboard_theresNoTournamentsAtThisMoment, <br/>)
                                }</Text>
                            }
                        </Game>
                    </div>
                </GameList>
            </DashboardWrapper>
        )
    }
}

export default Dashboard
