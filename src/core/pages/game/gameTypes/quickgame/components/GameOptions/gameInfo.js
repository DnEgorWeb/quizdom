import React, {Component} from 'react'
import e from '../../../../../../../langs';

import {
    GameInfoWrapper,
    QuestionNumbersPanel,
    GameInfoLabel,
    EmptyCircle,
    NumberOfQuestion,
    SelectedNumberOfQuestion,
    GameLevelLabel,
    ProfileInfoBlock,
    ButtonsBlock,
    ProfileBlock,
    InfoButton,
    GLButtonOn,
    GLButtonOff,
    NameLabel,
    ProfilePictureWrapper,
    // PoolsWrapper,
    // PoolsLabel,
    // PoolsList,
    // ActionButtonBlock,
    // ActionButton,
    // QuestionPool,
} from './styledComponents'

import {SeparatorLineVert} from '../../../../../../modules/components/SeparatorLine'

import ProfilePicture from '../../../../../../modules/components/ProfilePicture/ProfilePictureContainer'

class GameInfo extends Component {
    // const MAX_POOLS_IN_LIST = 3;
    state = {
        questionList: []
    }

    componentWillMount() {
        this.setState({
            questionList: this.props.numberOfQuestionList
        })
    }

    render() {
        const {questionList} = this.state
        return (
            <GameInfoWrapper>
                <QuestionNumbersPanel>
                    <GameInfoLabel>{e.game_ask}</GameInfoLabel>
                    {questionList.map((numOfQuestion, index) => {
                        if (numOfQuestion.value) {
                            if (index === this.props.selectedNumberOfQuestion) {
                                return (
                                    <SelectedNumberOfQuestion key={numOfQuestion.value}>
                                        <span>{numOfQuestion.value}</span>
                                    </SelectedNumberOfQuestion>
                                )
                            } else {
                                return (
                                    <NumberOfQuestion
                                        key={numOfQuestion.value}
                                        onClick={this.props.selectNumberOfQuestion.bind(this, index, numOfQuestion.value)}
                                    >
                                        <span>{numOfQuestion.value}</span>
                                    </NumberOfQuestion>
                                )
                            }
                        } else {
                            return <EmptyCircle key={numOfQuestion.value}/>
                        }
                    })}
                </QuestionNumbersPanel>
                <SeparatorLineVert margin='20px 0 10px'/>
                <GameLevelLabel>{e.game_gameLevel}</GameLevelLabel>
                <ProfileInfoBlock>
                    <ButtonsBlock>
                        <InfoButton onClick={this.props.showUserAccountInfo} imgSrc='images/i-with-shadow.png'/>
                    </ButtonsBlock>
                    <ProfileBlock>
                        <ProfilePictureWrapper style={{marginLeft: '20px'}}>
                            <div>
                                <ProfilePicture size={277} />
                            </div>
                        </ProfilePictureWrapper>
                    </ProfileBlock>
                    <ButtonsBlock>
                        <GLButtonOn onClick={this.props.turnGameLevelOn} isSelected={this.props.isGameLevelOn} />
                        <GLButtonOff onClick={this.props.turnGameLevelOff} isSelected={!this.props.isGameLevelOn} />
                    </ButtonsBlock>
                </ProfileInfoBlock>
                <NameLabel>
                    {
                        this.props.firstName && this.props.lastName ?
                            `${this.props.firstName} ${this.props.lastName}`
                            :
                            (this.props.nickName ? `${this.props.nickName}` : 'guest' )
                    }
                </NameLabel>
                {/*<SeparatorLineVert margin='15px 0 0 0'/>
            <SeparatorLineVert margin='50px 0 0 0'/>
            <PoolsWrapper>
                <PoolsLabel>{e.game_pools}</PoolsLabel>
                <PoolsList>
                    {!props.hideCategories && props.assignedPoolsNames.slice(0, MAX_POOLS_IN_LIST).map(
                        (poolName, index) => (
                            <QuestionPool key={poolName}>{poolName + ((index === MAX_POOLS_IN_LIST - 1) ? ',...' : ',')}</QuestionPool>
                        )
                    )}
                </PoolsList>
                <ActionButtonBlock>
                    <ActionButton
                        onClick={(!props.hideCategories && props.assignedPoolsNames.length >= MAX_POOLS_IN_LIST ? props.showAllPools.bind(this, props.assignedPoolsNames) : null)}
                        imgSrc='images/pools-arrow.png' />
                </ActionButtonBlock>
            </PoolsWrapper>*/}
            </GameInfoWrapper>
        )
    }
}

export default GameInfo;
