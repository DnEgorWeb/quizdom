import React from 'react'
import e from '../../../../langs'
import styled from 'styled-components'
import moment from 'moment'
import TopBar from '../../../modules/components/TopBar'

const VoucherDetailsWrapper = styled.div`
	height: 100%;
	box-sizing: border-box;
	background: #ececec;
`

const DetailsBlock = styled.div`
	position: relative;
	height: calc(100% - 98px);

	overflow: hidden;
    max-height: calc(100% - 98px);
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

const VoucherTitle = styled.div`
	background: rgb(52,52,53);
	padding: 30px 0 35px;
	font: 900 30px Overpass;
	text-align: center;
	color: #b4b4b4;
	text-transform: uppercase;

	& > span {
		font-family: Univers-condensed;
		font-size: 56px;
		color: #ff7f00;
	}
`

const VoucherImage = styled.div`
	height: 420px;
	position: relative;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.35);
	background: url(${props => props.src}) center top no-repeat;
	background-size: cover;
	&:after {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 35px;
		background: rgb(52,52,53);
	}
`

const DateBlock = styled.div`
	position: relative;
	margin: 0 20px;
	padding: 28px 0 20px;

	font: 900 26px Overpass;
	text-align: center;
	color: #737373;
	text-transform: uppercase;
	&:after {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 4px;
		background-image: linear-gradient(to bottom, rgb(198,198,198), white);
	}
`

const Date = styled.div`
	font: 900 48px Univers-condensed;
	color: #ff7f00;
`

const CodeBlock = styled(DateBlock)``

const Code = styled(Date)`
	color: #333334;
`

const TextBlock = styled.div`
	font: 500 36px Arial;
	color: #333333;
	padding: 30px;
`

const formatPrice = (value) => {
	return `${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} BP`
}

const VoucherDetails = props => {
	const {currentVoucher, voucherImgUrl} = props;
	const {isWon, bonuspointsCosts} = currentVoucher
	const voucherHeader = isWon ? e.voucher_voucher : e.voucher_couponExchanged
	const voucherTypeHeader = isWon ? e.voucher_won : formatPrice(bonuspointsCosts)
	const expirationDate = currentVoucher && currentVoucher.expirationDate
	return (
		<VoucherDetailsWrapper>
			<TopBar caption={e.voucher_couponDetails} />
			<DetailsBlock>
				<div className='scrollable-wrapper'>
					<VoucherTitle>
                        {voucherHeader}<br /> <span>{voucherTypeHeader}</span>
					</VoucherTitle>
					<VoucherImage src={voucherImgUrl} />
					<DateBlock>
                        {e.voucher_dateOfExpiry}
                        <Date>{moment(expirationDate, moment.ISO_8601).format('YYYY.MM.DD')}</Date>
					</DateBlock>
					<CodeBlock>
                        {e.voucher_couponCode}
                        <Code>{currentVoucher.userVoucherId}</Code>
					</CodeBlock>
					<TextBlock>
						{currentVoucher && currentVoucher.description}
					</TextBlock>
				</div>
			</DetailsBlock>
		</VoucherDetailsWrapper>
	)
}

export default VoucherDetails;
