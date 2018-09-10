import React from 'react'
import { connect } from 'react-redux'

import QuickGame                                          from './components/'
import { loadGamesList, initGame, startGame, selectGame } from './duck.js'
import {filterGamesByLanguage}                            from "../duel/duck";
// import { getCurrencySymbol }                              from "../../../payment/duck";

const QuickGameContainer = props => <QuickGame {...props} />

/**
 * Возвращает корректную запись даты рождения (xx.xx.xxxx)
 *
 * @param data {Object} type Person
 * @returns {string}
 */
function getCurrentBirthday(data) {
	const correctData = data.birthDate && data.birthDate.split('T')[0].split('-');
	return (
		Array.isArray(correctData) && correctData.length === 3 ?
			`${correctData[ 2 ]}.${correctData[ 1 ]}.${correctData[ 0 ]}`
			: ''
	);
}

const mapStateToProps = (store) => {
    const fullGameList    = filterGamesByLanguage(store.quickgame.gameList, store.profile.settings.languageId);
    const specialGameList = fullGameList && fullGameList.filter(game => game.typeConfiguration.gameQuickQuiz.isSpecialGame);
    const gameList        = fullGameList && fullGameList.filter(game => !game.typeConfiguration.gameQuickQuiz.isSpecialGame);
    const gameListAll     = store.game.gameList;
    const language        = store.profile && store.profile.settings && store.profile.settings.languageId;
	const person          = {...store.profile.person, birthDate: getCurrentBirthday(store.profile.person)};

    return {
        specialGameList,
        gameList,
        isGameLoaded: store.game.gameLoaded,
        game: store.quickgame.gameInfo,
        firstName: store.profile.person.firstName,
        lastName: store.profile.person.lastName,
        nickName: store.profile.person.nickName,
        person: person,
        cdnMedia: store.app.application.configuration.cdnMedia,
        gameListAll,
        languageId: store.profile.settings.languageId,
        language
    }
}

export default connect(mapStateToProps, {
    loadGamesList,
    initGame,
    startGame,
    selectGame,
})(QuickGameContainer)
