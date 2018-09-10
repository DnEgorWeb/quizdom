import React from 'react'
import e from '../../../../langs'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import TopBar from '../../../modules/components/TopBar'

const InfoBoard = styled.div`
	background: rgb(52,52,53);
	height: 175px;
	box-sizing: border-box;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.7);

	font-family: Overpass, sans-serif;
	font-size: 28px;
	text-align: center;
	color: #b4b4b4;
	padding: 55px 70px;
`

const SocialBoard = styled.div`
	background: rgb(236,236,236);
	height: calc(100% - 175px);
	overflow: hidden;
`

const SetupContainer = styled.div`
	margin: 30px 50px 44px;
	padding: 0 0 0 21px;
	position: relative;
	height: 75px;

	font: 500 30px Overpass;
	text-align: left;
	color: #848484;

	display: flex;
	align-items: center;

	position: relative;

	//background: url("images/trash.png") 591px 16px no-repeat;

	span {
		font-weight: bold;
	}
	span.invite {
		color: #ff7f00;
		padding-left: 10px;
	}
	span.trash {
		position: absolute;
		left: 591px;
		top: 50%;
		transform: translate(0, -50%);
		width: 32px;
		height: 36px;
		background: url("images/trash.png");
		cursor: pointer;
	}

	&:before {
		content: '';
		position: absolute;
		top: 0;
		right: 90px;
		width: 4px;
		height: 100%;
		background: linear-gradient(to right, #c6c6c6, white);
	}

	&:after {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		height: 4px;
		width: 100%;
		background: linear-gradient(to bottom, #c6c6c6, white);
	}
`

const SetupLayout = props => (
	<SetupContainer>
		<span>Verschickte Einladungen</span>
		<span className='invite'>{props.count}</span>
		<span className='trash' onClick={props.onClick} />
	</SetupContainer>
);

const socialItems = [
	{title: 'Facebook', imgSrc: 'images/FB.png'},
	{title: 'Whatsapp', imgSrc: 'images/WA.png'},
	{title: 'Twitter', imgSrc: 'images/TW.png'},
	{title: 'e-mail', imgSrc: 'images/MA.png', link: '/invite/email'},
]

const DecoratedLink = styled(Link)`
    text-decoration: none;
`

const SocialItem = styled.div`
	width: 610px;
	height: 170px;
	border-radius: 10px;
	border: solid 2px #cdcdcd;
	box-sizing: border-box;
	margin: 0 auto 30px;
	padding-left: 210px;
	font: 500 28px Overpass;
	text-align: left;
	color: #848484;
	text-transform: uppercase;
	background: url(${props => props.imgSrc}) 42px center white no-repeat;
	background-size: 132px;
	display: flex;
	justify-content: center;
	flex-flow: column;
	cursor: pointer;
	.title {
		font-size: 42px;
		font-weight: bold;
		color: #ff7f00;
	}
`

class InviteFriendes extends React.Component {
	constructor(props) {
		super(props);
		this.props.initInviteFriends();
		e.setLanguage(props.language)
	}
	
	componentWillReceiveProps(nextProps) {
        e.setLanguage(nextProps.language)
    }

	invite = (title) => {
		if (title === 'Whatsapp') {
			this.inviteWhatsapp();
		} else {
			const {userId} = this.props;
			const newWin = window.open('', '_system');
			/* eslint-disable */
			branch.link({
				channel: title,
				data: {
					'ref_id': userId
				}
			}, (err, link) => {
				if(link){
					switch (title) {
						case 'Facebook': {
							if (window.navigator.userAgent.includes("Android") || window.navigator.userAgent.includes("iPhone")) {
                                window.plugins.socialsharing.shareViaFacebook('Join to Quizdom WIN:', null, 'http://qd1w.f4mworld.com', function() {console.log('share ok')}, function(errormsg){console.log(errormsg)})
                            } else {
                                newWin.location = window.config.urls.FACEBOOK_LINK + link;
							}
                            break;
						}
						case 'Twitter': {
                            if (window.navigator.userAgent.includes("Android") || window.navigator.userAgent.includes("iPhone")) {
                                window.plugins.socialsharing.shareViaTwitter('Join to Quizdom WIN:', null, 'http://qd1w.f4mworld.com', function() {console.log('share ok')}, function(errormsg){console.log(errormsg)})
                            } else {
                                newWin.location = window.config.urls.TWITTER_LINK + link;
							}
							break;
						}
					}
				}
			});
			/* eslint-enable */
		}

	}

	inviteWhatsapp = () => {
		if (window.cordova ) {
            window.plugins.socialsharing.shareViaWhatsApp('Join to Quizdom WIN:', null, 'http://qd1w.f4mworld.com', function() {console.log('share ok')}, function(errormsg){console.log(errormsg)})
			// const {userId} = this.props;
			// const properties = {
			// 	canonicalIdentifier: 'invite-new',
			// 	contentMetadata: {
			// 		'ref_id': userId
			// 	}
			// }
            //
			// // optional fields
			// const analytics = {
			// 	channel: 'Whatsapp',
			// 	feature: 'invite'
			// }
            //
			// const properties2 = {};
			// // create a branchUniversalObj variable to reference with other Branch methods
			// let branchUniversalObj = null;
			// /* eslint-disable */
			// Branch.createBranchUniversalObject(properties).then(function (res) {
			// 	alert(res)
			// 	branchUniversalObj = res
			// 	branchUniversalObj.generateShortUrl(analytics, properties2).then(function (res) {
             //        // here a errors
			// 		navigator.app.loadUrl(window.config.urls.WHATSAPP_LINK + res.url, { openExternal: true });
			// 	}).catch(function (err) {
			// 		alert('Error: ' + JSON.stringify(err))
			// 	})
			// }).catch(function (err) {})
			// /* eslint-enable */

		} else {
			window.notification.alert(e.invite_attention, e.invite_whatsappIsOnlySupportedInTheHybridApplication, e.invite_ok, () => {})
		}

	}

	removeInvites = () => {
		window.notification.confirm(e.invite_attention, e.invite_areYouSure, e.invite_okCancel, () => {
			const ids = this.props.contactList && this.props.contactList.map(contact => contact.contact.contactId);
			this.props.contactRemoveInvitation(ids);
		})
	}

	render() {
		return (
			<div style={{height: "calc(100% - 98px)"}}>
				<TopBar caption={e.invite_toInviteFriends} />
				<InfoBoard>{e.invite_inviteHereFriendsAgainstWhomOrWithWhomYouWantToPlay}</InfoBoard>
				<SocialBoard>
					<SetupLayout count={this.props.contactList.length} onClick={this.removeInvites} />
					{
						socialItems.map((item, index) =>
							item.link ?

								<DecoratedLink key={index} to={item.link}>
									<SocialItem imgSrc={item.imgSrc}>
                                        {e.invite_invitePer}<br/>
										<span className="title">{item.title}</span>
									</SocialItem>
								</DecoratedLink>
                                :
								<SocialItem onClick={() => this.invite(item.title)} key={index} imgSrc={item.imgSrc}>
                                    {e.invite_invitePer}<br/>
									<span className="title">{item.title}</span>
								</SocialItem>

						)
					}
				</SocialBoard>
			</div>
		)
	}
}

export default InviteFriendes;
