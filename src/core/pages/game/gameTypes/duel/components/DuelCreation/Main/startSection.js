import React from 'react'
import e from '../../../../../../../../langs';

import {
    LastGameWrapper,
    LastGameContent,
    InfoBlock,
    IconBlock,
    IconWrapper,
    Icon,
    SingleText,
    Caption,
    Price,
    Text,
    TextWithWrap,
    QuestionAmountWrapper,
    QuestionAmount,
    QuestionBallWarpper,
    QuestionBall,

    StartBlockWrapper,
    InfoButton,
    StartButton,
} from '../../../../quickgame/components/gameCategoryList/styledComponents'

import {SeparatorLineVert} from '../../../../../../../modules/components/SeparatorLine'

import {
    FreeSpace,
} from './styledComponents'

const StartSection  = (props) => (
    <LastGameWrapper>
        <LastGameContent>
            <InfoBlock>
                <IconBlock>
                    <IconWrapper>
                        <Icon src={props.iconSrc} />
                    </IconWrapper>
                    <SingleText>
                        <Caption>{e.game_duelUse}</Caption>
                        <Price>{props.rate}</Price>
                        <SeparatorLineVert margin='5px 0' />
                        <Text>
                            {props.userName || 'Superman 17'}
                        </Text>
                    </SingleText>
                </IconBlock>
                <SeparatorLineVert width='550px' margin='15px 0'/>
                <TextWithWrap>{props.title || e.game_generalKnowledge}</TextWithWrap>
                <QuestionAmountWrapper>
                    <QuestionAmount>
                        {e.game_ask}
                        <QuestionBallWarpper>
                            <QuestionBall>
                                <span>{props.numberOfQuestions}</span>
                            </QuestionBall>
                        </QuestionBallWarpper>
                    </QuestionAmount>
                </QuestionAmountWrapper>
            </InfoBlock>
            <StartBlockWrapper>
                <FreeSpace />
                <StartButton onClick={props.startGame}>{e.game_start}</StartButton>
                <InfoButton onClick={props.showInfo} imgSrc='images/i-with-shadow.png' />
            </StartBlockWrapper>

        </LastGameContent>
    </LastGameWrapper>
)

export default StartSection;
