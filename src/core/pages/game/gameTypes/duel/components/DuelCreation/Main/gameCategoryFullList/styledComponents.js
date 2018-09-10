import React from 'react'
import styled from 'styled-components'

export const GameCategoryFullListWrapper = styled.div`
  overflow: hidden;
    height: 960px;
    max-height: 960px;
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

export const Title = styled.div`
  color: white;
  font: 500 36px Overpass;
  margin: 0 0 0 23px;
  width: 520px;
`

export const CategoryItem = styled.div`
  min-height: 100px;
  position: relative;
  //padding-left: 141px;
  display: flex;
  align-items: center;
  cursor: pointer;
`

export const OptionCell = styled.div`
  width: 98px;
  height: 98px;
  border-radius: 50%;
  border: 4px solid rgb(90, 90, 90);
  background-color: #232324;;
  background-image: url(${({imgSrc}) => imgSrc || ''});
  background-size: auto 60px;
  background-repeat: no-repeat;
  background-position: center;
  box-sizing: border-box;
  
  margin-left: 16px;
`

export const NonActiveIconWrapper= styled(OptionCell)`
  border: 4px solid rgb(91,91,91);
  background-color: rgb(35, 35, 35);
  color: #d7d7d7;
  cursor: pointer;
  position: relative;
  & > img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
  }
`

export const ActiveIconWrapper = styled(OptionCell)`
  background-color: #1ff2ff;
  box-shadow: inset 3.3px 2.3px 8px 0 rgba(0, 0, 0, 0.7);
  color: #232324;
  border: none;
  cursor: pointer;
  position: relative;
  & > img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
  }
`

export const ActiveIcon = (props) => (
    <ActiveIconWrapper>
        <img src={props.imgSrc} alt=''/>
    </ActiveIconWrapper>
)

export const NonActiveIcon = (props) => (
    <NonActiveIconWrapper>
        <img src={props.imgSrc} alt=''/>
    </NonActiveIconWrapper>
)

export const GameTitle = styled(Title)`
  //position: absolute;
  //left: 141px;
  //top: 50%;
  //transform: translate(0, -50%);
  display: inline-block;
  //white-space: nowrap;
  width: 400px;
  overflow: hidden;
  line-height: 1.2;
`
