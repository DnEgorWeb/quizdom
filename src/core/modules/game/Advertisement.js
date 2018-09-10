import React from 'react'
import e from '../../../langs'
import styled from 'styled-components'

import { getAdvertisement } from './gameServices'

const AdvertisementWrapper = styled.div`
    background-color: #323232;
`
const AdvertisementPictureWrapper = styled.div`
    padding: 24px 20px;
    width: 710px;
    //height: 827px;
    margin-left: auto;
    margin-right: auto;
    border-top: 3px solid #919192;
    border-radius: 15px;
    box-sizing: border-box;
    background: linear-gradient(to bottom, #575759, #323232);
    text-align: center;
	overflow: hidden;

    img{
        box-sizing: border-box;
        margin: auto;
        object-position: top;
        object-fit: cover;
        height: 827px;
        width: 670px;
        border: 4px solid rgb(230,230,230);
        border-radius: 9px;
    }
`

const Statistic = styled.div`
    margin-top: 60px;
    display: flex;
    justify-content: center;
    align-content: center;
    height: 118px;

    p{
    	width: 125px;
        height: 118px;
        margin-top: 0;
        margin-bottom: 0;
        padding-top: 20px;
        font-size: 32px;
        font-family: Univers-condensed, sans-serif;
        text-transform: uppercase;
        color: #e6e6e6;
    }
    & > * { margin-right: 15px; }
    & > *:last-child { margin-right: 0; }
`

const LoadingStatistic = styled(Statistic)`
    justify-content:center;
`

const StatisticItem = styled.div`
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 204px;
    height: 118px;
    text-align: center;
    font-family: Univers-condensed, serif;
    font-size: 62px;
    font-weight: bold;
    color: #1ff2ff;
    background-image: linear-gradient(to bottom, rgb(72,72,75), rgb(42,39,42));
    margin-top: 0;
    margin-bottom: 0;
    border-top: 2px solid grey;
    box-sizing: border-box;
`

export default class Advertisment extends React.Component{
    constructor(props){
        super(props)
        e.setLanguage(props.language)

        getAdvertisement(props.advertisement.advertisementBlobKey, this.setAdvertisement)
        setTimeout(props.showAdvertisement, 5000);
    }

	state = {
		advertisement: {}
	}

    componentWillReceiveProps(nextProps) {
        e.setLanguage(nextProps.language)
    }

    setAdvertisement = (advertisement) => {
        this.setState({advertisement: advertisement})
    }

    render(){
	    const imgUrl = `${window.config.urls.ADVERTISEMENT_LINK}` + this.state.advertisement.normalImage

        return(
            <AdvertisementWrapper>
                {this.props.loading ?
                    <Statistic>
                        <p style={{textAlign: 'right'}}>{e.game_lastEntry}</p>
                        <StatisticItem style={{fontFamily: 'Aharoni', fontSize: '92px'}}>{this.props.answerLetter || 'X'}</StatisticItem>
                        <StatisticItem>{this.props.answerTime ? `${this.props.answerTime} sec` : ''}</StatisticItem>
                        <p style={{textAlign: 'left'}}>{e.game_answerTime}</p>
                    </Statistic>
                    :
                    <LoadingStatistic>
                        <p style={{textAlign: 'right'}}>{e.formatString(e.game_loadingPercent, <br />)}</p>
                        <StatisticItem style={{fontFamily: 'Aharoni', marginRight: '125px', fontSize: '90px'}}>{'80%'}</StatisticItem>
                    </LoadingStatistic>
                }

                <AdvertisementPictureWrapper>
                {this.state.advertisement.normalImage ?
                    <img src={imgUrl} alt="advertisment"/>
                    :
                    null
                }
                </AdvertisementPictureWrapper>
            </AdvertisementWrapper>
        )
    }
}
