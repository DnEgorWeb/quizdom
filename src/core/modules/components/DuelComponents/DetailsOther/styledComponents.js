import styled from "styled-components";

export const ExtraPoints = styled.div`
  width: 735px;
  height: 61px;
  padding: 0 7px 0 0;
  position: relative;
  font: 500 40px Univers-condensed;
  color: white;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-sizing: border-box;
  .points {
    background-color: #1ff2ff;
    color: black;
    width: 120px;
    height: 61px;
    border-radius: 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  &:last-child {
    margin-bottom: 190px;
  }
`
export const ExtraPointsTitle = styled.div`
  display: inline-block;
  margin-right: 35px;
`