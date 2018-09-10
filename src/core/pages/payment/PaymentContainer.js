import React from 'react'
import { connect } from 'react-redux'
import {initPayment, getCurrencySymbol} from './duck'
import Payment from './components/payment'
import PaymentMobile from './components/paymentMobile'

// there is a platform-check below, mobile phones use different component
const PaymentContainer = props => window.cordova ? <PaymentMobile {...props} /> : <Payment {...props} />

const mapStateToProps = store => {
    const language = store.profile && store.profile.settings && store.profile.settings.languageId
    const {person} = store.profile
	const {balance} = store.payment
    const roles = JSON.parse(localStorage.getItem('roles'))
    let isFullyRegistered = false

    roles.forEach(item => {
        if (item === "FULLY_REGISTERED") {
            isFullyRegistered = true
        }
    })

	return {
		money: balance.money,
		bonus: balance.bonus,
		credit: balance.credit,
		currency: getCurrencySymbol('EUR'),
        isFullyRegistered,
        language,
        user: person
	}
}

export default connect(mapStateToProps, {
	initPayment
})(PaymentContainer)
