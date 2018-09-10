import React from 'react'
import e from '../../../../../../../langs';

import Main      from './Main'
import MyFriends from './MyFriends'
import Groups    from './Groups'
import url       from "../../../../../../../constants/urlConstants";

class DuelCreation extends React.Component {
    constructor(props) {
        super(props);

        if(props.language) e.setLanguage(props.language);

        props.initDuelCreation();
    
        const game = JSON.parse(localStorage.getItem('lastGame'));
        let enemyIds;

        if(game) {
            enemyIds = (game.needSetEnemy && game.creator && [game.creator.userId]) || '';
            props.getGame(game.gameId);
        }

        this.state = {
            view                  : 'MAIN',    // 'MY_FRIEND', 'GROUPS'
            enemyIds              : [],
            searchValue           : '',
            pausedEnemyIds        : [],
            selectedEnemyId       : enemyIds,
            currentGame           : game,
            settingsChangedByUser : false,
            lastGameOptions       : {}
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.groupListPlayerIds.length > 0) {
            this.setEnemy(nextProps.groupListPlayerIds);
            nextProps.setGroupListPlayers([]);
        } else {
            const enemys = this.state.selectedEnemyId;
            const { enemyIds } = this.state;

            if(enemys) {
                enemyIds.length ?  this.setEnemy(enemys, enemyIds) : this.setEnemy(enemys);
            }
        }
    
        const game = this.getAllGameData(JSON.parse(localStorage.getItem('lastGame')));

        if(this.state.settingsChangedByUser) {
            this.setState({ currentGame : nextProps.duelGame });
        } else {
            const currentGame = (game && game.gameId && game) || nextProps.currentGame

            this.setState({ currentGame : currentGame });
        }

        if(nextProps.language) e.setLanguage(nextProps.language);
    }
    
    /**
     * the method complements the current game data
     *
     * @param game {*}
     * @returns {*}
     */
    getAllGameData(game) {
        const { gameList, currentGame } = this.props;
        let fullGameData = currentGame;

        Array.isArray(gameList) && gameList.forEach(item => {
            if(game && item.gameId === game.gameId) {
                fullGameData = item.gameId === (fullGameData && fullGameData.gameId) ? {...item, ...fullGameData} : item;
            }
        });

        return fullGameData || game;
    }

    goToGroups = () => {
        this.setState({view: 'GROUPS'});
    }

    goToAddFriend = () => {
	    if(!this.props.myFriendList.length) {
	    	window.notification.confirm(
	    		e.game_youDoNotHaveAnyFriends,
			    e.game_doYouWantToAddFriends,
			    e.game_yesNo,
			    () => {
				    this.props.history.push(url.friends.index);
		        }
		    )
	    };

        this.setState({view: 'MY_FRIEND'});
    }

    goToMain = () => {
        this.setState({
            view: 'MAIN',
            selectedEnemyId: '',
        });
    }

    pauseEnemyInvitation = () => {
        const selectedEnemyId = this.state.selectedEnemyId;
        if (this.state.pausedEnemyIds.indexOf(selectedEnemyId) === -1) {
            this.setState(({pausedEnemyIds}) => ({pausedEnemyIds: [...pausedEnemyIds, selectedEnemyId]}))
        } else {
            this.setState(({pausedEnemyIds}) => {
                const index = pausedEnemyIds.indexOf(selectedEnemyId);
                const newPausedEnemyIds = [...pausedEnemyIds];
                newPausedEnemyIds.splice(index, 1);
                return {
                    pausedEnemyIds: newPausedEnemyIds
                }
            });
        }
    }

    changeEnemy = (userId) => {
        if (this.state.enemyIds.indexOf(userId) === -1) {
            this.setState(({enemyIds, pausedEnemyIds, selectedEnemyId}) => {
                    const newEnemyIds = Array.isArray(enemyIds) ? enemyIds : [enemyIds];
                    const newPausedEnemyIds = [...pausedEnemyIds];

                    [newEnemyIds, newPausedEnemyIds].forEach(newIdList => {
                        const index = newIdList.indexOf(selectedEnemyId);
                        if (index !== -1) {
                            newIdList.splice(index, 1, userId);
                        }
                    })

                    return {
                        view: 'MAIN',
                        enemyIds: newEnemyIds,
                        pausedEnemyIds: newPausedEnemyIds,
                        selectedEnemyId: '',
                    }
                }
            )
        }

    }

    addEnemy = (userId) => {
        if (this.state.enemyIds.indexOf(userId) === -1) {
            this.setState(({enemyIds}) => {
                const newEnemyIds = [...enemyIds, userId];
                return {
                    view: 'MAIN',
                    enemyIds: newEnemyIds,
                    selectedEnemyId: '',
                }
            })
        } else {
            this.goToMain();
        }
    }

    setEnemy = (userIds, existingEnemyList = []) => {
        const newEnemyList = Array.isArray(userIds) ?
                                 userIds.filter(userId => userId !== this.props.userId) :
                                 [userIds];
        existingEnemyList = existingEnemyList.filter(id => id !== userIds);

        this.setState({
            enemyIds: [...newEnemyList, ...existingEnemyList]
        })
    }

    removeEnemy = () => {
        const userId = this.state.selectedEnemyId;
        this.setState(({enemyIds, pausedEnemyIds}) => {
            const newEnemyIds = [...enemyIds];
            const newPausedEnemyIds = [...pausedEnemyIds];
            [newEnemyIds, newPausedEnemyIds].forEach(newIdList => {
                const index = newIdList.indexOf(userId);
                if (index !== -1) {
                    newIdList.splice(index, 1);
                }
            })

            return {
                enemyIds: newEnemyIds,
                pausedEnemyIds: newPausedEnemyIds,
            };
        });
    }

    selectEnemy = (userId) => {
        this.setState({selectedEnemyId: userId});
    }

    setSearchValue = (searchValue) => {
        this.setState({searchValue})
    }

    selectGroup = (group) => {
        this.props.getGroupListPlayers(group.groupId);
        this.goToMain();
    }

    setCurrentGame = (currentGame) => {
        this.setState({ currentGame });
    }

    getCurrentGame = () => {
        return this.state.currentGame;
    }
    
    changedByUser() {
        this.setState({ settingsChangedByUser: true});
    }

    render() {
        let component = null;
        switch (this.state.view) {
            case 'MAIN':
                component = (
                    <Main
                        goBack={this.props.goBack}
                        close={this.props.close}
                        userName={this.props.userName}
                        gameList={this.props.gameList}
                        enemyIds={this.state.enemyIds}
                        pausedEnemyIds={this.state.pausedEnemyIds}
                        myFriendList={this.props.myFriendList}
                        cdnMedia={this.props.cdnMedia}
                        selectedEnemyId={this.state.selectedEnemyId}
                        goToAddFriend={this.goToAddFriend}
                        pauseEnemyInvitation={this.pauseEnemyInvitation}
                        changeEnemy={this.changeEnemy}
                        removeEnemy={this.removeEnemy}
                        goToGroups={this.goToGroups}
                        selectEnemy={this.selectEnemy}
                        createDuel={this.props.createDuel}
                        getGame={this.props.getGame}
                        currentGame={this.state.currentGame}
                        balance={this.props.balance}
                        goToPayment={this.props.goToPayment}
                        language={this.props.language}
                        getCurrentGame={this.getCurrentGame}
                        setCurrentGame={this.setCurrentGame}
                        changedByUser={this.changedByUser.bind(this)}
                        settingsChangedByUser={this.state.settingsChangedByUser}
                        profile={this.props.profile}
                    />
                );
                break;
            case 'MY_FRIEND': component = (
                <MyFriends
                    goBack={this.goToMain}
                    close={this.props.close}
                    getFriends={this.props.getFriends}
                    myFriendList={this.props.myFriendList}
                    selectEnemy={this.state.selectedEnemyId ? this.changeEnemy : this.addEnemy}
                    setSearchValue={this.setSearchValue}
                    searchValue={this.state.searchValue}
                    cdnMedia={this.props.cdnMedia}
                />
            );break;
            case 'GROUPS': component = (
                <Groups
                    initGroups={this.props.initGroups}
                    groupList={this.props.groupList}
                    selectGroupHandler={this.selectGroup}
                    cdnMedia={this.props.cdnMedia}
                    goToMain={this.goToMain}
                    title={e.game_duelGroups}
                />
            );break;
            default: component = null
        }
        return component;
    }
}

export default DuelCreation;
