import React, {Component} from 'react'
import Main from './Main'
import RateFriends from './RateFriends'
import RateGlobal from './RateGlobal'

class HighScore extends Component {
    state = {
        showFriends: false,
        showGlobal: false,
        withGameLevel: false
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.friends && nextProps.friends.length && nextProps.friends !== this.props.friends) {
            this.setState({
                showFriends: true,
                showGlobal: false
            })
        }
        if (nextProps.globalHighscore && nextProps.globalHighscore.length && nextProps.globalHighscore !== this.props.globalHighscore) {
            this.setState({
                showGlobal: true,
                showFriends: false
            })
        }
    }

    closeRate = () => {
        this.setState({
            showFriends: false,
            showGlobal: false,
            withGameLevel: false
        })
    }

    openFriendsHighscore = () => {
        this.props.getFriends(this.props.id)
    }

    openGlobalHighscore = (withGameLevel) => {
        if (withGameLevel) {
            this.setState({
                withGameLevel: true
            })
        }
        this.props.getGlobalHighscore(this.props.id)
    }

    render() {
        let component = null
        if(this.state.showFriends){
            component = <RateFriends closeComponent={this.closeRate} {...this.props} />
        }else if(this.state.showGlobal){
            component = <RateGlobal closeComponent={this.closeRate}
                                    showGameLevel={this.state.withGameLevel}
                                    selectedTournament={this.props.selectedTournament}
                                    gameInfo={this.props.selectedTournament.game}
                                    {...this.props} />
        }else {
            component = <Main openComponent={this.toggleComponent}
                              openFriendsHighscore={this.openFriendsHighscore}
                              openGlobalHighscore={this.openGlobalHighscore}
                              closeHighscore={this.props.closeHighscore}
                              userWinningMoney={this.props.userWinningMoney}
                              {...this.props}/>
        }
        return component
    }
}

export default HighScore