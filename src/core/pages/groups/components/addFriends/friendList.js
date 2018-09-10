import React from 'react'
import e from '../../../../../langs'

import {
    FriendsListWrapper,
    EmptyList,
} from './styledComponents'

import AlphabetSubList from '../../../../modules/components/PlayerListComponents/alphabetSubList'
import FriendItem from './friendItem'
import getAlphabetSortedFriendsList from '../../../../../services/getAlphabetSortedFriendsList'

const FriendList = (props) => (
    <FriendsListWrapper
        showSearchInput={props.showSearchInput}
    >
        <div className='scrollable-wrapper'>
            {
                props.myFriendsList && props.myFriendsList.length > 0 ?

                    getAlphabetSortedFriendsList(props.myFriendsList, props.view === 'favorite')
                        .map((friendsUnderLetter, index) => (
                            friendsUnderLetter.items.length > 0 &&

                            <AlphabetSubList
                                key={friendsUnderLetter.id}
                                letter={friendsUnderLetter.letter}
                                noLine={friendsUnderLetter.letter === 'top treffer'}
                            >
                                {
                                    friendsUnderLetter.items.map((friend) => (
                                        <FriendItem
                                            selectFriendHandler={props.selectFriendHandler.bind(null, friend.profile.userId)}
                                            key={friend.profile.userId}
                                            name={friend.profile.name}
                                            lastName={friend.profile.lastName}
                                            nickname={friend.profile.nickname}
                                            image={(props.cdnMedia + friend.profile.image).replace(/\/\//g, '/')}
                                            country={friend.profile.address.country}
                                            selected={props.selectedFriendsIds.indexOf(friend.profile.userId) !== -1}
                                        />
                                    ))
                                }
                            </AlphabetSubList>
                        ))
                    :
                    <EmptyList>{e.group_createNewGroupMembersNow}</EmptyList>
            }
        </div>
    </FriendsListWrapper>
)

export default FriendList
