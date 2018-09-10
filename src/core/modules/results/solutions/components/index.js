import React from 'react'
import e from '../../../../../langs'
import InfoPanel from './infoPanel'
import Feedback from "./Feedback";
import {
    SolutionsWrapper,
    SolutionsContent,
    QuestionNumbersList,
    QuestionNumber,
    QuestionTextBlock,
    QuestionText,
    AnswersBlock,
    AnswersList,
    AnswerButton,
    AnswerImageButton,
    InnerBox,
    AnswerButtonsWrapper,
    AnswerLiteral,
    AnswerLiteralShadow,
    AnswerLetter,
    // AnswerText,
    NoAnswerMessage,
    MessageText,
    BottomInfoNav,
    InfoItem,
    TextBlock,
    CorrectNumber,
    CorrectNumberForImage,
    QuestionNumberListWrapper,
    // NavigationNextOneQuestion,
    NavigationNextQuestions,
    SpanResult,
    QuestionNumberListMiddleBlock,
    QuestionNumberListMiddleBlockInner
} from './styledComponents'
import PictureBlock from './pictureBlock'
import TopBar from '../../../components/GameResultsTopBar'

export default class Solutions extends React.Component {
    constructor(props) {
        super(props);
        e.setLanguage(props.language);
    }

    state = {
        showMessage         : true,
        currentTab          : null,
        currentQuestion     : 0,
        isInfoPanelOpen     : false,
        questionObjs        : [],
        defaultQuestions    : [],
        isNavigationForward : true,
        paginationPosition  : 0
    }

    tabs = [
        {imgSrc: 'images/info-1'},
        {imgSrc: 'images/info-2'},
        {imgSrc: 'images/info-3'},
        {imgSrc: 'images/info-4'},
    ]
    
    componentWillReceiveProps(nextProps) {
        e.setLanguage(nextProps.language)
    }

    componentWillMount() {
        this.getImagesInfo()

        this.setState({
            questionObjs: this.props.questionObjs,
            defaultQuestions: this.props.questionObjs
        })
    }

    getImagesInfo = () => {
        const {getMedia, pictureObjs, clearImageInfo} = this.props
        clearImageInfo()
        const numberOfQuestion = this.state.currentQuestion
        const imagesObj = pictureObjs[numberOfQuestion]

        for (let key in imagesObj) {
            getMedia(imagesObj[key])
        }
    }

    selectTab = (index) => {
        this.setState({ currentTab: index, isInfoPanelOpen: true }, () => this.getImagesInfo())
    }

    tabClickHandler = (index) => {
        const {currentTab} = this.state;
        if (currentTab === index) {
            this.closeInfoPanelHandler();
        } else {
            this.selectTab(index)
        }
    }

    movePaginationPositionForward = () => {
        const {
                  paginationPosition,
                  currentQuestion
              } = this.state;
    
        const stepSize         = 5;
        const { questionObjs } = this.state;
        const newPosition      = (paginationPosition + stepSize) >= questionObjs.length ? paginationPosition : paginationPosition +
                                                                                                               stepSize;
        this.setState({
            paginationPosition: newPosition,
            currentQuestion: (newPosition === paginationPosition ? currentQuestion : newPosition)
        });
    }

    movePaginationPositionBack = () => {
        const {
                  paginationPosition,
                  currentQuestion
              } = this.state;
    
        const stepSize    = 5;
        const newPosition = (paginationPosition - stepSize) <= 0 ? 0 : paginationPosition - stepSize;
    
        this.setState({
            paginationPosition: newPosition,
            currentQuestion: (newPosition === paginationPosition ? currentQuestion : newPosition)
        });
    }

    selectQuestion = (index) => {
        const questionsPerRow = 5
        const maxQuestionsInOneRow = 7
        const commonLength = this.state.defaultQuestions.length
        if (index >= this.state.questionObjs.length) return
        if (index === questionsPerRow && commonLength>maxQuestionsInOneRow) return this.moveQuestionsList(true)
        
        this.setState({currentQuestion: index, showMessage: true})
    }

    checkAnswers = (providedAnswers, correctAnswers) => {
        if (providedAnswers.length === 0) {
            return 'none'
        } else if (providedAnswers.length !== correctAnswers.length) {
            return 'wrong'
        } else {
            const result = providedAnswers.every((providedAnswer, index) => {
                return correctAnswers[index] === providedAnswer;
            });
            return result ? 'right' : 'wrong';
        }
    }

    getCurrentQuestionImagesInfo = (questionImagesArr, imagesList) => {
        return imagesList.filter(imageInfo => {
            let isImageInArray = false
            for (let key in questionImagesArr) {
                if (questionImagesArr[key] === imageInfo.id) {
                    isImageInArray = true
                }
            }
            return isImageInArray === true
        })
    }

    getCopyrightInfo = (imgsInfoArray) => {
        if (!imgsInfoArray.length) return "no info about copyright"

        const result = [...imgsInfoArray]
        return result.reduce((previousValue, currentValue) => {
            return previousValue + currentValue.copyright + "; "
        }, "")
    }

    getInfoPanelContentComponent = (questionObjs) => {
        const {pictureObjs, imagesInfo} = this.props
        const {currentTab, currentQuestion} = this.state;
        
        const currentQuestionPicturesArr = this.getCurrentQuestionImagesInfo(pictureObjs[currentQuestion], imagesInfo)
        const copyrightInfo = this.getCopyrightInfo(currentQuestionPicturesArr)

        switch (currentTab) {
            case 0: return <TextBlock>{copyrightInfo}</TextBlock>;
            case 1: return <PictureBlock blur imgSrc={questionObjs && questionObjs[currentQuestion].imgSrc} title={questionObjs && questionObjs[currentQuestion].question} />;
            case 2: return <PictureBlock imgSrc={questionObjs && questionObjs[currentQuestion].imgSrc} title={questionObjs && questionObjs[currentQuestion].question} />;
            case 3: return <Feedback onSubmit={this.closeInfoPanelHandler} currentBlobKey={questionObjs[currentQuestion].questionBlobKeys.toString()} email={this.props.email} language={this.props.language}/>;
            default: return null;
        }
    }
    getInfoPanelTitle = () => {
        const {currentTab} = this.state;
        switch (currentTab) {
            case 0: return 'Info';
            case 1: return 'Bild1';
            case 2: return 'Bild2';
            case 3: return 'Feedback';
            default: return '';
        }
    }

    closeInfoPanelHandler = () => {
        this.setState({isInfoPanelOpen: false});
    }

    closeInfoPanelCallback = () => {
        this.setState({currentTab: null});
    }

    moveQuestionsList = (fromNextButton) => {
        const {questionObjs, defaultQuestions, isNavigationForward} = this.state
        const currentLength = questionObjs.length
        const commonLength = defaultQuestions.length
        const questionsPerRow = 5
        const firstQuestionInRow = 0

        let beginPositionList = isNavigationForward ? questionsPerRow : commonLength-currentLength-questionsPerRow
        const finalPositionList = defaultQuestions.length
        let questionsList = (isNavigationForward) ? questionObjs : defaultQuestions
        
        if (fromNextButton === true) {
            questionsList = questionObjs
            beginPositionList = questionsPerRow
        }
        
        this.setState({
            questionObjs: questionsList.slice(beginPositionList, finalPositionList)
        }, () => {
            this.selectQuestion(firstQuestionInRow)
            if (this.state.questionObjs.length <= questionsPerRow) {
                this.setState({
                    isNavigationForward: false
                })
            }
            if (this.state.questionObjs.length >= commonLength) {
                this.setState({
                    isNavigationForward: true
                })
            }
        })
    }

    /*checkCorrectOfAllQuestions = () => {
        const {defaultQuestions} = this.state
        let isMissedQuestion = false
        let isWrongQuestion = false
        let isRightQuestion = false

        defaultQuestions.forEach(question => {
            const {correctAnswers, providedAnswers} = question
            const type = this.checkAnswers(providedAnswers, correctAnswers)

            if (type === 'right') {
                isRightQuestion = true
            } else if (type === 'wrong') {
                isWrongQuestion = true
            }

            if (!providedAnswers.length) isMissedQuestion = true;
        })


        return {isMissedQuestion, isWrongQuestion, isRightQuestion}
    }*/

    getAnswersTextBlock = (key) => {
        const { questionObjs } = this.state;
        const component = (
            <AnswersList key={key}>
                {
                    questionObjs &&
                    questionObjs[this.state.currentQuestion] &&
                    questionObjs[this.state.currentQuestion].answers.map( (answer, index) => {
                        const answerText = answer.value;
                        const type = answer.type;
                        const key = answer.key;
                        const keyForReact = key + '_' + index;
                        const {gameType} = questionObjs[this.state.currentQuestion];
                        const mapIndexToLetter = ['a', 'b', 'c', 'd'];
                        const mapIndexToNumber = ['1', '2', '3', '4'];
                        const answerSymbol = gameType === 'single-answer' ? mapIndexToLetter[index] : mapIndexToNumber[answer.providedNumber];

                        return (
                            <AnswerButton key={keyForReact}>
                                <AnswerLetter type={type}>
                                    {answerSymbol}
                                </AnswerLetter>
                                {
                                    gameType === 'sorting' && type === 'wrong' ?
                                        <CorrectNumber>{mapIndexToNumber[answer.correctNumber]}</CorrectNumber>
                                        :
                                        null
                                }
                                <SpanResult>{answerText}</SpanResult>
                            </AnswerButton>
                        )
                    })
                }
            </AnswersList>
        )

        return component;
    }

    getAnswersImageBlock = (type) => {
        const { currentQuestion, questionObjs } = this.state;
        const media = [];
        const { answers } = questionObjs[currentQuestion] ? questionObjs[currentQuestion] : null

        let prevLetter = null
        let showLetter = null

        function getAnswerLetter(){
            let letter = prevLetter ? String.fromCharCode(prevLetter.charCodeAt() + 1) : 'A'
            prevLetter = letter
            showLetter = letter
        }

        answers.forEach((item, i) => {
            const srcKey = answers[i].value
            const status = answers[i].type
            const correctAnsNum = answers[i].correctNumber + 1
            const providedAnsNum = answers[i].providedNumber + 1

            getAnswerLetter()

            media.push(
                <AnswerImageButton key={i} status={status} isActive={status !== 'none'}>
                    <div className='active-frame'>
	                    <img name={item.key} src={`${this.props.cdnMedia}answer/${srcKey}`} alt='' />
                        {status === 'none' ? null : <AnswerLiteralShadow />}
                        <div className='inside-border'><div/></div>
                        {
                            status === 'none' ? null : <AnswerLiteral status={status}>{
                                type === 'ANSWER_IMAGE_SORT' ? providedAnsNum : showLetter
                            }</AnswerLiteral>
                        }
                        {type === 'ANSWER_IMAGE_SORT' && status !== 'right' ? <CorrectNumberForImage>{correctAnsNum}</CorrectNumberForImage> : null}
                    </div>
                </AnswerImageButton>
            )
        })

        return media;
    }

    selectDisplay() {
        const {currentQuestion} = this.state;
        const {questionObjs} = this.props;

        switch (questionObjs[currentQuestion].id) {
            case 'ANSWER_IMAGE':
                return (
                    <AnswerButtonsWrapper>
                        <InnerBox>{this.getAnswersImageBlock('ANSWER_IMAGE')}</InnerBox>
                    </AnswerButtonsWrapper>
                )
            case 'ANSWER_IMAGE_SORT':
                return (
                    <AnswerButtonsWrapper>
                        <InnerBox>{this.getAnswersImageBlock('ANSWER_IMAGE_SORT')}</InnerBox>
                    </AnswerButtonsWrapper>
                )
            default:
                return this.getAnswersTextBlock();
        }
    }
    
    calculatePaginationBlockPosition = (index) => {
        const itemWidth   = 76;
        const marginRight = 28;

        return index * (itemWidth + marginRight);
    }

    render() {
        const questionObjs         = this.state.questionObjs
        const { defaultQuestions } = this.state
        // const questionsCorrect     = this.checkCorrectOfAllQuestions()

        // const { isMissedQuestion, isWrongQuestion, isRightQuestion } = questionsCorrect
        const {
            isInfoPanelOpen,
            currentTab,
            // isNavigationForward
        }   = this.state
    
        const component          = this.getInfoPanelContentComponent(questionObjs)
        const title              = this.getInfoPanelTitle()
        const questionsAmount    = defaultQuestions.length
        const showMessage        = this.state.showMessage
                                    && questionObjs
                                    && questionObjs[ this.state.currentQuestion ]
                                    && questionObjs[ this.state.currentQuestion ].providedAnswers.length === 0
        const selectedDisplay    = this.selectDisplay()
        const paginationPosition = this.calculatePaginationBlockPosition(this.state.paginationPosition);

        let textLength = 0;
        if (questionObjs && questionObjs[this.state.currentQuestion] && questionObjs[this.state.currentQuestion].question) {
            textLength = questionObjs[this.state.currentQuestion].question.length
        }

        return (
            <SolutionsWrapper>
                <TopBar
                    caption={e.game_solutions}
                    leftButtonClickHandler={this.props.back}
                    rightButtonClickHandler={this.props.close}/>
                <SolutionsContent>
                    <div className='scrollable-wrapper'>
                        <QuestionNumbersList>
                            <QuestionNumberListWrapper className="questionsWrapper" questionsAmount={questionsAmount}>
                                {questionsAmount > 6 ?
                                    <div>
                                        <NavigationNextQuestions onClick={this.movePaginationPositionBack}>
                                            <div><img src="images/prev.png" alt="prev"/></div>
                                        </NavigationNextQuestions>
                                    </div>
                                    :
                                    null
                                }
                                <QuestionNumberListMiddleBlock>
                                    <QuestionNumberListMiddleBlockInner position={paginationPosition}>
                                        {questionObjs && questionObjs.map( (questionObj, index) => {
                                            const {
                                                correctAnswers,
                                                providedAnswers,
                                                questionIndex: questionNumber
                                            } = questionObj;
                                            const type = this.checkAnswers(providedAnswers, correctAnswers);

                                            return(
                                                <QuestionNumber
                                                    key={`${type}_${index}`}
                                                    type={type}
                                                    questionNumber={questionNumber}
                                                    selected={index === this.state.currentQuestion} onClick={() => {this.selectQuestion(index)}}>
                                                        {questionNumber + 1}
                                                </QuestionNumber>
                                            )
                                        })}
                                    </QuestionNumberListMiddleBlockInner>
                                </QuestionNumberListMiddleBlock>
                                {questionsAmount > 6 ?
                                     <div>
                                         <NavigationNextQuestions onClick={this.movePaginationPositionForward}>
                                              <div><img src="images/next.png" alt="next"/></div>
                                         </NavigationNextQuestions>
                                     </div>
                                        :
                                     null
                                }
                            </QuestionNumberListWrapper>
                        </QuestionNumbersList>
                        <QuestionTextBlock>
                            <QuestionText length={textLength}>
                                {questionObjs && questionObjs[this.state.currentQuestion] && questionObjs[this.state.currentQuestion].question}
                            </QuestionText>
                        </QuestionTextBlock>
                        <AnswersBlock>
                            {selectedDisplay}
                            <NoAnswerMessage showMessage={showMessage}>
                                <MessageText>{e.game_noReply}</MessageText>
                            </NoAnswerMessage>
                        </AnswersBlock>
                    </div>
                </SolutionsContent>
                <InfoPanel
                    title={title}
                    isOpen={isInfoPanelOpen}
                    infoNumber={currentTab}
                    component={component}
                    onCloseHandler={this.closeInfoPanelHandler}
                    onCloseCallback={this.closeInfoPanelCallback}
                    pictureObjs={this.props.pictureObjs}
                />
                <BottomInfoNav isAhead={currentTab !== null}>
                    {this.tabs.map((tab, index) => {
                        let isEnabled = true;
                        if (index === 1 || index === 2) {
                            isEnabled = questionObjs && questionObjs[this.state.currentQuestion] && questionObjs[this.state.currentQuestion].imgSrc
                        }
                        return (<InfoItem key={tab.imgSrc}
                                          onClick={isEnabled ? this.tabClickHandler.bind(this, index) : null}
                                          imgSrc={tab.imgSrc}
                                          isEnabled={isEnabled}
                                          isActive={this.state.currentTab === index}/>)
                    })}
                </BottomInfoNav>
            </SolutionsWrapper>
        )
    }
}
