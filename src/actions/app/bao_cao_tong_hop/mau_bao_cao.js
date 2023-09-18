import * as api from "./../../../util/api_call";
import * as apiUrl from './../../../constants/api';
import * as main from "./../../../constants/main";
import * as message from "./../../../constants/message";

export const getAllRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest(object);
    if (isPagination) {
        var pagination = main.getParamPagination(pageKey);
        data = { ...pagination, ...data };
    }
    return _ => {
        return api.get({
            url: apiUrl.API_BAO_CAO_TONG_HOP_TEMPLATE,
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
    return _ => {
        if (!data.id) {
            message.error({ content: "Dữ liệu đầu vào không chính xác!" });
        }
        else {
            return api.get({
                url: apiUrl.API_BAO_CAO_TONG_HOP_TEMPLATE + `/${data.id}`,
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
    return _ => {
        return api.post({
            url: apiUrl.API_BAO_CAO_TONG_HOP_TEMPLATE,
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

export const updateRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return _ => {
        return api.put({
            url: apiUrl.API_BAO_CAO_TONG_HOP_TEMPLATE,
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

export const deleteRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return _ => {
        return api.del({
            url: apiUrl.API_BAO_CAO_TONG_HOP_TEMPLATE,
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