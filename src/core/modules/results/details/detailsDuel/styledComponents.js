import styled from 'styled-components'

export const DetailsWrapper = styled.div`
  background: rgb(35,35,36);
  //height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  height: 100%;
  max-height: 100%;
  position: relative;
  .scrollable-wrapper{
    position: absolute;
    top: 98px;
    bottom: 0;
    left: 0;
    right: -17px;
    overflow-y: scroll;@media (max-width: 768px) {
            right: 0;
        }
  }
`

export const DetailOverviewWrapper = styled.div`
  margin-top: 87px;
`

export const OverviewItemWrapper = styled.div`
  width: 690px;
  margin: 25px auto 0;
  &:first-child {
    margin-top: 0;
  }
`

export const Title = styled.div`
  text-align: center;
  font: 500 32px Univers-condensed;
  color: #b4b4b4;
  line-height: 1;
  text-transform: uppercase;
`

export const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 11px;
`

export const BothResult = styled.div`
  padding: 0 21px;
  display: flex;
  justify-content: center;
  background-color: rgb(24, 24, 24);
  font: 500 42px Overpass;
  color: ${({win}) => win ? '#ffe600' : '#1ff2ff'};
  width: 330px;
  height: 58px;
  box-sizing: border-box;
`

export const LeftResult = styled(BothResult)`
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  box-shadow: 2px -2px 0 rgb(88,88,88);
  justify-content: flex-end;
`

export const RightResult = styled(BothResult)`
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  box-shadow: -2px -2px 0 rgb(88,88,88);
  justify-content: flex-start;
`

export const TableBlock = styled.div`
  margin-top: 53px;
`
