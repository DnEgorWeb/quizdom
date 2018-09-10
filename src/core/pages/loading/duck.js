import { setAppConfiguration, setInitialAppData } from '../../duck'
import { setToken, setProfile, setLoggedIn } from '../../models/profile/duck'
import { getProfile, setRoles } from '../../models/profile/duck'
import {getTournamentGames} from "../game/gameTypes/tournament/duck";

const INCREASE_LOADING_PERCENT = 'INCREASE_LOADING_PERCENT'

export default function reducer (state = {loadingPercent: 0}, action){
    switch(action.type){
        case INCREASE_LOADING_PERCENT:
            return {
                loadingPercent: state.loadingPercent + 1
            }
        default:
            return state;
    }
}

export const increaseLoadingPercent = () => {
    return {
        type: INCREASE_LOADING_PERCENT
    }
}

export const initApp = () => dispatch => {
    const token = localStorage.getItem("sessionToken")
    const roles = localStorage.getItem("roles")
    if(roles){
        dispatch(setRoles(JSON.parse(roles)))
    }
    const lastStartDate = localStorage.getItem("lastStartDate")

    localStorage.setItem('lastStartDate', new Date().toLocaleString());

    dispatch(setInitialAppData(token, lastStartDate, roles));
}

export const getAppConfiguration = (token) => (dispatch, getState) => {
    if(!token){
        token = getState().app.token
    }
    window.network.send({
         message: 'profile/getAppConfiguration',
         content: {
            appId: window.config.appInitialConfig.APP_ID,
            deviceUUID: window.config.appInitialConfig.DEVICE_UUID,
            tenantId: window.config.appInitialConfig.TENANT_ID
        },
        token: token
    })
}

export const registerAnonymous = () => () => {
    window.network.send({ message: 'auth/registerAnonymous', content: null })
}

export const loadApp = () => (dispatch, getState) => {
    const sessionToken = getState().app.token
    if(sessionToken){
        dispatch(increaseLoadingPercent())
        dispatch(getProfile())
        dispatch(getAppConfiguration())
    }else{
        dispatch(registerAnonymous())
    }
}

export const receivedAppConfiguration = (data) => (dispatch) => {
    dispatch(setAppConfiguration(data.content))
    dispatch(increaseLoadingPercent())
    dispatch(getProfile())
}

export const receivedRegisterAnonymous = (data) => (dispatch) => {
    if(data.content){
        localStorage.setItem('sessionToken', data.content.token);
        dispatch(setToken(data.content.token))
        dispatch(increaseLoadingPercent())
        dispatch(getAppConfiguration(data.content.token))
    }else{
        window.showAlert && window.showAlert('Server Error', 'There are server error', 'Retry', () => dispatch(registerAnonymous()))
    }
}

export const receivedProfileGet = (data) => (dispatch) => {
    dispatch(setProfile(data.content ? data.content.profile : null))
    if(data.content && data.content.profile && data.content.profile.email){
        dispatch(setLoggedIn())
        // const user = data.content.profile;
        // localStorage.setItem('user', JSON.stringify(user));
    }
    dispatch(increaseLoadingPercent())
    dispatch(getTournamentGames());
}
