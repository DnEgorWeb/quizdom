import React from 'react'

import {
    GameListWrapper,
    SpecialGameListWrapper,
    SpecialGameWrapper,
    Picture,
    QuestionAmountWrapper,
} from './styledComponents'

import {
    GameTitle,
    InfoAboutWinningsComponent,
    QuestionAmount,
    QuestionBallWarpper,
    QuestionBall,
    TotalPoolLabel,
    GameCategoryListContent
} from '../gameCategoryList/styledComponents'

import {SeparatorLineVert} from '../../../../../../modules/components/SeparatorLine'

import TopBar from '../../../../../../modules/components/GameResultsTopBar'
import getFullPath from "../../../../../../../services/fullPathForPoolIcon";

const SpecialGame = (props) => (
    <SpecialGameWrapper onClick={props.onSelect}>
        <Picture iconSrc={props.iconSrc} />
        <GameTitle style={{maxWidth: '565px', marginTop: '15px'}}>{props.title}</GameTitle>
        <InfoAboutWinningsComponent style={{marginTop: '25px'}} hasWinningComponents={props.hasWinningComponents || true} >
            <SeparatorLineVert width='545px' margin='0 0 7px 0' />
            MIT GEWINNSPIEL
            <QuestionAmountWrapper>
                <QuestionAmount>
                    Fragen
                    <QuestionBallWarpper>
                        <QuestionBall>
                            <span>{props.numberOfQuestions}</span>
                        </QuestionBall>
                    </QuestionBallWarpper>
                </QuestionAmount>
            </QuestionAmountWrapper>
        </InfoAboutWinningsComponent>
    </SpecialGameWrapper>
)

class SpecialGameList extends React.Component {

    selectGame = (game) => {
        this.props.selectGame(game);
        this.props.goToGameOptions();
    }

    render() {
        return (
            <GameListWrapper>
                <TopBar
                    leftButtonClickHandler={this.props.goToCategoryList}
                    rightButtonClickHandler={this.props.close}
                    caption="quick quiz" />
                <GameCategoryListContent>
                    <TotalPoolLabel>{`${this.props.specialGameList && this.props.specialGameList.length} special games`}</TotalPoolLabel>
                    <SpecialGameListWrapper>
                        <div className='scrollable-wrapper'>
                            {
                                this.props.specialGameList && this.props.specialGameList.map(
                                    (specialGame) => {
                                        const iconUrl = getFullPath(specialGame && specialGame.assignedPoolsIcons ? specialGame.assignedPoolsIcons[0] : '');
                                        return (
                                            <SpecialGame
                                                key={specialGame.title}
                                                onSelect={this.selectGame.bind(this, specialGame)}
                                                title={specialGame.title}
                                                numberOfQuestions={specialGame.numberOfQuestions || 7}
                                                iconSrc={iconUrl}
                                            />
                                        )
                                    })
                            }
                        </div>
                    </SpecialGameListWrapper>
                </GameCategoryListContent>
            </GameListWrapper>
        )
    }
}

export default SpecialGameList;
