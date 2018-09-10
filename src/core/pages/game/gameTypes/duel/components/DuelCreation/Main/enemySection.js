import React from 'react'
import e from '../../../../../../../../langs';

import {
    EnemySectionTitle,
    EnemyListWrapper,
    EnemyPicture,
    AddButton,
} from './styledComponents'

const EnemySection = (props) => (
    <div>
        <EnemySectionTitle>{e.game_duelOpponents}</EnemySectionTitle>
        <EnemyListWrapper>
            {
                props.enemyList.map((enemy, index) => (
                    <EnemyPicture
                        paused={enemy && props.pausedEnemyIds.indexOf(enemy.userId) !== -1}
                        key={enemy ? enemy.image : index}
                        imgSrc={enemy && (props.cdnMedia + enemy.image).replace(/\/\//g, '/')}
                        onClick={enemy ? props.selectEnemy.bind(null, enemy.userId) : props.goToAddFriend.bind(null, index)}
                    />
                ))
            }
            <AddButton imgSrc={'images/add-enemy.png'} onClick={props.goToGroups} />
        </EnemyListWrapper>
    </div>
)

export default EnemySection;
