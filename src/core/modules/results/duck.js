// import {getMultiplayerGameResults}                             from '../../pages/game/gameTypes/duel/duck'
import { getGame, setCloseGame, setGameID, setGameInstanseId } from "../../models/gameEngine/duck";

const initialState = {
    singleplayerResults: null,
    multiplayerResults: null
};

const SET_RESULTS = 'SET_RESULTS'
const SET_DEFAULT_SINGLE_RESULTS = 'SET_DEFAULT_SINGLE_RESULTS'
const SET_MULTIPLAYER_RESULTS = 'SET_MULTIPLAYER_RESULTS'
const SET_DEFAULT_MULTIPLAYER_RESULTS = 'SET_DEFAULT_MULTIPLAYER_RESULTS'

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_RESULTS:
            return {
                ...state,
                singleplayerResults: action.payload,
            }
        case SET_DEFAULT_SINGLE_RESULTS:
            return {
                ...state,
                singleplayerResults: null
            }
        case SET_MULTIPLAYER_RESULTS:
            return {
                ...state,
                multiplayerResults :action.payload,
            }
        case SET_DEFAULT_MULTIPLAYER_RESULTS:
            return {
                ...state,
                multiplayerResults: null
            }
        default:
            return state;
    }
}

export const defaultSingleResults = () => {
    return {
        type: SET_DEFAULT_SINGLE_RESULTS
    }
}

export const setDefaultSingleResults = () => (dispatch) => {
    dispatch(defaultSingleResults())
}

export const defaultMultiplayerResults = () => {
    return {
        type: SET_DEFAULT_MULTIPLAYER_RESULTS
    }
}

export const setResults = (data) => (dispatch) =>  {
    dispatch({type: SET_RESULTS, payload: data});
}

export const setDefaultMultiplayerResults = () => (dispatch) => {
    dispatch(defaultMultiplayerResults())
}

export const setMultiplayerResults = (data) => {
    return {
        type: SET_MULTIPLAYER_RESULTS,
        payload: data
    }
}

export const getResults = (gameInstanceId) => () => {
    window.network.send({
        message: 'resultEngine/getResults',
        content: {
            gameInstanceId
        }
    })
}

export const getMultiplayerResults = (gameInstanceId) => (dispatch, getState) => {
    // const friendsInvites = friendsInvitesSelector(getState().duelgame.invitations, getState().profile.userId)
    const friendsInvites = getState().duelgame.invitations;
    let gameId = ''
    for(let i = 0; i< friendsInvites.length; i++){
        if(friendsInvites[i].multiplayerGameInstanceId === getState().duelgame.selectedInvitation){
            gameId = friendsInvites[i].gameInstance.gameInstanceId ?
                friendsInvites[i].gameInstance.gameInstanceId :
                getState().game.gameInstanceId
        }
    }
    window.network.send({
        message: 'resultEngine/getMultiplayerResults',
        content: {
            gameInstanceId: gameInstanceId || gameId
        }
    })
}

export const getPrize = (id) => () => {
    window.network.send({
        message: 'voucher/voucherGet',
        content: {
            voucherId: id
        }
    })
}

export const receivedResults = (data) => (dispatch) => {
    if (data.content && "specialPrizeVoucherId" in data.content.results) {
        const {specialPrizeVoucherId} = data.content.results
        dispatch(getPrize(specialPrizeVoucherId))
    }
    if (data.content) {
        dispatch(setResults(data.content.results))
    }
}

export const receivedMultiplayerResults = (data) => (dispatch) => {
    dispatch(setMultiplayerResults(data.content))
}

export const initSolutions = () => (dispatch, getState) => {
    const state = getState();
    const results = state.results.singleplayerResults;
    const gameInstanceId = state.game.gameInstanceId || (results && results.gameInstanceId);

    dispatch(getResults(gameInstanceId));
    dispatch(getMultiplayerResults(gameInstanceId));
}

export const dispatchSetGameInstanseId = (gameInstanse) => (dispatch) => {
    dispatch(setGameInstanseId(gameInstanse));
}

export const restartDuelGame = (gameID) => (dispatch) => {
    dispatch(setCloseGame())
    dispatch(setGameID(gameID))
    dispatch(getGame(gameID))
    // dispatch(registerGame())
}