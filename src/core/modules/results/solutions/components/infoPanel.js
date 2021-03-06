import React from 'react'
import styled from 'styled-components'

const SubMenuWrapper = styled.div`
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

const SubMenuContainer = styled.div`
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

const SubMenuToggleButton = styled.div`
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

const SubMenuCross = styled.div`
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

const SubMenuContent = styled.div`
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
	
	padding: 65px 0 0 35px;
`

const Title = styled.div`
	width: calc(100% + 5px);
	height: 77px;
	border-radius: 10px;
	background-color: #343434;
	border: solid 2px #5a5a5a;
	
	font-family: Overpass, sans-serif;
	font-size: 38px;
	color: white;
	padding: 25px;
    box-sizing: border-box;
    line-height: 1;
    
    margin-bottom: 40px;
    position: relative;
    
    &:after {
    	content: '';
    	width: 130px;
    	height: 130px;
		background: url(${({infoNumber}) => `images/info-panel-${infoNumber + 1}.png`}) center no-repeat;
		background-size: contain;
		position: absolute;
		right: 83px;
		top: 50%;
		transform: translate(0, -50%);	
    }
`

const InfoBlock = styled.div`
	height: 989px;
	border-top-left-radius: 10px;
	overflow: auto;
	width: calc(100% + 18px);
`

export default class SubMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            isOpen: false
		}
	}

	componentWillReceiveProps(props) {
		this.setState({isOpen: props.isOpen})
	}

	closeSubMenu = () => {
		this.props.onCloseHandler();
	}

	onCloseCalback = () => {
        const {isOpen} = this.state;
        if (!isOpen) {
            typeof this.props.onCloseCallback === 'function' && this.props.onCloseCallback();
		}
	}

	render() {
		const {isOpen} = this.state;
		const {component, title, infoNumber = 0} = this.props;
		return (
			<SubMenuWrapper onTransitionEnd={this.onCloseCalback} className={isOpen ? 'open' : 'close'}>
				<SubMenuContainer className={isOpen ? 'open' : 'close'}>
					<SubMenuToggleButton onClick={this.closeSubMenu}>
						<SubMenuCross />
					</SubMenuToggleButton>
					<SubMenuContent>
						<Title infoNumber={infoNumber}>{title}</Title>
						<InfoBlock>
							{component}
						</InfoBlock>
					</SubMenuContent>
				</SubMenuContainer>
			</SubMenuWrapper>
		)
	}
}
