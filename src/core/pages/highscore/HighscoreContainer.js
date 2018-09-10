import React from 'react'
import HighScore from './components'
import {getFriends, getLeaderboard, getPlayerPosition} from './duck'
import { connect } from 'react-redux'

const HighscoreContainer = props => <HighScore {...props} />

const mapStateToProps = store => {
    const { firstName, lastName, nickname } = store.profile.person
    const { address, userId, handicap } = store.profile
    const {showFullName} = store.profile.settings
    const {configuration} = store.app.application
    const {cdnMedia} = configuration
    const {friends, allPlayers, playerPosition} = store.highscore
    const language = store.profile && store.profile.settings && store.profile.settings.languageId
    return {
        cdnMedia,
        allPlayers,
        playerPosition,
        showFullName,
        friends,
        language,
        user: {
            name: `${firstName} ${lastName}`,
            image: `/profile/${userId}.jpg`,
            firstName,
            lastName,
            nickname,
            address: {
                city: address.city,
                country: address.country || '',
            },
            userId,
            gameLevel: handicap
        }
    }
}

export default connect(mapStateToProps, {
    getFriends, getLeaderboard, getPlayerPosition
})(HighscoreContainer)