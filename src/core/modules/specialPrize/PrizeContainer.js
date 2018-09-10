import React from 'react'
import { connect } from 'react-redux'

import Prize from './index'

const ResultsContainer = (props) => <Prize {...props} />

const mapStateToProps = (store) => {
    const {currentVoucher} = store.voucher
    const {configuration} = store.app.application;
    const {cdnMedia} = configuration;
    return {
        voucher: currentVoucher,
        cdnMedia: cdnMedia
    }
}

export default connect(mapStateToProps, null)(ResultsContainer)