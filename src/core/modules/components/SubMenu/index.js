import React from 'react'
import {
	SubMenuWrapper,
	SubMenuContainer,
	SubMenuToggleButton,
	SubMenuCross,
	SubMenuContent,
    Title,
    InfoBlock,
    NextButtonBlock,
    NextButton,
} from './subMenuComponents'

export default class SubMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentIndex: props.currentIndex
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({currentIndex: nextProps.currentIndex})
	}

	closeSubMenu = () => {
		this.setState({currentIndex: null})
	}

	selectNextPicture = () => {
		let {currentIndex} = this.state;
		currentIndex++;
		const {componentList} = this.props;
		if (currentIndex >= componentList.length) {
			currentIndex = 0;
		}
		// this.setState({currentIndex})
		if (componentList[currentIndex].props) {
            this.props.selectPicture(componentList[currentIndex].props.picture, currentIndex)
        }
	}

	render() {
		const {currentIndex} = this.state;
		const {componentList, title} = this.props;
		const isOpened = currentIndex !== null;
		let currentComponent = componentList && componentList[currentIndex];

		if (!currentComponent) {
            currentComponent = componentList[0]
		}

		return (
			<SubMenuWrapper className={isOpened ? 'open' : 'close'}>
				<SubMenuContainer className={isOpened ? 'open' : 'close'}>
					<SubMenuToggleButton onClick={this.closeSubMenu}>
						<SubMenuCross />
					</SubMenuToggleButton>
					<SubMenuContent>
						<Title>{title}</Title>
						<InfoBlock>
							{currentComponent}
						</InfoBlock>
						<NextButtonBlock>
							<NextButton onClick={this.selectNextPicture} />
						</NextButtonBlock>
					</SubMenuContent>
				</SubMenuContainer>
			</SubMenuWrapper>
		)
	}
}