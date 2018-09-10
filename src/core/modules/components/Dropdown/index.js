import React from 'react'
import styled, { css } from 'styled-components'

const ItemMixin = css`


    display: flex;
    justify-content: space-between;
    cursor: pointer;
    align-items: center;
    padding: 10px;
    height: 60px;

    transition: all .3s ease;

    &:first-child{
        margin-top: 0;
    }

    &:hover{
        background: rgba(0, 0, 0, .1);
    }

    div{
        display: flex;
        width: 45px;
        margin-right: 13px;

        img {
            display: block;
            margin:auto;
            height:auto;
            max-width: 45px;
        }
    }

    .--mini &{
        padding: 4px;
        height: 45px;
    }
`


const Selector = styled.div`
    box-sizing: border-box;
    width: 642px;
    height: 70px;
    border-radius: 16px;
    background-color: #ffffff;
    border: solid 2px #818181;
    font-size: 40px;
    font-family: Calibri;
    color: #333333;
    padding: 0 30px;
    display: inline-block;
    vertical-align: middle;
    outline: none !important;
    user-select: none;
    position: relative;
`

const List = styled.ul`
    background-color: #fff;
    border-radius: 15px;

    overflow-y: scroll;
    padding: 0;
    margin: 0;

    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;

    opacity: 0;
    visibility: hidden;
    max-height: 0;

    transition: all .3s ease;

    .--opened &{
        opacity: 1;
        visibility: visible;
        max-height: 470px;
    }
`

const ItemContent = ({img, text}) => [
    <span key={2}>{text}</span>,
]

const Label = styled(props => <div {...props}><ItemContent {...props} /><span className={`flag flag-${props.value.toLowerCase()}`}/></div>)`
    overflow: hidden;
    position: relative;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    white-space: nowrap;
`

const Option = styled(props => <li {...props}><ItemContent {...props}/><span className={`flag flag-${props.value.toLowerCase()}`}/></li>)`
    ${ItemMixin}
    span{
        white-space: nowrap;
        overflow: hidden;
    }
    span{
        ${'' /* width:100px;
        height: 100px; */}
    }
    &.--active{
        background: rgba(0, 0, 0, .1);
    }
`


class Dropdown extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            opened: props.opened || false,
            value: props.value ? props.value : (props.values ? props.values[0] : null),
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({value: nextProps.value})
        typeof opened !== 'undefined' && this.setState({opened: nextProps.opened})
        if(nextProps.value && (nextProps.value.value !== this.state.value.value)){
            this.setState({value: nextProps.value})
        }
    }

    toggleList = () => {
        const opened = this.props.values && !this.state.opened

        this.callback(opened)
    }

    closeList = () => {
        this.callback(false)
    }

    selectHandler = (item) => {
        typeof this.props.onSelect === 'function' && this.props.onSelect(item)

        this.setState({
            opened: false,
            value: item,
        })

        this.props.onChange(item.value)
    }

    callback = (opened) => {
        this.setState({opened})
        const onToggle = this.props.onToggle
        typeof onToggle === 'function' && onToggle(opened)
    }

    render() {
        const {values, className, ...props} = this.props
        const value = this.state.value || this.props.value
        return (
            <Selector
                {...props}
                tabIndex={-1}
                onBlur={this.closeList}
                onClick={this.toggleList}
                className={
                    (className ? className : '') +
                    (this.state.opened ? ' --opened' : '')
                }
            >
                <Label {...value} lang={this.props.lang} />
                <List>
                    {values && values.map(item => (
                        (item.text === 'Antarctica') ?
                            null
                            :
                            <Option
                                key={item.text}
                                onClick={this.selectHandler.bind(this, item)}
                                className={value.value === item.value ? '--active' : ''}
                                lang={this.props.lang}
                                {...item}
                            />
                    ))}
                </List>
            </Selector>
        )
    }
}

export default Dropdown
