import React from 'react';
import e from '../../../../langs'
import createReactClass from 'create-react-class';

const DefaultDecorators = [
    {
        component: createReactClass({
            render() {
                return (
                    <button
                        style={this.getButtonStyles(this.props.currentSlide === 0 && !this.props.wrapAround)}
                        onClick={this.handleClick}>{e.tombola_prev}</button>
                )
            },
            handleClick(e) {
                e.preventDefault();
                this.props.previousSlide();
            },
            getButtonStyles(disabled) {
                return {
                    border: 0,
                    background: 'rgba(0,0,0,0.4)',
                    color: 'white',
                    padding: 10,
                    outline: 0,
                    opacity: disabled ? 0.3 : 1,
                    cursor: 'pointer'
                }
            }
        }),
        position: 'CenterLeft'
    },
    {
        component: createReactClass({
            render() {
                return (
                    <button
                        style={this.getButtonStyles(this.props.currentSlide + this.props.slidesToScroll >= this.props.slideCount && !this.props.wrapAround)}
                        onClick={this.handleClick}>{e.tombola_next}</button>
                )
            },
            handleClick(e) {
                e.preventDefault();
                this.props.nextSlide();
            },
            getButtonStyles(disabled) {
                return {
                    border: 0,
                    background: 'rgba(0,0,0,0.4)',
                    color: 'white',
                    padding: 10,
                    outline: 0,
                    opacity: disabled ? 0.3 : 1,
                    cursor: 'pointer'
                }
            }
        }),
        position: 'CenterRight'
    },
    {
        component: createReactClass({
            render() {
                var self = this;
                var indexes = this.getIndexes(self.props.slideCount, self.props.slidesToScroll);
                return (
                    <div style={{backgroundColor: '#343435', width: '100%', display: 'flex', alignItems: 'center'}}>
                        <ul style={self.getListStyles()}>
                            {
                                indexes.map(function(index) {
                                    return (
                                        <li style={self.getListItemStyles()} key={index}>
                                            <button
                                                style={self.getButtonStyles(self.props.currentSlide === index)}
                                                onClick={self.props.goToSlide.bind(null, index)}>
                                                &bull;
                                            </button>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                )
            },
            getIndexes(count, inc) {
                var arr = [];
                for (var i = 0; i < count; i += inc) {
                    arr.push(i);
                }
                return arr;
            },
            getListStyles() {
                return {
                    position: 'relative',
                    top: 0,
                    padding: 0,
                    backgroundColor: '#343435',
                    margin: '2px auto',
                    display: 'flex'
                }
            },
            getListItemStyles() {
                return {
                    listStyleType: 'none',
                    display: 'block'
                }
            },
            getButtonStyles(active) {
                if (window.navigator.userAgent.includes("iPhone")) {
                    return {
                        border: 0,
                        cursor: 'pointer',
                        color: 'none',
                        outline: 0,
                        textIndent: '-9999px',
                        margin: '14px',
                        width: '16px',
                        height: '16px',
                        opacity: 1,
                        backgroundImage: active ? 'url(images/grey_circle.png)' : 'url(images/grey_circle_dark.png)',
                        backgroundRepeat: 'no-repeat'
                    }
                } else {
                    return {
                        border: 0,
                        background: 'transparent',
                        backgroundColor: active ? '#b4b4b4' : 'rgb(85,85,87)',
                        cursor: 'pointer',
                        color: 'none',
                        outline: 0,
                        textIndent: '-9999px',
                        margin: '14px',
                        borderRadius: '50%',
                        fontSize: 24,
                        width: '16px',
                        height: '16px',
                        opacity: 1
                    }
                }
        },
        position: 'BottomCenter'
    })
    }
];

export default DefaultDecorators;
