import styled from 'styled-components'

export const imageUrls = {
    answer: 'images/details-answer.png',
    time: 'images/details-time.png',
    bonus: 'images/details-bonus.png',
    pointsAndLevels: 'images/details-points-levels.png',
}

export const InformationList = styled.div`
  margin: 0 20px 0;
  padding-bottom: 18px;
  position: relative;
  box-sizing: border-box;
  width: 670px;
  & > div {
    margin-top: 2px;
  }
  & > div:first-child {
    margin-top: 0;
  }
  & > div:nth-child(even) {
    background-color: #5d5c5c;
  }
  & > div:nth-child(odd) {
    background-color: #535252;
  }
  &:after {
    content: '';
    background-image: linear-gradient(to bottom, rgb(29,25,26), rgb(79,79,80));
    position: absolute;
    bottom: 0;
    height: 4px;
    width: 100%;
  }
`
export const InformationItem = styled.div`
    height: 78px;
    font: 500 32px Overpass;
    color: white;
    padding-left: 92px;
    background-position: 12px center;
    background-repeat: no-repeat;
    border-top: 2px solid rgba(255,255,255,.4);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    position: relative;
    span.value {
      color: #1ff2ff;
      position: absolute;
      right: 23px;
      top: 50%;
      transform: translate(0, -50%);
      display: inline-block;
    }
    span.white {
      color: white;
    }
`
export const RightAnswersItem = styled(InformationItem)`
  background-image: url(${imageUrls['answer']});
`
export const AnswersTimeItem = styled(InformationItem)`
  background-image: url(${imageUrls['time']});
`
export const BonusPointsItem = styled(InformationItem)`
  background-image: url(${imageUrls['bonus']});
`
