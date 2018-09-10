import React from 'react'
import {
    PictureComponentTile,
    PictureBlockImage,
} from './styledComponents'

const PictureBlock = ({title = 'Title', imgSrc, blur}) => {
    return (
        <div>
            <PictureComponentTile>{title}</PictureComponentTile>
            <PictureBlockImage blur={blur} imageSrc={imgSrc} />
        </div>
    )
}

export default PictureBlock;