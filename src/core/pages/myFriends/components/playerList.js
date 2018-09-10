import React from 'react'
import e     from '../../../../langs'

import {
    PlayerListListWrapper,
    ListPanel,
    EmptyList,
} from './styledComponents'

import getAlphabetSortedFriendsList from '../../../../services/getAlphabetSortedFriendsList'

import PlayerItem      from './friendItem'
import ScrollContainer from '../../../modules/components/ScrollContainer'
import SearchPanel     from './searchPanel'
import AlphabetSubList from './alphabetSubList'

//TODO correct regex
const PlayerList = (props) => {
    const nicknameReg = new RegExp(props.searchValue.nickname, 'ig');
    const addressReg = new RegExp(props.searchValue.address, 'ig');
    let players = props.playerList && props.playerList.filter(
        item => {
        	const name = item.profile && item.profile.nickname;
        	return nicknameReg.test(name) || nicknameReg.test(name)
        }
    );
    players = players.filter(
    	item => {
    		const city = item.profile && item.profile.address.city;
    		return addressReg.test(city)
	    });

    players = getAlphabetSortedFriendsList(players);

	const showSearchInput = players.length > 6;
    return (
        <ListPanel>
            {
	            showSearchInput ?
                <SearchPanel
                    view='all'
                    onChangeHandler={props.onChangeHandler}
                    searchValue={props.searchValue}
                    type={'nickname'}
                />
                    :
                null
            }
            {
	            showSearchInput ?
                <SearchPanel
                    view='all'
                    onChangeHandler={props.onChangeHandler}
                    searchValue={props.searchValue}
                    type={'address'}
                />
                    :
                null
            }

            <PlayerListListWrapper showSearchInput={showSearchInput}>
                <ScrollContainer
                    searchValue={props.searchValue}
                    onScrollEnd={props.getPlayerList}
                >
                    {
                        props.isEmpty ?
                        <EmptyList>{e.myfriends_youHaveNotCreatedFriendsYet}</EmptyList>
                            :
                        players.map((player, index) => (
                            player.items.length > 0 &&

                            <AlphabetSubList
                                key={index}
                                letter={player.letter}
                                noLine={player.letter === 'top treffer'}
                            >
                                {
                                    player.items.map((one, index) => {
                                        return (
                                            <PlayerItem
	                                            selectFriend={props.selectPlayer.bind(null, one.profile.userId)}
	                                            key={index}
	                                            name={one.profile.name}
	                                            lastName={one.profile.lastName}
	                                            nickname={one.profile.nickname}
	                                            image={(props.cdnMedia + one.profile.image).replace(/\/\//g, '/')}
	                                            city={one.profile.address.city}
	                                            country={one.profile.address.country}
	                                        />
                                        )}
                                    )
                                }
                            </AlphabetSubList>
                        ))
                    }
                </ScrollContainer>
            </PlayerListListWrapper>
        </ListPanel>
    );
}
export default PlayerList;