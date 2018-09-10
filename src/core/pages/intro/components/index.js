import React, {  Component } from 'react'
import Carousel from 'nuka-carousel'
import {withRouter } from 'react-router-dom'
import styled from 'styled-components'
// import bg from './img/intro-bg.png'
import decorator from './decorators'

const StartButton = styled.button`
    border: none;
    border-radius: 42px;
    display: block;
    width: 292px;
    margin: 0 auto;
    height: 85px;
    background: linear-gradient(rgb(90,90,90),rgb(49,46,48));
    font: 900 48px FranklinGothic-Demi;
    font-family: 'Franclin-gothic-demi';
    color: #1ff2ff;
    box-shadow: 0px 4px 3px rgba(40,40,40,1), 0px -2px 0px rgba(255,255,255,1);
    cursor: pointer;

    &:active {
        background: linear-gradient(rgb(49,46,48), rgb(90,90,90));
        box-shadow: 0px -1px 3px rgba(40, 40, 40, 1);
    }

    &:focus {
        outline: none;
    }
`

/*const getIntroHeight = () => {
    const appHeight = 1334 //высота без масштабировнаия
    const containerHeight = 1100 //высота контейнера с картинкой
    const containerRatio = containerHeight / appHeight //отнршение высоты контейнера относительно высоты экрана
    const height = (window.innerHeight * containerRatio) / window.appScale;
    return height > containerHeight ? containerHeight : height
}*/

const Picture = styled.div`
    border: 4px solid rgb(230,230,230);
    border-radius: 9px;
    width: 679px;
    height: 1100px;
    box-sizing: border-box;
    background: url(${props => props.source}) center rgb(0, 107, 45) no-repeat;
    background-size: cover;

    display: flex;
    justify-content: center;
    align-items: center;

    color: rgb(230,230,230);
    font-size: 160px;
    margin: 0 auto 20px auto;
`

const Wrapper = styled.div`
    .slider-decorator-0, .slider-decorator-1{
        display: none;
    }
    background: url('images/intro-bg.png') center top no-repeat;
    background-size: contain;
    background-color: rgb(50,50,50);

    padding: 30px 0 60px 0;

    //height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    box-sizing: border-box;

    li.slick-active {
        div {
            background: rgb(31, 242, 255);
        }
    }
    
	
        li button {
            height: 22px !important;
            width:  22px !important;
        }
    }

    li > button {
        height: 22px !important;
        width:  22px !important;
    }
`

class Intro extends Component{

    state = {
        autoplay: true,
        wrapAround: true
    }

    closeIntroTimeout = null

    componentDidMount() {
        if (this.state.wrapAround) {
            setTimeout(() => {
                this.setState({wrapAround: false})
            }, 0)
        }
    }

    beforeSlide = (currentSlide,nextSlide)=>{

        let images = this.props.introType === 'hello' ? this.props.images : this.props.secondImages

        if((currentSlide > nextSlide)){
            this.setState({autoplay: false})
            window.clearTimeout(this.closeIntroTimeout)
        }

        if(nextSlide === images.length - 1 &&  this.state.autoplay){
            this.closeIntroTimeout = setTimeout(this.props.closeIntro, 7000)
        }

    }

    checkDragging = () => {
        document.onmousemove = () => {
            if(!this.state.dragging){
                this.setState({dragging: true})
            }
        }
    }

    closeDragging = (url) => {
        if(!this.state.dragging && url){
            this.props.history.push('/game/' + url.toLowerCase())
            this.props.closeIntro()
        }
        document.onmousemove = null
        this.setState({dragging: false})
    }

    render(){
        const {images, secondImages} = this.props || [];
        return(
            <Wrapper>
                {
                    this.props.introType === 'hello' ?
                        <div>
                            <Carousel
                                decorators={decorator}
                                wrapAround={this.state.wrapAround}
                                autoplay={this.state.autoplay}
                                autoplayInterval={7000}
                                afterSlide={this.afterSlide}
                                beforeSlide={this.beforeSlide}
                                >
                              {images.map((image, index) => <div key={index}><Picture source={image} /></div>)}
                           </Carousel>
                        </div>
                    :
                        <div>
                             <Carousel
                                 decorators={decorator}
                                 wrapAround={this.state.wrapAround}
                                 autoplay={this.state.autoplay}
                                 autoplayInterval={7000}
                                 afterSlide={this.afterSlide}
                                 beforeSlide={this.beforeSlide}
                                 >
                               {secondImages.map((image, index) => <span onMouseLeave={()=>{
                                   this.setState({dragging: false})
                                   document.onmousemove = null
                               }} onMouseDown={() => {this.checkDragging()}} onMouseUp={() => {this.closeDragging(image.redirect)}} key={index}><div ><Picture source={image.url} /></div></span>)}
                            </Carousel>
                        </div>
                }
                <div style={{marginTop: 49}}><StartButton autoFocus={true} onClick={this.props.closeIntro}>START</StartButton></div>
                
            </Wrapper>
        )
    }
}

export default withRouter(Intro)
