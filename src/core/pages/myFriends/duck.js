import {getFriends} from '../highscore/duck'

const initialState = {
    playerList: [],
}

const SET_PLAYER_LIST = "SET_PLAYER_LIST";
const ADD_TO_PLAYER_LIST = "ADD_TO_PLAYER_LIST";

export default function reducer (state = initialState, action) {
    switch (action.type) {
        case SET_PLAYER_LIST:
            return {
                ...state,
                playerList: action.payload
            }
        case ADD_TO_PLAYER_LIST:
            return {
                ...state,
                playerList: [...state.playerList, ...action.payload]
            }
        default:
            return state;
    }
}

export const setPlayerList = (playerList) => {
    return {
        type: SET_PLAYER_LIST,
        payload: playerList && playerList.filter(player => player.profile)
    }
}

export const addToPlayerList = (playerList) => {
    return {
        type: ADD_TO_PLAYER_LIST,
        payload: playerList
    }
}

export const getPlayerList = (offset = 0, searchTerm = '') => () => {
    window.network.send({
        message: 'friend/playerList',
        content: {
            includeBuddies: true,
	        includeProfileInfo: true,
            limit: 100,
            offset: offset,
            searchTerm: ''
        }
    })
}

export const playerBlock = (userIds) => () => {
    window.network.send({
        message: 'friend/playerBlock',
        content: {
            userIds
        }
    })
}

export const playerUnblock = (userIds) => () => {
    window.network.send({
        message: 'friend/playerUnblock',
        content: {
            userIds
        }
    })
}

export const changeFavoriteStatus = (userIds, favorite = false) => () => {
    window.network.send({
        message: 'friend/buddyAdd',
        content: {
            favorite,
            userIds
        }
    })
}

export const removeFriend = (userIds) => () => {
    window.network.send({
        message: 'friend/buddyRemove',
        content: {
            userIds
        }
    })
}

export const addToFriend = (userIds) => () => {
    window.network.send({
        message: 'friend/buddyAdd',
        content: {
            userIds
        }
    })
}

export const receivedPlayerList = (msg) => (dispatch) => {
    const offset = msg.content.offset;
    console.log(msg)
    if (offset === 0) {
        dispatch(setPlayerList(msg.content.items))
    } else {
        dispatch(addToPlayerList(msg.content.items))
    }
}

export const receivedUserOptionChangeResponse = () => (dispatch) => {
    setTimeout(() => {
        dispatch(initMyFriends())
    }, 1000)
}

export const initMyFriends = (favorite) => (dispatch) => {
    dispatch(getFriends(0, '', favorite));
    dispatch(getPlayerList());
}
