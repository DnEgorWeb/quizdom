import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from './core/store/store'
import AppContainer from './core/AppContainer'

import Network from './services/network'
import notification from './services/notification'
import tokenDecoder from './services/tokenDecoder'

import './index.css'
import './core/modules/components/CountrySelector/flags.css'
import e from "./langs";

function startApp(){
    // import registerServiceWorker from './registerServiceWorker';
    window.notification = notification
    window.network = new Network()
    window.tokenDecoder = tokenDecoder

    ReactDOM.render(
        <Provider store={store}><AppContainer/></Provider>,
        document.getElementById('root')
    );
}

if(!window.cordova) {
    startApp()
} else {
    try {
        var app = {
            initialize: function() {
                this.bindEvents();
            },
            bindEvents: function() {
                // const admob = window.admob
                document.addEventListener('deviceready', this.onDeviceReady, false);
                document.addEventListener('resume', this.onDeviceResume, false);
                document.addEventListener('admob.interstitial.events.CLOSE', (event) => {
                    // temporary commented!
                    // admob.banner.show();
                    // admob.interstitial.prepare();
                });
                document.addEventListener('admob.rewardvideo.events.REWARD', (event) => {
                    //alert(JSON.stringify(event));
                });
                document.addEventListener('admob.rewardvideo.events.CLOSE', (event) => {
                    // temporary commented!
                    // admob.banner.show();
                    // admob.rewardvideo.prepare();
                });
            },
            onDeviceReady: function() {
                // const admob = window.admob
                // const device = window.device
                // const StatusBar = window.StatusBar

                /*app.branchInit();*/

                window.deviceIsReady = true;

                // temporary commented!
                // var admobid = {};
                //
                // if(device.platform === 'iOS'){
                //     StatusBar && StatusBar.hide();
                //     window.analytics.startTrackerWithId('UA-96751602-7');
                //     //window.Fyber.init("104732", "de5dabb8de7e0e2926a7623197b86fd7");
                //
                //     admobid = {
                //         banner: 'ca-app-pub-6534560512351230/9364290998',
                //         interstitial: 'ca-app-pub-6534560512351230/8253501251',
                //         reward: 'ca-app-pub-6534560512351230/6871302671'
                //     }
                //
                //     admob.banner.config({
                //         id: admobid.banner,
                //         isTesting: false,
                //         autoShow: false,
                //         overlap: true
                //     });
                //
                // }
                //
                // if(device.platform === 'Android'){
                //     window.analytics.startTrackerWithId('UA-96751602-8');
                //     //window.Fyber.init("104738", "c8e01f7ccd2e4c98340078032cfbda6b");
                //
                //     admobid = {
                //         banner: 'ca-app-pub-6534560512351230/4258799393',
                //         interstitial: 'ca-app-pub-6534560512351230/5636294399',
                //         reward: 'ca-app-pub-6534560512351230/4225820432'
                //     }
                //
                // }
                //
                // admob.banner.config({
                //     id: admobid.banner,
                //     isTesting: false,
                //     autoShow: false,
                //     overlap: true
                // });
                //
                // admob.interstitial.config({
                //     id: admobid.interstitial,
                //     isTesting: false,
                //     autoShow: false
                // });
                //
                // admob.rewardvideo.config({
                //     id: admobid.reward,
                //     isTesting: false,
                //     autoShow: false
                // });
                //
                // admob.banner.prepare()
                //      .then(admob.banner.show)
                //      .then(() => {
                //          setTimeout(window.resizeApp, 100)
                //      })
                //
                // admob.interstitial.prepare()
                // admob.rewardvideo.prepare()

                window.plugins.OneSignal
                    .startInit('dfa43607-167e-47ff-9c1f-3cd591e87019') //key from quizdom
                    //.startInit("35d2164d-a274-4469-90ed-77b72ff0fb2f") //key from gerasimov.gi@spb.rusoft-company.ru
                    .endInit();

                startApp()
            },
            onDeviceResume: function() {
                /*app.branchInit();*/

                // checking websocket-connection and reconnect if it`s closed
                if (window.socket.readyState === window.socket.CLOSED) {
                    window.notification.alert(
                        e.app_connectionFailed,
                        e.app_pleaseCheckYourInternetConnectionAndRetry,
                        e.game_okCancel,
                        () => {
                            window.location.reload();
                        })
                }
            },
            /*
            branchInit: function() {
                // Branch initialization
                Branch.initSession(function(data) {
                    // read deep link data on click
                    //alert('Deep Link Data: ' + JSON.stringify(data));
                    if(data['+non_branch_link']){
                        var param = data['+non_branch_link'].split("?")[1];

                        var scope = angular.element(document.querySelector('.paydent-callback-modal')).scope();

                        if(param.includes('true'))
                            scope.$ctrl.showF4mDialog('paydent-successful-callback-modal');
                        else
                            scope.$ctrl.showF4mDialog('paydent-error-callback-modal');

                    }

                });
            }
            */
        };

        app.initialize();
    } catch (err) {
        alert(err)
    }
}

// registerServiceWorker();
