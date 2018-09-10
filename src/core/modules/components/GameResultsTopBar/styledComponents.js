import styled from "styled-components";

export const Wrapper = styled.div`
  box-sizing: border-box;
  width: 710px;
  background: linear-gradient(to bottom, #474747, #2a2a2a);
  margin-left: auto;
  margin-right: auto;
  height: 100px;
  border-radius: 15px;
  color: white;
  font-size: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 3px solid #939393;
  margin-top: 5px;
  padding: 0 20px;
  font-family: Overpass, sans-serif;
  
  .top-bar-title {
  	width: ${({  whithOutImages }) => whithOutImages ? '100%' : 'auto'};
  	font-family: Corbel,serif;
	font-weight: bold;
	font-size: 37px;
	text-align: center;
  }
`

export const TopBarButtons = styled.img`
  display: ${({ src }) => src ? 'block' : 'none'};
  width: 75px;
  height: 75px;
  border-radius: 100%;
  border: 4px solid #4b4749;
  background-color: #232323;
  cursor: pointer;
`