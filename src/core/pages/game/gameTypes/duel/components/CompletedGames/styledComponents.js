import styled from 'styled-components'

export const DuelFinishedGamesList = styled.div`
  overflow: hidden;
  margin-top: 20px;
  height: 1206px;
  max-height: 1206px;
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

export const DuelResultItemWrapper = styled.div`
  position: relative;
  //width: 750px;
  min-height: 340px;
  background-color: #3e3e3e;
  overflow: hidden;
  margin: 20px auto 0;
  &:first-child {
    margin-top: 0;
  }
`

export const DetailsPanel = styled.div`
  width: 322px;
  height: 102px;
  background: url('images/duel-details-panel.png') center no-repeat;
  margin: 79px auto 0;
  position: relative;
  color: #b4b4b4;
`

const PictureProfile = styled.div`
  width: 176px;
  height: 176px;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  background-color: rgb(71, 71, 71);
  border: 8px solid ${({type}) => {
      switch (type) {
          case 'VICTORY':
              return 'rgb(54, 165, 0)' //green
          case 'LOSS':
              return 'rgb(227, 5, 19)' //red
          default:
              return 'rgb(255, 229, 0)' //yellow
      }
    }};
  border-radius: 50%;
  box-sizing: border-box;
  &:before {
    content: '';
    width: 78px;
    height: 64px;
    position: absolute;
    left: -38px;
    top: -38px;
    background: url('images/duel-crown.png') center no-repeat;
    display: ${({type}) => type !== 'LOSS' ? 'block' : 'none'};
  }
  &:after {
    content: '';
    width: 146px;
    height: 146px;
    border-radius: 50%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(${({imgSrc}) => imgSrc ? imgSrc : ''}), url('images/Anonymus.png');
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

export const LeftPictureProfile = styled(PictureProfile)`
  left: -126px;
`

export const RightPictureProfile = styled(PictureProfile)`
  right: -126px;
`

export const DetailsPanelLabel = styled.div`
  font: 500 28px Overpass;
  color: #b4b4b4;
  text-transform: uppercase;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
`

const DuelLabel = styled.div`
  line-height: 1.27 !important;
`

export const DuelRate = styled(DuelLabel)`
  font-family: Overpass;
  font-size: 36px;
  margin-top: 10px;
  color: #b4b4b4;
  text-align: center;
`

export const DuelDate = styled(DuelLabel)`
  font: 500 36px Overpass;
  color: #ffe600;
  text-align: center;
`

export const DuelGameTitle = styled(DuelLabel)`
  font: 500 36px Overpass;
  color: #b4b4b4;
  text-align: center;
`

export const RemoveButton = styled.div`
  width: 76px;
  height: 76px;
  background: url('images/duel-remove.png') center no-repeat;
  position: absolute;
  bottom: 18px;
  right: 38px;
  cursor: pointer;
`