import React, {Component} from 'react'
import e from '../../../../langs'
import styled from 'styled-components'
import CountrySelector from '../../../modules/components/CountrySelector'
import Languages from '../../../../services/languages'

const FormInput = styled.div`
    position: relative;
    margin: auto;
    width: 640px;
    text-align: center;
    margin-bottom: 20px;
    a{
        cursor: pointer;
        position: absolute;
        right: 10px;
        top: 70px;
        height: 32px;
    }
    img{
        height: 32px;
    }
    p{
        margin-top: 20px;
        font-size: 36px;
        color: #333333;
        text-align: center;
        margin-bottom: 5px;
        padding-left: 10px;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
    }
    input[type="text"]{
        box-sizing: border-box;
        width: 640px;
        height: 70px;
        border-radius: 16px;
        background-color: #ffffff;
        border: solid 2px #818181;
        font-size: 36px;
        font-family: Calibri;
        color: #333333;
        padding: 0 30px;
    }
`

export default class LangChoose extends Component {
    languages = new Languages();

    render() {
        const defaultLanguage = "de";
        const language        = this.props.language || defaultLanguage;
        const initialLanguage = this.languages.getInitialLanguage(language);
        const items           = this.languages.getLanguages(this.props.langsList);
        const text            = this.languages.getCountryById(initialLanguage, this.props.langsList);

        return(
            <FormInput>
                <CountrySelector value={initialLanguage} lang={"lang"} onChange={this.props.changeLang} items={items} text={text} />
                <p>{e.settings_availableLanguageDisplay}</p>
            </FormInput>
        );
    }
}
