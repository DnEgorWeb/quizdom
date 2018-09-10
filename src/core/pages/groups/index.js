import React from 'react'

import Intro from './components/Intro'
import TournamentGroups from './components/TournamentGroups'
import DuelGroups from './components/DuelGroups'
import GroupDetails from './components/GroupsDetails'
import AddFriends from './components/addFriends'
import ChangeGroup from './components/changeGroup'
import CreateGroup from './components/createGroup'

export default class Groups extends React.Component {
    state = {
        view: "INTRO",  // "GROUPS_TOURNAMENT", "GROUPS_DUEL", "GROUP_DETAILS", "ADD_FRIENDS", "CHANGE_GROUP", "GROUP_CREATE"
        preview: '',
        typeOfGroupCreate: ''
    }

    componentDidMount() {
        this.props.getGroupList()
    }

    componentWillUpdate(nextProps){
        if(nextProps.groupList && nextProps.groupList.length !== this.props.groupList.length) {
            this.forceUpdate();
        }
    }
    
    goToPreview = () => {
        this.setState({ view: this.state.preview, preview: 'INTRO' })
    }

    goToTournamentGroups = () => {
        this.setState({view: "GROUPS_TOURNAMENT", preview: this.state.view});
    }

    goToDuelGroups = () => {
        this.setState({view: "GROUPS_DUEL", preview: this.state.view});
    }

    goToGroupDetails = (groupType) => {
        this.setState({view: "GROUP_DETAILS", preview: this.state.view, typeOfGroupCreate: groupType})
    }

    goToAddFriends = () => {
        this.setState({view: "ADD_FRIENDS", preview: this.state.view})
    }

    goToChangeGroup = () => {
        this.setState({view: "CHANGE_GROUP", preview: this.state.view});
    }

    goToCreateGroup = (groupType) => {
        this.setState({view: "GROUP_CREATE", preview: this.state.view, typeOfGroupCreate: groupType});
    }

    render() {
        let view = null;

        switch (this.state.view) {
            case "INTRO":
                view = (
                    <Intro
                        goToTournamentGroups={this.goToTournamentGroups}
                        goToDuelGroups      ={this.goToDuelGroups}
                        {...this.props}
                    />
                );
                break;
            case "GROUPS_DUEL":
                view = (
                    <DuelGroups
                        back={this.goToPreview}
                        goToGroupDetails={this.goToGroupDetails}
                        goToCreateGroup={this.goToCreateGroup}
                        view={this.state.view}
                        {...this.props}
                    />
                );
                break;
            case "GROUPS_TOURNAMENT":
                view = (
                    <TournamentGroups
                        back={this.goToPreview}
                        goToGroupDetails={this.goToGroupDetails}
                        goToCreateGroup={this.goToCreateGroup}
                        view={this.state.view}
                        {...this.props}
                    />
                );
                break;
            case "GROUP_DETAILS":
                view = (
                    <GroupDetails
                        back            = {this.goToPreview}
                        goToAddFriends  = {this.goToAddFriends}
                        goToChangeGroup = {this.goToChangeGroup}
                        typeOfGroupCreate = {this.state.typeOfGroupCreate}
                        {...this.props}
                    />
                );
                break;
            case "ADD_FRIENDS":
                view = (
                    <AddFriends
                        back={this.goToPreview}
                        groupType={this.state.typeOfGroupCreate}
                        {...this.props}
                    />
                );
                break;
            case "CHANGE_GROUP":
                view = (
                    <ChangeGroup
                        back={this.goToPreview}
                        groupType={this.state.typeOfGroupCreate}
                        {...this.props}
                    />
                );
                break;
            case "GROUP_CREATE":
                view = (
                    <CreateGroup
                        back={this.goToPreview}
                        typeOfGroupCreate = {this.state.typeOfGroupCreate}
                        view={this.state.view}
                        {...this.props}
                    />
                );
                break;
            default:
                view = null
        }

        return (
            view
        )
    }
}
