import React from 'react'

import {
    InfoPanelWrapper,
    InfoPanelContainer,
    CloseButtonPanel,
    Cross,
    Content,
    Title,
    Body,
    TextBlock,
    AcceptButtonBlock,
    AcceptButton,
} from '../../../../../../../../modules/components/InfoPanelComponents/styledComponents'

export default class InfoPanel extends React.Component {

    state = {
        isOpen: false
    }

    componentWillReceiveProps(props) {
        this.setState({isOpen: props.isOpen})
    }

    closeInfoPanel = () => {
        const {onCloseHandler} = this.props;
        typeof onCloseHandler === 'function' && onCloseHandler();
    }

    onCloseCalback = () => {
        const {isOpen} = this.state;
        const {onCloseCallback} = this.props;
        if (!isOpen) {
            typeof onCloseCallback === 'function' && onCloseCallback();
        }
    }

    acceptButtonClickHandler = () => {
        if (typeof this.props.onOkButtonClick === 'function') {
            this.props.onOkButtonClick();
            this.closeInfoPanel();
        } else {
            this.closeInfoPanel();
        }
    }

    render() {
        const {isOpen} = this.state;
        const {component, title, children, titleStyle, noTitlePicture, noInfoBlock, imgSrc} = this.props;
        return (
            <InfoPanelWrapper
                onTransitionEnd={this.onCloseCalback}
                className={isOpen ? 'open' : 'close'}
            >
                <InfoPanelContainer
                    className={isOpen ? 'open' : 'close'}
                >
                    <CloseButtonPanel
                        onClick={this.closeInfoPanel}
                    >
                        <Cross />
                    </CloseButtonPanel>
                    <Content>
                        <Title
                            style={titleStyle}
                            noTitlePicture={noTitlePicture}
                            imgSrc={imgSrc}
                        >
                            {title}
                        </Title>
                        <Body>
                            {
                                noInfoBlock ?
                                    component || children
                                    :
                                    <TextBlock>
                                        {component || children}
                                    </TextBlock>
                            }
                        </Body>
                        <AcceptButtonBlock>
                            <AcceptButton
                                onClick={this.acceptButtonClickHandler}
                            />
                        </AcceptButtonBlock>
                    </Content>
                </InfoPanelContainer>
            </InfoPanelWrapper>
        )
    }
}