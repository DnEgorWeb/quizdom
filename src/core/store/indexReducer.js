import { combineReducers } from 'redux'

import profile from '../models/profile/duck'
import app from '../duck'
import game from '../models/gameEngine/duck'

import loading from '../pages/loading/duck'
import registration from '../pages/registration/duck'
import dashboard from '../pages/dashboard/duck'
import login from '../pages/login/duck'
import payment from '../pages/payment/duck'
import voucher from '../pages/voucher/duck'
import myData from '../pages/myData/duck'
import info from '../pages/info/duck'
import quickgame from '../pages/game/gameTypes/quickgame/duck'
import duelgame from '../pages/game/gameTypes/duel/duck'
import messenger from '../pages/messenger/duck'
import inviteFriends from '../pages/inviteFriends/duck'
import myWinnings from '../pages/myWinnings/duck'
import results from '../modules/results/duck.js'
import highscore from '../pages/highscore/duck'
import tombola from '../pages/tombola/duck'
import myFriends from '../pages/myFriends/duck'
import promocode from '../pages/promocode/duck'
import groups from '../pages/groups/duck'
import publicGames from '../models/publicGames/duck'
import tournament from '../pages/game/gameTypes/tournament/duck'
import tournamentHighscore from '../pages/game/gameTypes/tournament/components/Results/highscore/duck'

const reducers = {
    app: app,
    profile: profile,
    loading: loading,
    registration: registration,
    game: game,
    results: results,
    dashboard: dashboard,
    login: login,
    payment: payment,
    voucher: voucher,
    myData: myData,
    quickgame: quickgame,
    duelgame: duelgame,
	info: info,
	messenger: messenger,
    inviteFriends: inviteFriends,
	myWinnings: myWinnings,
    gameResults: results,
    highscore: highscore,
    tombola: tombola,
    myFriends: myFriends,
    promocode: promocode,
    groups: groups,
    publicGames: publicGames,
    tournament: tournament,
    tournamentHighscore: tournamentHighscore
}

export default combineReducers(reducers)
