import React from 'react'
import moment from "moment/moment";

import convertIdToURL from "../../../../services/convertIdToURL";
import {
    VoucherSliderWrapper
} from './styledComponents'
import DrawDate from './drawDate'

const TombolaSlide = props => {
    const dateString = props.tombola ? props.tombola.targetDate : '';
    const imgSrc = convertIdToURL(props.cdnMedia, 'tombola', props.tombola && props.tombola.imageId)() || '';
    const dateCollection = {
        dayOfWeek: '',
        date: '',
        time: ''
    }
    if (dateString) {
        const dateObj = moment(dateString);
        dateCollection.dayOfWeek = dateObj.format('dddd').toUpperCase();
        dateCollection.date = dateObj.format('DD.MM.YYYY')
        dateCollection.time = dateObj.format('kk:mm')
    }

    return (
        <VoucherSliderWrapper>
            <DrawDate
                title={props.tombola.name}
                dayOfWeek={dateCollection.dayOfWeek}
                date={dateCollection.date}
                time={dateCollection.time} />
	        <img src={imgSrc} alt={props.tombola.name} className='tombola-picture'/>
        </VoucherSliderWrapper>
    )
}

export default TombolaSlide;
