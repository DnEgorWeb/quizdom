import increaseLoadingPercent from '../../pages/loading/duck'
import { setNicknameCallback } from '../../pages/registration/duck'
import { profileUpdateCallback, nicknameUpdateCallback } from '../../pages/myData/duck'
import { updateSessionToken } from '../../duck'

const SET_SESSION_TOKEN = 'SET_SESSION_TOKEN'
const SET_PROFILE = 'SET_PROFILE'
const SET_LOGGED_IN = 'SET_LOGGED_IN'
const SET_LOGGED_OUT = 'SET_LOGGED_OUT'
const SET_FACEBOOK_TOKEN = 'SET_FACEBOOK_TOKEN'
const SET_UPDATE_PROFILE_KEY = 'SET_UPDATE_PROFILE_KEY'
const SET_ROLES ='SET_ROLES'
const TOGGLE_SOUND = 'TOGGLE_SOUND'

export default function reducer(state, action){

    let sound = true
    if ("sound" in localStorage) {
        sound = JSON.parse(localStorage.getItem('sound'))
    }

    let defaultState = {
        loggedIn: false,
        settings: {
            languageId: "de",
            sound: sound
        },
    }

    if(!state){
        state = defaultState
    }

    switch(action.type){
        case SET_ROLES:
            return {
                ...state,
                roles: action.data
            }
        case SET_SESSION_TOKEN:
            return {
                ...state,
                token: action.token,
            }
        case SET_PROFILE:
            let settings = action.data ? {...action.data.settings} : {}
	        const userId = action.data ? action.data.userId : null;
            return {
				...state,
				...action.data,
				settings: {
				    languageId: state.settings.languageId,
				    sound: state.settings.sound,
				    ...settings
				},
				isUserFullRegistered: !!action.data && !!action.data.email,
				userId
            }
        case SET_LOGGED_IN:
            return {
                ...state,
                loggedIn: true
            }
        case SET_LOGGED_OUT:
            return {
                ...defaultState
            }
        case SET_FACEBOOK_TOKEN:
            return {
                ...state,
                facebookToken: action.data
            }
        case SET_UPDATE_PROFILE_KEY:
            return {
                ...state,
                updateProfileKey: action.data
            }
        case TOGGLE_SOUND:
            return{
                ...state,
                settings: {
                    ...state.settings,
                    sound: !state.settings.sound,
                }
            }
        default:
            return state;
    }
}

export const setLoggedIn = () => {
    return {
        type: SET_LOGGED_IN
    }
}

export const setLoggedOut = () => {
    return {
        type: SET_LOGGED_OUT
    }
}

export const setUpdateProfileKey = (data) => {
    return {
        type: SET_UPDATE_PROFILE_KEY,
        data: data
    }
}

export const setProfile = (profile) => {
    return {
        type: SET_PROFILE,
        data: profile
    }
}

export const setToken = (token) => {
    return {
        type: SET_SESSION_TOKEN,
        token: token
    }
}

export const setFacebookToken = (token) => {
    return {
        type: SET_FACEBOOK_TOKEN,
        data: token
    }
}

export const setRoles = (data) => {
    return {
        type: SET_ROLES,
        data: data
    }
}

export const toggleSound = () => {
    return {
        type: TOGGLE_SOUND
    }
}

export const getProfile = () => (dispatch, getState) => {
    const token = getState().profile.token
    window.network.send({
         message: 'profile/profileGet',
         content: {},
         token: token || null
    })
}

export const updateProfile = (data, key) => (dispatch) => {
    dispatch(setUpdateProfileKey(key))
    window.network.send({
         message: 'profile/profileUpdate',
         content: data || null
    })
}

export const updateToken = () => (dispatch, getState) => {
    window.network.send({
         message: 'auth/refresh',
         content: {
             token: getState().app.token
         }
    })
}

export const receiveProfileGet = (data) => (dispatch) => {
    dispatch(setProfile(data.content ? data.content.profile : null))
    if(data.content && data.content.profile && data.content.profile.email){
        dispatch(setLoggedIn())
    }
    // :)
    dispatch(increaseLoadingPercent())
}

export const receivedRefresh = (data) => (dispatch) =>{
    dispatch(updateSessionToken(data.content.token))
}

export const receiveUpdateProfile = (data) => (dispatch, getState) => {
    const key = getState().profile.updateProfileKey
    dispatch(setUpdateProfileKey(''))
    switch(key){
        case 'setNickname':
            dispatch(setNicknameCallback(data))
            break;
        case 'setProfileData':
            dispatch(profileUpdateCallback(data))
            break;
        case 'changeNickname':
            dispatch(nicknameUpdateCallback(data))
            break;
        default:
            dispatch(getProfile())
    }
    dispatch(updateToken())
}
