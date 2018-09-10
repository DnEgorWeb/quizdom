import {QuestionsLoader, decrypt, decryptImg, getMedias} from './gameServices'

export default class GameEngine{

    constructor(questionBlobKeys, onMediaLoad){
        this.questionBlobKeys = questionBlobKeys
        this.onMediaLoad = onMediaLoad
        this.initGame()
    }

    currentQuestion = {
        questionText: '',
        questionAnswers: []
    }

    questions = []
    medias = {}
    mediasSource = {}
    advertisments = []

    questionsLoaded = false
    advertismentLoaded = false

    setQuestion(blobKey, decryptionKey){
        for(let i = 0; i < this.questionBlobKeys.length; i++){
            if(this.questionBlobKeys[i] === blobKey){
                const decryptedQuestion = decrypt(this.questions[i], decryptionKey)
                this.currentQuestion = decryptedQuestion
            }
        }
    }

    getQuestion(){
	    return this.currentQuestion
    }

    makeImg = (id,base64, key) => {
        const img = decryptImg(base64, key)
        this.medias[id] = img;
        const isImageLoaded = this.currentQuestion.name === 'Image'
        if((Object.keys(this.mediasSource).length === Object.keys(this.medias).length) && isImageLoaded){
            this.onMediaLoad()
        }
        if ((Object.keys(this.mediasSource).length === Object.keys(this.medias).length) && this.currentQuestion.name === 'The question') {
            this.onMediaLoad(true)
        }
    }

    loadMedias(medias){
        this.mediasSource = medias
        getMedias(medias, this.makeImg)
    }

    setQuestionsLoaded = (questions) => {
        this.questions = questions
        this.questionsLoaded = true
    }

    initGame(){
        let questionsLoader = new QuestionsLoader(this.questionBlobKeys.slice(0), this.setQuestionsLoaded)
        questionsLoader.getQuestions()
    }
}
