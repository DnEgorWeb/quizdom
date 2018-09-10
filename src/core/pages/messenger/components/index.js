import React from 'react'
import e from '../../../../langs';
import styled from 'styled-components'
import moment from 'moment'
import TopBar from '../../../modules/components/TopBar'

const Wrapper = styled.div`
	height: 100%;
	font-family: Univers-condensed;
	background: rgb(236,236,236);
`

const MessageBlock = styled.div`
	background: rgb(46,46,46);
	padding-bottom: 30px;
`

const HeaderContainer = styled.div`
	display: flex;
	height: 94px;
	padding: 31px 44px 21px;
	background-color: #232324;
  	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.7);
  	box-sizing: border-box;
  	
  	font-size: 42px;
	font-weight: 500;
	color: #7f7f7f;
	span {
		line-height: .9;
	}
	.date {
		font-weight: bold;
		color: #ff7f00;
	}
`

const Separator = styled.div`
	display: inline-block;
	height: 100%;
	width: 2px;
	background: #7f7f7f;
	margin: 0 15px;
`

const RemoveButton = styled.div`
	width: 46px;
	height: 46px;
	background: url('images/remove-message.png') center no-repeat;
	margin-left: auto;
	cursor: pointer;
`

const BlockHeader = props => {
	const {date: dateString} = props;
	const dateObj = moment(dateString);
	const day = dateObj.format('dd').toUpperCase();
	const date = dateObj.format('DD.MM.YYYY')
	const time = dateObj.format('kk:mm:ss')
	return (
		<HeaderContainer>
			<span>{day}</span>
			<Separator />
			<span className='date'>{date}</span>
			<Separator />
			<span>{time}</span>

			<RemoveButton href={props.src} onClick={props.removeMessage} />
		</HeaderContainer>
	)
}

const BlockContent = styled.div`
	margin: 30px 40px 0;
	padding: 30px;
	border-radius: 20px;
	background-color: #ececec;
	font: 900 34px Overpass;
	text-align: left;
	color: #282828;
`

const MessageList = styled.div`
    overflow: hidden;
    height: calc(100% - 98px);
    max-height: calc(100% - 98px);
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

class Messenger extends React.Component {
	constructor(props) {
		super(props);
		props.initMessenger();
	}

	removeMessage = id => {
		window.notification.confirm(e.messenger_attention, e.messenger_doYouReallyWantToDeleteTheMessage, e.messenger_okCancel,
			(button) => {
                if (Number(button) !== 2) {
                    this.props.removeMessage(id)
				}
		})
	}

	render() {
		const {messageList} = this.props;
		return (
			<Wrapper>
				<TopBar caption='inbox' />
				<MessageList>
					<div className='scrollable-wrapper'>
					{
						messageList.map((message, index)=> (
							<MessageBlock key={index}>
								<BlockHeader date={message.date} removeMessage={() => this.removeMessage(message.messageId)} />
								<BlockContent>
									<p key={index}>
										{message.message}
									</p>
								</BlockContent>
							</MessageBlock>
						))
					}
					</div>
				</MessageList>
			</Wrapper>
		)
	}
}

export default Messenger;
