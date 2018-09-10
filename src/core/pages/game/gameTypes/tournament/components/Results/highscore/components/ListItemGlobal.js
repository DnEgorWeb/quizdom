import React, {Component} from 'react'
import e from '../../../../../../../../../langs';
import {MainInfo, ExtendedUserBlock, UserName, Nickname, ExtendedStatistics, ExtendedUserPhoto,
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
        const {data, index, showClosest} = this.props
        const leadersAmount = 3;
        const indexOffset = 1;

        return data.address ?
            <ExtendedUserBlock style={{paddingTop:'20px'}} className={this.props.isUser ? "elementToScroll" : null}>
                <MainInfo>
                    <UserName style={{color: "#dbdbdb"}}>
                        {data.name}
                        {!showClosest ? index<leadersAmount ?
                            null
                            :
                            <div style={{display: "inline-block", position: 'absolute', right: '90px'}}>
                                <VerticalSeparator style={{marginBottom: "5px"}}/>
                                <span style={{color: "#fff"}}>{index+1}</span>
                            </div>
                            :
                            <div style={{display: "inline-block", position: 'absolute', right: '90px'}}>
                                <VerticalSeparator style={{marginBottom: "5px"}}/>
                                <span style={{color: "#fff"}}>{index+1}</span>
                            </div>
                        }
                    </UserName>
                    <Nickname style={{color: "#7a7a7a", marginBottom:'0'}}>{data.nickname}</Nickname>
                    <p style={{color: "rgb(219, 219, 219)", fontSize:'36px',marginBottom:'0',marginTop:'0'}}>{`${data.address.city || 'Hometown'}`}</p>
                </MainInfo>
                <ExtendedStatistics style={{alignItems: "center"}}>
                    <div>
                        <span style={{color:'rgb(122, 122, 122)'}}>{e.game_points}</span>
                        <span style={{color: "#333333", fontWeight: "bold"}}>{data.gamePointsWithBonus || 0}</span>
                    </div>
                </ExtendedStatistics>
                <ExtendedStatistics>
                    {
                        this.props.showGameLevel ?
                            <div style={{position:'absolute', left:'35px',color:'rgb(122, 122, 122)'}}>
                                <span style={{color:'rgb(122, 122, 122)', marginRight:'0',marginLeft:'0'}}>GL </span>
                                <span>{data.handicap || 0}</span>
                            </div>
                            :
                            null
                    }
                    <span>{e.game_profit}</span>
                    <span style={{position:'absolute',left:'320px',color:'rgb(51, 51, 51)'}}>0 €</span>
                </ExtendedStatistics>
                <ExtendedUserPhoto profileURL={this.state.photoUrl} />
                <ExtendedFlagWrapper><Flag value={data.address.country} /></ExtendedFlagWrapper>
                {!showClosest ? index<leadersAmount ?
                    <Medal src={`images/yellowplace${index+indexOffset}.png`} alt=""/>
                    :
                    null
                    :
                    null
                }
            </ExtendedUserBlock>
            :
            null
    }
}