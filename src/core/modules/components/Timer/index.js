import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
	width: ${p => p.size}px;
	height: ${p => p.size}px;
	border-radius: 50%;
	position: relative;

	canvas {
		position: absolute;
		width: 200%;
		height: 100%;
		transform: translate(-78px, 17px) rotate(137deg);
	}

	.images-container {
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 2;
		left: 0;
		top: 0;
		background: url("images/time.png") center no-repeat,
							url("images/time-shadow.png") center no-repeat;
		background-size: contain;
		.current-time{
			position: absolute;
			left: 48%;
			top: 51%;
			transform: translate(-50%, -50%);
			font: 900 60px Univers-condensed;
			color: #dadada;
		}
	}
`

const CurrentTimeWrapper = styled.div`
	background: ${(props) => props.color};
	width: 90px;
	height: 90px;
	border-radius: 50%;
	left: 50%;
	top: 54%;
	transform: translate(-50%,-50%);
	position: relative;

	img{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		width: 60px;
	}
`

const BottomBar = styled.div`
	position: absolute;
	bottom: 12px;
	left: 24px;
	height: 14px;
	width: 121px;
	background: blueviolet;
	z-index: 1;
    &:before {
    	content: '';
    	position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: ${({level}) => (100 * level / 3) + '%'};
		background: ${(props) => props.color};
    }
`

const TopGlass = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: url("images/time-glass.png") center no-repeat;
	background-size: contain;
	z-index: 3;
`

const CIRCLE = 360;
// const HALF_CIRCLE = CIRCLE / 2;
const DEFAULT_ORIGIN = 35.8;

export default class Timer extends React.Component {

	constructor(props) {
		super(props);
        this.ONE_HUNDRED_percent = 0;
		this.origin = props.origin || DEFAULT_ORIGIN
		this.fullDegrees = CIRCLE - (2 * this.origin)
		this.level = props.currentTime > this.ONE_HUNDRED_percent ? this.ONE_HUNDRED_percent : props.currentTime

	}

	state = {
		deg: (this.fullDegrees * this.props.currentTime / this.ONE_HUNDRED_percent) || 0,
		bottomLevel: 3
	}

	componentWillReceiveProps(props) {
		if (!this.ONE_HUNDRED_percent && props.currentTime) {
            this.ONE_HUNDRED_percent = props.currentTime
		}
		this.setState({deg: ((this.fullDegrees * props.currentTime) / this.ONE_HUNDRED_percent) || 0,});
	}

	drowTimeLine() {
		const h             = this.canvas && this.canvas.clientHeight;
		const w             = this.canvas && this.canvas.clientWidth;
		const r             = 50;
		const { countdown } = this.props;
		const s             = (countdown - this.props.currentTime) * (5 / countdown) || 0;

		this.ctx = this.ctx || this.canvas.getContext('2d');
		this.ctx.clearRect(0,0,w,h);
		this.ctx.beginPath();
		this.ctx.strokeStyle = this.getCircleColor();
		this.ctx.lineWidth = 20;
		this.ctx.arc(
			((w/2)-(r/2)),  // ширина
			h/2,            // высота
			r,              // радиус
			0,              // начальная точка (угол)
			s,              // конечная точка (угол)
			false           // против часовой
		);
		this.ctx.stroke();
	}

	getIndicatorColor(){
		const status = this.props.status
		switch(status){
			case 'end_time':
				return 'linear-gradient(to bottom, rgb(227,6,19), rgb(66,1,5))'
			case 'normal_time':
				return 'linear-gradient(to bottom, rgb(54,165,0), rgb(19,46,6))'
			default:
				return 'linear-gradient(to top,rgb(8,52,52),rgb(31,238,251))'
		}
	}

	getCircleColor() {
        const status = this.props.status
        switch(status){
            case 'end_time': return '#1ff2ff';
            case 'normal_time': return '#1ff2ff';
            default: return 'rgb(8,52,52)';
        }
	}

	getTimerContent = () => {
		const status = this.props.status
        switch(status){
            case 'loading':
            	if (!this.props.advertisement) return null
                return <img src='images/14_load_256.png' alt=''/>
            case 'advertisement':
                return <img src='images/AD_101_Between_Question.png' alt=''/>
            default:
                return <div className='current-time' >{this.props.currentTime}</div>
        }
	}

	render() {
		const {size} = this.props;
		const {bottomLevel} = this.state;
		const indicatorColor = this.getIndicatorColor();

		this.canvas && this.drowTimeLine();

		return (
			<Wrapper size={size} color={this.getCircleColor()}>
				<canvas ref={(canvas) => this.canvas = canvas} />
				<div  className="images-container">
					<CurrentTimeWrapper color={indicatorColor} className = 'current-time-wrapper'>
						{this.getTimerContent()}
					</CurrentTimeWrapper>
				</div>
				<BottomBar color={indicatorColor} level={bottomLevel} />
				<TopGlass />
			</Wrapper>
		)
	}
}
