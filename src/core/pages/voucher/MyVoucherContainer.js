import React from 'react'
import { connect } from 'react-redux'
import MyVoucher from './components/myVouchers'
import {initMyVoucher, removeVoucher, setCurrentVoucher} from './duck'
import convertIdToURL from '../../../services/convertIdToURL'
const MyVoucherContainer = props => <MyVoucher {...props} />

const mapStateToProps = store => {
    const language = store.profile && store.profile.settings && store.profile.settings.languageId
    
    return {
		myVoucherList: store.voucher.userVoucherList,
		cdnMedia: store.app.application.configuration.cdnMedia,
		language
	}
}

export default connect(mapStateToProps, {
	initMyVoucher,
	removeVoucher,
	setCurrentVoucher,
	convertIdToURL
})(MyVoucherContainer)
