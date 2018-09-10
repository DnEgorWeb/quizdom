import * as loadingActions             from '../core/pages/loading/duck'
import * as registrationActions        from '../core/pages/registration/duck'
import * as loginActions               from '../core/pages/login/duck'
import * as gameActions                from '../core/models/gameEngine/duck'
import * as paymentActions             from '../core/pages/payment/duck'
import * as voucherActions             from '../core/pages/voucher/duck'
import * as myDataActions              from '../core/pages/myData/duck'
import * as dashboardActions           from '../core/pages/dashboard/duck'
import * as quickGameActions           from '../core/pages/game/gameTypes/quickgame/duck'
import * as tournamentGameActions      from '../core/pages/game/gameTypes/tournament/duck'
import * as profileActions             from '../core/models/profile/duck'
import * as messengerActions           from '../core/pages/messenger/duck'
import * as inviteFriendsActions       from '../core/pages/inviteFriends/duck'
import * as duelGameActions            from '../core/pages/game/gameTypes/duel/duck'
import * as myWinningsActions          from '../core/pages/myWinnings/duck'
import * as resultActions              from '../core/modules/results/duck'
import * as highscoreActions           from '../core/pages/highscore/duck'
import * as tombolaActions             from '../core/pages/tombola/duck'
import * as myFriedsActions            from '../core/pages/myFriends/duck'
import * as promocodeActions           from '../core/pages/promocode/duck'
import * as groupsActions              from '../core/pages/groups/duck'
import * as publicGamesActions         from '../core/models/publicGames/duck'
import * as tournamentHighscoreActions from '../core/pages/game/gameTypes/tournament/components/Results/highscore/duck'
import * as infoActions                from '../core/pages/info/duck'

// import { setNumberOfQuestions } from "../core/pages/game/gameTypes/quickgame/duck";

const eventActionMap = {
    'profile/profileUpdateResponse': profileActions.receiveUpdateProfile,
    'auth/refreshResponse'         : profileActions.receivedRefresh,

    'auth/registerAnonymousResponse'     : loadingActions.receivedRegisterAnonymous,
    'profile/getAppConfigurationResponse': loadingActions.receivedAppConfiguration,
    'profile/profileGetResponse'         : loadingActions.receivedProfileGet,
    // 'profile/ProfileUpdateResponse': loadingActions.receivedProfileGet,

    'auth/registerEmailResponse'       : registrationActions.receivedRegisterToken,
    'auth/confirmEmailResponse'        : registrationActions.receivedSubmitCode,
    'auth/registerEmailNewCodeResponse': registrationActions.receivedResendRegistrationCode,
    'auth/registerFacebookResponse'    : registrationActions.receivedFacebookRegister,

    'auth/authEmailResponse'                  : loginActions.receivedLoginEmail,
    'auth/recoverPasswordEmailResponse'       : loginActions.receivedRecoverPassword,
    'auth/recoverPasswordConfirmEmailResponse': loginActions.receivedSetNewPassword,
    "auth/authFacebookResponse"               : loginActions.receivedLoginFacebook,

    'gameSelection/getDashboardResponse': dashboardActions.receivedDashboard,

    'gameSelection/getGameListResponse'        : quickGameActions.receivedGameList,
    'gameSelection/getGameResponse'            : quickGameActions.receivedGameInfo,
    'gameSelection/publicGameListResponse'     : publicGamesActions.receivedPublicGames,
    'gameSelection/joinMultiplayerGameResponse': tournamentGameActions.onJoinMultiplayerGameResponse,

    'gameSelection/invitationListResponse'      : duelGameActions.receivedInvitationsList,
    'gameSelection/invitedListResponse'         : duelGameActions.receivedInvitedList,
    'resultEngine/completedGameListResponse'    : duelGameActions.receivedcompletedDuelsList,
    'gameSelection/respondToInvitationResponse' : duelGameActions.receivedRespondToInvitation,
    'resultEngine/getMultiplayerResultsResponse': resultActions.receivedMultiplayerResults,
    'gameSelection/inviteUsersToGameResponse'   : duelGameActions.receivedInviteUsersToGame,
    'gameSelection/createPublicGameResponse'    : duelGameActions.receivedInviteUsersToGame,
    // 'gameSelection/publicGameListResponse': duelGameActions.receivedPublicGames,
    'question/poolListResponse'                 : duelGameActions.receivedPoolList,

    'gameEngine/registerResponse'                       : gameActions.receivedRegisterGame,
    'gameEngine/startGameResponse'                      : gameActions.receivedStartGame,
    'gameEngine/startStep'                              : gameActions.receivedStartStep,
    'gameEngine/healthCheck'                            : () => () => {
    },
    'gameEngine/readyToPlayResponse'                    : gameActions.receivedReadyToPlay,
    'advertisement/advertisementHasBeenShownResponse'   : gameActions.receivedAdvertisementHasBeenShown,
    'gameEngine/showAdvertisement'                      : gameActions.receivedShowAdvertisment,
    'gameEngine/answerQuestionResponse'                 : gameActions.receivedAnswerQuestion,
    'gameEngine/endGame'                                : gameActions.receivedEndGame,
    'game/gameCloseResponse'                            : gameActions.receivedCloseGame,
    'gameEngine/nextStepResponse'                       : () => () => {
    },
    'gameEngine/endGameResponse'                        : () => () => {
    },
    'gateway/instanceDisconnect'                        : () => () => {
    },
    'resultEngine/multiplayerResultsGlobalListResponse' : tournamentGameActions.receivedTournamentResults,
    'resultEngine/multiplayerResultsBuddiesListResponse': tournamentHighscoreActions.receivedFriends,

    'resultEngine/getResultsResponse': resultActions.receivedResults,

    'friend/buddyListResponse'            : highscoreActions.receivedFriends,
    'friend/playerLeaderboardListResponse': highscoreActions.receivedLeaderboardList,
    'friend/leaderboardPositionResponse'  : highscoreActions.receivedPlayerPosition,

    'payment/getUserAccountBalancesResponse'           : paymentActions.setBalance,
    'payment/getIdentificationResponse'                : paymentActions.setIdentification,
    'payment/initExternalPaymentResponse'              : paymentActions.setExternalPayment,
    'payment/getExchangeRatesResponse'                 : paymentActions.setExchangeRates,
    'payment/getUserAccountHistoryResponse'            : paymentActions.setUserAccountHistory,
    'payment/convertBetweenCurrenciesResponse'         : paymentActions.setConvertBetweenCurrencies,
    'payment/initIdentification'                       : paymentActions.setInitIdentification,
    'billing/paymentResourceBillOfMaterialListResponse': paymentActions.setPaymentResourceBillOfMaterialList,
    'profile/endConsumerInvoiceListResponse'           : paymentActions.setEndUserPDFUrlList,

    'voucher/voucherListResponse'    : voucherActions.setVoucherList,
    'voucher/userVoucherListResponse': voucherActions.setUserVoucherList,
    'voucher/voucherPurchaseResponse': voucherActions.setVoucherPurchaseResponse,
    'voucher/userVoucherUseResponse' : () => () => {
    },
    'voucher/voucherGetResponse'     : (msg) => voucherActions.setCurrentVoucher(msg.content.voucher),

    'auth/changePasswordResponse'                    : myDataActions.receiveChangePassword,
    'userMessage/listUnreadWebsocketMessagesResponse': messengerActions.addToUnreadMessages,
    'userMessage/newWebsocketMessage'                : messengerActions.addToUnreadMessages,

    'friend/contactListResponse'            : inviteFriendsActions.setContactList,
    'friend/contactInviteNewResponse'       : inviteFriendsActions.setcontactInviteNewResponse,
    'friend/contactRemoveInvitationResponse': () => () => {
    },

    'winning/userWinningListResponse'           : myWinningsActions.setUserWinningsList,
    'winning/userWinningComponentListResponse'  : myWinningsActions.setUserSpinnersList,
    'winning/winningComponentGetResponse'       : myWinningsActions.setWinningComponent,
    'winning/userWinningComponentAssignResponse': myWinningsActions.setWinningComponentId,
    'winning/userWinningComponentStartResponse' : myWinningsActions.setWinningOption,
    'winning/userWinningComponentStopResponse'  : myWinningsActions.setWinningComponentGot,
    'winning/userWinningComponentLoadResponse'  : myWinningsActions.receivedUserWinningComponentLoad,

    'tombola/tombolaListResponse'    : tombolaActions.receiveTombolaList,
    'tombola/tombolaBuyResponse'     : tombolaActions.receiveAnswerAfterTombolaBuy,
    'tombola/userTombolaGetResponse' : tombolaActions.receiveUserTombola,
    'tombola/userTombolaListResponse': tombolaActions.receiveUserTombolaList,

    'friend/playerUnblockResponse': myFriedsActions.receivedUserOptionChangeResponse,
    'friend/playerBlockResponse'  : myFriedsActions.receivedUserOptionChangeResponse,
    'friend/buddyAddResponse'     : myFriedsActions.receivedUserOptionChangeResponse,
    'friend/buddyRemoveResponse'  : myFriedsActions.receivedUserOptionChangeResponse,
    'friend/playerListResponse'   : myFriedsActions.receivedPlayerList,

    'promocode/promocodeUseResponse': promocodeActions.receivedAnswer,

    'friend/groupListResponse'         : groupsActions.receivedGroupList,
    'friend/groupListPlayersResponse'  : groupsActions.receivedGroupListPlayers,
    'friend/groupGetResponse'          : groupsActions.receivedGroup,
    'friend/groupDeleteResponse'       : groupsActions.receivedAnswerAfterDeleting,
    'friend/groupAddPlayersResponse'   : groupsActions.receivedAnswerAfterAddPlayers,
    'friend/groupRemovePlayersResponse': groupsActions.receivedAnswerAfterRemovePlayers,
    'friend/groupCreateResponse'       : groupsActions.receivedAnswerAfterCreateGroup,
    'friend/groupUpdateResponse'       : groupsActions.receivedAnswerAfterUpdateGroup,

    'media/mediaGetResponse'            : infoActions.receivedImageInfo,
    'media/mediaListResponse'           : infoActions.receivedMediaList,
    'profileManager/profileListResponse': infoActions.receivedAuthorInfo
}

export default eventActionMap
