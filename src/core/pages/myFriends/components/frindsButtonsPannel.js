import React from 'react'
import e from '../../../../langs'

import {
    ButtonWrapper,
    Button,
} from '../../myWinnings/components/styledComponents'

import {
    FrindsButtonsPannelWrapper,
    FrindsButtonsPannelContainer,
    Text,
    PlusButtonWrapper,
    PlusButton,
    InfoButtonWrapper,
    InfoButton,
    FiendsButtonText,
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
                <FiendsButtonText active={props.view === 'friends'}>{e.formatString(e.myfriends_myFriendsAndBr, <br />)}</FiendsButtonText>
            </ButtonWrapper>
            <ButtonWrapper>
                <Button active={props.view === 'favorite'} source={mapPropToUrl.favorite} onClick={() => props.changeView('favorite')} />
                <FiendsButtonText active={props.view === 'favorite'}>{e.formatString(e.myfriends_myFavorites, <br />)}</FiendsButtonText>
            </ButtonWrapper>
            <ButtonWrapper>
                <Button active={props.view === 'all'} source={mapPropToUrl.all} onClick={() => props.changeView('all')} />
                <FiendsButtonText active={props.view === 'all'}>{e.formatString(e.myfriends_allPlayers, <br />)}</FiendsButtonText>
            </ButtonWrapper>
        </FrindsButtonsPannelContainer>

        <Text>
            {
                props.view !== 'all' ?
                    <span>
                        {e.myfriends_addFavorites}
                        <PlusButtonWrapper>
                            <PlusButton onClick={() => props.changeView('all')} />
                        </PlusButtonWrapper>
                    </span>
                    :
                    null
            }

            <InfoButtonWrapper>
                <InfoButton onClick={props.openInfoPanel}/>
            </InfoButtonWrapper>
        </Text>
    </FrindsButtonsPannelWrapper>
)

export default FrindsButtonsPannel
