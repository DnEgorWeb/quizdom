import React from 'react'
import e from '../../../../../../../../langs';

import {
    ButtonWrapper,
    Button,
} from '../../../../../../myWinnings/components/styledComponents'

import {
    FrindsButtonsPannelWrapper,
    FrindsButtonsPannelContainer,
    FiendsButtonText,
} from '../../../../../../myFriends/components/styledComponents'

import {
    FreeSpace,
    Text,
} from './styledComponents'

const mapPropToUrl = {
    friends: {
        nonActive: 'images/friends.png',
        active: 'images/friends--active.png',
    },
    favorite: {
        nonActive: 'images/favorite.png',
        active: 'images/favorite--active.png'
    },
    all: {
        nonActive: 'images/all.png',
        active: 'images/all--active.png'
    }
}

const FrindsButtonsPannel = (props) => (
    <FrindsButtonsPannelWrapper>
        <FrindsButtonsPannelContainer>
            <ButtonWrapper>
                <Button active={props.view === 'friends'} source={mapPropToUrl.friends} onClick={() => props.changeView('friends')} />
                <FiendsButtonText active={props.view === 'friends'}>{
                    e.formatString(e.myfriends_myFriendsAndBr, <br />)
                }</FiendsButtonText>
            </ButtonWrapper>
            <ButtonWrapper>
                <Button active={props.view === 'favorite'} source={mapPropToUrl.favorite} onClick={() => props.changeView('favorite')} />
                <FiendsButtonText active={props.view === 'favorite'}>{
                    e.formatString(e.myfriends_myFavorites, <br />)
                }</FiendsButtonText>
            </ButtonWrapper>

            <FreeSpace />

        </FrindsButtonsPannelContainer>

        <Text>
            <span className='big'>{e.myfriends_chooseADuelOpponent}</span> <br />
            {e.myfriends_youCanInviteUpTo4Opponents}
        </Text>
    </FrindsButtonsPannelWrapper>
)

export default FrindsButtonsPannel
