import React, {Component} from 'react';
import e from '../../../../../../../../../langs';
import TopBar from '../../../../../../../../modules/components/TopBar'
import ListItem from './ListItemFriends'
import '../../../../../../../../modules/components/CountrySelector/flags.css'
import {Wrapper, MainInfo, UserBlock, Nickname, Address, Statistics, TournamentName,
    InfoButton, UserPhoto, FlagWrapper, RankListHeader, Separator, Flag, Box} from './styles/rates'

class Rate extends Component {
    state = {
        photoUrl: "images/Anonymus.png",
        points: 0,
        position: 0
    }

    componentWillMount() {
        this.props.friends.forEach(item => {
            if (item.userId === this.props.user.userId) {
                this.setState({
                    points: item.gamePointsWithBonus,
                    position: item.place
                })
            }
        })
    }

    componentDidMount() {
        const {cdnMedia} = this.props
        const {userId} = this.props.user
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
            })
    }

    render() {
        return(
            <Wrapper>
                <TopBar caption="FREUNDE" back={this.props.closeComponent}/>
                <Box>
                    <div className='scrollable-wrapper'>
                        <div>
                            <UserBlock onClick={this.showClosestPlayers}>
                                <MainInfo>
                                    <TournamentName>{this.props.selectedTournament.title}</TournamentName>
                                    <Nickname>{this.props.nickname}</Nickname>
                                </MainInfo>
                                <Address style={{backgroundColor: '#232323'}}>
                                    <p>{`${this.props.user.address.city || 'Hometown'}`}</p>
                                </Address>
                                <Statistics style={{backgroundColor: '#383838'}}>
                                    <span>{e.game_points}</span>
                                    <span style={{color: "white", fontWeight: "bold"}}>{this.state.points}</span>
                                    <InfoButton src="images/info-button.png"/>
                                </Statistics>
                                <Statistics style={{backgroundColor: '#232323'}}>
                                    <span style={{color: "#7a7a7a"}}>{e.game_position}</span>
                                    <span style={{color: "white"}}>{this.state.position}</span>
                                </Statistics>
                                <UserPhoto profileURL={this.state.photoUrl} />
                                <FlagWrapper><Flag value={this.props.user.address.country} /></FlagWrapper>
                            </UserBlock>
                            <RankListHeader>
                                <Separator/>
                                <span>{e.game_rankingFriends} | </span>
                                <span style={{fontWeight: "bold"}}>{this.props.friends.length}</span>
                            </RankListHeader>
                        </div>
                    {this.props.friends.map((player, index) => {
                            return (
                                <ListItem key={player.userId || player.profile.userId}
                                          data={player}
                                          cdnMedia={this.props.cdnMedia}
                                          userId={player.userId}
                                          index={index}
                                          playerPosition={index}
                                />
                            )
                        })
                    }
                    </div>
                </Box>
            </Wrapper>
        )
    }
}

export default Rate