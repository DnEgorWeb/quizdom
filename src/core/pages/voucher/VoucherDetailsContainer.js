import React from 'react'
import { connect } from 'react-redux'
import convertIdToURL from '../../../services/convertIdToURL'
import VoucherDetails from './components/voucherDetails'
const VoucherDetailsContainer = props => <VoucherDetails {...props} />

const mapStateToProps = store => {
	const {cdnMedia} = store.app.application.configuration;
	const {currentVoucher} = store.voucher;
	const voucherImgUrl = convertIdToURL(cdnMedia, 'voucher', currentVoucher.normalImageId);
    const language = store.profile && store.profile.settings && store.profile.settings.languageId
    
    return {
		currentVoucher,
		voucherImgUrl,
		language
	}
}

export default connect(mapStateToProps, {})(VoucherDetailsContainer)
