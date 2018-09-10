import React from 'react'
import { connect } from 'react-redux'
import GroupList from './components/GroupList'
import { initGroups, setCurrentGroupId } from "../../../duck";

const GroupListContainer = props => <GroupList {...props} />

const mapStateToProps = store => {
    //tournaments
    const language = store.profile && store.profile.settings && store.profile.settings.languageId

    const {duelGroups, tournamentGroups} = store.groups;

    return {
        groupDuelList: duelGroups,
        groupTournamentList: tournamentGroups,
        userId: store.profile.userId,
        cdnMedia: store.app.environment.cdnMedia,
        newGroups: store.groups.newGroups,
        language
    }
}

export default connect(mapStateToProps, {
    initGroups,
    setCurrentGroupId
})(GroupListContainer)