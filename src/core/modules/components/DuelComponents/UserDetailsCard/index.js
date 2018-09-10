import React from 'react'

import {
    UserDetailsKarteWrapper,
    TopPanel,
    BottomPanel,
    ProfilePicture,
    Name,
    Nickname,
    City,
    Flag,
} from './styledComponents'

const UserDetailsCard = ({userInfo = {}, cdnMedia}) => (
    <UserDetailsKarteWrapper>
        <TopPanel>
            {
                userInfo.firstName ?
                    <Name>{`${userInfo.firstName || ''} ${userInfo.lastName || ''}`}</Name>
                    :
                    null
            }
            <Nickname hasFirstName={userInfo.firstName}>{`${userInfo.nickname}`}</Nickname>
        </TopPanel>
        <BottomPanel>
            <City>{userInfo.city}</City>
        </BottomPanel>
        <ProfilePicture
            imgSrc={`${cdnMedia}profile/${( localStorage.getItem('avatarImage') || `${userInfo.userId}.jpg` )}`}
        />
        <Flag className={`flag flag-${userInfo.country ? userInfo.country.toLowerCase() : 'de'}`} />
    </UserDetailsKarteWrapper>
)

export default UserDetailsCard
