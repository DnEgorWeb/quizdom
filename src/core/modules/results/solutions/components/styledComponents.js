import styled from 'styled-components'

export const SolutionsWrapper = styled.div`
  background: rgb(35,35,36);
  height: calc(100% + 30px);
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  margin-top: -30px;
  padding-top: 20px;
`

export const SolutionsContent = styled.div`
    overflow: hidden;
    height: calc(100% - 238px);
    max-height: calc(100% - 238px);
    position: relative;
    .scrollable-wrapper{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: -17px;
        overflow-y: scroll;@media (max-width: 768px) {
            right: 0;
        }
    }
`

export const QuestionNumbersList = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 20px auto 0 auto;
  padding-left : ${({questionsAmount}) => questionsAmount > 7 ? '90px' : 'auto'};
  padding-right: ${({questionsAmount}) => questionsAmount > 7 ? '90px' : 'auto'};
  width: 710px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  height: 80px;
  user-select: none;
  div:not(:last-child) {
    margin-right: 28px;
  }
`

export const QuestionNumberListWrapper = styled.div`
  height: 100px;
  overflow-x: hidden;
  //width: 100%;
  display: flex;
`

export const QuestionNumberListMiddleBlock = styled.div`
  width: 650px; // ~502
  overflow-x: hidden;
`;
export const QuestionNumberListMiddleBlockInner = styled.div`
  display: flex;
  flex-wrap: nowrap;
  transform: translateX(-${({position}) => position }px);
`;


export const NavigationNextQuestions = styled.div`
  box-sizing: border-box;
  width: 76px;
  height: 76px;
  border-radius: 50%;
  border: 4px solid ${({type}) => {
    switch (type) {
        case 'wrong':
            return 'rgb(227,6,19)';
        case 'right':
            return 'rgb(54,166,0)';
        default:
            return 'rgb(148,148,148)'
    }
}};
  display: flex;
  align-items: center;
  color: white;
  flex-shrink: 0;
  justify-content: center;
  cursor: pointer;
  font-size: 42px;
  background-color: rgb(148,148,148);
  img {
    width: 30px;
  }
`

export const NavigationNextOneQuestion = styled(NavigationNextQuestions)`
  background: ${({isMissedQuestion, isWrongQuestion, isRightQuestion}) => {
    if (!isRightQuestion && (isWrongQuestion || isMissedQuestion)) return 'red'
    else if (isRightQuestion && (isWrongQuestion || isMissedQuestion)) return 'linear-gradient(to top left, red 0%, red 50%, green 51%)'
    else return 'green'
}};
  border: ${({isMissedQuestion, isWrongQuestion, isRightQuestion}) => {
    if (!isRightQuestion && (isWrongQuestion || isMissedQuestion)) return '2px solid red'
    else if (isRightQuestion && (isWrongQuestion || isMissedQuestion)) return 'none'
    else return '2px solid green'
}}
`

export const QuestionNumber = styled.div`
  box-sizing: border-box;
  width: 76px;
  height: 76px;
  border-radius: 50%;
  border: 4px solid ${({type}) => {
    switch (type) {
        case 'wrong':
            return 'rgb(227,6,19)';
        case 'right':
            return 'rgb(54,166,0)';
        default:
            return 'rgb(148,148,148)'
    }
}};
  background: ${({selected, type}) => {
    if (selected) {
        switch (type) {
            case 'wrong':
                return 'rgb(227,6,19)';
            case 'right':
                return 'rgb(54,166,0)';
            default:
                return 'rgb(148,148,148)'
        }
    } else {
        return 'none'
    }
}};
  color: rgb(230,230,230);
  font: 500 52px Univers-condensed;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  cursor: pointer;
`

export const QuestionTextBlock = styled.div`
  width: 710px;
  margin: 47px auto 0;
`

export const QuestionText = styled.div`
  width: 585px;
  height: 155px;
  overflow-x: hidden;
  overflow-y: auto;
  margin: 0 auto;
  
  font-weight: 500;
  font-size: ${({length}) => length>100 ? '26pt' : length>70 ? '28pt' : length>60 ? '32pt' : length>50 ? '36pt': length>32 ? '40pt' : '48pt'};
  font-family: Overpass;
  
  color: white;
  text-align: center;
  //word-break: break-all;
  line-height: 1;
`

export const AnswersBlock = styled.div`
  position: relative;
`
export const AnswersList = styled.div`
  width: 710px;
  margin: 50px auto 0;
  position: relative;
`
export const AnswerButton = styled.div`
    display: flex;
    align-items: center;
    margin: auto;
    box-sizing: border-box;
    padding: 30px;
    width: 708px;
    background-image: linear-gradient(to bottom, #fff, rgb(182,185,189));
    border-bottom: 1px solid #727272;
    position: relative;
    overflow: hidden;
    &:first-child{
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
    }
    &:last-of-type{
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        border-bottom: 0;
    }
`
export const AnswerLetter = styled.div`
  width: 104px;
  height: 104px;
  border-radius: 50%;
  box-shadow: 0 5px 0 white;
  background: ${({type}) => {
    switch (type) {
        case 'wrong':
            return 'linear-gradient(to bottom, rgb(226,6,19), rgb(157,16,6))';
        case 'right':
            return 'linear-gradient(to bottom, rgb(54,165,0), rgb(38,118,0))';
        default:
            return '#414242'
    }
}};

  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  padding-top: 15px;
  margin-right: 30px;
  box-sizing: border-box;

  font: 500 90px Aharoni;
  color: #e6e6e6;
  text-transform: uppercase;
`
export const AnswerText = styled.div`
  font: 500 46px Overpass;
  color: #333;
  word-break: break-all;
  line-height: 1;
`
export const NoAnswerMessage = styled.div`
  width: 650px;
  height: 60px;
  border-radius: 16px;
  background-color: #949494;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%, -50%);
  padding-right: 65px;
  box-sizing: border-box;
  display: ${({showMessage}) => showMessage ? 'block' : 'none'};
`
export const MessageText = styled.div`
  color: #e30613;
  font: 500 36px Overpass;
  text-align: left;
  margin-left: 80px;
`
export const BottomInfoNav = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 20px 20px 0;
  height: 130px;
  margin: 21px auto 0;
  background: url('images/tabs.png') center bottom no-repeat;
  background-color: ${({isAhead}) => isAhead ? 'rgb(65,65,65)' : 'transparent'};
  box-shadow: ${({isAhead}) => isAhead ? '0 -2px 10px rgba(0,0,0,.5)' : 'none'};
  position: fixed;
  bottom: 0px;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: ${({isAhead}) => isAhead ? '102' : '0'};
`
export const InfoItem = styled.div`
  display: inline-block;
  width: 177px;
  height: 110px;
  background: url(${({imgSrc, isEnabled, isActive}) => {
    if (isActive) {
        return 'images/info-close.png'
    }
    return (isEnabled ? imgSrc + '-enabled' : imgSrc) + '.png'
}
    }) center no-repeat;
  cursor: pointer;
`

export const TextBlock = styled.div`
    box-sizing: border-box;
    height: 100%;
    background-color: #f0f0f0;
    border-top-left-radius: 10px;
    overflow: auto;
    font: 500 36px Arial;
    word-break: break-all;
    padding: 25px 20px;
    padding-right: 35px;
`

export const PictureComponentTile = styled.div`
  font: 500 36px Arial;
  margin-bottom: 75px;
  color: white;
  text-align: center;
  margin-right: 46px;
`

export const PictureBlockImage = styled.div`
  width: 525px;
  height: 690px;
  border: 5px solid rgb(215,215,221);
  border-radius: 10px;
  background: url(${({imageSrc}) => imageSrc}) center no-repeat;
  background-size: contain;
  filter: blur(${({blur}) => blur ? 20 : 0}px);
  overflow: hidden;
`


export const CorrectNumber = styled.div`
    width: 52px;
    height: 52px;
    border-radius: 50%;
    box-shadow: 0 5px 0 white;
    background: linear-gradient(to bottom,rgb(54,165,0),rgb(38,118,0));
    position: absolute;
    left: 15px;
    bottom: 15px;
    font: 500 45px Aharoni;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #e6e6e6;
`

const buttonSize      = 320;
// const greyBorderWidth = 25;
const color           = '#323232';
const border          = 4;
const activeBorder    = 20 + border * 2;
const imageSize = buttonSize - border * 2;
const activeImageSize = buttonSize - activeBorder * 2;
const radius          = 10;

export const AnswerImageButton = styled.div`
    position:relative;
    width:  ${buttonSize}px;
    height: ${buttonSize}px;
    //background-image: linear-gradient(to bottom, rgb(29,210,221), rgb(23,172,181));
    //border: 3px solid rgb(215, 215, 221);
    border: ${border}px solid ${({status}) => status === 'right' ? '#349f00' : status === 'wrong' ? '#de0612' : 'rgb(215, 215, 221)'};
    border-radius: ${radius}px;
    margin: 5px;
    padding: 0;
    box-sizing: border-box;
    background: ${color};
    
    img{
    	display: block;
    	position: absolute;
    	top: 50%;
    	left: 50%;
    	transform: translate(-50%, -50%);
        width:  ${({ isActive }) => isActive ? activeImageSize + border : imageSize }px;
        height: ${({ isActive }) => isActive ? activeImageSize + border : imageSize }px;
        border-radius: ${radius - (radius/5)}px;
    }

    .active-frame{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: ${buttonSize}px;
        height: ${buttonSize}px;
        border-radius: ${radius}px;
        overflow: hidden;

        .inside-border{
	        position: absolute;
	        top: 50%;
	        left: 50%;
	        transform: translate(-50%, -50%);
            display: ${({isActive}) => isActive ? 'block' : 'none'};
            width:  ${activeImageSize + border * 2}px;
            height: ${activeImageSize + border * 2}px;
            border: ${border}px solid rgb(215, 215, 221);
            border-radius: ${radius}px;
            box-sizing: border-box;
            overflow:hidden;
            box-shadow:
              -${activeBorder - border * 2}px -${activeBorder - border * 2}px 0 ${color},
              -${activeBorder - border * 2}px  ${activeBorder - border * 2}px 0 ${color},
               ${activeBorder - border * 2}px  ${activeBorder - border * 2}px 0 ${color},
               ${activeBorder - border * 2}px -${activeBorder - border * 2}px 0 ${color};
            z-index: 100;
        //     div {
        //         position:absolute;
        //         width: 118px;
        //         height: 121px;
        //         border-radius: 100%;
        //         left:-9%;
        //         top:-10%;
        //         background-color: rgb(215,215,221);
        //     }
         }
    }
`

const literalTop  = border * 2;
const literalLeft = border * 2;
const literalSize = 110;


export const AnswerLiteral = styled.div`
    position: absolute;
    top: ${literalTop}px;
    left: ${literalLeft}px;
    width: ${literalSize}px;
    height: ${literalSize}px;
    text-align: center;
    font-size: 74px;
    ${({status}) => status === 'right' ? 'background: linear-gradient(to bottom, #349f00, #277700);' : ''}
    ${({status}) => status === 'wrong' ? 'background: linear-gradient(to bottom, #de0612, #92170f);' : ''}
    border-radius: 50%;
    border: ${border * 2}px solid #48484b;
    box-sizing: border-box;
    font-family: Aharoni, sans-serif;
    color: #e6e6e6;
    line-height: ${literalSize}px;
    z-index: 100;
`

export const AnswerLiteralShadow = styled.div`
	position: absolute;
	top: ${literalTop - border}px;
	left: ${literalLeft - border}px;
	width: ${literalSize + border * 2}px;
	height: ${literalSize + border * 2}px;
	border-radius: 50%;
	box-sizing: border-box;
	background: rgb(215, 215, 221);
	z-index: 100;
`

const currentNumSize = 64;
export const CorrectNumberForImage = styled.div`
    width: ${currentNumSize}px;
    height: ${currentNumSize}px;
    border-radius: 50%;
    background: #267500;
    position: absolute;
    left: ${literalSize - (currentNumSize / 2)}px;
    top: 0;
    font: 500 54px Aharoni;
    text-align: center;
    color: #e6e6e6;
    line-height: ${currentNumSize}px;
    z-index: 110;
`

export const AnswerButtonsWrapper = styled.div`
    margin: 20px;
`

export const InnerBox = styled.div`
    margin: auto;
    margin-top: 65px;
    padding: 30px 8px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;    
    background: linear-gradient(to bottom, #575759, transparent);
    border-radius: 15px;
    border-top: 3px solid #949494;
`

export const SpanResult = styled.span`
    font-family: Overpass, sans-serif;
    font-size: 46px;
`