import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import url from '../../../constants/urlConstants'

import QuickGame from './gameTypes/quickgame/QuickGameContainer'
import Duel from './gameTypes/duel/DuelContainer'
import Tournament from './gameTypes/tournament/TournamentContainer'
import TournamentOpen from './gameTypes/tournament/components/TournamentOpenContainer'

import TournamentDetail from './gameTypes/tournament/components/TournamentDetails/TournamentDetailsContainer'
import QuickTournamentList from './gameTypes/tournament/components/QuickTournamentList/QuickTournamentListContainer'

export default class Game extends React.Component{
    render(){
        return(
            <Switch>
                <Route path={url.game.quiz.index}><QuickGame history={this.props.history} /></Route>
                {/* a={{}} hotfix for router bug */}
                <Route path={url.game.duel.index}><Duel history={this.props.history} a={{}} /></Route>
                <Route path={url.game.tournament.open}><TournamentOpen history={this.props.history} /></Route>
                <Route path={url.game.tournament.quick} exact><QuickTournamentList history={this.props.history} /></Route>
                <Route path={url.game.tournament.detail}><TournamentDetail history={this.props.history} /></Route>
                <Route path={url.game.tournament.index}><Tournament history={this.props.history} /></Route>
                <Redirect to={url.game.quiz.index} />
            </Switch>
        )
    }
}
