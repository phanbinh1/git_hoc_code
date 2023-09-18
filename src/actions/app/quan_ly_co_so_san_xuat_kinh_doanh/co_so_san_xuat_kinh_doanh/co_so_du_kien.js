import * as api from "./../../../../util/api_call";
import * as apiUrl from './../../../../constants/api';
import * as main from "./../../../../constants/main";
import * as message from "./../../../../constants/message";
/**
 *  ==============================================================================
 *  ==============================================================================
 */

export const getAllRequest = async (object = {}) => {
    var { data, controller } = main.checkValidObjectRequest(object);
    return await api.get({
        url: apiUrl.API_CO_SO_SAN_XUAT_KINH_DOANH_KIEM_TRA_CO_SO,
        data,
        controller
    })
}

export const shareRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return api.post({
        url: `${apiUrl.API_CO_SO_SAN_XUAT_KINH_DOANH_KIEM_TRA_CO_SO}/chiase`,
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
        return res;
    })
}

export const createRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return api.post({
        url: apiUrl.API_CO_SO_SAN_XUAT_KINH_DOANH_KIEM_TRA_CO_SO,
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
        return res;
    })
}

export const updateRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return api.put({
        url: apiUrl.API_CO_SO_SAN_XUAT_KINH_DOANH_KIEM_TRA_CO_SO,
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
        return res;
    })
}

export const deleteRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return api.del({
        url: apiUrl.API_CO_SO_SAN_XUAT_KINH_DOANH_KIEM_TRA_CO_SO,
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
        return res
    })
}