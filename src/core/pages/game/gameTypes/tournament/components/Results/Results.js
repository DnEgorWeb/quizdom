import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import ResultsList from './ResultsList'
import SingleResult from '../../../../../../modules/results/ResultsContainer'
import HighscoreTournamentResult from './highscore/HighscoreContainer'

class Results extends Component {
    state = {
        showSingleTournamentResult: false,
        showHighscoreTournamentResult: false
    }

    componentWillMount() {
        localStorage.setItem('tourItemsCounter', '0')
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.results && this.state.selectedTournament) {
            const tournamentEnded = Date.parse(nextProps.results.expiryDateTime) < new Date()

            tournamentEnded ?
                this.setState({
                    showHighscoreTournamentResult: true,
                    showSingleTournamentResult: false
                })
                :
                this.setState({
                    showSingleTournamentResult: true,
                    showHighscoreTournamentResult: false
                })
        }
    }

    close = () => {
        this.props.history.push('/dashboard')
    }

    showResult = (tournament) => {
        this.setState({selectedTournament: tournament}, () => {
            // this.props.getMultiplayerResults(tournament.gameInstanceId)
            this.props.getResults(tournament.gameInstanceId)
        })
    }

    closeHighscore = () => {
        this.setState({
            showSingleTournamentResult: false,
            showHighscoreTournamentResult: false
        })
    }

    render() {
        let component = null
        // const { cdnMedia } = this.props;

        if (this.state.showSingleTournamentResult) {
            component = <SingleResult isTournament={true} />
        } else if (this.state.showHighscoreTournamentResult) {
            component = <HighscoreTournamentResult id={this.state.selectedTournament.gameInstanceId}
                                                   closeHighscore={this.closeHighscore}
                                                   selectedTournament={this.state.selectedTournament} />
        } else {
            component = <ResultsList openMainMenu={this.props.openMainMenu}
                                     finishedTournaments={this.props.finishedTournaments}
                                     cdnMedia={this.props.cdnMedia}
                                     tournamentResults={this.props.tournamentResults}
                                     showResult={this.showResult}
                                     getTournamentResults={this.props.getTournamentResults}
                                     getMultiplayerResults={this.props.getMultiplayerResults}
                                     results={this.props.results}
                                     userId={this.props.userId}
                                     close={this.close}/>
        }
        return component
    }
}

export default withRouter(Results)