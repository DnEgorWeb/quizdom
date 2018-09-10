import React from 'react'
import { connect } from 'react-redux'
import {initCredit, setCurrentDeposite, convertBetweenCurrencies} from './duck'
import Credit from './components/credits'
import TopCreditsMobile from './components/topCreditsMobile'

const CreditContainer = props => window.cordova ? <TopCreditsMobile {...props}/> : <Credit {...props} />

const mapStateToProps = store => {
	const {balance, exchangeRates} = store.payment;
    const language = store.profile && store.profile.settings && store.profile.settings.languageId

	return {
		credit: balance.credit,
		money: balance.money,
		bonus: balance.bonus,
		exchangeRates,
        language
	}
}

export default connect(mapStateToProps, {
	initCredit,
	convertBetweenCurrencies,
	setCurrentDeposite,
})(CreditContainer)
