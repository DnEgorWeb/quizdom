const notifications = {
    alert: (title, msg, buttonLabel, callback) => {
        if(navigator.notification && navigator.notification.alert){
            navigator.notification.alert(msg, callback, title, buttonLabel)
        }else{
            alert(title + '\n ' + msg)
            callback()
        }
    },
    confirm: (title, msg, buttonLabels, callback) => {
        if(navigator.notification && navigator.notification.confirm){
            navigator.notification.confirm(msg, callback, title, buttonLabels)
        }else{
            const result = window.confirm(title + '\n' + msg)
            if(result){    
                callback()
            }
        }
    }
}

export default notifications;
