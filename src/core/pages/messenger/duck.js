import {getNewGroups} from '../groups/duck'

const getMessagesFromLocalStorage = (type) => {
    return JSON.parse(window.localStorage.getItem(type)) || [];
}


const initialState = {
	readMessages: getMessagesFromLocalStorage('read') || [],
	unreadMessages: getMessagesFromLocalStorage('unread') || []
}

const UPDATE_READ_MESSAGES = "UPDATE_READ_MESSAGES";
const ADD_TO_UNREAD_MESSAGES = "ADD_TO_UNREAD_MESSAGES";
const SET_READ_MESSAGES = "SET_READ_MESSAGES";

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case UPDATE_READ_MESSAGES: {
			const unreadMessages = getMessagesFromLocalStorage('unread')
			const readMessages = getMessagesFromLocalStorage('read');
			const updatedReadMessages = readMessages.concat(unreadMessages);
			removeMessagesFromLocalStorage('unread');
			setMessagesToLocalStorage('read', updatedReadMessages);
			return {
				...state,
				readMessages: updatedReadMessages,
				unreadMessages: []
			}
		}
		case ADD_TO_UNREAD_MESSAGES: {
			const unreadMessage = action.payload;
			unreadMessage.date = new Date();
			const oldUnreadMessages = getMessagesFromLocalStorage('unread');
			const allUnreadMessages = oldUnreadMessages.concat(unreadMessage)
			addMessagesToLocalStorage('unread', allUnreadMessages);
			return {
				...state,
				unreadMessages: allUnreadMessages
			}
		}
		case SET_READ_MESSAGES: {
			setMessagesToLocalStorage('read', action.payload);
			return {
				...state,
				readMessages: action.payload
			}
		}
		default: {
			return state
		}
	}
}

export const getUnreadMessages = () => (dispatch, getState) => {
	window.network.send({
		message: 'userMessage/listUnreadWebsocketMessages',
		content: {
			userId: getState().profile.userId,
			deviceUUID: ""
		}
	})
}

export const addToUnreadMessages = (msg) => (dispatch) => {
	dispatch({
		type: ADD_TO_UNREAD_MESSAGES,
		payload: msg.content
	});
	dispatch(getNewGroups());
}

export const updateReadMessages = () => {
	return {
		type: UPDATE_READ_MESSAGES
	}
}

export const initMessenger = () => (dispatch) => {
	dispatch(updateReadMessages());
}

const setMessagesToLocalStorage = (type, messages) => {
	window.localStorage.setItem(type, JSON.stringify(messages));
}

const addMessagesToLocalStorage = (type, messages) => {
	const messagesInLocalStorage =  JSON.parse(window.localStorage.getItem(type)) || [];
	messages.forEach(message => {
		if (messagesInLocalStorage.every(messageInLS => messageInLS.messageId !== message.messageId)) {
			window.localStorage.setItem(type, JSON.stringify(messagesInLocalStorage.concat(message)));
		}
	})

}

const removeMessagesFromLocalStorage = (type) => {
	window.localStorage.setItem(type, JSON.stringify([]));
}
export const setMessageList = (messages) => {
	return {
		type: SET_READ_MESSAGES,
		payload: messages
	}
}

export const removeMessage = (id) => (dispatch, getState) => {
	const messageList = getState().messenger.readMessages;
	const newMessageList = messageList.filter(message => message.messageId !== id );
	dispatch(setMessageList(newMessageList))
}
