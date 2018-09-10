import React from 'react'
import styled from 'styled-components'

const QuestionText = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 250px;
	max-height: 250px;
	width: 585px;
	margin: auto;
	margin-bottom: 50px;
	padding-top: 50px;
	font-size: ${({children}) => {
		switch (true) {
	       case children.length > 130 : return 24;
	       case children.length > 80  : return 28;
	       case children.length > 70  : return 34;
	       case children.length > 50  : return 35;
	       case children.length > 35  : return 40;
	       default: return 48;
	   }
	}}pt;
	color: #ffffff;
	text-align: center;
	font-family: Overpass, Regular, serif;
	overflow-x: hidden;
	overflow-y: hidden;
	
	& .littleFontSize {
	   font-size: 28pt;
	}
`

const AnswerLiteral = styled.div`
    position: relative;
    margin: 0 35px;
    @media only screen and (min-resolution: 192dpi) and (min-width: 1300px) { margin: 0 10px; }
    @media only screen and (min-resolution: 2dppx)  and (min-width: 1300px) { margin: 0 10px; }
    background: ${({status}) => {
      switch(status) {
          case 'right' : return 'linear-gradient(to top, #267500, #36a600)';
          case 'wrong' : return 'linear-gradient(to top, #9c1006, #e30613)';
          case 'missed': return '#414242';
          default:       return '#414242';
      }
    }};
    //background:  #414242;
    min-width: 104px;
    height: 104px;
    line-height: 104px;
    border-radius: 50%;
    box-shadow: 0 5px 0 ${({ isActive, status }) => {
    	switch(true) {
		    case (isActive && !status)  : return '#1ff2ff';
		    case status === 'right'     : return '#267500';
		    case status === 'wrong'     : return '#9c1006';
		    case status === 'missed'    : return '#414242';
		    default : return 'white';
	    }
    }};
    font-size: 100px;
    color: ${props => props.isActive ? 'rgb(218,218,218)' : '#1ff2ff'};
    font-family: Overpass, sans-serif;
    box-sizing: border-box;
    text-align: center;
    
    .question_mark {
    	width: 100%;
    	height: 100%;
        position: absolute;
	    top: 50%;
	    left: 50%;
	    transform: translate(-50%,-50%);
    }
`

const AcceptAnswerButton = styled.button`
    cursor: pointer;
    color: #1ff2ff;
    margin: 50px auto 0;
    display: block;
    width: 300px;
    height: 85px;
    border: none;
    background: linear-gradient(rgb(90,90,90),rgb(49,46,48));
    box-shadow: 0px 4px 3px rgba(40,40,40,1), 0px -2px 0px rgba(255,255,255,1);
    border-radius: 42px;
    font-size: 54pt;
    font-family: Overpass, sans-serif;
    font-weight: Bold;
`
// font-size: ${props => props.answerText.length > 45 ? '38pt' : props.answerText.length > 40 ? '42pt' : '46pt'}; F4M-972
const AnswerButton = styled.button`
    text-align: left;
    display: flex;
    align-items: center;
    font-size: 36pt;
    font-family: Overpass, sans-serif;
    margin: auto;
    width: 708px;
    min-height: 168px;
    overflow: hidden;
    cursor: pointer;
    background-image: ${props => props.isActive ? 'linear-gradient(to bottom, rgb(29,210,221), rgb(23,172,181))' : 'linear-gradient(to bottom, #fff, rgb(182,185,189))'};
    background: ${props => props.background};
    border-bottom: 1px solid #727272;
    &:first-child{
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
    }
    &:last-child{
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        border-bottom: 0;
    }
`

const EmptyAnswerButton = styled(AnswerButton)`
    background-image: none;
    background-color: #4d4d4d;
    border-bottom: 1px solid #4d4d4d;
`

const EmptyAnswerLiteral = styled(AnswerLiteral)`
    box-shadow: none;
    position:relative;
    &::before {
        content: '';
        height: 100%;
        width: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%,-54%);
        -ms-transform: translate(-50%,-54%);
        transform: translate(-50%,-54%);
        background: url(images/add-enemy.png) center no-repeat;
    }
`

const CurrentIndex = styled.span`
  display: block;
  position: absolute;
  bottom: -25px;
  left: -25px;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #267500;
  font-family: Univers, sans-serif;
  font-size: 54px;
  font-weight: 500;
  font-style: normal;
  font-stretch: condensed;
  line-height: 64px;
  letter-spacing: -1.4px;
  text-align: center;
  color: #e6e6e6;
`

const AnswerButtonsWrapper = styled.div`
`

const QuestionWrapper = styled.div`
    background-color: #323232;
`

export default class TextSortingGame extends React.Component{

    state = {
        selectedAnswers    : [],
        blockAnswer        : false
    }

    componentDidMount = () => {
        this.props.setNewTimer(this.props.countdown)
    }

    componentWillReceiveProps(nextProps){
	    this.setState({ blockAnswer: !!(nextProps.answer && !this.props.answer) });
    }

    getAnswerNumber = (answer) => {
        let number = null
        this.state.selectedAnswers.forEach((item, i) => {
            if(answer === item){
                number = i + 1
            }
        })

        return number
    }

    getAnswerButtons = () => {
        const answers = this.props.question && this.props.question.mappings ? this.props.question.mappings[1].answers : null
        const answersArr = []
        const correctAnswersArr = this.props.answer ? this.props.answer.correctAnswers : []
        const { blockAnswer } = this.state
        const resultStatus = [];
        let status = null;
        let needToBeSorted = false
    
        if(answers){
            let objSize = 0

            for(let key in answers){
                const answerNumber = this.getAnswerNumber(key) // user selected answer
                const correctNumber = (correctAnswersArr && correctAnswersArr.indexOf(key) !== -1) ? correctAnswersArr.indexOf(key) + 1 : null

                if(blockAnswer && answerNumber && correctNumber) {
                    if (answerNumber === correctNumber) {
                        status = 'right';
                        resultStatus.push(status);
                    } else {
                        status = 'wrong';
                        resultStatus.push(status);
                    }
                    if (!answerNumber) status = 'missed'
                }

                if (answers[key] === "") {
                    needToBeSorted = true
                    answersArr.push(
                        <EmptyAnswerButton key={key}>
                            <EmptyAnswerLiteral/>
                        </EmptyAnswerButton>
                    )
                } else {
                    answersArr.push(
                        <AnswerButton
                            isActive={answerNumber}
                            key={key}
                            value={key}
                            answerText={answers[key]}
                            onClick={(e) => this.selectAnswer(e)}
                        >
                            <AnswerLiteral
                                isActive={answerNumber}
                                status={status}
                                onClick={(e) => {
                                	e.target = e.target.parentNode;
                                	this.selectAnswer(e);
                                	e.stopPropagation();
                                }}
                            >
	                            <img
		                            className='question_mark'
		                            src={`images/${answerNumber ? `answerletter_${answerNumber}` : 'question_mark'}.png`}
		                            alt='question mark'
		                            onClick={(e) => {
			                            e.target = e.target.parentNode.parentNode;
			                            this.selectAnswer(e);
			                            e.stopPropagation();
		                            }}
	                            />
                                {(blockAnswer && answerNumber && correctNumber) ? (status !== 'right' ? <CurrentIndex>{correctNumber}</CurrentIndex> : null) : null}
                            </AnswerLiteral>
                            {answers[key]}
                        </AnswerButton>
                    )
                }

                objSize++
            }

            while (objSize<4) {
                needToBeSorted = true
                answersArr.push(
                    <EmptyAnswerButton key={objSize}>
                        <EmptyAnswerLiteral/>
                    </EmptyAnswerButton>
                )
                objSize++
            }
        }

        if(~resultStatus.indexOf('wrong')){
            this.props.wrongAnswerSound();
        } else if(resultStatus.length > 0){
            this.props.correctAnswerSound();
        }

        return (needToBeSorted && !window.navigator.userAgent.includes("iPhone")) ?
            answersArr.sort(a => {
                if (a.props.answerText) return -1
                else return 1
            })
            :
            answersArr
    }

    selectAnswer = (e) => {
        if(!(this.props.answer && this.props.answer.correctAnswers && this.props.answer.correctAnswers[0])){
            let answerIndex = null
            let answers = [...this.state.selectedAnswers]

            answerIndex = answers.findIndex( (element, index)=>{
                if(element === e.target.value){
                    answerIndex = index
                    return true
                }
                return false
            } )

            if(answerIndex === -1){
                answers.push(e.target.value)
            }else{
	            answers.splice(answerIndex, answers.length)
            }

            this.props.answerClick();
            localStorage.setItem('selectedAnswer', JSON.stringify(answers))
            this.setState({ selectedAnswers: answers })
        }
    }

    getAnswersOrder = () => {
        const answers = this.props.question && this.props.question.mappings ? this.props.question.mappings[1].answers : null
        let answerNumbersArray = []
        if(answers){
            for(let key in answers){
                answerNumbersArray.push(this.getAnswerNumber(key))
            }
        }
        return answerNumbersArray.join(' ')
    }

    getResultOrder = () => {
        let orderArr = []
        let answers = this.props.question && this.props.question.mappings ? Object.keys(this.props.question.mappings[1].answers) : null
        let selectedAnswers = this.state.selectedAnswers
        for(let i = 0; i < selectedAnswers.length; i++){
            for(let j = 0; j < answers.length; j++){
                if(answers[j] === selectedAnswers[i]){
                    orderArr.push(j + 1)
                }
            }
        }

        return orderArr.concat('')
    }

    answerQuestion = () => {
        this.props.answerQuestion(this.state.selectedAnswers)
        this.props.setAnswerTime(this.props.question.countdown)
        // if order will be wrong, need to change getResultOrder to getAnswerNumber method
        this.props.setAnswerLetter(this.getResultOrder())
        this.props.stopTimer()
        this.props.acceptBtnClick();
        this.setState({blockAnswer: true})
    }

    render(){
        let questionText = this.props.question && this.props.question.mappings ? this.props.question.mappings[0].value : null
        const answers = this.props.question && this.props.question.mappings ? this.props.question.mappings[1].answers : null

	    const reg = new RegExp('([1|3]\\s?=\\s?\\D+)', 'igm');
	    questionText = questionText.split(reg);
	    questionText = questionText.map((item, index) => reg.test(item) ? <span style={{ color: 'yellow' }} key={index}>{item}</span> : item)[0];

        /*const questionTextArr = questionText.split(' ');
        let questionClassName = null
        questionTextArr.forEach(word => {
            if (word.length>12) {
                questionClassName = "littleFontSize"
            }
        })*/

	    return(
            <div>
                <QuestionWrapper>
                    <QuestionText>
                        {questionText}
                    </QuestionText>
                    <AnswerButtonsWrapper>
                        {this.getAnswerButtons()}
                    </AnswerButtonsWrapper>
                    {
                        this.state.selectedAnswers.length === Object.keys(answers).length && !this.state.blockAnswer ?
                        <AcceptAnswerButton onClick={this.answerQuestion}>OK</AcceptAnswerButton>
                        :
                        null
                    }
                </QuestionWrapper>
            </div>
        )
    }
}
