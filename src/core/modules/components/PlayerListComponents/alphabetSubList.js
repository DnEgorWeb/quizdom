import React from 'react'

import {
    AlphabetSubListWrapper,
    ColorBox,
    Letter,
    LineBlock,
} from './styledComponents'

import {SeparatorLineVert} from '../SeparatorLine'

const AlphabetSubList = (props) => (
    <div>
        <AlphabetSubListWrapper>
            <ColorBox rectangleColor={props.rectangleColor} />
            <Letter noLine={props.noLine}>{props.letter}</Letter>
            {
                props.noLine ?
                    null
                    :
                    <LineBlock noLine={props.noLine}>
                        <SeparatorLineVert style={{margin: '37px 0 0 0', background: 'linear-gradient(to bottom, #c4c4c4 50%, white 50%)'}} />
                    </LineBlock>
            }
        </AlphabetSubListWrapper>
        {props.children}
    </div>
)

export default AlphabetSubList;
