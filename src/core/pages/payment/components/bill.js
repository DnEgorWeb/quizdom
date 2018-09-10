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

const DownloadButton = styled.a`
	display: block;
	width: 46px;
	height: 46px;
	background: url('images/bill.png') center no-repeat;
	margin-left: auto;
	cursor: pointer;
`

const BlockHeader = (props) => {
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

			<DownloadButton href={props.src} />
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

const BillList = styled.div`
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

class Bill extends React.Component {
	constructor(props) {
		super(props);
		props.initBill();
	}

	render() {
		const {billList, endUserPDFUrlList} = this.props;
		return (
			<Wrapper>
				<TopBar caption={e.payment_bills} />
				<BillList>
					<div className='scrollable-wrapper'>
					{
						billList.map((bill, index)=> (
							<HistoryBlock key={index}>
								<BlockHeader date={bill.paymentDate} src={endUserPDFUrlList[index]} />
								<BlockContent>
									{Object.keys(bill).map((prop, index) => (
										<p key={index}>
											{`${prop}: ${bill[prop]}`}
										</p>
									))}
								</BlockContent>
							</HistoryBlock>
						))
					}
					</div>
				</BillList>
			</Wrapper>
		)
	}
}

export default Bill;
