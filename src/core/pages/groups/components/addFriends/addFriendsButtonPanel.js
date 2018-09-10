import React from 'react'
import e from '../../../../../langs'

import {
    ButtonWrapper,
    Button,
} from '../../../myWinnings/components/styledComponents'

import {
    FiendsButtonText,
    PlusButton,
} from '../../../myFriends/components/styledComponents'

import {
    AddFriendsButtonPanelWrapper,
    AddFriendsButtonWrapper,
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

const AddFriendsButtonPanel = (props) => (
    <AddFriendsButtonPanelWrapper>
        <ButtonWrapper>
            <Button
                data-view='friends'
                active={props.view === 'friends'}
                source={mapPropToUrl.friends}
                onClick={props.changeView}
            />
            <FiendsButtonText active={props.view === 'friends'}>
                {e.formatString(e.group_myFriends, <br/>)}
            </FiendsButtonText>
        </ButtonWrapper>
        <ButtonWrapper>
            <Button
                data-view='favorite'
                active={props.view === 'favorite'}
                source={mapPropToUrl.favorite}
                onClick={props.changeView}
            />
            <FiendsButtonText active={props.view === 'favorite'}>
                {e.formatString(e.group_myFavorites, <br/>)}
            </FiendsButtonText>
        </ButtonWrapper>
        <AddFriendsButtonWrapper>
            <PlusButton
                imgSrc={props.selectedFriendsIds.length > 0 ? 'images/friends-plus.png' : 'images/friends-plus--noactive.png'}
                onClick={props.addFriends}
            />
        </AddFriendsButtonWrapper>
    </AddFriendsButtonPanelWrapper>
)

export default AddFriendsButtonPanel
