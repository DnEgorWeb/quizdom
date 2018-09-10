import React from 'react';
import { Switch, Route} from 'react-router-dom';
import url from '../../../constants/urlConstants'

import VoucherContainer from './VoucherContainer'
import MyVoucherContainer from './MyVoucherContainer'
import VoucherDetailsContainer from './VoucherDetailsContainer'

const VoucherRoot = () => (
	<Switch>
		<Route path={url.voucher.my} component={MyVoucherContainer} />
		<Route path={url.voucher.details} component={VoucherDetailsContainer} />
		<Route path={url.voucher.index} component={VoucherContainer} />
	</Switch>
)

export default VoucherRoot;
