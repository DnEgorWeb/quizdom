import React from 'react'

import styled from 'styled-components'
import TopBar from '../../../../../../modules/components/GameResultsTopBar'
import ResultItem from './ResultItem'

const Wrapper = styled.div``

const ResultsList = ({
    openMainMenu,
    finishedTournaments,
    close,
    results,
    cdnMedia,
    showResult,
    getTournamentResults,
    tournamentResults,
    getMultiplayerResults,
    userId
}) => {
    return (
        <Wrapper style={{height: '100%', overflow: 'hidden', width: '100%'}}>
            <div style={{height: '100%', overflow: 'auto', width: '102%'}}>
                <TopBar caption="TURNIER ERGEBNISE"
                        leftButtonClickHandler={openMainMenu}
                        rightButtonClickHandler={close}/>
                {
                    finishedTournaments.map((tournament, index) => {
                        return <ResultItem key={tournament.gameInstanceId}
                                           cdnMedia={cdnMedia}
                                           tournament={tournament}
                                           showResult={showResult}
                                           index={index}
                                           tournamentResults={tournamentResults}
                                           getTournamentResults={getTournamentResults}
                                           getMultiplayerResults={getMultiplayerResults}
                                           results={results}
                                           userId={userId} />
                    })
                }
            </div>
        </Wrapper>
    )
}

export default ResultsList