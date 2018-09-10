import React, {Component} from 'react';
import e from '../../../../../../../../../langs';
import TopBar from '../../../../../../../../modules/components/TopBar'
import ProfilePicture from '../../../../../../../../modules/components/ProfilePicture/ProfilePictureContainer'
import {Wrapper, UserInfo, UserName, Header, ButtonsSection, Column, StyledButtonWrapper, StyledButton, Separator} from './styles/main'

const formatAmount = (amount) => parseFloat(amount).toFixed(2).replace('.', ',')

export default class Main extends Component {
    render() {
        return(
            <Wrapper>
                <TopBar caption={e.highscore_selection} close={this.props.closeHighscore}/>
                <UserInfo>
                    <ProfilePicture size={340}/>
                    <UserName>{e.highscore_tournamentProfit}</UserName>
                    <UserName style={{color: 'white'}}>{formatAmount(this.props.userWinningMoney)} €</UserName>
                </UserInfo>
                <Header>
                    <span>{e.highscore_resultsLists}</span>
                </Header>
                <ButtonsSection>
                    <Column>
                        <StyledButtonWrapper onClick={() => {this.props.openGlobalHighscore(false)}}>
                            <StyledButton>
                                <img alt='' src='images/cup.png'/>
                            </StyledButton>
                        </StyledButtonWrapper>
                        <span>{e.formatString(e.highscore_tournamentClassWithoutGameLevel, <br />)}</span>
                    </Column>
                    <Separator/>
                    <Column>
                        <StyledButtonWrapper onClick={() => {this.props.openGlobalHighscore(true)}}>
                            <StyledButton>
                                <img alt='' src='images/GL.png'/>
                            </StyledButton>
                        </StyledButtonWrapper>
                        <span>{e.formatString(e.highscore_tournamentClassWithGameLevel, <br />)}</span>
                    </Column>
                </ButtonsSection>
                <Column>
                    <StyledButtonWrapper onClick={this.props.openFriendsHighscore}>
                        <StyledButton>
                            <img alt='' src='images/05-freunde-orange.png'/>
                        </StyledButton>
                    </StyledButtonWrapper>
                    <span>{e.highscore_friends}</span>
                </Column>
            </Wrapper>
        )
    }
}