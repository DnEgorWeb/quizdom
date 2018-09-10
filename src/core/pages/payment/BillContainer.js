import React from 'react'
import { connect } from 'react-redux'
import {initBill} from './duck'
import Bill from './components/bill'
const BillContainer = props => <Bill {...props} />

const mapStateToProps = store => {
    const language = store.profile && store.profile.settings && store.profile.settings.languageId
	const {billList, endUserPDFUrlList} = store.payment;

	return {
		billList: billList,
		endUserPDFUrlList,
		language
	}
}

export default connect(mapStateToProps, {
	initBill
})(BillContainer)
