import React from 'react'
import e from '../../../../../../../../langs';

import {
    GroupsWrapper,
    TopPanel,
    GroupListWrapper,
} from './styledComponents'

import TournamentItem from '../../../../../../groups/components/TournamentGroups/tournamentItem'
import TopBar from '../../../../../../../modules/components/TopBar'

class Groups extends React.Component {
    constructor(props) {
        super(props);
        this.props.initGroups();

        if(props.language) e.setLanguage(props.language)
        
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.language) e.setLanguage(nextProps.language)
    }

    render() {
        const pageTitle = this.props.title;
        const duelGroupList = this.props.groupList;

        return (
            <GroupsWrapper>
                <TopBar
                    caption={pageTitle}
                    back={this.props.goToMain}
                />
                <TopPanel>
                    <div className='big'>{e.game_chooseADuelGroup}</div>
                    {e.game_youCanInviteUpTo4Groups}
                </TopPanel>
                <GroupListWrapper>
                    <div className='scrollable-wrapper'>
                        {
                            duelGroupList.map((group) => {
                                return (
                                    <TournamentItem
                                        noArrow
                                        selectGroupHandler={this.props.selectGroupHandler}
                                        key={group.groupId}
                                        group={group}
                                        name={group.name}
                                        buddyCount={group.buddyCount}
                                        image={this.props.cdnMedia + group.image}
                                        isMyGroup={group.ownerUserId === this.props.userId}
                                    />
                                )
                            })
                        }
                    </div>
                </GroupListWrapper>
            </GroupsWrapper>
        )
    }
}

export default Groups;
