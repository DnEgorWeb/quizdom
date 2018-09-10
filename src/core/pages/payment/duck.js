import {getProfile} from '../../models/profile/duck'

const SET_BALANCE = "SET_BALANCE";
const SET_CURRENT_DEPOSITE = "SET_CURRENT_DEPOSITE";
const SET_IDENTIFICATION = "SET_IDENTIFICATION";
const SET_EXTERNAL_PAYMENT = "SET_EXTERNAL_PAYMENT";
const SET_EXCHANGE_RATES = "SET_EXCHANGE_RATES";
const SET_USER_ACCOUNT_HISTORY = "SET_USER_ACCOUNT_HISTORY";
const SET_INIT_IDENTIFICATION = "SET_INIT_IDENTIFICATION";
const SET_CONVERT_BETWEEN_CURRENCIE = "SET_CONVERT_BETWEEN_CURRENCIE";
const SET_BILL_LIST = "SET_BILL_LIST";
const SET_END_USER_PDF_URL_LIST = "SET_END_USER_PDF_URL_LIST";
const SET_LAST_PAYMENT_SETRVICE = "SET_LAST_PAYMENT_SETRVICE";

const initialState = {
	balance: {
		money: 0,
		credit: 0,
		bonus: 0,
	},
	currentDeposite: 0,
	userAccountHistory: [],
	billList: [],
	endUserPDFUrlList: [],
	lastPaymentService: JSON.parse(window.localStorage.getItem('lastPaymentService')),
}

export default function reducer (state = initialState, action){
	switch(action.type){
		case SET_BALANCE: {
			const balances = action.payload;
			let money = 0, bonus = 0, credit = 0;
			balances && balances.forEach(balance => {
				const {currency} = balance;
				switch (currency) {
					case "MONEY": money = balance.amount; break;
					case "BONUS": bonus = balance.amount; break;
					case "CREDIT": credit = balance.amount; break;
					default:
				}
			})
			return {
				...state,
				balance: {money, bonus, credit}
			}
		}

		case SET_CURRENT_DEPOSITE: {
			return {
				...state,
				currentDeposite: action.payload,
			}
		}

		case SET_IDENTIFICATION: {
			return {
				...state,
				identificationModel: action.payload,
			}
		}

		case SET_EXTERNAL_PAYMENT: {
			return {
				...state,
				externalPayment: action.payload,
			}
		}

		case SET_EXCHANGE_RATES: {
			return {
				...state,
				exchangeRates: action.payload,
			}
		}

		case SET_USER_ACCOUNT_HISTORY: {
			return {
				...state,
				userAccountHistory: action.payload,
			}
		}

		case SET_INIT_IDENTIFICATION: {
			return {
				...state,
				initIdentification: action.payload,
			}
		}

		case SET_CONVERT_BETWEEN_CURRENCIE: {
			return {
				...state,
				convertBetweenCurrencie: action.payload,
			}
		}

		case SET_BILL_LIST: {
			return {
				...state,
				billList: action.payload
			}
		}

		case SET_END_USER_PDF_URL_LIST: {
			return {
				...state,
				endUserPDFUrlList: action.payload.items.map(item => item.cdnPdfUrl)
			}
		}

		case SET_LAST_PAYMENT_SETRVICE: {
			return {
				...state,
				lastPaymentService: action.payload
			}
		}

		default:
			return state;
	}
}

export const getBalance = () => (dispatch, getState) => {
	const token = getState().app.token
	window.network.send({
		message: 'payment/getUserAccountBalances',
		content: {},
		token: token || null,
	})
}

export const getIdentification = () => (dispatch, getState) => {
	const token = getState().app.token
	window.network.send({
		message: 'payment/getIdentification',
		content: {},
		token: token || null,
	})
}

export const setBalance = (msg) => (dispatch) => {
	if (msg.content) {
        dispatch({
            type: SET_BALANCE,
            payload: msg.content.balances
        })
	}
}

export const getExchangeRates = () => (dispatch, getState) => {
	const token = getState().app.token
	window.network.send({
		message: 'payment/getExchangeRates',
		content: {},
		token: token || null,
	})
}

export const getUserAccountHistory = (currency = "CREDIT") => (dispatch, getState) => {
	const token = getState().app.token
	window.network.send({
		message: 'payment/getUserAccountHistory',
		content: {
			currency,
		},
		token: token || null,
	})
}

export const setUserAccountHistory = (msg) => (dispatch) => {
	dispatch({
		type: SET_USER_ACCOUNT_HISTORY,
		payload: msg.content.items
	})
}

export const convertBetweenCurrencies = (fromCurrency, toCurrency, amount) => (dispatch, getState) => {
	const token = getState().app.token
	window.network.send({
		message: 'payment/convertBetweenCurrencies',
		content: {
			fromCurrency,
			toCurrency,
			amount,
			description: "Convert between currencies"
		},
		token: token || null,
	})
}

export const initIdentification = (method = "POSTIDENT") => (dispatch, getState) => {
	const token = getState().app.token
	window.network.send({
		message: 'payment/initIdentification',
		content: {
			method
		},
		token: token || null,
	})
}

export const setInitIdentification = (msg) => (dispatch) => {
	dispatch({
		type: SET_INIT_IDENTIFICATION,
		payload: msg.content
	})
}

export const setConvertBetweenCurrencies = (msg) => (dispatch) => {
	dispatch({
		type: SET_CONVERT_BETWEEN_CURRENCIE,
		payload: msg.content
	})
}

export const setExchangeRates = (msg) => (dispatch) => {
	dispatch({
		type: SET_EXCHANGE_RATES,
		payload: msg.content.exchangeRates
	})
}

export const setIdentification = (msg) => {
	return {
		type: SET_IDENTIFICATION,
		payload: msg.content.identificationModel
	}
}

export const setCurrentDeposite = (currentDeposite) => (dispatch) => {
	dispatch({
		type: SET_CURRENT_DEPOSITE,
		payload: currentDeposite
	})
}

export const initExternalPayment = (content = {}) => () => {
	window.network.send({
		message: 'payment/initExternalPayment',
		content: {...content,}
	})
}

export const setExternalPayment = (msg) => {
	return {
		type: SET_EXTERNAL_PAYMENT,
		payload: msg.content
	}
}

export const getCurrencySymbol = (currency) => {
	const mapCurrToSymbol = {
		"CREDIT": "CR",
		"BONUS": "BP",
		"USD": "$",
		"EUR": "€"
	}
	return mapCurrToSymbol[currency];
}

export const initPayment = () => (dispatch) => {
	dispatch(getBalance());
	dispatch(getProfile());
}

export const initMoney = () => (dispatch) => {
	dispatch(getBalance());
	dispatch(getProfile());
}

export const initBonus = () => (dispatch) => {
	dispatch(getBalance());
	dispatch(getExchangeRates());
}

export const initPayout = () => (dispatch) => {
	dispatch(getBalance());
	dispatch(getExchangeRates());
}

export const initServices = () => (getState, dispatch) => {
	dispatch(getBalance());
	dispatch(getProfile());
	//const {currentDeposite} = getState().payment;
	//const contentResponse = {
	//	amount: currentDeposite,
	//	currency: "MONEY",
	//	description: "Paying into account",
	//	redirectUrlError: '/payment/services',
	//	redirectUrlSuccess: '/payment/services'
	//}
	//dispatch(initExternalPayment({
	//	amount: getState().payment.currentDeposite,
	//	currency: "MONEY",
	//	description: "Paying into account",
	//	redirectUrlError: '/payment/services',
	//	redirectUrlSuccess: '/payment/services'
	//}));
}

export const initHistory = () => (dispatch) => {
	dispatch(getUserAccountHistory());
}

export const initCredit = () => (dispatch) => {
	dispatch(getBalance());
	dispatch(getProfile());
	dispatch(getExchangeRates());
}

export const getPaymentResourceBillOfMaterialList = () => () => {
	window.network.send({
		message: 'billing/paymentResourceBillOfMaterialList',
		content: {
			limit: 100,
			offset: 0,
			orderBy: [{
				field: 'id',
				direction: 'asc'
			}]
		}
	})
}

export const setPaymentResourceBillOfMaterialList = (msg) => (dispatch) => {
	dispatch({
		type: SET_BILL_LIST,
		payload: msg.content.items
	})
}

export const initBill = () => (dispatch) => {
	dispatch(getPaymentResourceBillOfMaterialList());
	dispatch(getEndUserPDFUrlList());
}

export const getEndUserPDFUrlList = () => () => {
	window.network.send({
		message: 'profile/endConsumerInvoiceList',
		content: {
			limit: 100,
			offset: 0,
			orderBy: [{
				field: 'id',
				direction: 'asc'
			}]
		}
	})
}

export const setEndUserPDFUrlList = (msg) => (dispatch) => {
	dispatch({
		type: SET_END_USER_PDF_URL_LIST,
		payload: msg.content
	});
}

export const setLastPaymentService = (service) => (dispatch) => {

	window.localStorage.setItem('lastPaymentService', JSON.stringify(service));
	dispatch({
		type: SET_LAST_PAYMENT_SETRVICE,
		payload: service
	})
}
