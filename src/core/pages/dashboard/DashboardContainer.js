import React from 'react'
import { connect } from 'react-redux'
import Dashboard from './components'
import { toggleSideMenu, initDashboard} from './duck'
import {getBalance} from '../payment/duck'
const DashboardContainer = props => <Dashboard {...props} />

export const getTournamentList = (list) => {
    const storageArr = JSON.parse(localStorage.getItem('multiplayerGameInstanceId'));
    let filteredGameList = list;

    if (storageArr && filteredGameList) {
        filteredGameList = list.filter( game => {
            let isRepeated = false;

            storageArr.forEach(item => {
                if (item === game.multiplayerGameInstanceId) isRepeated = true
            });

            return isRepeated; // should be boolean
        })
    }
    return filteredGameList
}

export const getCleanTournamentList = (list, lang) => {
    if((!Array.isArray(list)) || !list.length) return list;

    return list.filter(item => (
            item.gameType === 'TOURNAMENT' &&
            item.gameInstance &&
            !item.gameInstance.gameInstanceId &&
            ~lang.toUpperCase().indexOf(item.playingRegions)
            // todo: временная блокировка битых турниров
            && item.gameTitle !== "TourTest" && item.gameTitle !== "TouR Margo"
        )
    );
}

const mapStateToProps = store => {
    // const tournamentGameList          = getTournamentList(store.publicGames.publicGameList)
    const { isSideMenuOpened }        = store.dashboard;
    const { person = {}, stats = {} } = store.profile;
    const { app, messenger }          = store;
    const { dashboard }               = store;
    const { balance }                 = store.payment;
    const cleanGameList               = getCleanTournamentList(store.publicGames.publicGameList, store.profile.settings.languageId);

	return {
        isSideMenuOpened,
        firstName         : person.firstName,
        lastName          : person.lastName,
        nickname          : person.nickname,
        level             : stats.gameLevel,
        money             : balance.money,
        credit            : balance.credit,
        dashboard         : dashboard,
        bonus             : balance.bonus,
        currency          : app.tenant.currency,
        unreadMessageCount: messenger.unreadMessages.length,
        tournamentGameList: cleanGameList, // tournamentGameList,
        language          : store.profile.settings.languageId
    }
}

export default connect(mapStateToProps, {
	toggleSideMenu,
	initDashboard,
	getBalance,
})(DashboardContainer)
