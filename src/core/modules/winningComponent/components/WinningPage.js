import React    from 'react';
import e        from '../../../../langs';
import styled   from 'styled-components';
// import { Link } from "react-router-dom";
import URL      from '../../../../constants/urlConstants';

const WPageTitle = styled.h1`
	margin: 50px 0 30px;
	padding: 0;
	color: #ff7f00;
	text-transform: uppercase;
	text-align: center;
	font-size: 60px;
	font-weight: bold;
`;
const WPageSubTitle = styled.span`
	display: block;
	font-size: 40px;
  	font-weight: 500;
  	letter-spacing: normal;
  	color: white;
  	text-align: center;
`;
const WPageWrapImage = styled.div`
	position: relative;
	margin: 40px auto 45px;
	width: 480px;
	height: 255px;
	color: white;
	border: solid 4px #434343;
`;
const WPageImage = styled.img`
	display: block;
	width: 100%;
	height: 100%;
`;
const WPageLabel = styled.span`
	position: absolute;
    top: 50%;
    right: 20px;
    font-size: 90px;
    transform: translate(0,-50%);
`;
const WPageInfo = styled.p`
	margin: 0 auto 65px;
	padding: 0;
	width: 490px;
	font-size: 36px;
	font-weight: 500;
	line-height: 1.11;
	text-align: center;
	color: white;	
`;
const WPageBtnBlock = styled.div`
	height: 513px;
	background: #ebebeb;
	&:before {
		content: '';
		display: block;
		background: white;
		height: 1px;
		box-shadow: 2px 0 20px rgba(0,0,0,0.2);
	}
`;
const WPageBtn = styled.button`
	position: relative;
	display: block;
	width: 340px;
	height: 90px;
	margin: 55px auto 55px;
	padding: 30px 0;
	color: #ff7f00;
	font-size: 48px;
	font-weight: bold;
	text-transform: uppercase;
	text-align: center;
	border-radius: 50px;
	border: none;
	border-top: 5px solid white;
	box-shadow: 0 -5px 20px rgba(0,0,0,0.2);

	&:before,
	& span {
		display: block;
		position: absolute;
		z-index: 10;
	}
	&:before {
	    content: '';
		display: block;
	    width: 380px;
	    height: 120px;
	    transform: translate(-20px,-60px);
	    position: absolute;
	    border: 1px solid white;
	    border-radius: 70px;
	    background: linear-gradient(to bottom, rgba(0,0,0,0.2), white);
	}
	& span {
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		line-height: 90px;
		border-radius: 50px;
		background: #ebebeb;
		cursor: pointer;
		border-top: 4px solid white;
		transform: translateY(-4px);
	    box-shadow: 0 10px 10px rgba(0,0,0,0.2);
		
		&:active {
			border-top: 4px solid #ebebeb;
			background: linear-gradient(to bottom, #DEDEDE, #ebebeb, #DEDEDE);
		    box-shadow: 0 5px 5px rgba(0,0,0,0.2);
		}
	}
`;
const WPageDelimiter = styled.hr`
	width: 600px;
	height: 2px;
	margin: 0 auto;
	background: #989898;
	border: none;
	border-bottom: 2px solid white;
	border-radius: 2px;
`;

export default ({ winningOption, history, profile, openResults, setSpinnerPlayed, cdnMedia }) => {
	const label = { bonus: 'BP', credits: 'CR', money: '€', voucher: 'VOUCHER' };
	const type = (winningOption && label[winningOption.type.toLowerCase()]) ? label[winningOption.type.toLowerCase()] : '';
	const imageSrc = type === 'CR' ? 'images/spinner_credits.png' : (
	                    type === '€' ? 'images/spinner_money.png': (
	                    	type === 'VOUCHER' ? `${cdnMedia}voucher/${winningOption.imageId}` : 'images/spinner_bonus.png'));

	const handleOkBtn = () => {
		setSpinnerPlayed();
		openResults(winningOption);
	}
	const amount = winningOption ? winningOption.amount : '';

	return (
		<div>
			<WPageTitle>{e.mywinnings_congratulation}</WPageTitle>
			<WPageSubTitle>{e.mywinnings_yourProfit}</WPageSubTitle>
			<WPageWrapImage>
				<WPageImage src={imageSrc} alt={type} />
				<WPageLabel>{type === 'VOUCHER' ? '' : `${amount} ${type}`}</WPageLabel>
			</WPageWrapImage>
			<WPageInfo>
				{e.mywinnings_inOrderForYourProfitToBeCreditedYouMustBeLoggedIn}
			</WPageInfo>
				{
					profile.loggedIn ?
					(
						<WPageBtnBlock>
							<WPageBtn onClick={handleOkBtn}><span>OK</span></WPageBtn>
						</WPageBtnBlock>
					) :
					(

						<WPageBtnBlock>
							<WPageBtn onClick={() => history.push(URL.register.index) }><span>{e.mywinnings_register}</span></WPageBtn>
							<WPageDelimiter />
							<WPageBtn onClick={() => history.push(URL.login.index) }><span>{e.mywinnings_login}</span></WPageBtn>
						</WPageBtnBlock>
					)
				}
		</div>
	)
}
