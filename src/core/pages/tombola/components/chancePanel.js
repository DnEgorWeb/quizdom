import React from 'react'
import e from '../../../../langs'

import convertNumber from '../../../../services/convertNumber'

import {
    ChancePanelWrapper,
    OwnTombolaWrapper,
    OwnTombolaLabel,
    Amount,
    InfoButtonWrapper,
} from './styledComponents'

import InfoButton from '../../../modules/components/InfoButton'

const ChancePanel = (props) => {
    const {
              currentTombola,
              tombolaList = [],
              toggleInfoPanel,
              userTombola
          } = props;

    const {
              totalTicketsAmount     = 0,
              purchasedTicketsAmount = 0
          } = tombolaList[ currentTombola ] || {};
    
    // const convertedPurchasedTicketsAmount = convertNumber(purchasedTicketsAmount, false);
	const convertedTotalTickets                 = convertNumber((totalTicketsAmount - purchasedTicketsAmount), false);
	const countedProbability                    = isFinite(totalTicketsAmount / purchasedTicketsAmount) ? `1 : ${convertNumber((totalTicketsAmount / purchasedTicketsAmount).toFixed(1))}` : 0;
	const { totalTicketsBought = 0, tombolaId } = userTombola || {};
	const currentTombolaId                      = tombolaList.length && tombolaList[ currentTombola ] && tombolaList[ currentTombola ].id;

    return (
        <ChancePanelWrapper>
            <OwnTombolaWrapper>
                <OwnTombolaLabel>{e.tombola_myLoose}</OwnTombolaLabel>
                <Amount>{currentTombolaId === tombolaId ? totalTicketsBought : 0}</Amount>
            </OwnTombolaWrapper>
            <OwnTombolaWrapper>
                <OwnTombolaLabel>{e.tombola_chanceOfWinning}</OwnTombolaLabel>
                <Amount>{countedProbability}</Amount>
            </OwnTombolaWrapper>
            <OwnTombolaWrapper>
                <OwnTombolaLabel>{e.tombola_looseInGame}</OwnTombolaLabel>
                <Amount>{convertedTotalTickets}</Amount>
            </OwnTombolaWrapper>
            <InfoButtonWrapper>
                <InfoButton toggleInfoPanel={toggleInfoPanel} size={100} language={props.language}/>
            </InfoButtonWrapper>
        </ChancePanelWrapper>
    )
}

export default ChancePanel;
