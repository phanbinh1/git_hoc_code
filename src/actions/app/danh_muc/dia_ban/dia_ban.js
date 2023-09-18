import * as api from "./../../../../util/api_call";
import * as apiUrl from './../../../../constants/api';
import * as main from "./../../../../constants/main";
import * as  message from "./../../../../constants/message";
import * as type from "./../../../../constants/type";

export const getAllRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    var parentCode = data.parentCode ? data.parentCode : "0";
    return () => {
        return api.get({
            url: apiUrl.API_LOCALITY_GET_CHILDREN(parentCode),
            controller
        }).then(async res => {
            if (res && res.status) {
                res.msg && message.success({ content: res.msg });
                await requestSuccess(res);
            }
            else {
                res.msg && message.error({ content: res.msg });
                await requestError();
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
                url: apiUrl.API_DIA_BAN + `/${data.id}`,
                controller
            }).then(res => {
                if (res && res.status) {
                    dispatch(handleGetOne({ ...res.result, ...data.defaultInitValue }));
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
            url: apiUrl.API_DIA_BAN,
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
            url: apiUrl.API_DIA_BAN,
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
            url: apiUrl.API_DIA_BAN,
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

export const handleGetOne = (value) => {
    return {
        type: type.TYPE_DIA_BAN_EDIT,
        value
    }
}

const handleCreate = (value) => {
    return {
        type: type.TYPE_DIA_BAN_CREATE,
        value
    }
}

const handleUpdate = (value) => {
    return {
        type: type.TYPE_DIA_BAN_UPDATE,
        value
    }
}

const handleDelete = (values) => {
    return {
        type: type.TYPE_DIA_BAN_DELETE,
        values
    }
}