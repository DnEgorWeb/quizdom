import styled from 'styled-components'

import {
    GradientPanel,
} from '../gameCategoryList/styledComponents'

export const GameListWrapper = styled.div`
  height: 100%;
  background: rgb(35,35,36);
  overflow: hidden;
`

export const SpecialGameListWrapper = styled.div`
  width: 710px;
  margin: 0 auto;

  overflow: hidden;
  height: ${({showLastGame}) => showLastGame ? 'calc(100% - 555px);' : 'calc(100% - 100px)'};
  max-height: ${({showLastGame}) => showLastGame ? 'calc(100% - 555px);' : 'calc(100% - 100px)'};
  position: relative;
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

export const SpecialGameWrapper = styled(GradientPanel)`
  border-radius: 15px;
  padding: 20px;
  cursor: pointer;
`

export const Picture = styled.div`
  width: 615px;
  height: 167px;
  background: url(${({iconSrc}) => iconSrc || ''}) center no-repeat;
`

export const QuestionAmountWrapper = styled.div`
  display: inline-block;
  margin-left: 73px;
  position: absolute;
  right: 110px;
`
