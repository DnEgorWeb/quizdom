import React from 'react'
import e from '../../../../langs'
import styled from 'styled-components'
import SwitchNotification from './SwitchNotification'

const NotificationWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 36px;
    width: 640px;
    margin-left: auto;
    margin-right: auto;
    .checkbox {
        cursor: pointer;
    }
`

const TextWrapper = styled.div`
    width: 60%;
    height: 65px;
    border: 2px solid #808080; 
    background-color: #cdcdcd;
    display: flex;
    align-items: center;
    border-radius: 16px;
    padding-left: 30px; 
    font-weight: bold;
    letter-spacing: 1.5px;
    p {
        margin: 0;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
    }
`

export default function Notifications(props) {
    return(
        <NotificationWrapper>
            <TextWrapper>
                <p>{e.settings_pushNotification}</p>
            </TextWrapper>
            <SwitchNotification save={props.save} settings={props.settings} />
        </NotificationWrapper>
    );
}