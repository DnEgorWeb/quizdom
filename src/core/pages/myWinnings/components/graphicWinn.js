import React from 'react'
import e from '../../../../langs'
import styled from 'styled-components'
import TopBar from '../../../modules/components/TopBar'

const Wrapper = styled.div`
  height:100%;
  background-color:#ececec;
`

const Panel = styled.div`
  height: 562px;
  background: rgb(52,52,53);
  overflow: hidden;
  box-shadow: 0 4px 4px rgb(142,142,142);
`

const Image = styled.div`
  width: 750px;
  height: 380px;
  background: url(${({imageSrc}) => imageSrc}) center no-repeat;
  background-size: contain;
  position: relative;
`

const Title = styled.div`
  font: 900 60px Overpass;
  color: #ff7f00;
  text-transform: uppercase;
  text-align: center;
  margin: 50px 0 20px;
`

const WinningValue = styled.div`
  color: rgb(218,218,218);
  font: 900 70px Arial;
  text-transform: uppercase;
  position: absolute;
  right: 50px;
  top: 50%;
  transform: translate(0, -50%);
`

const mapCurrToSymbol = {
    "credit": "CR",
    "bonus": "BP",
    "money": "€"
}

const GraphicWinn = ({currentWinn, ...props}) => {
    const {amount = 5, currency = 'credit'} = currentWinn;
    return (
        <Wrapper>
            <TopBar caption='spinner' back={typeof props.back === 'function' ? props.back : null}/>
            <Panel>
                <Title>{e.mywinnings_won}</Title>
                <Image imageSrc={`images/my-winnings-spinner-${currency}.png`}>
                    <WinningValue>
                        {
                            `${amount} ${mapCurrToSymbol[currency]}`
                        }
                    </WinningValue>
                </Image>
            </Panel>
        </Wrapper>
    )
}

export default GraphicWinn;
