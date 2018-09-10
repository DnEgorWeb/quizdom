import aes from "crypto-js/aes";
import cryptoJS from "crypto-js";

export const getBlob = (dataUrl, key, callback) => {
    const myHeaders = new Headers();
    const init = {
        headers: myHeaders
    }
    myHeaders.append("Accept", "application/json, text/plain, ");
    myHeaders.append('Accept-Language','ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7');
    myHeaders.append('Accept-Encoding','gzip, deflate, br');

    window.fetch(dataUrl, init).then(response => {
        return response.blob()
  	}).then(function(blob) {
        let file, reader = new FileReader()
        reader.onload = () => {
            file = reader.result

            let wordArray = cryptoJS.lib.WordArray.create(file)
            let base64 = cryptoJS.enc.Base64.stringify(wordArray)
            callback(base64, key)
        };
        reader.readAsArrayBuffer(blob);
    });
}

export class QuestionsLoader{

    constructor(questionBlobKeys, onLoad){
        this.questionBlobKeys = questionBlobKeys
        this.setQuestionsLoaded = onLoad
    }

    questions = []
    questionBlobKeys = []

    checkQuestionsLoaded(){
        if(this.questions.length === this.questionBlobKeys.length){
            this.setQuestionsLoaded(this.questions)
        }
    }

    addQuestion = (question, questionNumber) => {
        this.questions[questionNumber] = question
        this.checkQuestionsLoaded()
    }

    getQuestions(){
        // here sometmes error
        //questionBlobs undefinded
        const questionBlobs = this.questionBlobKeys;
        questionBlobs.forEach((item, i)=>{
            getBlob(window.config.urls.AMAZONAWS_ENCRYPTED + item, i, this.addQuestion)
        })
    }
}

export const getAdvertisement = function(path, callback){
    const dataUrl = window.config.urls.AMAZONAWS_ADVERTISEMENT + path
    window.fetch(dataUrl).then(response => {
        return response.json()
  	}).then(function(advertisement) {
        callback(advertisement)
    });

}

export const getMedias = (medias, callback) => {
    for(let id in medias){
        getBlob(window.config.urls.AMAZONAWS_ENCRYPTED + medias[id].blobId, medias[id].key, callback.bind(null, id))
    }
}

export const decryptImg = function(encrypted, decryptionKey){
    if(encrypted){
        const iv = cryptoJS.enc.Hex.parse('00000000000000000000000000000000');
        const hex = cryptoJS.enc.Hex.parse(decryptionKey);
        const decrypted = aes.decrypt(encrypted, hex, {
            mode: cryptoJS.mode.CTR,
            iv: iv,
            padding: cryptoJS.pad.NoPadding
        }).toString(cryptoJS.enc.Base64)
        return decrypted
    }
}

export const decrypt = function(encrypted, decryptionKey){
    if(encrypted){
        const iv = cryptoJS.enc.Hex.parse('00000000000000000000000000000000');
        const hex = cryptoJS.enc.Hex.parse(decryptionKey);
        let decrypted;

        try {
	        decrypted = JSON.parse(aes.decrypt(encrypted, hex, {
		        mode   : cryptoJS.mode.CTR,
		        iv     : iv,
		        padding: cryptoJS.pad.NoPadding
	        }).toString(cryptoJS.enc.Utf8))
        }catch(e) {
        	console.error(e.message);
        }
        return decrypted;
    }
}
