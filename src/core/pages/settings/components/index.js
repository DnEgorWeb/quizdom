import React, {Component} from 'react'
import e from '../../../../langs'
import {withRouter} from 'react-router-dom'
import styled from 'styled-components'
import TopBar from '../../../modules/components/TopBar'
import LangChoose from './LangChoose'
import InfoButtons from './InfoButtons'
import PersonalInfo from './PersonalInfo'
import Notifications from './Notifications'
import { MetallicButton, MetallicButtonWrapper } from '../../../modules/components/MetallicButton'
import Languages from '../../../../services/languages'

const Header = styled.div`
    height: 110px;
    background-color: #232324;
    display: flex;
    color: #ff9500;
    font-size: 40px;
    justify-content: center;
    align-items: center;
`

const Main = styled.div`
    padding-top: 25px;
    hr {
        margin-top: 60px;
        margin-bottom: 30px;
        height: 2px;
        background-color: white;
        border-top: 2px solid #c5c5c5;
        width: 690px;
    }
`

const SettingsWrapper = styled.div`
    height: 100%;
    background-color: #ececec;
`

class Settings extends Component {
    constructor(props) {
        super(props)
        e.setLanguage(props.language)
    }

    state = {
        lookMode: this.props.settings.showFullName,
        push: false,
        languageId: false
    }

    languages = new Languages()

    componentWillReceiveProps(nextProps) {
        e.setLanguage(nextProps.language)
    }

    componentWillMount() {
        const {settings} = this.props;

        this.setState({
            lookMode   : settings.showFullName,
            push       : settings.push.pushNotificationsDuel,
            languageId : settings.languageId
        })
    }

    save = () => {
        this.props.updateProfile({
            profile : {
                settings : {
                    languageId   : (this.state.languageId === 'gb' ? 'en' : this.state.languageId),
                    push         : {
                        pushNotificationsDuel           : this.state.push,
                        pushNotificationsFriendActivity : this.state.push,
                        pushNotificationsNews           : this.state.push,
                        pushNotificationsTombola        : this.state.push,
                        pushNotificationsTournament     : this.state.push,
                    },
                    showFullName : this.state.lookMode
                }
            }
        });

        this.props.history.push('/dashboard')
    }

    changeLang = (langObj) => {
        const langCode = this.languages.getLangById(langObj);

        this.setState({
            languageId: langCode.toLowerCase()
        })
    }

    toggleMode = (mode, type) => {
        this.setState({
            [type]: mode
        })
    }

    switchLookMode = (flag) => {
        this.setState({ lookMode: flag });
    }

    logout = () => {
        this.props.history.push('/');
        localStorage.clear();
        this.props.setLoggedOut();
        this.props.registerAnonymous();
        if (window.navigator.userAgent.includes("Android") && window.CacheClear) {
            const success = (status) => {
                console.log(status)
            }
            const error = (status) => {
                console.log(status)
            }
            window.CacheClear(success, error)
        }
    }

    login = () => {
        this.props.history.push('/');
        localStorage.clear();
        this.props.setLoggedOut();
    }

    render() {
        return (
            <SettingsWrapper>
                <TopBar caption={e.settings_settings} back={this.save}/>
                <Header>{e.settings_viewInTheOfficialArea}</Header>
                <Main>
                    <PersonalInfo {...this.props} showFullName={this.state.lookMode} />
                    <InfoButtons switchLookMode={this.switchLookMode} lookMode={this.state.lookMode} {...this.props} />
                    <hr/>
                    <LangChoose language={this.state.languageId} langsList={this.props.langsList} changeLang={this.changeLang}/>
                    <hr/>
                    <Notifications save={this.toggleMode} settings={this.props.settings}/>
                    {this.props.nickname ?
                        <div>
                            <hr/>
                            <MetallicButtonWrapper>
                                <MetallicButton onClick={this.logout}>{e.settings_logout}</MetallicButton>
                            </MetallicButtonWrapper>
                        </div>
                        :
                        <div>
                            <hr/>
                            <MetallicButtonWrapper>
                                <MetallicButton onClick={this.login}>{e.settings_login}</MetallicButton>
                            </MetallicButtonWrapper>
                        </div>
                    }
                </Main>
            </SettingsWrapper>
        )
    }
}

export default withRouter(Settings);
