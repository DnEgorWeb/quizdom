import React from 'react'
import e from '../../../../../langs'

import {
    GroupConfiguratorWrapper,
    GroupConfiguratorOption,
} from './styledComponents'

const GroupConfigurator = (props) => (
    <GroupConfiguratorWrapper>
         <GroupConfiguratorOption
             onClick={props.configureGroup}
             imgSrc='images/Slider-Icons_B07b_.png'
         >
             {e.formatString(
                 e.group_tournamentGroupProfileChange,
                 <br/>
             )}
         </GroupConfiguratorOption>
         <GroupConfiguratorOption
             onClick={props.deleteGroupHandler}
             imgSrc='images/Slider-Icons_B03b_.png'
         >
             {e.formatString(
                 e.group_tournamentGroupDelete,
                 <br/>
             )}
         </GroupConfiguratorOption>
    </GroupConfiguratorWrapper>
)

export default GroupConfigurator;
