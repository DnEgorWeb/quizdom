import styled from 'styled-components'

export const Table = styled.table`
  border-spacing: 7px;
  margin: 0 auto;
`
export const TableHead = styled.thead`
  font: 500 28px Univers-condensed;
`
export const TableHeadTd = styled.td`
  text-align: center;
  vertical-align: bottom;
  color: white;
  width: ${({forNumber}) => forNumber ? '94px' : '124px'};
`
export const TableBodyTd = styled.td`
  border: 1px solid rgb(221,221,227);
  border-radius: 10px;
  background-color: #dddee3;
  height: 61px;
  text-align: center;
  vertical-align: middle;
  font: 500 36px Overpass;
`
export const FailureTd = styled(TableBodyTd)`
  background: rgb(227,5,19);
  color: white;
  border-color: rgb(227,5,19);
`
export const RightTd = styled(TableBodyTd)`
  background: rgb(53,165,0);
  color: white;
  border-color: rgb(53,165,0);
`

export const SecPointsTd = styled(TableBodyTd)`
  text-align: center;
`
export const PointsTd = styled(TableBodyTd)`
  background-color: #1ff2ff;
  border-color: #1ff2ff;
`