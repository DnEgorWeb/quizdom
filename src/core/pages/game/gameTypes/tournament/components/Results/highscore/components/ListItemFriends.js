import React, {Component} from 'react'
import e from '../../../../../../../../../langs';
import {MainInfo, ExtendedUserBlock, UserName, Nickname, ExtendedAddress, ExtendedStatistics, ExtendedUserPhoto,
    ExtendedFlagWrapper, Flag, VerticalSeparator, Medal} from './styles/rates'
import '../../../../../../../../modules/components/CountrySelector/flags.css'

export default class ListItem extends Component {
    state = {
        photoUrl: "images/Anonymus.png"
    }

    componentDidMount() {
        const {userId, cdnMedia} = this.props
        const pictureUrl = `${cdnMedia}profile/${userId}.jpg?crossorigin`

        return fetch(pictureUrl, {'cache-control':'no-cache'})
            .then(response => {
                if (response.status === 403) {
                    throw new Error('forbidden')
                }
                return response.url
            })
            .then(url => {
                this.setState({
                    photoUrl: url
                })
            })
            .catch(error => {
                console.error(error.message)
            })
    }

    render() {
        const {data, index} = this.props
        const leadersAmount = 3;
        const indexOffset = 1;

        return data.address ?
            <ExtendedUserBlock>
                <MainInfo>
                    <UserName style={{color: "#dbdbdb", marginBottom: '20px'}}>{data.name}</UserName>
                    <Nickname style={{color: "#7a7a7a"}}>{data.nickname}</Nickname>
                </MainInfo>
                <ExtendedAddress>
                    <p style={{color: "#333333"}}>{`${data.address.city || 'Hometown'}`}</p>
                </ExtendedAddress>
                <ExtendedStatistics style={index<leadersAmount ? null : {alignItems: "center"}}>
                    <div>
                        <span>{e.game_points}</span>
                        <span style={{color: "#333333", fontWeight: "bold"}}>{data.gamePointsWithBonus || 0}</span>
                        {index<leadersAmount ?
                            null
                            :
                            <div style={{display: "inline-block"}}>
                                <VerticalSeparator style={{marginBottom: "5px"}}/>
                                <span style={{color: "#777777", marginLeft: 0}}>{e.game_position}</span>
                                <span style={{color: "#333333"}}>{index+1}</span>
                            </div>
                        }
                    </div>
                </ExtendedStatistics>
                <ExtendedUserPhoto profileURL={this.state.photoUrl} />
                <ExtendedFlagWrapper><Flag value={data.address.country} /></ExtendedFlagWrapper>
                {index<leadersAmount ?
                    <Medal src={`images/yellowplace${index+indexOffset}.png`} alt=""/>
                    :
                    null
                }
            </ExtendedUserBlock>
            :
            null
    }
}