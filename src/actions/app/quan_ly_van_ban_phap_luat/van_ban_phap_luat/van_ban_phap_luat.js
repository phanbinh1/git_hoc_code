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
            url: apiUrl.API_VAN_BAN_PHAP_LUAT,
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
                requestSuccess(res);
            }
            else {
                requestError(res);
            }
        });
    }
}

export const getOneRequest = (object = {}) => {
    const { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        if (!data.id) {
            message.error({ content: "Dữ liệu đầu vào không chính xác!" });
        }
        else {
            return api.get({
                url: apiUrl.API_VAN_BAN_PHAP_LUAT + `${data.id}`,
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
    const { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.post({
            url: apiUrl.API_VAN_BAN_PHAP_LUAT,
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
    const { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.put({
            url: apiUrl.API_VAN_BAN_PHAP_LUAT,
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
    const { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.del({
            url: apiUrl.API_VAN_BAN_PHAP_LUAT,
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

export const deleteFile_Request = (object) => {
    const { data, requestSuccess, requestError } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.del({
            url: apiUrl.API_VAN_BAN_PHAP_LUAT_UPLOAD,
            data,
        }).then(function (res) {
            if (res && res.status) {
                requestSuccess();
            }
            else {
                requestError();
            }
        })
    }
}

export const downloadFile_Request = (object) => {
    const { data, requestSuccess, requestError } = main.checkValidObjectRequest(object);
    return () => {
        if (data && data.id) {
            return api.download({
                url: apiUrl.API_VAN_BAN_PHAP_LUAT_DOWNLOAD + data.id,
            }).then(function (res) {
                if (res) {
                    requestSuccess();
                }
                else {
                    requestError();
                }
            })
        }
        else {
            message.error({ content: "Dữ liệu không hợp lệ!" });
        }
    }
}

const handleGetAll = (values) => {
    return {
        type: type.TYPE_VAN_BAN_PHAP_LUAT_LIST,
        values
    }
}

export const handleGetOne = (value) => {
    return {
        type: type.TYPE_VAN_BAN_PHAP_LUAT_EDIT,
        value
    }
}

const handleCreate = (value) => {
    return {
        type: type.TYPE_VAN_BAN_PHAP_LUAT_CREATE,
        value
    }
}

const handleUpdate = (value) => {
    return {
        type: type.TYPE_VAN_BAN_PHAP_LUAT_UPDATE,
        value
    }
}

const handleDelete = (values) => {
    return {
        type: type.TYPE_VAN_BAN_PHAP_LUAT_DELETE,
        values
    }
}