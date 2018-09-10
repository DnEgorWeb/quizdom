import styled from 'styled-components'

export const SeparatorLineVert = styled.div`
  height: 4px;
  background: linear-gradient(to bottom, rgb(31,28,29), rgb(87,87,88));
  margin: ${({margin = '0'}) => margin};
  width: ${({width = '100%'}) => width};
`
