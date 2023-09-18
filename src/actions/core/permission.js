import * as api from "./../../util/api_call";
import * as apiUrl from './../../constants/api';
import * as type from "./../../constants/type";
import * as constants from "./../../constants/constants";
import * as main from "./../../constants/main";
import * as actPagination from "./pagination";
import * as message from "./../../constants/message";
import SockJS from 'sockjs-client'; // Note this line
import Stomp from 'stompjs';
import { store } from "../..";

const send = (data, type) => {
    const state = store.getState();
    const socket = new SockJS(apiUrl.SOCKET_PORT);
    const stompClient = Stomp.over(socket);
    stompClient.debug = null;
    stompClient.connect({}, () => {
        stompClient.send("/update/permission", {}, JSON.stringify({ type: "PERMISSION", screenID: state.screenID, data: { type, data } }));
    });
}

export const getPermissionMenuRequest = (object) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest({ ...object, data: { idParent: 0, isTree: true } });
    return dispatch => {
        return api.get({
            url: apiUrl.API_PERMISSION,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                dispatch(getPermissionMenu(res.result));
                requestSuccess();
            }
            else {
                dispatch(getPermissionMenu([]));
                requestError();
            }
        });
    }
}

export const getMenuLeftRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest({ ...object, data: { idParent: 0, isTree: true, isMobile: document.body.getAttribute("_enviroment") === "app" } });
    return dispatch => {
        return api.get({
            url: apiUrl.API_MENU_LEFT,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                dispatch(getMenuLeft(res.result));
                requestSuccess();
            }
            else {
                dispatch(getMenuLeft([]));
                requestError();
            }
        });
    }
}

export const getAllRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest({ ...object, isPagination: false });
    if (!data.hasOwnProperty("idParent") || typeof data.idParent !== "number") {
        data.idParent = 0;
    }
    if (isPagination) {
        var pagination = main.getParamPagination(pageKey);
        data = { ...pagination, ...data };
    }
    return dispatch => {
        return api.get({
            url: apiUrl.API_PERMISSION,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                dispatch(handleGetAll(res.result));
                if (res.hasOwnProperty("pagination") && isPagination) {
                    dispatch(actPagination.Pagination({
                        ...res.pagination,
                        currentPage: data.currentPage
                    },
                        pageKey)
                    );
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
                url: apiUrl.API_PERMISSION + `/${data.id}`,
                controller
            }).then(res => {
                if (res && res.status && res.result) {
                    dispatch(handleGetOne(res.result));
                    requestSuccess(res);
                }
                else {
                    requestError();
                }

            });
        }
    }
}

export const createRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.post({
            url: apiUrl.API_PERMISSION,
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
        })
    }
}

export const updateRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.put({
            url: apiUrl.API_PERMISSION,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                res.msg && message.success({ content: res.msg });
                dispatch(handleUpdate(res.result));
                requestSuccess(res);
            }
            else {
                res.msg && message.error({ content: res.msg });
                requestError();
            }
        })
    }
}

export const updatesRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.put({
            url: apiUrl.API_PERMISSION_ALL,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                res.msg && message.success({ content: res.msg });
                res.result.map(item => {
                    send(item);
                    return dispatch(handleUpdate(item));
                });
                requestSuccess(res);
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
            url: apiUrl.API_PERMISSION,
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
export const formatPermission = (values) => {
    return values.map((item) => {
        if (item.type === constants.CONST_PERMISSION_TYPE_URL_HIDDEN) {
            item.type = constants.CONST_PERMISSION_TYPE_URL;
            item.menuLeft = false;
        }
        else if (item.type === constants.CONST_PERMISSION_TYPE_URL) {
            item.menuLeft = true;
        }
        else {
            item.menuLeft = false;
        }
        if (item.type === constants.CONST_PERMISSION_TYPE_ACTION_HIDDEN) {
            item.type = constants.CONST_PERMISSION_TYPE_ACTION;
            item.hiddenAction = true;
        }
        else {
            item.hiddenAction = false;
        }
        return {
            ...item,
            children: item.children && Array.isArray(item.children) ? formatPermission(item.children) : []
        }
    })
}

const getPermissionMenu = (values) => {
    return {
        type: type.TYPE_PERMISSION_MENU,
        values
    }
}

export const getMenuLeft = (values) => {
    return {
        type: type.TYPE_GET_MENU_LEFT,
        values
    }
}

const handleGetAll = (values) => {
    return {
        type: type.TYPE_PERMISSION_LIST,
        values
    }
}

export const handleGetOne = (value) => {
    return {
        type: type.TYPE_PERMISSION_EDIT,
        value
    }
}

const handleCreate = (value) => {
    send(value, type.TYPE_PERMISSION_CREATE);
    return {
        type: type.TYPE_PERMISSION_CREATE,
        value
    }
}

const handleUpdate = (value) => {
    send(value, type.TYPE_PERMISSION_UPDATE);
    return {
        type: type.TYPE_PERMISSION_UPDATE,
        value
    }
}

const handleDelete = (values) => {
    send(values, type.TYPE_PERMISSION_DELETE);
    return {
        type: type.TYPE_PERMISSION_DELETE,
        values
    }
}

export const setPermissionPriviliged = (values, actionCode = "") => {
    return {
        type: type.TYPE_PERMISSION_GET_PRIVILIGED,
        values,
        actionCode
    }
}