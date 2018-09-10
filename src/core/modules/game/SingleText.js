import React from 'react'
import styled from 'styled-components'

const QuestionText = styled.div`
    display: flex;
	align-items: center;
	justify-content: center;
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
    min-height: 215px;
    max-height: 215px;
	overflow-x: hidden;
	overflow-y: hidden;
     
     & .littleFontSize {
        font-size: 28pt;
     }
`

const AnswerLiteral = styled.div`
    margin-left: ${({isIphone}) => isIphone ? "-15px" : "35px"};
    margin-right: 35px;
    background-color: #414242;
    box-shadow: 0 5px 0 ${({ isActive, status }) => {
        switch(true) {
            case (isActive && !status)  : return '#1ff2ff';
            case status === 'right'     : return '#267500';
            case status === 'wrong'     : return '#9c1006';
            case status === 'missed'    : return '#414242';
            default : return 'white';
        }
    }};
    min-width: 104px;
    height: 104px;
    line-height: 120px;
    border-radius: 50%;
    font-size: 90px;
    color: ${props => props.isActive ? 'rgb(218,218,218)' : '#1ff2ff'};
    font-family: Aharoni;
    box-sizing: border-box;
    text-align: center;
    position: relative;
    
    & > span, img {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      display: block;
      text-align: left;
    }
    & > img {
    	width: 100px;
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

// font-size: ${props => props.answerText.length > 45 ? '38px' : props.answerText.length > 40 ? '42px' : '46px'}; F4M-972
const AnswerButton = styled.button`
    text-align: left;
    display: flex;
    align-items: center;
    font-size: 36pt;
    font-family: Overpass, sans-serif;
    margin: auto;
    width: 708px;
    min-height: 168px;
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

const AnswerButtonsWrapper = styled.div`
`

const QuestionWrapper = styled.div`
    background-color: #323232;
`

export default class TextGame extends React.Component{

    state = {
        selectedAnswer: '',
        blockAnswer: false
    }

    componentDidMount = () => {
        this.props.setNewTimer(this.props.countdown)
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.answer && !this.props.answer) {
            this.setState({blockAnswer: true})
        } else {
	        this.setState({blockAnswer: false})
        }
    }

    checkAnswer = (buttonId) => {
    	const provideAnswer = this.state.selectedAnswer;
    	const correctAnswer = this.props.answer && this.props.answer.correctAnswers && this.props.answer.correctAnswers[0];

        if(correctAnswer){
	        if(buttonId === correctAnswer){
                if(provideAnswer && provideAnswer === correctAnswer) {
                	this.props.correctAnswerSound();
                } else {
	                this.props.wrongAnswerSound();
                }
                return 'green'
            }else if(provideAnswer === buttonId && buttonId !== correctAnswer){
                this.props.wrongAnswerSound();
                return 'red'
            }
        }
    }

    getAnswerButtons = () => {
        function getAnswerLetter(){
            let letter = prevLetter ? String.fromCharCode(prevLetter.charCodeAt() + 1) : 'A'
            prevLetter = letter
            showLetter = letter
        }

        const isIphone = window.navigator.userAgent.includes("iPhone")

        let prevLetter = null
        let showLetter = null
        const answers = this.props.question && this.props.question.mappings ? this.props.question.mappings[1].answers : null
        const answersArr = []
        let needToBeSorted = false

        if(answers){
            let objSize = 0

            for(let key in answers){

                if (answers[key] === "") {
                    needToBeSorted = true
                    answersArr.push(
                        <EmptyAnswerButton key={key}>
                            <EmptyAnswerLiteral/>
                        </EmptyAnswerButton>
                    )
                } else {
                    const status = this.checkAnswer(key);

	                getAnswerLetter()
	                let letter = showLetter
                    answersArr.push(
                        <AnswerButton
                            isActive={this.state.selectedAnswer === key}
                            key={key}
                            value={key}
                            answerText={answers[key]}
                            onClick={(e) => this.selectAnswer(e, letter)}
                            background={status}
                        >
                            <AnswerLiteral
	                            isActive={this.state.selectedAnswer === key}
                                isIphone={isIphone}
	                            status={status === 'green' ?
	                                    'right' : (status === 'red' ? 'wrong' :
	                                        '')
	                            }
                            >
                                <img
	                                onClick={(e) => {
		                                e.target = e.target.parentNode.parentNode;
		                                this.selectAnswer(e, letter);
		                                e.stopPropagation();
	                                }}
	                                src={`images/answerletter_${letter}.png`}
	                                alt=''
                                />
                            </AnswerLiteral>
                            {answers[key]}
                        </AnswerButton>)
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



        return (needToBeSorted && !window.navigator.userAgent.includes("iPhone")) ?
            answersArr.sort(a => {
                if (a.props.answerText) return -1
                else return 1
            })
            :
            answersArr
    }

    selectAnswer = (e, answerLetter) => {
        if(!(this.props.answer && this.props.answer.correctAnswers && this.props.answer.correctAnswers[0])){
            this.setState({selectedAnswer: e.target.value, answerLetter: answerLetter}, () => {
                localStorage.setItem('selectedAnswer', JSON.stringify([this.state.selectedAnswer]))
            })
        }

        this.props.answerClick();
    }

    answerQuestion = () => {
        const value = this.state.selectedAnswer
        const answersArray = []
        answersArray.push(value)
        this.props.answerQuestion(answersArray)
        this.props.setAnswerTime(this.props.question.countdown)
        this.props.setAnswerLetter(this.state.answerLetter)
        this.props.stopTimer()
        this.props.acceptBtnClick();
        this.setState({blockAnswer: true})

    }

    render(){
        const questionText = this.props.question && this.props.question.mappings ? this.props.question.mappings[0].value : null
        const questionLength = questionText.length
        const answerButtons = this.getAnswerButtons()

        const questionTextArr = questionText.split(' ');
        let questionClassName = null
        questionTextArr.forEach(word => {
            if (word.length>12) {
                questionClassName = "littleFontSize"
            }
        })

        return(
            <div>
                <QuestionWrapper>
                    <QuestionText questionLength={questionLength} className={questionClassName}>
                        {questionText}
                    </QuestionText>
                    <AnswerButtonsWrapper>
                        {answerButtons}
                    </AnswerButtonsWrapper>
                    {
                        this.state.selectedAnswer  && !this.state.blockAnswer ?
                        <AcceptAnswerButton onClick={this.answerQuestion}>OK</AcceptAnswerButton>
                        :
                        null
                    }
                </QuestionWrapper>
            </div>
        )
    }
}
