import { connect }                                        from 'react-redux'
import { withRouter }                                     from 'react-router-dom'
import Tournament                                         from './components/Tournament'
import { loadGamesList, initGame, startGame, selectGame } from '../../gameTypes/quickgame/duck.js'
import {
    getTournamentGames,
    joinMultiplayerGame,
    getCompletedTournaments,
    getTournamentListFromDuelOrTournamentGames,
	onJoinMultiplayerGameResponse
}                                                         from './duck'
import {getCleanTournamentList, getTournamentList}        from "../../../dashboard/DashboardContainer";

onJoinMultiplayerGameResponse({});

const mapStateToProps = (store) => {
    const gameList             = getTournamentList(store.publicGames.publicGameList);
    const cleanGameList        = getCleanTournamentList(store.publicGames.publicGameList, store.profile.settings.languageId);
    const quickTournament      = cleanGameList && cleanGameList.length && cleanGameList.reduce(((previousValue, currentValue) =>
            previousValue.endDateTime > currentValue.endDateTime ? currentValue : previousValue
                                                                                               ));
    const roles                = store.profile.roles
    const completedTournaments = gameList && getTournamentListFromDuelOrTournamentGames(store.duelgame.completedDuelsOrTournaments);
    const language             = store.profile && store.profile.settings && store.profile.settings.languageId;
    let isRegistered           = false

    if (roles) {
        roles.forEach(item => {
            if (item === "REGISTERED") {
                isRegistered = true
            }
        })
    }

    return {
        specialGameList     : gameList,
        gameList            : cleanGameList,
        quickTournament     : quickTournament,
        isGameLoaded        : store.game.gameLoaded,
        game                : store.game.game,
        firstName           : store.profile.person.firstName,
        lastName            : store.profile.person.lastName,
        nickName            : store.profile.person.nickName,
        person              : store.profile.person,
        cdnMedia            : store.app.application.configuration.cdnMedia,
        isRegistered        : isRegistered,
        completedTournaments: completedTournaments,
        language
    }
}

export default withRouter(connect(mapStateToProps, {
	loadGamesList,
	initGame,
	startGame,
	selectGame,
	getTournamentGames,
	joinMultiplayerGame,
    getCompletedTournaments
})(Tournament))
