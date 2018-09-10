import React from 'react'

import {
    PlayerItemWrapper,
    ItemTopBlock,
    ItemBottomBlock,
    Icon,
    Flag,
    Name,
    Nickname,
    City,
} from './styledComponents'

const PlayerItem = (props) => (
    <PlayerItemWrapper onClick={props.selectPlayerHandler.bind(null, props.nickname)}>
        <ItemTopBlock>
            {props.name === props.nickname ?
                <Name style={{marginTop: '30px'}}>{`${props.name || ''} ${props.lastName || ''}`}</Name>
                :
                <React.Fragment>
                    <Name>{`${props.name || ''} ${props.lastName || ''}`}</Name>
                    <Nickname>{`${props.nickname || ''}`}</Nickname>
                </React.Fragment>
            }
        </ItemTopBlock>
        <ItemBottomBlock>
            <City>{props.city || ''}</City>
        </ItemBottomBlock>
        <Icon imgSrc={props.image} />
        <Flag className={`flag flag-${props.country ? props.country.toLowerCase() : ''}`} />
    </PlayerItemWrapper>
)

export default PlayerItem
