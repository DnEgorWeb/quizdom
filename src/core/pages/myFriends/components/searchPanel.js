import React from 'react'
import e from '../../../../langs'

import {
    SearchWrapper,
    SearchInput,
    ClearSearch,
} from './styledComponents'

class SearchPanel extends React.Component {

    onChangeHandler = (prop, e) => {
        const value = e.target.value;
        this.props.onChangeHandler(value, prop);
        // this.props.onSearch(0, value)
        //this.setState({[prop]: e.target.value})
    }

    clearSearch = () => {
        const value = '';
        this.props.onChangeHandler(value, this.props.type);
        // this.props.onSearch(0, value);
        // this.setState({ searchValue: { [this.props.type]: value} })
    }

    render() {
        const {type}      = this.props;
        const value       = this.props.searchValue[type];
        const placeholder = (
            type === 'nickname' ? e.myfriends_name  :
            type === 'address'  ? e.myfriends_place : ''
        );

        return (
            <SearchWrapper>
                <SearchInput
                    value={value}
                    placeholder={placeholder.toUpperCase()}
                    type='text'
                    onChange={this.onChangeHandler.bind(null, type)}
                />
                {
                    value && value.length ?
                    <ClearSearch onClick={this.clearSearch}/>
                    :
                    null
                }
            </SearchWrapper>
        )
    }
}

export default SearchPanel;
