import React from 'react'
import styled from "styled-components";
import e from '../../../../../../../langs'

import AlphabetSubList from '../../../../../../modules/components/PlayerListComponents/alphabetSubList'
import FriendItem from './friendItem'
import getAlphabetSortedFriendsList from '../../../../../../../services/getAlphabetSortedFriendsList'

export const FriendsListWrapper = styled.div`
  overflow: hidden;
    height: ${({showSearchInput}) => showSearchInput ? '910px' : '1014px'};
    max-height: ${({showSearchInput}) => showSearchInput ? '910px' : '1014px'};
    position: relative;
	.scrollable-wrapper{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: -17px;
        overflow-y: scroll;
        @media (max-width: 768px) {
            right: 0;
        }
    }
`

export const EmptyList = styled.div`
  font: 500 34px Univers-condensed;
`

class FriendList extends React.Component {

    constructor(props) {
        super(props);
        this.props.initFriendList();
    }

    render() {
        return (
            <FriendsListWrapper
                showSearchInput={this.props.showSearchInput}
            >
                <div className='scrollable-wrapper'>
                    {
                        this.props.myFriendList && this.props.myFriendList.length > 0 ?

                            getAlphabetSortedFriendsList(this.props.myFriendList, this.props.view === 'favorite')
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
                                                    selectFriendHandler={this.props.selectFriendHandler.bind(null, friend.profile.userId)}
                                                    key={friend.profile.userId}
                                                    name={friend.profile.name}
                                                    lastName={friend.profile.lastName}
                                                    nickname={friend.profile.nickname}
                                                    image={(this.props.cdnMedia + friend.profile.image).replace(/\/\//g, '/')}
                                                    country={friend.profile.address.country}
                                                    selected={this.props.selectedFriendsIds.indexOf(friend.profile.userId) !== -1}
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
    }
}

export default FriendList
