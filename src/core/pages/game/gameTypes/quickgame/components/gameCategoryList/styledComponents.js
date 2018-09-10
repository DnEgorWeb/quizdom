import styled from 'styled-components'
import {Link} from 'react-router-dom';

export const GameCategoryListWrapper = styled.div`
  background: rgb(35,35,36);
  overflow: hidden;
`

export const GameCategoryListContent = styled.div`
  height: calc(100% - 98px);
`

export const InfoBlock = styled.div`
  width: 710px;
  margin: 0 auto;
  padding: 20px 20px 40px;
  box-sizing: border-box;
  background: linear-gradient(to bottom, rgb(72,72,75), rgb(35,35,35));
  box-shadow: 0 -2px 0 rgb(147,147,147);
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
`

export const LastGameWrapper = styled.div`
  overflow: hidden;
  box-shadow: 0 2px 0 rgb(50,50,50), 0 4px 8px black;
`

export const LastGameContent =  styled.div`
  margin: 20px;
  position: relative;
`

export const IconBlock = styled.div`
  display: flex;
`

// export const Icon = styled.div`
//   width: 250px;
//   height: 168px;
//   border-radius: 6px;
//   box-shadow: inset 4px 3px 9px 0 rgba(0, 0, 0, 0.7);
//   background: url(${({imgSrc}) => imgSrc}) center no-repeat;
//   background-size: ${({isSpecialGame}) => isSpecialGame ? 'contain' : 'auto 120px'};
//   background-color: ${({isSpecialGame}) => isSpecialGame ? 'rgb(255,230,0)' : '#1ff2ff'};
// `
export const IconWrapper = styled.div`
  width: 250px;
  height: 168px;
  border-radius: 6px;
  box-shadow: inset 4px 3px 9px 0 rgba(0, 0, 0, 0.7);
  background-color: ${({isSpecialGame}) => isSpecialGame ? 'rgb(255,230,0)' : '#1ff2ff'};
  position: relative;
`
export const Icon = styled.img`
  height: 120px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

export const SingleText = styled.div`
  margin-left: 26px;
  flex: 1;
`

export const Caption = styled.div`
  font: 500 32px Overpass;
  color: #b4b4b4;
  line-height: 1.2;
`

export const Price = styled.div`
  font: 900 32px Overpass;
  color: #ffe600;
  text-transform: uppercase;
  line-height: 1.2;
`

export const Jackpot = styled.div`
  font: 900 ${({children}) => children.length > 8 ? (children.length > 12 ? 40 : 50) : 60}px Overpass;
  color: #ffe600;
  text-transform: uppercase;
  line-height: 1.2;
`

export const Text = styled.div`
  font: 500 32px Overpass;
  color: white;
  line-height: 1.2;
  white-space: nowrap;
  max-width: 440px;
  overflow: hidden;
`

export const TextWithWrap = styled(Text)`
  white-space: normal;
  word-break: break-all;
  //text-overflow: ellipsis;
`

export const QuestionAmountWrapper = styled.div`
  position: absolute;
  right: 130px;
  top: 250px;
`

export const QuestionAmount = styled.div`
  position: relative;
  font: 500 26px Overpass;
  color: #78737b;
`

export const QuestionBallWarpper = styled.div`
  position: absolute;
  bottom: 0;
  left: 90px;
`

export const QuestionBall = styled.div`
  width: 99px;
  height: 98px;
  border-radius: 50%;
  background-color: #1ff2ff;
  box-shadow: inset 3.3px 2.3px 8px 0 rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;

  font: 900 52px Arial;
  color: #232324;
`

export const StartBlockWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
`

export const SimpleButton = styled.div`
  width: 160px;
  height: 96px;
  border-radius: 10px;
  background-image: linear-gradient(to top, #2a272a, #48484b);
  position: relative;
  box-shadow: 0 -2px 0 rgb(147,147,147), 0 0 0 2px rgb(27,27,27);
  cursor: pointer;
  &:active {
    transform: translate(0, 2px);
    background-image: linear-gradient(to bottom, #2a272a, #48484b);
  }
`

export const Button = styled(SimpleButton)`
  &:after {
    content: '';
    width: 100%;
    height: 100%;
    background: url(${({imgSrc}) => imgSrc}) center no-repeat;
    background-size: contain;
    position: absolute;
  }
`

export const GLButton = styled(Button)`
  &:before {
    content: '';
    width: 69px;
    height: 69px;
    border-radius: 50%;
    position: absolute;
    right: -8px;
    top: -8px;
    background: url( ${({isOn}) => isOn ? 'images/gl-on.png': 'images/gl-off.png'} ) center no-repeat;
  }
  &:after {
    background-position: left 10px center;
  }
`

export const InfoButton = styled(Button)`
  &:after {
    background-size: 25px;
  }
`

export const StartButton = styled.div`
  width: 344px;
  height: 102px;
  border-radius: 51px;
  background: url('images/game-start-button.png') center no-repeat;
  background-size: contain;
  cursor: pointer;

  font: 900 54px Overpass;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  text-transform: uppercase;
`

export const TotalPoolLabel = styled.div`
  color: rgb(180,180,180);
  font: 500 32px Overpass;
  text-transform: uppercase;
  text-align: center;
  margin: 20px 0;
`

export const GameListWrapper = styled.div`
  width: 710px;
  margin: 0 auto;

  overflow: hidden;
  position: relative;


  .scrollable-wrapper{
    width: 103%;
    overflow-y: scroll;
    // height: ${({showLastGame}) => showLastGame ? '681px;' : '1138px'};
    max-height: ${({showLastGame}) => showLastGame ? '681px;' : '1138px'};
    
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`

export const DecoratedLink = styled(Link)`
    text-decoration: none;
`

export const GradientPanel = styled.div`
  display: block;
  box-sizing: border-box;
  background: linear-gradient(to bottom, rgb(72,72,75), rgb(35,35,35));
  box-shadow: 0 -2px 0 rgb(147,147,147);
`

export const GameCategoryWrapper = styled(GradientPanel)`
  padding: 18px;
  width: 345px;
  height: 335px;
  border-radius: 6px;
  margin-top: 15px;
  cursor: pointer;
  &:nth-child(1), &:nth-child(2) {
    margin-top: 0;
  }
`

export const GameTitle = styled(Text)`
  max-width: calc(345px - 18px - 18px);
  max-height: 100%;
  overflow: hidden;
  margin-top: 10px;
  word-wrap: break-word;
  white-space: normal;
`

export const InfoAboutWinningsComponent = styled.div`
  display: ${({hasWinningComponents}) => hasWinningComponents ? 'block' : 'none'};
  font: 500 26px Overpass;
  color: rgb(31,242,255);
  margin-top: 30px;
  position: relative;
`

export const TextBlock = styled.div`
    box-sizing: border-box;
    height: 100%;
    background-color: #f0f0f0;
    border-top-left-radius: 10px;
    overflow: auto;
    font: 500 36px Arial;
    
    padding: 25px 20px;
`
