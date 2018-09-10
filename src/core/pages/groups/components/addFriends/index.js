import React from 'react'
import e from '../../../../../langs'

import {
    AddFriendsWrapper,
    ListPanel,
} from './styledComponents'

import TopBar from '../../../../modules/components/TopBar'
import AddFriendsButtonPanel from './addFriendsButtonPanel'
import SearchPanel from '../../../../modules/components/PlayerListComponents/searchPanel'
import FriendList from './FriendList/FriendListContainer'

class AddFriends extends React.Component {
    constructor(props) {
        super(props);
        e.setLanguage(props.language);
    }

    state = {
        view: 'friends',
        friendListNeedUpdate: false,
        selectedFriendsIds: [],
        searchValue: {
            nickname: '',
        },
    }

    componentWillReceiveProps(nextProps) {
        e.setLanguage(nextProps.language);
    }

    changeView = (e) => {
        const name = e.currentTarget.dataset.view;
        this.setState({view: name});
    }

    getNotAddedFriends = () => {
        const myFriendsList = this.props.myFriendsList;
        const groupListPlayers = this.props.groupListPlayers;
        return myFriendsList.filter(friend => {
            const profile = friend.profile;
            return !(groupListPlayers.filter(player => player.userId === profile.userId).length)
        });
    }

    selectFriendHandler = (userId) => {
        this.setState(({selectedFriendsIds}) => {
            const index = selectedFriendsIds.indexOf(userId);
            if (index !== -1) {
                const copy = [...selectedFriendsIds];
                copy.splice(index, 1)
                return {
                    selectedFriendsIds: copy
                }
            } else {
                return {
                    selectedFriendsIds: [...selectedFriendsIds, userId]
                }
            }

        })
    }

    addFriends = () => {
        const currentGroupLength = this.props.groupListPlayers.length
        const selectedPlayersLength = this.state.selectedFriendsIds.length

        if ((this.props.typeOfGroupCreate === "duel" || this.props.groupType === "duel") && (currentGroupLength + selectedPlayersLength > 5)) {
            window.notification.alert('Attention', 'Groups can not include more than 5 players!', 'Ok', () => {})
        } else if (this.state.selectedFriendsIds.length > 0) {
            this.props.groupAddPlayers(this.state.selectedFriendsIds);
            this.setState({selectedFriendsIds: []});
        }
    }

    setSearchValue = (value, prop) => {
        this.setState(({searchValue}) => ({searchValue: {...searchValue, [prop]: value}}))
    }

    render() {
        return (
            <AddFriendsWrapper>
                <TopBar
                    back={this.props.back}
                    caption={e.group_add}
                />
                <AddFriendsButtonPanel
                    view={this.state.view}
                    changeView={this.changeView}
                    selectedFriendsIds={this.state.selectedFriendsIds}
                    addFriends={this.addFriends}
                />
                <ListPanel>
                    {
                        this.getNotAddedFriends(this.props.myFriendsList).length > 6 || this.state.searchValue.nickname ?
                            <SearchPanel
                                onChangeHandler={this.setSearchValue}
                                onSearch={this.props.getFriends}
                                view='friends'
                                searchValue={this.state.searchValue.nickname}
                            />
                            :
                            null
                    }
                    <FriendList
                        selectFriendHandler={this.selectFriendHandler}
                        selectedFriendsIds={this.state.selectedFriendsIds}
                        howSearchInput={this.getNotAddedFriends(this.props.myFriendsList) > 6 || this.state.searchValue.nickname}
                        view={this.state.view}
                    />
                </ListPanel>
            </AddFriendsWrapper>
        )
    }
}

export default AddFriends;
