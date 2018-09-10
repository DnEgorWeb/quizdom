import React from 'react'
import e from '../../../../../../../langs';

import {
    EnemySectionTitle,
    RegionSelectorWrapper,
    GermanRegion,
    AllRegions,
} from './styledComponents'

const EnemySection = (props) => (
    <div>
        <EnemySectionTitle>{e.game_duelOpponents}</EnemySectionTitle>
        <RegionSelectorWrapper>
            <GermanRegion
                onClick={props.selectMyRegion}
                isActive={props.isMyRegionActive}
            />
            <AllRegions
                onClick={props.selectWorldRegion}
                isActive={!props.isMyRegionActive}
            />
        </RegionSelectorWrapper>
    </div>
)

export default EnemySection;
