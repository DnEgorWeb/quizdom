import React from "react";
import styled from 'styled-components'

const Wrapper = styled.div`
  overflow: hidden;
  height: ${({height = '100px'}) => height};
  max-height: ${({height = '100px'}) => height};
  position: relative;
  .scrollable-wrapper{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: -17px;
    overflow-y: scroll;@media (max-width: 768px) {
            right: 0;
        }
  }
`

class ScrollableWrapper extends React.Component {

    state = {
        offset: 20
    }

    incrementOffset = () => {
        console.log('increment');
        const {offsetDiff = 20} = this.props;
        this.setState(({offset}) => ({offset: offset + offsetDiff}));
    }

    decrementOffset = () => {
        console.log('decrement');
        const {offsetDiff = 20} = this.props;
        this.setState(({offset}) => ({offset: offset - offsetDiff}));
    }

    onScrollHandler = (e) => {
        const div = e.target;
        const isInBottom = div.scrollHeight - div.offsetHeight === div.scrollTop;
        const isInTop = div.scrollTop === 0;
        const currentOffset = this.state.offset;
        if (isInBottom) {
            if (typeof this.props.loadList === 'function') {
                this.incrementOffset();
                // this.props.loadList(currentOffset);
            }
        }
        if ( isInTop && (currentOffset > 0) ) {
            if (typeof this.props.loadList === 'function') {
                this.decrementOffset();
                // this.props.loadList(currentOffset);
            }
        }
    }

    render() {
        return (
            <Wrapper height={this.props.height}>
                <div
                    className="scrollable-wrapper"
                    ref={(scrollContainer) => this.scrollContainer = scrollContainer}
                    onScroll={this.onScrollHandler}
                >
                    {this.props.children}
                </div>
            </Wrapper>
        )
    }
}

export default ScrollableWrapper;
