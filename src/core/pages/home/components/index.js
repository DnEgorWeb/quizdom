import React, {  Component } from 'react'
import e from '../../../../langs'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { MetallicButton, MetallicButtonWrapper } from '../../../modules/components/MetallicButton'

const HomeSection = styled.div`
    position: relative;
    height: 400px;
    background-color: #ececec;
    box-shadow: 0px 4px 8px 0 rgba(0, 0, 0, 0.4);
    border: solid 1px #c9c9c9;
`

const LabelAndButtonWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const DecoratedLink = styled(Link)`
    text-decoration: none;
`

const HomeButtonWrapper = styled(MetallicButtonWrapper)`
    width: 392px;
    margin-bottom: 45px;
    &:last-child {
        margin: 0;
    }
`
const HomeButton = styled(MetallicButton)`
    width: 354px;
`
const PlaySection = styled.div`
    width: 100%;
    height: 928px;
    background: url('images/home-bg.jpg') rgb(34,35,39) top center no-repeat;
    background-size: contain;
    box-shadow: 0px 4px 8px 0 rgba(0, 0, 0, 0.4);
    position: relative;
    z-index: 3;
    display: block;

    &:after {
        content: '';
        position: absolute;
        bottom: 63px;
        left: 50%;
        transform: translate(-50%, 0);
        width: 380px;
        height: 380px;
        background: url('images/big-play.png') center no-repeat;
        background-size: contain;
    }
`
const Title = styled.div`
    font: 500 40px Univers-condensed;
    text-align: center;
    color: #ffffff;
    text-decoration: none;
    position: absolute;
    bottom: 490px;
    left: 50%;
    transform: translate(-50%, 0);
    span {
        font-size: 62px;
        color: #ff7f00;
        display: block;
        text-transform: uppercase;
    }
`

class Home extends Component{
    constructor(props) {
        super(props)
        e.setLanguage(props.language)
    }

    componentWillReceiveProps(nextProps) {
        e.setLanguage(nextProps.language)
    }

    render(){
        return(
            <div>
                <DecoratedLink to='/dashboard'>
                    <PlaySection>
                        <Title>
                            <span>{e.home_playNow}</span>
                            {e.home_andTest}!
                        </Title>
                    </PlaySection>
                </DecoratedLink>
                <HomeSection style={{zIndex:1, boxShadow: 0}}>
                    <LabelAndButtonWrapper>
                        <HomeButtonWrapper>
                            <DecoratedLink to='/register'><HomeButton>{e.home_register}</HomeButton></DecoratedLink>
                        </HomeButtonWrapper>
                        <HomeButtonWrapper>
                            <DecoratedLink to='/login'><HomeButton>{e.home_login}</HomeButton></DecoratedLink>
                        </HomeButtonWrapper>
                    </LabelAndButtonWrapper>
                </HomeSection>

            </div>
        )
    }
}
export default Home
