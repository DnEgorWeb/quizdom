import React from 'react'
import { connect } from 'react-redux'
import Messenger from './components'
import {initMessenger, removeMessage} from './duck'
const MessengerContainer = props => <Messenger {...props} />

const mapStateToProps = store => {
	return {
		messageList: store.messenger.readMessages.reverse()
	}
}

export default connect(mapStateToProps, {
	initMessenger,
	removeMessage
})(MessengerContainer)
