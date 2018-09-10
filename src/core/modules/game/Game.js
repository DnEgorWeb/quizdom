import React from 'react'
import e from '../../../langs'

import TimerService from '../../../services/Timer'
import SingleText from './SingleText'
import SinglePicture from './SinglePicture'
import SortingText from './SortingText'
import Advertisement from './Advertisement'
import GameTopBar from '../components/GameTopBar/GameTopBarContainer'
import TextGameEngine from './GameEngine'
import SortingPicture from './SortingPicture'
import Results from '../results/ResultsContainer'
import PictureStep from './PictureStep'

export default class Game extends React.Component{
    constructor(props){
        super(props)
        e.setLanguage(props.language)

        this.engine = new TextGameEngine(this.props.questionBlobKeys, this.onMediaLoad)
        if (this.props.multiplayerGameInstanceId) {
            if (!!localStorage.getItem('multiplayerGameInstanceId')) {
                const storedIds = JSON.parse(localStorage.getItem('multiplayerGameInstanceId'))
                storedIds.push(this.props.multiplayerGameInstanceId)
                localStorage.setItem('multiplayerGameInstanceId', JSON.stringify(storedIds))
            } else {
                const arrToStore = []
                arrToStore.push(this.props.multiplayerGameInstanceId)
                localStorage.setItem('multiplayerGameInstanceId', JSON.stringify(arrToStore))
            }
        }
    
        this.state = {
	        currentTime         : 0,
	        answerTime          : 0,
	        answerLetter        : '',
	        countdown           : 0,
	        loading             : true,
	        question            : null,
	        isMediaLoad         : false,
	        medias              : null,
	        lessThanSevenSeconds: false,
            tracks       : {
	            ANSWER_CLICK     : "media/answer-click.mp3",
	            ANSWER_CORRECT   : "media/answer-correct.mp3",
	            ANSWER_WRONG     : "media/answer-wrong.mp3",
	            BUTTON_CLICK     : "media/button-click.mp3",
	            GD_COUNT_DOWN    : "media/gd_countdown.mp3",
	            GD_QUESTION_START: "media/gd_question_start_neu.wav",
	            INTRO_QUESTIONS  : "media/intro-questions.mp3",
	            TIME_IS_UP       : "media/time_is_up.mp3",
	            TOURNAMENT_START : "media/turnament-start.mp3",
	            TIME_IS_OUT      : "media/gd_countdown_start_long.mp3"
            }
        };

        this.initAudio();
        this.playSound('TOURNAMENT_START');
    }
    
    timer       = null;
    engine      = null;
    audio       = null;
    audioSource = null;

    componentWillReceiveProps = (nextProps) => {
        e.setLanguage(nextProps.language)

        if(nextProps.currentQuestion.questionStepBlobKey && (nextProps.currentQuestion.questionStepBlobKey !== this.props.currentQuestion.questionStepBlobKey)){
            this.setNewQuestion(nextProps.currentQuestion.questionStepBlobKey, nextProps.currentQuestion.decryptionKey)
        }
    }

    componentWillUnmount(){
        this.props.setCloseGame();
        if(!this.timer) return;
        this.timer.stop();
    }
    
    /**
     * creating <audio /> for playing sounds in the application
     */
    initAudio() {
        const audio        = document.createElement('AUDIO');
        const audioSource  = document.createElement('SOURCE');

        audioSource.type = "audio/mpeg";
        audio.appendChild(audioSource);
    
        this.audio       = audio;
        this.audioSource = audioSource;
    }
    
    /**
     * playing sounds while playing
     *
     * @param (string) type
     *  should be one of the list:
     *   ANSWER_CLICK
     *   ANSWER_CORRECT
     *   ANSWER_WRONG
     *   BUTTON_CLICK
     *   GD_COUNT_DOWN
     *   GD_QUESTION_START
     *   INTRO_QUESTIONS
     *   TIME_IS_UP
     *   TOURNAMENT_START
     *   TIME_IS_OUT
     *
     * @returns {boolean}
     */
    playSound = (type) => {
        if(!this.props.sound) return false;

        const { audio, audioSource } = this;
        const { tracks }             = this.state;

        const play = () => {
            if(!(audio.currentTime > 0 && !audio.paused && !audio.ended && audio.readyState > 2)) {
                audio.onended = false;
                audioSource.src = tracks[ type ];
                audio.load();
                audio.oncanplaythrough = audio.play;
            } else {
                audio.oncanplaythrough  = false;
                audio.onended = play;
            }
        }
        play();
    }

    onMediaLoad = (isQuestion) => {
        const { medias } = this.engine

        this.setState({isMediaLoad: true},() => console.log('loaded'))

        if (isQuestion) {
            this.setResultTypeList()
        } else {
            this.props.setNewImage(medias);
        }
    }

    setResultTypeList() {
        const question = this.engine.getQuestion()
        const { medias } = this.engine
        const { setTypeList } = this.props

        if (
            question.mappings &&
            Array.isArray(question.mappings) &&
            typeof question.mappings[1].id !== 'undefined'
        ) {
            const obj = {
                types: question.mappings[1].id,
                medias
            }

            setTypeList(obj);
        }
    }

    stopTimer = () => {
        if(this.timer){
            this.timer.stop()
            this.timer = null
        }
    }

    setCurrentTime = (time) => {
        this.setState({currentTime: time, lessThanSevenSeconds: false});
    }

    setAnswerLetter = (letter) => {
        this.setState({answerLetter: letter})
    }

    setNewQuestion = (questionStepBlobKey, decryptionKey) => {
        // bad bad bad
        if(this.engine.questionsLoaded ){
            this.engine.medias = {}
            this.engine.setQuestion(questionStepBlobKey, decryptionKey);
            this.setState(
                {questionStepBlobKey: questionStepBlobKey},
                this.showStep
            )
        }else{
            setTimeout(() => {
                this.setNewQuestion(questionStepBlobKey, decryptionKey)
            }, 100)
        }
    }

    showStep = () => {
        const question = this.engine.getQuestion()
        if(question){
            this.engine.loadMedias(question.medias)
            if( question.mappings[1].answers){
                this.props.setQuestionLetterMap(question)
            }
            this.props.setNewQuestion(question)
            this.setState({question: question})
        }
    }

    setNewTimer = (countdown, timeout) => {
        if(this.timer || typeof countdown === 'undefined') return
        this.timer = new TimerService(countdown ,this.setCurrentTime, timeout || this.timeoutAnswer)
        this.setCurrentTime(countdown)
        this.timer.start()
        this.setState({countdown: countdown})
        if (this.state.question.mappings[0].id !== 'IMAGE')
	        this.playSound('GD_QUESTION_START');
    }

    setAnswerTime = (countdown) => {
        const answerTime = countdown - this.state.currentTime
        this.setState({answerTime: answerTime})
    }

    timeoutAnswer = () => {
        const selectedAnswer = localStorage.getItem('selectedAnswer')
        if (selectedAnswer) {
            this.props.answerQuestion(JSON.parse(selectedAnswer))
        } else {
            this.props.answerQuestion([])
        }
        this.stopTimer()
        this.setState(() => {return {answerLetter: '', currentTime: 0, answerTime: 0}})
        localStorage.setItem('selectedAnswer', '')
    }

    nextStep = () => {
        this.stopTimer()
        this.props.nextStep()
    }


    getGame = () => {
        const materialType = this.state.question.mappings[0].id
        const answerType = this.state.question.mappings[1].id
        const questionType = this.state.question.mappings[1].handler

        if(materialType === 'IMAGE' && !questionType){
            return(
                <PictureStep
                    isMediaLoad = {this.state.isMediaLoad}
                    medias={this.engine.medias}
                    key={this.props.currentQuestion.questionStepBlobKey}
                    engine = {this.engine}
                    setNewTimer = {this.setNewTimer}
                    setAnswerTime = {this.setAnswerTime}
                    question={this.state.question}
                    countdown={this.engine.getQuestion().countdown}
                    nextStep={this.nextStep}
                    language={this.props.language}
                    wrongAnswerSound={() => this.playSound('ANSWER_WRONG')}
                    correctAnswerSound={() => this.playSound('ANSWER_CORRECT')}
                />
            )
        }else if(questionType === "SingleChoiceAnswerHandler" && answerType === "ANSWER_IMAGE"){
            return(
                <SinglePicture
                    isMediaLoad = {this.state.isMediaLoad}
                    medias={this.engine.medias}
                    key={this.props.currentQuestion.questionStepBlobKey}
                    engine = {this.engine}
                    setNewTimer = {this.setNewTimer}
                    stopTimer = {this.stopTimer}
                    setAnswerTime = {this.setAnswerTime}
                    setAnswerLetter={this.setAnswerLetter}
                    setQuestion={this.props.setQuestion}
                    answerQuestion={this.props.answerQuestion}
                    question={this.state.question}
                    answer={this.props.answer}
                    countdown={this.engine.getQuestion().countdown}
                    language={this.props.language}
                    answerClick={() => {this.playSound('ANSWER_CLICK')}}
                    acceptBtnClick={() => {this.playSound('BUTTON_CLICK')}}
                    wrongAnswerSound={() => this.playSound('ANSWER_WRONG')}
                    correctAnswerSound={() => this.playSound('ANSWER_CORRECT')}
                />
            )
        }else if(questionType === "SortingAnswerHandler" && answerType === "ANSWER_IMAGE_SORT"){
            return(
                <SortingPicture
                    medias={this.engine.medias}
                    key={this.props.currentQuestion.questionStepBlobKey}
                    engine = {this.engine}
                    setNewTimer = {this.setNewTimer}
                    stopTimer = {this.stopTimer}
                    setAnswerTime = {this.setAnswerTime}
                    setAnswerLetter={this.setAnswerLetter}
                    setQuestion={this.props.setQuestion}
                    answerQuestion={this.props.answerQuestion}
                    question={this.state.question}
                    answer={this.props.answer}
                    countdown={this.engine.getQuestion().countdown}
                    language={this.props.language}
                    answerClick={() => {this.playSound('ANSWER_CLICK')}}
                    acceptBtnClick={() => {this.playSound('BUTTON_CLICK')}}
                    wrongAnswerSound={() => this.playSound('ANSWER_WRONG')}
                    correctAnswerSound={() => this.playSound('ANSWER_CORRECT')}
                />
            )
        }else if(questionType === "SingleChoiceAnswerHandler"){
            return(
                <SingleText
                    key={this.props.currentQuestion.questionStepBlobKey}
                    engine = {this.engine}
                    setNewTimer = {this.setNewTimer}
                    stopTimer = {this.stopTimer}
                    setAnswerTime = {this.setAnswerTime}
                    setAnswerLetter={this.setAnswerLetter}
                    setQuestion={this.props.setQuestion}
                    answerQuestion={this.props.answerQuestion}
                    question={this.state.question}
                    answer={this.props.answer}
                    countdown={this.engine.getQuestion().countdown}
                    language={this.props.language}
                    answerClick={() => {this.playSound('ANSWER_CLICK')}}
                    acceptBtnClick={() => {this.playSound('BUTTON_CLICK')}}
                    wrongAnswerSound={() => this.playSound('ANSWER_WRONG')}
                    correctAnswerSound={() => this.playSound('ANSWER_CORRECT')}
                />
            )
        }else if(questionType === "SortingAnswerHandler"){
            return (
                <SortingText
                    key={this.props.currentQuestion.questionStepBlobKey}
                    currentQuestionKey={this.props.currentQuestion.questionStepBlobKey}
                    engine = {this.engine}
                    setNewTimer = {this.setNewTimer}
                    stopTimer = {this.stopTimer}
                    setAnswerTime = {this.setAnswerTime}
                    setAnswerLetter={this.setAnswerLetter}
                    setQuestion={this.props.setQuestion}
                    answerQuestion={this.props.answerQuestion}
                    question={this.state.question}
                    answer={this.props.answer}
                    countdown={this.engine.getQuestion().countdown}
                    language={this.props.language}
                    answerClick={() => {this.playSound('ANSWER_CLICK')}}
                    acceptBtnClick={() => {this.playSound('BUTTON_CLICK')}}
                    wrongAnswerSound={() => this.playSound('ANSWER_WRONG')}
                    correctAnswerSound={() => this.playSound('ANSWER_CORRECT')}
                />
            )
        }
    }

    getIndicatorStatus = () => {
        if(!this.props.currentQuestion.questionStepBlobKey){
            return 'loading'
        }else if(this.props.advertisement){
            return 'advertisement'
        }else if(this.state.currentTime <= 7){
            return 'end_time'
        }else{
            return 'normal_time'
        }
    }

    render(){
        let component = null;

        if(this.props.advertisement){
	        const { answerLetter } = this.state;
	        const { serverMsT } = this.props;
	        let symbol = answerLetter.props ? answerLetter.props.alt : answerLetter;

            component = (
                <Advertisement
                    loading={this.props.currentQuestion.questionStepBlobKey}
                    answerLetter = {symbol}
                    answerTime={Math.round(serverMsT / 1000)}
                    showAdvertisement={this.props.showAdvertisement}
                    advertisement={this.props.advertisement}
                    language={this.props.language}
                />
            )
        }else if(this.props.ended) {
            component = (
                <Results restartGame={this.props.restartGame}/>
            )
        }else if(this.props.currentQuestion && this.props.currentQuestion.questionStepBlobKey && this.state.question){
            component = this.getGame()
        }

	    if(this.state.currentTime === 7) {
            if(!this.state.lessThanSevenSeconds) {
	            this.playSound('TIME_IS_OUT');
	            this.setState({ lessThanSevenSeconds: true });
            }
	    }

	    const isMobile = window.navigator.userAgent.includes("iPhone") || window.navigator.userAgent.includes("Android")
        const marginRight = isMobile ? '0' : '-15px'

        return(
            <div style={{height: '100%', overflow: 'hidden'}}>
                <div style={{height: '100%', overflowY: 'scroll', backgroundColor: '#2c2c2c', marginRight: marginRight }}>
                    <div style={{height: '97%', backgroundColor: '#323232', paddingTop: '30px'}}>
                        {!this.props.ended ?
                            <GameTopBar
                                status={this.getIndicatorStatus()}
                                currentTime={this.state.currentTime}
                                advertisement={this.props.advertisement}
                                countdown={this.state.countdown}
                            />
                            :
                            null
                        }
                        {component}
                    </div>
                </div>
            </div>
        )
    }
}
