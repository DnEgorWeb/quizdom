import React from 'react'
import styled from 'styled-components'
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
} from '../../../components/SubMenu/subMenuComponents'

const InfoTitle = styled(Title)`
	color: white;
`

const InfoNextButton = styled(NextButton)`
	&:before {
		background: url('images/detail-info-next.png') center no-repeat;
	}
    img{
        height: 50%;
    }
`

export default class InfoMenu extends React.Component {

    state = {
        currentText: null
    }

	render() {
		return (
			<SubMenuWrapper onTransitionEnd={() => !this.props.isOpened} className={this.props.isOpened ? 'open' : 'close'}>
				<SubMenuContainer className={this.props.isOpened ? 'open' : 'close'}>
					<SubMenuToggleButton onClick={this.props.close}>
						<SubMenuCross />
					</SubMenuToggleButton>
					<SubMenuContent>
						<InfoTitle>{this.props.title}</InfoTitle>
						<InfoBlock>
							{this.props.text}
						</InfoBlock>
						<NextButtonBlock>
							<InfoNextButton onClick={this.props.close}>
                                <img src='images/02_back_256.png' alt='' />
                            </InfoNextButton>
						</NextButtonBlock>
					</SubMenuContent>
				</SubMenuContainer>
			</SubMenuWrapper>
		)
	}
}
