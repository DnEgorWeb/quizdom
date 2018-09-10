import React, {Component} from 'react';
import e from '../../../../../../../../../langs';
import TopBar from '../../../../../../../../modules/components/TopBar'
import ListItem from './ListItemGlobal'
import '../../../../../../../../modules/components/CountrySelector/flags.css'
import {Wrapper, UserBlock, Statistics,
    InfoButton, UserPhoto, FlagWrapper, RankListHeader, Separator, Flag, Box} from './styles/rates'
import SubMenu from '../../../../../../../../modules/components/SubMenu'

class Rate extends Component {
    state = {
        photoUrl: "images/Anonymus.png",
        points: 0,
        position: 0,
        highscoreList: [],
        isSubMenuOpen: null
    }

    componentWillMount() {
        this.setState({highscoreList: this.props.globalHighscore})

        this.props.globalHighscore.forEach(item => {
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

    showClosestPlayers = (event) => {
        if (event.target === this.infoRef) return

        const wrapper = this.refs.wrapper
        const wrapperHeight = wrapper.clientHeight
        const user = this.refs.user
        const elementToScroll = wrapper.querySelector('.elementToScroll')
        const index = user.props.index
        const offset = index<10 ? index : 10

        this.setState(state => {
            return {
                highscoreList: state.highscoreList.slice(index-offset, index+10),
                showClosest: true
            }
        }, () => {
            wrapper.scrollTop += elementToScroll.offsetTop - wrapperHeight/2
        })
    }

    openSubMenu = () => {
        this.setState({
            isSubMenuOpen: true
        })
    }

    render() {
        const {showGameLevel, selectedTournament, user} = this.props
        return(
            <Wrapper>
                <TopBar caption="DETAILS" back={this.props.closeComponent}/>
                <Box>
                    <div className='scrollable-wrapper' ref="wrapper">
                        <div>
                            {showGameLevel ?
                                <UserBlock onClick={this.showClosestPlayers} style={{paddingTop: '10px'}}>
                                    <Statistics style={{backgroundColor: '#232323'}}>
                                        <span>{e.game_tournaments}</span>
                                        <span style={{position: 'absolute', left: '340px', color: 'white'}}>{selectedTournament.game.title}</span>
                                    </Statistics>
                                    <Statistics style={{backgroundColor: '#232323'}}>
                                        <span>{e.game_profit}</span>
                                        <span style={{position: 'absolute', left: '340px', color: 'white'}}>0 €</span>
                                    </Statistics>
                                    <Statistics style={{backgroundColor: '#383838'}}>
                                        <span style={{color: 'rgb(122, 122, 122)'}}>{e.game_points}</span>
                                        <span style={{position: 'absolute', left: '340px', color: "white", fontWeight: "bold"}}>{this.state.points}</span>
                                        <InfoButton src="images/info-button.png" onClick={this.openSubMenu} innerRef={(elem) => this.infoRef = elem}/>
                                    </Statistics>
                                    <Statistics style={{backgroundColor: '#232323'}}>
                                        <span style={{color:'rgb(122, 122, 122)'}}>GL </span>
                                        <span style={{color:'white'}}>{user.gameLevel}</span>
                                        <span style={{color:'rgb(122, 122, 122)'}}> | </span>
                                        <span style={{color:'rgb(122, 122, 122)'}}>{e.game_position} </span>
                                        <span style={{color:'white'}}>{this.state.position}</span>
                                    </Statistics>
                                    <UserPhoto profileURL={this.state.photoUrl} />
                                    <FlagWrapper><Flag value={this.props.user.address.country} /></FlagWrapper>
                                </UserBlock>
                                :
                                <UserBlock onClick={this.showClosestPlayers} style={{paddingTop: '10px'}}>
                                    <Statistics style={{backgroundColor: '#232323'}}>
                                        <span>{e.game_tournament}</span>
                                        <span style={{position: 'absolute', left: '340px', color: 'white'}}>{selectedTournament.game.title}</span>
                                    </Statistics>
                                    <Statistics style={{backgroundColor: '#232323'}}>
                                        <span style={{color: "#7a7a7a"}}>{e.game_position}</span>
                                        <span style={{color: "white", position: 'absolute', left: '340px'}}>{this.state.position}</span>
                                    </Statistics>
                                    <Statistics style={{backgroundColor: '#383838'}}>
                                        <span style={{color: 'rgb(122, 122, 122)'}}>{e.game_points}</span>
                                        <span style={{position: 'absolute', left: '340px', color: "white", fontWeight: "bold"}}>{this.state.points}</span>
                                        <InfoButton src="images/info-button.png" onClick={this.openSubMenu} innerRef={(elem) => this.infoRef = elem}/>
                                    </Statistics>
                                    <Statistics style={{backgroundColor: '#232323'}}>
                                        <span>{e.game_profit}</span>
                                        <span style={{position: 'absolute', left: '340px', color: 'white'}}>0 €</span>
                                    </Statistics>
                                    <UserPhoto profileURL={this.state.photoUrl} />
                                    <FlagWrapper><Flag value={this.props.user.address.country} /></FlagWrapper>
                                </UserBlock>
                            }
                            <RankListHeader>
                                <Separator/>
                                <span>{e.game_rankingTop} </span>
                                <span style={{fontWeight: "bold", color: '#ff7f00'}}>{this.props.globalHighscore.length<10 ? this.props.globalHighscore.length : "10"} </span>
                                <span>| </span>
                                <span style={{fontWeight: "bold"}}>{this.props.globalHighscore.length}</span>
                            </RankListHeader>
                        </div>
                    {this.state.highscoreList.map((player, index) => {
                            return (
                                <ListItem key={player.userId || player.profile.userId}
                                          data={player}
                                          cdnMedia={this.props.cdnMedia}
                                          userId={player.userId}
                                          index={player.place-1}
                                          playerPosition={index}
                                          showGameLevel={this.props.showGameLevel}
                                          showClosest={this.state.showClosest}
                                          isUser={player.userId === user.userId}
                                          ref={player.userId === user.userId ? 'user' : null}
                                />
                            )
                        })
                    }
                    </div>
                </Box>
                <SubMenu
                    title={this.props.gameInfo.title}
                    componentList={[this.props.gameInfo.description]}
                    currentIndex={this.state.isSubMenuOpen}
                    getMedia={() => {}}
                    selectPicture={() => {}}/>
            </Wrapper>
        )
    }
}

export default Rate