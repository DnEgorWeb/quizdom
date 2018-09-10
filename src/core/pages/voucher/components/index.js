import React from 'react'
import e from '../../../../langs'
import styled from 'styled-components'
import TopBar from '../../../modules/components/TopBar'
import Carousel from 'nuka-carousel'
import decorator from './decorators'
import {MetallicButtonWrapper, MetallicButton} from '../../../modules/components/MetallicButton'
import SubMenu from '../../../modules/components/SubMenu'
import AccountBalanceBar from '../../../modules/components/AccountBalanceBar'
import { Link } from 'react-router-dom'
import url from '../../../../constants/urlConstants'

const VoucherWrapper = styled.div`

`

const VoucherSliderWrapper = styled.div`

`

const VoucherSliderTitle = styled.div`
	padding: 60px 33px 30px;
	background: rgb(236,236,236);
	font: 900 30px Overpass;
	color: #333333;
	text-transform: uppercase;
	span {
		font: 900 56px Univers-condensed;
		color: #ff7f00;
	}
`

const VoucherPicture = styled.div`
	width: 750px;
	height: 386px;
	background: url(${props => props.imgSrc}) center no-repeat;
    background-size: cover;
`

const CarouselWrapper = styled.div`
	.slider-decorator-0, .slider-decorator-1{
        display: none;
    }
    .slider-decorator-2 {
		width: 100%;
		height: 48px;
		position: static !important;
		transform: translate(0,0) !important;
    }
    .slider-frame {
    	height: 581px !important;
    }
`

const VoucherSlider = props => {
	return (
		<VoucherSliderWrapper>
			<VoucherSliderTitle>
                {
                    e.formatString(
                        e.voucher_exchangeCouponsAgainst,
                        <br/>,
                        <span>{`${props.voucher.bonuspointsCosts} BP`}</span>
                    )
                }
			</VoucherSliderTitle>
			<VoucherPicture imgSrc={props.convertIdToURL(props.cdnMedia, 'voucher', props.voucher.normalImageId)}/>
		</VoucherSliderWrapper>
	)

}

const BottomContainer = styled.div`
	height: 512px;
	background-color: #ececec;
	overflow: hidden;
`

const ChangeButtonWrapper = styled(MetallicButtonWrapper)`
	position: relative;
	margin-top: 50px;
`

const ChangeButton = styled(MetallicButton)`
	box-shadow: 0 4px 10px rgba(0,0,0,.5), 0 -4px 0 white, 0 -8px 0 rgb(224,224,224);
	&:active {
		box-shadow: 0 2px 4px rgba(0,0,0,.5);
		transform: translate(-50%, -50%) translate(0, 2px);
	}
`

const InfoButtonWrapper = styled(MetallicButtonWrapper)`
	height: 134px;
	width: 134px;
	border-radius: 50%;
	position: absolute;
	top: -13px;
    right: -169px;
`

const InfoButton = styled(ChangeButton)`
	width: 94px;
	height: 94px;
	border-radius: 50%;
	background: url("images/info.png") center rgb(249,249,249) no-repeat;
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
	background: url("images/assess.png") center rgb(249,249,249) no-repeat;
`

const MyVoucherButtonWrapper = styled(AssessButtonWrapper)``

const MyVoucherButton = styled(AssessButton)`
	background: url("images/my-voucher.png") center rgb(249,249,249) no-repeat;
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
    width: 215px;
    text-align: center;
    left: 50%;
    transform: translate(-50%,0);
`

const VoucherInfoWrapper = styled.div`
	font-family: Arial;
	font-size: 36px;
	color: #333333;
	h3 {
		font-weight: 900;
	}
	h3, p {
		margin: 0;
	}
`

const VoucherInfo = props => (
	<VoucherInfoWrapper>
		<h3>{props.title}</h3>
		<p>{props.description}</p>
	</VoucherInfoWrapper>
)

class Voucher extends React.Component {
	constructor(props) {
		super(props);
		e.setLanguage(props.language)
		props.initVoucher();
		this.state = {
			currentVoucher: 0,
			submenuCurrentVoucher: null,
		}
	}
	
	componentWillReceiveProps(nextProps) {
	    e.setLanguage(nextProps.language)
    }

	beforeSlide = (oldSlide, newSlide) => {
		let currentVoucher = newSlide;
		this.setState({currentVoucher, submenuCurrentVoucher: null})
	}

	openVoucher = () => {
		const {currentVoucher} = this.state;
		this.setState({submenuCurrentVoucher: currentVoucher})
	}

	voucherPurchaseWithConfirm = (voucherId) => {
		const {currentVoucher} = this.state;
		const voucherList = this.props.voucherList || this.state.voucherList;
		const {bonuspointsCosts} = voucherList[currentVoucher]
		const {bonus} = this.props
		if (bonus<bonuspointsCosts) {
            window.notification.alert(e.voucher_attention, e.voucher_youDontHaveEnoughBp, 'Ok', () => {})
		} else {
            window.notification.confirm(
                e.voucher_exchangeVoucher,
                e.formatString(
                    e.voucher_wantToExchangeTheVoucherForBonusPoints,
                    bonuspointsCosts
                ),
                'Ok,Cancel', (button) => {
                    if (Number(button) !== 2) {
                        this.props.voucherPurchase(voucherId)
					}
                })
		}
	}

	voucherAssessWithConfirm = (voucherId) => {
		window.notification.confirm(
			e.voucher_voucherRate,
			e.voucher_doYouLikeThisCoupon,
			e.voucher_okCancel,
            (button) => {
                if (Number(button) !== 2) {
                    this.props.voucherAssess(voucherId)
				}
			})
	}

	render() {
		const {currentVoucher, submenuCurrentVoucher} = this.state;
        const voucherList = this.props.voucherList || [];
		const {cdnMedia, bonus, convertIdToURL} = this.props;
		const VoucherInfoList = voucherList.map(voucher => <VoucherInfo title={voucher.title} description={voucher.description}/>)
		const currentVoucherId = voucherList[currentVoucher] ? voucherList[currentVoucher].voucherId : 0;
		return (
			<VoucherWrapper>
				<TopBar caption={e.voucher_voucher} />
				<AccountBalanceBar
					balance={bonus}
					current={currentVoucher + 1}
					max={voucherList.length}
					color='#ff7f00' />
				<CarouselWrapper>
					<Carousel
						decorators={decorator}
						beforeSlide={this.beforeSlide}
					>
						{
						    voucherList.map((voucher, index) => (
						        <VoucherSlider
                                    convertIdToURL={convertIdToURL}
                                    key={index}
                                    cdnMedia={cdnMedia}
                                    voucher={voucher}
                                />
                            ))
						}
					</Carousel>
				</CarouselWrapper>
				<BottomContainer>
					<ChangeButtonWrapper>
						<ChangeButton
                            onClick={this.voucherPurchaseWithConfirm.bind(null, currentVoucherId)}
                        >
                            {e.voucher_exchange}
                        </ChangeButton>
						<InfoButtonWrapper>
							<InfoButton onClick={this.openVoucher} />
						</InfoButtonWrapper>
					</ChangeButtonWrapper>
					<ButtonsContainer>
						<AssessButtonWrapper>
							<AssessButton onClick={this.voucherAssessWithConfirm.bind(this, currentVoucherId)} />
							<Description>
                                {e.voucher_rateCoupon}
							</Description>
						</AssessButtonWrapper>
						<MyVoucherButtonWrapper>
							<Link to={url.voucher.my}>
								<MyVoucherButton/>
							</Link>
							<Description>
                                {e.voucher_myCoupons}
							</Description>
						</MyVoucherButtonWrapper>
					</ButtonsContainer>
				</BottomContainer>
				<SubMenu
					title={e.voucher_couponDetails}
					currentIndex={submenuCurrentVoucher}
					componentList={VoucherInfoList}
				/>
			</VoucherWrapper>
		)
	}
}

export default Voucher;
