import e                      from '../../../langs';
import { getProfile }         from '../../models/profile/duck.js'
import { updateSessionToken } from '../../duck'

const TOGGLE_ENTER_CODE_FORM     = 'SHOW_ENTER_CODE_FORM';
const TOGGLE_ENTER_PASSWORD_FORM = 'SHOW_ENTER_PASSWORD_FORM';
const RESET_LOGIN                = 'RESET_LOGIN';
const SET_CODE                   = 'SET_CODE';
const SET_RECOVER_EMAIL          = 'SET_RECOVER_EMAIL';
const RESET_ENTER_PASSWORD_FORM  = 'RESET_ENTER_PASSWORD_FORM';
const RESET_LOGIN_DATA           = 'RESET_LOGIN_DATA';

export default function reducer(state = {}, action){
    switch(action.type){
        case RESET_ENTER_PASSWORD_FORM:
            return {
                ...state,
                showEnterCodeForm: false,
                showEnterPasswordForm: false
            }
        case TOGGLE_ENTER_CODE_FORM:
            return {
                ...state,
                showEnterCodeForm: true,
                showEnterPasswordForm: false
            }
        case SET_CODE:
            return {
                ...state,
                code: action.data
            }
        case TOGGLE_ENTER_PASSWORD_FORM:
            return {
                ...state,
                showEnterCodeForm: false,
                showEnterPasswordForm: true
            }
        case RESET_LOGIN:
            return {}
        case SET_RECOVER_EMAIL:
            return {
                ...state,
                email: action.data
            }
        case RESET_LOGIN_DATA:
            return {
	            ...state,
	            showEnterCodeForm    : false,
	            showEnterPasswordForm: false
            }
        default:
            return state
    }
}

export const resetLoginData = () => {
    return {
        type: RESET_LOGIN_DATA
    }
}

export const resetLogin = () => {
    return {
        type: RESET_LOGIN
    }
}

export const toggleEnterCodeForm = () => {
    return {
        type: TOGGLE_ENTER_CODE_FORM
    }
}

export const resetEnterCodeForm = () => {
    return {
        type: RESET_ENTER_PASSWORD_FORM
    }
}

export const toggleEnterPasswordForm = () => {
	return {
        type: TOGGLE_ENTER_PASSWORD_FORM
    }
}

export const setCode = (data) => {
    return {
        type: SET_CODE,
        data: data
    }
}

export const setRecoverEmail = (data) => {
    return {
        type: SET_RECOVER_EMAIL,
        data: data
    }
}

export const loginEmail = (email, password) => () => {
    window.network.send({
         message: 'auth/authEmail',
         content: {
            email: email,
            password: password
        },
    })
}

export const loginFacebook = (data)  => {
    window.network.send({
         message: 'auth/authFacebook',
         content: {
             facebookToken: data
         }
    })
}

export const setNewPassword = (data) => (dispatch, getState) => {
    window.network.send({
         message: 'auth/recoverPasswordConfirmEmail',
         content: {
            email: getState().login.email,
            code: getState().login.code,
            newPassword: data
        },
    })
}

export const recoverPassword = (email) => dispatch => {
    dispatch(setRecoverEmail(email))
    window.network.send({
         message: 'auth/recoverPasswordEmail',
         content: {
            email: email,
        },
    })
}

export const submitCode = (data) => dispatch => {
    dispatch(setCode(data))
    dispatch(toggleEnterPasswordForm())
}


export const receivedLoginEmail = (data) => (dispatch) => {
    if(data.error){
        window.notification.alert(e.login_attention, e.login_wrongLoginOrPassword, e.login_ok, () => {})
    }else{
        dispatch(updateSessionToken(data.content ? data.content.token : null))
        dispatch(getProfile())
    }
}

export const receivedRecoverPassword = (data) => dispatch => {
    if(data.error && (data.error.message === 'ERR_AUTH_NO_REGISTERED' ||  data.error.message === 'ERR_AUTH_SECRET_WRONG')){
        window.notification.alert(e.login_attention, e.login_eMailNotFound, e.login_ok, () => {})
    }else{
        dispatch(toggleEnterCodeForm())
    }
}

export const receivedSetNewPassword = (data) => (dispatch, getState) => {
    if(data.error){
        window.notification.alert(e.login_attention, e.login_wrongCode, e.login_ok, () => {})
        dispatch(resetEnterCodeForm())
    }else{
        window.notification.alert(e.login_attention, e.login_passwordSetSuccessful, e.login_ok, () => {})
        dispatch(updateSessionToken(data.content ? data.content.token : null))
        dispatch(getProfile())
    }
}

export const receivedLoginFacebook = (data) => (dispatch) => {
    if(data.error){

    }else{
        dispatch(updateSessionToken(data.content ? data.content.token : null))
        dispatch(getProfile())
    }
}
