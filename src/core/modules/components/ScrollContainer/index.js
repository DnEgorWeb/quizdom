import React from "react";

class ScrollContainer extends React.Component {

    state = {
        offset: 0
    }

    componentWillReceiveProps(props) {
        if (this.props.searchValue !== props.searchValue) {
            this.scrollContainer.scrollTo(0,0);
            this.setState({offset: 0});
        }
    }

    incrementOffset = () => {
        const {offsetDiff = 100} = this.props;
        this.setState(({offset}) => ({offset: (offset || 100) + offsetDiff}));
    }

    onScrollHandler = (e) => {
        const div = e.target;
        const isInBottom = div.scrollHeight - div.scrollTop === div.clientHeight;
        if (isInBottom) {
            if (typeof this.props.onScrollEnd === 'function') {
                this.props.onScrollEnd(Math.max(this.state.offset, 100), this.props.searchValue);
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
