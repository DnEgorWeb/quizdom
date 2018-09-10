import styled from 'styled-components'

export const GroupListWrapper = styled.div`
  margin-top: 40px;
  background-color: #ececec;
  overflow: hidden;
    height: 880px;
    max-height: 880px;
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

export const TournamentItemWrapper = styled.div`
  margin-top: 10px;
  &:first-child {
    margin-top: 0;
  }
`
