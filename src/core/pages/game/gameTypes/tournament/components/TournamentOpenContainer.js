import { connect }                                                         from 'react-redux'
import { withRouter }                                                      from 'react-router-dom'
import TournamentOpen                                                      from './TournamentOpen'
import {getTournamentGames, getCompletedTournaments, getTournamentResults} from "../duck"
import {getMultiplayerResults, getResults}                                 from '../../../../../modules/results/duck'
import {getCleanTournamentList, /* getTournamentList */}                   from "../../../../dashboard/DashboardContainer";

const mapStateToProps = (store) => {
    // const gameList       = getTournamentList(store.publicGames.publicGameList);
    const cleanGameList  = getCleanTournamentList(store.publicGames.publicGameList, store.profile.settings.languageId);
    const { userId }     = store.profile;
    const language       = store.profile && store.profile.settings && store.profile.settings.languageId;
    const completedDuels = store.duelgame && store.duelgame.completedDuelsOrTournaments;

	return {
		gameList           : cleanGameList,
		finishedTournaments: store.duelgame.completedDuelsOrTournaments.items,
		cdnMedia           : store.app.application.configuration.cdnMedia,
		tournamentResults  : store.tournament.tournamentResults,
		results            : store.results.singleplayerResults,
		person             : store.profile.person,
		completedDuels,
		language,
		userId
	}
}

export default withRouter(connect(mapStateToProps, {
    getTournamentGames,
	getCompletedTournaments,
	getMultiplayerResults,
	getResults,
	getTournamentResults
})(TournamentOpen))
