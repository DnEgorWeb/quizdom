import React from 'react'
import { connect } from 'react-redux'
import {initPayout, getCurrencySymbol, initExternalPayment} from './duck'
import Payout from './components/payOut'
const PayoutContainer = props => <Payout {...props} />

const mapStateToProps = store => {
	const {balance, initIdentification} = store.payment;
	const {person} = store.profile;
    const language = store.profile && store.profile.settings && store.profile.settings.languageId

	return {
		money: balance.money,
		currency: getCurrencySymbol("EUR"),
		initIdentification,
		person,
		language
	}
}

export default connect(mapStateToProps, {
	initPayout,
	initExternalPayment
})(PayoutContainer)
