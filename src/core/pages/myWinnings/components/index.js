import React, {Fragment} from 'react'
import e from '../../../../langs'
import url from '../../../../constants/urlConstants'
import TopBar from '../../../modules/components/TopBar'

import ResultsContainer from '../../../modules/results/ResultsContainer'
import Barrel from '../../../modules/winningComponent/components/Barrel'
import GraphicWinn from './graphicWinn'

import Overview from './overview'
import OpenWinnings from './openWinnings'
import TombolaSlide from '../../tombola/components/tombolaSlide';
import WinningPage from '../../../modules/winningComponent/components/WinningPage';
// import ScrollContainer from '../../../modules/components/ScrollContainer';

import {
	ButtonsPannel,
    ButtonWrapper,
    Button,
    ButtonText,
    DecoratedLink,
    MyWinningsWrapper,
    EmptyWrapper,
    Text,
}                            from './styledComponents'
// import {getAppConfiguration} from "../../loading/duck";

const mapPropToUrl = {
    overview: {
        nonActive: 'images/my-winnings-overview.png',
        active: 'images/my-winnings-overview-active.png',
    },
    open: {
        nonActive: 'images/my-winnings-open.png',
        active: 'images/my-winnings-open-active.png'
    },
    tombola: {
        nonActive: 'images/my-winnings-tombola.png',
        active: 'images/my-winnings-tombola-active.png'
    }
}


const Tombola = ({ tombolaList, cdnMedia }) => {
    const tombolaListPurchasedByUser = Array.isArray(tombolaList) && tombolaList.filter(item => item.purchasedTicketsAmount);

	if (tombolaListPurchasedByUser.length) {
        return (
            <div style={{ height: 1000, overflow: 'auto', marginRight: -20 }}>{
                tombolaListPurchasedByUser.map((item, index) => (
                    <TombolaSlide
                        key={index}
                        tombola={item}
                        cdnMedia={cdnMedia}
                    />
                ))
            }</div>
        );
	} else {
		return (
            <EmptyWrapper>
                <Text center margin='100px 0 0'>{e.mywinnings_thereHasNotBeenARaffleYet}</Text>
                <DecoratedLink to={url.tombola.index}>
					<Text center margin='55px 21px 0'><span className='orange'>{e.mywinnings_hereYouCanStillParticipate}</span></Text>
                </DecoratedLink>
            </EmptyWrapper>
		)
	}
}

class MyWinnings extends React.Component {
	constructor(props) {
		super(props);
		props.initMyWinnings();

		this.state = {
			view: 'overview',	// 'open', 'tombola', "RESULTS", "BARREL",
			selectedSpinner: null,
			protectTopBarBtn: false
		}

		this.props.getUserTombolaList();
		this.props.getTombolaList();
	}

    componentWillUpdate(nextProps, nextState) {
		if(this.state.view !== nextState.view)
			if(nextState.view !== 'winningPage') nextProps.initMyWinnings();
	}

	changeView = (view) => {
		this.setState({view})
	}

    selectWinning = (gameInstanceId, type) => {
		this.setState({view: "RESULTS", type});
		this.props.dispatchSetGameInstanseId(gameInstanceId);
	}

    selectSpinner = (winning) => {
        this.props.getGame(winning.gameId);
        this.props.userWinningComponentLoad(winning.userWinningComponentId);
        this.setState({view: "BARREL", selectedSpinner: winning});
    }

	protectTopBarBtn = (flag) => {
		this.setState({ protectTopBarBtn: flag })
	}

	showWinningPage = () => {
		this.setState({ view: 'winningPage' });
	}

	render() {
		const {view} = this.state;
		const {winningsList, spinnersList, setCurrentWinn, getVoucher} = this.props;
		let ViewContent = null;
		switch (view) {
			case 'overview': ViewContent = (
				<Overview
					getVoucher={getVoucher}
					setCurrentWinn={setCurrentWinn}
                    selectWinning={this.selectWinning}
					winningsList={winningsList}
                    getUserWinningsList={this.props.getUserWinningsList}
                    onClick={(amount, currency) => {this.setState({view: "WINNING", winning: {amount, currency}})}}
				/>
			); break;
			case 'open': ViewContent = (
				<OpenWinnings
					selectSpinner={this.selectSpinner}
					spinnersList={spinnersList}
				/>
			); break;
			case 'tombola': ViewContent = (
			    <Tombola tombolaList={this.props.tombolaList} cdnMedia={this.props.cdnMedia} />
            ); break;
			case 'winningPage': ViewContent = (
			    <WinningPage
				    winningOption={this.props.winningOption}
				    history={this.props.history}
				    profile={this.props.profile}
				    openResults={() => this.setState({ view: 'open' })}
				    setSpinnerPlayed={this.props.setSpinnerPlayed}
				    cdnMedia={this.props.cdnMedia}
			    />
            ); break;
            default:
                ViewContent = null
		}

		return (
			this.state.view === "RESULTS" ?
				<ResultsContainer
					close={() => {this.setState({view: "overview"})}}
					type={this.state.type}
				/>
				:
				this.state.view === "WINNING" ?
					<GraphicWinn
						currentWinn={this.state.winning}
						back={() => this.setState({view: "overview"})}
					/>
					:
					<MyWinningsWrapper>
						<TopBar
							back={this.state.view === "BARREL" ?
							        () => this.setState({view: 'open'},
									() => this.props.initMyWinnings()) : null}
							caption={e.mywinnings_myProfits}
							protectTopBarBtn={this.state.protectTopBarBtn}
						/>
						{
							(this.state.view === "BARREL" && this.state.selectedSpinner && this.props.winningOptions.length) ?
								<Barrel
									spinnerInfo={this.state.selectedSpinner}
									gameInstanceId={this.state.selectedSpinner.gameInstanceId}
									// assignWinningComponent={this.props.assignWinningComponent}
									winningComponentId={this.state.selectedSpinner.userWinningComponentId}
									startWinningComponent={this.props.startWinningComponent}
									stopWinningComponent={this.props.stopWinningComponent}
									// winningOption={this.props.winningOptions[Math.floor(Math.random() * Math.floor(this.props.winningOptions.length - 1))]}
									winningOption={this.props.winningOption}
									winningOptions={this.props.winningOptions}
									openResults={() => {}}
									freeWinningComponent={this.state.selectedSpinner.type === "FREE"}
									infoItem={this.state.selectedSpinner}
									setSpinnerPlayed={this.props.setSpinnerPlayed}
									goBack={this.changeView}
									language={this.props.language}
									protectTopBarBtn={this.protectTopBarBtn}
									showWinning={this.showWinningPage}
									cdnMedia={this.props.cdnMedia}
								/>
								:
								<Fragment>
									<ButtonsPannel>
										<ButtonWrapper>
											<Button active={view === 'overview'} source={mapPropToUrl.overview} onClick={() => this.changeView('overview')} />
											<ButtonText active={view === 'overview'}>
												{
													e.formatString(
														e.mywinnings_overviewProfits,
														<br/>
													)
												}
											</ButtonText>
										</ButtonWrapper>
										<ButtonWrapper>
											<Button active={view === 'open'} source={mapPropToUrl.open} onClick={() => this.changeView('open')} />
											<ButtonText active={view === 'open'}>
												{e.formatString(
													e.mywinnings_openGames,
													<br/>
												)}
											</ButtonText>
										</ButtonWrapper>
										<ButtonWrapper>
											<Button active={view === 'tombola'} source={mapPropToUrl.tombola} onClick={() => this.changeView('tombola')} />
											<ButtonText active={view === 'tombola'}>
												{e.formatString(
													e.mywinnings_raffleWinner,
													<br/>
												)}
											</ButtonText>
										</ButtonWrapper>
									</ButtonsPannel>
									{
										ViewContent
									}
								</Fragment>
						}

					</MyWinningsWrapper>
		)
	}
}

export default MyWinnings;
