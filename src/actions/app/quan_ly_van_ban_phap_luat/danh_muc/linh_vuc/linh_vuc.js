import * as api from "./../../../../../util/api_call";
import * as apiUrl from './../../../../../constants/api';
import * as type from "./../../../../../constants/type";
import * as main from "./../../../../../constants/main";
import * as message from "./../../../../../constants/message";
import * as actPagination from "./../../../../../actions/core/pagination";

/**
 *  ==============================================================================
 *  ==============================================================================
 */

export const getTreeRequest = (object = {}) => {
    var { requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);

    return dispatch => {
        return api.get({
            url: apiUrl.API_VBPL_LINH_VUC + "danhsach/tree",
            controller
        }).then(res => {
            if (res && res.status) {
                dispatch(handleGetTree(res.result));
                requestSuccess();
            }
            else {
                requestError();
            }
        });
    }
}

export const getAllRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest(object);
    if (isPagination) {
        var pagination = main.getParamPagination(pageKey);
        data = { ...pagination, ...data };
    }
    return dispatch => {
        return api.get({
            url: apiUrl.API_VBPL_LINH_VUC,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                if (data.refreshStore !== false) {
                    dispatch(handleGetAll(res.result));
                    if (res.hasOwnProperty("pagination") && isPagination) {
                        dispatch(actPagination.Pagination({
                            ...res.pagination
                        },
                            pageKey)
                        );
                    }
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
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        if (!data.ma) {
            message.error({ content: "Dữ liệu đầu vào không chính xác!" });
        }
        else {
            return api.get({
                url: apiUrl.API_VBPL_LINH_VUC + `${data.ma}`,
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
            url: apiUrl.API_VBPL_LINH_VUC,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                dispatch(handleCreate(res.result));
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

export const updateRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.put({
            url: apiUrl.API_VBPL_LINH_VUC,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                dispatch(handleUpdate(res.result));
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

export const deleteRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.del({
            url: apiUrl.API_VBPL_LINH_VUC,
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

const handleGetTree = (values) => {
    return {
        type: type.TYPE_VBPL_LINH_VUC_LIST_TREE,
        values
    }
}

const handleGetAll = (values) => {
    return {
        type: type.TYPE_VBPL_LINH_VUC_LIST,
        values
    }
}

export const handleGetOne = (value) => {
    return {
        type: type.TYPE_VBPL_LINH_VUC_EDIT,
        value
    }
}

const handleCreate = (value) => {
    return {
        type: type.TYPE_VBPL_LINH_VUC_CREATE,
        value
    }
}

const handleUpdate = (value) => {
    return {
        type: type.TYPE_VBPL_LINH_VUC_UPDATE,
        value
    }
}

const handleDelete = (values) => {
    return {
        type: type.TYPE_VBPL_LINH_VUC_DELETE,
        values
    }
}