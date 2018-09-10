import React, {Component} from 'react'
import styled from 'styled-components'

const Label = styled.label`
    font: normal 14px Roboto;

    display: inline-block;
    margin: 15px 15px 15px 0;
    vertical-align: middle;
    
    user-select: none;
    cursor: pointer;
    
    & > div {        
        position: relative;
        width: 54px;
		height: 54px;
		border-radius: 10px;
		background-color: #ececec;
		border: solid 2px #a0a0a0;
                
        &::after{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate3d(-50%, -50%, 0);
            width: 42px;
            height: 42px;
    
            display: flex;
            justify-content: center;
            align-items: center;
            
            content: '';
            background: url("images/checkbox-tick.png") center no-repeat;
            opacity: 0;
            color: white;            
            border-radius: 50%;
            
            transition: all .1s ease;
        }
    }
    
    [type="checkbox"], [type="radio"]{
        display: none;
    
        &:checked + div::after {
            opacity: 1;
        }
    }
    
`

class Checkbox extends Component {
	static defaultProps = {
		type: 'checkbox',
		checked: false,
	}

	constructor(props) {
		super(props)
		this.state = {
			checked: this.props.checked,
		}
	}

	componentWillReceiveProps(props) {
		this.setState({
			checked: props.checked
		})
	}

	onClickHandle = (e) => {
		const checked = e.target.checked
		typeof this.props.onChange === 'function' && this.props.onChange(e)
		this.setState({checked})
	}

	render() {
		const {type, name, id, style} = this.props
		return (
			<Label style={style}>
				<input onChange={this.onClickHandle} type={type} name={name} id={id} checked={this.state.checked} />
				<div />
			</Label>
		)
	}
}

export default Checkbox
