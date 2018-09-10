const SET_ANSWER = 'PROMOCODE_SET_ANSWER'

export default function reducer (state = {}, action) {
    switch (action.type) {
        case SET_ANSWER: {
            return {
                ...state,
                answer: action.payload.content,
                error: action.payload.error
            }
        }

        default: {
            return state
        }
    }
}

export const setAnswer = (data) => {
    return {
        type: SET_ANSWER,
        payload: data
    }
}

export const receivedAnswer = (msg) => (dispatch) => {
    dispatch(setAnswer(msg))
}
