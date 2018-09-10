import React from 'react'
import { connect } from 'react-redux'
import PlayerList from './components/PlayerList'

import {
    initPlayerList
} from '../../../duck'

const PlayerListContainer = props => <PlayerList {...props} />

const mapStateToProps = store => {
    const userId = store.profile.userId;
    return {
        cdnMedia: store.app.environment.cdnMedia,
        groupListPlayers: store.groups.groupListPlayers.filter((friend) => friend.userId !== userId),
    }
}

export default connect(mapStateToProps, {
    initPlayerList
})(PlayerListContainer)
