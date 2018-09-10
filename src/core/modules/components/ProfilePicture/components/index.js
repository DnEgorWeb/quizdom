import React                  from 'react'
import styled                 from 'styled-components'
// import { getUserVoucherList } from "../../../../pages/voucher/duck";

const Wrapper = styled.div`
	width: ${p => p.size}px;
	height: ${p => p.size}px;
	//background: aqua;
	border: 2px solid black;
	border-radius: 50%;
	position: relative;
	
	.left-container, .right-container {
	  background: rgb(94,94,94);
	  height: 100%;
	  width: 50%;
	  display: inline-block;
	  position: relative;
	  //overflow: hidden;
	  & > div {
	    height: 100%;
	    width: 100%;
	    position: absolute;
	    top: 0;
	    background: rgb(255,230,0);
	    transform: rotate(-180deg);
	  }
	}
	
	.left-container {
	  border-top-left-radius: ${p => p.size / 2}px;
	  border-bottom-left-radius: ${p => p.size / 2}px;
	  & > div {
	    left: 0;
	    border-top-left-radius: ${p => p.size / 2}px;
	    border-bottom-left-radius: ${p => p.size / 2}px;
	    transform-origin: right center;
	  }
	}
	
	.right-container {
	  border-top-right-radius: ${p => p.size / 2}px;
	  border-bottom-right-radius: ${p => p.size / 2}px;
	  & > div {
	    left: 0;
	    border-top-right-radius: ${p => p.size / 2}px;
	    border-bottom-right-radius: ${p => p.size / 2}px;
	    transform-origin: left center;
	  }
	}

    .level-value {
        position: absolute;
        left: 50%;
        bottom: 2%;
        transform: translate(-50%, 0);
        color: white;
        font-size: ${p => p.size * 0.15}px;
    }
	
	.images-container {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		background: url("images/profile-picture.png") center / 100% no-repeat,
							url("images/circle.png") center / 100% no-repeat, 
							url("images/glass.png") center / 100% no-repeat;
	}
`

const Avatar = styled.div`
	position: absolute;
	z-index: 100;
	width: 57%;
	height: 57%;
	border-radius: 50%;
	background: url(${props => props.pictureUrl}) center no-repeat;
	background-size: cover;
	left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`

const CIRCLE = 360;
const HALF_CIRCLE = CIRCLE / 2;
const ONE_HUNDRED_percent = 100;
const DEFAULT_ORIGIN = 68;

export default class ProfilePicture extends React.Component {
	constructor(props) {
		super(props);
		this.origin = props.origin || DEFAULT_ORIGIN;
		this.fullDegrees = CIRCLE - (2 * this.origin);
		this.level = props.level > ONE_HUNDRED_percent ? ONE_HUNDRED_percent : props.level;
		this.state = {
			deg: (this.fullDegrees * this.level / ONE_HUNDRED_percent) || 0
		}
		this.getStyle = this.getStyle.bind(this);
	}

	componentWillReceiveProps(props) {
		this.setState({deg: props.deg || this.state.deg || 0})
	}

	componentDidMount() {
        const canvas   = this.avatar;
        const { size } = this.props;
        const ctx      = canvas ? canvas.getContext('2d') : null;

        canvas.width  = size;
        canvas.height = size;

	    if(ctx) this.drowAvatar(ctx);
    }
    
    /**
     * avatar drawing
     *
     * @param ctx is canvas context 2d
     */
    drowAvatar = () => {
        const canvas     = this.avatar;
        const { size }   = this.props;
        const ctx        = canvas ? canvas.getContext('2d') : null;
        const radius     = size / 2;
        const crd        = { x : (size / 2), y : (size / 2) };
        const image      = new Image(size, size);
        const blackColor = '#000';
        const greyColor = '#5E5E5E';
        const yellColor = '#FFE600';
        const userLevel = this.props.level;
        const persent   = 4 * (parseFloat(userLevel) / 100);
        
        image.onload  = drow;
        image.src     = 'images/profile-picture.png';

        const index  = 2.7;
        const rate = index + persent;

        function drow() {
            ctx.clearRect(0,0,size,size);
            ctx.beginPath();
            ctx.arc(crd.x, crd.y, radius, 0, Math.PI * 2);
            ctx.fillStyle = blackColor;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(crd.x, crd.y, radius - (radius / 5), 0, Math.PI * 2);
            ctx.fillStyle = greyColor;
            ctx.fill();
            
            ctx.beginPath();
            ctx.lineWidth = 15;
            ctx.strokeStyle = yellColor;
            ctx.arc(crd.x, crd.y, radius - (radius / 4), 2.7, rate);
            ctx.stroke();
            ctx.drawImage(image, 0, 0, size, size);
        }
    }

	getStyle(deg) {
		return {
			transform: 'rotate(' + deg + 'deg)'
		}
	}

	getLeftHalfCircleStyle = () => {
		const getStyle = this.getStyle;
		const {deg} = this.state;
		const leftOrigin = -HALF_CIRCLE + this.origin;
		const leftMax = HALF_CIRCLE - this.origin;
		const leftStyle = deg >= leftMax ? getStyle(leftOrigin + leftMax) : getStyle(leftOrigin + deg);
		return leftStyle;
	}

	/*getRightHalfCircleStyle = () => {
		const getStyle = this.getStyle;
		const {deg} = this.state;
		const leftMax = HALF_CIRCLE - this.origin;
		const rightOrigin = -HALF_CIRCLE;
		const rightMax = HALF_CIRCLE - this.origin;
		const rightStyle = (deg > leftMax && (deg - leftMax) >= rightMax) ? getStyle(rightOrigin + rightMax) :
			(deg > leftMax) ? getStyle(rightOrigin + (deg - leftMax)) :
				getStyle(rightOrigin);
		return rightStyle;
	}*/

	/*getDecoratedLevel = () => {
		const {deg} = this.state;
		const decoratedLevel = (deg / this.fullDegrees * ONE_HUNDRED_percent).toFixed(1).toString().replace('.', ',');
		return decoratedLevel;
	}*/

	render() {
		const {size} = this.props;
		const pictureUrl = this.props.imgSrc || this.props.pictureUrl;
		// const leftStyle = this.getLeftHalfCircleStyle();
		// const rightStyle = this.getRightHalfCircleStyle();

        return (
            <Wrapper size={size}>
                <canvas ref={(avatar) => this.avatar = avatar } />
                <Avatar pictureUrl={pictureUrl} />
                <div className='level-value'>{this.props.level}</div>
            </Wrapper>
		)
	}
}
