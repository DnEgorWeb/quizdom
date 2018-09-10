import React from 'react'
import { Link } from 'react-router-dom'
import url from '../../../../constants/urlConstants'
import styled from 'styled-components'
import e from '../../../../langs'

import ProfilePicture from '../ProfilePicture/ProfilePictureContainer'

const DecoratedLink = styled(Link)`
    text-decoration: none;
`

const SideMenuWrapper = styled.div`
	position: fixed;
	z-index: 101;
	top: 0;
	left: 0;

	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,.5);

	&.close {
		width: 0;
	}
`

const SideMenuContainer = styled.div`
	position: fixed;
	z-index: 101;
	top: 0;
	right: 0;
	font-family: Univers-condensed;

	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,0);
	overflow: hidden;

	transition: all .5s;

	&.close {
		right: -728px;
	}
`

const SideMenuToggleButton = styled.div`
	width: 120px;
	height: 130px;
	background-color: #ececec;
	border-bottom-left-radius: 10px;
	border-top-left-radius: 10px;

	position: absolute;
	top: 40px;
	right: 608px;

	display: flex;
	justify-content: center;
	align-items: center;

	box-shadow: 0 -2px 0px rgba(255, 255, 255, 0.75),
		-2px 0 0 rgba(255, 255, 255, 0.75),
		-2px 0 -2px rgba(255, 255, 255, 0.75);
`

const SideMenuCross = styled.div`
	cursor: pointer;
	width: 76px;
	height: 76px;
	background-color: #4d4d4d;
	border-radius: 50%;
	&::before, &::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 48px;
		height: 8px;
		background-color: #ececec;
		border-radius: 5px;
		transform-origin: 50%;
	}
	&::before {
		transform: translate(-50%, -50%) rotate(-45deg);
	}
	&::after {
		transform: translate(-50%, -50%) rotate(45deg);
	}
`

const SideMenuContent = styled.div`

	transition: all 2s;
	//overflow: auto;

	position: absolute;
	top: 0;
	right: 0;
	width: 610px;
	height: 100%;
	//max-height: 100vh;
	//min-height: 800px;
	background-color: #ececec;
	min-width: 610px;
`

const SideMenuUserBlock = styled.div`
	padding: 43px 18px 23px;
`

const UserTitle = styled.h2`
	font-family: Overpass, sans-serif;
	font-size: 44px;
	color: #4d4d4d;

	text-align: center;
	margin: 0;
	margin-bottom: 21px;
	padding: 0;
	padding-bottom: 23px;

	position: relative;

	&::after {
		content: '';
		height: 4px;
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
		background: linear-gradient(#b4b4b4, white);
	}
`

const ProfileBlock = styled.div`
	display: flex;
	justify-content: space-between;
	height: 239px;
	position: relative;
`



const Separator = styled.div`
	width: 4px;
	height: 239px;
	background: linear-gradient(to right, #b4b4b4, white);
	margin: 0 20px;
`

const BillBlock = styled.div`
	flex: 1;
	display: flex;
	flex-flow: column;
	justify-content: center;
	//background: #000;
	font-size: 36px;
	font-weight: 500;
    text-align: center;
    line-height: 2;
    span {
    	text-transform: uppercase;
    }
`

const BillWrapper = styled.div`
	width: 260px;
	height: 112px;
	border-radius: 18px;
	background-image: linear-gradient(to top, #f8f8f8, #d0cece);
	border: solid 2px #f2f2f2;

	display: flex;
	justify-content: center;
	align-items: center;
`

const BillButton = styled.button`
	border: none;

	width: 232px;
	height: 82px;
	border-radius: 8px;
  	background-image: linear-gradient(305deg, #ffffff, #efefef);
  	//box-shadow: 0px -4px 0px #e0e0e0;
  	box-shadow: -6px 6px 8px 0 rgba(0, 0, 0, 0.35), 0 -4px 0 white, 0 -8px 0 #e0e0e0;

  	display: flex;
  	justify-content: center;
	align-items: center;
	cursor: pointer;

  	&::after {
  		content: '';
  		width: 64px;
  		height: 59px;
  		background: url('images/konto-img.png') center no-repeat;
  	}

  	&:active {
  		box-shadow: -2px 2px 3px 0 rgba(0, 0, 0, 0.35);
  		background: linear-gradient(to bottom, #ffffff, #efefef);

  		&::after {
  			transform: translate(0, 1px);
  		}
  	}

	&:focus {
		outline: none;
	}
`

const MoneyBlock = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;

	width: 100%;
	height: 84px;
	box-shadow: inset 0 4px 10px 0 rgba(0, 0, 0, 0.39);
`

const Money = styled.div`
	display: inline-block;
	font-size: 42px;
	font-weight: 500;
	font-stretch: condensed;
	text-align: left;
	color: #f57a00;
`

const MenuItemStyled = styled.div`
	cursor: pointer;
	height: 116px;
	background-color: #f7f7f7;
	background-repeat: no-repeat;
	background-position: 470px center;
	background-size: 80px;
	font-size: 42px;
	font-stretch: condensed;
	text-align: left;
	padding: 0 0 0 27px;
	color: #4d4d4d;
	text-transform: uppercase;

	display: flex;
	justify-content: flex-start;
	align-items: center;

	position: relative;

	&::after {
		content: '';
		height: 4px;
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
		background: linear-gradient(#b4b4b4, white);
	}
`

const MenuBlock = styled.div`
	height: 842px;
	overflow: hidden;
    max-height: 842px;
    position: relative;
    .scrollable-wrapper{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: -17px;
        overflow-y: scroll;@media (max-width: 768px) {
            right: 0;
        }
    }
`

const MenuItem = props => {
	const style = {
		backgroundImage: `url(${props.source})`
	}

	return (
		<MenuItemStyled style={style}>
			{props.children}
		</MenuItemStyled>
	)
}

class SideMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isSideMenuOpened: props.isSideMenuOpened
		}

		e.setLanguage(props.language);
	}

	componentWillReceiveProps(newProps) {
		this.setState({isSideMenuOpened: newProps.isSideMenuOpened});
        e.setLanguage(newProps.language);
    }

	closeSideMenu = () => {
		this.setState({isSideMenuOpened: false})
	}

	getMenuItems = (menuItems) => {
        return menuItems.map((item, index) => {
            return (
                <DecoratedLink to={item.link || ''} key={`${item.title.split(' ').join('')}${index}`}>
                    <MenuItem source={item.src}>{item.title}</MenuItem>
                </DecoratedLink>
            )
        });
    }

	render() {
		const {
			money,
			credit,
			bonus,
			currency,
			nickname,
		} = this.props;

		const {isSideMenuOpened} = this.state;
		const menuItems = this.getMenuItems([
            { title : e.sidemenu_myProfits,		  src : 'images/01-gewinne.png',    link : url.winnings.index },
            { title : e.sidemenu_tombola,		  src : 'images/02-tombola.png',    link : url.tombola.index },
            { title : e.sidemenu_coupons,		  src : 'images/03-gutscheine.png', link : url.voucher.index },
            { title : e.sidemenu_myFriends,		  src : 'images/05-freunde.png',    link : url.friends.index },
            { title : e.sidemenu_toInviteFriends, src : 'images/06-einladen.png',   link : url.invite.index },
            { title : e.sidemenu_groups,		  src : 'images/07-gruppen.png',    link : url.groups.index },
            { title : e.sidemenu_highscore,		  src : 'images/08-highscore.png',  link : url.highscore.index },
            { title : e.sidemenu_promoCode,		  src : 'images/09-promocode.png',  link : url.promocode.index },
            { title : e.sidemenu_myData,		  src : 'images/10-daten.png',      link : url.profile.index },
            { title : e.sidemenu_feedback,		  src : 'images/11-feedback.png',   link : url.feedback.index },
            { title : e.sidemenu_info,			  src : 'images/12-info.png',       link : url.info.index },
            { title : e.sidemenu_settings,		  src : 'images/13-settings.png',   link : url.settings.index },
        ]);
	

		return (
			<SideMenuWrapper className={isSideMenuOpened ? 'open' : 'close'}>
				<SideMenuContainer className={isSideMenuOpened ? 'open' : 'close'}>
					<SideMenuToggleButton>
						<SideMenuCross onClick={this.closeSideMenu} />
					</SideMenuToggleButton>
					<SideMenuContent>
						<SideMenuUserBlock>
							<UserTitle>{`${nickname || e.sidemenu_guest}`}</UserTitle>
							<ProfileBlock>
                                <ProfilePicture size={227} />
								<Separator />
								<BillBlock>
									<BillWrapper>
										<DecoratedLink to={url.payment.index}><BillButton/></DecoratedLink>
									</BillWrapper>
									<span>{e.sidemenu_myAccount}</span>
								</BillBlock>
							</ProfileBlock>
						</SideMenuUserBlock>
						<MoneyBlock>
							<Money>{`${money} ${currency}`}</Money>
							<Money>{`${credit} CR`}</Money>
							<Money>{`${bonus} BP`}</Money>
						</MoneyBlock>
						<MenuBlock>
							<div className='scrollable-wrapper'>
								{ menuItems }
							</div>
						</MenuBlock>
					</SideMenuContent>
				</SideMenuContainer>
			</SideMenuWrapper>
		)
	}
}

export default SideMenu
