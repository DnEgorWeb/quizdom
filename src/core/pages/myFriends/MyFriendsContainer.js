import React from 'react'
import { connect } from 'react-redux'

import MyFriends from './components'

import {getFriends} from '../highscore/duck'

import {
    initMyFriends,
    playerBlock,
    playerUnblock,
    changeFavoriteStatus,
    removeFriend,
    addToFriend,
    getPlayerList,
} from './duck'

const MyFriendsContainer = props => <MyFriends {...props} />

const mapStateToProps = store => {
	const cdnMedia = store.app.environment.cdnMedia;
	const myFriendsList = store.highscore.friends || [];
	const currentPlayer = store.myFriends.currentPlayer;
    const language = store.profile && store.profile.settings && store.profile.settings.languageId

	return {
        myFriendsList,
        cdnMedia,
        playerList: store.myFriends.playerList,
        currentPlayer,
        language
	}
}

export default connect(mapStateToProps, {
    initMyFriends,
    playerBlock,
    playerUnblock,
    changeFavoriteStatus,
    removeFriend,
    addToFriend,
    getPlayerList,
    getFriends,
})(MyFriendsContainer)
