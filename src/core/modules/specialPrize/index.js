import React from 'react'
import e from '../../../langs';
import styled from 'styled-components'

const Wrapper = styled.div`
  height: 100%;
  padding: 20px 20px;
  background-color:#232324;
  font-family: Overpass, sans-serif;
  margin-top: -30px;
  position:relative;
`

const MainContainer = styled.div`
  box-sizing: border-box;
  padding: 40px 15px 20px 15px;
  border-radius: 20px;
  border-top: 2px solid #939393;
  background:linear-gradient(to bottom, #48484b, #242425);
  text-align:center;
`

const Description = styled.div`
  text-align:center;
  font-size: 36px;
  margin-bottom: 40px;
  overflow:hidden;
  span {
    color: #e6e6e6;
    white-space: nowrap;
  }
`

const Header = styled.div`
  color: #ffe600;
  overflow: hidden;
  white-space: nowrap;
`

const Image = styled.img`
  box-sizing: border-box;
  max-height: 900px;
  width: 100%;
  border-radius: 15px;
  border: 4px solid #d7d7d7;
`

const Button = styled.div`
  box-sizing: border-box;
  width: 345px;
  padding: 20px 30px;
  border-radius: 45px;
  border-top: 2px solid white;
  border-bottom: 2px solid #1b1b1b;
  background: linear-gradient(to bottom, #48484b, #2a272a);
  margin-left: auto;
  margin-right: auto;
  margin-top: 45px;
  text-align:center;
  font-size: 48px;
  color: #1ff2ff;
  text-shadow: 0 -4px 0 #272729;
  cursor: pointer;
  position:absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 50px;
`

const SpecialPrize = (props) => {
    function showNotification() {
        window.notification.alert(e.module_attention, e.module_allInformationAboutTheSpecialPrizeHasBeenSentToTheUserProfileEMailAddress, e.module_ok, () => {

            props.closeComponent()
        })
    }

    const {voucher, cdnMedia} = props
    let title = "Prize"
    let description = "description"
    let imageSrc = ""
    if (voucher) {
        title = voucher.title
        description = voucher.description
        imageSrc = voucher.normalImageId
    }

    return (
        <Wrapper>
            <MainContainer>
                <Description>
                    <Header>{title}</Header>
                    <span>{description}</span>
                </Description>
                <div>
                    <Image src={`${cdnMedia}voucher/${imageSrc}`} alt="" />
                </div>
            </MainContainer>
            <Button onClick={showNotification}><span>{e.module_continue}</span></Button>
        </Wrapper>
    )
}

export default SpecialPrize
