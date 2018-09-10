import React from 'react'
import e from '../../../../langs'
import moment from "moment/moment";

import {
    TombolaWrapper,
} from './styledComponents'

import TopBar             from '../../../modules/components/TopBar'
import AccountBalanceBar  from '../../../modules/components/AccountBalanceBar'
import TombolaList        from './tombolaList'
import ChancePanel        from './chancePanel'
import TicketPackagesList from './ticketPackagesList'
import InfoPanel          from './infoPanel'

class Tombola extends React.Component {
    constructor(props) {
        super(props);
        this.props.initTombola();
        e.setLanguage(props.language);
    }

    state = {
        currentTombola: 0,
        isInfoPanelOpened: false,
        userTombola: {}
    }

    timers = []
    
    componentDidMount() {
        const {tombolaList} = this.props;
        if (tombolaList) {
            tombolaList.forEach(tombola => {
                if (tombola.endDate) {
                    const timeDifference = moment(tombola.endDate).unix() - moment().unix();
                    if (timeDifference >= 0) {
                        this.timers.push(
                            setTimeout(() => {
                                this.props.initTombola();
                            }, (timeDifference + 4 * 60) * 1000)
                        );
                    }
                }
            })
        }
    }

    componentWillUnmount() {
        this.timers.forEach(timer => clearTimeout(timer));
    }

    componentWillReceiveProps(nextProps) {
        const {tombolaList = [], userTombola} = nextProps;
        let { currentTombola } = this.state;

        if (currentTombola >= tombolaList.length) {
            currentTombola = 0;
        }

        this.setState({ currentTombola, userTombola });

        const tombolaId = this.props.tombolaList && this.props.tombolaList[currentTombola].id;
        if(!userTombola) this.props.getUserTombola(tombolaId);

        e.setLanguage(nextProps.language)
    }

    beforeSlide = (oldSlide, newSlide) => {
        const tombolaId = this.props.tombolaList[newSlide].id;

        this.props.getUserTombola(tombolaId);
        this.setState({currentTombola: newSlide})
    }

    toggleInfoPanel = () => {
        this.setState(({isInfoPanelOpened}) => ({isInfoPanelOpened: !isInfoPanelOpened}))
    }

    getEnableBundles = () => {
        const {currentTombola} = this.state;
        const {tombolaList = [], /*balance = 0*/} = this.props;
        const bundles = tombolaList[currentTombola] && tombolaList[currentTombola].bundles;

        bundles && bundles.forEach(bundle => {
            // const tombola = tombolaList[currentTombola]
            // const remain = tombola.totalTicketsAmount - tombola.purchasedTicketsAmount;
            bundle.isEnabled = true; // bundle.amount <= remain && balance > bundle.price;
        });
        return bundles;
    }

    render() {
        const {currentTombola, isInfoPanelOpened, userTombola} = this.state;
        const {tombolaList = [], balance, cdnMedia, tombolaBuy} = this.props;
        const bundles = this.getEnableBundles();
        const description = tombolaList[currentTombola] && tombolaList[currentTombola].description;
        const id = tombolaList[currentTombola] && tombolaList[currentTombola].id;

        return (
            <TombolaWrapper>
                <TopBar caption={e.tombola_tombola}/>
                <AccountBalanceBar
                    balance={balance} current={currentTombola + 1} max={tombolaList.length} color="rgb(255,230,0)"
                />
                <TombolaList
                    slideIndex={currentTombola} beforeSlide={this.beforeSlide} cdnMedia={cdnMedia}
                    tombolaList={tombolaList}
                />
                <ChancePanel
                    toggleInfoPanel={this.toggleInfoPanel}
                    currentTombola={currentTombola}
                    tombolaList={tombolaList}
                    userTombola={userTombola}
                    language={this.props.language}
                />
                <InfoPanel
	                title={e.tombola_tombolaInfo}
	                isOpen={isInfoPanelOpened}
	                onCloseHandler={this.toggleInfoPanel}
	                colorScheme='blue'
                >
                    {description}
                </InfoPanel >
                <TicketPackagesList id={id} tombolaBuy={tombolaBuy} bundles={bundles} />
            </TombolaWrapper>
        )
    }
}

export default Tombola;
