import e from '../../../langs';
const SET_CONTACT_LIST = "SET_CONTACT_LIST";

const initialState = {
	contactList: []
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_CONTACT_LIST: {
			return {
				...state,
				contactList: action.payload
			}
		}
		default: {
			return state;
		}
	}
}

export const getContactList = (options = {}) => (dispatch, getState) => {
	const token = getState().app.token

	window.network.send({
		message: 'friend/contactList',
		content: {
			...options
		},
		token: token
	})
}

export const setContactList = (msg) => (dispatch) => {
	dispatch({
		type: SET_CONTACT_LIST,
		payload: msg.content.items
	})
}

export const sendInviteResponse = (options = {}) => () => {
	const {email, text} = options;

	window.network.send({
		message: 'friend/contactInviteNew',
		content: {
			invitationText: text,
			invitee:        {
				email
			}
		}
	})
}

export const setcontactInviteNewResponse = (msg) => {
	const {content} = msg;
	if (content) {
		window.notification.alert(e.invite_attention, e.invite_success, e.invite_ok, () => {})
	} else {
		window.notification.alert(e.invite_error, e.invite_thisEmailAddressAlreadyExists, e.invite_ok, () => {})
	}
}

export const initInviteFriends = () => (dispatch) => {
	dispatch(getContactList({
		hasInvitation: true,
		hasProfile: true,
		includeProfileInfo: true,
		limit: 20,
		offset: 0,
		searchTerm: ''
	}))
}

export const contactRemoveInvitation = (contactIds) => (dispatch, getState) => {
	const token = getState().app.token
	window.network.send({
		message: 'friend/contactRemoveInvitation',
		content: {
			contactIds
		},
		token:   token
	})
}
