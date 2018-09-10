import React from 'react'
import e from '../../../../../../../langs';

import GameOptions from '../GameOptions/index'
import TopBar from '../../../../../../modules/components/GameResultsTopBar'
import ScrollContainer from '../../../../../../modules/components/ScrollContainer'
import styled from 'styled-components'
import Game from '../../../../../../modules/game/GameContainer'
import url from '../../../../../../../constants/urlConstants'

export const GamesWrapper = styled.div`
	margin-top: 10px;
	overflow: hidden;
	position: relative;
	height: 1217px;
	.scrollable-wrapper{
	    position: absolute;
	    top: 0;
	    bottom: 0;
	    left: 0;
	    right: -17px;
	    overflow-y: scroll;
      
		@media (max-width: 768px) {
            right: 0;
        }
	}
`

export default class QuickTournamentList extends React.Component {
	constructor(props) {
		super(props)
		props.getTournamentGames()
	}

	goBack = () => {
		this.props.history.goBack()
	}

	close = () => {
		this.props.history.push('/dashboard');
	}

	goToTournamentDetails = () => {
		this.props.history.push(url.game.tournament.detail)
	}

    render() {
		const onlyPlayedGames = this.props.gameList;

        return this.props.isGameLoaded ?
            <Game />
            : (
            <div>
	            <TopBar
		            leftButtonClickHandler={this.goBack}
		            rightButtonClickHandler={this.close}
		            caption={e.game_quickTournaments}
	            />
	            <GamesWrapper>
		            <ScrollContainer>
			            {Array.isArray(onlyPlayedGames) && onlyPlayedGames.map((game, index) =>
				            <GameOptions
					            key={game.gameId + index}
					            currentGame={game}
					            startGame={this.goToTournamentDetails}
					            goToCategoryList={this.goToCategoryList}
					            firstName={this.props.firstName}
					            lastName={this.props.lastName}
					            nickName={this.props.nickName}
					            person={this.props.person}
					            initGame={this.props.initGame}
					            history={this.props.history}
                                isRegistered={this.props.isRegistered}
                                completedDuels={this.props.completedDuels}
				            />
			            )}
		            </ScrollContainer>
	            </GamesWrapper>
            </div>
        );
    }
}
