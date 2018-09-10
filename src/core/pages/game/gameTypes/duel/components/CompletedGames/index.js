import React from 'react'
import e from '../../../../../../../langs';

import {
    DuelFinishedGamesList,
} from './styledComponents'

import TopBar from '../../../../../../modules/components/GameResultsTopBar'
import DuelFinishedGameItem from './duelFinishedGameItem'
import ResultsContainer from '../../../../../../modules/results/ResultsContainer'
// import Details from './details'
// import url from "../../../../../../../constants/urlConstants";

class DuelFinishedGames extends React.Component {

    state = {
        view: 'COMPLETED_GAME_LIST',    // 'DETAILS'
    }

    removeDuel = (duel) => {
        window.notification.confirm(
            e.game_note,
            e.game_shouldThisDuelResultBeDeleted,
            e.game_yesNo,
            (button) => {
                if (Number(button) !== 2) {
                    console.log(duel)
                }
            })
    }

    back = () => {
        this.setState({view: 'COMPLETED_GAME_LIST'});
    }

    goToDetails = (gameInstanceId) => {
        this.props.dispatchSetGameInstanseId(gameInstanceId);
        this.setState({view: 'DETAILS'});
    }

    render() {
        if (this.state.view === 'COMPLETED_GAME_LIST') {
            return (
                <div>
                    <TopBar
                        leftButtonClickHandler={this.props.goBack}
                        rightButtonClickHandler={this.props.close}
                        caption="DUELL Ergebnisse"
                    />
                    <DuelFinishedGamesList>
                        <div className='scrollable-wrapper'>
                            {
                                this.props.completedDuels.map(completedDuel => (
                                    <DuelFinishedGameItem
                                        key={completedDuel.endDateTime}
                                        duel={completedDuel}
                                        cdnMedia={this.props.cdnMedia}
                                        removeDuel={this.removeDuel}
                                        onClick={this.goToDetails.bind(null, completedDuel.gameInstanceId)}
                                    />)
                                )
                            }
                        </div>
                    </DuelFinishedGamesList>
                </div>
            )
        } else {
            return (
                <ResultsContainer
                    close={() => {this.setState({view: "COMPLETED_GAME_LIST"})}}
                    type={this.state.type}
                />
            )
        }

    }
}

export default DuelFinishedGames;
