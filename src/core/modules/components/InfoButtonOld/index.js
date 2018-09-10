import styled from 'styled-components'

export const InfoButton = styled.div`
  width: ${({size = 100}) => size}px;
  height: ${({size = 100}) => size}px;
  background: url('images/info-button.png') center no-repeat;
  background-size: contain;
  cursor: pointer;
`

export default InfoButton;
