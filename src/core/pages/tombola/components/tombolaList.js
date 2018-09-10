import React from 'react'
import decorator from "../../voucher/components/decorators";

import Carousel from 'nuka-carousel'

import {
    CarouselWrapper,
} from './styledComponents'

import TombolaSlide from './tombolaSlide'

const TombolaList = (props) => (
    <CarouselWrapper>
        <Carousel
            slideIndex={props.slideIndex}
            decorators={decorator}
            beforeSlide={props.beforeSlide}
            wrapAround
        >
            {props.tombolaList.map(tombola => {
                return (
                    <TombolaSlide key={tombola.id} tombola={tombola} cdnMedia={props.cdnMedia} />
                )
            })}
        </Carousel>
    </CarouselWrapper>
)

export default TombolaList;
