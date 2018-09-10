import React from 'react'
import e from '../../../../../langs'

import {
    GroupsDetailsButtonsPannelWrapper,
    GroupTitle,
} from './styledComponents'

import {
    Highlighter
} from '../Intro/styledComponents'

import {
    Text,
    PlusButtonWrapper,
    PlusButton,
    InfoButtonWrapper,
    // InfoButton,
} from '../../../myFriends/components/styledComponents'

import MasterItem from './masterItem'
import InfoButton from '../../../../modules/components/InfoButton/InfoButtonContainer'

/**
 * // todo: временный вариант фильтрации групп
 * Парсинг названия группы.
 *
 * @param name {String}
 * @returns {String}
 */
function getCurrentName(name) {
    let correctName = name;

    try{
        correctName = JSON.parse(name).name;
    }catch(e){
        console.log(e.message);
    }

    return correctName !== undefined ? correctName : name;
}

const MasterPanel = (props) => (
    <GroupsDetailsButtonsPannelWrapper>
        <GroupTitle>
            <Highlighter color='#ff7f00'>{`${e.group_master} |`}</Highlighter>
            {` ${props.group.buddyCount} | ${getCurrentName(props.group.name)}`}
        </GroupTitle>
        {
            props.masterProfile ?
                <MasterItem
                    selectHandler={props.selectMasterHandler}
                    name={props.masterProfile.fullName || props.masterProfile.name}
                    nickname={props.masterProfile.nickname}
                    image={(props.cdnMedia + props.masterProfile.image).replace(/\/\//g, '/')}
                    country={props.masterProfile.address.country}
                    playerSettings={props.playerSettings}
                />
                :
                null
        }
        <Text>
            {e.group_addPlayer}
            <PlusButtonWrapper>
                <PlusButton onClick={props.plusButtonClickHandler} />
            </PlusButtonWrapper>
            <InfoButtonWrapper>
                <InfoButton
                    style={{margin: 0}}
                    title='Info'
                    titleStyle={{color: 'rgb(255,127,0)'}}
                    noTitlePicture
                    component={<div>text</div>}
                />
            </InfoButtonWrapper>
        </Text>
    </GroupsDetailsButtonsPannelWrapper>
)

export default MasterPanel;
