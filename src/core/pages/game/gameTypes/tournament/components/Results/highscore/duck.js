const SET_FRIENDS          = "SET_FRIENDS";
const SET_GLOBAL_HIGHSCORE = "SET_GLOBAL_HIGHSCORE"

export default function reducer(state = {}, action) {
    switch (action.type) {
        case SET_FRIENDS: {
            return {
                ...state,
                friends: action.payload
            }
        }

        case SET_GLOBAL_HIGHSCORE: {
            return {
                ...state,
                globalHighscore: action.payload
            }
        }

        default: {
            return state
        }
    }
}

export const setFriends = (data) => {
    return {
        type   : SET_FRIENDS,
        payload: data
    }
}

export const setGlobal = (data) => {
    return {
        type   : SET_GLOBAL_HIGHSCORE,
        payload: data
    }
}

export const receivedFriends = (data) => (dispatch) => {
    dispatch(setFriends(data.content.items))
}

export const receivedGlobalHighscore = (data) => (dispatch) => {
    dispatch(setGlobal(data.content.items))
}

export const getFriends = (id) => () => {
    window.network.send({
                            message: 'resultEngine/multiplayerResultsBuddiesList',
                            content: {
                                amongAllHandicapRanges: true,
                                gameInstanceId        : id,
                                limit                 : 20,
                                offset                : 0,
                            },
                        })
}

export const getGlobalHighscore = (id) => () => {
    window.network.send({
                            message: 'resultEngine/multiplayerResultsGlobalList',
                            content: {
                                amongAllHandicapRanges: true,
                                gameInstanceId        : id,
                                limit                 : 20,
                                offset                : 0,
                            },
                        })
}