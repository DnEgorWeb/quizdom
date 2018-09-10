import {setGameInstanseId, startGame} from '../../../../models/gameEngine/duck'
import moment                         from "moment/moment";
import e                              from "../../../../../langs";

const SET_TOURNAMENT_RESULT = 'SET_TOURNAMENT_RESULT'

export default function tournamentReducer(state, action) {
    const defaultState = {
        tournamentResults: {}
    }

    if(!state){
        state = defaultState
    }

    switch (action.type) {
        case SET_TOURNAMENT_RESULT:
            return {
                ...state,
                tournamentResults: action.data
            }

        default:
            return state
    }
}

export const setTournamentResult = (data) => {
    return{
        type: SET_TOURNAMENT_RESULT,
        data: data
    }
}

export const getTournamentGames = () => (dispatch, getState) => {
	// const languageId = getState().profile.settings.languageId.toUpperCase();

	window.network.send({
		message: 'gameSelection/publicGameList',
		content: {
			gameType: "TOURNAMENT",
			limit: 100,
            // todo: с параметром список турниров не риходит
            // playingRegions: [languageId]
		}
	})
}

export const joinMultiplayerGame = (multiplayerGameInstanceId) => () => {
	window.network.send({
		message: 'gameSelection/joinMultiplayerGame',
		content: {
			multiplayerGameInstanceId,
		}
	})
}

// установка состояний для турниров осуществляется в duel/duck. Временно
export const getCompletedTournaments = () => (dispatch) => {
    const date = moment().format('YYYY-MM-DDTHH:mm:ss')
    window.network.send({
        message: 'resultEngine/completedGameList',
        content: {
            dateFrom: "2018-01-01T00:00:00Z",
            dateTo: date + "Z",
            gameTypes: ["TOURNAMENT"],
            limit: 99,
            offset: 0
        }
    })
}

export const getTournamentResults = (id) => (dispatch) => {
    window.network.send({
        message: 'resultEngine/multiplayerResultsGlobalList',
        content: {
            amongAllHandicapRanges: true,
			gameInstanceId: id,
			offset: 0,
            limit: 20
        }
    })
}

export const onJoinMultiplayerGameResponse = (data) => (dispatch, getState) => {
	console.warn(28, 'onJoinMultiplayerGameResponse --->', data)

	const state = getState();
	const game = state.game.game;
	const {currency, entryFeeAmount} = game;

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

	if (data.content && data.content.gameInstanceId) {
		dispatch(setGameInstanseId(data.content.gameInstanceId))
		dispatch(startGame())
	}
}

export const receivedTournamentResults = (data) => (dispatch) => {
	dispatch(setTournamentResult(data.content))
}

export const getTournamentListFromDuelOrTournamentGames = (list) => {
    const result  =[];

    if(list.items) {
        list.items.forEach(item => {
            if( item.gameType === "TOURNAMENT") result.push(item);
        });
    }

    return result;
}
