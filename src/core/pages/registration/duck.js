import e from '../../../langs';
import { getProfile } from '../../models/profile/duck'
import { loginFacebook } from '../login/duck.js'
import { updateSessionToken } from '../../duck'

const SET_REGISTER_TOKEN = 'SET_REGISTER_TOKEN'
const SET_CONFIRM_EMAIL = 'SET_CONFIRM_EMAIL'
const RESET_REGISTRATION = 'RESET_REGISTRATION'
const SAVE_REGISTRATION_PARAMS = 'SAVE_REGISTRATION_PARAMS'

export default function reducer(state = {}, action){
    switch(action.type){
        case SET_REGISTER_TOKEN:
            return {
                ...state,
                registrationToken: action.token
            }
        case SET_CONFIRM_EMAIL:
            return {
                ...state,
                confirmEmail: true
            }
        case RESET_REGISTRATION:
            return {
                ...state,
                confirmEmail: false,
                registrationToken: action.token
            }
        case SAVE_REGISTRATION_PARAMS:
            return {
                ...state,
                registrationParams: action.payload
            }
        default:
            return state;
    }
}


export const setConfirmEmail = () => {
    return {
        type: SET_CONFIRM_EMAIL
    }
}

export const setRegisterToken = (data) => {
    return {
        type: SET_REGISTER_TOKEN,
        token: data
    }
}

export const resetRegistration = (data) => {
    return {
        type: RESET_REGISTRATION,
    }
}

export const registerEmail = (email, password) => () => {
    window.network.send({
         message: 'auth/registerEmail',
         content: {
            email: email,
            password: password
        },
    })
}

export const resendEmailRegistrationCode = (token, email) => () => {
    window.network.send({
         message: 'auth/registerEmailNewCode',
         content: {
            email: email,
            token: token
        },
    })
}

export const profileUpdate = () => () => {
    window.network.send({
         message: 'profile/ProfileUpdate',
         content: null
    })
}

export const makeFacebookRegisterRequest = (data) => () => {
    window.network.send({
         message: 'auth/registerFacebook',
         content: {
             facebookToken: data
         }
    })
}

export const submitCode = (code, email) => () => {
    window.network.send({
         message: 'auth/confirmEmail',
         content: {
            email: email,
            code: code
        },
    })
}



export const setNickname = (data) => () => {
    window.network.send({
         message: 'profile/profileUpdate',
         content: {
            profile: {
                person: {
                    nickname: data
                }
            }
        },
    })
}

export const receivedRegisterToken = (data) => (dispatch) => {
    if(data.error && data.error.message === 'ERR_AUTH_ALREADY_REGISTERED'){
        window.notification.alert(e.reg_attention, e.reg_eMailAlreadyUsed, e.reg_ok, () => {})
    }else{
        window.notification.alert(e.reg_congratulation, e.reg_YouSucessfullRegisteredConfCodeWhatSendOnYourEmail, e.reg_ok, () => {})
        dispatch(setRegisterToken(data.content ? data.content.token : null))
    }
}

export const receivedSubmitCode = (data) => dispatch => {
    if(data.error && data.error.message === 'ERR_CODE_NOT_VALID'){
        window.notification.alert(e.reg_attention, e.reg_wrongCode, e.reg_ok, () => {})
    }else{
        window.notification.alert(e.reg_congratulation, e.reg_2000bonusPointsIsYours, e.reg_ok, () => {})
        dispatch(updateSessionToken(data.content ? data.content.token : null))
        dispatch(setConfirmEmail())
    }
}

export const setNicknameCallback = data => dispatch => {
    if(data.error && data.error.message === 'ERR_ENTRY_ALREADY_EXISTS'){
        window.notification.alert(e.reg_attention, e.reg_nicknameAlreadyExists, e.reg_ok, () => {})
    }else{
        window.notification.alert(e.reg_congratulation, e.reg_youRegisteredSuccessfully, e.reg_ok, () => {})
        dispatch(getProfile())
    }
}

export const receivedResendRegistrationCode = data => dispatch => {
    dispatch(setRegisterToken(data.content ? data.content.token : null))
}

export const receivedFacebookRegister = data => (dispatch, getState) => {
    if(data.error){
        dispatch(loginFacebook(getState().profile.facebookToken))
    }else{
        dispatch(updateSessionToken(data.content ? data.content.token : null))
        dispatch(getProfile())
        // dispatch(setLoggedIn())
    }
}

export const resetRegistrationToken = () => (dispatch) => {
	dispatch(resetRegistration());
}

export const saveRegistrationParams = (params) => (dispatch) => {
    dispatch({
        type: SAVE_REGISTRATION_PARAMS,
        payload: params
    })
}
