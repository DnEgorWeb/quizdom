import React, {Component} from 'react'
import e from '../../../../langs'
import styled from 'styled-components'
import { MetallicButton, MetallicButtonWrapper } from '../../../modules/components/MetallicButton'

const SwitchButton = styled(MetallicButton)`
    border-radius: 8px;
    width: 230px;
`

const SwitchButtonWrapper = styled(MetallicButtonWrapper)`
    border-radius: 18px;
    width: 255px;
    margin: 0;
`

const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    .info__button-block {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .info__button-block>p {
        font-size: 36px;
        margin: 0;
    }
`

export default class InfoButtons extends Component {
    constructor(props) {
        super(props)
        e.setLanguage(props.language)
    }

    state = {
        showFullName: false
    }

    componentWillReceiveProps(nextProps) {
        e.setLanguage(nextProps.language)
    }

    componentWillMount() {
        const {showFullName} = this.props.settings
        this.setState({
            showFullName: showFullName
        })
    }

    render() {

        return (
            <ButtonsWrapper>
                <div className="info__button-block">
                    <SwitchButtonWrapper>
                        <SwitchButton onClick={() => {this.props.switchLookMode(true)}}>
                            <img alt='' src={`images/05-freunde-${this.props.lookMode ? 'orange' : 'grey'}.png`}/>
                        </SwitchButton>
                    </SwitchButtonWrapper>
                    <p>{e.settings_view}</p><p>{e.settings_default}</p>
                </div>
                <div className="info__button-block">
                    <SwitchButtonWrapper>
                        <SwitchButton onClick={() => {this.props.switchLookMode(false)}}>
                            <img alt='' src={`images/lock-${this.props.lookMode ? 'grey' : 'orange'}.png`}/>
                        </SwitchButton>
                    </SwitchButtonWrapper>
                    <p>{e.settings_view}</p><p>{e.settings_privateProtection}</p>
                </div>
            </ButtonsWrapper>
        )
    }
}
