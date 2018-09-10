import React from 'react'
import e from '../../../../../../../langs';

import {
    GameCategoryWrapper,
    IconWrapper,
    Icon,
    GameTitle,
    InfoAboutWinningsComponent,
} from './styledComponents'

import {SeparatorLineVert} from '../../../../../../modules/components/SeparatorLine'

import getFullPath from '../../../../../../../services/fullPathForPoolIcon'

const GameCategory = (props) => (
    <GameCategoryWrapper onClick={props.onSelect}>
        <IconWrapper isSpecialGame={props.isSpecialGame}>
            <Icon src={props.isSpecialGame ? props.assignedPoolsIcons : getFullPath(props.assignedPoolsIcons[0])} />
        </IconWrapper>
        <GameTitle>{props.title}</GameTitle>
        <InfoAboutWinningsComponent hasWinningComponents={props.hasWinningComponents} >
            <SeparatorLineVert margin='0 0 7px 0' />
            {e.game_withCompetition}
        </InfoAboutWinningsComponent>
    </GameCategoryWrapper>
)

export default GameCategory;
