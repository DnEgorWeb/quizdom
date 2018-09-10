import convertIdToURL from '../../../services/convertIdToURL'

const ADD_TO_METADATA_LIST = "ADD_TO_METADATA_LIST";
const SET_IMAGE_INFO = "SET_IMAGE_INFO"
const SET_AUTHOR_INFO = "SET_AUTHOR_INFO"
const SET_MEDIA_LIST = "SET_MEDIA_LIST"
const CLEAR_IMAGE_INFO = "CLEAR_IMAGE_INFO"

export default function reducer (state = {metadataList: [], imageInfo: []}, action){
	switch(action.type){
		case ADD_TO_METADATA_LIST: {
			const copyOfMetadataList = state.metadataList.slice();
			for (let i = 0; i < copyOfMetadataList.length; i++) {
				if (copyOfMetadataList[i].url === action.payload.url) {
					return {...state};
				}
			}
			copyOfMetadataList.push(action.payload);
			return {
				...state,
				metadataList: copyOfMetadataList
			}
		}
		case SET_IMAGE_INFO: {
			return {
				...state,
				imageInfo: [...state.imageInfo, action.payload]
			}
		}
		case CLEAR_IMAGE_INFO: {
			return {
				...state,
				imageInfo: []
			}
		}
		case SET_AUTHOR_INFO: {
			return {
				...state,
				authorInfo: action.payload
			}
		}
		case SET_MEDIA_LIST: {
			return {
				...state,
				mediaList: action.payload
			}
		}
		default:
			return state;
	}
}

export const addToMetadataList = (metadata) => {
	return {
		type: ADD_TO_METADATA_LIST,
		payload: metadata
	};
}

export const setImageInfo = (data) => {
	return {
		type: SET_IMAGE_INFO,
		payload: data
	}
}

export const clearImageInfo = () => {
	return {
		type: CLEAR_IMAGE_INFO
	}
}

export const receivedImageInfo = (data) => (dispatch) => {
	const media = data.content && data.content.media;
    dispatch(setImageInfo(media))
}

export const getMedia = (id) => () => {
    window.network.send({
        message: 'media/mediaGet',
        content: {
            id: id
        }
    })
}

export const setMediaList = data => {
	return {
		type: SET_MEDIA_LIST,
		payload: data
	}
}

export const receivedMediaList = (data) => dispatch => {
	dispatch(setMediaList(data.content.items))
}

export const getMediaList = () => () => {
    window.network.send({
        message: 'media/mediaList',
        content: {
        	limit: 100,
            offset: 0
        }
    })
}

export const setAuthorInfo = (data) => {
    return {
        type: SET_AUTHOR_INFO,
        payload: data
    }
}

export const receivedAuthorInfo = (data) => (dispatch) => {
	dispatch(setAuthorInfo(data.content.items[0]))
}

export const getAuthorInfo = (id) => () => {
    window.network.send({
        message: 'profileManager/profileList',
        content: {
            "limit": 20,
            "offset": 0,
            "searchBy": {
                "userId": "15100676699860a6f639b-d984-4b9e-a064-c115b8347d0f"
            }
        }
    })
}

export const getFromCashe = () => {
	return JSON.parse(window.localStorage.getItem('cashe'));
}

export const getData = (cdn, idWithSuffix, callback) => (dispatch) => {
	const dataUrl = convertIdToURL(cdn, null, idWithSuffix, '.metadata.json')();
	const jpgUrl = convertIdToURL(cdn, null, idWithSuffix, '.jpg')();
	window.fetch(dataUrl).then(response => {
		return response.json();
	}).then(function(data) {
		dispatch(addToMetadataList({url: jpgUrl, data: data.metaData}));
	})
}