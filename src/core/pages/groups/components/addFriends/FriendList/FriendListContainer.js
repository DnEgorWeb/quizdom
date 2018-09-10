import React from 'react'
import { connect } from 'react-redux'
import FriendList from './components/FriendList'
import { initFriendList } from "../../../duck";

const FriendListContainer = props => <FriendList {...props} />

const mapStateToProps = store => {
    const language = store.profile && store.profile.settings && store.profile.settings.languageId

    let myFriendList = store.highscore.friends;
    if (store.groups.groupListPlayers) {
        myFriendList = myFriendList.filter(friend => {
            const profile = friend.profile;
            return !(store.groups.groupListPlayers.filter(player => player.userId === profile.userId).length)
        });
    }

    return {
        myFriendList,
        cdnMedia: store.app.environment.cdnMedia,
        language
    }
}

export default connect(mapStateToProps, {
    initFriendList
})(FriendListContainer)