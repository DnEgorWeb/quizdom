import React, { Component } from 'react'
import e from '../../../../../../langs';
import { withRouter } from 'react-router-dom'
import MainMenu from './MainMenu'
import Results from './Results/Results'
import url from "../../../../../../constants/urlConstants"

class TournamentOpen extends Component{

	constructor(props) {
		super(props);
        props.getTournamentGames()
        props.getCompletedTournaments()

		this.state = {
			showResults: false
		}

		if(props.language) e.setLanguage(props.language);
	}

    componentWillReceiveProps(nextProps) {
        if(nextProps.language) e.setLanguage(nextProps.language);
    }

	toInvitations = (type) => {
		if((type === 'user' && this.props.userInvitesCount) || (type === 'friends' && this.props.friendsInvitesCount)){
			this.props.history.push(url.game.duel.invitations + '?type=' + type)
		}else{
			window.notification.alert(e.game_note, e.game_thereAreNoContents, e.game_ok, () => {})
		}
	}

	goBack = () => {
		this.props.history.goBack()
	}

	close = () => {
		this.props.history.push('/dashboard');
	}

    openResults = () => {
		this.setState({
			showResults: true
		})
	}

    openMainMenu = () => {
		this.setState({
			showResults: false
		})
	}

	render(){
		const {finishedTournaments} = this.props
		let component = null;
        const gameList = this.props.gameList && this.props.gameList;

        if (this.state.showResults) {
            component = <Results getCompletedTournaments={this.props.getCompletedTournaments}
								 finishedTournaments={finishedTournaments}
								 openMainMenu={this.openMainMenu} c
								 cdnMedia={this.props.cdnMedia}
								 tournamentResults={this.props.tournamentResults}
								 getMultiplayerResults={this.props.getMultiplayerResults}
								 getResults={this.props.getResults}
                                 results={this.props.results}
                                 userId={this.props.userId}
								 getTournamentResults={this.props.getTournamentResults} />
		} else {
            component = <MainMenu finishedTournaments={finishedTournaments}
								  gameList={gameList}
								  openResults={this.openResults}
								  close={this.close}
								  goBack={this.goBack}/>
		}

		return component
	}
}

export default withRouter(TournamentOpen)
