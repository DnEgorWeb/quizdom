import React, {Component} from 'react';
import styled             from 'styled-components';
import URL                from "../../../../constants/urlConstants";
import e                  from "../../../../langs";
import verificationOfAge  from '../../../../services/verificationOfAge';

const heightBox = 118.2;
const unit      = 'vh';

const SelectedSpinnerInfoContainer = styled.div`
	min-height: ${heightBox}${unit};
	display: flex;
	flex-direction: column;
	
	* {
		font-family: Univers, serif;
	}
`;

const Block = styled.div`
	min-height: 50%;
	box-sizing: border-box;
`;

const SSITopBlock = styled(Block)`
    flex: 1 0 50%;
	border-bottom: 2px solid #ebebeb;
`;

const SSIBottomBlock = styled(Block)`
	background: #ebebeb;
	box-shadow: inset 0px 8px 8px rgba(0,0,0,0.2);
	text-align: center;
`;

const Delimiter = styled.hr`
    box-shadow: 0 0 5px rgba(0,0,0,0.7);
    border: none;
    height: 2px;
    background: rgb(150,150,150);
`;

const SSITitle = styled.h1`
	margin: 53px 0 0;
	padding: 0;
	font-family: Univers,serif;
	font-size: 2.6rem;
	font-weight: bold;
	text-align: center;
	color: #ff7f00;
	text-transform: uppercase;
`;

const SSIImageContainer = styled.div`
	margin: 35px 0 0;
	
	img {
		display: block;
		margin: 0 auto;
		width: ${256 * 1.93}px;
		height: 256px;
		border: solid 4px #434343;
	}
`;

const TextBox = styled.p`
	margin: 0 auto;
	padding: 40px 0;
	width: 80%;
	text-align: center;
	font-size: 34px;
	font-weight: bold;

	span {
		display: block;
		color: #ff7f00;
	}
`;

const SSIInfo = styled(TextBox)`
	color: white;
`;

const SSIDescription = styled(TextBox)`
	color: #333333;
`;

const SSIBtnBlock = styled.div`
    padding: 20px 0 40px;
	display: flex;
	justify-content: space-evenly;
	text-align: center;
`;

const btnW      = 260;
const btnH      = 110;
const btnRadius = 70;
const SSIButton = styled.button`
	position: relative;
	margin: ${({ big }) => big ? 60 : 40}px 40px;
	width: ${({ big }) => big ? btnW + 100 : btnW}px;
	height: ${btnH}px;
	color: #ff7f00;
	text-transform: uppercase;
	font-weight: bold;
	font-size: 2.3rem;
	text-align: center;
	border-radius: ${btnRadius}px;
	border: 1px solid white;
	background: linear-gradient(to bottom, #ccc, white);
	cursor: pointer;
	transition-duration: 0.2s;

	&:before {
		content: '${({ children }) => children}';
		display: block;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: #eaeaea;
		width:  ${({ big }) => btnW - (Math.round(btnW / 7)) + (big ? 100 : 0)}px;
		height: ${btnH - (Math.round(btnH / 4))}px;
		line-height: ${btnH - (Math.round(btnH / 7))}px;
		border-radius: ${btnRadius}px;
		box-shadow: 0 -3px 0px rgba(100,100,100,0.1), 0 5px 20px rgba(0,0,0,0.3);
	    border: none;
	    border-top: 3px solid white;
	}
	
	&:active {
		transition-duration: 0s;
	}
	&:active:before {
		box-shadow: 0 -3px 0px rgba(100,100,100,0.1), 0 3px 5px rgba(0,0,0,0.3);
	}
`;

const HiddenBackLink = styled.a`
	position: fixed;
	top: 43px;
    left: 32px;
    width: 104px;
    height: 90px;
	background: transparent;
`;

export default class SelectedSpinnerInfo extends Component {
	constructor(props) {
		super(props)
		e.setLanguage(props.language)
	}

	state = {
		showGoRegistrBtn: false
	}

	handleBtn = (flag) => {
		const {
                  profile: {roles = [], person: {birthDate}},
                  goBack,
                  history,
			      selectedItem
              } = this.props;

		if(roles.includes('REGISTERED')) {
			if(birthDate) {
                const legalAge = verificationOfAge(birthDate, 18);

                if(!legalAge) {
                    window.notification.alert(
                        'Hinweis',
                    	'für die teilnahme musst du über 18 jahre alt sein.',
						'ok',
						goBack
					);
				} else {
	                this.props.checkItem(selectedItem);
                }
			} else {
                window.notification.confirm(
                    'Hinweis',
                    'für die teilnehmer musst du über 18 jahre alt sein. Willst du jetzt dein geburtsdatum eintragen?',
                    ["ok", "cancel"],
                    () => {
                        history.push(URL.profile.index);
					}
                );
			}
		} else {
			this.setState({ showGoRegistrBtn: flag });
		}
	}

	render() {
		const { goBack, history, cdnMedia, selectedItem: item} = this.props;

		return (
			<SelectedSpinnerInfoContainer>
				<SSITopBlock>
					<SSITitle>{e.mywinnings_yourChanceToWin}</SSITitle>
					<SSIImageContainer>
						<img src={`${cdnMedia}app/${item.imageId}`} alt={item.type} />
					</SSIImageContainer>
					<SSIInfo>{
							e.formatString(
								e.mywinnings_participationFee,
								<span>{ `${item.amount} ${item.currency.toLowerCase()}` }</span>,
								e.formatString(
									e.mywinnings_withOrMoreCorrectAnswersYouCanParticipateInThe,
									item.correctAnswerPercent,
									<span>{e.mywinnings_megaRaffle}</span>
								)
							)
					}</SSIInfo>
				</SSITopBlock>
				{
					this.state.showGoRegistrBtn ?
					<SSIBottomBlock>
						<SSIButton big onClick={() => history.push(URL.register.index) }>register</SSIButton>
						<Delimiter />
						<SSIButton big onClick={() => history.push(URL.login.index) }>login</SSIButton>
						<HiddenBackLink onClick={this.handleBtn.bind(null, false)}/>
					</SSIBottomBlock>
					:
					<SSIBottomBlock>
						<SSIDescription>{
							e.formatString(
								e.mywinnings_forOrLessCorrectAnswersTheEntryFeeIsLostDoYouWantToRiskIt,
								item.correctAnswerPercent
							)
						}</SSIDescription>
						<SSIBtnBlock>
							<SSIButton onClick={ this.handleBtn.bind(null, true) }>{e.mywinnings_yes}</SSIButton>
							<SSIButton onClick={ goBack }>{e.mywinnings_no}</SSIButton>
						</SSIBtnBlock>
					</SSIBottomBlock>
				}
			</SelectedSpinnerInfoContainer>
		);
	}
};