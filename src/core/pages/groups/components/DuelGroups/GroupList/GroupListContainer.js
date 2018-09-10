import React from 'react'
import { connect } from 'react-redux'
import GroupList from './components/GroupList'
import { initGroups, setCurrentGroupId } from "../../../duck";

const GroupListContainer = props => <GroupList {...props} />
const mapStateToProps = store => {
    //duels
    const language = store.profile && store.profile.settings && store.profile.settings.languageId

    return {
        groupDuelList:       store.groups.duelGroups,
        groupTournamentList: store.groups.tournamentGroups,
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