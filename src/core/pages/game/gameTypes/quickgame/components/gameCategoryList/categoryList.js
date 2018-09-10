import React from 'react'

import {
    GameListWrapper,
} from './styledComponents'

import GameCategory from './gameCategory'

class CategoryList extends React.Component {

    selectGame = (game) => {
        this.props.selectGame(game);
        this.props.goToGameOptions();
    }

    render() {
        const {gameList, specialGameList} = this.props;
        return (
            <GameListWrapper showLastGame={this.props.showLastGame}>
                <div className='scrollable-wrapper'>

                    {
                        specialGameList && specialGameList.length > 0 ?
                            <GameCategory
                                key='special game'
                                onSelect={this.props.goToSpecialGameList}
                                hasWinningComponents={specialGameList.some(game => game.shortPrize.amount)}
                                assignedPoolsIcons='images/special-game-icon.png'
                                isSpecialGame
                                title='Special Game' />
                            :
                            null
                    }

                    {
                        gameList.map(game =>
                            <GameCategory
                                key={game.title}
                                onSelect={this.selectGame.bind(this, game)}
                                hasWinningComponents={game.shortPrize.amount}
                                assignedPoolsIcons={game.assignedPoolsIcons}
                                title={game.title} />)
                    }
                </div>
            </GameListWrapper>
        )
    }
}

export default CategoryList;
