import * as api from "./../../../util/api_call";
import * as apiUrl from './../../../constants/api';
import * as type from "./../../../constants/type";
import * as main from "./../../../constants/main";
import * as message from "./../../../constants/message";
import * as actPagination from "./../../../actions/core/pagination";

export const getAllRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.get({
            url: apiUrl.API_CAU_HINH_NGHI_PHEP,
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
                url: apiUrl.API_CAU_HINH_NGHI_PHEP + `/${data.id}`,
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

export const getOneByMaRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        if (!data.maCauHinh) {
            message.error({ content: "Dữ liệu đầu vào không hợp lệ!" });
        }
        else {
            return api.get({
                url: apiUrl.API_CAU_HINH_NGHI_PHEP + `/ma/${data.maCauHinh}`,
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
            url: apiUrl.API_CAU_HINH_NGHI_PHEP,
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
            url: apiUrl.API_CAU_HINH_NGHI_PHEP,
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
            url: apiUrl.API_CAU_HINH_NGHI_PHEP,
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
        type: type.TYPE_CAU_HINH_NGHI_PHEP_LIST,
        values
    }
}

export const handleGetOne = (value) => {
    return {
        type: type.TYPE_CAU_HINH_NGHI_PHEP_EDIT,
        value
    }
}

const handleCreate = (value) => {
    return {
        type: type.TYPE_CAU_HINH_NGHI_PHEP_CREATE,
        value
    }
}

const handleUpdate = (value) => {
    return {
        type: type.TYPE_CAU_HINH_NGHI_PHEP_UPDATE,
        value
    }
}

const handleDelete = (values) => {
    return {
        type: type.TYPE_CAU_HINH_NGHI_PHEP_DELETE,
        values
    }
}