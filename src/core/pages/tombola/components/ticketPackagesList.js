import React from 'react'
import e from '../../../../langs';
import {withRouter} from 'react-router-dom'
import url from '../../../../constants/urlConstants'

import {
    TicketPackagesListWrapper
} from './styledComponents'

import TicketPackage from './ticketPackage'

class TicketPackagesList extends React.Component {

    buyTickets = (bundle, id) => {
        window.notification.confirm(
            e.formatString(e.tombola_tickets, bundle.amount),
            e.formatString(e.tombola_doYouWantToExchangeForTickets, bundle.price, bundle.currency),
            e.tombola_okCancel,
            (button) => {
                if (Number(button) !== 2) {
                    this.props.tombolaBuy(id, bundle, (err) => {
                        if(err) {
                            window.notification.confirm(e.root_attention, e.root_youNeedToBeRegisteredToGetHere, e.game_yesNo, (button) => {
                                if (Number(button) !== 2) {
                                    this.props.history.push(url.home.index)
                                }
                            })
                        }
                    });
                }
        });
    };

    render() {
        const {bundles = [], id} = this.props;

        return (
            <TicketPackagesListWrapper>
                {
                    bundles.map((bundle, index) => (
                        <TicketPackage
                            key={'bundle_' + bundle.amount}
                            onClickHandle={bundle.isEnabled ? this.buyTickets.bind(this, bundle, id) : null}
                            isEnabled={bundle.isEnabled}
                            price={bundle.price}
                            amount={bundle.amount}
                            currency={bundle.currency}
                            index={index + 1}
                        />
                    ))
                }
            </TicketPackagesListWrapper>
        )
    }
}

export default withRouter(TicketPackagesList);
