import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import url from '../../../../constants/urlConstants'

const TopBarWrapper = styled.div`
    position: relative;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 96px;
    box-shadow: 0px 4px 8px 0 rgba(0, 0, 0, 0.4);
    background-image: linear-gradient(to top, rgb(76, 76, 76), rgb(112, 112, 112));
`

const TopBarCaption = styled.div`
    font-size: 46px;
    font-weight: bold;
    font-stretch: condensed;
    color: #c6c6c6;
    text-transform: uppercase;
`

const TopBarBackLink = styled.div`
    cursor: pointer;
    height: 76px;
    width: 76px;
    margin-left: 30px;
`

const CloseSeparator = styled.div`
    width: 2px;
    height: 96px;
    background-color: #282828;
`

const CloseWrapper = styled.div`
    margin-top: 4px;
    cursor: pointer;
    display: flex;
    height: 95px;
    width: 98px;
    background-color: rgb(56, 56, 56);
    img{
        margin: auto;
        height: 35px;
        width: 35px;
    }
`

class TopBar extends React.Component{
    close = () => {
        this.props.history.push(url.dashboard.index)
    }

    render(){
        const { protectTopBarBtn } = this.props;
        return(
            <TopBarWrapper>
                <TopBarBackLink onClick={this.props.back || this.props.close || this.props.history.goBack}>
                    {
	                    protectTopBarBtn ? null : <img src='images/arrow-left.png' alt='' />
                    }
                </TopBarBackLink>
                <TopBarCaption>
                    {this.props.caption && this.props.caption.toString().toUpperCase()}
                </TopBarCaption>

                <CloseWrapper onClick={this.close}>
                    <CloseSeparator/>
                    {
	                    protectTopBarBtn ? null : <img src='images/cross.png' alt=''/>
                    }
                </CloseWrapper>
            </TopBarWrapper>
        )
    }
}

export default withRouter(TopBar)
