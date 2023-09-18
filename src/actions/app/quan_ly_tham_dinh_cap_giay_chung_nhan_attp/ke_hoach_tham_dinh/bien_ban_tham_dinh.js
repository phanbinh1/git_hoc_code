import * as api from "./../../../../util/api_call";
import * as apiUrl from './../../../../constants/api';
import * as main from "./../../../../constants/main";
import * as message from "./../../../../constants/message";

export const getListByIdHoSo = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return () => {
        if (!data.idHoSo) {
            message.error({ content: "Dữ liệu đầu vào không chính xác!" });
        }
        else {
            return api.get({
                url: apiUrl.API_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_BIEN_BAN_THAM_DINH_DS(data.idHoSo),
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

export const getOneRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        if (!data.id) {
            message.error({ content: "Dữ liệu đầu vào không chính xác!" });
        }
        else {
            return api.get({
                url: apiUrl.API_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_BIEN_BAN_THAM_DINH + `/${data.id}`,
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
    return () => {
        return api.post({
            url: apiUrl.API_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_BIEN_BAN_THAM_DINH,
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
    return () => {
        return api.put({
            url: apiUrl.API_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_BIEN_BAN_THAM_DINH,
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