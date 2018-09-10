import e from "../../../langs";
import {getFriends} from '../highscore/duck'

const initialState = {
    groupList: [],
    duelGroups: [],
    tournamentGroups: [],
    groupListPlayers: [],
    currentGroupId: -1,
    currentGroup: {},
    isPlayerMaster: false,
    newGroups: [],
}

const SET_GROUP_LIST         = "SET_GROUP_LIST"
const SET_GROUP_LIST_PLAYERS = "SET_GROUP_LIST_PLAYERS"
const SET_CURRENT_GROUP_ID   = "SET_CURRENT_GROUP_ID"
const SET_CURRENT_GROUP      = "SET_CURRENT_GROUP"
const SET_RIGHTS             = "SET_RIGHTS"
const SET_FILE               = "SET_FILE"
const SET_NEW_GROUPS         = "SET_NEW_GROUPS"

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_GROUP_LIST:
            const { duelGroups, tournamentGroups } = separationGroupList(action.payload.groupList);
            return {
                ...state,
                groupList: action.payload.groupList.map(group => ({
                    ...group,
                    image: group.image/* + "?" + Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, 5)*/
                })),
                total    : action.payload.total,
                duelGroups,
                tournamentGroups
            }
        case SET_GROUP_LIST_PLAYERS:
            return {
                ...state,
                groupListPlayers: action.payload.groupListPlayers,
                total: action.payload.total
            }
        case SET_CURRENT_GROUP_ID:
            return {
                ...state,
                currentGroupId: action.payload
            }
        case SET_CURRENT_GROUP:
            return {
                ...state,
                currentGroup: action.payload
            }
        case SET_RIGHTS:
            return {
                ...state,
                isPlayerMaster: action.payload
            }
        case SET_FILE:
            return {
                ...state,
                file: action.payload
            }
        case SET_NEW_GROUPS:
            const newGroups = [];
            action.payload.forEach(group => {
                const containedGroup = state.newGroups.filter(newGroup => {
                    return newGroup.groupId === group.groupId
                })[0];
                if (!containedGroup) {
                    newGroups.push(group);
                }
            });
            return {
                ...state,
                newGroups: [...state.newGroups, ...newGroups]
            }
        default:
            return state
    }
}

export const setGroupList = (groupList, total) => ({
    type: SET_GROUP_LIST,
    payload: {groupList, total}
})

export const setGroupListPlayers = (groupListPlayers, total) => ({
    type: SET_GROUP_LIST_PLAYERS,
    payload: {groupListPlayers, total}
})

export const setCurrentGroupId = (groupId) => ({
    type: SET_CURRENT_GROUP_ID,
    payload: groupId
})

export const setCurrentGroup = (group) => ({
    type: SET_CURRENT_GROUP,
    payload: group
})

export const setRights = (isPlayerMaster = false) => ({
    type: SET_RIGHTS,
    payload: isPlayerMaster
})

export const setFile = (file) => ({
    type: SET_FILE,
    payload: file
})

export const setNewGroups = (newGroups) => ({
    type: SET_NEW_GROUPS,
    payload: newGroups
})

export const receivedGroupList = (msg) => (dispatch) => {
    dispatch(setGroupList(msg.content.items, msg.content.total));
}

export const receivedGroupListPlayers = (msg) => (dispatch) => {
    dispatch(setGroupListPlayers(msg.content.items, msg.content.total));
}

export const receivedGroup = (msg) => (dispatch) => {
    dispatch(setCurrentGroup(msg.content.group));
}


export const receivedAnswerAfterDeleting = (msg) => (dispatch) => {
    if (msg.error) {
        console.log(msg.error);
    } else {
        dispatch(initGroups());
        window.notification.alert(e.group_attention, e.group_groupIsDeleted, e.group_ok, () => {});
    }
}

export const receivedAnswerAfterAddPlayers = (msg) => (dispatch) => {
    if (msg.error) {
        console.log(msg.error);
    } else {
        dispatch(initAddFriends())
        setTimeout(() => {
            window.notification.alert(e.group_attention, e.group_newPlayersHaveBeenAddedSuccessfully, e.group_ok, () => {})
        }, 1000);
        console.log('Players are added.');
    }
}

export const receivedAnswerAfterRemovePlayers = (msg) => (dispatch) => {
    if (msg.error) {
        console.log(msg.error);
    } else {
        dispatch(initGroupsDetails());
        console.log('Players are removed.');
    }
}

const uploadFile = (url, params) => {
    const data = new FormData()
    for (let key in params) {
        if (params.hasOwnProperty(key)) {
            data.append(key, params[key])
        }
    }
    return fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: data,
        headers: {
            'Accept': 'application/json, text/plain, */*',
        }
    })
}

export const receivedAnswerAfterCreateGroup = (msg) => (dispatch, getState) => {
    if (msg.error) {
        window.notification.alert(e.group_error, msg.error.message, e.group_ok, () => {})
    } else {
        console.log('Group is created.');
        window.notification.alert(e.group_attention, e.group_groupIsCreated, e.group_ok, () => {})
        dispatch(getGroupList());

        const file = getState().groups.file;
        if (file) {
            let params = {
                token: getState().app.token,
                groupId: msg.content.group.groupId,
                tenantId: getState().app.tenant.id,
                action: "update",
                media_file: file,
            };
            console.log(params);

            const url = getState().app.environment.urlMediaService + "updateGroupPicture";
            uploadFile(url, params)
                .then((response) => response.json())
                .then((json) => {
                    if (json.content) {
                        window.notification.alert(e.group_attention, e.group_pictureIsUploaded, e.group_ok, () => {})
                    }
                })
        }
    }
}

export const receivedAnswerAfterUpdateGroup = (msg) => (dispatch, getState) => {
    if (msg.error) {
        console.log(msg.error);
    } else {
        console.log('Group is updated.');
        window.notification.alert(e.group_attention, e.group_groupIsUpdated, e.group_ok, () => {})
        const file = getState().groups.file;
        if (file) {
            let params = {
                token: getState().app.token,
                groupId: msg.content.group.groupId,
                tenantId: getState().app.tenant.id,
                action: "update",
                media_file: file,
            };
            console.log(params);

            const url = getState().app.environment.urlMediaService + "updateGroupPicture";
            uploadFile(url, params)
                .then((response) => response.json())
                .then((json) => {
                    if (json.content) {
                        window.notification.alert(e.group_attention, e.group_pictureIsUploaded, e.group_ok, () => {})
                    }
                })
        }
    }
}

export const getNewGroups = () => (dispatch, getState) => {
    const unreadMessages = getState().messenger.unreadMessages;
    const newGroups = unreadMessages
        .filter(unreadMessage => unreadMessage.payload && unreadMessage.payload.groupId)
        .map(unreadMessage => unreadMessage.payload);
    dispatch(setNewGroups(newGroups));
}

export const initGroups = (offset) => (dispatch) => {
    dispatch(getGroupList(offset));
    dispatch(getNewGroups())
}

export const initGroupsDetails = () => (dispatch, getState) => {
    const currentGroupId = getState().groups.currentGroupId;
    // const currentGroupId = getState().groups.currentGroup.groupId;
    if (currentGroupId !== -1) {
        dispatch(getGroupListPlayers(currentGroupId))
        dispatch(getGroup(currentGroupId))
    }
}

export const initAddFriends = () => (dispatch, getState) => {
    // const currentGroupId = getState().groups.currentGroupId;
    const currentGroupId = getState().groups.currentGroup.groupId;
    dispatch(getFriends())
    dispatch(getGroupListPlayers(currentGroupId))
}

export const initPlayerList = () => (dispatch, getState) => {
    const currentGroupId = getState().groups.currentGroupId;
    dispatch(getGroupListPlayers(currentGroupId))
}

export const initFriendList = () => (dispatch) => {
    dispatch(getFriends())
}

export const sendWebsocketMessage = (userId, message, parameters) => () => {
    window.network.send({
        message: 'userMessage/sendWebsocketMessage',
        content: {
            userId,
            message,
            parameters,
        }
    })
}

export const getGroupList = (offset = 0) => () => {
    window.network.send({
        message: 'friend/groupList',
        content: {
            limit: 100,
            offset,
        }
    })
}

export const getGroupListPlayers = (groupId) => () => {
    window.network.send({
        message: 'friend/groupListPlayers',
        content: {
            groupId: groupId,
            includeProfileInfo: true,
            excludeGroupOwner: false,
            limit: 20,
            offset: 0,
        }
    })
}

export const getGroup = (groupId) => (dispatch, getState) => {
    const tenantId = getState().app.tenant.id;
    const userId = getState().profile.userId;
    window.network.send({
        message: 'friend/groupGet',
        content: {
            groupId: groupId,
            tenantId: tenantId,
            userId: userId,
        }
    })
}

export const deleteGroup = () => (dispatch, getState) => {
    // const currentGroupId = getState().groups.currentGroupId;
    const currentGroupId = getState().groups.currentGroup.groupId;
    window.network.send({
        message: 'friend/groupDelete',
        content: {
            groupId: currentGroupId,
        }
    })
    const currentGroup = getState().groups.currentGroup;
    const groupListPlayers = getState().groups.groupListPlayers;
    groupListPlayers && groupListPlayers.forEach(player => {
        const userId = player.userId;
        const message = `Group ${currentGroup.name} is deleted.`;
        dispatch(sendWebsocketMessage(userId, message, currentGroup));
    })
}

export const groupAddPlayers = (userIds) => (dispatch, getState) => {
    // const currentGroupId = getState().groups.currentGroupId;
    const currentGroupId = getState().groups.currentGroup.groupId;
    window.network.send({
        message: 'friend/groupAddPlayers',
        content: {
            userIds: userIds,
            groupId: currentGroupId,
        }
    })
}

export const groupRemovePlayers = (userId) => (dispatch, getState) =>{
    // const currentGroupId = getState().groups.currentGroupId;
    const currentGroupId = getState().groups.currentGroup.groupId;
    window.network.send({
        message: 'friend/groupRemovePlayers',
        content: {
            userIds: [userId],
            groupId: currentGroupId,
        }
    })
}

export const groupCreate = (name, image, imagePreviewUrl) => (dispatch, getState) => {
    dispatch(setFile(image));
    const userId = getState().profile.userId;

    window.network.send({
        message: 'friend/groupCreate',
        content: {
            name: name,
            userIds: [userId],
            image: imagePreviewUrl
        }
    })
}

export const groupUpdate = (name, file) => (dispatch, getState) => {
    dispatch(setFile(file));
    // const currentGroupId = getState().groups.currentGroupId;
    const currentGroupId = getState().groups.currentGroup.groupId;
    window.network.send({
        message: 'friend/groupUpdate',
        content: {
            groupId: currentGroupId,
            name: name,
            image: getState().groups.currentGroup.image, //  + "?" + Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, 5),
            userIdsToRemove: []
        }
    })
}

// todo: временный вариант для сортировки групп
// tournament || duel
/**
 *   Фильтрует группы на дуэльные и турнирные
 *
 *   @param list {Array}
 *   @param currentType {String}
 *   @returns {Object}
 */
function separationGroupList(list) {
    const duelGroups       = [];
    const tournamentGroups = [];

    if(Array.isArray(list) && !list.length) return [];

    list.forEach(item => {
        let name = `${item.name}`;
        let type = item.type;

        try{
            const obj = JSON.parse(item.name);
            name = obj.name;
            type = obj.type;
            if(type === undefined) throw new Error();
        } catch(e) {
            name = item.name;
            type = item.buddyCount < 4 ? 'duel' : 'tournament';
        }
        item.name = name || '';
        item.type = type || '';

        switch(item.type) {
            case 'tournament' : tournamentGroups.push(item); break;
            case 'duel'       : duelGroups.push(item); break;
            default           : return false;
        }
    });

    return {duelGroups, tournamentGroups};
};