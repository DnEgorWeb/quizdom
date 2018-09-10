import React, { Component } from 'react'

import e                   from '../../../../langs';
import url                 from '../../../../constants/urlConstants';
import { withRouter }      from 'react-router-dom'
import TopBar              from '../../components/GameResultsTopBar'
import { Wrapper }         from './styledComponents'
import SpinnerList         from './SpinnerList'
import Spinner             from './Spinner'
import Barrel              from './Barrel'
import WinningPage         from './WinningPage';
import InfoPanel           from './infoPanel';
import SelectedSpinnerInfo from './SelectedSpinnerInfo';

class WinningComponent extends Component {
    constructor(props) {
        super(props)
        e.setLanguage(props.language)
    }

    state = {
	    spinnersList           : true,
	    spinnerItem            : false,
	    showBarrel             : false,
	    showWinning            : false,
	    fromSpinner            : false,
	    spinnerInfo            : {},
	    showResult             : false,
	    protectTopBarBtn       : false,
	    infoPanelIsOpen        : false,
	    showSelectedSpinnerInfo: false
    }

    componentWillMount() {
        const {winningComponentGot, isWinningComponentUnavailable} = this.props;
        if ((winningComponentGot || isWinningComponentUnavailable!==undefined) && !this.state.showResult) {
            this.setState({
                showBarrel: true
            });
        }

        this.setState({
            caption: this.props.gameType,
        })
    }

    componentWillReceiveProps(nextProps) {
        let freeWinningComponent = null
        if (nextProps.winningComponents) {
            const {winningComponents} = nextProps
            winningComponents.forEach(item => {
                if (item.type === "FREE" || item.title!=="Paid") {
                    this.props.setItemInfo(item)
                    freeWinningComponent = item
                }
            })
        }
        if (nextProps.resultItems && nextProps.winningComponentGot) {
            this.openResults(freeWinningComponent)
        }
        if (nextProps.isWinningComponentUnavailable !== this.props.isWinningComponentUnavailable) {
            this.continueCheckItem(nextProps.isWinningComponentUnavailable)
        }

        e.setLanguage(nextProps.language)
    }

    toggleSound = () => {
        localStorage.setItem('sound', !this.props.sound);
        this.props.toggleSound()
    }

    close = () => {
        window.notification.confirm(e.module_attention, e.module_areYouSureYouWantToQuit, e.module_yesNo, (button) => {
            if (Number(button) !== 2) {
                this.saveSpinner();
                this.props.history.push('/dashboard')
                this.props.clearWinningComponent()
            }
        })
    }

    saveSpinner = () => {
        this.props.setSpinnerDelayed();
        const {gameInstanceId} = this.props;
        const {spinnerInfo}    = this.state;
        const spinnerType      = spinnerInfo.type;

        if (gameInstanceId && spinnerType)
            this.props.assignWinningComponent(gameInstanceId, spinnerType);
    }

    openItem = (item) => {
        this.setState({
            spinnerItem: true,
            spinnerInfo: item
        })
    }

    openResults = (freeWinningComponent = null) => {
        this.props.closeWinning(freeWinningComponent)
    }

    openPayment = () => {
        this.props.history.push('/payment')
    }

    openUserData = () => {
        this.props.history.push('/profile')
    }

    continueCheckItem = (isWinningComponentUnavailable) => {
        if (this.state.laterButtonClicked) return;

        const item = this.state.selectedItem
        if (item.type === "PAID") {
            const {isUserFullRegistered} = this.props
            const cost = item.amount
            const userMoney = this.props.bonus
            const isBalanceEnough = userMoney - cost >= 0

            isUserFullRegistered ?
                isWinningComponentUnavailable ?
                    window.notification.alert(e.module_attention, e.module_youHaveNotDoneAllCriterions, e.module_ok, () => {
                        this.openResults()
                    })
                    :
                    isBalanceEnough ?
                        this.setState({
                            spinnerInfo: item
                        }, () => {
                            this.getFreeWinningComponent(this.props.gameInstanceId, item)
                            this.props.setWinningComponentGot()
                        })
                        :
                        window.notification.confirm(e.module_attention, e.module_youDonTHaveEnoughMoneyDoYouWantToPay, e.module_okCancel, (button) => {
                            if (Number(button) !== 2) {
                                this.openPayment()
                            }
                        })
                :
                window.notification.confirm(e.module_attention, e.module_youNeedToBeFullyRegisteredDoYouWantToCompleteYourProfile, e.module_okCancel, (button) => {
                    if (Number(button) !== 2) {
                        this.openUserData()
                    }
                })
        } else {
            isWinningComponentUnavailable ?
                window.notification.alert(e.module_attention, e.module_youHaveNotDoneAllCriterions, e.module_ok, () => {
                    this.openResults()
                })
                :
                this.setState({
                    spinnerInfo: item
                }, () => {
                    this.getFreeWinningComponent(this.props.gameInstanceId, item)
                    this.props.setWinningComponentGot()
                })
        }
    }

    doAssign(item, spinnerType) {
	    const { assignWinningComponent } = this.props;

	    assignWinningComponent(this.props.gameInstanceId, spinnerType);

	    this.setState({
		    selectedItem: item
	    })
    }

    checkItem = (item) => {
	    const { balance } = this.props;
	    const { amount, currency } = item;
	    let spinnerType = item.type;
	    const  rightBalance = currency && balance[ currency.toLowerCase() ];

	    if(!spinnerType) {
		    spinnerType = (item.title === "Paid") ? "PAID" : "FREE"
	    }

	    if(spinnerType === 'PAID') {
		    // window.notification.confirm(e.module_attention, e.module_doYouWantToPayForTheWinningComponent, e.module_okCancel, (button) => {
			    if(currency === 'BONUS' && rightBalance < amount) {
				    window.notification.alert(e.game_creditNotSufficient, e.mywinnings_youDoNotHaveEnoughBonusPoints, 'ok', (button) => {});
				    return false;
			    } else if (rightBalance < amount) {
				    window.notification.confirm(e.game_creditNotSufficient, e.mywinnings_doYouWantToChargeYourAccount, e.mywinnings_okCancel, (button) => {
					    if (Number(button) !== 2) {
						    this.props.history.push(url.payment.index);
						    return false;
					    }
				    })
			    } else if(currency && amount) {
				    // if(Number(button) !== 2)
			        this.doAssign(item, spinnerType);
			    }
		    // });
	    } else {
		    this.doAssign(item, spinnerType);
	    }
    }

    getFreeWinningComponent = (gameInstanceId, item) => {
        const {assignWinningComponent} = this.props
        assignWinningComponent(gameInstanceId, item.type)
    }

    laterButtonHandler = (gameInstanceId, spinnerType) => {
        this.setState({
            laterButtonClicked: true
        }, () => {
            this.props.assignWinningComponent(gameInstanceId, spinnerType)
            this.openResults()
        })
    }

    showWinningPage = () => {
    	this.setState({
		    showWinning: true,
		    showBarrel: false
    	});
    }

    protectTopBarBtn = (flag) => {
    	this.setState({ protectTopBarBtn : flag });
    }

    toggleInfoPanel = (position) => {
    	if (typeof position === 'boolean') {
		    this.setState({ infoPanelIsOpen: position });
	    } else {
		    this.setState({ infoPanelIsOpen: !this.state.infoPanelIsOpen });
	    }
    }

    showSpinnerInfo = (item) => {
	    if(item.type === 'PAID') {
		    this.setState({
			    showSelectedSpinnerInfo: true,
			    showResult             : false,
			    showBarrel             : false,
			    showWinning            : false,
			    spinnersList           : false,
			    selectedItem           : item
		    });
	    } else {
	    	this.checkItem(item);
	    }
    }

    showSpinnerList = () => {
	    this.setState({
		    showSelectedSpinnerInfo: false,
		    showResult             : false,
		    showBarrel             : false,
		    showWinning            : false,
		    spinnersList           : false,
		    selectedItem           : null
	    })
    }

    render() {
        const {sound, winningComponents, cdnMedia, resultItems, winningOption} = this.props
        const {caption} = this.state
        const soundPicture = `images/${sound ? "sound.png" : "sound-no.png"}`

        let freeWinningComponent = null
        winningComponents.forEach(item => {
            if (item.type === "FREE") {
                freeWinningComponent = item
            }
        })

        let component = null

        if (this.state.showBarrel) {
            component = <Barrel spinnerInfo={this.state.spinnerInfo}
                                gameInstanceId={this.props.gameInstanceId}
                                assignWinningComponent={this.props.assignWinningComponent}
                                winningComponentId={this.props.winningComponentId}
                                userWinningComponentLoad={this.props.userWinningComponentLoad}
                                startWinningComponent={this.props.startWinningComponent}
                                stopWinningComponent={this.props.stopWinningComponent}
                                winningOption={this.props.winningOption}
                                openResults={this.openResults}
                                freeWinningComponent={freeWinningComponent}
                                infoItem={this.props.infoItem}
                                setSpinnerPlayed={this.props.setSpinnerPlayed}
                                spinnerPlayed={this.props.spinnerPlayed}
                                gameId={this.props.gameId}
                                winningOptions={this.props.winningOptions}
                                language={this.props.language}
                                showWinning={this.showWinningPage}
                                cdnMedia={this.props.cdnMedia}
                                protectTopBarBtn={this.protectTopBarBtn} />
        } else if (this.state.spinnerItem) {
	        component = <Spinner item={ this.state.spinnerInfo }
	                             cdnMedia={ this.props.cdnMedia }
	                             gameInstanceId={ this.props.gameInstanceId }
	                             spinnerInfo={ this.state.spinnerInfo }
	                             laterButtonHandler={ this.laterButtonHandler }
	                             language={ this.props.language }
	                             checkItem={ this.checkItem }
	                             setSpinnerDelayed={ this.props.setSpinnerDelayed }/>
        } else if (this.state.showWinning) {
        	component = <WinningPage winningOption={winningOption}
	                                 history={this.props.history}
	                                 profile={this.props.profile}
	                                 openResults={this.openResults}
	                                 cdnMedia={this.props.cdnMedia}
	                                 setSpinnerPlayed={this.props.setSpinnerPlayed} />
        } else if (this.state.showSelectedSpinnerInfo) {
        	component = <SelectedSpinnerInfo
							selectedItem={this.state.selectedItem}
							goBack={this.showSpinnerList}
							history={this.props.history}
							profile={this.props.profile}
							cdnMedia={cdnMedia}
							checkItem={this.checkItem}
							language={ this.props.language }
	                    />
        } else {
            component = <SpinnerList items={winningComponents}
                                     cdnMedia={cdnMedia}
                                     openItem={this.openItem}
                                     resultItems={resultItems}
                                     language={this.props.language}
                                     toggleInfoPanel={this.toggleInfoPanel}
                                     showSpinnerInfo={this.showSpinnerInfo}
                                     roles={this.props.roles}
                                     checkItem={this.checkItem} />
        }

        let topBtnLeftFn  = this.toggleSound;
        let topBtnRightFn = this.close;
        let topBtnLeftPic = (this.state.showBarrel || this.state.showSelectedSpinnerInfo) ? "images/topbar-back.png" : soundPicture;

		if(this.state.showBarrel) {
			topBtnLeftFn  = this.props.goBackToResult;
			topBtnRightFn = this.close;
		}

		if(this.state.showSelectedSpinnerInfo) {
			topBtnLeftFn  = this.showSpinnerList;
			topBtnRightFn = this.showSpinnerList;
		}

        return(
            <Wrapper>
                <TopBar
                    caption={(this.state.showBarrel || this.state.showSelectedSpinnerInfo) ? 'GEWINNSPIEL' : caption}
                    leftButtonPictureSrc={topBtnLeftPic}
                    leftButtonClickHandler={topBtnLeftFn}
                    rightButtonClickHandler={topBtnRightFn}
                    language={this.props.language}
                    protectTopBarBtn={this.state.protectTopBarBtn}
                />
                {component}
                <InfoPanel
	                isOpen={this.state.infoPanelIsOpen}
	                togglePanel={this.toggleInfoPanel}
	                title={'Title'}
                >
	                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid at aut
	                consectetur cum debitis doloremque dolorum earum eos illum iure, nobis nostrum obcaecati praesentium
	                provident sequi tempore vel voluptas.
                </InfoPanel>
            </Wrapper>
        )
    }
}

export default withRouter(WinningComponent)