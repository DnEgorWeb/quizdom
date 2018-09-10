import React, { Component } from 'react';
import e from '../langs';
import { Switch, Route, Redirect } from 'react-router-dom';

import url from '../constants/urlConstants'

import Home                   from './pages/home/HomeContainer'
import LoginContainer         from './pages/login/LoginContainer'
import RegistrationContainer  from './pages/registration/RegistrationContainer'
import IntroContainer         from './pages/intro/IntroContainer'
import InfoContainer          from './pages/info/InfoContainer'
import Voucher                from './pages/voucher'
import DashboardContainer     from './pages/dashboard/DashboardContainer'
import Game                   from './pages/game/'
import Payment                from './pages/payment'
import MyDataContainer        from './pages/myData/MyDataContainer'
import SettingsContainer      from './pages/settings/SettingsContainer'
import MessengerContainer     from './pages/messenger/MessengerContainer'
import InviteFriends          from './pages/inviteFriends/InviteFriendsContainer'
import MyLookFriendsContainer from './pages/myLookFriends/MyLookFriendsContainer'
import MyWinnings             from './pages/myWinnings'
import HighScore              from './pages/highscore/HighscoreContainer'
import TombolaContainer       from './pages/tombola/TombolaContainer'
import Feedback               from './pages/feedback/FeedbackContainer'
import MyFriendsContainer     from './pages/myFriends/MyFriendsContainer'
import Promocode              from './pages/promocode/PromocodeContainer'
import GroupsContainer        from './pages/groups/GroupsContainer'

const PublicRoute = ({component: Component, loggedIn, ...rest}) => {
    if(!loggedIn){
        return (
            <Route  {...rest} render={ props => ( <Component {...props} /> ) } />
        )
    }else{
        return <Redirect to='/dashboard'/>
    }

}

const PrivateRoute = ({component: Component, loggedIn, ...rest}) => {
    if(loggedIn){
        return (
            <Route  {...rest} render={ props => ( <Component {...props} /> ) } />
        )
    }else{
        window.notification.alert(e.root_attention, e.root_youNeedToBeRegisteredToGetHere, e.root_ok, () => {})
        return(
            <Redirect to='/home' />
        )
    }

}

class Root extends Component {
    constructor(props) {
        super(props);
        if(props.language) e.setLanguage(props.language);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.language) e.setLanguage(nextProps.language);
    }

    componentDidMount(){
        // this must be moved from here
        const { isFirstStart } = this.props
        this.setState({showIntro: true, introType: isFirstStart ? 'hello' : 'actions'});
    }

    state = {
        showIntro: true,
        introType: ''
    }

    closeIntro = () => {
        this.setState({showIntro: false})
    }

    render() {
        return (
            this.state.showIntro ?
                    <IntroContainer closeIntro={this.closeIntro} introType={this.state.introType} />
                :
                    <Switch>
                        <PublicRoute   path={url.home.index}      component={Home}                   loggedIn={this.props.loggedIn} language={this.props.language} />
                        <PublicRoute   path={url.login.index}     component={LoginContainer}         loggedIn={this.props.loggedIn} />
                        <PublicRoute   path={url.register.index}  component={RegistrationContainer}  loggedIn={this.props.loggedIn} />
                        <Route         path={url.dashboard.index} component={DashboardContainer} />
                        <Route         path={url.feedback.index}  component={Feedback}               loggedIn={this.props.loggedIn} />
                        <PrivateRoute  path={url.payment.index}   component={Payment}                loggedIn={this.props.loggedIn} />
                        <PrivateRoute  path={url.profile.index}   component={MyDataContainer}        loggedIn={this.props.loggedIn} />
                        <PrivateRoute  path={url.invite.index}    component={InviteFriends}          loggedIn={this.props.loggedIn}  language={this.props.language} />
                        <Route         path={url.settings.index}  component={SettingsContainer}      loggedIn={this.props.loggedIn} />
                        <PrivateRoute  path={url.messenger.index} component={MessengerContainer}     loggedIn={this.props.loggedIn} />
						<PrivateRoute  path={url.look.index}      component={MyLookFriendsContainer} loggedIn={this.props.loggedIn} />
						<PrivateRoute  path={url.winnings.index}  component={MyWinnings}             loggedIn={this.props.loggedIn} />
                        <PrivateRoute  path={url.highscore.index} component={HighScore}              loggedIn={this.props.loggedIn} />
                        <PrivateRoute  path={url.friends.index}   component={MyFriendsContainer}     loggedIn={this.props.loggedIn} />
                        <PrivateRoute  path={url.groups.index}    component={GroupsContainer}        loggedIn={this.props.loggedIn} />
                        <Route         path={url.game.index}      component={Game} />
						<Route         path={url.tombola.index}   component={TombolaContainer}       loggedIn={this.props.loggedIn} />
                        <Route         path={url.info.index}      component={InfoContainer} />
                        <PrivateRoute  path={url.voucher.index}   component={Voucher}                loggedIn={this.props.loggedIn} />
                        <PrivateRoute  path={url.promocode.index} component={Promocode}              loggedIn={this.props.loggedIn} />
                        <Redirect to={url.home.index} />
                    </Switch>

        );
    }
}

export default Root;
