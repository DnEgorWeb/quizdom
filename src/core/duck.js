import { setRoles } from './models/profile/duck'

const SET_APP_CONFIGURATION = 'SET_APP_CONFIGURATION'
const SET_INITIAL_APP_DATA = 'SET_INITIAL_APP_DATA'
const SET_SESSION_TOKEN = 'SET_SESSION_TOKEN'
const SET_LANG = 'SET_LANG'


export default function reducer (state = {language: 'de'}, action){
    switch(action.type){

        case SET_APP_CONFIGURATION:
            return {
                ...state,
                ...action.data
            }
        case SET_INITIAL_APP_DATA:
            return {
                ...state,
                token: action.token,
                isFirstStart: action.isFirstStart,
                lastStartDate: action.lastStartDate
            }
        case SET_SESSION_TOKEN:
            return {
                ...state,
                token: action.token
            }
        case SET_LANG:
            return {
                ...state,
                language: action.language
            }
        default:
            return state;
    }
}

export const setAppConfiguration = (appConfiguration) => {
    return {
        type: SET_APP_CONFIGURATION,
        data: appConfiguration ? appConfiguration.appConfig : null
    }
}

export const setInitialAppData = (token, lastStartDate) => {
    return {
        type: SET_INITIAL_APP_DATA,
        token: token,
        isFirstStart: !lastStartDate, // because if there is no last start date it's 100% first start
        lastStartDate: lastStartDate
    }
}

export const setSessionToken = (data) => {
    return {
        type: SET_SESSION_TOKEN,
        token: data
    }
}

export const setLang = (data) => {
    return {
        type: SET_LANG,
        language: data
    }
}

export const updateRoles = (data) => dispatch => {
    const roles = window.tokenDecoder(data).roles
    localStorage.setItem('roles', JSON.stringify(roles));
    dispatch(setRoles(roles))
}

export const updateSessionToken = (data) => dispatch => {
    localStorage.setItem('sessionToken', data);
    dispatch(updateRoles(data))
    dispatch(setSessionToken(data))
}
