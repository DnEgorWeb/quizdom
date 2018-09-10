import React from 'react'
import e from '../../../../langs'
import styled from 'styled-components'
import moment from 'moment'
import TopBar from '../../../modules/components/TopBar'

const Wrapper = styled.div`
	height: 100%;
	font-family: Univers-condensed;
	background: rgb(236,236,236);
`

const HistoryBlock = styled.div`
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

const BlockHeader = (props) => {
	const {data} = props;
	const dateObj = moment(data);
	const day = dateObj.format('dd').toUpperCase();
	const date = dateObj.format('DD.MM.YYYY')
	const time = dateObj.format('kk:mm')

	return (
		<HeaderContainer>
			<span>{day}</span>
			<Separator />
			<span className='date'>{date}</span>
			<Separator />
			<span>{time} UHR</span>
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
	p {
		margin: 0
	}
`

const HistoryList = styled.div`
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

class History extends React.Component {
	constructor(props) {
		super(props);
		props.initHistory();
		e.setLanguage(props.language)
	}
	
	componentWillReceiveProps(nextProps) {
        e.setLanguage(nextProps.language)
    }

	render() {
		const {userAccountHistory} = this.props
		return (
			<Wrapper>
				<TopBar caption={e.payment_history} />
				<HistoryList>
					<div className='scrollable-wrapper'>
						{
							userAccountHistory.map((history, index) => (
								<HistoryBlock key={history.id}>
									<BlockHeader data={history.creationDate}/>
									<BlockContent>
										<p>{`${e.payment_bought}: ${history.amount} Credits`}</p>
										<p>{`${e.payment_transactionsNo}: ${history.id}`}</p>
										{/*<p>{`${e.payment_deposit}: ${this.props.formatAmount(history.amount)} €`}</p>*/}
										{/*<p>{`${e.payment_IBAN}: (?)`}</p>*/}
									</BlockContent>
								</HistoryBlock>
							))
						}
					</div>
				</HistoryList>
			</Wrapper>
		)
	}
}

export default History;
