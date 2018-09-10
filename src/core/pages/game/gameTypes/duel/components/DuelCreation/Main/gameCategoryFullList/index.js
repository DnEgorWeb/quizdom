import React from 'react'

import {
    GameCategoryFullListWrapper,
    Title,
    CategoryItem,
    NonActiveIcon,
    ActiveIcon,
    GameTitle,
} from './styledComponents'

import {SeparatorLineVert} from '../../../../../../../../modules/components/SeparatorLine'

const GameCategoryFullList = (props) => (
    <GameCategoryFullListWrapper>
        <div className='scrollable-wrapper'>
            <Title>Wähle die gewünschte Kategorie aus!</Title>
            {
                props.gameList.map(game => {
                    const isActive = game.gameId === props.selectedGameId;
                    if (isActive) {
                        return (
                            <div key={game.gameId}>
                                <SeparatorLineVert margin='20px 0'/>
                                <CategoryItem
                                    onClick={props.selectGame.bind(null, game.gameId)}
                                >
                                    <ActiveIcon
                                        imgSrc={`images/pool_icons/${game.assignedPoolsIcons[0]}.svg`}
                                    />
                                    <GameTitle>{game.title}</GameTitle>
                                </CategoryItem>
                            </div>
                        )
                    } else {
                        return (
                            <div key={game.gameId}>
                                <SeparatorLineVert margin='20px 0'/>
                                <CategoryItem
                                    onClick={props.selectGame.bind(null, game.gameId)}
                                >
                                    <NonActiveIcon
                                        imgSrc={`images/pool_icons/${game.assignedPoolsIcons[0]}.svg`}
                                    />
                                    <GameTitle>{game.title}</GameTitle>
                                </CategoryItem>
                            </div>
                        )
                    }

                })
            }
        </div>
    </GameCategoryFullListWrapper>
)

export default GameCategoryFullList
