import React from 'react'
import e from './../../../../langs'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import TopBar from '../../../../core/modules/components/TopBar'
import url from '../../../../constants/urlConstants'
import ProfilePicture from '../../../modules/components/ProfilePicture/ProfilePictureContainer'
import {MetallicButtonWrapper, MetallicButton} from '../../../modules/components/MetallicButton'
import SubMenu from '../../../modules/components/SubMenu'

const MyLookFriendsWrapper = styled.div`
	height: 100%;
	box-sizing: border-box;
`

const TopPanel = styled.div`
	height: 440px;
	background-color: #232324;
	box-shadow: 0px 4px 8px 0 rgba(0, 0, 0, 0.7);
    position: relative;
`

const BottomPanel = styled.div`
	background: rgb(236,236,236);
	height: calc(100% - 98px - 440px);
	overflow: hidden;
`

const GameLevel = styled.div`
	width: 105px;
	height: 65px;
	font-family: Nasalization;
	font-size: 34px;
	text-align: left;
	color: #1ff2ff;

	position: absolute;
	top: 52px;
	left: 40px;
`

const ProfilePictureWrapper = styled.div`
	width: 340px;
	height: 340px;
	background-image: linear-gradient(to top, #767575, #111111);
	border: solid 2px #605f5f;
	border-radius: 50%;

	display: flex;
	justify-content: center;
	align-items: center;

	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%) translate(0, -30px);
`

const NameWrapper = styled.div`
	font-family: Overpass, sans-serif;
	font-size: 38px;
	text-align: center;
	color: #1ff2ff;

	position: absolute;
	bottom: 16px;
	left: 50%;
	transform: translate(-50%, 0);
`

const InfoButton = styled.div`
	width: 96px;
	height: 96px;
	cursor: pointer;
	background: linear-gradient(to bottom, rgb(72,72,72), rgb(40,40,40));

	border-radius: 50%;
	box-shadow: 0 -2px 0 rgb(140,140,140), 0 0 0 2px rgb(28,28,28);

	position: absolute;
	right: 49px;
	top: 44px;

	&:active {
		box-shadow: 0 0 0 2px rgb(28,28,28);
		&:after {
			transform: translate(-50%, -50%) scale(0.95);
		}
	}

	&:after {
		content: '';
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 21px;
		height: 52px;
		background: url("images/i-litera.png") center no-repeat;
	}
`

const Text = styled.div`
	font-family: Univers-condensed;
	font-size: 40px;
	font-weight: 500;
	text-align: left;
	color: #333333;
	margin: 35px 42px;
	text-transform: uppercase;
`

const NameAddressBlock = styled.div`
    position: relative;
`

const NameBlock = styled.div`
	height: 106px;
	background-image: linear-gradient(to bottom, #505050, #333333);
	padding: 0 0 0 191px;
    font-family: Overpass, sans-serif;
    box-sizing: border-box;
    display: flex;
    align-items: center;
	.name {
		font-size: 40px;
		color: #ffffff;
	}
	.nickname {
		font-size: 36px;
		color: #cdcdcd;
	}
`

const AddressBlock = styled.div`
	padding: 12px 0 0 191px;
	background-color: #dadada;
	height: 55px;

	font-family: Overpass, sans-serif;
	font-size: 36px;
	color: #333333;
	position: relative;
`

const LittleProfilePicture = styled.div`
	width: 140px;
	height: 140px;
	background: url("${props => props.profileURL || 'images/Anonymus.png'}") center no-repeat;
	background-size: contain;
	border: 2px solid rgb(218,218,218);
	border-radius: 50%;
	position: absolute;
	top: 10px;
	left: 24px;
`

const FlagWrapper = styled.div`
	position: absolute;
	right: 0;
	top: 4px;
`

const Flag = styled(props => <span className={`flag flag-${props.value.toLowerCase()}`}/>)``

const ChangeButton = styled(MetallicButton)`
	box-shadow: 0 4px 10px rgba(0,0,0,.5), 0 -4px 0 white, 0 -8px 0 rgb(224,224,224);
	&:active {
		box-shadow: 0 2px 4px rgba(0,0,0,.5);
		transform: translate(-50%, -50%) translate(0, 2px);
	}
`

const ButtonsContainer = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 0 90px;
	margin-top: 67px;
`

const Description = styled.div`
	font-size: 36px;
	font-weight: 500;
	color: #333333;

	position: absolute;
    top: 100px;
    width: 210px;
    text-align: center;
    left: 50%;
    transform: translate(-50%,0);
`

const AssessButtonWrapper = styled(MetallicButtonWrapper)`
	border-radius: 18px;
	width: 256px;
	height: 105px;
	position: relative;
`

const AssessButton = styled(ChangeButton)`
	width: 232px;
	height: 78px;
	border-radius: 8px;
	background: url("images/look-standard${props => props.active ? '-active' : ''}.png") center rgb(249,249,249) no-repeat;
`

const MyVoucherButtonWrapper = styled(AssessButtonWrapper)``

const MyVoucherButton = styled(AssessButton)`
	background: url("images/look-private${props => props.active ? '-active' : ''}.png") center rgb(249,249,249) no-repeat;
`

const PreviusButtonWrapper = styled(MetallicButtonWrapper)`
	width: 342px;
	height: 112px;
	border-radius: 56px;
	margin-top: 130px;
`

const PreviusButton = styled(ChangeButton)`
	width: 314px;
	height: 78px;
	border-radius: 38px;
	background-image: url("images/prev-button.png");
	background-repeat: no-repeat;
	background-position: center;
`

const InfoDescriptionWrapper = styled.div`
	font: 500 36px Arial;
	h3 {
		font-weight: 900;
		margin: 0;
		padding: 0;
	}
	p {
		margin-top: 0;
	}
`

const InfoTitle = styled.h3`
  text-transform: capitalize;
`

const InfoDescription = () => {
	return (
		<InfoDescriptionWrapper>
			<InfoTitle>{e.mylookfriends_default}</InfoTitle>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			</p>
			<InfoTitle>{e.mylookfriends_privacyProtection}</InfoTitle>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			</p>
		</InfoDescriptionWrapper>
	)
}

const componentList = [0].map(() => <InfoDescription />)

export default class MyLookFriends extends React.Component {
	constructor(props) {
		super(props);
		e.setLanguage(props.language)
		const {showFullName} = props;
		this.state = {
			lookMode: showFullName ? 'standard' : 'private',
			openedSideMenu: false
		}
	}

	componentWillReceiveProps(nextProps) {
	    e.setLenguage(nextProps.language)
    }

	toggleLookMode = (mode) => {
		this.setState({lookMode: mode, openedSideMenu: false})
	}

	toggleSidMenu = () => {
		this.setState(prevState => ({openedSideMenu: true}))
	}

	render() {
		const {lookMode, openedSideMenu} = this.state;
		const standartModeActive = lookMode === 'standard';
		const {firstName, lastName, nickname, country, profileURL} = this.props;
		return (
			<MyLookFriendsWrapper>
				<TopBar caption='standard' />
				<TopPanel>
					<GameLevel>{e.mylookfriends_gameLevel}</GameLevel>
					<ProfilePictureWrapper>
						<ProfilePicture size={284} />
					</ProfilePictureWrapper>
					<NameWrapper>
						{
							standartModeActive ?
								(firstName || 'Vorname') + ' ' + (lastName || 'Nachname') :
								(nickname || 'Nickname')
						}
					</NameWrapper>
					<InfoButton onClick={this.toggleSidMenu} />
				</TopPanel>
				<BottomPanel>
					<Text>{
						standartModeActive ?
                            e.mylookfriends_standardThatSHowAllTheOtherPlayersSeeMe :
							e.mylookfriends_privateProtectionSelectionUnderSettingsSeeInfo
						}</Text>
					<NameAddressBlock>
						<NameBlock>
							{
								standartModeActive ?
									<div>
										<span className="name">{(firstName || e.mylookfriends_firstName) + ' ' + (lastName || e.mylookfriends_LastName)}</span>
										<br />
										<span className="nickname">{nickname || e.mylookfriends_username}</span>
									</div> :
									<span className="name">{nickname || e.mylookfriends_username}</span>
							}
						</NameBlock>
						<AddressBlock>
                            {e.mylookfriends_placeOfResidence}
							<FlagWrapper><Flag value={country} /></FlagWrapper>
						</AddressBlock>
						<LittleProfilePicture profileURL={profileURL} />
					</NameAddressBlock>

					<ButtonsContainer>
						<AssessButtonWrapper>
							<AssessButton active={standartModeActive} onClick={() => this.toggleLookMode('standard')} />
							<Description>
                                {e.mylookfriends_standardView}
							</Description>
						</AssessButtonWrapper>
						<MyVoucherButtonWrapper>
							<MyVoucherButton active={!standartModeActive} onClick={() => this.toggleLookMode('private')}/>
							<Description>
                                {e.mylookfriends_viewPrivateProtection}
							</Description>
						</MyVoucherButtonWrapper>
					</ButtonsContainer>
					<PreviusButtonWrapper>
						<Link to={url.dashboard.index}>
							<PreviusButton />
						</Link>
					</PreviusButtonWrapper>
				</BottomPanel>
				<SubMenu
					title={e.mylookfriends_myProfileRepresentation}
					currentIndex={openedSideMenu ? 0 : null}
					componentList={componentList}
				/>
			</MyLookFriendsWrapper>
		)
	}
}
