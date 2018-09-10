import React from 'react'

import {
    PlayerItemWrapper,
    ItemTopBlock,
    Name,
    Nickname,
    ItemBottomBlock,
    City,
    Icon,
    Flag,
} from '../../../../modules/components/PlayerListComponents/styledComponents'

const MasterItem = (props) => (
    <PlayerItemWrapper onClick={props.selectHandler}>
        <ItemTopBlock style={{backgroundColor: 'rgb(80,80,82)'}}>
            {props.playerSettings.showFullName ?
                <React.Fragment>
                    <Name>{`${props.name || ''} ${props.lastName || ''}`}</Name>
                    <Nickname>{`${props.nickname || ''}`}</Nickname>
                </React.Fragment>
            :
                <Nickname style={{marginTop:'30px', color:'white'}}>{`${props.nickname || ''}`}</Nickname>
            }
        </ItemTopBlock>
        <ItemBottomBlock>
            <City>{props.city || ''}</City>
        </ItemBottomBlock>
        <Icon imgSrc={props.image} />
        <Flag className={`flag flag-${props.country ? props.country.toLowerCase() : ''}`} />
    </PlayerItemWrapper>
)

export default MasterItem;
