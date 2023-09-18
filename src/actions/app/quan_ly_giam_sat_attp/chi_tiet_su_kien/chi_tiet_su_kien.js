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
            url: apiUrl.API_CHI_TIET_SU_KIEN,
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
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        if (!data.id) {
            message.error({ content: "Dữ liệu đầu vào không chính xác!" });
            requestError();
        }
        else {
            return api.get({
                url: apiUrl.API_CHI_TIET_SU_KIEN + `/${data.id}`,
                controller
            }).then(res => {
                if (res && res.status && res.result) {
                    const result = { ...res.result};
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
            url: apiUrl.API_CHI_TIET_SU_KIEN,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                dispatch(handleCreate(res.result));
                requestSuccess();
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
            url: apiUrl.API_CHI_TIET_SU_KIEN,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                dispatch(handleUpdate(res.result));
                requestSuccess();
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
            url: apiUrl.API_CHI_TIET_SU_KIEN,
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

const handleGetAll = (values) => {
    return {
        type: type.TYPE_CHI_TIET_SU_KIEN_LIST,
        values,
    }
}

export const handleGetOne = (value) => {
    return {
        type: type.TYPE_CHI_TIET_SU_KIEN_EDIT,
        value,
    }
}

const handleCreate = (value) => {
    return {
        type: type.TYPE_CHI_TIET_SU_KIEN_CREATE,
        value,
    }
}

const handleUpdate = (value) => {
    return {
        type: type.TYPE_CHI_TIET_SU_KIEN_UPDATE,
        value,
    }
}

const handleDelete = (values) => {
    return {
        type: type.TYPE_CHI_TIET_SU_KIEN_DELETE,
        values,
    }
}