import { registerGame, setCloseGame } from '../../../../models/gameEngine/duck'

const SET_GAME_LIST = 'SET_GAME_LIST'
const SET_GAME_ID = 'SET_GAME_ID'
const SET_GAME_INFO = 'SET_GAME_INFO'
const SET_NUMBER_OF_QUESTIONS = 'SET_NUMBER_OF_QUESTIONS'

export default function reducer(state, action){
    const defaultState = {
        gamesList: {
            games: [],
            gameInfo: {}
        },
    }
    if(!state){
        state = defaultState
    }
    switch (action.type) {
        case SET_GAME_LIST:
            return{
                ...state,
                gameList: action.data
            }
        case SET_GAME_INFO:
            return{
                ...state,
                gameInfo: action.data
            }
        case SET_GAME_ID:
            return{
                ...state,
                gameId: action.data
            }
        case SET_NUMBER_OF_QUESTIONS:
            return{
                ...state,
                gameInfo: {
                    ...state.gameInfo,
                    numberOfQuestions: action.data
                }
            }
        default:
            return state
    }
}

export const setGameID = (gameId) => {
    return {
        type: SET_GAME_ID,
        data: gameId
    }
}

export const setGameList = (data) => {
    return {
        type: SET_GAME_LIST,
        data: data
    }
}

export const setGameInfo = (data) => {
    return {
        type: SET_GAME_INFO,
        data: data
    }
}

export const setNumberOfQuestions = (numberOfQuestions) => {
    return {
        type: SET_NUMBER_OF_QUESTIONS,
        data: numberOfQuestions
    }
}

export const getGameList = (type = "QUIZ24") => () => {
    window.network.send({
         message: 'gameSelection/getGameList',
         content: {
             type,
             handicapFrom: 0,
             handicapTo: 100
         }
    })
}



export const getGame = (Id = null) => (dispatch, getState) => {
    const gameId = Id || getState().quickgame.gameId;

    window.network.send({
         message: 'gameSelection/getGame',
         content: {
             gameId: gameId
         }
    })
}

export const receivedGameList = (data) => (dispatch) => {
	if (data.content) {
		dispatch(setGameList(data.content.games))
	}
	if (data.error) {
		console.warn('receivedGameListError --->', data.error)
	}
}

export const receivedGameInfo = (data) => (dispatch) => {
    if(data.content) {
        dispatch(setGameInfo(data.content.game));
    }
}

export const startGame = (trainingMode, numberOfQuestions) => dispatch => {
    dispatch(setNumberOfQuestions(numberOfQuestions));
    dispatch(registerGame(trainingMode, numberOfQuestions))
}

export const initGame = data => dispatch => {
    dispatch(setGameID(data));
    dispatch(getGame());
}

export const loadGamesList = () => dispatch => {
    // dispatch(gameEngine.getDashboard())
    dispatch(getGameList('QUIZ24'))
}

export const selectGame = (game) => (dispatch) => {
    dispatch(getGame(game.gameId));
    dispatch(setGameID(game.gameId));
    dispatch(setGameInfo(game));
}

export const restartGame = (gameID, trainingMode = false, numberOfQuestions) => (dispatch) => {
    dispatch(setCloseGame())
    dispatch(setGameID(gameID))
    dispatch(setNumberOfQuestions(numberOfQuestions))
    // при рестарте регистрация возвращяет ошибку с сервера
    // dispatch(registerGame(trainingMode, numberOfQuestions))
}
