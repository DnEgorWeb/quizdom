import React, {Component} from 'react';
import e from '../../../../langs'
import TopBar from '../../../modules/components/TopBar'
import ListItem from './ListItem'
import '../../../modules/components/CountrySelector/flags.css'
import {
    Wrapper, MainInfo, UserBlock, UserName, Nickname, Address, Statistics,
    VerticalSeparator, UserPhoto, FlagWrapper, RankListHeader, Separator, Flag, Box,
    SpanCapitalize, SpanUppercase
} from './styles/rates'

class Rate extends Component {
    constructor(props) {
        super(props)
        e.setLanguage(props.language)
    }
    state = {
        photoUrl: "images/Anonymus.png",
        showClosest: false
    }
    
    componentWillReceiveProps(nextProps) {
        e.setLanguage(nextProps.language)
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

    componentDidUpdate(prevProps, prevState) {
        if (this.state.showClosest !== prevState.showClosest) {
            const margin = 25
            const elemsAmount = 21

            const container = document.getElementsByClassName("scrollable-wrapper")[0]
            if (container.lastElementChild) {
                const elemHeight = container.lastElementChild.clientHeight + margin
                const halfContainerHeight = (elemHeight*elemsAmount)/2
                const middlePosition = halfContainerHeight-margin - container.clientHeight/2 + elemHeight
                container.scrollTo(0, middlePosition)
            }
        }
    }

    compareFriends = (a, b) => {
        let firstPlayerLevel = a.profile.handicap
        let secondPlayerLevel = b.profile.handicap
        if (!a.profile.handicap) {
            firstPlayerLevel = 0
        }
        if (!b.profile.handicap) {
            secondPlayerLevel = 0
        }
        return secondPlayerLevel - firstPlayerLevel
    }

    isFriendsType = (type) => {
        return (type === "showFriends")
    }

    getFriendsArray = (arr) => {
        return arr.sort(this.compareFriends)
    }

    showClosestPlayers = () => {
        if (this.props.rateType === "showFriends") return
        const {globalRank} = this.props.playerPosition
        const usersAmount = 60 // it must be 20, but now backend gives wrong list, so it`s temporary decision
        const offset = globalRank - Math.round(usersAmount/2)
        this.props.getLeaderboard(usersAmount, offset)
        this.setState({showClosest: true})
    }

    render() {
        const {rateType, cdnMedia, allPlayers, showFullName, friends, user} = this.props
        const playerPosition = this.props.playerPosition || {}
        const {firstName, lastName, nickname, address, gameLevel, userId } = user
        const {country, city} = address
        const {photoUrl} = this.state
        let playerPositionInList = allPlayers.findIndex((item, index) => {
            if (item.userId === userId) return index
            return false
        })
        const isFriendsType = this.isFriendsType(rateType)

        let playersList = allPlayers

        // it`s temporary, short sorted list must be taken from backend. Now it`s sorted, but it`s not sorted correct.
        if (this.state.showClosest) {
            let leftOffset = 10
            if (playerPosition && playerPosition.globalRank < 10) {
                leftOffset = playerPosition.globalRank
            }
            let rightOffset = 11
            if (playerPosition && playerPosition.totalRank - playerPosition.globalRank < 11) {
                rightOffset = playerPosition.totalRank - playerPosition.globalRank
            }
            playersList = allPlayers.slice(playerPositionInList-leftOffset, playerPositionInList+rightOffset)
            if (!playersList.length) {
                this.setState({
                    showClosest: false
                }, () => {
                    this.props.getLeaderboard()
                    const container = document.getElementsByClassName("scrollable-wrapper")[0]
                    container.scrollTo(0, 0)
                })
            }
        }

        const friendList = this.getFriendsArray(friends)
        const sortedList = (isFriendsType) ? friendList : playersList

        return(
            <Wrapper>
                {this.state.showClosest ?
                    <TopBar caption={e.highscore_myPosition} back={() => this.props.closeComponent(rateType)}/>
                    :
                    <TopBar caption={isFriendsType ? e.highscore_friends : e.highscore_top100} back={() => this.props.closeComponent(rateType)}/>
                }
                <Box>
                    <div className='scrollable-wrapper'>
                    {this.state.showClosest ?
                        null
                        :
                        <div>
                            <UserBlock onClick={this.showClosestPlayers}>
                                <MainInfo>
                                    {showFullName ?
                                        <UserName>{`${firstName} ${lastName}`}</UserName>
                                        :
                                        null
                                    }
                                    <Nickname>{nickname}</Nickname>
                                </MainInfo>
                                <Address>
                                    <p>{city || e.highscore_hometown}</p>
                                </Address>
                                <Statistics>
                                    <span>GL</span>
                                    <span style={{color: "white", fontWeight: "bold"}}>{gameLevel || "0.00"}</span>
                                    <VerticalSeparator/>
                                    <SpanCapitalize color='#7a7a7a'>{e.highscore_position}</SpanCapitalize>
                                    <span style={{color: "white"}}>
	                                    {isFriendsType ?
		                                    (playerPosition && playerPosition.buddyRank) :
		                                    (playerPosition && playerPosition.globalRank)}
                                    </span>
                                </Statistics>
                                <UserPhoto profileURL={photoUrl} />
                                <FlagWrapper><Flag value={country} /></FlagWrapper>
                            </UserBlock>
                            <RankListHeader>
                                <Separator/>
                                <SpanUppercase>{isFriendsType ? `${e.highscore_rankingFriends} | ` : e.highscore_rankingAllPlayers}</SpanUppercase>
                                {isFriendsType ?
                                    <span style={{fontWeight: "bold"}}>{friends.length}</span>
                                    :
                                    null
                                }
                            </RankListHeader>
                        </div>
                    }
                    {sortedList.map((player, index) => {
                            const item = player.buddy ? player.profile : player
                            return (
                                <ListItem key={item.userId || item.profile.userId}
                                          data={item}
                                          cdnMedia={cdnMedia}
                                          userId={item.userId}
                                          index={index}
                                          isFriendType={isFriendsType}
                                          showClosest={this.state.showClosest}
                                          playerPosition={playerPosition}
                                          language={this.props.language}
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