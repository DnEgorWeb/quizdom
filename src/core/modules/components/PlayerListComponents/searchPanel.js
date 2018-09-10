import React from 'react'

import {
    SearchWrapper,
    SearchInput,
    ClearSearch,
} from './styledComponents'

class SearchPanel extends React.Component {

    onChangeHandler = (prop, e) => {
        const value = e.target.value;
        this.props.onChangeHandler(value, prop);
        this.props.onSearch(0, value)
        this.setState({[prop]: e.target.value})
    }

    clearSearch = () => {
        const value = '';
        this.props.onChangeHandler(value, 'nickname');
        this.props.onSearch(0, value)
        this.setState({nickname: value})
    }

    render() {
        return (
            <SearchWrapper>
                <SearchInput
                    value={this.props.searchValue}
                    placeholder='SUCHEN'
                    type='text'
                    onChange={this.onChangeHandler.bind(null, 'nickname')}
                />
                {
                    this.props.searchValue !== '' ?
                        <ClearSearch onClick={this.clearSearch} />
                        :
                        null
                }
            </SearchWrapper>
        )
    }
}

export default SearchPanel;
