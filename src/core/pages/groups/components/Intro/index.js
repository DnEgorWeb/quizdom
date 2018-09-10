import React from 'react'
import url from '../../../../../constants/urlConstants'
import e from '../../../../../langs'

import TopBar from '../../../../modules/components/TopBar'

import {
    GroupsWrapper,
    TopPanel,
    BottomPanel,
    Panel,
    GameTypeBlock,
    Text,
    DecoratedLink,
    Highlighter,
} from './styledComponents'

class Intro extends React.Component {
    constructor(props) {
        super(props);
        // props.initGroups();
        e.setLanguage(props.language);
    }

    componentWillReceiveProps(nextProps) {
        e.setLanguage(nextProps.language);
    }

    goToDashboard = () => {
        this.props.history.push(url.dashboard.index)
    }

    render() {
        return (
            <GroupsWrapper>
                <TopBar
                    back={this.goToDashboard}
                    caption={e.group_groups}
                />
                <TopPanel>
                    <Panel>
                        <GameTypeBlock onClick={this.props.goToTournamentGroups} imgUrl='images/turnier-game.png'>
                            {e.formatString(e.group_tournamentGroups, <br/>)}
                        </GameTypeBlock>
                        <GameTypeBlock onClick={this.props.goToDuelGroups} imgUrl='images/duell-game.png'>
                            {e.formatString(e.group_duelingGroups, <br/>)}
                        </GameTypeBlock>
                    </Panel>
                </TopPanel>
                <BottomPanel>
                    <DecoratedLink to={url.groups.tournament}>
                        <Text>
                            {
                                this.props.groupTournamentList && this.props.groupTournamentList.length > 0 ?
                                    <span>{
                                        e.formatString(
                                            e.group_youAreInvitedToNewTournamentGroups,
                                            <br/>,
                                            <Highlighter className='yellow'>{
                                                this.props.groupTournamentList.length
                                            }</Highlighter>
                                        )
                                    }</span>
                                    :
                                    <span>{e.group_hereYouCanInviteNewTournamentGroups}</span>
                            }
                        </Text>
                    </DecoratedLink>
                    <Text to={url.groups.tournament}>{
                            this.props.groupDuelList && this.props.groupDuelList.length > 0 ?
                                <span>{
                                    e.formatString(
                                        e.group_hereYouCanCreateNewDuelGroups,
                                        <br/>,
                                        <Highlighter className='yellow'>{
                                            this.props.groupDuelList.length
                                        }</Highlighter>
                                    )
                                }</span>
                                :
                                <span>{e.group_hereYouCanInviteNewDuellGroups}</span>
                    }</Text>
                </BottomPanel>
            </GroupsWrapper>
        )
    }
}

export default Intro;