import React from 'react'
import e from '../../../../../langs'

import {
    TopPanelWrapper,
    GroupImageWrapper,
    Image,
    AboveGlass,
    InfoButtonWrapper,
    InfoButton,
    UpdateButtonWrapper,
    UpdateButton,
    LoadImageLinkWrapper,
    LoadImageLink,
} from './styledComponents'

const TopPanel = (props) => (
    <TopPanelWrapper>
        <GroupImageWrapper
            onClick={props.openCamera}
            imgSrc={props.imgSrc}
        >
            <Image
                imgSrc={props.imgSrc || props.currentImgSrc}
            />
            <AboveGlass />
        </GroupImageWrapper>

        <InfoButtonWrapper>
            <InfoButton onClick={props.openInfoPanel} />
        </InfoButtonWrapper>

        <UpdateButtonWrapper>
            <label>
                <UpdateButton />
                <input
                    type='file'
                    style={{display: 'none'}}
                    onChange={props.handleImageChange}
                />
            </label>
        </UpdateButtonWrapper>

        <LoadImageLinkWrapper>
            <LoadImageLink>
                {e.group_groupsPicture}
            </LoadImageLink>
        </LoadImageLinkWrapper>
    </TopPanelWrapper>
)

export default TopPanel
