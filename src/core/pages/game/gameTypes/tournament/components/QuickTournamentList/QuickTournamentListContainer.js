import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import QuickTournamentList from './QuickTournamentList'
import { loadGamesList, initGame, startGame, selectGame } from '../../../quickgame/duck.js'
import { getTournamentGames, joinMultiplayerGame } from '../../duck'
import {
    //getTournamentList,
    getCleanTournamentList
} from '../../../../../dashboard/DashboardContainer'

const mapStateToProps = (store) => {
    // const gameList = getTournamentList(store.publicGames.publicGameList)
    const roles = store.profile.roles
    let isRegistered = false
    if (roles) {
        roles.forEach(item => {
            if (item === "REGISTERED") {
                isRegistered = true
            }
        })
    }
    const cleanGameList  = getCleanTournamentList(store.publicGames.publicGameList, store.profile.settings.languageId);

	return {
		gameList    : cleanGameList,
		isGameLoaded: store.game.gameLoaded,
		isRegistered: isRegistered,
		person      : store.profile.person,
	}
}

export default withRouter(connect(mapStateToProps, {
	loadGamesList,
	initGame,
	startGame,
	selectGame,
	getTournamentGames,
	joinMultiplayerGame
})(QuickTournamentList))
