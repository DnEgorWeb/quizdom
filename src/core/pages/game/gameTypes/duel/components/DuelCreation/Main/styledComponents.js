import React from 'react'
import styled from 'styled-components'

export const FreeSpace = styled.div`
  width: 160px;
`

export const EnemySectionTitle = styled.div`
  font: 500 26px Overpass;
  text-align: center;
  color: #b4b4b4;
  margin-top: 36px;
  text-transform: uppercase;
`

export const EnemyListWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 18px 40px 0 25px;
`

export const EnemyPicture = styled.div`
  width: 124px;
  height: 124px;
  border-radius: 50%;
  box-sizing: border-box;
  border: 4px solid white;
  background: url(${({imgSrc}) => imgSrc || 'images/20_Friend_ADD_256.png'}) center no-repeat, url('images/Anonymus.png') center no-repeat;
  background-size: cover;
  cursor: pointer;
  
  position: relative;
  &:before {
    position: absolute;
    bottom: -15px;
    right: -5px;
    content: '';
    width: 50px;
    height: 50px;
    background: ${({paused}) => paused ? 'url("images/Slider-Icons_B06b_.png") center no-repeat' : 'transparent'};
    background-size: contain;
  }
`

export const AddButton = styled.button`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background-image: linear-gradient(to top, #2a272a, #48484b);
  position: relative;
  box-shadow: 0 -2px 0 rgb(147,147,147), 0 0 0 2px rgb(27,27,27);
  cursor: pointer;
  border: none;
  outline: none;
  &:active {
    background-image: linear-gradient(to bottom, #2a272a, #48484b);
    transform: translate(0, 2px);
  }
  &:before {
    content: '';
    height: 100%;
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -54%);
    background: url(${({imgSrc}) => imgSrc }) center no-repeat;
  }
`

export const OptionSectionWrapper = styled.div`
  margin: 58px auto 0;
  width: 710px;
  height: 494px;
  background-image: linear-gradient(to top, #232324, #48484b);
  border-radius: 7px;
  box-shadow: 0 -2px 0 0 rgb(147, 147, 147);
  overflow: hidden;
`

export const OptionLinearWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  &:first-child {
    margin-top: 24px;
  }
`

export const OptionTitle = styled.div`
  display: inline-block;
  font: 500 28px Overpass;
  margin-left: 6px;
  color: #1ff2ff;
  text-transform: uppercase;
  width: 150px;
`

export const EmptyOptionCell = styled.div`
  margin-left: 25px;
`

export const OptionCell = styled(EmptyOptionCell)`
  width: 98px;
  height: 98px;
  border-radius: 50%;
  font: 900 ${({fontSize}) => (fontSize || 52) + 'px'} Arial;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 4px solid rgb(90, 90, 90);
  background-color: rgb(63, 63, 67);
  // background-image: url(${({imgSrc}) => imgSrc || ''});
  // background-size: 60px;
  // background-repeat: no-repeat;
  // background-position: center;
  position: relative;
  & > img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: auto; // 60px;
  }
`

export const NonActiveOptionCellWrapper = styled(OptionCell)`
  border: 4px solid rgb(91,91,91);
  background-color: rgb(35, 35, 35);
  color: #d7d7d7;
  cursor: pointer;
`

export const ActiveOptionCellWrapper = styled(OptionCell)`
  background-color: #1ff2ff;
  box-shadow: inset 3.3px 2.3px 8px 0 rgba(0, 0, 0, 0.7);
  color: #232324;
  border: none;
  cursor: pointer;
`

export const ActiveOptionCell = (props) => (
    <ActiveOptionCellWrapper onClick={props.handler}>
        {
            props.imgSrc ?
                <img src={props.imgSrc} alt=''/> :
                props.children
        }
    </ActiveOptionCellWrapper>)

export const NonActiveOptionCell = (props) => (
    <NonActiveOptionCellWrapper
        onClick={props.handler ? props.handler : null}
    >
        {
            props.imgSrc ?
                <img src={props.imgSrc} alt=''/> :
                props.children
        }
    </NonActiveOptionCellWrapper>
)

export const LinearWrapper = styled.div`
  position: relative;
  width: 670px;
  margin: 37px auto 0;
`
