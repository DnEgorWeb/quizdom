import React from 'react'
import HighScore from './components'
import {getFriends, getGlobalHighscore} from './duck'
import { connect } from 'react-redux'

const HighscoreContainer = props => <HighScore {...props} />

const mapStateToProps = store => {
    const { firstName, lastName, nickname } = store.profile.person
    const { address, userId, handicap } = store.profile
    const {showFullName} = store.profile.settings
    const {configuration} = store.app.application
    const {cdnMedia} = configuration
    const {friends = []} = store.tournamentHighscore
    const globalHighscore = store.tournament.tournamentResults.items
    const {money} = store.payment.balance
    const {jackpotWinning = 0} = store.results.singleplayerResults
    return {
        cdnMedia,
        showFullName,
        friends,
        globalHighscore,
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
        },
        userWinningMoney: jackpotWinning,
        money
    }
}

export default connect(mapStateToProps, {
    getFriends, getGlobalHighscore
})(HighscoreContainer)