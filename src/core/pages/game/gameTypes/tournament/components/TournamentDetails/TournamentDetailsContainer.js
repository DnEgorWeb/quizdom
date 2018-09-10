import {connect} from 'react-redux'
import TournamentDetails from './TournamentDetails'
import {getGame} from '../../../../../../models/gameEngine/duck'
import {joinMultiplayerGame } from '../../duck'
import { getProfile } from '../../../../../../models/profile/duck'
import { getBalance } from '../../../../../../pages/payment/duck'

const mapStateToProps = store => {
	const { configuration }  = store.app.application
	const { cdnMedia }       = configuration;
	const { userId }         = store.profile;
	const { publicGameList } = store.publicGames;
	const { game }           = store.game;
	const gameDataAll        = publicGameList && publicGameList.filter(item => item.game.id === game.gameId);


    return {
        profile: store.profile,
        isGameLoaded: store.game.gameLoaded,
        balance: store.payment.balance,
        gameId: store.game.gameId,
        game: {...game.game, ...(gameDataAll && gameDataAll[0]) },
        handicap: store.profile.handicap,
        cdnMedia: cdnMedia,
        userId: userId
    }
}

export default connect(mapStateToProps, {
    getGame,
    joinMultiplayerGame,
    getProfile,
    getBalance,
})(TournamentDetails)
