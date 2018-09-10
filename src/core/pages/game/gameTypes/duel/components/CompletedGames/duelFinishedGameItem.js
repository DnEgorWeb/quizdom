import React from 'react'
import e from '../../../../../../../langs';
import moment from "moment";

import {
    DuelResultItemWrapper,
    DetailsPanel,
    DetailsPanelLabel,
    LeftPictureProfile,
    RightPictureProfile,
    DuelRate,
    DuelDate,
    DuelGameTitle,
    // RemoveButton,
} from './styledComponents'

const DuelResultItem = ({duel, cdnMedia, /*removeDuel,*/ onClick}) => {
    const dateObj = moment(duel.endDateTime);
    // const day = dateObj.format('dd');
    const date = dateObj.format('DD.MM.YYYY')
    const time = dateObj.format('kk:mm');

    const getGameOutcome = () => {
        switch (duel.gameOutcome) {
            case 'win':
                return ['VICTORY', 'LOSS']
            case 'lose':
                return ['LOSS', 'VICTORY']
            default:
                return ['TIE', 'TIE']

        }
    }

    const getCurrencySymbol = (currency) => {
        switch (currency) {
            case 'MONEY':
                return '€'
            case 'BONUS':
                return 'BP'
            case 'CREDIT':
                return 'CR'
            default:
                return ''
        }
    }

    const inviterPicture = `${cdnMedia}profile/${( localStorage.getItem('avatarImage') || `${duel.userId}.jpg` )}`;
    const opponentPicture = duel.opponents[0] ? `${cdnMedia}profile/${duel.opponents[0].userId}.jpg` : '';

    // + "?" + Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, 5) : '';
    return (
        <DuelResultItemWrapper>
            <DetailsPanel>
                <LeftPictureProfile
                    type={getGameOutcome()[0]}
                    imgSrc={inviterPicture}
                />
                <DetailsPanelLabel onClick={typeof onClick === 'function' ? onClick : null}>{e.game_details}</DetailsPanelLabel>
                <RightPictureProfile
                    type={getGameOutcome()[1]}
                    imgSrc={opponentPicture}
                />
            </DetailsPanel>
            <DuelRate>
                {
                    duel.gameIsFree ?
                        '---'
                        :
                        `${duel.gameEntryFeeAmount} ${getCurrencySymbol(duel.gameEntryFeeCurrency)}`
                }
            </DuelRate>
            <DuelDate>
                {`${date}, ${time} Uhr`}
            </DuelDate>
            <DuelGameTitle>
                {duel.game.title}
            </DuelGameTitle>
        </DuelResultItemWrapper>
    )
}

export default DuelResultItem;
