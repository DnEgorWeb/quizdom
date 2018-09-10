import {getBalance} from '../payment/duck'
import e            from '../../../langs';
import moment       from "moment/moment";

const SET_TOMBOLA_LIST              = "SET_TOMBOLA_LIST";
const SET_CURRENT_PURCHASED_TICKETS = "SET_CURRENT_PURCHASED_TICKETS";
const SET_USER_TOMBOLA              = 'SET_USER_TOMBOLA';
const SET_USER_TOMBOLA_LIST         = 'SET_USER_TOMBOLA_LIST';

export default function reducer (state = {}, action) {
    switch (action.type) {
        case SET_TOMBOLA_LIST: {
            return {
                ...state,
                tombolaList: action.payload
            }
        }
        case SET_CURRENT_PURCHASED_TICKETS: {
            return {
                ...state,
                currentPurchasedTickets: action.payload
            }
        }
        case SET_USER_TOMBOLA: {
            return {
                ...state,
                userTombola: action.payload
            }
        }
        case SET_USER_TOMBOLA_LIST: {
            return {
                ...state,
                userTombolaList: action.payload
            }
        }
        default: {
            return state
        }
    }
}

export const setTombolaList = (data) => {
    return {
        type: SET_TOMBOLA_LIST,
        payload: data
    }
}

export const setCurrentPurchasedTickets = (bundle) => {
    return {
        type: SET_CURRENT_PURCHASED_TICKETS,
        payload: bundle
    }
}

export const setUserTombola = (userTombola) => {
    return {
        type   : SET_USER_TOMBOLA,
        payload: userTombola
    }
}

export const setUserTombolaList = (userTombolaList) => {
    return {
        type   : SET_USER_TOMBOLA_LIST,
        payload: userTombolaList
    }
}

export const getUserTombola = (tombolaId) => () => {
    window.network.send({
        message: 'tombola/userTombolaGet',
        content: {
            tombolaId
        },
    })
}

export const receiveUserTombola = (msg) => (dispatch) => {
    if (!msg.error) {
        dispatch(setUserTombola(msg.content && msg.content.tombola));
    } else {
        // if dev
        if(window.config.appInitialConfig.APP_ID === '37') console.error(msg.error.message);
    }
}

export const receiveUserTombolaList = (msg) => (dispatch) => {
    if (!msg.error) {
        dispatch(setUserTombolaList(msg.content && msg.content.tombola));
    } else {
        // if dev
        if(window.config.appInitialConfig.APP_ID === '37') console.error(msg.error.message);
    }
}

export const getTombolaList = () => () => {
    window.network.send({
        message: 'tombola/tombolaList',
        content: {
            limit: 20,
            offset: 0,
            orderBy: [
                {
                    field: 'id',
                    direction: 'asc'
                }
            ],
            searchBy: {},
        },
    })
}

export const getUserTombolaList = () => () => {
    const date = moment().format('YYYY-MM-DDTHH:mm:ss');

    window.network.send({
        message: 'tombola/userTombolaList',
        content: {
            dateFrom      : "2018-01-01T00:00:00Z",
            dateTo        : `${date}Z`,
            pendingDrawing: false,
            limit         : 99,
            offset        : 0
        },
    })
}

export const tombolaBuy = (tombolaId, bundle, errorCallBack) => (dispatch, getState) => {
    const tickets = bundle.amount;
	const { profile: { roles = [], userId } } = getState();

    window.tombola = {id: tombolaId, userId};

    dispatch(setCurrentPurchasedTickets(bundle));

	if(roles.length && roles.includes('FULLY_REGISTERED')) {
		if(!tombolaId) console.error(`Error: tombolaId: ${tombolaId}`);

		window.network.send({
			message: 'tombola/tombolaBuy',
			content: {
				tombolaId,
				tickets
			},
		});
	} else {
		errorCallBack('REGISTRATION_FAILED');
	}
}

export const receiveTombolaList = (msg) => (dispatch) => {
    dispatch(setTombolaList(msg.content && msg.content.items))
}

export const initTombola = () => (dispatch) => {
    dispatch(getTombolaList());
    dispatch(getBalance());
}

export const receiveAnswerAfterTombolaBuy = (msg) => (dispatch, getState) => {
    const {error} = msg;
    const { profile: { userId } } = getState();

    if (error) {
        switch (error.message) {
            case "ERR_NO_LONGER_AVAILABLE": {
                window.notification.alert(e.mydata_error, e.mydata_youWantToBuyAnUnacceptableNumberOfTickets, e.mydata_ok, () => {})
                break;
            }
            default: {
                const {currency} = getState().tombola.currentPurchasedTickets;
                window.notification.alert(e.mydata_error, e.formatString(e.mydata_notEnoughJustPlayAndCollectCurrency, currency), e.mydata_ok, () => {})
            }
        }

    } else {
        const {amount} = getState().tombola.currentPurchasedTickets;
        window.notification.alert(e.mydata_success, e.formatString(e.mydata_ticketsWereBoughtGoodLuck, amount), e.mydata_ok, () => {})
        dispatch(initTombola());

        const tombola = window.tombola;

        if(tombola && userId === tombola.userId) {
        	dispatch(getUserTombola(tombola.id));
        } else {
	        console.log(`userId = ${userId}`);
	        console.log(`tombola.userId = ${tombola.userId}`);
	        console.log(`userId === tombola.userId: ${userId === tombola.userId}`);
        }
        delete window.tombola;
    }
}