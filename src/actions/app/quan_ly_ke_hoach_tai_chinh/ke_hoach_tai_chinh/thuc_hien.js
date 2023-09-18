import * as api from "./../../../../util/api_call";
import * as apiUrl from './../../../../constants/api';
import * as type from "./../../../../constants/type";
import * as main from "./../../../../constants/main";
import * as message from "./../../../../constants/message";
import * as actPagination from "./../../../../actions/core/pagination";

/**
 *  ==============================================================================
 *  ==============================================================================
 */


export const getAllRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest(object);
    if (isPagination) {
        var pagination = main.getParamPagination(pageKey);
        data = { ...pagination, ...data };
    }

    return dispatch => {
        return api.get({
            url: apiUrl.API_QUAN_LY_THUC_HIEN_TAI_CHINH,
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
                requestSuccess();
            }
            else {
                requestError();
            }
        });
    }
}


export const getOneRequest = (object = {}) => {
    console.log(object)
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);

    console.log(data)
    return dispatch => {
        if (!data.id) {
            message.error({ content: "Dữ liệu đầu vào không chính xác!" });
            requestError();
        }
        else {
            return api.get({
                url: apiUrl.API_QUAN_LY_THUC_HIEN_TAI_CHINH + `/${data.id}`,
                controller
            }).then(res => {
                if (res && res.status && res.result) {
                    const result = { ...res.result };
                    dispatch(handleGetOne(result));
                    requestSuccess({ ...res, result });
                }
                else {
                    requestError(res);
                }
            })
        }
    }
}



export const getAllRequestThucHien = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        if (!data.id) {
            message.error({ content: "Dữ liệu đầu vào không chính xác!" });
            requestError();
        }
        else {
            return api.get({
                url: apiUrl.API_QUAN_LY_THUC_HIEN_TAI_CHINH_CHI_TIET + `/${data.id}`,
                controller
            }).then(res => {
                if (res && res.status) {
                    dispatch(handleGetOne(res.result));
                    requestSuccess(res);
                }
                else {
                    requestError(res);
                }
            })
        }
    }
}



export const getThucHienRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        if (!data.id) {
            message.error({ content: "Dữ liệu đầu vào không chính xác!" });
            requestError();
        }
        else {
            return api.get({
                url: apiUrl.API_QUAN_LY_THUC_HIEN + `/${data.id}/chitiet`,
                controller
            }).then(res => {
                if (res && res.status && res.result) {
                    const result = { ...res.result };
                    dispatch(handleGetOne(result));
                    requestSuccess({ ...res, result });
                }
                else {
                    requestError(res);
                }
            })
        }
    }
}


export const createRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.post({
            url: apiUrl.API_QUAN_LY_THUC_HIEN_TAI_CHINH,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                dispatch(handleCreate(res.result));
                requestSuccess(res);
                message.success({ content: res.msg || "Thêm mới thành công!" });
            }
            else {
                requestError();
                message.error({ content: res.msg || "Thêm mới thất bại" });
            }
        })
    }
}



export const updateRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.put({
            url: apiUrl.API_QUAN_LY_THUC_HIEN_TAI_CHINH,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                dispatch(handleUpdate(res.result));
                requestSuccess(res);
                message.success({ content: res.msg || "Cập nhật thành công!" });
            }
            else {
                requestError();
                message.error({ content: res.msg || "Cập nhật thất bại!" });
            }
        })
    }
}

export const deleteRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.del({
            url: apiUrl.API_QUAN_LY_THUC_HIEN_TAI_CHINH,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                dispatch(handleDelete(data));
                requestSuccess(res);
                res.msg && message.success({ content: res.msg });
            }
            else {
                requestError();
                res.msg && message.error({ content: res.msg });
            }
        })
    }
}

export const handleGetAll = (values) => {
    return {
        type: type.TYPE_TAI_CHINH_THUC_HIEN_LIST,
        values,
    }
}

export const handleGetOne = (value) => {
    return {
        type: type.TYPE_TAI_CHINH_THUC_HIEN_EDIT,
        value,
    }
}

export const handleCreate = (value) => {
    return {
        type: type.TYPE_TAI_CHINH_THUC_HIEN_CREATE,
        value,
    }
}

const handleUpdate = (value) => {
    return {
        type: type.TYPE_TAI_CHINH_THUC_HIEN_UPDATE,
        value,
    }
}

const handleDelete = (values) => {
    return {
        type: type.TYPE_TAI_CHINH_THUC_HIEN_DELETE,
        values,
    }
}