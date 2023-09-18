import * as api from "./../../../../util/api_call";
import * as apiUrl from './../../../../constants/api';
import * as type from "./../../../../constants/type";
import * as main from "./../../../../constants/main";
import * as message from "./../../../../constants/message";

/**
 *  ==============================================================================
 *  ==============================================================================
 */

export const getOneRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        if (!data.id) {
            message.error({ content: "Dữ liệu đầu vào không chính xác!" });
        }
        else {
            return api.get({
                url: apiUrl.API_CHI_TIET_XU_LY_NDTP + `/${data.id}`,
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

export const getOneCoSoByHoSoRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        if (!data.id) {
            message.error({ content: "Dữ liệu đầu vào không chính xác!" });
        }
        else {
            return api.get({
                url: apiUrl.API_QTDT_XL_NDTP + `/hoso/${data.idHoSo}/chitietxuly/${data.id}`,
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

export const createRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.post({
            url: apiUrl.API_CHI_TIET_XU_LY_NDTP,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                const result = {
                    status: res.status,
                    msg: res.msg,
                };
                dispatch(handleCreate(res.result));
                requestSuccess(result);
                res.msg && message.success({ content: res.msg });
            }
            else {
                requestError();
                res.msg && message.error({ content: res.msg });
            }
        })
    }
}

export const updateRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.put({
            url: apiUrl.API_CHI_TIET_XU_LY_NDTP,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                const result = {
                    status: res.status,
                    msg: res.msg,
                };
                dispatch(handleUpdate(res.result));
                requestSuccess(result);
                res.msg && message.success({ content: res.msg });
            }
            else {
                requestError();
                res.msg && message.error({ content: res.msg });
            }
        })
    }
}

export const deleteRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.del({
            url: apiUrl.API_CHI_TIET_XU_LY_NDTP,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                dispatch(handleDelete(data));
                requestSuccess();
                res.msg && message.success({ content: res.msg });
            }
            else {
                requestError();
                res.msg && message.error({ content: res.msg });
            }
        })
    }
}

export const handleGetOne = (value) => {
    return {
        type: type.TYPE_XU_LY_NGO_DOC_THUC_PHAM_EDIT,
        value
    }
}

const handleCreate = (value) => {
    return {
        type: type.TYPE_XU_LY_NGO_DOC_THUC_PHAM_CREATE,
        value
    }
}

const handleUpdate = (value) => {
    return {
        type: type.TYPE_XU_LY_NGO_DOC_THUC_PHAM_UPDATE,
        value
    }
}

const handleDelete = (values) => {
    return {
        type: type.TYPE_XU_LY_NGO_DOC_THUC_PHAM_DELETE,
        values
    }
}