import React from 'react'
import e from '../../../../../langs'

import url from '../../../../../constants/urlConstants'

import {
    GroupsDetailsWrapper,
} from './styledComponents'

import TopBar from '../../../../modules/components/TopBar'
import PlayersList from './PlayerList/PlayerListContainer'
import InfoPanel from '../infoPanel'
import GroupConfigurator from './groupConfigurator'
import PlayerDescription from './playerDescription'
import MasterPanel from './masterPanel'

class GroupsDetails extends React.Component {
    constructor(props) {
        super(props);
        props.initGroupsDetails();
        e.setLanguage(props.language);
    }

    state = {
        isInfoPanelOpen: false,
        infoPanelContent: 'text',   // 'text', 'master' or 'player'
        selectedPlayerNickname: '',
    }

    componentWillReceiveProps(nextProps) {
        e.setLanguage(nextProps.language);
    }

    showGroupConfigurator = () => {
        this.setState({infoPanelContent: 'master'});
    }

    openInfoPanel = () => {
        this.setState({isInfoPanelOpen: true})
    }

    closeInfoPanel = () => {
        this.setState({isInfoPanelOpen: false})
    }

    selectMasterHandler = () => {
        this.openInfoPanel();
        this.showGroupConfigurator();
    }

    configureGroup = () => {
        // this.props.history.push(url.groups.change);
        this.props.goToChangeGroup();
    }

    deleteGroupHandler = () => {
        window.notification.confirm(
            e.group_note,
            e.group_shouldTheTournamentGroupBeFinallyDeleted,
            e.group_yesNo, (button) => {
                if (Number(button) !== 2) {
                    this.props.history.push(url.groups.tournament);
                    this.props.deleteGroup();
                }
            })
    }

    showInfo = () => {
        this.openInfoPanel();
        this.setState({infoPanelContent: 'text'})
    }

    goToAddFriends = () => {
        const groupLength = this.props.groupListPlayers.length

        if (this.props.typeOfGroupCreate === "duel") {
            groupLength < 5 ?
                this.props.goToAddFriends() :
                window.notification.alert('Attention', 'The group can`t include more than 5 players!', 'Ok', () => {})
        } else {
            this.props.goToAddFriends()
        }
    }

    selectPlayerHandler = (nickname) => {
        this.setState(() => ({selectedPlayerNickname: nickname, }));
        this.setState(() => ({infoPanelContent: 'player'}))
        this.openInfoPanel();
    }

    groupRemovePlayers = (userId) => {
        window.notification.confirm(e.group_attention, e.group_doYouReallyWantToRemoveThisPlayerFromGroup, e.group_okCansel, (button) => {
            if (Number(button) !== 2) {
                this.props.groupRemovePlayers(userId);
                this.closeInfoPanel();
            }
        })
    }

    getSelectedPlayerProfile = () => {
        const selectedPlayerNickname = this.state.selectedPlayerNickname;
        if (selectedPlayerNickname) {
            return this.props.groupListPlayers.filter(player => player.nickname === selectedPlayerNickname)[0] || {}
        }
    }

    getMasterInGroup = () => {
        const userId = this.props.userId;
        const groupListPlayers = this.props.groupListPlayers;
        return groupListPlayers.filter(player => player.userId === userId)[0] || null;
    }

    render() {
        return (
            <GroupsDetailsWrapper>
                <TopBar
                    back={this.props.back}
                    caption={e.group_groupDetails}
                />
                <MasterPanel
                    masterProfile={this.getMasterInGroup()}
                    group={this.props.currentGroup}
                    cdnMedia={this.props.cdnMedia}
                    plusButtonClickHandler={this.goToAddFriends}
                    infoButtonClickHandler={this.showInfo}
                    selectMasterHandler={this.selectMasterHandler}
                    playerSettings={this.props.playerSettings}
                    view={this.props.view}
                />

                <PlayersList selectPlayerHandler={this.selectPlayerHandler} />

                <InfoPanel
                    onCloseHandler={this.closeInfoPanel}
                    isOpen={this.state.isInfoPanelOpen}
                    title='Master'
                    titleStyle={{color: 'rgb(255,127,0)'}}
                    noTitlePicture
                    noInfoBlock={this.state.infoPanelContent !== 'text'}
                    language={this.props.language}
                >
                    {
                        this.state.infoPanelContent === 'text' ?
                            <div>text</div>
                            :
                            this.state.infoPanelContent === 'master' ?
                                <GroupConfigurator
                                    configureGroup={this.configureGroup}
                                    deleteGroupHandler={this.deleteGroupHandler}
                                />
                                :
                                this.state.infoPanelContent === 'player' ?
                                    <PlayerDescription
                                        profile={this.getSelectedPlayerProfile()}
                                        cdnMedia={this.props.cdnMedia}
                                        groupRemovePlayers={this.groupRemovePlayers}
                                    />
                                    :
                                    null
                    }

                </InfoPanel>

            </GroupsDetailsWrapper>
        )
    }
}

export default GroupsDetails;
