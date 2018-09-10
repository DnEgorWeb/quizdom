import React from 'react';
import e from '../../../../langs';
import createReactClass from 'create-react-class';

const DefaultDecorators = [
  {
    component: createReactClass({
      render() {
        return (
          <button
            style={this.getButtonStyles(this.props.currentSlide === 0 && !this.props.wrapAround)}
            onClick={this.handleClick}>{e.intro_prev}</button>
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
            onClick={this.handleClick}>{e.intro_next}</button>
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
          margin: 0,
          top: 40,
          padding: 0
        }
      },
      getListItemStyles() {
        return {
          listStyleType: 'none',
          display: 'inline-block'
        }
      },
      getButtonStyles(active) {
        const height = window.navigator.userAgent.includes("iPhone") ? '32px' : '22px'
        return {
          border: 0,
          // background: 'transparent',
          backgroundColor: active ? 'rgb(31, 242, 255)' : 'rgb(85,85,87)',
          cursor: 'pointer',
          color: 'none',
          // outline: 0,
          textIndent: '-9999px',
          margin: '20px',
          borderRadius: '50%',
          // fontSize: 24,
          width: '22px',
          height: height,
          // opacity: 1
        }
      }
    }),
    position: 'BottomCenter'
  }
];

export default DefaultDecorators;
