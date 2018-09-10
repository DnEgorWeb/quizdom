import React from 'react'
import styled from 'styled-components'
import TopBar from '../../modules/components/TopBar'
import { MetallicButton, MetallicButtonWrapper } from '../../modules/components/MetallicButton'
import e from '../../../langs'

const Wrapper = styled.div`
  height: 100%;
  background-color:#ececec;
`

const Title = styled.p`
  text-align: center;
  margin: 0;
  padding: 40px 150px;
  font-size: 40px;
  color: #ff7f00;
  background-color: #232323;
  box-shadow: 0 8px 10px -4px #232323;
  text-transform: uppercase;
`

const Form = styled.form`
  text-align:center;
  textarea {
    box-sizing: border-box;
    width: 670px;
    margin: 70px 0;
    padding: 30px;
    height: 500px;
    border-radius: 20px;
    border: 2px solid #808080;
    overflow-x: hidden;
    font-size: 30px;
    font-family: Overpass, sans-serif;
    color: #282828;
    outline: none;
    margin-bottom: 190px;
  }
`

const Feedback = (props) => {
    e.setLanguage(props.language);

    function sendText() {
        const feedbackUrl = window.config.urls.FEEDBACK_URL
        const key = window.config.keys.FEEDBACK_KEY
        const form = new FormData()
        const text = document.getElementById('feedbackText').value
        if (!text) return window.notification.alert(e.feedback_attention, e.feedback_youMustPrintSomethingIntoTheField, 'Ok', () => {})
        const {email} = props

        form.append("email", email)
        form.append("title", "Issue")
        form.append("tags", '["feedback"]')
        form.append("message-body", text)
        form.append("platform-type", "web")
        form.append("app-id", window.config.keys.FEEDBACK_APP_ID)

        return fetch(feedbackUrl, {
            method: 'POST',
            body: form,
            headers: {
                Authorization: 'Basic ' + key,
                Accept: ["application/json", "text/plain", "*/*"],
            }
        })
            .then((res) => {
                if (res.status !== 201) throw new Error("Something is wrong")
                window.notification.alert(e.feedback_attention, e.feedback_thankYouForYourFeedback, 'Ok', () => {})
            })
            .then(() => {
                document.getElementById('feedbackText').value = ""
            })
            .catch((err) => {
                window.notification.alert(e.feedback_attention, err.message, 'Ok', () => {})
            })
    }

    return(
        <Wrapper>
            <TopBar caption={e.feedback_feedback} />
            <Title>{e.feedback_weLookForwardToYourAttractions}</Title>
            <Form action="">
                <textarea name="feedback" id="feedbackText"/>
            </Form>
            <MetallicButtonWrapper>
                <MetallicButton onClick={sendText}>{e.feedback_send}</MetallicButton>
            </MetallicButtonWrapper>
        </Wrapper>
    )
}

export default Feedback