import React  from 'react'
import { connect } from 'react-redux'

import Duel from './components'
import {
    getInvitations,
    removeInvitations,
    userInvitesSelector,
    friendsInvitesSelector,
    publicDuelSelector,
    getCompletedDuels,
    selectInvitation,
    getSelectedInvitation,
    respondToInvitation,
    initDuelCreation,
    startDuel,
    createDuel,
    createPublicDuel,
    filterGamesByLanguage,
    filterComplitedDuel,
    getCreatedPublicGames,
    getPublicGames,
    setGameType,
    initInvitations,
    getPoolList,
    getInvitedList,
	// filterInvitationsByRegion
} from './duck'
import { getBalance } from '../../../payment/duck'
import { getDashboard } from '../../../dashboard/duck'
import {getFriends} from "../../../highscore/duck";
import {initGroups, getGroupListPlayers, setGroupListPlayers} from "../../../groups/duck";
import { getResults, dispatchSetGameInstanseId, getMultiplayerResults } from '../../../../modules/results/duck'
import { getGame } from '../../../../models/gameEngine/duck';
const DuelContainer = (props) => <Duel {...props} />

function filterGroups(groups) {
	if(Array.isArray(groups) && groups.length) {
		return groups.filter(item => item.type === 'duel');
	}
	return groups;
}

const mapStateToProps = function(store){
	const userLang         = store.profile.settings.languageId;
	let userInvites        = userInvitesSelector(store.duelgame.invitations, store.profile.userId, userLang)
	let friendsInvites     = friendsInvitesSelector(store.duelgame.completedDuelsOrTournaments.items, store.profile.userId)
	let publicGames        = publicDuelSelector(store.publicGames.publicGameList, userLang)
	let createdPublicGames = getCreatedPublicGames(store.duelgame.invitations, store.profile.userId)
	let selectedInvitation = getSelectedInvitation(store.duelgame.invitations.concat(store.publicGames.publicGameList), store.duelgame.selectedInvitation)
	const currentGame      = store.quickgame.gameInfo;
	const duelGame         = store.game.game;
	const language         = store.profile && store.profile.settings && store.profile.settings.languageId;
	const duelGameList     = store.game.gameList;
	const invitations      = store.duelgame && store.duelgame.invitations;
	const groupList        = filterGroups(store.groups.groupList);

    return {
        isGameLoaded        : store.game.gameLoaded,
	    numberOfPublicDuels : store.dashboard.DUEL ? store.dashboard.DUEL.numberOfPublicGames : 0,
	    numberOfPlayedDuels : filterComplitedDuel(store.duelgame.completedDuelsOrTournaments.items, store.profile.userId).length,
	    balance             : store.payment.balance,
	    profile             : store.profile,
	    userId              : store.profile.userId,
	    userName            : store.profile.person.nickname,
	    results             : store.results.singleplayerResults,
	    firstName           : store.profile.person.firstName,
	    lastName            : store.profile.person.lastName,
	    showFullName        : store.profile.settings.showFullName,
	    gameList            : filterGamesByLanguage(store.quickgame.gameList, store.profile.settings.languageId),
	    myFriendList        : store.highscore.friends,
	    cdnMedia            : store.app.application.configuration.cdnMedia,
	    groupListPlayerIds  : store.groups.groupListPlayers.map(player => player.userId),
	    completedDuels      : filterComplitedDuel(store.duelgame.completedDuelsOrTournaments.items, store.profile.userId),
	    poolList            : store.duelgame.poolList,
	    duelgame            : store.duelgame,
	    createdPublicGames,
	    selectedInvitation,
	    publicGames,
	    userInvites,
	    friendsInvites,
	    groupList,
	    language,
        currentGame,
        duelGame,
        duelGameList,
        invitations
    }
}

export default connect(
    mapStateToProps,{
        getInvitations,
        removeInvitations,
        getDashboard,
        getCompletedDuels,
        selectInvitation,
        getSelectedInvitation,
        getBalance,
        initDuelCreation,
        getFriends,
        initGroups,
        getPublicGames,
        getGroupListPlayers,
        setGroupListPlayers,
        respondToInvitation,
        getResults,
        startDuel,
        createDuel,
        createPublicDuel,
        getGame,
        setGameType,
        initInvitations,
        getPoolList,
        dispatchSetGameInstanseId,
        getMultiplayerResults,
        getInvitedList
    }

)(DuelContainer)
