import styled from 'styled-components'

export const WrapperResults = styled.div`
  width: 750px;
  height: 100%;
  background-color:#232324;
  padding-top: 20px;
  margin-top: -30px;
  font-family: Overpass;
`

export const Statistics = styled.div`
  height:265px;
  position:relative;
`

export const UserBlock = styled.div`
  position:absolute;
  font-size: 30px;
  color: #b4b4b4;
  left: 50%;
  top: -30px;
  transform: translate(-50%,0);
  letter-spacing: 1.5px;
  text-align: center;
  div {
    margin: 0 auto;
  }
  p {
    margin-top: 10px;
    margin-bottom: 0;
  }
`

export const ScoreTable = styled.div`
  box-sizing: border-box;
  border-top: 3px solid #939393;
  margin-top: 50px;
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  height:265px;
  width: 710px;
  background-color:#444447;
  margin-left: auto;
  margin-right: auto;
  background: linear-gradient(to bottom, #48484b, #232324);
  border-radius: 15px;
`

export const Values = styled.div`
    text-shadow: 1px -5px black;
    font-weight: 900;
    display:flex;
    font-size: 70px;
    color: white;
    justify-content: space-between;
    margin-left: 95px;
    margin-right: 95px;
`

export const Properties = styled.div`
  width: 650px;
  height: 70px;
  background-color:#232323;
  color: #1ff2ff;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 30px;
  border-radius: 15px;
  letter-spacing: 1px;
  border-top: 2px solid #111111;
  border-bottom: 2px solid #6f6f6f;
  span {
    margin-left: 30px;
    margin-right: 60px;
  }
`

export const BonusPoints = styled.div`
  box-sizing: border-box;
  padding: 0 13px;
  border-top: 3px solid #939393;
  margin-top: 50px;
  width: 520px;
  height: 120px;
  border-radius: 15px;
  margin-left: auto;
  margin-right: auto;
  background: linear-gradient(to bottom, #48484b, #232324);
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 40px;
  img {
    width: 80px;
    height: 80px;
  }
`

export const Amount = styled.div`
  box-sizing: border-box;
  width: 300px;
  height: 72px;
  border-radius: 15px;
  color: #1ff2ff;
  background-color:#232324;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  border-top: 2px solid #111111;
  border-bottom: 2px solid #6f6f6f;
`

export const ReplayButton = styled.div`
  cursor: pointer;
  width: 105px;
`

export const Footer = styled.div`
  text-shadow: 1px -5px black;
  font-weight: 900;
  border-top: 3px solid #939393;
  box-sizing: border-box;
  margin-top: 50px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  width:710px;
  height: calc(100% - 1110px);
  background: linear-gradient(to bottom, #474747, #2a2a2a);
  margin-left: auto;
  margin-right: auto;
  padding-top: 30px;
  color: #1ff2ff;
  span {
    display: inline-block;
    width: 236px;
    font-size: 35px;
    text-align:center;
    cursor: pointer;
  }
  span:nth-child(2) {
    font-size: 40px;
  }
`

export const RematchButton = styled.div`
  width: 344px;
  height: 102px;
  border-radius: 51px;
  background: url('images/game-start-button.png') center no-repeat;
  background-size: contain;
  cursor: pointer;
  margin-left: 63px;

  font: 900 54px Overpass;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  text-transform: uppercase;
`

export const ButtonBlock = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: 50px;
`
