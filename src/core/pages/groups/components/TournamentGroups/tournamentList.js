import React from 'react'

import {
    TournamentListWrapper,
} from './styledComponents'

import TournamentItem from './tournamentItem'

const TournamentList = (props) => (
    <TournamentListWrapper>
        <div className='scrollable-wrapper'>
            {
                props.tournamentList.map((tournament) => (
                    <TournamentItem
                        selectGroupHandler={props.selectGroupHandler}
                        key={tournament.groupId}
                        groupId={tournament.groupId}
                        name={tournament.name}
                        buddyCount={tournament.buddyCount}
                        image={props.cdnMedia + tournament.image}
                        isMyGroup={tournament.ownerUserId === props.userId}
                        group={tournament}
                    />
                ))
            }
        </div>
    </TournamentListWrapper>
)

export default TournamentList;
