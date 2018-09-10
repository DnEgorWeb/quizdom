import React from 'react'
import e from '../../../../../../langs';
import TopBar from '../../../../../modules/components/GameResultsTopBar'
import url from "../../../../../../constants/urlConstants"
import {
    DecoratedLink,
    Title,
    Separator,
    Text,
    SectionButton,
    YellowText,
    HeadText
} from '../../duel/components/styledComponents'

const MainMenu = ({finishedTournaments = [], gameList = [], openResults, close, goBack}) => {
    return (
        <div>
            <TopBar
                leftButtonClickHandler={goBack}
                rightButtonClickHandler={close}
                caption={e.game_tournamentsOpen.toUpperCase()} />
            <HeadText>{e.game_tournamentSelection}</HeadText>
            <SectionButton src='images/tournament-alarm.png'>
                <Title>{e.game_startTournament}</Title>
                <Separator />
                <Text>
                    {e.game_tournaments} | <YellowText>0</YellowText> | <YellowText>0</YellowText>
                </Text>
            </SectionButton>
            <DecoratedLink to={url.game.tournament.quick}>
                <SectionButton src='images/tournament_finish.png'>
                    <Title>{e.game_quickTournaments}</Title>
                    <Separator />
                    <Text>
                        {e.game_tournaments} | <YellowText>{gameList.length}</YellowText>
                    </Text>
                </SectionButton>
            </DecoratedLink>
            <SectionButton src='images/tournament_cross.png'>
                <Title>{e.game_tipTournaments}</Title>
                <Separator />
                <Text>
                    {e.game_tournaments} | <YellowText>0</YellowText>
                </Text>
            </SectionButton>
            <SectionButton src='images/30010_START_Duel_Basic_ERGEBNISSE.png' onClick={openResults}>
                <Title>{e.game_results}</Title>
                <Separator />
                <Text>
                    {e.game_tournamentsOpen} | <YellowText>{finishedTournaments.length}</YellowText>
                </Text>
            </SectionButton>
        </div>
    )
}

export default MainMenu