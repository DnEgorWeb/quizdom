	import { getProfile } from '../../models/profile/duck'
import { getBalance } from '../../pages/payment/duck'
import {getTournamentGames} from "../game/gameTypes/tournament/duck";

const TOGGLE_DASHBOARD_SIDE_MENU = 'TOGGLE_DASHBOARD_SIDE_MENU';
const SET_DASHBOARD = 'SET_DASHBOARD'

export default function reducer (state, action){
	if(!state){
		state = {
			isSideMenuOpened: false,
			dashboard: {}
		}
	}
	switch(action.type){
		case SET_DASHBOARD:
            return{
                ...state,
                ...action.data
            }
		case TOGGLE_DASHBOARD_SIDE_MENU: {
			return {
				...state,
				isSideMenuOpened: !state.isSideMenuOpened
			}
		}

		default:
			return state;
	}
}

export const setDashboard = (data) => {
    return {
        type: SET_DASHBOARD,
        data: data
    }
}


export const toggleSideMenu = () => dispatch => {
	dispatch(getProfile());
	dispatch({type: TOGGLE_DASHBOARD_SIDE_MENU});
}

export const getDashboard = () => () => {
	window.network.send({
         message: 'gameSelection/getDashboard',
         content: {
			QUIZ24: true,
			DUEL: true,
			TOURNAMENT: true,
			USER_TOURNAMENT: true,
			LIVE_TOURNAMENT: true,
			USER_LIVE_TOURNAMENT: true,
			QUIZ_BATTLE: true
        },
    })
}

export const initDashboard = () => (dispatch) => {
	dispatch(getDashboard());
	dispatch(getBalance());
	dispatch(getTournamentGames());
}

export const receivedDashboard = (data) => (dispatch) => {
    dispatch(setDashboard(data.content))
}
