import React, {  Component } from 'react'
import e from '../../../../langs'
import styled from 'styled-components'
import Progress from 'react-progressbar'

const ProgressBar = styled(Progress)`
    border: solid 2px #bcbcbc;
    margin: 10px 30px;
    max-height: 12px;
    box-sizing: border-box;
    border-radius: 4px;
    background-color: #d6d6d6;
    .progressbar-progress{
        box-sizing: border-box;
        height: 8px !important;
        border-radius: 4px;
        border-right: solid 2px #bcbcbc;
    }
`

const LoadingCaption = styled.p`
    font-size: 28px;
    margin: 0;
    text-align: center;
    font-family: 'Overpass', sans-serif;
`

const BannerWrapper = styled.div`
    height: 1210px;
    background: url("images/QDW Logo Screen.png") center no-repeat;
    background-size: cover;
    background-color: rgb(35,35,35);
`

const ProgressBarWrapper = styled.div`
    background: white;
    padding-top: 30px;
    height: 100px;
`

class Loading extends Component{
    constructor(props) {
        super(props)
        e.setLanguage(props.language)
    }

    componentWillMount(){
        this.props.initApp();
    }

    componentWillReceiveProps(nextProps){
        e.setLanguage(nextProps.language)

        if(nextProps.connected && !this.props.connected){
            this.props.loadApp();
        }
        if(nextProps.loadingPercent === 3){
            setTimeout(() => this.props.setLoaded(), 1000)//set timeout just for style, remove in production
        }
    }

    render(){
        return(
            <div>
                <BannerWrapper/>
                <ProgressBarWrapper>
                    <LoadingCaption>{e.loading_gameIsLoading} {this.props.loadingPercent * 10 * 2}%</LoadingCaption>
                    <ProgressBar color={'#fa7f00'} completed={this.props.loadingPercent * 10 * 2}/>{/*weird maths*/}
                </ProgressBarWrapper>
            </div>
        )
    }
}

export default Loading
