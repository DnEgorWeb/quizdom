import React from 'react'

import ScrollableWrapper from '../../../../../../modules/components/ScrollableWrapper'

import GroupItem from './GroupItem'

class GroupList extends React.Component {
    constructor(props) {
        super(props);
        props.initGroups();
    }

    selectGroupHandler = (groupId) => {
        this.props.setCurrentGroupId(groupId);
        this.props.selectGroupHandler();
    }

    render() {
        const groupList = (this.props.view === "GROUPS_TOURNAMENT" ? this.props.groupTournamentList : this.props.groupDuelList) || [];

        return (
            <ScrollableWrapper
                height="921px"
                loadList={(offset) => {this.props.initGroups(offset)}}
                total={100}
            >
                {
                    groupList.map((group) => (
                        <GroupItem
                            selectGroupHandler={() => this.selectGroupHandler(group.groupId)}
                            key={group.groupId}
                            groupId={group.groupId}
                            name={group.name}
                            buddyCount={group.buddyCount}
                            image={group.image}
                            isMyGroup={group.ownerUserId === this.props.userId}
                            group={group}
                        />
                    ))
                }
            </ScrollableWrapper>
        )
    }
}

export default GroupList;
