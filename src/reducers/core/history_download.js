import * as type from './../../constants/type';
import * as main from "./../../constants/main";

const dataTem = main.getHistoryDownloadLocalStorage();

const handleCreate = (state, value) => {
    const index = (state || []).findIndex(item => item.username === value.username);
    var history = [];
    if (index !== -1) {
        history = state[index].history;
        history.unshift({
            ...value.process,
            key: main.createID(),
            status: "downloading",
            processed: false
        });
        state[index] = {
            username: value.username,
            history
        }
    }
    else {
        state.push({
            username: value.username,
            history: [{ ...value.process, key: main.createID(), processed: false }]
        });
    }
    return [...state];
}

const handleUpdate = (state, value) => {
    return state.map(item => {
        if (item.username === value.username) {
            return {
                username: value.username,
                history: item.history.map(h => h.key === value.process.key ? value.process : h)
            }
        }
        return item;
    })
}

const handleDelete = (state, value) => {
    return state.map(item => {
        if (item.username === value.username) {
            return {
                username: value.username,
                history: item.history.filter(h => value.keys.findIndex(k => h.key === k) === -1)
            }
        }
        return item;
    })
    // const index = (state || []).findIndex(item => item.username === value.username);
    // if (index !== -1) {
    //     const history = state[index].history || [];
    //     state[index] = {
    //         username: value.username,
    //         history: history.filter(h => value.keys.findIndex(k => h.key === k) === -1)
    //     }
    //     return [...state];
    // }
    // return state;
}
export default (state = [], action) => {
    var { value } = action;
    let result = [];
    switch (action.type) {
        case type.TYPE_HISTORY_DOWNLOAD_LIST:
            return [...dataTem];
        case type.TYPE_HISTORY_DOWNLOAD_CREATE:
            result = handleCreate(state, value);
            main.setHistoryDownloadLocalStorage(result);
            return result;
        case type.TYPE_HISTORY_DOWNLOAD_UPDATE:
            result = handleUpdate(state, value);
            main.setHistoryDownloadLocalStorage(result);
            return result;
        case type.TYPE_HISTORY_DOWNLOAD_DELETE:
            result = handleDelete(state, value);
            main.setHistoryDownloadLocalStorage(result);
            return result;
        default:
            return state;
    }
}