import React from 'react'
import url from '../../../../../constants/urlConstants'
import e from '../../../../../langs'

import {
    TournamentGroupWrapper,
} from './styledComponents'

import TopBar from '../../../../modules/components/TopBar'

import GroupList from './GroupList/GroupListContainer'


import {
    ButtonPanelWrapper,
    ButtonWrapper,
    CreateTournamentButton,
    ButtonText,
    TournamentGroupLabel,
} from './styledComponents'

import InfoButton from '../../../../modules/components/InfoButton/InfoButtonContainer'

import { SeparatorLineVert } from '../../../../modules/components/SeparatorLine'

class TournamentGroup extends React.Component {
    constructor(props) {
        super(props);
        e.setLanguage(props.language);
    }
    
    componentWillReceiveProps(nextProps) {
        e.setLanguage(nextProps.language);
    }

    goToCreateGroupPage = () => {
        this.props.history.push(url.groups.create)
    }

    render() {
        return (
            <TournamentGroupWrapper>
                <TopBar
                    back={this.props.back}
                    caption={e.group_competitionGroups}
                />

                <ButtonPanelWrapper>

                    <ButtonWrapper>
                        <CreateTournamentButton
                            onClick={() => this.props.goToCreateGroup("tournament")}
                            imgSrc='images/all--active.png'
                        />
                        <ButtonText>
                            {e.formatString(e.group_createANewTournamentGroup, <br/>)}
                        </ButtonText>
                        <InfoButton
                            title='Info'
                            titleStyle={{color: 'rgb(255,127,0)'}}
                            noTitlePicture
                            component={<div>text</div>}
                        />
                    </ButtonWrapper>

                    <SeparatorLineVert style={{marginTop: 25}} />

                    <TournamentGroupLabel>{e.group_myTournaments}:</TournamentGroupLabel>

                </ButtonPanelWrapper>

                <GroupList selectGroupHandler={() => this.props.goToGroupDetails('tournament')} view={this.props.view}/>

            </TournamentGroupWrapper>
        )
    }
}

export default TournamentGroup
