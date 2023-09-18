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
    var { data, requestSuccess, requestError, controller, pageKey, isPagination, loaiTaiSan } = main.checkValidObjectRequest(object);
    if (isPagination) {
        var pagination = main.getParamPagination(pageKey);
        data = { ...pagination, ...data };
    }

    return dispatch => {
        return api.get({
            url: apiUrl.API_QUAN_LY_TAI_SAN,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                dispatch(handleGetAll(res.result.map(item => ({ ...item.quanLyTaiSan, soLuongDaCap: item.soLuongDaCap })), loaiTaiSan));
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
    var { data, requestSuccess, requestError, controller, loaiTaiSan } = main.checkValidObjectRequest(object);
    return dispatch => {
        if (!data.id) {
            message.error({ content: "Dữ liệu đầu vào không chính xác!" });
            requestError();
        }
        else {
            return api.get({
                url: apiUrl.API_QUAN_LY_TAI_SAN + `/${data.id}`,
                controller
            }).then(res => {
                if (res && res.status && res.result) {
                    const result = { ...res.result.quanLyTaiSan, soLuongDaCap: res.result.soLuongDaCap };
                    dispatch(handleGetOne(result, loaiTaiSan));
                    requestSuccess({ ...res, result });
                }
                else {
                    requestError(res);
                }
            })
        }
    }
}

export const getListDetailRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest(object);
    if (isPagination) {
        var pagination = main.getParamPagination(pageKey);
        data = { ...pagination, ...data };
    }
    return dispatch => {
        if (data.id) {
            return api.get({
                url: apiUrl.API_QUAN_LY_TAI_SAN_LIST_DETAIL(data.id),
                data,
                controller
            }).then(res => {
                if (res && res.status) {
                    dispatch(handleGetListDetail(res.result, data.id));
                    if (res.hasOwnProperty("pagination") && isPagination) {
                        dispatch(actPagination.Pagination({ ...res.pagination }, pageKey));
                    }
                    requestSuccess();
                }
                else {
                    requestError();
                }
            });
        }
        else {
            message.error({ content: "Dữ liệu đầu vào không chính xác 123123!" });
            requestError();
        }
    }
}

export const createRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller, loaiTaiSan } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.post({
            url: apiUrl.API_QUAN_LY_TAI_SAN,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                dispatch(handleCreate(res.result, loaiTaiSan));
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
    var { data, requestSuccess, requestError, controller, loaiTaiSan } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.put({
            url: apiUrl.API_QUAN_LY_TAI_SAN,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                dispatch(handleUpdate(res.result, loaiTaiSan));
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
    var { data, requestSuccess, requestError, controller, loaiTaiSan } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.del({
            url: apiUrl.API_QUAN_LY_TAI_SAN,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                dispatch(handleDelete(data, loaiTaiSan));
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

const handleGetListDetail = (values, id) => {
    return {
        type: type.TYPE_QUAN_LY_TAI_SAN_LIST_DETAIL,
        values,
        id
    }
}

const handleGetAll = (values, loaiTaiSan) => {
    return {
        type: type.TYPE_QUAN_LY_TAI_SAN_LIST,
        values,
        loaiTaiSan
    }
}

export const handleGetOne = (value, loaiTaiSan) => {
    return {
        type: type.TYPE_QUAN_LY_TAI_SAN_EDIT,
        value,
        loaiTaiSan
    }
}

const handleCreate = (value, loaiTaiSan) => {
    return {
        type: type.TYPE_QUAN_LY_TAI_SAN_CREATE,
        value,
        loaiTaiSan
    }
}

const handleUpdate = (value, loaiTaiSan) => {
    return {
        type: type.TYPE_QUAN_LY_TAI_SAN_UPDATE,
        value,
        loaiTaiSan
    }
}

const handleDelete = (values, loaiTaiSan) => {
    return {
        type: type.TYPE_QUAN_LY_TAI_SAN_DELETE,
        values,
        loaiTaiSan
    }
}


export const getChiTiet = (object = {}) => {
    var { data, requestSuccess, requestError, controller, pageKey, isPagination, id } = main.checkValidObjectRequest(object);
    if (isPagination) {
        var pagination = main.getParamPagination(pageKey);
        data = { ...pagination, ...data, id };
    }
    return dispatch => {
        if (data.id) {
            return api.get({
                url: apiUrl.API_QUAN_LY_TAI_SAN_LIST_DETAIL(data.id),
                data,
                controller
            }).then(res => {
                if (res && res.status) {
                    dispatch(handleGetListDetail(res.result, data.id));
                    if (res.hasOwnProperty("pagination") && isPagination) {
                        dispatch(actPagination.Pagination({ ...res.pagination }, pageKey));
                    }
                    requestSuccess(res);
                }
                else {
                    requestError(res);
                }
            });
        }
        else {
            message.error({ content: "Dữ liệu đầu vào không chính xác 123123!" });
            requestError();
        }
    }
}