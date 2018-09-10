import e from '../../../langs';
import { getProfile } from '../../models/profile/duck'
const SET_REDIRECTION_FLAG = 'SET_REDIRECTION_FLAG'
const REMOVE_REDIRECTION_FLAG = 'REMOVE_REDIRECTION_FLAG'

export default function reducer(state = {}, action){
    switch(action.type){
        case SET_REDIRECTION_FLAG:
            return {
                ...state,
                redirection: true
            }
        case REMOVE_REDIRECTION_FLAG:
            return {
                ...state,
                redirection: false
            }
        default:
            return state
    }
}

export const setRedirectionFlag = () => {
    return {
        type: SET_REDIRECTION_FLAG
    }
}

export const removeRedirectionFlag = () => {
    return {
        type: REMOVE_REDIRECTION_FLAG
    }
}

export const changePassword = (data) => (dispatch) => {
    window.network.send({
         message: 'auth/changePassword',
         content: data || null
    })
}

export const receiveChangePassword = (data) => (dispatch) => {
    if(!data.error){
        window.notification.alert(e.mydata_attention, e.mydata_passwordChangeSuccessful, e.mydata_ok, () => {})
        dispatch(getProfile())
        dispatch(setRedirectionFlag())
    }else if(data.error.message === 'ERR_AUTH_SECRET_WRONG'){
        window.notification.alert(e.mydata_attention, e.mydata_oldPasswordIsWrong, e.mydata_ok, () => {})
    }
}

export const profileUpdateCallback = (data) => (dispatch) => {
    if(!data.error){
        dispatch(getProfile())
        window.notification.alert(e.mydata_attention, e.mydata_profileUpdateSuccessful, e.mydata_ok, () => {})
    }else{
        window.notification.alert(e.mydata_attention, e.mydata_errorUpdatingProfile, e.mydata_ok, () => {})
    }
}

export const nicknameUpdateCallback = (data) => (dispatch) => {
    if(!data.error){
        dispatch(getProfile())
        dispatch(setRedirectionFlag())
        window.notification.alert(e.mydata_attention, e.mydata_nicknameUpdateSuccessful, e.mydata_ok, () => {})
    }else{
        window.notification.alert(e.mydata_attention, e.mydata_nicknameAlreadyExists, e.mydata_ok, () => {})
    }
}
