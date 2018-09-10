import React from 'react'
import { connect } from 'react-redux'
import {initBonus} from './duck'
import Bonus from './components/bonus'
const BonusContainer = props => <Bonus {...props} />

const mapStateToProps = store => {
	const {balance, exchangeRates} = store.payment;
    const language = store.profile && store.profile.settings && store.profile.settings.languageId

	return {
		bonus: balance.bonus,
		exchangeRates,
        language
	}
}

export default connect(mapStateToProps, {
	initBonus
})(BonusContainer)
