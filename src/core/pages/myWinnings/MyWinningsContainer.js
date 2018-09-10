import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import {
    initMyWinnings,
    setCurrentWinn,
    getUserWinningsList,
    userWinningComponentLoad,
    assignWinningComponent,
    startWinningComponent,
    stopWinningComponent,
    setSpinnerPlayed
} from './duck'
import {getVoucher} from '../voucher/duck'
import {dispatchSetGameInstanseId} from '../../modules/results/duck'
import {getGame} from '../../models/gameEngine/duck'
import { getTombolaList, getUserTombolaList } from '../../pages/tombola/duck';

import MyWinnings from './components'

const MyWinningsContainer = props => <MyWinnings {...props} />

const mapStateToProps = store => {
    const language = store.profile && store.profile.settings && store.profile.settings.languageId
	const winningsList = store.myWinnings.userWinningsList.map(({title, type, obtainDate, amount, currency, gameInstanceId}) => {
		const dateObj = moment(obtainDate);
		const date = dateObj.format('DD.MM.YYYY')
		const time = dateObj.format('kk:mm')

		return {
			title,
			amount,
			currency: currency.toLowerCase(),
			type: type.toLowerCase(),
			date,
			time,
            gameInstanceId,
			language
		}
	});

    const spinnersList = store.myWinnings.userSpinnersList.map(({title, assignTimestamp, amount, currency, tombolaId, ...spinner}) => {
        const dateObj = moment(assignTimestamp);
        const date = dateObj.format('DD.MM.YYYY')
        const time = dateObj.format('kk:mm:ss')

        return {
            title,
            amount,
            currency: currency.toLowerCase(),
            date,
            time,
            assignTimestamp,
            tombolaId,
			language,
            ...spinner
        }
    })

    spinnersList.sort((a,b) => {
        return Date.parse(b.assignTimestamp) - Date.parse(a.assignTimestamp)
    });

    const {configuration} = store.app.application;
    const {cdnMedia} = configuration;

	return {
		winningsList,
		spinnersList,
		tombolaList   : store.tombola.tombolaList,
		winningOptions: store.myWinnings.winningOptions,
		winningOption : store.myWinnings.winningOption,
		profile       : store.profile,
		cdnMedia,
		language
	}
}

export default connect(mapStateToProps, {
	initMyWinnings,
    setCurrentWinn,
    getVoucher,
    dispatchSetGameInstanseId,
    getUserWinningsList,
    userWinningComponentLoad,
    getGame,
    assignWinningComponent,
    startWinningComponent,
    stopWinningComponent,
    setSpinnerPlayed,
    getTombolaList,
    getUserTombolaList
})(MyWinningsContainer)
