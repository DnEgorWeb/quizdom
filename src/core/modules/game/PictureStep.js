import React from 'react'
import e from '../../../langs'
import styled from 'styled-components'

const QuestionText = styled.div`
    display: flex;
    align-items: center;
	justify-content: center;
    font-size: ${({children}) => children && children.length > 80 ? '26pt' : children.length > 60 ? '28pt' : children.length > 40 ? '30pt' : '32pt'};
    text-align: center;
    color: #ffffff;
    width: 585px;
    margin: auto;
    padding-top: 50px;
    //margin-bottom: 50px;
    font-family: Overpass, Regular, serif ;
    min-height: 250px;
    max-height: 215px;
    overflow-x: hidden;
    overflow-y: hidden;
`

const AcceptAnswerButton = styled.button`
    cursor: pointer;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    color: #1ff2ff;
    display: block;
    width: 300px;
    height: 85px;
    border: none;
    background: linear-gradient(rgb(90,90,90),rgb(49,46,48));
    box-shadow: 0px 4px 3px rgba(40,40,40,1), 0px -2px 0px rgba(255,255,255,1);
    border-radius: 42px;
    font-size: 54pt;
    margin-top: 100px;
    font-weight: bold;
`

const ImgWrapper = styled.div`
    width: 100%;
    height: 900px;
    padding-top: 30px;
    margin: auto;
    margin-top: 65px;
    background: url(images/intro-bg.png) center top no-repeat;
    background-size: 100%;
    text-align: center;
    img{
        margin: auto;
        width: 90%;
        max-height: 900px;
        object-position: top;
        object-fit: cover;
        border: 4px solid rgb(230,230,230);
        border-radius: 9px;
        filter: blur(20px);
        overflow: hidden;
    }
`

const QuestionWrapper = styled.div`
    background-color: #323232;
`

export default class SinglePicture extends React.Component{
    constructor(props) {
        super(props)
        e.setLanguage(props.language)
    }

    state = {
        selectedAnswer: '',
        blockAnswer: false
    }

    componentWillReceiveProps(nextProps) {
        e.setLanguage(nextProps.language)
    }

    componentDidMount = () => {
        this.props.setNewTimer(this.props.countdown, this.props.nextStep)
    }

    getPreviewImage = () => {
        const medias = this.props.question ? this.props.question.medias : null
        let key = ''
        for (let imgKey in medias){
            key = imgKey
        }
        const media = this.props.medias[key]
        return(
            <img src={'data:image/png;base64,' + media} alt=''/>
        )
    }


    render(){
        const questionText = this.props.question && this.props.question.mappings ? this.props.question.mappings[0].text : null
        return(
            <div>
                <QuestionWrapper>
                    <ImgWrapper>
                        <QuestionText>
                            {questionText}
                        </QuestionText>
                        {this.getPreviewImage()}
                    </ImgWrapper>
                    <AcceptAnswerButton onClick={this.props.nextStep}>{e.game_continue}</AcceptAnswerButton>
                    }
                </QuestionWrapper>
            </div>
        )
    }
}
