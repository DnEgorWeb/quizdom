import React from 'react'
import e from '../../../../langs'

import ProfilePicture from '../../../modules/components/ProfilePicture/components'

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
    BlockOption,
    FavoritOption,
    TrashOption,
    AddOption,
} from './styledComponents'

const FriendOverview = (props) => (
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
            {
                props.view === 'friends' ?
                    <BlockOption
                        checked={props.blocked}
                        onClick={props.blockOrUnblockPlayer}
                    >
                        <div className={props.blocked ? '' : 'highlight'}>{e.myfriends_approved}</div>
                        <div className={props.blocked ? 'highlight' : ''}>{e.myfriends_blocked}</div>
                    </BlockOption>
                    :
                    null
            }

            {
                props.view === 'friends' || props.view === 'favorite' ?
                    <FavoritOption
                        checked={props.favorite}
                        onClick={props.changeFavoriteStatus}
                    >
                        <div className={props.favorite ? 'highlight' : ''}>{e.myfriends_favourite}</div>
                    </FavoritOption>
                    :
                    null
            }

            {
                props.view === 'friends' ?
                    <TrashOption
                        checked={props.trash}
                        onClick={props.removeFriend}
                    >
                        <div className={props.trash ? 'highlight' : ''}>{e.myfriends_deleteFriend}</div>
                        <div className='info'>{e.myfrinds_friendIsNotInformed}</div>
                    </TrashOption>
                    :
                    null
            }

            {
                props.view === 'all' ?
                    <AddOption
                        checked={props.isFriend}
                        onClick={props.changeIsFriendOption}
                    >
                        <div className={props.isFriend ? 'highlight' : ''}>{e.myfriends_addToFriends}</div>
                    </AddOption>
                    :
                    null
            }

        </FunktionalityBlock>
    </FriendOverviewWrapper>
)

export default FriendOverview;
