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
            url: apiUrl.API_PAKN_BIEN_BAN_XU_PHAT,
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
                url: apiUrl.API_PAKN_BIEN_BAN_XU_PHAT + `/${data.id}`,
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
            url: apiUrl.API_PAKN_BIEN_BAN_XU_PHAT,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                dispatch(handleCreate({
                    hoSoPhanAnhKienNghi: data.hoSoPhanAnhKienNghi,
                    ...res.result
                }));
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
            url: apiUrl.API_PAKN_BIEN_BAN_XU_PHAT,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                dispatch(handleUpdate({
                    hoSoPhanAnhKienNghi: data.hoSoPhanAnhKienNghi,
                    ...res.result
                }));
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
            url: apiUrl.API_PAKN_BIEN_BAN_XU_PHAT,
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
        type: type.TYPE_PAKN_BIEN_BAN_XU_PHAT_LIST,
        values
    }
}

export const handleGetOne = (value) => {
    return {
        type: type.TYPE_PAKN_BIEN_BAN_XU_PHAT_EDIT,
        value: {
            ...value,
            trangThaiChapHanh: value.trangThaiChapHanh === true ? 1 : 0
        }
    }
}

const handleCreate = (value) => {
    return {
        type: type.TYPE_PAKN_BIEN_BAN_XU_PHAT_CREATE,
        value
    }
}

const handleUpdate = (value) => {
    return {
        type: type.TYPE_PAKN_BIEN_BAN_XU_PHAT_UPDATE,
        value
    }
}

const handleDelete = (values) => {
    return {
        type: type.TYPE_PAKN_BIEN_BAN_XU_PHAT_DELETE,
        values
    }
}