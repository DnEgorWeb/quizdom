const SET_FRIENDS         = "SET_FRIENDS";
const ADD_TO_FRIENDS      = "ADD_TO_FRIENDS";
const SET_LEADERBOARD     = "SET_LEADERBOARD";
const SET_PLAYER_POSITION = "SET_PLAYER_POSITION";

const initialState = {
    friends: []
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_FRIENDS: {
            return {
                ...state,
                friends: action.payload
            }
        }

        case ADD_TO_FRIENDS: {
            return {
                ...state,
                friends: [...state.friends, ...action.payload]
            }
        }

        case SET_LEADERBOARD: {
            return {
                ...state,
                allPlayers: action.payload
            }
        }

        case SET_PLAYER_POSITION: {
            return {
                ...state,
                playerPosition: action.payload
            }
        }

        default: {
            return state
        }
    }
}

export const setFriends = (data) => {
    return {
        type: SET_FRIENDS,
        payload: data
    }
}

export const setLeaderboard = (data) => {
    return {
        type: SET_LEADERBOARD,
        payload: data
    }
}

export const setPlayerPosition = (data) => {
    return {
        type: SET_PLAYER_POSITION,
        payload: data
    }
}

export const addToFriends = (friends) => {
    return {
        type: ADD_TO_FRIENDS,
        payload: friends
    }
}

export const receivedFriends = (data) => (dispatch) => {
    const offset = data.content.offset;
    if (offset === 0) {
        dispatch(setFriends(data.content.items))
    } else {
        dispatch(addToFriends(data.content.items))
    }
}

export const receivedLeaderboardList = (data) => (dispatch) => {
    dispatch(setLeaderboard(data.content.items))
}

export const receivedPlayerPosition = (data) => (dispatch) => {
    dispatch(setPlayerPosition(data.content))
}

export const getFriends = (offset = 0, searchTerm = '', favorite) => () => {
    window.network.send({
        message: 'friend/buddyList',
        content: {
            includeProfileInfo: true,
            includedRelationTypes: ["BUDDY"],
            limit: 20,
            offset: offset || 0,
            searchTerm: '',
            favorite,
        },
    })
}

export const getLeaderboard = (amount = 100, offset = 0) => () => {
    window.network.send({
        message: 'friend/playerLeaderboardList',
        content: {
            limit: amount,
            offset: offset,
        },
    })
}

export const getPlayerPosition = () => () => {
    window.network.send({
        message: 'friend/leaderboardPosition',
        content: {}
    })
}