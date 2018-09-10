import React, { Component } from 'react';
import e from '../langs';
import {HashRouter, Route } from 'react-router-dom'
import getActionByEvent from '../services/getActionByEvent'
import styled from 'styled-components'

import RootContainer from './RootContainer'
import LoadingContainer from './pages/loading/LoadingContainer'

const AppWrapper = styled.div`
    overflow: hidden;
    height: 1334px;
    min-height: 1334px;
    width: 750px;
    min-width: 750px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
    background-color: rgb(35,35,35);
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    @media (max-width: 760px) {
        width: 100%;
        height: 100%;
    }
`

class App extends Component {
    constructor(props){
        super(props);

        if(props.language) e.setLanguage(props.language);
	    localStorage.removeItem('countQuestionForCurrentGame');
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.language) e.setLanguage(nextProps.language);
    }

    state = {
        isLoaded: false,
        isConnected: false,
        error: null
    }

    componentDidCatch(){
        this.setState({ error: {type: 'internal'} })
    }

    componentWillMount(){
        window.showConnectionFailed = true
        window.network.initialize(this.setConnected, this.onSocketClose, this.onMsg, this.onNetworkError)
        window.addEventListener(e.app_offline, this.onNetworkError);
    }

    onMsg = (msg) => {
        // must do that, because, if not, there will no dispatch function in action
        this.props.dispatch(getActionByEvent(msg.message)(msg));
    }

    onNetworkError = (error) => {
        console.log(window.network);

        if (window.showConnectionFailed) {
            window.showConnectionFailed = false
            window.notification.alert(
                e.app_connectionFailed,
                e.app_pleaseCheckYourInternetConnectionAndRetry,
                e.game_okCancel,
                //e.app_retry,
                () => {
                    window.network.initialize(this.setConnected, this.onMsg, this.onNetworkError);
                    window.location.reload();
                })
        }

        setTimeout(() => {
            window.showConnectionFailed = true
        }, 10000)
    }

    onSocketClose = () => {
        // todo: убрано из-за дублирования сообщений при отказе сети
        // window.notification.alert(e.app_connectionClose, e.app_pleaseRestartConnection, e.app_retry, () => window.location.reload())
        // window.location.reload()
    }

    setConnected = () => {
        this.setState({connected: true})
    }

    setLoaded = () => {
        this.setState({isLoaded: true})
    }

    render() {
        return (
            <AppWrapper>
                {
                this.state.isLoaded ?
                    <HashRouter>
                        <Route path='/' render={ () => <RootContainer /> } />
                    </HashRouter>
                :
                    <LoadingContainer
                        setLoaded={this.setLoaded}
                        connected={this.state.connected}
                    />
                }
            </AppWrapper>
        );
    }
}

export default App;
