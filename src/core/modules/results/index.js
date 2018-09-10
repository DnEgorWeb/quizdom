import React from 'react'
import Result from './main'
import Details from './details'
import Solutions from './solutions/SolutionsContainer'
import Prize from '../specialPrize/PrizeContainer'
import WinningComponent from '../winningComponent/WinningComponentContainer'
import { withRouter } from 'react-router'
import url from "../../../constants/urlConstants";
import GameEngine from '../game/GameEngine'

class Results extends React.Component{

    state = {
        showDetails: false,
        showSolutions: false,
        showWinningComponent: false,
        showSpecialPrize: false,
        areAllQuestionsLoaded: false,
        questions: [],
        questionObjs: {},
        needSendInvite: false,
        showBarrel: false,
    }

    count = 0

    allMedias = []

    questions = []

    componentWillMount(){
        const {winningIds, gameId} = this.props
	    const lastGame = localStorage.getItem('lastGameOptions');
        let lastId;

        try {
        	lastId = JSON.parse(lastGame).gameId;
        } catch(e) {
	        console.log(e.message);
        }


        if (winningIds.length) {
            this.setState({
                showWinningComponent: true
            }, () => {
                winningIds.forEach(id => {
                    window.network.send({
                        message: 'winning/winningComponentGet',
                        content: {
                            winningComponentId: id,
                            gameId: (gameId || lastId)
                        }
                    })
                })
                window.network.send({
                    message: 'payment/getUserAccountBalances',
                    content: {}
                })
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isPrize !== this.props.isPrize) {
            this.setState({
                showSpecialPrize: true
            })
        }

        if (nextProps.results && Array.isArray(nextProps.results.answerResults)) {
            let questionBlobKeys = [];
            let decryptionKeys = [];

            nextProps.results.answerResults.forEach(answerResult => {
                questionBlobKeys = [...questionBlobKeys, ...answerResult.questionInfo.questionBlobKeys];
                decryptionKeys = [...decryptionKeys, ...answerResult.questionInfo.decryptionKeys]
            })

            this.engine = new GameEngine(questionBlobKeys, this.onMediaLoaded);
            if (!this.state.areAllQuestionsLoaded) {
                this.loadQuestions(questionBlobKeys, decryptionKeys);
            }
        }

        const multiplayerResults = nextProps.multiplayerResults;
        const playerResults      = multiplayerResults && multiplayerResults.playerResults;
        const gameId             = nextProps.gameData.game.gameId || (playerResults && playerResults.gameId);

        if(multiplayerResults && multiplayerResults.duelOpponentResults && gameId) {
            const opponentUserId = multiplayerResults.duelOpponentResults.userId;
            const opponents      = Array.isArray(opponentUserId) ? opponentUserId : [ opponentUserId ];

            if(this.state.needSendInvite) {
                nextProps.inviteUsersToGameOnlyId(gameId, opponents);
                this.setState({ needSendInvite : false });
            }
        }
    }

    componentWillUnmount(){
        localStorage.removeItem('countQuestionForCurrentGame');
        this.props.clearWinningComponent();
        this.props.setDefaultSingleResults();
    }

    getAnswerTypeForSortingGame = (correctNumber, providedNumber) => {
        let type = 'none';
        if (providedNumber === correctNumber && providedNumber === -1) {
            type = 'none'
        } else {
            type = providedNumber === correctNumber ? 'right' : 'wrong';
        }
        return type;
    }

    getAnswerTypeForSingleAnswerGame = (correctNumber, providedNumber) => {
        let type = 'none';
        if (providedNumber === correctNumber && providedNumber === -1) {
            type = 'none'
        } else if (correctNumber === -1) {
            type = 'wrong';
        } else {
            type = 'right'
        }
        return type;
    }

    getAnswerType = (gameType, correctNumber, providedNumber) => {
        if (gameType === 'sorting') {
            return this.getAnswerTypeForSortingGame(correctNumber, providedNumber)
        } else {
            return this.getAnswerTypeForSingleAnswerGame(correctNumber, providedNumber)
        }
    }

    onMediaLoaded = () => {
        let { medias } = this.engine;
        this.allMedias = [...this.allMedias, {...medias}];
        medias = null
        this.count++;
        if (this.count < this.questions.length) {
            this.loadAllMedias();
        }
    }

    createQuestionObjs = (questions) => {
        if(!questions) return false;

        return questions.map((question, index) => {
            const providedAnswers = this.props.results.answerResults[index].questionInfo.providedAnswers;
            const correctAnswers = this.props.results.answerResults[index].questionInfo.correctAnswers;
            const gameType = correctAnswers.length === 1 ? 'single-answer' : 'sorting';
            const mappings = Array.isArray(question.mappings) && question.mappings;

            if((!mappings.length) || typeof question.mappings[1] === 'undefined') return {};

            const answers = Object.keys(question.mappings[1].answers).map((key) => {
                const providedNumber = providedAnswers.indexOf(key);
                const correctNumber = correctAnswers.indexOf(key);
                const type = this.getAnswerType(gameType, correctNumber, providedNumber)
                return {
                    key,
                    value: question.mappings[1].answers[key],
                    providedNumber,
                    correctNumber,
                    type
                }
            });
            return {
                ...this.props.results.answerResults[index].questionInfo,
                question: question.mappings[0].value,
                answers,
                gameType,
                id: question.mappings[1].id,
                imgSrc: this.stepPuctures[index] && (this.props.cdnMedia  + 'question/' + this.stepPuctures[index].mappings[0].value)
            }
        });
    }

    loadAllMedias = (questions = this.questions) => {
        const question = questions[this.count];
        this.engine.loadMedias(question.medias);
    }

    loadQuestions = (questionBlobKeys, decryptionKeys) => {
        if (this.engine.questionsLoaded) {
            let questions = [];
            let stepPuctures = [];
            questionBlobKeys.forEach((questionBlobKey, index) => {
                this.engine.setQuestion(questionBlobKeys[index], decryptionKeys[index]);
                const question = this.engine.getQuestion();
                if (question && question.name === 'Image') {
                    stepPuctures = [...stepPuctures, {...question, key: questionBlobKeys[index]}];
                } else {
                    questions = [...questions, {...question, key: questionBlobKeys[index]}];
                }

            });

            this.questions = questions;
            this.stepPuctures = stepPuctures;

            const questionObjs = this.createQuestionObjs(questions);

            this.setState(() => ({
                areAllQuestionsLoaded: true,
                questionObjs
            }))

        } else {
            setTimeout(() => {
                if (!this.state.areAllQuestionsLoaded) {
                    this.loadQuestions(questionBlobKeys, decryptionKeys)
                }
            }, 100)
        }

    }

    toggleComponent = (component, showBarrel = false) => {
        this.setState({
            [component]: true,
            showBarrel
        })
    }

    closeDetails = () => {
        this.setState({showDetails: false})
    }

    closeSolution = () => {
        this.setState({showSolutions: false})
    }

    closePrize = () => {
        this.setState({showSpecialPrize: false})
    }

    closeWinning = (freeWinningComponent = null) => {
        this.setState({
            showWinningComponent: false,
            freeWinningComponent
        })
    }

    close = () => {
        if (typeof this.props.close === 'function') {
            this.props.close()
        } else {
            this.props.clearWinningComponent();
            this.props.history.push(url.dashboard.index);
        }
    }

    goToDuelCreation = (needStartDuel = true) => {
        const { playerResults } = this.props.multiplayerResults && this.props.multiplayerResults;
        let multiplayrGameId = null;

        if(
            this.props.multiplayerResults &&
            this.props.multiplayerResults.duelOpponentResults
        ) {
            multiplayrGameId = this.props.multiplayerResults.duelOpponentResults.gameId;
        }
    
        if(multiplayrGameId) {
            this.props.closeGame();
            this.props.clearWinningComponent();
            this.props.getGame(multiplayrGameId);
            this.setState({ needSendInvite: needStartDuel});
            if(!needStartDuel) {
                if(playerResults)
                    localStorage.setItem('lastGame', JSON.stringify(playerResults));

                this.props.history.push(url.game.duel.creation);
            }
        } else {
            this.props.clearWinningComponent();
            this.props.setGameLoaded(false);
            this.props.history.push(url.game.duel.creation);
        }
    }

    createQuestionLetterMap = () => {
        return this.questions.map(question => question.mappings[1].answers)
    }

    goBackToResult = () => {
		this.setState({
			showBarrel          : false,
			showWinningComponent: false
		});
    }

    render(){
        let component = null;

        if(this.state.showDetails){
            component = (
                <Details
                    back={this.closeDetails}
                    close={this.close}
                    data={this.props.results}
                    questionLetterMap={this.createQuestionLetterMap()}
                    selectedInvitation={this.props.selectedInvitation}
                    cdnMedia={this.props.cdnMedia}
                    multiplayerResults={this.props.multiplayerResults}
                    bet={this.props.bet}
                    language={this.props.language}
                    isSecondPlayer={this.props.isSecondPlayer}
                />
            )
        }else if(this.state.showSolutions && this.state.areAllQuestionsLoaded){
            component = (
                <Solutions
                    questions={this.state.questions}
                    back={this.closeSolution}
                    close={this.close}
                    language={this.props.language}
                    questionObjs={this.state.questionObjs}
                />
            )
        }else if((this.state.showWinningComponent || this.state.showBarrel) && !this.props.isSpinnerPlayed){
            component = (
                <WinningComponent
                    closeWinning={this.closeWinning}
                    language={this.props.language}
                    goBackToResult={this.goBackToResult}
                />
            )
        }else if(this.state.showSpecialPrize){
            component = (
                <Prize
                    closeComponent={this.closePrize}
                    language={this.props.language}
                />
            )
        }else{
            component = (
                <Result
                    close={this.close}
                    toggleComponent={this.toggleComponent}
                    freeWinningComponent={this.state.freeWinningComponent}
                    isSpinnerPlayed={this.props.isSpinnerPlayed}
                    gameType={this.props.gameType}
                    goToDuelCreation={this.goToDuelCreation}
                    isSecondPlayer={this.props.isSecondPlayer}
                    {...this.props}
                />
            )
        }

        return component
    }
}
export default withRouter(Results)
