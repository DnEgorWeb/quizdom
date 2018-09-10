import {setNumberOfQuestions} from "../../pages/game/gameTypes/quickgame/duck";
import e                      from '../../../langs';
import { getProfile }         from "../profile/duck";

const SET_GAME_LIST = 'SET_GAME_LIST'
const SET_TOURNAMENT_GAME_LIST = 'SET_TOURNAMENT_GAME_LIST'
const SET_GAME_ID = 'SET_GAME_ID'
const SET_GAME_INFO = 'SET_GAME_INFO'
const SET_GAME_INSTANCE_ID = 'SET_GAME_INSTANCE_ID'
const SET_ADDITIONAL_GAME_INFO = 'SET_ADDITIONAL_GAME_INFO'
const SET_CURRENT_QUESTION = 'SET_CURRENT_QUESTION'
const SET_ANSWER = 'SET_ANSWER'
const SET_END_GAME = 'SET_END_GAME'
const SET_ADVERTISEMENT = 'SET_ADVERTISEMENT'
const CLOSE_GAME = 'CLOSE_GAME'
const SET_QUESTION_LETTER_MAP = 'SET_QUESTION_LETTER_MAP'
const REMOVE_ADVETISEMENT = 'REMOVE_ADVETISEMENT'
const SET_GAME_LOADED = 'SET_GAME_LOADED'
const SET_QUESTION = 'SET_QUESTION'
const REMOVE_QUESTION = 'REMOVE_QUESTION'
const SET_IMAGE = 'SET_IMAGE'
const SET_TYPE_LIST = 'SET_TYPE_LIST'

export default function reducer(state, action){
    const defaultState = {
        gameList: [],
        tournamentGameList: [],
        gameId: null,
        questionLetterMap: [],
        questionList: [],
        imageList: [],
        game: {
            ended: false,
            answer: null,
            currentQuestion: {}
        },
        typeList: []
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
        // case SET_TOURNAMENT_GAME_LIST:
        //     return{
        //         ...state,
	     //        tournamentGameList: action.data
        //     }
        case SET_GAME_ID:
            return{
                ...state,
                gameId: action.data
            }
        case SET_GAME_INFO:
            return{
                ...state,
                game: {
                    ...state.game,
                    ...action.data
                }

            }
        case SET_GAME_INSTANCE_ID:
            return{
                ...state,
                gameInstanceId: action.data
            }
        case SET_ADDITIONAL_GAME_INFO:
            return{
                ...state,
                game: {
                    ...state.game,
                    ...action.data
                },
                numberOfQuestions: action.data.questionBlobKeys.length
            }
        case SET_GAME_LOADED:
            return{
                ...state,
                gameLoaded: action.payload
            }
        case SET_CURRENT_QUESTION:
            return{
              ...state,
              game:{
                ...state.game,
                currentQuestion:{
                  decryptionKey: action.data.decryptionKey,
                  questionStepBlobKey: action.data.questionStepBlobKey,
                  question: action.data.question,
                  questionType: null
                },
                answer: null
              }
            }
        case REMOVE_QUESTION:
            return{
                ...state,
                game:{
                    ...state.game,
                    currentQuestion: null
                }
            }
        case SET_ANSWER:
            return{
                ...state,
                game:{
                    ...state.game,
                    answer: {
                        ...action.data
                    }
                }
            }
        case SET_END_GAME:
            return{
                ...state,
                game:{
                    ...state.game,
                    ended: true
                }
            }
        case SET_TYPE_LIST:
            return{
                ...state,
                typeList: action.peyload
            }
        case SET_QUESTION_LETTER_MAP:
            let questionLetterMap = state.questionLetterMap.slice(0)
            questionLetterMap.push(action.data)
            return{
                ...state,
                questionLetterMap: questionLetterMap || []
            }
        case SET_QUESTION:
            let questionList = state.questionList.slice(0)
            questionList.push(action.data);
            return {
                ...state,
                questionList
            }
        case SET_IMAGE:
            return {
                ...state,
                imageList: [...state.imageList, Object.values(action.payload)]
            }
        case SET_ADVERTISEMENT:
            return{
                ...state,
                game:{
                    ...state.game,
                    advertisement: action.data
                }
            }
        case REMOVE_ADVETISEMENT:
            return{
                ...state,
                game:{
                    ...state.game,
                    advertisement: null
                }
            }
        case CLOSE_GAME:
            return {
                ...defaultState,
                lastQuestionLetterMap: state.questionLetterMap
            }
        default:
            return state
    }
}

export const setGameList = (data) => {
    return {
        type: SET_GAME_LIST,
        data: data
    }
}

export const setTournamentGameList = (data) => {
    return {
        type: SET_TOURNAMENT_GAME_LIST,
        data: data
    }
}

export const setGameID = (gameId) => {
    return {
        type: SET_GAME_ID,
        data: gameId
    }
}

export const setGameInfo = (data) => {
    return {
        type: SET_GAME_INFO,
        data: data
    }
}

export const setAdditionalGameInfo = (data) => {
    return {
        type: SET_ADDITIONAL_GAME_INFO,
        data: data
    }
}

export const setGameLoaded = (data = true) => {
    return {
        type: SET_GAME_LOADED,
        payload: data
    }
}

export const setGameInstanseId = (data) => {
    return {
        type: SET_GAME_INSTANCE_ID,
        data: data
    }
}

export const setCurrentQuestion = (data) => {
  return {
    type: SET_CURRENT_QUESTION,
    data: data
  }
}

export const setQuestionLetterMap = (data) => {
    if(!data) return {
        type: SET_QUESTION_LETTER_MAP,
        data: {}
    }
    data = data.mappings[1].answers
    return {
        type: SET_QUESTION_LETTER_MAP,
        data: data
    }
}

export const setQuestion = (data) => {
    return {
        type: SET_QUESTION,
        data: data
    }
}

export const setAnswer = (data) => {
    return {
        type: SET_ANSWER,
        data: data
    }
}

export const setEndGame = (data) => {
    return {
        type: SET_END_GAME,
        data: data
    }
}

export const setAdvertisment = (data) => {
    return {
        type: SET_ADVERTISEMENT,
        data: data
    }
}

export const setCloseGame = () => {
    return {
        type: CLOSE_GAME
    }
}

export const removeAdvertisement = () => {
    return {
        type: REMOVE_ADVETISEMENT
    }
}

export const removeQuestion = () => {
    return {
        type: REMOVE_QUESTION
    }
}

export const setNewImage = (data) => {
    return {
        type: SET_IMAGE,
        payload: {...data}
    }
}

export const setTypeList = (data) => (d, getState) => {
    const dataArr = getState().game.typeList.push(data);

    return {
        type: SET_TYPE_LIST,
        payload: {...dataArr}
    }
}

export const getGameList = (type = "") => () => {
    window.network.send({
         message: 'gameSelection/getGameList',
         content: {
             type,
             handicapFrom: 0,
             handicapTo: 100
         }
    })
}

export const getGame = (gameId) => (dispatch, getState) => {
    const defaultGameId = getState().game.gameId

    window.network.send({
         message: 'gameSelection/getGame',
         content: {
             gameId: gameId || defaultGameId
         }
    })
}

export const registerGame = (trainingMode, numberOfQuestions, id = null) => (dispatch, getState) => {
    // very vey bad, may cause bugs
    const lastGame = localStorage.getItem('lastGameOptions');
	let lastId;

	try {
		lastId = JSON.parse(lastGame).gameId;
	} catch(e) { console.log(e.message) }

    const gameId = getState().game.gameId || getState().quickgame.gameId || id || lastId;
    const gameConfig = {
        trainingMode: trainingMode,
        numberOfQuestions: numberOfQuestions
    };
    // localStorage.setItem('lastGameOptions', JSON.stringify(gameConfig));
    window.network.send({
         message: 'gameEngine/register',
         content: {
             gameId: gameId,
             singlePlayerGameConfig: gameConfig
         }
    })
}

export const startGame = (multiplayerGameInstanceId = '') => (dispatch, getState) => {
	const state          = getState();
	const gameList       = state.publicGames.publicGameList;
	const game           = state.game;
	const gameInstanceId = game.gameInstanceId;
	const gameData       = gameList && gameList.filter(item => item.gameId === game.gameId);
	const gameLanguage   = game.game && game.game.playingLanguages && game.game.playingLanguages[ 0 ];
	const userLanguage   = gameLanguage || state.profile.settings.languageId || (gameData && gameData[0].playingLanguages[ 0 ]);

    window.network.send({
         message: 'gameEngine/startGame',
         content: {
            gameInstanceId: gameInstanceId,
            userLanguage: gameLanguage || userLanguage,
	        multiplayerGameInstanceId
         }
    })
}

export const setReadyToPlay = () => (dispatch, getState) => {
    const gameInstanceId = getState().game.gameInstanceId

    // todo: временная задержка для локализации ошибки при запуске игр
	setTimeout(() => {
        if(!gameInstanceId) {
            setTimeout(() => dispatch(setReadyToPlay), 500);
        } else {
            window.network.send({
                message: 'gameEngine/readyToPlay',
                content: {
                    gameInstanceId: gameInstanceId,
                }
            })
        }
	}, 1000);
}

export const answerQuestion = (answersArray) => (dispatch, getState) => {

    window.network.send({
         message: 'gameEngine/answerQuestion',
         content: {
            answers: answersArray,
            gameInstanceId: getState().game.game.gameInstanceId,
            question: getState().game.game.currentQuestion.question,
            step: 0,
            tClientMs: 6900
         }
    })
}

export const showAdvertisement = () => (dispatch, getState) => {
    window.network.send({
        message: 'advertisement/advertisementHasBeenShown',
        content: {
            advertisementBlobKey: getState().game.game.advertisement ? getState().game.game.advertisement.advertisementBlobKey : null,
            gameId: getState().game.gameId,
            gameInstanceId: getState().game.gameInstanceId
        }
    })
}

export const nextStep = () => (dispatch, getState) => {
    window.network.send({
        message: 'gameEngine/nextStep',
        content: {
            gameInstanceId: getState().game.game.gameInstanceId,
            question: getState().game.game.currentQuestion.question || 0,
            step: 0,
            tClientMs: 6900
        }
    })
}

export const closeGame = (id) => () => {
    window.network.send({
        message: 'game/gameClose',
        content: { id }
    })
}

export const setNewQuestion = (data) => (dispatch) => {
    if(!data) return
    if (data.mappings[0].id !== 'IMAGE') {
        data = data.mappings[0].value
        dispatch(setQuestion(data))
    }
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
    dispatch(setGameInfo(data.content.game));
}

export const receivedRegisterGame = (data) => (dispatch) => {
    if(data.error){
	    console.log(data.error);
        window.notification.alert(e.game_error, e.game_gameIsNotAvaliable, e.game_ok, () => {})
    }else{
        dispatch(setGameInstanseId(data.content.gameInstanceId))
        dispatch(startGame())
    }
}

export const receivedStartGame = (data) => (dispatch) => {
    if(data.error){
	    console.log(data.error);
        window.notification.alert(e.game_error, e.game_gameIsNotAvaliable, e.game_ok, () => {})
    }else{
	    window.numberOfQuestions && localStorage.setItem('countQuestionForCurrentGame', window.numberOfQuestions);
	    window.objGameOptions && localStorage.setItem('lastGameOptions', JSON.stringify(window.objGameOptions));
	    // delete window.objGameOptions;
	    // delete window.numberOfQuestions;
        dispatch(setAdditionalGameInfo(data.content))
        dispatch(setGameLoaded())
        dispatch(setReadyToPlay())
    }
}

export const receivedStartStep = (data) => (dispatch) => {
  dispatch(removeQuestion())
  dispatch(setCurrentQuestion(data.content))
}

export const receivedAnswerQuestion = (data) => (dispatch) => {
    dispatch(setAnswer(data.content))
}

export const receivedEndGame = (data) => (dispatch) => {
    dispatch(getProfile());
    dispatch(setEndGame(data.content))
}

export const receivedShowAdvertisment = (data) => (dispatch) => {
    dispatch(setAdvertisment(data.content))
}

export const receivedAdvertisementHasBeenShown = (data) => (dispatch) => {
    dispatch(nextStep())
    dispatch(removeQuestion())
    dispatch(removeAdvertisement())
}

export const receivedCloseGame = () => (dispatch) => {
    dispatch(setCloseGame())
}

export const receivedReadyToPlay = () => (dispatch) => {
    const localObj = JSON.parse(localStorage.getItem('lastGameOptions'));

    if(!localObj) return;

    const {numberOfQuestions} = localObj;
    dispatch(setNumberOfQuestions(numberOfQuestions))
}

export const restartGame = (gameID) => (dispatch) => {
    dispatch(setCloseGame())
    dispatch(setGameID(gameID))
    dispatch(getGame(gameID))
    // dispatch(registerGame()) // регистрация приводит к ошибке
}
