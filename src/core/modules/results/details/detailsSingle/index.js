import React from 'react'
import e from '../../../../../langs'
import styled from 'styled-components'
import convertNumber from '../../../../../services/convertNumber'
import SubMenu from './infoMenu'
import TopBar from '../../../components/GameResultsTopBar'
import {
    InformationItem,
    InformationList,
    RightAnswersItem,
    AnswersTimeItem,
    BonusPointsItem,
    imageUrls
} from '../../../components/infoList/styledComponents'

const DetailsWrapper = styled.div`
  background: rgb(35,35,36);
  height: 102%;
  box-sizing: border-box;
  overflow: hidden;
  margin-top: -30px;
`
const TopBarPanel = styled.div`
  height: ${96 + 20 + 20}px;
  display: flex;
  align-items: center;
  //box-shadow: 0 4px 10px black;
  position: relative;
  z-index: 1;
`

const Content = styled.div`
  width: 710px;
  margin: 0 auto;
  overflow: hidden;
    height: calc(100% - 96px);
    max-height: calc(100% - 96px);
    position: relative;
    .scrollable-wrapper{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: -17px;
        overflow-y: scroll;@media (max-width: 768px) {
            right: 0;
        }
    }
`
const PointsAndLevelItem = styled(InformationItem)`
  padding-left: 12px;
`
const Separator = styled.div`
  width: 4px;
  height: 33px;
  margin: 0 10px;
  position: relative;
  display: inline-block;
  &:after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 7px;
    background: white;
  }
`
const Table = styled.table`
  border-spacing: 7px;
`
const TableHead = styled.thead`
  font: 500 28px Univers-condensed;
`
const TableHeadTd = styled.td`
  text-align: center;
  vertical-align: bottom;
  color: white;
  width: ${({forNumber}) => forNumber ? '94px' : '124px'};
`
const TableBodyTd = styled.td`
  border: 1px solid rgb(221,221,227);
  border-radius: 10px;
  background-color: #dddee3;
  height: 61px;
  text-align: center;
  vertical-align: middle;
  font: 500 36px Overpass;
`
const FailureTd = styled(TableBodyTd)`
  background: rgb(227,5,19);
  color: white;
  border-color: rgb(227,5,19);
`
const RightTd = styled(TableBodyTd)`
  background: rgb(53,165,0);
  color: white;
  border-color: rgb(53,165,0);
`
const SecPointsTd = styled(TableBodyTd)`
  text-align: center;
`
const PointsTd = styled(TableBodyTd)`
  background-color: #1ff2ff;
  border-color: #1ff2ff;
`
const ExtraPoints = styled.div`
  width: 100%;
  height: 61px;
  padding: 0 7px 0 0;
  margin-bottom: 190px;
  position: relative;
  font: 500 40px Univers-condensed;
  color: white;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-sizing: border-box;
  .points {
    background-color: #1ff2ff;
    color: black;
    width: 120px;
    height: 61px;
    border-radius: 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`
const ExtraPointsTitle = styled.div`
  display: inline-block;
  margin-right: 35px;
`

const InfoButton = styled.div`
  padding-right: 20px;
  display: inline-block;
  width: 60px;
  height: 60px;
  background: url(${imageUrls['pointsAndLevels']}) left center no-repeat;
  cursor: pointer;
`

export default class Details extends React.Component {
    constructor(props) {
        super(props)
        e.setLanguage(props.language)
    }

    state = {
        submenu: false
    }
    
    componentWillReceiveProps(nextProps) {
        e.setLanguage(nextProps.language)
    }

    openInfo = () => {
        this.setState({submenu: true})
    }

    closeInfo = () => {
        this.setState({submenu: false})
    }

    getResultsDataObj = function(results){
        let resultsItemObj = {}
        results.forEach((item) => {
            resultsItemObj[item.resultType] = item.amount
        })
        return resultsItemObj
    }

    getAnswerLetter = (answer, index) => {
        const answers = this.props.questionLetterMap[index]
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
    getAnswerNumbers = (answer, index) => {
        const answers = this.props.questionLetterMap[index]
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

    getAnswersDetails = () => {
    	const resultsAll = this.props.data;
        const results = resultsAll && resultsAll.answerResults;
        const resultsArr = [];

        if(results){
            results.forEach((item, i) => {
                let providedAnswer = item.questionInfo.providedAnswers.length > 1 ? this.getAnswerNumbers(item.questionInfo.providedAnswers, i) : this.getAnswerLetter(item.questionInfo.providedAnswers[0], i)
                let rightAnswer = item.questionInfo.correctAnswers.length > 1 ? this.getAnswerNumbers(item.questionInfo.correctAnswers, i) : this.getAnswerLetter(item.questionInfo.correctAnswers[0], i)
                let resultsData = this.getResultsDataObj(item.resultItems);

                resultsArr.push(
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
                        <SecPointsTd>{Math.round(resultsData.answerTime / 1000)} | {resultsData.gamePointsForSpeed || 0}</SecPointsTd>
                        <TableBodyTd>{item.questionInfo.complexity || 0}</TableBodyTd>
                        <PointsTd>{resultsData.totalGamePoints || 0}</PointsTd>
                    </tr>
                )
            });
        }
        return resultsArr
    }

    formatBonuses = (bonuses) => `${String(bonuses).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`

    render() {
    	const { data } = this.props;
	    const trainingMode = data && data.trainingMode;
        const resultItems = data && data.resultItems;
        let resultItemsObj = {}

        if(resultItems){
            resultItems.forEach((item) => {
                resultItemsObj[item.resultType] = item.amount
            })
        }

        let oldLevel;
        let extraGamePoint;

        if(data) {
        	data.resultItems.forEach(item => {
		        if(item.resultType === 'oldHandicap') oldLevel = item.amount;
		        if(item.resultType === 'extraGamePoint') extraGamePoint = item.amount;
	        });
        }

        return (
            <DetailsWrapper>
                <TopBarPanel >
                    <TopBar
                        caption='details'
                        leftButtonClickHandler={this.props.back}
                        rightButtonClickHandler={this.props.close}/>
                </TopBarPanel>
                <Content>
                    <div className='scrollable-wrapper'>
                        <InformationList>
                            <RightAnswersItem>
                                {e.game_correctAnswers}
                                <span className='value'>
                                    {resultItemsObj.correctAnswers}<Separator /><span className='white'>{resultItemsObj.totalQuestions}</span>
                                </span>
                            </RightAnswersItem>
                            <AnswersTimeItem>
                                {e.game_answerTime}
                                <span className='value'>
                                    {Math.floor((resultItemsObj.answerTime / 1000)) || 0} <span className='white'>sec</span>
                                </span>
                            </AnswersTimeItem>
                            <BonusPointsItem>
                                {e.game_bonusPoints}
                                <span className='value'>
                                    {this.formatBonuses(convertNumber(resultItemsObj.bonusPoints))}
                                </span>
                            </BonusPointsItem>
                            <PointsAndLevelItem>
                                <InfoButton onClick={() => this.openInfo(0) || 0} />
                                {e.game_points}
                                <span className='value'>
                                    {trainingMode ? 0 : convertNumber(resultItemsObj.totalGamePoints)}
                                </span>
                            </PointsAndLevelItem>
                            <PointsAndLevelItem>
                                <InfoButton onClick={() => this.openInfo(1) || 0} />
                                {e.game_gameLevelPoints}
                                <span className='value'>
                                    {trainingMode ? 0 : convertNumber(resultItemsObj.handicapPoints)}
                                </span>
                            </PointsAndLevelItem>
                            <PointsAndLevelItem>
                                <InfoButton onClick={() => this.openInfo(2) || 0} />
                                {e.game_gameLevelOld}
                                <span className='value'>
                                    {trainingMode ? 0 : oldLevel }
                                </span>
                            </PointsAndLevelItem>
                            <PointsAndLevelItem>
                                <InfoButton onClick={() => this.openInfo(3) || 0} />
                                {e.game_gameLevelNew}
                                <span className='value'>
                                    {trainingMode ? 0 : convertNumber(resultItemsObj.newHandicap)}
                                </span>
                            </PointsAndLevelItem>
                        </InformationList>
                        <Table>
                            <TableHead>
                                <tr>
                                    <TableHeadTd forNumber>{e.formatString(e.game_questionNumber, <br />)}</TableHeadTd>
                                    <TableHeadTd>{e.formatString(e.game_correctAnswer, <br />)}</TableHeadTd>
                                    <TableHeadTd>{e.formatString(e.game_myAnswer, <br />)}</TableHeadTd>
                                    <TableHeadTd>{e.formatString(e.game_secondsPoints, <br />)}</TableHeadTd>
                                    <TableHeadTd forNumber>{e.formatString(e.game_questionLevel, <br />)}</TableHeadTd>
                                    <TableHeadTd forNumber>{e.game_points}</TableHeadTd>
                                </tr>
                            </TableHead>
                            <tbody>
                                {this.getAnswersDetails()}
                            </tbody>
                        </Table>
                        <ExtraPoints>
                            <InfoButton onClick={() => this.openInfo(4) || 0} />
                            <ExtraPointsTitle>{e.game_extraPoints}</ExtraPointsTitle>
                            <span className='points'>{extraGamePoint || 0}</span>
                        </ExtraPoints>
                    </div>
                </Content>
                <SubMenu
                    title={e.game_generalInfo}
                    close={this.closeInfo}
                    isOpened={this.state.submenu}
                    text='text'
                />
            </DetailsWrapper>
        )
    }
}
