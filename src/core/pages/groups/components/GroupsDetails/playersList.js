import React from 'react'
import e from '../../../../../langs'

import {
    PlayListWrapper,
    EmptyList,
} from './styledComponents'

import AlphabetSubList from '../../../../modules/components/PlayerListComponents/alphabetSubList'
import PlayerItem from '../../../../modules/components/PlayerListComponents/playerItem'

const PlayersList = (props) => {

    const getAlphabetSortedPlayerList = (groupListPlayers) => {
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

    return (
        <PlayListWrapper>
            <div className='scrollable-wrapper'>
                {
                    props.groupListPlayers && props.groupListPlayers.length > 0 ?

                        getAlphabetSortedPlayerList(props.groupListPlayers)
                            .map((playersUnderLetter, index) => (
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
                                                selectPlayerHandler={props.selectPlayerHandler}
                                                key={friend.userId}
                                                name={friend.name}
                                                lastName={friend.lastName}
                                                nickname={friend.nickname}
                                                image={(props.cdnMedia + friend.image).replace(/\/\//g, '/')}
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

export default PlayersList;
