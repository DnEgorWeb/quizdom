import React, { Component } from 'react'
import e from '../../../langs'
import styled from 'styled-components'
import TopBar from '../../modules/components/TopBar'
import { MetallicButton, MetallicButtonWrapper } from '../../modules/components/MetallicButton'

const Wrapper = styled.div`
    height: 100%;
    ${'' /* background-color:#ececec; */}
    text-align:center;
`

const Shadow = styled.div`
    height: 40px;
    background-color:#333335;
    box-shadow: 0 8px 10px -4px #333335;
`

const Form = styled.div`
    background: #ececec;
    border-bottom: 1px solid #9d9d9d;
    box-shadow: 0 10px 10px -4px #9d9d9d;
    text-align: center;
    padding-bottom: 55px;
`

const Input = styled.input`
    width: 600px;
    box-sizing: border-box;
    height: 100px;
    border-radius: 50px;
    background-color: #ffffff;
    border: solid 2px #818181;
    font-size: 40px;
    color: #818181;
    padding: 0 35px;
    margin-bottom: 35px;
    margin-top: 45px;
    font-family: Univers-condensed, sans-serif;
`

const Description = styled.p`
    position: relative;
    color: #818181;
    margin: 0;
    font-family: Univers-condensed,sans-serif;
    font-size: 48px;
    margin-bottom: 50px;
`

const CameraWrapper = styled.div`
    position: relative;
    height: 800px;
    background:#ececec;
    padding-top: 50px;
`

class Promocode extends Component {
    constructor(props) {
        super(props)
        e.setLanguage(props.language)
    }

    state = {
        code: ""
    }

    scan = () => {
        if(window.cordova){
            window.cordova.plugins.barcodeScanner.scan(
                (result) => {
                    this.setState({code: result.text})
                },
                function (error) {
                    alert("Scanning failed: " + error);
                }
            );
        }
    }

    componentWillReceiveProps(nextProps) {
        e.setLanguage(nextProps.language)

        if (nextProps.error) {
            window.notification.alert(e.promocode_attention, e.promocode_codeInvalidPleaseCheckYourEntriesAndTryAgain, 'Ok', () => {})
        }
        if (nextProps.answer) {
            window.notification.alert(e.promocode_attention, e.promocode_congratulationsCodeWasRedeemedSuccessfully, 'Ok', () => {})
        }
    }

    inputHandler = (value) => {
        this.setState({
            code: value
        })
    }

    sendCode = () => {
        window.network.send({
            message: 'promocode/promocodeUse',
            content: {
                code: this.state.code
            }
        })
    }

    render() {
        const {code} = this.state
        return (
            <Wrapper>
                <TopBar caption={e.promocode_promoCode} />
                <Shadow/>
                <Form>
                    <Input placeholder={e.promocode_enterPromocode} value={code} onChange={(e) => this.inputHandler(e.target.value)}/>
                    <MetallicButtonWrapper>
                        <MetallicButton onClick={this.sendCode}>
                            {e.promocode_send}
                        </MetallicButton>
                    </MetallicButtonWrapper>
                </Form>
                <CameraWrapper>
                    <Description>{window.cordova ? e.promocode_orScanTheQrCode : e.promocode_scannerIsUnavailable}</Description>
                    {window.cordova ?
                        <MetallicButtonWrapper>
                            <MetallicButton onClick={this.scan}>{e.promocode_scan}</MetallicButton>
                        </MetallicButtonWrapper>
                        :
                        null
                    }
                </CameraWrapper>
            </Wrapper>
        )
    }
}

export default Promocode
