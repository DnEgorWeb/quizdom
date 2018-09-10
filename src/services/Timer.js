import moment from 'moment'

export default class Timer {
    constructor(startTime, onTick, onEnd) {
        this.startTime = startTime || 0
        this.currentTime = this.startTime
        this.onTick = onTick
        this.onEnd = onEnd
    }

    previousTime = null

    start = () => {
        this.timerId = setInterval(this.tick, 1000)
    }

    checkTimer = () => {
        const currentTime = moment()
        if(this.previousTime){
            const diff = moment.utc(moment(currentTime).diff(moment(this.previousTime))).format("ss")
            if(diff >= this.currentTime){
                this.currentTime = 0;
                this.onTick(this.currentTime)
                this.onEnd()
            }else if(diff > 1){
                this.currentTime = this.currentTime - diff
            }
        }
        this.previousTime = currentTime
    }

    tick = () => {
        this.checkTimer()
        if (this.currentTime > 0) {
            this.currentTime = this.currentTime - 1
            if(this.onTick){
                this.onTick(this.currentTime)
            }
            if(this.currentTime === 0 && this.onEnd){
                this.onEnd();
            }
        } else {
            this.stop()
        }
    }

    stop = () => {
        clearInterval(this.timerId);
    }
}
