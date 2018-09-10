import React from 'react'
import e from '../../../../../../langs';
import GameOptions from './GameOptions'
import Game from '../../../../../modules/game/GameContainer'
import TopBar from '../../../../../modules/components/GameResultsTopBar'
import url from '../../../../../../constants/urlConstants'

import {
	Title,
	Separator,
	Text,
	HeadText,
	SectionButton,
	YellowText,
} from '../../duel/components/styledComponents'

export default class Tournament extends React.Component {
	constructor(props) {
		super(props)
		props.getTournamentGames();

        if(props.language) e.setLanguage(props.language);
	}

	componentWillReceiveProps(nextProps) {
	    if(nextProps.language) e.setLanguage(nextProps.language);
    }

	goToOpenTournament = () => {
		this.props.history.push(url.game.tournament.open)
	}

	goBack = () => {
		this.props.history.goBack()
	}

	close = () => {
		this.props.history.push('/dashboard');
	}

	goToTournamentDetails = () => {
		this.props.initGame(this.props.quickTournament && this.props.quickTournament.gameId)
		this.props.history.push(url.game.tournament.detail)
	}

	render() {
		const gameList = this.props.gameList;

		return this.props.isGameLoaded ?
			<Game />
			: (
			<div>
				<TopBar
					leftButtonClickHandler={this.goBack}
					rightButtonClickHandler={this.close}
					caption={e.game_tournament}
				/>
				<GameOptions
					currentGame={this.props.quickTournament}
					startGame={this.goToTournamentDetails}
					goToCategoryList={this.goToCategoryList}
					firstName={this.props.firstName}
					lastName={this.props.lastName}
					nickName={this.props.nickName}
					person={this.props.person}
					initGame={this.props.initGame}
					history={this.props.history}
					isRegistered={this.props.isRegistered}
                    completedTournaments={gameList}
				/>
				<HeadText>{e.game_tournamentSelection}</HeadText>
				<SectionButton src='images/tournament_open.png' onClick={this.goToOpenTournament}>
					<Title>{e.game_tournamentsOpen}</Title>
					<Separator />
					<Text>
                        {e.game_tournaments} | <YellowText>{gameList && gameList.length}</YellowText>
					</Text>
				</SectionButton>
				<SectionButton src='images/tournament_friends.png'>
					<Title>{e.game_tournamentFriends}</Title>
					<Separator />
					<Text>{
					    e.formatString(e.game_openATournamentAndInviteFriends, <br />)
					}</Text>
				</SectionButton>
			</div>
		);
	}
}
