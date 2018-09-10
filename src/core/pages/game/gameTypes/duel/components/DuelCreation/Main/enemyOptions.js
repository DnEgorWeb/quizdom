import React from 'react'
import e from '../../../../../../../../langs';

import ProfilePicture from '../../../../../../../modules/components/ProfilePicture/components'

import {
    FriendOverviewWrapper,
    ProfileBlock,
    FunktionalityBlock,
    PictureBlock,
    TextBlock,
    FlagBlock,
    Name,
    Country,
    Nickname,
    Option,
} from '../../../../../../myFriends/components/styledComponents'

const EnemyOptions = (props) => (
    <FriendOverviewWrapper>
        <ProfileBlock>
            <PictureBlock>
                <ProfilePicture
                    level={props.handicap}
                    pictureUrl={props.image}
                    size={285}
                />
            </PictureBlock>
            <TextBlock>
                <Name>{`${props.name || ''} ${props.lastName || ''}`}</Name>
                <Country>{props.city || ''}</Country>
                <Nickname color='#ff7f00'>{props.nickname || ''}</Nickname>
            </TextBlock>
            <FlagBlock className={`${props.country ? 'flag flag-' + props.country.toLowerCase() : ''}`} />
        </ProfileBlock>
        <FunktionalityBlock view={props.view}>
            <Option
                imgSrc={props.paused ? 'images/Slider-Icons_B02b_.png' : 'images/Slider-Icons_B06b_.png'}
                onClick={props.pauseEnemyInvitation}
            >
                <div>{e.game_invitations}</div>
                <div>{e.game_toBlock}</div>
            </Option>
            <Option
                imgSrc={'images/Slider-Icons_B07b_.png'}
                onClick={props.goToAddFriend}
            >
                <div>{e.game_opponent}</div>
                <div>{e.game_exchange}</div>
            </Option>
            <Option
                imgSrc={'images/Slider-Icons_B03b_.png'}
                onClick={props.removeEnemy}
            >
                <div>{e.game_removeInvitation}</div>
            </Option>

        </FunktionalityBlock>
    </FriendOverviewWrapper>
)

export default EnemyOptions;
