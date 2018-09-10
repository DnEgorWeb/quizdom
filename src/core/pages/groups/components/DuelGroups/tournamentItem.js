import React from 'react'

import {
    TournamentItemWrapper,
} from './styledComponents'

import {
    PlayerItemWrapper,
    ItemTopBlock,
    Name,
    Nickname,
    ItemBottomBlock,
    City,
    Icon
} from '../../../../modules/components/PlayerListComponents/styledComponents'

const TournamentItem = (props) => (
    <TournamentItemWrapper onClick={props.selectGroupHandler.bind(null, props.group, props.isMyGroup)}>
        <PlayerItemWrapper>
            <ItemTopBlock noArrow={props.noArrow}>
                <Name>{props.name}</Name>
                <Nickname>{`Teilnehmer: ${props.buddyCount}`}</Nickname>
            </ItemTopBlock>
            <ItemBottomBlock style={props.isNew ? {paddingLeft: 340, background: 'url(images/group-new.png) left 193px top no-repeat, rgb(217,217,217)'} : null}>
                <City>{props.isMyGroup ? 'Master' : ''}</City>
            </ItemBottomBlock>
            <Icon imgSrc={props.image} />
        </PlayerItemWrapper>
    </TournamentItemWrapper>
)

export default TournamentItem
