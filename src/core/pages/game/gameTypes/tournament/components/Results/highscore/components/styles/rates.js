import React from 'react'
import styled from 'styled-components'

export const Wrapper = styled.div`
  height: 100%;
  background-color:#ececec;
  font-family: Overpass, sans-serif;
`

export const MainInfo = styled.div`
  overflow: hidden;
  max-width: 70%;
`

export const UserBlock = styled.div`
  background-color: #232323;
  padding-top: 50px;
  box-shadow: 0 8px 10px -4px #232323;
  position:relative;
  cursor: pointer;
  p {
    margin-left: 190px;
    white-space: nowrap;
  }
`

export const UserName = styled.p`
  margin: 0;
  font-size: 36px;
  color: #ff7f00;
`

export const TournamentName = styled.p`
  margin: 0;
  font-size: 36px;
  color: #ff7f00;
`

export const Nickname = styled.p`
  margin-top: 0;
  margin-bottom: 5px;
  font-size: 32px;
  color: #a8a8a8;
`

export const Address = styled.div`
  height: 50px;
  background-color:#383838;
  color: #9a9a9a;
  font-size: 32px;
  p {
    margin-top: 0;
    line-height: 1.5;
  }
`

export const Statistics = styled.div`
  height: 50px;
  background-color:#303030;
  color: #ff7f00;
  font-size: 34px;
  margin-top: 2px;
  position:relative;
  display: flex;
  align-items: center;
  span:first-of-type {
    margin-left: 190px;
  }
  span {
    margin-right: 20px;
  }
`

export const InfoButton = styled.img`
  width: 70px;
  height: 70px;
  position:absolute;
  z-index: 1;
  right: 65px;
  border: 3px solid #232323;
  border-radius: 100%;
  cursor: pointer;
`

export const VerticalSeparator = styled.div`
  display: inline-block;
  width: 2px;
  height: 35px;
  background-color:#ff7f00;
  margin-right: 20px;
  vertical-align: middle;
`

export const UserPhoto = styled.div`
  width: 140px;
  height: 140px;
  background: url(${props => props.profileURL || 'images/Anonymus.png'}) center no-repeat;
  background-size: cover;
  border: 2px solid rgb(218,218,218);
  border-radius: 50%;
  position: absolute;
  z-index: 3;
  top: 10px;
  left: 24px;  
`

export const FlagWrapper = styled.div`
  position: absolute;
  left: 11px;
  top: 15px;
  span {
    transform: scale(1.5);
  }
`

export const RankListHeader = styled.div`
  font-family: Univers-condensed;
  font-size: 36px;
  margin: 30px 20px;
  color: #333333;
  span:last-of-type {
    color: #ff7f00;
  }
`

export const Separator = styled.div`
  display: inline-block;
  height: 4px;
  width: 160px;
  vertical-align: middle;
  position:relative;
  top: -3px;
  margin-right: 15px;
  background: linear-gradient(to bottom, #b4b4b4, #fff);
`

export const Flag = styled(props => <span className={`flag flag-${props.value.toLowerCase()}`}/>)``

export const Box = styled.div`
  overflow: hidden;
  height: calc(100% - 98px);
  .scrollable-wrapper{
    overflow: auto;
    width: 105%;
    height: 100%;
  }
`

export const ExtendedUserBlock = styled(UserBlock)`
  margin-top: 25px;
  padding-top: 35px;
  padding-bottom: 0;
  box-shadow: none;
  cursor: default;
`

export const ExtendedStatistics = styled(Statistics)`
  display: flex;
  justify-content: space-between;
  background-color:#d9d9d9;
  padding-right: 45px;
  border-top: 2px solid white;
  margin-top: 0;
`

export const ExtendedAddress = styled(Address)`
  background-color:#d9d9d9;
`

export const ExtendedUserPhoto = styled(UserPhoto)`
  top: 10px;
`

export const ExtendedFlagWrapper = styled(FlagWrapper)`
  top: 15px;
`
export const Medal = styled.img`
  position:absolute;
  right: 45px;
  top: 10px;
  width: 130px;
`

export const ChampionLabel = styled.div`
  font-size: 26px;
  font-weight: bold;
`