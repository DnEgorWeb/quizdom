import React, {Component} from 'react'
import e from '../../../../langs'
import {
    MainInfo, ExtendedUserBlock, UserName, Nickname, ExtendedAddress, ExtendedStatistics, ExtendedUserPhoto,
    ExtendedFlagWrapper, Flag, VerticalSeparator, ChampionLabel, Medal
} from './styles/rates'
import '../../../modules/components/CountrySelector/flags.css'

export default class ListItem extends Component {
    constructor(props) {
        super(props)
        e.setLanguage(props.language)
    }
    state = {
        photoUrl: "images/Anonymus.png"
    }

    componentWillReceiveProps(nextProps) {
        e.setLanguage(nextProps.language)
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
        const {data, index, isFriendType, showClosest, playerPosition} = this.props
        const leadersAmount = 3;
        const indexOffset = 1;

        let position = 0;
        if (showClosest && playerPosition) {
            const {globalRank} = playerPosition
            const lowestPosition = globalRank - 11;
            position = lowestPosition + index
        } else {
            position = index
        }

        return data.address ?
            <ExtendedUserBlock>
                <MainInfo>
                    {data.name === data.nickname ?
                        <UserName style={{color: "#dbdbdb"}}>{data.name}</UserName>
                        :
                        <React.Fragment>
                            <UserName style={{color: "#dbdbdb"}}>{data.name}</UserName>
                            <Nickname style={{color: "#7a7a7a"}}>{data.nickname}</Nickname>
                        </React.Fragment>
                    }
                </MainInfo>
                <ExtendedAddress>
                    <p style={{color: "#333333"}}>{`${data.address.city || e.highscore_hometown}`}</p>
                </ExtendedAddress>
                <ExtendedStatistics style={index<leadersAmount ? null : {alignItems: "center"}}>
                    <div>
                        <span>GL</span>
                        <span style={{color: "#333333", fontWeight: "bold"}}>{data.handicap || 0}</span>
                        {index<leadersAmount && !showClosest ?
                            null
                            :
                            <div style={{display: "inline-block"}}>
                                <VerticalSeparator style={{marginBottom: "5px"}}/>
                                <span style={{color: "#777777", marginLeft: 0, textTransform: 'capitalize'}}>{e.highscore_position}</span>
                                <span style={{color: "#333333"}}>{position+1}</span>
                            </div>
                        }
                    </div>
                    {index<leadersAmount && !showClosest ?
                        <ChampionLabel>{isFriendType ? e.highscore_friends : e.highscore_world} {e.highscore_champion}</ChampionLabel>
                        :
                        null
                    }
                </ExtendedStatistics>
                <ExtendedUserPhoto profileURL={this.state.photoUrl} />
                <ExtendedFlagWrapper><Flag value={data.address.country} /></ExtendedFlagWrapper>
                {index<leadersAmount && !showClosest ?
                    <Medal src={`images/place${index+indexOffset}.png`} alt=""/>
                    :
                    null
                }
            </ExtendedUserBlock>
            :
            null
    }
}