import React from 'react'
import Selector from '../Dropdown';


export default class CountrySelector extends React.Component{
    render(){
        return(
            <Selector onChange={this.props.onChange}
                      value={{value: this.props.value, text: this.props.text}}
                      values={this.props.items} />
        )
    }
}
