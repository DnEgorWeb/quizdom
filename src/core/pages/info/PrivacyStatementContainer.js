import React from 'react'
import { connect } from 'react-redux'
import PrivacyStatement from './components/privacyStatement'

const PrivacyStatementContainer = props => <PrivacyStatement {...props} />

const mapStateToProps = store => {
	return {
		privacyStatement: store.app.friendsForMedia.privacyStatement
	}
}

export default connect(
	mapStateToProps
)(PrivacyStatementContainer)
