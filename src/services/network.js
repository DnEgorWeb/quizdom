export default class Network{
    constructor(){
        this.socket = null
    }

    initialize(onOpen, onClose, msgHandler, errorHandler){
        if(typeof msgHandler === 'function'){
            this.msgHandler = msgHandler
        }else{
            throw new Error('message handler is not a function!')
        }

        this.socket = new WebSocket(window.config.network.api_url)

        // workaround for mobile-reconnection after standby mod
        if (window.navigator.userAgent.includes("iPhone") || window.navigator.userAgent.includes("Android")) {
            window.socket = this.socket
        }

        if(onOpen){
            this.socket.onopen = onOpen
        }else{
            throw new Error('on open handler is not a function!')
        }

        if(onClose){
            this.socket.onclose = onClose
        }else{
            throw new Error('on close handler is not a function!')
        }


        if(typeof errorHandler === 'function'){
            this.socket.onerror = errorHandler
        }else{
            this.socket.onerror = (error) => {
                throw new Error(error)
            }
        }


        this.socket.onmessage = this.emit
    }

    openHandler(){
        if(this.onOpen){
            this.onOpen();
        }
    }

    configureMsg(msg){
        const fullMsg = {
            seq: null,
            ack: null,
            error: null,
            ...msg,
            timestamp: Date.now(),
        }
        return JSON.stringify(fullMsg)
    }

    send(msg){
        const configuredMsg = this.configureMsg(msg)
        this.socket.send(configuredMsg)
    }

    emit = (msg) => {
        const jsonMsg = JSON.parse(msg.data);
        this.msgHandler(jsonMsg)
    }
}
