import React from 'react'
import {connect} from 'react-redux'
import InviteFriends from './components'
import {initInviteFriends, contactRemoveInvitation, sendInviteResponse} from './duck'

const InviteFriendsContainer = props => <InviteFriends {...props} />

const mapStateToProps = (store) => {
    const language = store.profile && store.profile.settings && store.profile.settings.languageId

	return {
		contactList: store.inviteFriends.contactList,
		userId: store.profile.userId,
        language
	}
}

export default connect(mapStateToProps, {
	initInviteFriends,
	contactRemoveInvitation,
    sendInviteResponse
})(InviteFriendsContainer)
