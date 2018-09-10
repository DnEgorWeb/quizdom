import React                      from 'react'
import e                          from '../../../../langs'
import styled                     from 'styled-components'
// import {userWinningComponentLoad} from "../../../pages/myWinnings/duck";
// import {clearWinningComponents} from "../../../pages/myWinnings/duck";

const Wrapper = styled.div`
  border-top: 3px solid #939393;
  position:relative;
  box-sizing: border-box;
  width:710px;
  margin-top: 100px;
  height:222px;
  background: ${props => props.isDuel ? "linear-gradient(to bottom, #ffffff, #b5b8bc)" : "linear-gradient(to bottom, #48484b, #424245)"};
  margin-left: auto;
  margin-right: auto;
  font-size: 30px;
  color: ${props => props.isDuel ? "black" : "white"};
  padding-top: 35px;
  border-radius: ${props => props.isDuel ? "35px" : "15px"};
  text-align: center;
  cursor: pointer;
  .white {
    background: linear-gradient(to bottom, #ffffff, #b5b8bc);
  }
`

const AmountContainer = styled.div`
  position:absolute;
  left: 50%;
  transform: translate(-50%,0);
  margin-top: 15px;
  display: flex;
  align-items: center;
  div:first-of-type {
    box-sizing: border-box;
    background-color:#232324;
    border-radius: ${props => props.isDuel ? "35px" : "15px"};
    height: 110px;
    font-size: 50px;
    color: #ffe600;
    border-top: 2px solid #111111;
    border-bottom: 2px solid #6f6f6f;
    width: ${props => props.isDuel ? "460px" : "600px"};
  }
  img {
    width: 90px;
    height: 90px;
    margin: 15px;
  }
  .noPrize {
      font-size: 32px !important;
      color: white !important;
  }
`

const Amount = styled.div`
  font-weight: 900;
  box-sizing: border-box;
  width: 300px;
  height: 72px;
  border-radius: 15px;
  color: #1ff2ff;
  background-color:#232324;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  border-top: 2px solid #111111;
  border-bottom: 2px solid #6f6f6f;
`

const PrizeLabel = styled.div`
    font-weight: 900;
    width: 200px;
    background-color:#232324;
    height: 80px;
    border-radius: 20px;
    position:absolute;
    top:-60px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.isDuel ? "white" : "#e6e6e6"};
    font-size: 50px;
    left:50%;
    transform: translateX(-50%);
`

const ArrowPrize = styled.img `
  position:absolute;
  width: 80px;43
  height: 80px;
  top: 5px;
  right: 0;
`

export default function Prize({
    freeWinningComponent, isDuel, toggleComponent, isSpinnerPlayed,
    isWinningComponentUnavailable, winningOption = {}, /*startWinningComponent*/
}) {
    let possiblePrize = null
    if (freeWinningComponent && !isSpinnerPlayed && !isWinningComponentUnavailable) {
        possiblePrize = freeWinningComponent.winningOptions[freeWinningComponent.winningOptions.length-1]
    }

    return (
        <Wrapper isDuel={isDuel} onClick={() => {
            // startWinningComponent && startWinningComponent();
            if(!isSpinnerPlayed && freeWinningComponent) toggleComponent('showWinningComponent', true);
        }}>
            {
                possiblePrize ?
                    e.game_haveTheOpportunityToWin
                    :
                    null
            }
            <AmountContainer isDuel={isDuel}>
                {isDuel ? <img src="images/Icon_forward.png" alt="arrow"/> : null}
                {
                    possiblePrize ?
                        <Amount>{`${possiblePrize.amount} ${possiblePrize.type}`}</Amount>
                        :
                        (
                        isSpinnerPlayed && winningOption ?
                            <Amount>{`${e.game_youWon} ${winningOption.amount} ${winningOption.type}`}</Amount>
                            :
                            <Amount className="noPrize">{e.game_thisTimeTheResultWasNotEnoughForAChance}</Amount>
                        )
                }
                {isDuel ? <img src="images/Icon_forward.png" alt="arrow"/> : null}
            </AmountContainer>
            {
                possiblePrize ?
                    <PrizeLabel isDuel={isDuel}>{e.game_you}</PrizeLabel>
                    :
                    null

            }
            {isDuel ? null :
                possiblePrize ?
                    <ArrowPrize src="images/arrow_forward.png" />
                    :
                    null
            }
        </Wrapper>
    )
}
