import React from 'react'
import e from '../../../../../../../langs'

import AlphabetSubList from '../../../../../../modules/components/PlayerListComponents/alphabetSubList'
import PlayerItem from '../../../../../../modules/components/PlayerListComponents/playerItem'
import styled from "styled-components";

const PlayListWrapper = styled.div`
  overflow: hidden;
    height: 826px;
    max-height: 826px;
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

const EmptyList = styled.div`
  font: 500 44px Overpass;
  text-align: center;
  width: 460px;
  margin: 270px auto 0;
`

class PlayerList extends React.Component{
    getAlphabetSortedPlayerList = (groupListPlayers) => {
        const alphabetSortedFriendsList = [];
        if (groupListPlayers) {
            for (let i = '0'.charCodeAt(0); i <= 'z'.charCodeAt(0); i++) {
                const letter = String.fromCharCode(i);
                const items = groupListPlayers.filter((player) => {
                    return letter === player.nickname[0].toLowerCase();
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

    render() {
        return (
            <PlayListWrapper>
                <div className='scrollable-wrapper'>
                    {
                        this.props.groupListPlayers && this.props.groupListPlayers.length > 0 ?

                            this.getAlphabetSortedPlayerList(this.props.groupListPlayers)
                                .map((playersUnderLetter) => (
                                    playersUnderLetter.items.length > 0 &&

                                    <AlphabetSubList
                                        key={playersUnderLetter.id}
                                        letter={playersUnderLetter.letter}
                                        noLine={playersUnderLetter.letter === 'top treffer'}
                                        rectangleColor='#f57a00'
                                    >
                                        {
                                            playersUnderLetter.items.map((friend) => (
                                                <PlayerItem
                                                    selectPlayerHandler={this.props.selectPlayerHandler}
                                                    key={friend.userId}
                                                    name={friend.name}
                                                    lastName={friend.lastName}
                                                    nickname={friend.nickname}
                                                    image={(this.props.cdnMedia + friend.image).replace(/\/\//g, '/')}
                                                    country={friend.address.country}
                                                />
                                            ))
                                        }

                                    </AlphabetSubList>
                                ))
                            :
                            <EmptyList>{e.group_createNewGroupMembersNow}</EmptyList>
                    }
                </div>
            </PlayListWrapper>

        )
    }
}

export default PlayerList;
