import React, {Component} from 'react'
import styled from 'styled-components'

const Slider = styled.div`
    width: 20%;
    height: 60px;
    transition: 0.3s;
    transition-delay: 0.1s;
    background-color: ${props => props.checked ? 'green' : '#cdcdcd'};
    position: relative;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    cursor: pointer;
    .slider__ball {
        width: 60px;
        height: 60px;
        background-color: #f1f3f2;
        border-radius: 100%;
        border: 1px solid white;
        transition: 0.3s;
        &_checked {
            transform: translateX(70px);
        }
    }
`

export default class SwitchNotification extends Component {
    state = {
        checked: false
    }

    componentWillMount() {
        const {settings} = this.props
        this.setState({
            checked: settings.push.pushNotificationsDuel
        })
    }

    toggleSlider = (ev) => {
        const {checked} = this.state
        this.setState({
            checked: !checked
        }, () => {
            this.props.save(!checked, 'push');
        })
    }

    render() {
        const {checked} = this.state
        return (
            <Slider checked={checked} onClick={this.toggleSlider} className={`${checked ? 'checked' : ''}`}>
                <div className={`slider__ball slider__ball_${checked ? 'checked': ''}`} />
            </Slider>
        );
    }
}