import moment from 'moment'

import {
	getGameList,
	setGameInfo,
	setNumberOfQuestions
}                                       from '../quickgame/duck'
import { getFriends }                   from '../../../highscore/duck'
import { setGameInstanseId, startGame } from '../../../../models/gameEngine/duck'
import { getBalance }                   from "../../../payment/duck";
import e                                from "../../../../../langs";
import { getGame }                      from '../../../../models/gameEngine/duck';

const ADD_INVITATIONS         = 'ADD_INVITATIONS'
const REMOVE_INVITATIONS      = 'REMOVE_INVITATIONS'
const SET_COMPLETED_DUELS     = 'SET_COMPLETED_DUELS'
const SELECT_INVITATION       = 'SELECT_INVITATION'
const UNSELECT_INVITATION     = 'UNSELECT_INVITATION'
const SET_PUBLIC_GAMES        = 'SET_PUBLIC_GAMES'
const SET_MULTIPLAYER_RESULTS = 'SET_MULTIPLAYER_RESULTS'
const SET_DUEL_GAME_TYPE      = 'SET_DUEL_GAME_TYPE'
const SET_POOL_LIST           = 'SET_POOL_LIST'
const SET_INVITED_LIST        = 'SET_INVITED_LIST'

export default function duelReducer(state, action){

    const defaultState = {
        invitations: [],
        completedDuelsOrTournaments: {
            items: []
        },
        publicGames: [],
        selectedInvitation: null,
        invitedList: [],
        poolList: {
            items: []
        }
    }

    if(!state){
        state = defaultState
    }

    switch(action.type){
        case ADD_INVITATIONS:
            let newInvitations = state.invitations.concat(action.data)

            return{
                ...state,
                invitations: newInvitations
            }
        case REMOVE_INVITATIONS:
            return{
                ...state,
                invitations: []
            }
        case SET_COMPLETED_DUELS:
            return{
                ...state,
                completedDuelsOrTournaments: action.data
            }
        case UNSELECT_INVITATION:
            return{
                ...state,
                selectedInvitation: null
            }
        case SELECT_INVITATION:
            return{
                ...state,
                selectedInvitation: action.data
            }
        case SET_INVITED_LIST:
            return{
                ...state,
                invitedList: action.data
            }
        // case SET_MULTIPLAYER_RESULTS:
        //     return {
        //         ...state,
        //         multiplayerResults: action.payload
        //     }
        // case SET_PUBLIC_GAMES:
        //     return{
        //         ...state,
        //         publicGames: action.data.items
        //     }
        case SET_DUEL_GAME_TYPE:
            return{
                ...state,
                duelGameType: action.data
            }
        case SET_POOL_LIST:
            return{
                ...state,
                poolList: {
                    ...action.payload,
                    items: [...state.poolList.items, ...action.payload.items]
                }
            }
        default:
            return state
    }
}

export const addInvitations = (data) => {
    return {
        type: ADD_INVITATIONS,
        data: data
    }
}

export const removeInvitations = (data) => {
    return {
        type: REMOVE_INVITATIONS,
    }
}

export const setCompletedDuels = (data) => {
    return {
        type: SET_COMPLETED_DUELS,
        data: data
    }
}

export const selectInvitation = (data) => {
    return{
        type:SELECT_INVITATION,
        data: data
    }
}

export const unselectInvitation = () => {
    return{
        type: UNSELECT_INVITATION
    }
}

export const setPublicGames = (data) => {
    return{
        type: SET_PUBLIC_GAMES,
        data: data
    }
}

export const setMultiplayerResults = (data) => {
    return {
        type: SET_MULTIPLAYER_RESULTS,
        payload: data
    }
}

export const setGameType = (data) => {
    return{
        type: SET_DUEL_GAME_TYPE,
        data: data
    }
}

export const setPoolList = (data) => {
    return {
        type: SET_POOL_LIST,
        payload: data
    }
}

export const receivedInvitedList = (data) => {
    return {
        type: SET_INVITED_LIST,
        payload: data
    }
}

export const getInvitations = (type, status) => () => {
    window.network.send({
         message: 'gameSelection/invitationList',
         content: {
             states: status,
             createdBy: type,
             isPending: true,
             limit: 99,
             offset: 0,
             orderBy: [
                 {
                     field: 'id',
                     direction: 'desc'
                 }
             ],
             searchBy:{
                 'game.type': 'DUEL'
             },
         }
    })
}

export const getPublicGames = () => () => {
    window.network.send({
        message: 'gameSelection/publicGameList',
        content: {
            limit: 100
        }
    })
}

export const getInvitedList = (gameId = null) => () => {
    window.network.send({
        multiplayerGameInstanceId: gameId,
        message: 'gameSelection/invitedList',
        content: {
            limit: 100,
            offset: 0
        }
    })
}

export const getCompletedDuels = () => () => {
    // const userId = getState().profile.userId
    const date = moment().format('YYYY-MM-DDTHH:mm:ss')
    window.network.send({
         message: 'resultEngine/completedGameList',
         content: {
             dateFrom: "2018-01-01T00:00:00Z",
             dateTo: date + "Z",
             gameTypes: ["DUEL"],
             limit: 99,
             offset: 0,
             // searchBy: {
             //     isMultiplayerGameFinished: true
             // }
         }
    })
}

export const respondToInvitation = (accept, id, callback) => (dispatch, getState) => {
    const state       = getState();
    const userBalance = state.payment.balance;
    const invitations = state.duelgame && state.duelgame.invitations;
    const game        = invitations && invitations.filter(item => item.multiplayerGameInstanceId === id);
    const {
        gameEntryFeeCurrency,
        gameEntryFeeAmount
    } = (game && game[0]) || {};
    const lowerCurrencyName = gameEntryFeeCurrency && gameEntryFeeCurrency.toLowerCase();

    dispatch(getGame(game[0].gameId));

    if(!gameEntryFeeCurrency || userBalance[lowerCurrencyName] >= gameEntryFeeAmount) {
        window.network.send({
            message: 'gameSelection/respondToInvitation',
            content: {
                accept                   : accept,
                multiplayerGameInstanceId: id
            }
        });
    }else {
        window.notification.confirm(e.game_creditNotSufficient, e.game_wantToChargeYourAccount, e.game_yesNo, (button) => {
            if (Number(button) !== 2) {
                callback();
            }
        })
    }
}

export const inviteUsersToGame = ({ gameId, usersIds, currency, amount, numberOfQuestions }) => () => {
    window.network.send({
         message: 'gameSelection/inviteUsersToGame',
         content: {
             customGameConfig: {
                 gameId,
                 entryFeeAmount: amount,
                 entryFeeCurrency: currency,
                 numberOfQuestions   //DON'T WORK
             },
             usersIds
         }
    })
}

// todo: method clone inviteUsersToGame
export const inviteUsersToGameOnlyId = (gameId, usersIds) => () => {
    window.network.send({
         message: 'gameSelection/inviteUsersToGame',
         content: {
             customGameConfig: {
                 gameId
             },
             usersIds
         }
    })
}

export const createPublicGame = (customObj) => () => {
    window.network.send({
         message: 'gameSelection/createPublicGame',
         content: {
             customGameConfig: customObj
         }
    })
}

export const joinMultiplayerGame = (accept, id) => () => {

    window.network.send({
         message: 'gameSelection/joinMultiplayerGame',
         content: {
            multiplayerGameInstanceId: id
         }
    })
}

export const getMultiplayerGameResults = (gameInstanceId) => (dispatch, getState) => {
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

export const getPoolList = (offset = 0) => () => {
    window.network.send({
        message: 'question/poolList',
        content: {
            limit: 20,
            offset,
            orderBy: [{
                field: "id",
                direction: "asc"
            }],
            searchBy: {}
        }
    })
}

export const receivedRespondToInvitation = (data) => (dispatch) => {
    if(!data.error){
        if(data.content.gameInstanceId){
            dispatch(setGameInstanseId(data.content.gameInstanceId))
            dispatch(startGame())
        }else{
            dispatch(unselectInvitation())
            dispatch(removeInvitations())
            dispatch(getInvitations('OTHERS', ['INVITED', 'DELETED', 'CALCULATED']))
        }
    }
}

export const receivedMultiplayerResults = (data) => (dispatch) => {
    dispatch(setMultiplayerResults(data.content))
}

export const receivedInvitationsList = (data) => (dispatch) => {
    if(!data.error && data.content.items){
        dispatch(addInvitations(data.content.items))
    }
}

export const receivedcompletedDuelsList = (data) => (dispatch) => {
    if(!data.error){
        dispatch(setCompletedDuels(data.content))
    }
}

export const receivedInviteUsersToGame = (data) => (dispatch) => {
    if(!data.error){
        if(data.content.gameInstanceId){
            dispatch(setGameInstanseId(data.content.gameInstanceId));
            dispatch(startGame(data.content.multiplayerGameInstanceId))
        }
    } else {
        window.notification.alert(data.error.type, data.error.message, 'Ok', () => {})
    }
}

export const receivedPublicGames = (data) => (dispatch) => {
    if(data.content){
        dispatch(setPublicGames(data.content))
    }
}

export const receivedPoolList = (data) => (dispatch) => {
    dispatch(setPoolList(data.content));
}

export const initDuelCreation = () => (dispatch) => {
    dispatch(getGameList('DUEL'))
    dispatch(getFriends());
    dispatch(setGameInfo());
    dispatch(getBalance());
}

export const initInvitations = () => (dispatch) => {
    dispatch(getPoolList());
}

// selectors
export const userInvitesSelector = (invites, userId, userLang) => {
    const userInvites = [];

    invites.forEach((item) => {
        if (
            item.creator.userId === userId ||
            item.gameInstance.status === 'COMPLETED' ||
            item.status === 'DELETED'
        ) return false;

        userInvites.push(item);
    });

    return filterInvitationsByRegion(userInvites, userLang);
}

export const friendsInvitesSelector = (invites, userId) => {
    const friendsIvites = []

    invites.forEach((item) => {
        if(
            item.creator.userId === userId
            && item.game.type === 'DUEL'
            // && item.status !== 'DELETED'
        ){
            friendsIvites.push(item);
        }
    })

    return friendsIvites
}

export const publicDuelSelector = (publicGames, userLang) => {
    const publicDuel = Array.isArray(publicGames) ? publicGames.filter(
        (publicGame) => (
            publicGame.game.type === "DUEL"
        )
    ) : [];

    return filterInvitationsByRegion(publicDuel, userLang);
}

export const playerWorldGamesSelector = (games, userId) => {
    const playerWorldGames = []
    games.forEach((item) => {
        if(item.creator.userId === userId ){
            playerWorldGames.push(item)
        }
    })

    return playerWorldGames
}

export const getSelectedInvitation = (invitations, invitationId) => {
    let invitation = null;
    invitations.forEach((item) => {
        if(item && item.multiplayerGameInstanceId === invitationId){
            invitation = item
        }
    })
    return invitation
}

export const getCreatedPublicGames = (invitations, userId) => {
    let createdPublicGames = []

    invitations.forEach((item) => {
        if(item.creator.userId === userId){
            createdPublicGames.push(item)
        }
    })

    return createdPublicGames
}

export const worldGamesSelector = (invites, userId) => {
    // const worldGamesSelector = []
    // invite.forEach((item) => {
    //     if(item.creator.userId === userId){
    //
    //     }
    // })
}

export const startDuel = (callback) => (dispatch, getState) => {
	const state        = getState();
	const game         = state.game.game;
	const trainingMode = false;

    if(game) {
        const {
                  numberOfQuestions,
                  entryFeeCurrency,
                  entryFeeAmount,
                  gameId
              } = game;
    
        const gameConfig = { trainingMode, gameId, numberOfQuestions, entryFeeCurrency, entryFeeAmount };

        localStorage.setItem('lastGameOptions', JSON.stringify(gameConfig));
        localStorage.setItem('lastGame', JSON.stringify(game));
    }

    if(getState().duelgame.duelGameType === 'public'){
        dispatch(joinMultiplayerGame(true, getState().duelgame.selectedInvitation))
    }else{
        dispatch(respondToInvitation(true, getState().duelgame.selectedInvitation, callback))
    }
}

export const createDuel = ({gameId, usersIds, numberOfQuestions, entryFeeCurrency, entryFeeAmount}) => (dispatch, getState) => {
	const state = getState();
    const game = state.game.game;
    const trainingMode  = false;
	const currency = entryFeeCurrency || game.entryFeeCurrency;

    if(game) {
        const { gameId } = game;
        const gameConfig = { trainingMode, gameId, numberOfQuestions, entryFeeCurrency, entryFeeAmount };

        localStorage.setItem('lastGameOptions', JSON.stringify(gameConfig));
        localStorage.setItem('lastGame', JSON.stringify(game));
    }

	if (currency === 'MONEY' && entryFeeAmount > 0) {
		const { birthDate }  = state.profile.person;
		const cleanBirthDate = (new Date(birthDate.split(/[T]/igm).slice(0, 1))).getFullYear();
		const now            = (new Date()).getFullYear();
		const difference     = now - cleanBirthDate;

		if (difference < 18) {
			window.notification.alert(e.game_Attention, e.game_youMustBeOlderThen18ToPlayThisGame, 'Ok', () => {});
			return false;
		}
	}

	const customObj = {
    	gameId : (gameId || game.gameId),
		numberOfQuestions: game.numberOfQuestions || 3,
		usersIds
    };

	if(game.entryFeeDecidedByPlayer && entryFeeAmount > 0) {
		if(entryFeeCurrency)  customObj.currency  = entryFeeCurrency;
		if(entryFeeAmount)    customObj.amount    = entryFeeAmount;
		customObj.numberOfQuestions = numberOfQuestions ? numberOfQuestions : game.numberOfQuestions;
	}

    dispatch(inviteUsersToGame(customObj));
}

export const createPublicDuel = ({gameId, numberOfQuestions, entryFeeCurrency, entryFeeAmount}) => (dispatch, getState) => {
    const state = getState();
    const game = state.game.game;
    const currency = entryFeeCurrency || game.entryFeeCurrency;

	if (currency === 'MONEY' && entryFeeAmount > 0) {
		const { birthDate }  = state.profile.person;
		const cleanBirthDate = (new Date(birthDate.split(/[T]/igm).slice(0, 1))).getFullYear();
		const now            = (new Date()).getFullYear();
		const difference     = now - cleanBirthDate;

		if (difference < 18) {
			window.notification.alert(e.game_Attention, e.game_youMustBeOlderThen18ToPlayThisGame, 'Ok', () => {});
			return false;
		}
	}

    if(game) {
        const gameConfig = { trainingMode: false, gameId, numberOfQuestions, entryFeeCurrency, entryFeeAmount };
    
        localStorage.setItem('lastGameOptions', JSON.stringify(gameConfig));
        localStorage.setItem('lastGame', JSON.stringify(game));
    }

    const customObj = {
	    gameId : (gameId || game.gameId),
	    numberOfQuestions : numberOfQuestions > 3 ? numberOfQuestions : 3
    };

	if(game.entryFeeDecidedByPlayer) {
		if(entryFeeCurrency)  customObj.entryFeeCurrency  = entryFeeCurrency;
		if(entryFeeAmount)    customObj.entryFeeAmount    = entryFeeAmount;
	}

	dispatch(setNumberOfQuestions(customObj.numberOfQuestions));
    dispatch(createPublicGame(customObj));
}

export const filterGamesByLanguage = (gameList = [], language) => {
    return gameList.filter(game => {
        if (language === 'en') {
            return game.playingRegions.indexOf('GB') !== -1
        }
        return game.playingRegions.indexOf(language.toUpperCase()) !== -1
    })
}

export const filterComplitedDuel = (duels = [], userId) => {
    return duels.filter(completedDuel =>
        completedDuel.isMultiplayerGameFinished
        && ['win', 'lose', 'tie'].indexOf(completedDuel.gameOutcome) > -1
        // && (completedDuel.inviter.userId === userId || (completedDuel.opponents[0] && completedDuel.opponents[0].userId === userId))
    )
}

export const filterInvitationsByRegion = (invites, userLangs) => {
	if(!invites.length) return invites;

	return invites.filter(item => item.playingRegions && item.playingRegions[0] === userLangs.toUpperCase());
}