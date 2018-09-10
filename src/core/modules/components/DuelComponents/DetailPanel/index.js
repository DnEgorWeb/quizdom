import React from 'react'
import e from '../../../../../langs';

import {
    DetailsPanelWrapper,
    LeftPictureProfile,
    DetailsPanelLabel,
    RightPictureProfile,
} from './styledComponents'

const DetailPanel = ({type = 'tie', leftPicture = '', rightPicture = ''}) => (
    <DetailsPanelWrapper>
        <LeftPictureProfile
            type={type}
            imgSrc={leftPicture}
        />
        <DetailsPanelLabel>{e.module_details}</DetailsPanelLabel>
        <RightPictureProfile
            type={type === 'win' ? 'lose' : type === 'lose' ? 'win' : 'tie'}
            imgSrc={rightPicture}
        />
    </DetailsPanelWrapper>
);

export default DetailPanel;
