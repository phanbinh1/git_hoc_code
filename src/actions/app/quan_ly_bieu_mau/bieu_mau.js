import * as api from "../../../util/api_call";
import * as apiUrl from '../../../constants/api';
import * as main from "../../../constants/main";
import * as message from "../../../constants/message";
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
            url: apiUrl.API_QUAN_LY_BIEU_MAU_DINH_KEM,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
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
            message.error({ content: "Dữ liệu đầu vào không chính xác!" });
        }
        else {
            return api.get({
                url: apiUrl.API_QUAN_LY_BIEU_MAU_DINH_KEM + `/${data.id}`,
                controller
            }).then(res => {
                if (res && res.status) {
                    requestSuccess(res);
                }
                else {
                    requestError();
                }
            })
        }
    }
}

export const getByTypeAndIdRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        if (!data.bieuMauType || !data.entityId) {
            message.error({ content: "Dữ liệu đầu vào không chính xác 123!" });
        }
        else {
            return api.get({
                url: apiUrl.API_QUAN_LY_BIEU_MAU_DINH_KEM + `/type/entityid`,
                data,
                controller
            }).then(res => {
                if (res && res.status) {
                    requestSuccess(res);
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
            url: apiUrl.API_QUAN_LY_BIEU_MAU_DINH_KEM,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                requestSuccess(res);
                res.msg && message.success({ content: res.msg });
            }
            else {
                requestError(res);
                res.msg && message.error({ content: res.msg });
            }
        })
    }
}

export const updateRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.put({
            url: apiUrl.API_QUAN_LY_BIEU_MAU_DINH_KEM,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
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

export const deleteRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.del({
            url: apiUrl.API_QUAN_LY_BIEU_MAU_DINH_KEM,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
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