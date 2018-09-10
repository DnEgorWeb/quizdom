import {getBalance} from '../payment/duck'
import {getProfile} from '../../models/profile/duck'
import e            from "../../../langs";
const initialState = []

const SET_VOUCHER_LIST = "SET_VOUCHER_LIST";
const SET_USER_VOUCHER_LIST = "SET_USER_VOUCHER_LIST";
const SETT_VOUCHER_PURCHASE_RESPONSE = "SETT_VOUCHER_PURCHASE_RESPONSE";
const SET_CURRENT_VOUCHER = "SET_CURRENT_VOUCHER";

export default function reducer (state = initialState, action){
	switch(action.type){
		case SET_VOUCHER_LIST: {
			return {
				...state,
				voucherList: action.payload,
			}
		}

		case SETT_VOUCHER_PURCHASE_RESPONSE: {
			return {
				...state,
				voucherPurchaseResponse: action.payload
			}
		}

		case SET_CURRENT_VOUCHER: {
			return {
				...state,
				currentVoucher: action.payload
			}
		}

		case SET_USER_VOUCHER_LIST: {
			return {
				...state,
				userVoucherList: action.payload
			}
		}

		default:
			return state;
	}
}

export const setCurrentVoucher = (voucher) => (dispatch) => {
	dispatch({
		type: SET_CURRENT_VOUCHER,
		payload: voucher
	})
}

export const setVoucherList = (msg) => {
	return {
		type: SET_VOUCHER_LIST,
		payload: msg.content.items
	}
}

export const getVoucherList = () => (dispatch, getState) => {
	const token = getState().app.token
	window.network.send({
		message: 'voucher/voucherList',
		content: {
			limit: 100,
			offset: 0,
			orderBy: [{
				field: 'id',
				direction: 'asc'
			}]
		},
		token: token || null,
	})
}

export const getUserVoucherList = () => (dispatch, getState) => {
	const token = getState().app.token
	window.network.send({
		message: 'voucher/userVoucherList',
		content: {
			limit: 100,
			offset: 0,
			orderBy: [{
				field: 'id',
				direction: 'asc'
			}]
		},
		token: token || null,
	})
}

export const setUserVoucherList = (msg) => {
	return {
		type: SET_USER_VOUCHER_LIST,
		payload: msg.content.items
	}
}

export const removeVoucher = (userVoucherId) => (dispatch, getState) => {
	const token = getState().app.token
	window.network.send({
		message: 'voucher/userVoucherUse',
		content: {
			userVoucherId: userVoucherId
		},
		token: token || null,
	})
}

export const initVoucher = () => (dispatch) => {
	dispatch(getVoucherList());
	dispatch(getBalance());
	dispatch(getProfile());
}

export const initMyVoucher = () => (dispatch) => {
	dispatch(getUserVoucherList())
}

export const voucherPurchase = (id) => (dispatch, getState) => {
	const token = getState().app.token
	window.network.send({
		message: 'voucher/voucherPurchase',
		content: {
			voucherId: id
		},
		token: token || null,
	})
}

export const setVoucherPurchaseResponse = (data) => (dispatch) => {
	// Временно убрано, пока бэкенд на все запросы возвращает FATAL_ERROR!
	// Обязательно вернуть нижеследующее после фикса на бэке, иначе никакой проверки нет!

	// if (!data.error) {
	// 	dispatch(getBalance());
	// 	window.notification.alert(
	// 		e.voucher_attention,
	// 		e.voucher_transactionSuccessful,
	// 		e.voucher_okCancel,
	// 		() => {}
	// 	)
	// } else {
	// 	window.notification.alert(
	// 		e.voucher_attention,
	// 		e.voucher_pleaseCheckYourNetworkConnection,
	// 		e.voucher_okCancel,
	// 		() => {}
	// 	)
	// }

	// Удалить нижеследующее после фикса!
    dispatch(getBalance());
    window.notification.alert(
        e.voucher_attention,
        e.voucher_transactionSuccessful,
        e.voucher_okCancel,
        () => {}
    )
	// До этой строки
}

export const getVoucher = (id) => (dispatch, getState) => {
    const token = getState().app.token;
    window.network.send({
        message: 'voucher/voucherGet',
        content: {
            voucherId: id
        },
        token: token || null,
    })
}
