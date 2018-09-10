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
    font-family: Overpass, Regular, serif ;
    overflow-x: hidden;
    overflow-y: hidden;
    min-height: 215px;
    max-height: 215px;
    
    & .littleFontSize {
       font-size: 28pt;
    }
`

const AnswerLiteral = styled.div`
    position: absolute;
    top: -20px;
    left: -20px;
    //background-image: url(images/letter-circle.png);
    background: ${({status}) => {
    	if(status) {
		    switch(status) {
			    case 'right' :
				    return 'linear-gradient(to top, #267500, #36a600)';
			    case 'wrong' :
				    return 'linear-gradient(to top, #9c1006, #e30613)';
			    case 'missed':
				    return '#4c444a';
			    default:
				    return '#4c444a';
		    }
	    }else {
		    return 'url(images/letter-circle.png)';
	    }
    }};
    border-radius: 50%;
    width: 113px;
    height: 110px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 130px;
    font-family: Aharoni, sans-serif;
    color: #1ff2ff;
`

const CurrentIndex = styled.span`
  display: block;
  position: absolute;
  top: -20px;
  left: 55px;
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
    border: 4px solid ${props => props.isActive ? 'rgb(31,241,255)' : 'rgb(215, 215, 221)'};
    border-radius: 10px;
    margin: 5px;
    padding: 0;
    overflow: hidden;

    img.answer_image{
        width:  ${({ isActive }) => isActive ? '285px' : '332px'};
        height: ${({ isActive }) => isActive ? '285px' : '332px'};
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
        border: 20px solid ${({status}) => {
            switch(status) {
                case 'right' : return '#48484b';
                case 'wrong' : return '#e30613';
                default:       return '#4c444a';
            }
        }};
        border-radius: 10px;
        z-index: 1;

        .inside-border{
            width: 100%;
            height: 100%;
            border: 4px solid rgb(215, 215, 221);
            border-radius: 10px;
            position: relative;
            overflow: hidden;
            box-sizing: border-box;

            div {
                position: absolute;
                width: 118px;
                height: 115px;
                border-radius: 100%;
                left:-9%;
                top:-9%;
                background-color: rgb(215,215,221);
            }
        }
    }
`

const AnswerButtonsWrapper = styled.div`
    padding-top: 30px;
    padding-left: 30px;
    margin: auto;
    background: url('images/intro-bg.png') center top no-repeat;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    background-size: 100%;
`

const QuestionWrapper = styled.div`
    background-color: #323232;
`

export default class SortingPicture extends React.Component{

    state = {
        selectedAnswers: [],
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
        const {blockAnswer } = this.state
        let status = null

        if(answers){
            for(let key in answers){
                const media = this.props.medias[answers[key]]
                const answerNumber = this.getAnswerNumber(key) // user selected answer
                const isActive = !!answerNumber
                const correctNumber = correctAnswersArr.indexOf(key) !== -1 ? correctAnswersArr.indexOf(key) + 1 : null

                if(blockAnswer) {
                    if (answerNumber === correctNumber) {
                        status = 'right'
                    } else {
                        status = 'wrong'
                    }
                    if (!answerNumber) status = 'missed'
                }

                answersArr.push(
                    <AnswerButton
                        isActive={answerNumber}
                        key={key}
                        name={key}
                        onClick={() => this.selectAnswer(key)}
                        status={status}
                    >
                        {isActive
                            ?
                            <div className='active-frame'>
                                <div className='inside-border'><div /></div>
                                <AnswerLiteral
                                    isActive={isActive}
                                    status={status}
                                >
                                    {answerNumber || '?'}
                                </AnswerLiteral>
                                {blockAnswer ? (status !== 'right' ? <CurrentIndex>{correctNumber}</CurrentIndex> : null) : null}
                            </div>
                            :
                            null

                        }
                        <img className='answer_image' src={'data:image/png;base64,' + media} alt=''/>
                    </AnswerButton>)
            }
        }
        return answersArr
    }

    selectAnswer = (name) => {
        if(!(this.props.answer && this.props.answer.correctAnswers && this.props.answer.correctAnswers[0])){
            let answerIndex = null
            let answers = [...this.state.selectedAnswers]

            answerIndex = answers.findIndex( (element, index)=>{
                if(element === name){
                    answerIndex = index
                    return true
                }
                return false
            } )

            if(answerIndex === -1){
                answers.push(name)
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
        const questionText = this.props.question && this.props.question.mappings ? this.props.question.mappings[0].value : null
        const answers = this.props.question && this.props.question.mappings ? this.props.question.mappings[1].answers : null

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
                        this.state.selectedAnswers.length === Object.keys(answers).length  && !this.state.blockAnswer ?
                        <AcceptAnswerButton onClick={this.answerQuestion}>OK</AcceptAnswerButton>
                        :
                        null
                    }
                </QuestionWrapper>
            </div>
        )
    }
}