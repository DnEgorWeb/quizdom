import React from 'react'
import { connect } from 'react-redux'
import convertIdToURL from '../../../services/convertIdToURL'
import Voucher from './components'
import {initVoucher, voucherPurchase} from './duck'
const VoucherContainer = props => <Voucher {...props} />

const mapStateToProps = store => {
    const language = store.profile && store.profile.settings && store.profile.settings.languageId
    
    return {
		voucherList: store.voucher.voucherList,
		cdnMedia: store.app.application.configuration.cdnMedia,
		bonus: store.payment.balance.bonus,
		language
	}
}

export default connect(mapStateToProps, {
	initVoucher,
	voucherPurchase,
	convertIdToURL,
})(VoucherContainer)
