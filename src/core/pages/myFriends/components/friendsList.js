import React from 'react';
import e from '../../../../langs';

import {
    FriendsListWrapper,
    ListPanel,
    EmptyList,
} from './styledComponents'

import getAlphabetSortedFriendsList from '../../../../services/getAlphabetSortedFriendsList'

import SearchPanel from './searchPanel'
import FriendItem from './friendItem'
import ScrollContainer from '../../../modules/components/ScrollContainer'
import AlphabetSubList from './alphabetSubList'

//TODO correct regex
const FriendsList = (props) => {
    const nicknameReg = new RegExp(props.searchValue.nickname, 'ig');
    const filteredArray = nicknameReg.length ?
                          props.playerList && props.playerList.filter(
                              item => nicknameReg.test(item.profile.nickname) || nicknameReg.test(item.profile.name)
                          ) :
                          props.playerList;
    let friendsList = getAlphabetSortedFriendsList(filteredArray, false);

    if(props.onlyFavorite){
        friendsList = friendsList.filter(one =>
            one.items.length && one.items.some(item => item.buddy.favorite)
        );
    }

    return (
        <ListPanel>
            {
                ((props.showSearchInput && friendsList && friendsList[0] && friendsList[0].items && friendsList[0].items.length) || props.searchValue) && friendsList && friendsList[0] && friendsList[0].items.length > 6 ?
                <SearchPanel
                    onChangeHandler={props.onChangeHandler}
                    onSearch={props.getFriends}
                    view='friends'
                    searchValue={props.searchValue}
                    type={'nickname'}
                />
                    :
                null
            }
            <FriendsListWrapper showSearchInput={props.showSearchInput}>
                <ScrollContainer
                    searchValue={props.searchValue}
                    onScrollEnd={props.getFriends}
                >
                    {
                        props.isEmpty || (props.onlyFavorite && friendsList[0] && !friendsList[0].items.length) ?
                        <EmptyList>{e.myfriends_noMatchFound}</EmptyList>
                            :
                        friendsList.map((frindsUnderLetter, index) => (
                                 frindsUnderLetter.items.length > 0 &&

                                 <AlphabetSubList
                                     key={index}
                                     letter={frindsUnderLetter.letter}
                                     noLine={frindsUnderLetter.letter === 'top treffer'}
                                 >
                                     {
                                         frindsUnderLetter.items.map((friend, index) => (
                                             <FriendItem
                                                 selectFriend={props.selectFriend.bind(null, friend.profile.userId)}
                                                 key={index}
                                                 name={friend.profile.name}
                                                 lastName={friend.profile.lastName}
                                                 nickname={friend.profile.nickname}
                                                 image={(props.cdnMedia + friend.profile.image).replace(/\/\//g, '/')}
                                                 city={friend.profile.address.city}
                                                 country={friend.profile.address.country}
                                                 blocked={friend.buddy && friend.buddy.relationTypes.indexOf('BLOCKED') !== -1}
                                             />
                                         ))
                                     }
                                 </AlphabetSubList>
                             ))
                    }
                </ScrollContainer>
            </FriendsListWrapper>
        </ListPanel>
    )
}
export default FriendsList;
