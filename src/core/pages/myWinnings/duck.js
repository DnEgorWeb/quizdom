const initialState = {
    userWinningsList: [],
    userSpinnersList: [],
    winningComponents: [],
    currentWinn: {},
    winningOptions: [],
    winningOption: null,
    userWinningComponentId: ""
}

const SET_USER_WINNINGS_LIST = "SET_USER_WINNINGS_LIST"
const SET_USER_SPINNERS_LIST = "SET_USER_SPINNERS_LIST"
const SET_CURRENT_WINN = "SET_CURRENT_WINN"
const SET_WINNING_COMPONENT = "SET_WINNING_COMPONENT"
const SET_WINNING_ID = "SET_WINNING_ID"
const SET_WINNING_OPTION = "SET_WINNING_OPTION"
const SET_WINNING_OPTIONS = "SET_WINNING_OPTIONS"
const SET_WINNING_COMPONENT_GOT = "SET_WINNING_COMPONENT_GOT"
const IS_WINNING_UNAVAILABLE = "IS_WINNING_UNAVAILABLE"
const SET_ITEM_INFO = "SET_ITEM_INFO"
const SET_SPINNER_PLAYED = "SET_SPINNER_PLAYED"
const SET_DEFAULT_WINNING = "SET_DEFAULT_WINNING"
const SET_SPINNER_DELAYED = "SET_SPINNER_DELAYED"

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_WINNING_ID:
            return {
                ...state,
                winningComponentId: action.payload
            }
        case SET_ITEM_INFO:
            return {
                ...state,
                itemInfo: action.payload
            }
        case SET_SPINNER_PLAYED:
            return {
                ...state,
                spinnerPlayed: action.payload
            }
        case SET_WINNING_COMPONENT:
            return {
                ...state,
                winningComponents: [action.payload, ...state.winningComponents]
            }
        case SET_WINNING_COMPONENT_GOT:
            return {
                ...state,
                winningComponentGot: action.payload
            }
        case IS_WINNING_UNAVAILABLE:
            return {
                ...state,
                isWinningComponentUnavailable: action.payload
            }
        case SET_WINNING_OPTION:
            return {
                ...state,
                winningOption: action.payload
            }
        case SET_USER_WINNINGS_LIST:
            return {
                ...state,
                userWinningsList: [...state.userWinningsList, ...action.payload]
            }
        case SET_USER_SPINNERS_LIST: {
            return {
                ...state,
                userSpinnersList: action.payload
            }
        }
        case SET_CURRENT_WINN: {
            return {
                ...state,
                currentWinn: action.payload
            }
        }
        case SET_DEFAULT_WINNING: {
            return {
                ...initialState
            }
        }
        case SET_WINNING_OPTIONS: {
            return {
                ...state,
                winningOptions: action.payload
            }
        }
        case SET_SPINNER_DELAYED: {
            return {
                ...state,
                spinnerDelayed: true
            }
        }

        default:
            return state;
    }
}

export const getUserWinningsList = (offset = 0) => (dispatch, getState) => {
    const token = getState().app.tokensearchBy
    window.network.send({
        message: 'winning/userWinningList',
        content: {
            limit: 20,
            offset,
            orderBy: [{direction: 'desc', field: 'obtainDate'}]
        },
        token: token || null,
    })
}

const getResults = (gameInstanceId) => (dispatch) => {
    window.network.send({
        message: 'resultEngine/getResults',
        content: {
            gameInstanceId: gameInstanceId
        }
    })
}


export const assignWinningComponent = (gameId, type) => (dispatch) => {
    window.network.send({
        message: 'winning/userWinningComponentAssign',
        content: {
            gameInstanceId: gameId,
            type: type
        }
    })
}

export const setWinningOptions = (data) => {
    return {
        type: SET_WINNING_OPTIONS,
        payload: data
    }
}

export const setSpinnerDelayed = () => {
    return {
        type: SET_SPINNER_DELAYED
    }
}

export const userWinningComponentLoad = (userWinningComponentId) => () => {
    window.network.send({
        message: 'winning/userWinningComponentLoad',
        content: {
            userWinningComponentId
        }
    })
}

export const receivedUserWinningComponentLoad = (data) => dispatch => {
    if (data.content) {
        dispatch(setWinningOptions(data.content.winningOptions));
    }
}

const addUserWinningsItems = (items) => {
    return {
        type: SET_USER_WINNINGS_LIST,
        payload: items
    }
}

export const setUserWinningsList = (msg) => (dispatch) => {
    dispatch(addUserWinningsItems(msg.content.items))
}

const getUserSpinnersList = () => (dispatch, getState) => {
    const token = getState().app.token
    window.network.send({
        message: 'winning/userWinningComponentList',
        content: {
            limit: 100,
            offset: 0,
            orderBy: [{direction: 'desc', field: 'id'}]
        },
        token: token || null,
    })
}

export const startWinningComponent = (userWinningComponentId) => (dispatch) => {
    window.network.send({
        message: 'winning/userWinningComponentStart',
        content: {
            userWinningComponentId: userWinningComponentId
        }
    })
}

export const stopWinningComponent = (userWinningComponentId) => (dispatch) => {
    window.network.send({
        message: 'winning/userWinningComponentStop',
        content: {
            userWinningComponentId: userWinningComponentId
        }
    })
}

export const setWinningComponent = (data) => (dispatch) => {
    dispatch({
        type: SET_WINNING_COMPONENT,
        payload: data.content.winningComponent
    })
}

export const setUserSpinnersList = (msg) => (dispatch) => {
    dispatch({
        type: SET_USER_SPINNERS_LIST,
        payload: msg.content.items
    })
}

export const setItemInfo = item => {
    return {
        type: SET_ITEM_INFO,
        payload: item
    }
}

export const setSpinnerPlayed = () => {
    return {
        type: SET_SPINNER_PLAYED,
        payload: true
    }
}

export const setCurrentWinn = currentWinn => {
    return {
        type: SET_CURRENT_WINN,
        payload: currentWinn
    }
}

export const setWinningUnavailable = data => {
    return ({
        type: IS_WINNING_UNAVAILABLE,
        payload: data
    })
}

export const setOption = data => {
    return ({
        type: SET_WINNING_OPTION,
        payload: data
    })
}

export const setWinningId = data => {
    return ({
        type: SET_WINNING_ID,
        payload: data
    })
}

export const setWinningComponentId = data => (dispatch) => {
    if (data.error && data.error.message === "ERR_ENTRY_NOT_FOUND") {
        dispatch(setWinningUnavailable(true))
    }
    if (data.content) {
        dispatch(getResults(data.content.userWinningComponent.gameInstanceId))
        dispatch(setWinningUnavailable(false))
        dispatch(setWinningId(data.content.userWinningComponent.userWinningComponentId))
    }
}

export const setWinningOption = data => dispatch => {
    if (data.content) {
        dispatch(setOption(data.content.winningOption))
    }
}

export const setWinningComponentGot = data => {
    return {
        type: SET_WINNING_COMPONENT_GOT,
        payload: true
    }
}

export const clearWinningComponent = () => dispatch => {
    dispatch({
        type: SET_DEFAULT_WINNING
    })
}

export const initMyWinnings = () => (dispatch) => {
    dispatch(clearWinningComponent())
    dispatch(getUserWinningsList())
    dispatch(getUserSpinnersList())
}
