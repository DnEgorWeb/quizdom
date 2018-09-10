import React from 'react'
import e from '../../../../langs'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import url from '../../../../constants/urlConstants'
import moment from 'moment'
import TopBar from '../../../modules/components/TopBar'
import Checkbox from './checkbox'

const DecoratedLink = styled(Link)`
    text-decoration: none;
`

const MyVouchersContainer = styled.div`
	height: 100%;
	box-sizing: border-box;
`

const Container = styled.div`
	display: flex;
	height: 208px;
	margin: 20px;
	position: relative;

	& > div {
		flex: 1;
	}

	&:after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 4px;
		background-image: linear-gradient(to bottom, #c6c6c6, white);
	}
`
const ImageBlock = styled.div`
	background: url(${props => props.src}) center no-repeat;
	background-size: 300px 155px;
`
const OptionsBlock = styled.div`
	margin: 20px 20px 20px 0;
`
const DateBlock = styled.div`
	height: 50%;
	padding: 0 40px;
	position: relative;
	background: url("images/voucher-arrow-right.png") right 20px center no-repeat,
		url("images/voucher-date.png") left top 5px no-repeat;
	cursor: pointer;
	&:after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: calc(100% - 40px);
		height: 4px;
		background-image: linear-gradient(to bottom, #c6c6c6, white);
	}
`
const Text = styled.div`
	font: 500 30px Overpass;
	color: #333333;
`
const DateText = styled.div`
	font-weight: 900;
	font-size: 30px;
	color: #f8800c;
	position:absolute;
	bottom: 3px;
`
const CheckboxBlock = styled.div`
	height: 50%;
	font: 500 36px Univers-condensed;
	color: #9a9a9a;
`

class VoucherItem extends React.Component {
	constructor(props) {
		super(props);
		e.setLanguage(props.language)
		this.state = {
			checked: false
		}
		this.props.initMyVoucher()
	}
	
	componentWillReceiveProps(nextProps) {
	    e.setLanguage(nextProps.language)
    }

	removeVoucher = (voucherId) => {
		window.notification.confirm(
			e.voucher_deleteVoucher,
			e.voucher_doYouWantToRemoveTheVoucherFromTheList,
			e.voucher_okCancel, (button) => {
                if (Number(button) !== 2) {
                    this.props.removeVoucher(voucherId);
                    this.props.initMyVoucher();
                    this.setState(prevState => ({checked: !prevState.checked}));
				}
			})
	}

	onChangeCheckbox = (voucherId, e) => {
		this.removeVoucher(voucherId);
		this.setState(prevState => ({checked: !prevState.checked}));
	}

	render() {
		const {voucher, cdnMedia, convertIdToURL} = this.props;
		const imgUrl = convertIdToURL(cdnMedia, 'voucher', voucher.normalImageId);
		const {userVoucherId, expirationDate} = voucher;
		const {checked} = this.state;
		return (
			<Container>
				<ImageBlock src={imgUrl} />
				<OptionsBlock voucher={voucher}>
					<DecoratedLink to={url.voucher.details}>
						<DateBlock onClick={this.props.setCurrentVoucher.bind(this, voucher)}>
							<Text>
                                <span>{e.voucher_dateOfExpiry}</span>
                                <DateText>
                                    {moment(expirationDate, moment.ISO_8601).format('YYYY-MM-DD')}
                                </DateText>
							</Text>
						</DateBlock>
					</DecoratedLink>
					<CheckboxBlock>
                        <Checkbox checked={checked} onChange={this.onChangeCheckbox.bind(this, userVoucherId)} />
                        {e.voucher_alreadyInUse}
					</CheckboxBlock>
				</OptionsBlock>
			</Container>
		)
	}
}

const VoucherList = styled.div`
	background-color: #ececec;
	height: calc(100% - 98px);
	overflow: hidden;
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

export default class MyVouchers extends React.Component {
	constructor(props) {
		super(props);
		
		e.setLanguage(props.language)
		
        this.state = {
			myVoucherList: props.myVoucherList
		}
		props.initMyVoucher();
	}

	componentWillReceiveProps(props) {
        e.setLanguage(props.language)

		this.setState({
			myVoucherList: props.myVoucherList
		})
	}

	render() {
        function compareDate(a, b) {
            return Date.parse(b.expirationDate) - Date.parse(a.expirationDate)
        }

		const {cdnMedia, convertIdToURL} = this.props
		const {myVoucherList} = this.state
		let sortedMyVoucherList = []
		if (myVoucherList) {
            sortedMyVoucherList = myVoucherList.sort(compareDate)
		}

		return (
			<MyVouchersContainer>
				<TopBar caption={e.voucher_myCoupons} />
				<VoucherList>
                    <div className='scrollable-wrapper'>
                        {
                            sortedMyVoucherList && sortedMyVoucherList.map((item, index) =>
                                                                               <VoucherItem
                                                                                   convertIdToURL={convertIdToURL}
                                                                                   initMyVoucher={this.props.initMyVoucher}
                                                                                   removeVoucher={this.props.removeVoucher}
                                                                                   setCurrentVoucher={this.props.setCurrentVoucher}
                                                                                   key={index}
                                                                                   voucher={item}
                                                                                   cdnMedia={cdnMedia}
                                                                                   language={this.props.language}
                                                                               />)
                        }
                    </div>
				</VoucherList>
			</MyVouchersContainer>
		)
	}
}
