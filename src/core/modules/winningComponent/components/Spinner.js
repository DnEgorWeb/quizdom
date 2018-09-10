import React, {Component} from 'react'
import e from '../../../../langs';
import {SpinnerItem, InfoText, Wrapper, Separator, ExitButtonBlock, Button, ItemInfo} from './styledComponents'

class Spinner extends Component {
    constructor(props) {
        super(props);
        e.setLanguage(props.language)
    }
    
    componentWillReceiveProps(nextProps) {
        e.setLanguage(nextProps.language)
    }

    getResults = () => {
        this.props.setSpinnerDelayed()
        const {gameInstanceId, spinnerInfo} = this.props
        const spinnerType = spinnerInfo.type
        this.props.laterButtonHandler(gameInstanceId, spinnerType);
    }

    render() {
        const {item, cdnMedia} = this.props
        return(
            <Wrapper>
                <InfoText>
                    <div style={{color: '#ff7f00', fontSize: '42px'}}>{e.module_yourChanceToWin}</div>
                    <div>
                        {
                            e.formatString(
                                e.module_with4OrMoreCorrectAnswersYouCanParticipateInThe,
                                <br />,
                                <span style={{color : "#ff7f00"}}>{e.module_megaRaffle}</span>
                            )
                        }
                    </div>
                    <div>{e.module_simplyClickOnTheWinBox}</div>
                </InfoText>
                <SpinnerItem>
                    <img src={`${cdnMedia}app/${item.imageId}`} width={630} onClick={() => this.props.checkItem(item)} alt="spinner"/>
                    <Separator/>
                    <ItemInfo style={{border: '12px solid rgb(50,50,50)'}}>
                        <div style={{position: 'relative', width: '100%', height: '100%', borderRadius: '100%',
                            borderTop: '3px solid #939393', background: 'linear-gradient(to bottom, #474747, #2a2a2a)'}}>
                            <img src="images/01a_info_256.png" width={50} alt="info"/>
                        </div>
                    </ItemInfo>
                </SpinnerItem>
                <ExitButtonBlock>
                    <span>{e.module_notThisTime}</span>
                    <Button onClick={this.getResults}>{e.module_continue}</Button>
                </ExitButtonBlock>
            </Wrapper>
        )
    }
}

export default Spinner