import React, { Component } from 'react'
import e from '../../../../../../langs';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'

import DuelMain       from './DuelMain'
import Game           from '../../../../../modules/game/GameContainer'
import Invitations    from './Invitations'
import InvitationInfo from './InvitationInfo'
import DuelCreation   from './DuelCreation'
import DuelStart      from './DuelStart'
import UserDuelInfo   from './UserDuelInfo'
import AgainstAll     from './AgainstAll'
import CompletedGames from './CompletedGames'
import url            from '../../../../../../constants/urlConstants'

class Duel extends Component{
    constructor(props) {
        super(props);
        e.setLanguage(props.language);
    }

    state = { currentGame: null }

    componentWillReceiveProps(nextProps) {
        e.setLanguage(nextProps.language);
    }

    componentWillMount(){
        this.props.getDashboard()
        // this.props.getInvitations('MYSELF', ['CALCULATED'])
        this.props.getInvitations('OTHERS', ['INVITED', 'DELETED']);
        // this.props.getInvitations('ALL', ['INVITED', 'DELETED', 'CALCULATED'])
        this.props.getPublicGames()
        this.props.getCompletedDuels()
        this.props.setGroupListPlayers([]); // set empty groupListPlayers
    }

    componentWillUnmount(){
        this.props.removeInvitations()
    }

    goToPayment = () => {
        this.props.history.push(url.payment.index);
    }

    goBack = () => {
        this.props.history.goBack()
    }

    close = () => {
        this.props.history.push(url.dashboard.index);
    }

	createPublicDuel = (...args) => {
    	const { profile, history } = this.props;

		if(!(profile.roles && profile.roles.includes('FULLY_REGISTERED'))) {
			window.notification.confirm(
				e.module_attention,
				e.module_youNeedToBeFullyRegisteredDoYouWantToCompleteYourProfile,
				[ "Edit profile", "Skip" ], () => {
					history.push(url.profile.index);
				}
			);
			return false;
		} else {
			this.props.createPublicDuel(...args);
		}
    }

    render(){
        const userInvites  = this.props.userInvites && this.props.userInvites.filter(item => !(item.status === 'DELETED'));

        return this.props.isGameLoaded ?
            <Game />
            :
            <Switch>
                <Route path={url.game.duel.index} exact>
                    <DuelMain
                        goBack={this.goBack}
                        close={this.close}
                        createdPublicGamesCount={this.props.createdPublicGames.length}
                        publicGamesCount={this.props.publicGames.length}
                        friendsInvitesCount={this.props.friendsInvites.length}
                        userInvitesCount={userInvites.length}
                        numberOfPublicDuels={this.props.numberOfPublicDuels}
                        numberOfPlayedDuels={this.props.completedDuels.length}
                        balance={this.props.balance}
                        language={this.props.language}
                    />
                </Route>
                <Route path={url.game.duel.invitations}>
                    <Invitations
                        setGameType={this.props.setGameType}
                        friendsInvitesCount={this.props.friendsInvites.length}
                        userInvites={this.props.userInvites}
                        friendsInvites={this.props.friendsInvites}
                        userInvitesCount={this.props.userInvites.length}
                        goBack={this.goBack}
                        close={this.close}
                        createdPublicGames={this.props.createdPublicGames}
                        createdPublicGamesCount={this.props.createdPublicGames.length}
                        publicGames={this.props.publicGames}
                        publicGamesCount={this.props.publicGames.length}
                        selectInvitation={this.props.selectInvitation}
                        numberOfPublicDuels={this.props.numberOfPublicDuels}
                        numberOfPlayedDuels={this.props.numberOfPlayedDuels}
                        initInvitations={this.props.initInvitations}
                        poolList={this.props.poolList}
                        getPoolList={this.props.getPoolList}
                        language={this.props.language}
                        invitations={this.props.invitations}
                        startDuel={this.props.startDuel}
                        getBalance={this.props.getBalance}
                    />
                </Route>
                <Route path={url.game.duel.invitationInfo}>
                    <InvitationInfo
                        goBack={this.goBack}
                        close={this.close}
                        balance={this.props.balance}
                        selectedInvitation={this.props.selectedInvitation}
                        userId={this.props.userId}
                        getBalance={this.props.getBalance}
                        userName={this.props.userName}
                        respondToInvitation={this.props.respondToInvitation}
                        language={this.props.language}
                    />
                </Route>
                <Route path={url.game.duel.creation}>
                    <DuelCreation
                        goBack={this.goBack}
                        close={this.close}
                        gameList={this.props.gameList}
                        initDuelCreation={this.props.initDuelCreation}
                        userName={this.props.showFullName ? `${this.props.firstName} ${this.props.lastName}` : this.props.userName}
                        getFriends={this.props.getFriends}
                        myFriendList={this.props.myFriendList}
                        cdnMedia={this.props.cdnMedia}
                        initGroups={this.props.initGroups}
                        groupList={this.props.groupList}
                        getGroupListPlayers={this.props.getGroupListPlayers}
                        groupListPlayerIds={this.props.groupListPlayerIds}
                        setGroupListPlayers={this.props.setGroupListPlayers}
                        userId={this.props.userId}
                        createDuel={this.props.createDuel}
                        getGame={this.props.getGame}
                        currentGame={this.props.currentGame}
                        balance={this.props.balance}
                        goToPayment={this.goToPayment}
                        language={this.props.language}
                        duelGame={this.props.duelGame}
                        history={this.props.history}
                        profile={this.props.profile}
                    />
                </Route>
                <Route path={url.game.duel.friendsResult}>
                    <UserDuelInfo
                        goBack={this.goBack}
                        close={this.close}
                        selectedInvitation={this.props.selectedInvitation}
                        getResults={this.props.getResults}
                        results={this.props.results}
                        language={this.props.language}
                        getMultiplayerResults={this.props.getMultiplayerResults}
                        startDuel={this.props.startDuel}
                    />
                </Route>
                <Route path={url.game.duel.gameStart}>
                    <DuelStart
                        goBack={this.goBack}
                        close={this.close}
                        game={this.props.selectedInvitation}
                        gameList={this.props.gameList}
                        startDuel={this.props.startDuel}
                        language={this.props.language}
                     />
                </Route>
                <Route path={url.game.duel.all}>
                    <AgainstAll
                        goBack={this.goBack}
                        close={this.close}
                        gameList={this.props.gameList}
                        initDuelCreation={this.props.initDuelCreation}
                        userName={this.props.showFullName ? `${this.props.firstName} ${this.props.lastName}` : this.props.userName}
                        getFriends={this.props.getFriends}
                        myFriendList={this.props.myFriendList}
                        cdnMedia={this.props.cdnMedia}
                        initGroups={this.props.initGroups}
                        groupList={this.props.groupList}
                        getGroupListPlayers={this.props.getGroupListPlayers}
                        groupListPlayerIds={this.props.groupListPlayerIds}
                        setGroupListPlayers={this.props.setGroupListPlayers}
                        userId={this.props.userId}
                        createDuel={this.createPublicDuel}
                        getGame={this.props.getGame}
                        currentGame={this.props.currentGame}
                        balance={this.props.balance}
                        goToPayment={this.goToPayment}
                        language={this.props.language}
                        profile={this.props.profile}
                    />
                </Route>
                <Route path={url.game.duel.finished}>
                    <CompletedGames
                        goBack={this.goBack}
                        close={this.close}
                        completedDuels={this.props.completedDuels}
                        cdnMedia={this.props.cdnMedia}
                        dispatchSetGameInstanseId={this.props.dispatchSetGameInstanseId}
                        language={this.props.language}
                    />
                </Route>
                <Redirect to={url.game.duel.index}/>
            </Switch>
    }
}
export default withRouter(Duel)
