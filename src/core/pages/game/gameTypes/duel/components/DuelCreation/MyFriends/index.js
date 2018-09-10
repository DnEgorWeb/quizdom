import React from 'react'

import TopBar from '../../../../../../../modules/components/TopBar'

import {
    MyFriendsWrapper,
} from '../../../../../../myFriends/components/styledComponents'

import FriendsButtonsPannel from './friendsButtonsPannel'
import FriendsList from '../../../../../../myFriends/components/friendsList'
// import {closeGame} from "../../../../../../../models/gameEngine/duck";
// import {setLoggedIn} from "../../../../../../../models/profile/duck";

class MyFriends extends React.Component {
    constructor(props) {
        super(props);
        props.getFriends();
    }

    state = {
        view: 'friends',    // 'favorite'
    }

    changeView = (view) => {
        this.setState({view})
    }

    getAlphabetSortedFriendsList = (onlyFavorite = false) => {
        const myFriendsList = this.props.myFriendList;
        const alphabetSortedFriendsList = [];
        if (myFriendsList) {
            for (let i = '0'.charCodeAt(0); i <= 'z'.charCodeAt(0); i++) {
                const letter = String.fromCharCode(i);
                const items = myFriendsList.filter((friend) => {
                    const nicknameFirstLetter = friend.profile.nickname && friend.profile.nickname[0].toLowerCase();
                    if (onlyFavorite) {
                        return letter === nicknameFirstLetter && friend.buddy.favorite
                    } else {
                        return letter === nicknameFirstLetter
                    }
                });
                alphabetSortedFriendsList.push({
                    id: i,
                    letter,
                    items,
                })
            }
        }
        return alphabetSortedFriendsList;
    }

    getTopFriendsList = (onlyFavorite) => {
        const filterList = [
            {
                id: 0,
                letter: 'top treffer',
                items: []
            }
        ]
        filterList[0].items = onlyFavorite ?
            this.props.myFriendsList.filter(friend => friend.buddy.favorite)
            :
            this.props.myFriendsList;
        return filterList;
    }

    render() {
        const MIN_FRIENDS = 6;

        return (
            <MyFriendsWrapper>
                <TopBar
                    back={this.props.goBack}
                    close={this.props.close}
                    caption='MEINE FREUNDE'
                />
                <FriendsButtonsPannel
                    view={this.state.view}
                    changeView={this.changeView}
                />

                <FriendsList
                    selectFriend={this.props.selectEnemy}
                    getFriends={this.props.getFriends}
                    onChangeHandler={this.props.setSearchValue}
                    playerList={this.props.myFriendList}
                    cdnMedia={this.props.cdnMedia}
                    alphabetSortedFriendsList={
                        this.props.searchValue.length >= 3 ?
                            this.getTopFriendsList(this.state.view === 'favorite')
                            :
                            this.getAlphabetSortedFriendsList(this.state.view === 'favorite')
                    }
                    onlyFavorite={this.state.view === 'favorite'}
                    showSearchInput={(this.props.myFriendsList ? this.props.myFriendsList.length > MIN_FRIENDS : false) || this.props.searchValue !== ''}
                    searchValue={this.props.searchValue}
                    isEmpty={this.props.myFriendsList && this.props.myFriendsList.length === 0}
                />
            </MyFriendsWrapper>
        )
    }
}

export default MyFriends;
