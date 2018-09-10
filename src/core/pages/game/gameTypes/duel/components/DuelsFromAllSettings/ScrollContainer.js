import React from "react";

class ScrollContainer extends React.Component {

    state = {
        offset: 20
    }

    incrementOffset = () => {
        const {offsetDiff = 20} = this.props;
        this.setState(({offset}) => ({offset: (offset || 20) + offsetDiff}));
    }

    onScrollHandler = (e) => {
        const div = e.target;
        const isInBottom = div.scrollHeight - div.scrollTop === div.clientHeight;
        const currentOffset = Math.max(this.state.offset, 20);
        if (isInBottom && this.props.total > currentOffset) {
            if (typeof this.props.onScrollEnd === 'function') {
                this.props.onScrollEnd(currentOffset);
                this.incrementOffset();
            }
        }
    }

    render() {
        return (
            <div ref={(scrollContainer) => this.scrollContainer = scrollContainer} onScroll={this.onScrollHandler} className='scrollable-wrapper'>
                {this.props.children}
            </div>
        )
    }
}

export default ScrollContainer;
