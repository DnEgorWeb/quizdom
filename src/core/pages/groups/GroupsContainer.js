import React from 'react'
import Groups from './index'
import { connect } from 'react-redux'
import {
    initGroups,
    initGroupsDetails,
    setCurrentGroup,
    deleteGroup,
    setRights,
    groupAddPlayers,
    initAddFriends,
    groupRemovePlayers,
    groupCreate,
    groupUpdate,
    getGroupListPlayers,
    getGroupList
} from './duck'

import {
    getFriends
} from '../highscore/duck'

const GroupsContainer = props => <Groups {...props} />



const mapStateToProps = store => {
    const language = store.profile && store.profile.settings && store.profile.settings.languageId

    const {duelGroups, tournamentGroups} = store.groups;

    return {
        groupList: store.groups.groupList,
        groupTournamentList: tournamentGroups,
        groupDuelList: duelGroups,
        userId: store.profile.userId,
        cdnMedia: store.app.environment.cdnMedia,
        groupListPlayers: store.groups.groupListPlayers || [],
        currentGroup: store.groups.currentGroup,
        myFriendsList: store.highscore.friends || [],
        newGroups: store.groups.newGroups,
        playerSettings: store.profile.settings,
        language
    }
}

export default connect(mapStateToProps, {
    initGroups,
    initGroupsDetails,
    initAddFriends,
    setCurrentGroup,
    deleteGroup,
    setRights,
    getFriends,
    groupAddPlayers,
    groupRemovePlayers,
    groupCreate,
    groupUpdate,
    getGroupListPlayers,
    getGroupList
})(GroupsContainer)