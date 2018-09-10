import React from 'react'
import styled from 'styled-components'

const QuestionText = styled.div`
    display: flex;
    align-items: center;
	justify-content: center;
    font-size: ${({children}) => children.length > 130 ? '24pt' : children.length > 80 ? '28pt' : children.length > 70 ? '34pt' : children.length > 50 ? '35pt' : children.length > 35 ? '40pt' : '48pt'};
    text-align: center;
    color: #ffffff;
    width: 585px;
    margin: auto;
    //margin-bottom: 50px;
    padding-top: 50px;
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
    position: absolute;
    top: -20px;
    left: -20px;
    width: 113px;
    height: 120px;
    background: url(images/letter-circle.png) no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 70px;
    font-family: Aharoni, sans-serif;
    font-stretch: semi-condensed;
    color: #1ff2ff;
`

const AcceptAnswerButton = styled.button`
    cursor: pointer;
    color: #1ff2ff;
    margin: auto;
    display: block;
    width: 300px;
    height: 85px;
    border: none;
    background: linear-gradient(rgb(90,90,90),rgb(49,46,48));
    box-shadow: 0px 4px 3px rgba(40,40,40,1), 0px -2px 0px rgba(255,255,255,1);
    border-radius: 42px;
    font-size: 54pt;
    margin-top: 50px;
    font-family: Overpass, sans-serif;
    font-weight: Bold;
`

const AnswerButton = styled.div`
    position:relative;
    cursor: pointer;
    width: 330px;
    height: 330px;
    //background-image: ${props => props.isActive ? 'linear-gradient(to bottom, rgb(29,210,221), rgb(23,172,181))' : 'linear-gradient(to bottom, #fff, rgb(182,185,189))'};
    //background: ${props => props.background};
    // background: ${({ isActive }) => isActive ? 'none' : 'white'};
    background: #4c444a;
    border: 3px solid ${props => props.isActive ? 'rgb(31,241,255)' : 'rgb(215, 215, 221)'};
    border-radius: 10px;
    margin: 5px;
    padding: 0;

	img.answer_letter{
		display: block;
		width: 85px;
		height: auto;
		margin-top: -5px;
	}
    img.answer_image{
        width: ${({ isActive }) => isActive ? '288px' : '332px'};
        height: ${({ isActive }) => isActive ? '288px' : '332px'};
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 0;
        border-radius: 10px;
    }
    .active-frame{
        position: absolute;
        width: 290px;
        height: 290px;
        border: 20px solid ${props => props.background || '#4c444a'};
        border-radius: 10px;
        z-index: 1;

        .inside-border{
            width: 100%;
            height: 100%;
            border: 4px solid rgb(215,215,221);
            border-radius: 10px;
            position:relative;
            overflow:hidden;
            box-sizing: border-box;

            div {
                position:absolute;
                width: 118px;
                height: 121px;
                border-radius: 100%;
                left:-9%;
                top:-10%;
                background-color: rgb(215,215,221);
            }
        }
    }
`

const AnswerButtonsWrapper = styled.div`
    padding-top: 30px;
    padding-left: 30px;
    margin: auto;
    height: 710px;
    background: url('images/intro-bg.png') center top no-repeat;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    background-size: 100%;
`

const QuestionWrapper = styled.div`
    background-color: #323232;
`

export default class SinglePicture extends React.Component{

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
        if(this.props.answer && this.props.answer.correctAnswers && this.props.answer.correctAnswers[0]){
            if(buttonId === this.props.answer.correctAnswers[0]){
                if(this.state.selectedAnswer !== '' && this.state.selectedAnswer === this.props.answer.correctAnswers[0]){
                    this.props.correctAnswerSound();
                } else {
                    this.props.wrongAnswerSound();
                }
                return 'green'
            }else if(this.state.selectedAnswer === buttonId && buttonId !== this.props.answer.correctAnswers[0]){
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

        let prevLetter = null
        let showLetter = null
        const answers = this.props.question && this.props.question.mappings ? this.props.question.mappings[1].answers : null
        const answersArr = []

        if(answers){
            for(let key in answers){
                getAnswerLetter()
                const media = this.props.medias[answers[key]]
                const isActive = this.state.selectedAnswer === key
                let letter = <img className='answer_letter' src={`images/answerletter_${showLetter}.png`} alt={showLetter} />;

                answersArr.push(
                    <AnswerButton
                        isActive={isActive}
                        key={key}
                        background={this.checkAnswer(key)}
                    >
                        {isActive || this.checkAnswer(key) === 'green'
                            ?
                            <div className='active-frame'>
                                <div className='inside-border'><div /></div>
                                <AnswerLiteral className isActive={this.state.selectedAnswer === key}>{letter}</AnswerLiteral>
                            </div>
                            :
                            null
                        }
                        <img
	                        className='answer_image'
	                        name={key}
	                        onClick={(e) => this.selectAnswer(e, letter)}
	                        src={'data:image/png;base64,' + media}
	                        alt=''
                        />
                    </AnswerButton>)
            }
        }
        return answersArr
    }

    selectAnswer = (e, answerLetter) => {
        if(!(this.props.answer && this.props.answer.correctAnswers && this.props.answer.correctAnswers[0])){
            this.setState({selectedAnswer: e.target.name, answerLetter: answerLetter}, () => {
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
        // const questionTextArr = questionText.split(' ');
        /*let questionClassName;

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
                        this.state.selectedAnswer && !this.state.blockAnswer ?
                        <AcceptAnswerButton onClick={this.answerQuestion}>OK</AcceptAnswerButton>
                        :
                        null
                    }
                </QuestionWrapper>
            </div>
        )
    }
}
