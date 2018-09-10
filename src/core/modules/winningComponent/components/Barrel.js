import React, {Component} from 'react'
import e                  from '../../../../langs';

import {
    SpinnerWrapper, Stars, StarImg, OuterWrapper, InnerWrapper, BlueInnerWrapper,
    BlueWrap, SpinnerBarrelWrapper, SpinnerBarrel, SpinnerImg, StyledButtonWrapper,
    StyledButton, StyledInfoItem, /*BlueSpinnerWrapper, */ Arrow,
    SpinnerContainer, Slide
} from './styledComponents'
import InfoPanel from './infoPanel';

class Barrel extends Component {
    constructor(props) {
        super(props);
        e.setLanguage(props.language);
        const {
            winningComponentId,
            userWinningComponentLoad
        } = props;

        if (winningComponentId && userWinningComponentLoad)
            userWinningComponentLoad(winningComponentId);

	    this.startWinningComponent()
    }

    isRolled = false;

    state = {
	    canRolle    : false,
	    textButton  : e.module_start,
	    canPressStop: true,
	    infoPanel   : false
    };

    /*
    componentWillMount() {
       st {gameInstanceId, infoItem} = this.props
        const spinnerInfo = this.props.spinnerInfo || infoItem
        const spinnerType = spinnerInfo && spinnerInfo.type
        if(!this.isRolled) {
            typeof this.props.assignWinningComponent === 'function' &&
            this.props.assignWinningComponent(gameInstanceId, spinnerType);
        }
    }
    */

    componentWillReceiveProps(nextProps) {
        /*if (nextProps.winningComponentId !== this.props.winningComponentId) {
            this.props.startWinningComponent(nextProps.winningComponentId)
        }*/

        if (nextProps.winningOption) {
            this.setState({canRolle: true})
        }

        e.setLanguage(nextProps.language);
    }

    startWinningComponent = () => {
	    if (this.props.winningComponentId)
	        this.props.startWinningComponent(this.props.winningComponentId);
    }

    getOptionsValues = (type) => {
        switch (type) {
            case "BONUS" :
                return "images/spinner_bonus.png";
            case "CREDITS" :
                return "images/spinner_credits.png";
            default: return "images/spinner_money.png";
        }
    }

    announceWinning = () => {
        this.props.showWinning();
    }

    /**
     *  starts spinning
     */
    rollSpinner = () => {
        const speed = 50;
        // спинер стартует, если он уже не вращается или останавливается, если уже не остановился.
        // в остальных случаях ничего не происходит
        if(this.isStopped || (this.isRolled && this.step < speed)) return false;
        this.isRolled = !this.isRolled;

        if (this.isRolled) this.props.protectTopBarBtn(true);

        // выключение кнопик STOP
        this.setState({textButton: '', canPressStop: false});

        const containerHeight = this.spinContainer ? this.spinContainer.clientHeight : 750;
        const _SELF           = this;
        const shortcoming     = 40;
        let slides            = this.slides;
        let winningSlide      = [{}];
        this.step             = this.step || 1;
        let first             = slides[0];
        let last              = slides[slides.length - 1];
        let t1;


        // todo: для демонстрации
        const fakePrizedElem = ([
            {winningOptionId: '19-0'}, {winningOptionId: '19-1'},
            {winningOptionId: '19-2'}, {winningOptionId: '19-3'},
            {winningOptionId: '19-4'}, {winningOptionId: '19-5'},
            {winningOptionId: '19-6'}, {winningOptionId: '19-7'},
            {winningOptionId: '19-8'}
        ][Math.round(-0.5 + Math.random() * (7 + 1))]);

        // функция вращения спинера
        (function roll() {
            // остановка спинера после 5ти секунд вращения
            if(_SELF.step === speed && _SELF.isRolled)
                setTimeout(() => { _SELF.isStopped = true; _SELF.isRolled = false }, 5000);

            // включение кнопки STOP
            if(_SELF.step === speed) _SELF.setState({ textButton: e.module_stop, canPressStop: true });

            // движение слайдов
            slides.forEach(item => {
                first = item.top < first.top ? item : first;
                last  = item.top > last.top  ? item : last;
                item.top = item.top - _SELF.step;
                if (_SELF[item.ref]) _SELF[item.ref].style.top = `${item.top}px`;
            });

            // перемещение последнего слайда в начало очереди
            if(last.top <= containerHeight + 10) {
                first.top = containerHeight + first.slideHeight;
                if (_SELF[first.ref]) _SELF[first.ref].style.top = `${first.top}px`;
            }

            // присваивание выигрышного компонента
            // const prizedElem = _SELF.props.winningOption;
            // todo: для демонстрации
            // const appId = window.config.appInitialConfig.APP_ID;
            const gameId = '339';// appId === '9' ? '959' : '339';

            const prizedElem = (_SELF.props.gameId === gameId) ? fakePrizedElem : _SELF.props.winningOption && _SELF.props.winningOption;

            if(prizedElem) {
                slides.forEach(i => {
                    if(i.winningOptionId === prizedElem.winningOptionId) winningSlide = i;
                    if(!winningSlide) winningSlide = slides.filter(el => el.winningOptionId !== undefined)[0];
                });
            }

            if(_SELF.isRolled) {
                if(!t1) t1 = performance.now();
                const t2 = performance.now();

                if(Math.floor(t2 - t1) > 50) {
                    t1 = t2;
                    if(_SELF.step < speed) _SELF.step++;
                }

                cancelAnimationFrame(_SELF.rollId);
                _SELF.rollId = requestAnimationFrame(roll);
            } else if (winningSlide){
                const finish   = winningSlide.top;
                const start    = containerHeight / 2 - first.slideHeight / 2 + shortcoming;
                const distance = finish - start;

                _SELF.isStopped = true;

                // торможение спинера
	            if (start === finish || start === (finish - 1) || start === (finish + 1) ) {
		            _SELF.setState({ textButton: 'ok', canPressStop: true });
		            // остановка в нужном месте
		            // отправка запроса
		            cancelAnimationFrame(_SELF.rollId);
		            _SELF.props.stopWinningComponent(_SELF.props.winningComponentId);
		            // _SELF.announceWinning(winningSlide.amount, _SELF.props.freeWinningComponent);

		            _SELF.props.protectTopBarBtn(false);
		            return true;
	            } else if(start !== finish) {
                    if (!t1) t1 = performance.now();
                    const t3 = performance.now();

                    // торможение раз в 300ms
                    if (Math.floor(t3 - t1) > 300) {
                        if (start < finish) {
                            const step = Math.floor(distance / 30) + 1;

                            t1         = t3;
                            _SELF.step = step > _SELF.step ? _SELF.step-- : step;
                        }
                    }

                    cancelAnimationFrame(_SELF.rollId);
                    _SELF.rollId = requestAnimationFrame(roll);
                }
            } else {
                cancelAnimationFrame(_SELF.rollId);
                _SELF.rollId = requestAnimationFrame(roll);
            }
        })();
    }

    getShortAmountName = (name) => {
        switch(name) {
            case 'BONUS' :
                return 'BP';
            case 'CREDIT' :
                return 'CR';
            case 'MONEY' :
                return String.fromCharCode(8364);
            default: return '';
        }
    }

    /**
     * arrangement of slides
     * @param winningOptions
     */
    initSlideList(winningOptions = []) {
        // todo: fake data for test
        const appId = window.config.appInitialConfig.APP_ID;
        const gameId = appId === '9' ? '339' : '959';

        if(this.props.gameId === gameId && winningOptions && winningOptions.length ) winningOptions = [
            {
                amount         : '',
                imageId        : "spinner_test_1.png",
                prizeIndex     : 1,
                type           : "",
                winningOptionId: "19-1",
            },
            {
                amount         : '50',
                imageId        : 'spinner_credits.png',
                prizeIndex     : 1,
                type           : "CREDIT",
                winningOptionId: "19-3",
            },
            {
                amount         : '10',
                imageId        : 'spinner_credits.png',
                prizeIndex     : 1,
                type           : "CREDIT",
                winningOptionId: "19-2",
            },
            {
                amount         : '5',
                imageId        : 'spinner_money.png',
                prizeIndex     : 1,
                type           : "MONEY",
                winningOptionId: "19-4",
            },
            {
                amount         : '',
                imageId        : "spinner_test_2.png",
                prizeIndex     : 1,
                type           : "",
                winningOptionId: "19-0",
            },
            {
                amount         : '1000',
                imageId        : '',
                prizeIndex     : 1,
                type           : "BONUS",
                winningOptionId: "19-6",
            },
            {
                amount         : '50',
                imageId        : 'spinner_money.png',
                prizeIndex     : 1,
                type           : "MONEY",
                winningOptionId: "19-5",
            },
            {
                amount         : '5000',
                imageId        : '',
                prizeIndex     : 1,
                type           : "BONUS",
                winningOptionId: "19-7",
            },
            {
                amount         : '5000',
                imageId        : '',
                prizeIndex     : 1,
                type           : "BONUS",
                winningOptionId: "19-8",
            }
        ];

        const slideHeight    = 238 + 40; // height + indent
        const slides = [];
        const doubleArr = winningOptions.length < 8 ? [...winningOptions, ...winningOptions] : winningOptions;
        const html = doubleArr.map((item, index) => {
            slides.push({
                ref: `slide${index}`,
                top: (slideHeight * index),
                slideHeight,
                amount: item.amount,
                winningOptionId: item.winningOptionId
            });

            const text = `${item.amount} ${this.getShortAmountName(item.type)}`;
            const imgSrc = item.imageId && item.imageId !== '2387cc23-4bb7-4777-aa61-0c10402ee431.jpg' ?
                                (item.type === 'VOUCHER' ? `${this.props.cdnMedia}voucher/${item.imageId}` : `images/${item.imageId}`) :
                                this.getOptionsValues(item.type);

            return (
                <Slide
                    key={`${item.winningOptionId}${index}`}
                    innerRef={(slide) => this[`slide${index}`] = slide}
                    className={'spinner-slide'}
                    slideHeight={slideHeight}
                    slidePosition={(slideHeight * index)}
                >
                    <div className="slideInner">
                        <SpinnerImg
                            src={imgSrc}
                            className="spinner-image"
                            data-type={item.type}
                            data-amount={item.amount}
                            data-id={item.winningOptionId.slice(-1)}/>
                        <span style={{
                            position  : 'absolute',
                            fontSize  : (text.length > 7 ? (text.length > 8 ? '60px' : '70px') : '80px'),
                            left      : '190px',
                            top       : '110px',
                            width     : '270px',
                            height    : '80px',
                            textAlign : 'right',
                            fontWeight: '600',
                            lineHeight: '80px',
                            color     : '#1FF2FF',
                            display   : (item.type === 'VOUCHER' ? 'none' : 'block')
                        }}>
                            {text}
                        </span>
                    </div>
                </Slide>
            )
        });

        this.slides = slides;
        return html;
    }

	toggleInfoPanel = (flag) => {
    	const position = flag === undefined ? !this.state.infoPanel : flag;

    	this.setState({
		    infoPanel: position
	    })
	}

    render() {
        const winningOptions = this.props.winningOptions || (this.props.infoItem && this.props.infoItem.winningOptions);
        const slideList = this.initSlideList(winningOptions);
	    const { title, description } = winningOptions;

        return(
            <SpinnerWrapper innerRef={x => {this.wrapper = x}}>
	            <Stars>
                    <StarImg src="images/blue-star.png" />
                    <StarImg src="images/blue-star.png" />
                    <StarImg src="images/blue-star.png" />
                </Stars>
                <OuterWrapper>
                    <Arrow src="images/grey_blue_arrow.png"/>
                    <Arrow src="images/grey_blue_arrow.png" style={{right: '25px', transform: 'rotate(180deg)'}}/>
                    <InnerWrapper>
                        <BlueWrap/>
                        <InnerWrapper>
                            <BlueInnerWrapper>
                                <SpinnerBarrelWrapper>
                                    <SpinnerBarrel
                                        onClick={this.rollSpinner}
                                        style={{overflow: 'hidden'}}
                                        innerRef={(spinContainer) => this.spinContainer = spinContainer}
                                    >
                                        {/*<BlueSpinnerWrapper />*/}
                                        <SpinnerContainer>
                                            { slideList }
                                        </SpinnerContainer>
                                    </SpinnerBarrel>
                                </SpinnerBarrelWrapper>
                            </BlueInnerWrapper>
                        </InnerWrapper>
                    </InnerWrapper>
                    <StyledInfoItem>
                        <div
	                        style={{position: 'relative', width: '100%', height: '100%'}}
	                        onClick={ () => { if(!this.isRolled) this.toggleInfoPanel() }}
                        >
                            <img src="images/01a_info_256.png" width={50} alt="info"/>
                        </div>
                    </StyledInfoItem>
                </OuterWrapper>
                <StyledButtonWrapper onClick={this.state.textButton !== 'ok' ? this.rollSpinner : this.announceWinning}>
                    <StyledButton canPress={this.state.canPressStop}>{this.state.textButton}</StyledButton>
                </StyledButtonWrapper>
                <InfoPanel
	                isOpen={this.state.infoPanel}
	                closePanel={() => { if(!this.isRolled) this.toggleInfoPanel(false) }}
	                title={title}
                >
	                {description}
                </InfoPanel>
            </SpinnerWrapper>
        )
    }
}

export default Barrel