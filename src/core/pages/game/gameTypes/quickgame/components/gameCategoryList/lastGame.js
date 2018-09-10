import React from 'react'
import e from '../../../../../../../langs';

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
	Jackpot,
    Text,
    QuestionAmountWrapper,
    QuestionAmount,
    QuestionBallWarpper,
    QuestionBall,
    TextWithWrap
} from './styledComponents'

import {SeparatorLineVert} from '../../../../../../modules/components/SeparatorLine'


const LastGame = (props) => (
    <LastGameWrapper>
        <LastGameContent>
            <InfoBlock>
                <IconBlock>
                    <IconWrapper>
                        <Icon src={props.iconSrc} />
                    </IconWrapper>
                    <SingleText>
                        <Caption>{props.assignedPoolsNames}</Caption>
                        <Jackpot>{props.jackpot || ''}</Jackpot>
                        <SeparatorLineVert margin='5px 0' />
                        <Text>{e.game_commitment}</Text>
                        <Price>{props.entryFeeAmount} {props.entryFeeCurrency}</Price>
                    </SingleText>
                </IconBlock>
                <SeparatorLineVert width='550px' margin='15px 0'/>
                <TextWithWrap>{props.title}</TextWithWrap>
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
            {props.children}
        </LastGameContent>
    </LastGameWrapper>
)

export default LastGame;
