import React from 'react'
import e from '../../../../../../../langs';
import styled from 'styled-components'

import {
    EnemySectionTitle,
    EnemyListWrapper,
    EnemyPicture,
    OptionSectionWrapper,
    OptionLinearWrapper,
    OptionTitle,
    LinearWrapper,
    OptionCell,
    NonActiveOptionCell,
    ActiveOptionCell,
} from '../DuelCreation/Main/styledComponents'

import InfoPanel from '../DuelCreation/Main/infoPanel'


import {SeparatorLineVert} from '../../../../../../modules/components/SeparatorLine'

import TopBar from '../../../../../../modules/components/GameResultsTopBar'
import StartSection from '../DuelCreation/Main/startSection'
import convertNumber from "../../../../../../../services/convertNumber";

const EnemyListWrapperStyled = styled(EnemyListWrapper)`
    justify-content: center;
`

export default class DuelStart extends React.Component{
    constructor(props) {
        super(props);
        e.setLanguage(props.language);
    }

    state = {
        isInfoPanelOpened: false,
        infoPanelContentType: ''
    }
    
    componentWillReceiveProps(nextProps) {
        e.setLanguage(nextProps.language);
    }

    componentWillMount(){
        if(!this.props.game){
            this.props.goBack()
        }
        // this.props.getBalance()
    }

    getCurrencySymbol = (currency) => {
        let currencySymbol = '';
        if (currency === 'MONEY') {
            currencySymbol = '€'
        } else if (currency === 'CR') {
            currencySymbol = 'CR'
        } else if(currency === 'BP') {
            currencySymbol = 'BP'
        } else {
            currencySymbol = '0'
        }
        return currencySymbol
    }

    getRateValueWithSymbol = (value, currency, showCurrency = true) => {
        switch (currency) {
            case 'MONEY':
                return `${parseInt(value, 10).toFixed(2).toString().replace('.', ',')} ${this.showCurrency ? this.getCurrencySymbol(currency) : ''}`
            case 'CR':
                return `${parseInt(value, 10).toFixed(2).toString().replace('.', ',')} ${this.showCurrency ? this.getCurrencySymbol(currency) : ''}`
            case 'BP':
                return `${convertNumber(value, false)} ${this.showCurrency ? this.getCurrencySymbol(currency) : ''}`
            default:
                return e.game_toTheHonor
        }
    }

    showInfo = () => {
        this.setState({
            isInfoPanelOpened: true,
            infoPanelContentType: 'INFO'
        })
    }

    closeInfoPanel = () => {
        this.setState({isInfoPanelOpened: false});
        setTimeout(() => {
            this.setState({
                selectedGameId: '',
            });
        }, 500)
    }

    getInfoPanelTitle = () => {
        switch (this.state.infoPanelContentType) {
            case 'INFO': return <p>{e.formatString(e.game_againstFriends, <span className='blue'>{e.game_duel}</span>)}</p>;
            case 'ENEMY': return <p>{e.formatString(e.game_opponentEnd, <span className='blue'>{e.game_duel}</span>)}</p>;
            case 'CATEGORIES': return `${this.props.gameList.length} ${e.game_categories}`;
            case 'CURRENCY_MONEY': return e.game_euro;
            case 'CURRENCY_CR': return e.game_credits;
            case 'CURRENCY_BP': return e.game_bonusPoints;

            default: return ''
        }
    }

    getImgSrcForInfoPanelTitle = () => {
        switch (this.state.infoPanelContentType) {
            case 'CURRENCY_MONEY': return 'images/01_Credits_LG.png';
            case 'CURRENCY_CR': return 'images/02_Credits_LG.png';
            case 'CURRENCY_BP': return 'images/03_BonusPunkte_LG.png';

            default: return ''
        }
    }

    render(){
        return (
            <div>
                <TopBar
                    leftButtonClickHandler={this.props.goBack}
                    rightButtonClickHandler={this.props.close}
                    caption="Duell Freunde"
                />

                <StartSection
                    rate={this.props.game && this.props.game.gameEntryFeeAmount ? (this.props.game.gameEntryFeeAmount + ' ' + this.props.game.gameEntryFeeCurrency) : 'FREE'}
                    numberOfQuestions={this.props.game && this.props.game.numberOfQuestions}
                    title={this.props.game ? this.props.game.title : ''}
                    userName={this.props.userName}
                    iconSrc={this.props.game ? `images/pool_icons/${this.props.game.game.assignedPoolsIcons[0]}.svg` : ''}
                    startGame={this.props.startDuel}
                    showInfo={this.showInfo}

                />
                <div>
                    <EnemySectionTitle>{e.game_duelOpponents}</EnemySectionTitle>
                    <EnemyListWrapperStyled>
                        <EnemyPicture
                            imgSrc={`${window.config.urls.MEDIA_PROFILE_FOLDER_LINK}${this.props.game && this.props.game.inviter.userId}.jpg`}
                        />
                    </EnemyListWrapperStyled>
                </div>
                <OptionSectionWrapper>

                    <LinearWrapper>
                        <SeparatorLineVert style={{position: 'absolute', top: 30}} />
                        <OptionLinearWrapper>
                            <OptionTitle>{e.game_category}</OptionTitle>
                            {
                                <ActiveOptionCell
                                    imgSrc={this.props.game ? `images/pool_icons/${this.props.game.game.assignedPoolsIcons[0]}.svg` : ''}
                                />
                            }
                        </OptionLinearWrapper>
                    </LinearWrapper>

                    <LinearWrapper>
                        <SeparatorLineVert style={{position: 'absolute', top: 30}} />
                        <OptionLinearWrapper>
                            <OptionTitle>{e.game_ask}</OptionTitle>
                            {
                                [3,5,7].map((number) => {
                                    const isActive = number === (this.props.game && this.props.game.numberOfQuestions);
                                    if (isActive) {
                                        return (
                                            <ActiveOptionCell key={number}>{number}</ActiveOptionCell>
                                        )
                                    } else if (number !== 0) {
                                        return (
                                            <NonActiveOptionCell key={number}>{number}</NonActiveOptionCell>
                                        )
                                    } else {
                                        return (
                                            <OptionCell key={Math.random()} />
                                        )
                                    }
                                })
                            }

                        </OptionLinearWrapper>
                    </LinearWrapper>

                    <LinearWrapper>
                        <SeparatorLineVert style={{position: 'absolute', top: 30}} />
                        <OptionLinearWrapper>
                            <OptionTitle>{e.game_commitment}</OptionTitle>
                            {
                                [{type: 'MONEY', symbol:'$'}, {type: 'BONUS', symbol:'BP'}, {type: 'CREDITS', symbol:'CR'}, {type: undefined, symbol:'0'}].map((currency) => {
                                    const isActive = this.props.game && this.props.game.gameEntryFeeCurrency === currency.type;
                                    if (isActive) {
                                        return (
                                            <ActiveOptionCell
                                                key={currency.symbol}
                                                fontSize={currency.type === 'MONEY' ? 62 : 46}
                                            >
                                                {currency.symbol}
                                            </ActiveOptionCell>
                                        )
                                    } else {
                                        return (
                                            <NonActiveOptionCell
                                                key={currency.symbol}
                                                fontSize={currency === 'MONEY' ? 62 : 46}
                                            >
                                                {currency.symbol}
                                            </NonActiveOptionCell>
                                        )
                                    }
                                })
                            }
                        </OptionLinearWrapper>
                    </LinearWrapper>
                    <InfoPanel
                        isOpen={this.state.isInfoPanelOpened}
                        onCloseHandler={this.closeInfoPanel}
                        title={this.getInfoPanelTitle()}
                        noTitlePicture={this.state.infoPanelContentType.indexOf('CURRENCY_') === -1}
                        imgSrc={this.getImgSrcForInfoPanelTitle()}
                        noInfoBlock={this.state.infoPanelContentType !== 'INFO'}
                        onOkButtonClick={this.state.infoPanelContentType === 'CATEGORIES' ? this.setCurrentGame.bind(null, this.state.selectedGameId) : null}
                    >
                        {e.game_qwe}
                    </InfoPanel>
                </OptionSectionWrapper>
            </div>
        )
    }
}
