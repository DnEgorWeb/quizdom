import styled from 'styled-components'

export const UserDetailsKarteWrapper = styled.div`
  position: relative;
  margin-top: 68px;
  &:first-child {
    margin-top: 0;
  }
`

export const TopPanel = styled.div`
  height: 105px;
  background-image: linear-gradient(to bottom, rgb(80, 80, 80), rgb(51, 51, 51));
  padding-left: 193px;
  overflow: hidden;
`

export const Name = styled.div`
  font: 500 40px Overpass;
  color: white;
  line-height: 1;
  margin-top: 10px;
`

export const Nickname = styled.div`
  font: 500 36px Overpass;
  color: #cdcdcd;
  line-height: 1;
  margin-top: ${({hasFirstName}) => hasFirstName ? '10px' : '35px'};
`

export const BottomPanel = styled.div`
  height: 55px;
  background-color: rgb(217, 217, 217);
  padding-left: 193px;
`

export const City = styled.div`
  font: 500 36px Overpass;
  color: #333333;
`

export const Flag = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 49px;
  height: 53px;
  margin-right: 10px;
`

export const ProfilePicture = styled.div`
  position: absolute;
  top: 10px;
  left: 24px;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background-image: url(${({imgSrc = ''}) => imgSrc}), url('images/Anonymus.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border: 2px solid rgb(217,217,217);
  box-sizing: border-box;
`
