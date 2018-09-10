import React, {Fragment} from 'react'
import styled from "styled-components";
import e from '../../../../langs'

const Button = styled.div`
	width: 206px;
	height: 96px;
	border-radius: 10px;
	background-image: linear-gradient(to top, #2a272a, #48484b);
	box-shadow: 0 -2px 0 rgb(148,148,148), 0 0 0 5px rgb(28,28,28);
	position: relative;
	margin: 18px 17px 10px 17px;
	cursor: pointer;
	&:before {
		content: '';
		width: 80px;
		height: 80px;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		background: url(${ ({source = {}, active}) => active ? source.active : source.nonActive }) center no-repeat;
	}

	&:active {
		box-shadow: 0 0 0 2px rgb(28,28,28);
		transform: translate(0, 2px);
	}
`

const InfoButtonStyled = styled(Button)`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  &:before {
    top: 46%;
    background-image: url(${({imgSrc}) => imgSrc});
  }
`

export default class InfoButton extends React.Component {
    constructor(props) {
        super(props);
        e.setLanguage(props.language);
    }

    render() {
        return (
            <Fragment>
                <InfoButtonStyled
                    style={this.props.style}
                    onClick={this.props.toggleInfoPanel}
                    imgSrc='images/friends-info.png'
                />
            </Fragment>
        )
    }
}
