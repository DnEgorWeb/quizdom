import React from 'react'
import { connect } from 'react-redux'
import {initHistory} from './duck'
import History from './components/history'
const HistoryContainer = props => <History {...props} />

const mapStateToProps = store => {
	const {userAccountHistory} = store.payment;
    const language = store.profile && store.profile.settings && store.profile.settings.languageId
	
	return {
		userAccountHistory: userAccountHistory,
        language
	}
}

export default connect(mapStateToProps, {
	initHistory
})(HistoryContainer)
