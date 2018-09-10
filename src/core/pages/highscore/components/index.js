import React, {Component} from 'react'
import Main from './Main'
import Rate from './Rate'

class HighScore extends Component {
    state = {
        showFriends: false,
        showAll: false
    }

    toggleComponent = (component) => {
        this.setState({
            [component]: !this.state[component]
        })
    }

    render() {
        let component = null
        if(this.state.showFriends){
            component = <Rate rateType="showFriends" closeComponent={this.toggleComponent} {...this.props} />
        }else if(this.state.showAll){
            component = <Rate rateType="showAll" closeComponent={this.toggleComponent} {...this.props} />
        }else {
            component = <Main openComponent={this.toggleComponent} {...this.props}/>
        }
        return component
    }
}

export default HighScore