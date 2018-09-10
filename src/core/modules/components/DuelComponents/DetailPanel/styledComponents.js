import styled from 'styled-components'

export const DetailsPanelWrapper = styled.div`
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
        case 'win':
            return 'rgb(54, 165, 0)' //green
        case 'lose':
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
    background-size: cover;
    display: ${({type}) => type !== 'lose' ? 'block' : 'none'};
  }
  &:after {
    content: '';
    width: 146px;
    height: 146px;
    border-radius: 50%;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(${({imgSrc}) => imgSrc ? imgSrc : ''}), url('images/Anonymus.png');
    background-size: cover;
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
