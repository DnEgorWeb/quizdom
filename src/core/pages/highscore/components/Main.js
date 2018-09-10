import React, {Component} from 'react';
import e from '../../../../langs'
import TopBar from '../../../modules/components/TopBar'
import ProfilePicture from '../../../modules/components/ProfilePicture/ProfilePictureContainer'
import {
    Wrapper,
    UserInfo,
    UserName,
    Header,
    ButtonsSection,
    Column,
    StyledButtonWrapper,
    StyledButton,
    Separator,
    SpanUppercase
} from './styles/main'


export default class Main extends Component {
    constructor(props) {
        super(props)
        e.setLanguage(props.language)
        this.props.getFriends()
        this.props.getLeaderboard()
        this.props.getPlayerPosition()
    }
    
    componentWillReceiveProps(nextProps) {
        e.setLanguage(nextProps.language)
    }

    render() {
        return(
            <Wrapper>
                <TopBar caption={e.highscore_highscore}/>
                <UserInfo>
                    <ProfilePicture size={340}/>
                    <UserName>{`${this.props.user.firstName || 'Firstname'} ${this.props.user.lastName || 'Lastname'}`}</UserName>
                </UserInfo>
                <Header>
                    <SpanUppercase>{e.highscore_ranking}</SpanUppercase>
                </Header>
                <ButtonsSection>
                    <Column>
                        <StyledButtonWrapper onClick={() => {this.props.openComponent('showFriends')}}>
                            <StyledButton>
                                <img alt='' src='images/05-freunde-orange.png'/>
                            </StyledButton>
                        </StyledButtonWrapper>
                        <SpanUppercase>{e.highscore_friends}</SpanUppercase>
                    </Column>
                    <Separator/>
                    <Column>
                        <StyledButtonWrapper onClick={() => {this.props.openComponent('showAll')}}>
                            <StyledButton>
                                <img alt='' src='images/world.png'/>
                            </StyledButton>
                        </StyledButtonWrapper>
                        <SpanUppercase>
                            {e.formatString(e.highscore_allPlayersTop100, <br/>)}
                        </SpanUppercase>
                    </Column>
                </ButtonsSection>
            </Wrapper>
        )
    }
}