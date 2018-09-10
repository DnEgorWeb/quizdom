import React from 'react'
import e from '../../../../../langs'

import ProfilePicture from '../../../../modules/components/ProfilePicture/components'

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
    TrashOption,
} from '../../../myFriends/components/styledComponents'

const PlayerDescription = (props) => (
    <FriendOverviewWrapper>
        <ProfileBlock>
            <PictureBlock>
                <ProfilePicture
                    level={props.profile.handicap}
                    pictureUrl={(props.cdnMedia + props.profile.image).replace(/\/\//g, '/')}
                    size={285}
                />
            </PictureBlock>
            <TextBlock>
                <Name>{`${props.profile.name || ''} ${props.profile.lastName || ''}`}</Name>
                <Country>{props.profile.city || ''}</Country>
                <Nickname color='#ff7f00'>{props.profile.nickname || ''}</Nickname>
            </TextBlock>
            <FlagBlock className={`${props.profile.country ? 'flag flag-' + props.profile.country.toLowerCase() : ''}`} />
        </ProfileBlock>
        <FunktionalityBlock view={'trash'}>
            <TrashOption
                checked={true}
                onClick={props.groupRemovePlayers.bind(null, props.profile.userId)}
            >
                <div className={'highlight'}>{e.group_outOfGroup}</div>
                <div className='info'>
                    {e.formatString(
                        e.group_groupMembersWillNotInform,
                        <br/>
                    )}
                </div>
            </TrashOption>
        </FunktionalityBlock>
    </FriendOverviewWrapper>
)

export default PlayerDescription;
