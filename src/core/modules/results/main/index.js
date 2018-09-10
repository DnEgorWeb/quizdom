import React from 'react'

import MainSingle from './mainSingle/MainContainer'
import MainDuel from './mainDuel/MainDuelContainer'
import MainTournament from './mainTournament/MainContainer'

const Main = (props) => {
    if (props.isSecondPlayer && (props.type !== 'tournament') && (props.type !== 'quiz24')) {
        return <MainDuel {...props} />
    } else {
        if ((props.gameType === 'TOURNAMENT') || (props.type === 'tournament') || props.isTournament) {
            return <MainTournament {...props} />
        } else {
            return <MainSingle {...props} />
        }
    }
}

export default Main;
