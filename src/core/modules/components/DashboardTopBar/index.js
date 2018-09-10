import React                from 'react'
import styled               from 'styled-components'
import { withRouter, Link } from 'react-router-dom'
import url                  from '../../../../constants/urlConstants'
import e                    from '../../../../langs'

import SideMenu from '../SideMenu'

const TopBarWrapper = styled.div`
    position: relative;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 98px;
    box-shadow: 0px 4px 8px 0 rgba(0, 0, 0, 0.4);
    background-image: linear-gradient(to top, rgb(76, 76, 76), rgb(112, 112, 112));
`

const TopBarCaption = styled.div`
    font-size: 46px;
    font-weight: bold;
    font-stretch: condensed;
    color: #c6c6c6;
`

const TopBarBackLink = styled.div`
    cursor: pointer;
    height: 76px;
    width: 76px;
    margin-left: 30px;

    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .unreadCount {
        position: absolute;
        width: 40px;
        height: 41px;
        background-color: #9c1006;
        border-radius: 50%;

        font-family: Univers-condensed;
        font-size: 28px;
        font-weight: 500;
        text-align: center;
        color: #ffffff;

        left: 60px;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
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

class DashboardTopBar extends React.Component{
    constructor(props) {
        super(props);
        if(props.language) e.setLanguage(props.language);

        this.state = {
            openedSideMenu: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.language) e.setLanguage(nextProps.language);
    }

    toggleSideMenuAndGetBalance = () => {
        const {getBalance} = this.props;
	    getBalance();
	    //toggleSideMenu();
        this.setState({openedSideMenu: true})
    }

    render(){
        const {openedSideMenu} = this.state;
        const {unreadMessageCount} = this.props;
        return(
            <div>
                <TopBarWrapper>
                    <Link to={url.messenger.index}>
                        <TopBarBackLink>
                            <img src='images/news.png' alt='' />
                            {
	                            unreadMessageCount ?
                                    <div className='unreadCount'>{unreadMessageCount}</div> :
                                    null
                            }

                        </TopBarBackLink>
                    </Link>
                    <TopBarCaption>
                        {this.props.caption}
                    </TopBarCaption>

                    <CloseWrapper onClick={this.toggleSideMenuAndGetBalance}>
                        <CloseSeparator/>
                        <img src='images/burger.png' alt=''/>
                    </CloseWrapper>
                </TopBarWrapper>

                <SideMenu
                    money={this.props.money}
                    credit={this.props.credit}
                    bonus={this.props.bonus}
                    currency={this.props.currency}
                    nickname={this.props.nickname}
                    isSideMenuOpened={openedSideMenu}
                    language={this.props.language}
                />
            </div>
        )
    }
}

export default withRouter(DashboardTopBar)
