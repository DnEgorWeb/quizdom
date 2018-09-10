import styled from 'styled-components'

export const GroupsWrapper = styled.div`
  height: 100%;
  background: rgb(236,236,236);
`

export const TopPanel = styled.div`
  padding: 42px 35px 22px;
  box-sizing: border-box;

  height: 162px;
  background-color: #343435;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.7);
  position: relative;
  z-index: 1;
  
  font: 500 28px Overpass;
  color: #b4b4b4;
  .big {
    font-size: 36px;
  }
`

export const GroupListWrapper = styled.div`
  overflow: hidden;
    height: 1072px;
    max-height: 1072px;
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
