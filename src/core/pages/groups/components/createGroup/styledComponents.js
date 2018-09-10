import styled from 'styled-components'

export const CreateGroupWrapper = styled.div`
  height: 100%;
  background: rgb(236,236,236);
`

export const TopPanelWrapper = styled.div`
  height: 400px;
  background: rgb(35,35,35);
  box-shadow: 0px 4px 8px 0 rgba(0, 0, 0, 0.7);
  position: relative;
`

export const GroupImageWrapper = styled.div`
  width: 340px;
  height: 340px;
  border-radius: 50%;
  background-size: 180px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

export const Image = styled.div`
  width: 180px;
  height: 180px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: url(${({imgSrc}) => imgSrc ? imgSrc : 'images/no-group-image.png'}) center no-repeat;
  background-size: 180px;
`

export const AboveGlass = styled.div`
  width: 340px;
  height: 340px;
  background: url('images/group-image-glass.png') center no-repeat;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

export const InfoButtonWrapper = styled.div`
  position: absolute;
  top: 44px;
  right: 50px;
`

export const InfoButton = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background-image: linear-gradient(to top, #2a272a, #48484b);
  box-shadow: 0 -2px 0 rgb(148,148,148), 0 0 0 5px rgb(28,28,28);
  position: relative;
  cursor: pointer;
  &:before {
    content: '';
    width: 80px;
    height: 80px;
    position: absolute;
    left: 50%;
    top: 46%;
    transform: translate(-50%,-50%);
    background: url('images/friends-info.png') center no-repeat;
  }
  &:active {
    box-shadow: 0 0 0 2px rgb(28,28,28);
    transform: translate(0, 2px);
  }
`

export const UpdateButtonWrapper = styled.div`
  position: absolute;
  top: 214px;
  right: 50px;
`

export const UpdateButton = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background-image: linear-gradient(to top, #2a272a, #48484b);
  box-shadow: 0 -2px 0 rgb(148,148,148), 0 0 0 5px rgb(28,28,28);
  position: relative;
  cursor: pointer;
  &:before {
    content: '';
    width: 80px;
    height: 80px;
    position: absolute;
    left: 50%;
    top: 46%;
    transform: translate(-50%,-50%);
    background: url('images/groups-update.png') center no-repeat;
  }
  &:active {
    box-shadow: 0 0 0 2px rgb(28,28,28);
    transform: translate(0, 2px);
  }
`

export const LoadImageLinkWrapper = styled.div`
  position: absolute;
  bottom: 26px;
  right: 41px;
`

export const LoadImageLink = styled.div`
  font: 500 32px Univers-condensed;
  color: #ff9500;
`

export const FormPanelWrapper = styled.div``

export const GroupNameInputWrapper = styled.div`
  width: 642px;
  margin: 95px auto 0;
`

export const GroupNameInput = styled.input`
  width: 100%;
  height: 70px;
  border-radius: 16px;
  background-color: #ffffff;
  border: solid 2px #818181;
  box-sizing: border-box;
  font: 500 40px Univers-condensed;
  color: #333333;
  padding: 0 32px;
`

export const GroupCreateButtonWrapper = styled.div`
  width: 342px;
  margin: 179px auto 0;
`
