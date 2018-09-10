import React from 'react'

import {
    FriendItemWrapper,
    ItemTopBlock,
    ItemBottomBlock,
    Icon,
    Flag,
    Name,
    Nickname,
    City,
    BlockIcon
} from './styledComponents'

const FriendItem = (props) => (
    <FriendItemWrapper onClick={props.selectFriend.bind(null, props.nickname)}>
        <ItemTopBlock>
            <Name>{`${props.name || ''} ${props.lastName || ''}`}</Name>
            <Nickname>{`${props.nickname || ''}`}</Nickname>
        </ItemTopBlock>
        <ItemBottomBlock>
            <City>{props.city || ''}</City>
        </ItemBottomBlock>
        <Icon imgSrc={props.image} />
        <Flag className={`flag flag-${props.country ? props.country.toLowerCase() : ''}`} />
        {props.blocked ? <BlockIcon /> : null}
    </FriendItemWrapper>
)

export default FriendItem
