import * as api from "./../../util/api_call";
import * as apiUrl from './../../constants/api';
import * as type from "./../../constants/type";
import * as main from "./../../constants/main";
import * as  message from "./../../constants/message";
import * as actPagination from "./../core/pagination";
import SockJS from 'sockjs-client'; // Note this line
import Stomp from 'stompjs';
import { store } from "../..";

const send = (data, type) => {
    const state = store.getState();
    const socket = new SockJS(apiUrl.SOCKET_PORT);
    const stompClient = Stomp.over(socket);
    stompClient.debug = null;
    stompClient.connect({}, () => {
        stompClient.send("/update/config", {}, JSON.stringify({ type: "CONFIG", screenID: state.screenID, data: { type, data } }));
    });
}

export const getAllRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.get({
            url: apiUrl.API_CAU_HINH,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                res.msg && message.success({ content: res.msg });
                dispatch(handleGetAll(res.result));
                (isPagination && res.pagination) &&
                    dispatch(actPagination.Pagination(res.pagination, pageKey));
                requestSuccess(res);
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
                url: apiUrl.API_CAU_HINH + `/${data.id}`,
                controller
            }).then(res => {
                if (res && res.status) {
                    dispatch(handleGetOne(res.result));
                    res.msg && message.success({ content: res.msg });
                    requestSuccess(res);
                }
                else {
                    res.msg && message.error({ content: res.msg });
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
            url: apiUrl.API_CAU_HINH,
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
                requestError()
            }
        })
    }
}

export const updateRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.put({
            url: apiUrl.API_CAU_HINH,
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

export const deleteRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.del({
            url: apiUrl.API_CAU_HINH,
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
        type: type.TYPE_CAU_HINH_LIST,
        values
    }
}

export const handleGetOne = (value) => {
    return {
        type: type.TYPE_CAU_HINH_EDIT,
        value
    }
}

const handleCreate = (value) => {
    send(value, type.TYPE_CAU_HINH_CREATE);
    return {
        type: type.TYPE_CAU_HINH_CREATE,
        value
    }
}

const handleUpdate = (value) => {
    send(value, type.TYPE_CAU_HINH_UPDATE);
    return {
        type: type.TYPE_CAU_HINH_UPDATE,
        value
    }
}

const handleDelete = (values) => {
    send(values, type.TYPE_CAU_HINH_DELETE);
    return {
        type: type.TYPE_CAU_HINH_DELETE,
        values
    }
}