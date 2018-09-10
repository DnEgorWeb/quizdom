import React from 'react'
import { connect } from 'react-redux'
import {
    initMoney, setCurrentDeposite, initIdentification, getCurrencySymbol, initExternalPayment,
    setLastPaymentService, initServices
} from './duck'
import Money from './components/money'
const MoneyContainer = props => {
    return (
        <Money {...props} />
	)
}

const mapStateToProps = store => {
    const language = store.profile && store.profile.settings && store.profile.settings.languageId
    const {balance, externalPayment, lastPaymentService} = store.payment;
	return {
		money: balance.money,
		currency: getCurrencySymbol('EUR'),
		isUserFullRegistered: store.profile.isUserFullRegistered,
        language,
        currentDeposite: store.payment.currentDeposite,
        externalPayment,
        lastPaymentService,
	}
}

export default connect(mapStateToProps, {
	initMoney,
	setCurrentDeposite: (currentDeposite) => (dispatch) => {
		dispatch(setCurrentDeposite(currentDeposite))
	},
	initIdentification: () => (dispatch) => {
		dispatch(initIdentification());
	},
    initExternalPayment,
    initServices,
    setLastPaymentService,
})(MoneyContainer)
