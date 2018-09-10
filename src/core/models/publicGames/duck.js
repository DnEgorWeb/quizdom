const initialState = {
    publicGameList: []
}

const SET_PUBLIC_GAMES = "SET_PUBLIC_GAMES";

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_PUBLIC_GAMES:
            return {
                ...state,
                publicGameList: action.payload.items
            }
        default:
            return state
    }
}

export const setPublicGames = (data) => {
    return{
        type: SET_PUBLIC_GAMES,
        payload: data
    }
}

export const getPublicGames = (gameType) => () => {
    window.network.send({
        message: 'gameSelection/publicGameList',
        content: {
            gameType,
            limit: 100,
        }
    })
}

export const receivedPublicGames = (data) => (dispatch) => {
    if(data.content){
        // console.log(data.content.items);
        dispatch(setPublicGames(data.content))
    }
}