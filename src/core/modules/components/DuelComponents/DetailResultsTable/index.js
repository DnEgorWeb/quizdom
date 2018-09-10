import React from 'react'
import e from '../../../../../langs';

import {
    Table,
    TableHead,
    TableHeadTd,
    TableBodyTd,
    RightTd,
    FailureTd,
    SecPointsTd,
    PointsTd,
} from './styledComponents'

const DetailResultsTable = (props) => {
    const getResultsDataObj = function(results){
        let resultsItemObj = {}
        results.forEach((item) => {
            resultsItemObj[item.resultType] = item.amount
        })
        return resultsItemObj
    }

    const getAnswerLetter = (answer, index) => {
        const answers = props.questionLetterMap[index]
        let letter = ''
        let answersArr = []

        for(let key in answers){
            answersArr.push(key)
        }

        answersArr.forEach((item, i) => {
            if(item === answer){
                letter = String.fromCharCode(i + 65)
            }
        })

        return letter

    }

    const getAnswerNumbers = (answer, index) => {
        const answers = props.questionLetterMap[index]
        let answersArr = []
        let answersOrderArr = []

        for(let key in answers){
            answersArr.push(key)
        }

        for(let i = 0; i < answer.length; i++){
            for(let j = 0; j < answersArr.length; j++){
                if(answer[i] === answersArr[j]){
                    answersOrderArr.push(j + 1)
                }
            }
        }

        return answersOrderArr.join(' ')
    }
    const getAnswersDetails = () => {
        const results = props.answerResults
        let resultsArr = []
        if(results){
            resultsArr = results.map((item, i) => {
                let providedAnswer = item.questionInfo.providedAnswers.length > 1 ? getAnswerNumbers(item.questionInfo.providedAnswers, i) : getAnswerLetter(item.questionInfo.providedAnswers[0], i)
                let rightAnswer = item.questionInfo.correctAnswers.length > 1 ? getAnswerNumbers(item.questionInfo.correctAnswers, i) : getAnswerLetter(item.questionInfo.correctAnswers[0], i)
                let resultsData = getResultsDataObj(item.resultItems)
                return(
                    <tr key = {'q_'+item.questionIndex}>
                        <TableBodyTd>{item.questionIndex + 1}</TableBodyTd>
                        <TableBodyTd>{rightAnswer}</TableBodyTd>
                        {
                            item.questionInfo.answeredCorrectly
                                ?
                                <RightTd>{providedAnswer}</RightTd>
                                :
                                <FailureTd>{providedAnswer}</FailureTd>
                        }
                        <SecPointsTd>{Math.random(resultsData.answerTime / 1000)} | {resultsData.gamePointsForSpeed || 0}</SecPointsTd>
                        <TableBodyTd>{item.questionInfo.complexity || 0}</TableBodyTd>
                        <PointsTd>{resultsData.totalGamePoints || 0}</PointsTd>
                    </tr>
                )
            })
        }
        return resultsArr
    }
    return (
        <Table>
            <TableHead>
                <tr>
                    <TableHeadTd forNumber>{e.formatString(e.module_questionNumber, <br />)}</TableHeadTd>
                    <TableHeadTd>{e.formatString(e.module_correctAnswer, <br />)}</TableHeadTd>
                    <TableHeadTd>{e.formatString(e.module_myAnswer, <br />)}</TableHeadTd>
                    <TableHeadTd>{e.formatString(e.module_secondsPoints, <br />)}</TableHeadTd>
                    <TableHeadTd>{e.formatString(e.module_questionLevel, <br />)}</TableHeadTd>
                    <TableHeadTd forNumber>{e.module_points}</TableHeadTd>
                </tr>
            </TableHead>
            <tbody>
            {getAnswersDetails()}
            </tbody>
        </Table>
    )
}

export default DetailResultsTable;
