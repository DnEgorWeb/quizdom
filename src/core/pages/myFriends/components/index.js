import React from 'react'
import e from '../../../../langs'

import TopBar from '../../../modules/components/TopBar'
import InfoPanel from './infoPanel'
import FrindsButtonsPannel from './frindsButtonsPannel'
import FriendsList from './friendsList'
import FriendOverview from './friendOverview'
import PlayerList from './playerList'

import {
    MyFriendsWrapper,
} from './styledComponents'

// import getAlphabetSortedFriendsList from '../../../../services/getAlphabetSortedFriendsList'

class MyFriends extends React.Component {

    constructor(props) {
        super(props);
        props.initMyFriends();
        e.setLanguage(props.language)
    }

    state = {
        view: 'friends',
        showSearchPanel: false,
        isInfoPanelOpen: false,
        searchValue: {
            nickname: '',
            address: ''
        },
        selectedFriendNickname: '',
        selectPlayerId: '',
        selectedFriendOptions: {
            blocked: false,
            favorite: false,
            trash: false,
            isFriend: false,
        }
    }

    componentWillReceiveProps(nextProps) {
        e.setLanguage(nextProps.language);

        const MIN_FRIENDS = 6;
        const showSearchPanel = (
            this.props.myFriendsList ?
                this.props.myFriendsList.length > MIN_FRIENDS :
                false
            ) ||
            this.state.searchValue.nickname !== '';

        this.toggleSearchPanel(showSearchPanel);
    }

    toggleSearchPanel = (flag) => {
        this.setState({ showSearchPanel: flag });
    }

    changeView = (view) => {
        if (view === 'favorite') {
            this.props.initMyFriends(true);
        } else {
            this.props.initMyFriends();
        }
        this.setState(({searchValue}) => ({view, searchValue: {...searchValue, nickname: ''}}))
    }

    openInfoPanel = () => {
        this.setState({selectedFriendNickname: '', isInfoPanelOpen: true});
    }

    closeInfoPanel = () => {
        this.setState({isInfoPanelOpen: false})
    }

    onCloseCallback = () => {
        this.setState({
            selectPlayerId: '',
            selectedFriendOptions: {
                ...this.state.selectedFriendOptions,
                isFriend: false,
            }
        })
    }

    acceptButtonClickHandler = () => {
        if (this.state.selectedFriendOptions.isFriend && this.state.view === 'all') {
            const userIds  = [this.state.selectPlayerId];
            this.props.changeFavoriteStatus(userIds, false);
        }
    }

    setSearchValue = (value, prop) => {
        this.setState(({searchValue}) => ({searchValue: {...searchValue, [prop]: value}}))
    }

    selectPlayer = (userId) => {
        this.setState({
            selectPlayerId: userId,
            isInfoPanelOpen: true,
        })
    }

    blockOrUnblockPlayer = () => {
        const selectedFriend = this.props.myFriendsList.filter(friend => friend.profile.userId === this.state.selectPlayerId)[0];
        const userIds  = [this.state.selectPlayerId];
        const blocked = selectedFriend.buddy.relationTypes.indexOf("BLOCKED") !== -1;
        if (blocked) {
            this.props.playerUnblock(userIds)
        } else {
            this.props.playerBlock(userIds)
        }
    }

    changeFavoriteStatus = () => {
        const selectedFriend = this.props.myFriendsList.filter(friend => friend.profile.userId === this.state.selectPlayerId)[0];
        const userIds  = [this.state.selectPlayerId];
        const favorite = selectedFriend.buddy.favorite;
        this.props.changeFavoriteStatus(userIds, !favorite);
    }

    removeFriend = () => {
        window.notification.confirm(e.myfriends_attention, e.myfriends_shouldYourFriendBeDeletedFromYourList, e.myfriends_yesNo, (button) => {
            if (Number(button) !== 2) {
                this.closeInfoPanel();
                setTimeout(() => {
                    const userIds = [this.state.selectPlayerId];
                    this.props.removeFriend(userIds);
                }, 500);
            }
        })
    }

    addFriend = () => {
        this.closeInfoPanel();
        setTimeout(() => {
            const userIds  = [this.state.selectPlayerId];
            this.props.changeFavoriteStatus(userIds, false);
        }, 500);
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

    changeIsFriendOption = () => {
        this.setState((prevState) => (
            {
                ...prevState,
                selectedFriendOptions: {
                    ...prevState.selectedFriendOptions,
                    isFriend: !prevState.selectedFriendOptions.isFriend
                }
            }
        ));
    }

    render() {
        let selectedPlayer = {};
        const { playerList = [], myFriendsList = [] } = this.props;

        if (this.state.view === 'all') {
            selectedPlayer = playerList.filter(
                player =>  player && player.profile && player.profile.userId === this.state.selectPlayerId
            )[0];
        } else {
            selectedPlayer = myFriendsList.filter(
                friend => friend && friend.profile.userId === this.state.selectPlayerId
            )[0];
        }

        return (
            <MyFriendsWrapper>
                <TopBar caption={e.myfriends_myFriends} />
                <FrindsButtonsPannel
                    view={this.state.view}
                    changeView={this.changeView}
                    openInfoPanel={this.openInfoPanel}
                    language={this.props.language}
                />
                {
                    this.state.view === 'friends' || this.state.view === 'favorite' ?
                        <FriendsList
                            selectFriend={this.selectPlayer}
                            getFriends={this.props.getFriends}
                            onChangeHandler={this.setSearchValue}
                            cdnMedia={this.props.cdnMedia}
                            // alphabetSortedFriendsList={alphabetSortedFriendsList}
                            playerList={this.props.myFriendsList}
                            onlyFavorite={this.state.view === 'favorite'}
                            showSearchInput={this.state.showSearchPanel}
                            searchValue={this.state.searchValue}
                            isEmpty={this.props.myFriendsList && this.props.myFriendsList.length === 0}
                            language={this.props.language}
                            getTopFriendsList={this.getTopFriendsList}
                        />
                        :
                        <PlayerList
                            selectPlayer={this.selectPlayer}
                            getPlayerList={this.props.getPlayerList}
                            onChangeHandler={this.setSearchValue}

                            cdnMedia={this.props.cdnMedia}
                            playerList={this.props.playerList}
                            showSearchInput={this.state.showSearchPanel}
                            searchValue={this.state.searchValue}
                            isEmpty={this.props.playerList && this.props.playerList.length === 0}
                            language={this.props.language}
                        />
                }

                <InfoPanel
                    onCloseHandler={this.closeInfoPanel}
                    onCloseCallback={this.onCloseCallback}
                    isOpen={this.state.isInfoPanelOpen}
                    title={e.myfriends_myFriends}
                    titleStyle={{color: 'rgb(255,127,0)'}}
                    noTitlePicture
                    noInfoBlock={!!selectedPlayer}
                    onOkButtonClick={this.acceptButtonClickHandler}
                    language={this.props.language}
                >
                    {
                        selectedPlayer ?
                            <FriendOverview
                                name={selectedPlayer.profile.name}
                                lastName={selectedPlayer.profile.lastName}
                                nickname={selectedPlayer.profile.nickname}
                                image={(this.props.cdnMedia + selectedPlayer.profile.image).replace(/\/\//g, '/')}
                                city={selectedPlayer.profile.address.city}
                                country={selectedPlayer.profile.address.country}
                                handicap={selectedPlayer.profile.handicap}

                                blocked={selectedPlayer.buddy && selectedPlayer.buddy.relationTypes.indexOf("BLOCKED") !== -1}
                                favorite={selectedPlayer.buddy && selectedPlayer.buddy.favorite}
                                trash={true}
                                isFriend={this.state.selectedFriendOptions.isFriend}
                                view={this.state.view}

                                blockOrUnblockPlayer={this.blockOrUnblockPlayer}
                                changeFavoriteStatus={this.changeFavoriteStatus}
                                removeFriend={this.removeFriend}
                                addFriend={this.addFriend}

                                changeIsFriendOption={this.changeIsFriendOption}
                                language={this.props.language}
                            />
                            :
                            'text or markup'
                    }
                </InfoPanel>
            </MyFriendsWrapper>
        )
    }
}

export default MyFriends;
