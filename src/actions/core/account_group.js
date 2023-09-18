import * as message from "./../../constants/message";
import * as api from "./../../util/api_call";
import * as apiUrl from "./../../constants/api";
import * as type from "./../../constants/type";
import * as main from "./../../constants/main";
import * as actPagination from "./pagination";
import SockJS from 'sockjs-client'; // Note this line
import Stomp from 'stompjs';
import { store } from "../..";

const send = (data, type, config = { type: "ACCOUNT_GROUP", path: "/update/account-group" }) => {
    const state = store.getState();
    const socket = new SockJS(apiUrl.SOCKET_PORT);
    const stompClient = Stomp.over(socket);
    stompClient.debug = null;
    stompClient.connect({}, () => {
        stompClient.send(config.path, {}, JSON.stringify({ type: config.type, screenID: state.screenID, data: { type, data } }));
    });
}

export const getAllRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest(object);
    if (isPagination) {
        var pagination = main.getParamPagination(pageKey);
        data = { ...pagination, ...data };
    }
    return dispatch => {
        return api.get({
            url: apiUrl.API_ACCOUNT_GROUP,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                dispatch(handleGetAll(res.result));
                if (res.hasOwnProperty("pagination") && isPagination) {
                    dispatch(actPagination.Pagination({
                        ...res.pagination
                    }, pageKey));
                }
                requestSuccess();
            }
            else {
                requestError();
            }
        });
    }
}

export const getOneRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        if (!data.id) {
            message.error({ content: "Dữ liệu đầu vào không hợp lệ!" });
        }
        else {
            return api.get({
                url: apiUrl.API_ACCOUNT_GROUP + `/${data.id}`,
                controller
            }).then(res => {
                if (res && res.status) {
                    dispatch(handleGetOne(res.result));
                    requestSuccess();
                }
                else {
                    requestError();
                }
            })
        }
    }
}
export const getByAccountRequest = async (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return await api.get({
        url: apiUrl.API_ACCOUNT_GROUP + `/account/${data.username}`,
        controller
    }).then(res => {
        if (res && res.status) {
            requestSuccess(res);
        }
        else {
            requestError();
        }
    })
}

export const createRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.post({
            url: apiUrl.API_ACCOUNT_GROUP,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                message.success({ content: res.msg });
                dispatch(handleCreate(res.result));
                requestSuccess(res);
            }
            else {
                res.msg && message.error({ content: res.msg });
                requestError();
            }
        })
    }
}

export const updateRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.put({
            url: apiUrl.API_ACCOUNT_GROUP,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                message.success({ content: res.msg });
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
            url: apiUrl.API_ACCOUNT_GROUP,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                message.success({ content: res.msg });
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

export const getPermissionsByAccountGroupCodeRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        if (!data.accountGroupCode) {
            message.error({ content: "Dữ liệu đầu vào không hợp lệ!" });
        }
        else {
            return api.get({
                url: apiUrl.API_ACCOUNT_GROUP_PERMISSIONS + `${data.accountGroupCode}`,
                controller
            }).then(res => {
                if (res && res.status) {
                    dispatch(getPermissionsByAccountGroupCode(res.result));
                    requestSuccess();
                }
                else {
                    res.msg && message.warning({ content: res.msg });
                    requestError();
                }
            })
        }
    }
}

export const updatePermissionAccountGroupRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.put({
            url: apiUrl.API_ACCOUNT_GROUP_PERMISSIONS + "permission",
            data,
            controller
        }).then(res => {
            if (res) {
                if (res.status) {
                    message.success({ content: res.msg });
                    requestSuccess();
                }
                else {
                    message.error({ content: res.msg });
                    requestError();
                }
            }
            else {
                requestError();
            }
        })
    }
}

const handleGetAll = (values) => {
    return {
        type: type.TYPE_ACCOUNT_GROUP_LIST,
        values
    }
}

export const handleGetOne = (value) => {
    value.isEnable = (value.hasOwnProperty("isEnable") && value.isEnable === 1) ? true : false;
    if (value.hasOwnProperty("accounts")) {
        var accounts = [];
        value.accounts.map((account) => {
            return accounts.push(`${account.name}`);
        })
        value.listAccount = accounts;
    }
    return {
        type: type.TYPE_ACCOUNT_GROUP_EDIT,
        value
    }
}

const handleCreate = (value) => {
    send(value, type.TYPE_ACCOUNT_GROUP_CREATE);
    return {
        type: type.TYPE_ACCOUNT_GROUP_CREATE,
        value
    }
}

const handleUpdate = (value) => {
    send(value, type.TYPE_ACCOUNT_GROUP_UPDATE);
    return {
        type: type.TYPE_ACCOUNT_GROUP_UPDATE,
        value
    }
}

const handleDelete = (values) => {
    send(values, type.TYPE_ACCOUNT_GROUP_DELETE);
    return {
        type: type.TYPE_ACCOUNT_GROUP_DELETE,
        values
    }
}

const getPermissionsByAccountGroupCode = (value) => {
    return {
        type: type.TYPE_ACCOUNT_GROUP_PERMISSIONS,
        value
    }
}