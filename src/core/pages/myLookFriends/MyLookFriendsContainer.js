import React from 'react'
import { connect } from 'react-redux'

import MyLookFriends from './components'

const MyLookFriendsContainer = props => <MyLookFriends {...props} />

const mapStateToProps = store => {
	const {person, stats, settings, address, userId} = store.profile;
	const {configuration} = store.app.application;
	const {cdnMedia} = configuration;
	const profileURL = `${cdnMedia}profile/${userId}.jpg`;
    const language = store.profile && store.profile.settings && store.profile.settings.languageId

	return {
		firstName: person.firstName,
		lastName: person.lastName,
		nickname: person.nickname,
		level: stats.gameLevel,
		showFullName: settings.showFullName,
		country: address.country || '',
		profileURL,
		language
	}
}

export default connect(mapStateToProps, {

})(MyLookFriendsContainer)
