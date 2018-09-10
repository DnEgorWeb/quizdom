import React from 'react'

import {
    FriendItemWrapper,
    ItemTopBlock,
    Name,
    Nickname,
    ItemBottomBlock,
    Icon,
    Flag,
    City,
} from '../../../myFriends/components/styledComponents'

const FriendItem = (props) => (
    <FriendItemWrapper onClick={props.selectFriendHandler}>
        <ItemTopBlock noArrow style={{backgroundColor: props.selected ? 'rgb(71,157,1)' : 'rgb(167,167,167)'}}>
            <Name>{`${props.name || ''} ${props.lastName || ''}`}</Name>
            <Nickname>{`${props.nickname || ''}`}</Nickname>
        </ItemTopBlock>
        <ItemBottomBlock>
            <City>{props.city || ''}</City>
        </ItemBottomBlock>
        <Icon imgSrc={props.image} />
        <Flag className={`flag flag-${props.country ? props.country.toLowerCase() : ''}`} />
    </FriendItemWrapper>
)

export default FriendItem
