import React from 'react';
import { Switch, Route} from 'react-router-dom';
import url from '../../../constants/urlConstants'

import PaymentContainer from './PaymentContainer'
import BillContainer from './BillContainer'
import HistoryContainer from './HistoryContainer'
import MoneyContainer from './MoneyContainer'
import PayoutContainer from './PayoutContainer'
import CreditContainer from './CreditContainer'
import BonusContainer from './BonusContainer'
import CreditsMobile from './components/creditsMobile'

const formatAmount = (amount) => parseFloat(amount).toFixed(2).replace('.',',')

const formatBonuses = (bonuses) => `${String(bonuses).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`

const PaymentRoot = () => (
	<Switch>
		<Route path={url.payment.money}><MoneyContainer formatAmount={formatAmount} /></Route>
		<Route path={url.payment.payout}><PayoutContainer formatAmount={formatAmount} /></Route>
		<Route path={url.payment.credit}><CreditContainer formatAmount={formatAmount} formatBonuses={formatBonuses} /></Route>
		<Route path={url.payment.creditMobile}><CreditsMobile/></Route>
		<Route path={url.payment.topCreditMobile}><CreditContainer formatAmount={formatAmount} formatBonuses={formatBonuses} /></Route>
		<Route path={url.payment.bonus}><BonusContainer formatBonuses={formatBonuses} /></Route>
		<Route path={url.payment.bill} component={BillContainer} />
        <Route path={url.payment.history}><HistoryContainer formatAmount={formatAmount} /></Route>
		<Route path={url.payment.index}><PaymentContainer formatAmount={formatAmount} formatBonuses={formatBonuses} /></Route>
	</Switch>
)

export default PaymentRoot;
