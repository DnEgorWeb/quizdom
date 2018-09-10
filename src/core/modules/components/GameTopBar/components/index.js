import React from 'react'
import e from '../../../../../langs';
import styled from 'styled-components'
import {withRouter} from 'react-router-dom'

import Timer from '../../../components/Timer/'
import Counter from '../../../components/Counter/components'

import url from '../../../../../constants/urlConstants'

const TopBarWrapper = styled.div`
    margin: auto;
    position: relative;
    z-index: 100;
    //display: flex;
    //justify-content: space-between;
    //align-items: center;
    width: 710px;
    height: 96px;
    border-radius: 10px;
    box-shadow: 0px 4px 8px 0 rgba(0, 0, 0, 0.4);
    //background-image: linear-gradient(to top, rgb(76, 76, 76), rgb(112, 112, 112));
    background-image: linear-gradient(rgb(71, 71, 71), rgb(42, 42, 42));
`

const SoundContainer = styled.div`
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translate(0, -50%);

  width: 76px;
  height: 76px;
  background: url(${({sound}) => sound ? 'images/sound.png' : 'images/sound-no.png'}) center no-repeat;
  background-size: contain;
  background-color: #232324;
  border: solid 4px #4b484a;
  border-radius: 50%;
  cursor: pointer;
`

const CloseContainer = styled.span`
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translate(0, -50%);

  width: 76px;
  height: 76px;
  background: url('images/close.png') center no-repeat;
  background-size: contain;
  background-color: #232324;
  border: solid 4px #4b484a;
  border-radius: 50%;
  cursor: pointer;
`

const TimerContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  width: 170px;
  height: 158px;
`

const QuestionNumberContainer = styled.div`
  position: absolute;
  right: 123px;
  top: 50%;
  transform: translate(0, -50%);

  height: 48px;
`

class GameTopBar extends React.Component{
    constructor(props) {
        super(props)
        e.setLanguage(props.language)
    }

    componentWillReceiveProps(nextProps) {
        e.setLanguage(nextProps.language)
    }

    closeGame = () => {
        window.notification.confirm(e.game_Attention, e.game_areYouSure, e.game_okCancel, (button) => {
            if (Number(button) !== 2) {
                localStorage.removeItem('countQuestionForCurrentGame');
                this.props.closeGame(parseInt(this.props.gameId, 10));
                this.props.history.push(url.dashboard.index)
            }
        })
    }

    toggleSound = () => {
        localStorage.setItem('sound', !this.props.sound);
        this.props.toggleSound()
    }

    render(){
        const { current, max } = this.props;
        const countQuestions = max;

        return(
            <TopBarWrapper>
                <SoundContainer sound={this.props.sound} onClick={this.toggleSound} />
                <TimerContainer>
                    <Timer loading={this.props.loading}
                           status={this.props.status}
                           currentTime={this.props.currentTime}
                           size={170}
                           advertisement={this.props.advertisement}
                           countdown={this.props.countdown}
                    />
                </TimerContainer>
                {!this.props.loading ?
                    <QuestionNumberContainer>
                        <Counter current={current || 0} max={countQuestions || ''} />
                    </QuestionNumberContainer>
                    :
                    null
                }

                <CloseContainer onClick={this.closeGame} />
            </TopBarWrapper>
        )
    }
}

export default withRouter(GameTopBar)
