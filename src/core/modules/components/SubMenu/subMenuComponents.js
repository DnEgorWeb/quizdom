import styled from 'styled-components'

export const SubMenuWrapper = styled.div`
	position: fixed;
	z-index: 101;
	top: 0;
	left: 0;

	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,.5);

	&.close {
		width: 0;
	}
`

export const SubMenuContainer = styled.div`
	position: fixed;
	z-index: 101;
	top: 0;
	right: 0;
	font-family: Univers-condensed;

	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,0);
	overflow: hidden;

	transition: all .5s;

	&.close {
		width: 0;
	}
`

export const SubMenuToggleButton = styled.div`
	width: 120px;
	height: 130px;
	background-color: rgb(65,65,65);
	border-bottom-left-radius: 10px;
	border-top-left-radius: 10px;

	position: absolute;
	top: 40px;
	left: 21px;

	display: flex;
	justify-content: center;
	align-items: center;

	box-shadow: -2px -2px 0 rgb(112,112,112);
    z-index: 1;
`

export const SubMenuCross = styled.div`
	cursor: pointer;
	width: 76px;
	height: 76px;
	background-color: rgb(35,35,35);
	border-radius: 50%;
	border: 4px solid rgb(70, 68,69);
	&::before, &::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 48px;
		height: 8px;
		background-color: #ececec;
		border-radius: 5px;
		transform-origin: 50%;
	}
	&::before {
		transform: translate(-50%, -50%) rotate(-45deg);
	}
	&::after {
		transform: translate(-50%, -50%) rotate(45deg);
	}
`

export const SubMenuContent = styled.div`
    box-sizing: border-box;
	transition: all 2s;
	position: absolute;
	top: 0;
	left: 140px;
	width: 610px;
	height: 100%;
	background-color:  rgb(65,65,65);
	min-width: 610px;
	box-shadow: -2px -2px 0 rgb(112,112,112);
	
	padding: 65px 0 0 20px;
`

export const Title = styled.div`
	height: 77px;
	border-radius: 10px;
	background-color: #343434;
	border: solid 2px #5a5a5a;
	
	font-family: Overpass, sans-serif;
	font-size: 38px;
	color: #ff7f00;
	padding: 25px;
    box-sizing: border-box;
    line-height: 1;
    
    margin-bottom: 69px;
    display: flex;
    align-items: center;
`

export const InfoBlock = styled.div`
	width: 589px;
	height: 902px;
	background-color: #f0f0f0;
	border-top-left-radius: 10px;
	overflow: auto;
	font-size: 42px;
	padding: 25px 20px;
`

export const NextButtonBlock = styled.div`
	width: 600px;
	height: 170px;
	background-color: #343434;
	box-shadow: 0 -2px 0 rgb(154,154,154);
	display: flex;
	justify-content: center;
	align-items: center;
	
	position: absolute;
	bottom: 0;
	left: 0;
`

export const NextButton = styled.button`
	margin: 0 auto;
	width: 338px;
	height: 96px;
	border: none;
	border-radius: 46px;
	background-image: linear-gradient(to top, #2a272a, #48484b);
	box-shadow: 0 -2px 0 rgb(148,148,148), 0 0 1px 4px rgb(28,28,28) ;
	cursor: pointer;
	position: relative;
	&:active {
		box-shadow: 0 0 0 2px rgb(28,28,28);
		background-image: linear-gradient(to bottom, #2a272a, #48484b);
		&:before {
			transform: translate(-50%, -50%) translate(0, 2px);
		}
	}
	&:focus {
		outline: none;
	}
	&:before {
		content: '';
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 30px;
		height: 46px;
		background: url('images/next-button.png') center no-repeat;
	}
`
