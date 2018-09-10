import React from 'react'
import { connect } from 'react-redux'
import {initServices, getCurrencySymbol, initExternalPayment, setLastPaymentService} from './duck'
import Services from './components/services'
const ServicesContainer = props => <Services {...props} />

const mapStateToProps = store => {
    const language = store.profile && store.profile.settings && store.profile.settings.languageId
	const {balance, externalPayment, lastPaymentService} = store.payment;
	return {
		money: balance.money,
		currentDeposite: store.payment.currentDeposite,
		currency: getCurrencySymbol("EUR"),
		externalPayment,
		lastPaymentService,
		language
	}
}

export default connect(mapStateToProps, {
	initServices,
	initExternalPayment,
	setLastPaymentService,
})(ServicesContainer)
