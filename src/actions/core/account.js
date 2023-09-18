import * as message from "./../../constants/message";
import * as api from "./../../util/api_call";
import * as apiUrl from './../../constants/api';
import * as type from "./../../constants/type";
import * as main from "./../../constants/main";
import * as actPagination from "./pagination";
import SockJS from 'sockjs-client'; // Note this line
import Stomp from 'stompjs';
import { store } from "../..";

/**
 *  ==============================================================================
 *  ==============================================================================
 */
const send = (type, data) => {
    const state = store.getState();
    const socket = new SockJS(apiUrl.SOCKET_PORT);
    const stompClient = Stomp.over(socket);
    stompClient.debug = null;
    stompClient.connect({}, () => {
        stompClient.send("/update/account", {}, JSON.stringify({ type: "ACCOUNT", screenID: state.screenID, payload: { data, type } }));
    });
}

export const getAllRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest(object);
    if (isPagination) {
        var _pagination = main.getParamPagination(pageKey);
        data = { ..._pagination, ...data };
    }
    return dispatch => {
        return api.get({
            url: apiUrl.API_ACCOUNT,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                dispatch(handleGetAll(res.result));
                if (res.hasOwnProperty("pagination") && isPagination) {
                    dispatch(actPagination.Pagination({
                        ...res.pagination
                    },
                        pageKey)
                    );
                }
                requestSuccess(res);
            }
            else {
                requestError();
            }
        });
    }
}

export const getOneRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller, errorNotifi } = main.checkValidObjectRequest(object);
    return dispatch => {
        if (!data.username) {
            message.error({ content: "Dữ liệu đầu vào không chính xác 123!" });
        }
        else {
            return api.get({
                url: apiUrl.API_ACCOUNT + `${data.username}`,
                controller,
                errorNotifi
            }).then(res => {
                if (res) {
                    data.refreshStore !== false && dispatch(handleGetOne(res));
                    requestSuccess(res);
                }
                else {
                    requestError();
                }
            })
        }
    }
}

export const createRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.post({
            url: apiUrl.API_ACCOUNT,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                res.msg && message.success({ content: res.msg });
                dispatch(handleCreate(res.result));
                requestSuccess(res);
            }
            else {
                res.msg && message.error({ content: res.msg });
                requestError();
            }
        });
    }
}

export const updateRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.put({
            url: apiUrl.API_ACCOUNT,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                res.msg && message.success({ content: res.msg });
                dispatch(handleUpdate(res.result));
                requestSuccess();
            }
            else {
                res.msg && message.error({ content: res.msg });
                requestError();
            }
        })
    }
}

export const deleteRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.del({
            url: apiUrl.API_ACCOUNT,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                res.msg && message.success({ content: res.msg });
                dispatch(handleDelete(data));
                requestSuccess();
            }
            else {
                res.msg && message.error({ content: res.msg });
                requestError();
            }
        })
    }
}


const handleGetAll = (values) => {
    return {
        type: type.TYPE_ACCOUNT_LIST,
        values
    }
}

export const handleGetOne = (value) => {
    return {
        type: type.TYPE_ACCOUNT_EDIT,
        value
    }
}

const handleCreate = (value) => {
    send(type.TYPE_ACCOUNT_CREATE, value);
    return {
        type: type.TYPE_ACCOUNT_CREATE,
        value
    }
}

const handleUpdate = (value) => {
    send(type.TYPE_ACCOUNT_UPDATE, value);
    return {
        type: type.TYPE_ACCOUNT_UPDATE,
        value
    }
}

const handleDelete = (values) => {
    send(type.TYPE_ACCOUNT_DELETE, values);
    return {
        type: type.TYPE_ACCOUNT_DELETE,
        values
    }
}