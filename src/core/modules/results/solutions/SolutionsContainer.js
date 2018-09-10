import React from 'react'
import { connect } from 'react-redux'

import Solutions from './components'
import { initSolutions } from '../duck'
import {getMedia, clearImageInfo} from '../../../pages/info/duck'

const SolutionsContainer = props => <Solutions {...props} />

const getProps = (store) => {
    const {results, profile, game, info} = store;
    const language = store.profile && store.profile.settings && store.profile.settings.languageId

    const {configuration} = store.app.application;
    const {cdnMedia} = configuration;
    const imagesInfo = info.imageInfo
    return {
        answerResults: results && results.answerResults,
        email: profile.email,
        language,
        cdnMedia,
        pictureObjs: game.questionLetterMap,
        imagesInfo: imagesInfo || []

    }
}

const mapStateToProps = store => {
    const {singleplayerResults: results} = store.results;
    const answerResults =  results && results.answerResults;
    const correctAnswersCode = Array.isArray(answerResults) && answerResults.map(result => result.questionInfo.correctAnswers);

    if (correctAnswersCode && correctAnswersCode[0].length > 1) {
        return getProps(store, 'sorting')
    } else {
        return getProps(store,'single-answer')
    }
}

export default connect(mapStateToProps, {
    initSolutions,
    getMedia,
    clearImageInfo
})(SolutionsContainer)
