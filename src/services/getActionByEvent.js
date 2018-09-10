import actionEventMap from '../constants/actionEventMap'

const getActionByEvent = (event) => {
    const action = actionEventMap[event];
    if(action){
        return action;
    }else{
        throw new Error('unknown action for event: ' + event);
    }
}

export default getActionByEvent
