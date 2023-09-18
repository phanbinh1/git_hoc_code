import * as api from "./../../../../util/api_call";
import * as apiUrl from './../../../../constants/api';
import * as main from "./../../../../constants/main";
import * as type from "./../../../../constants/type";
import * as message from "./../../../../constants/message";

export const getAllRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest(object);
    if (isPagination) {
        var pagination = main.getParamPagination(pageKey);
        data = { ...pagination, ...data };
    }
    return dispatch => {
        return api.get({
            url: apiUrl.API_QTNVTT_CUOC_THANH_TRA_MAU_KIEM_TRA,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                requestSuccess(res);
            }
            else {
                requestError(res);
            }
        });
    }
}

export const createRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        if (!data.idBienBan) {
            message.error({ content: "Dữ liệu đầu vào không chính xác!" });
        }
        else {
            return api.post({
                url: `${apiUrl.API_QTNVTT_CUOC_THANH_TRA_MAU_KIEM_TRA}/${data.idBienBan}`,
                data,
                controller
            }).then(res => {
                if (res && res.status) {
                    requestSuccess(res);
                    dispatch({
                        type: type.TYPE_QTNVTT_CUOC_THANH_TRA_MAU_UPDATE,
                        value: {
                            idBienBan: data.idBienBan,
                            ...res.result
                        }
                    })
                    res.msg && message.success({ content: res.msg });
                }
                else {
                    requestError();
                    res.msg && message.error({ content: res.msg });
                }
            })
        }
    }
}

export const updateRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        if (!data.id) {
            message.error({ content: "Dữ liệu đầu vào không chính xác!" });
        }
        else {
            return api.put({
                url: apiUrl.API_QTNVTT_CUOC_THANH_TRA_MAU_KIEM_TRA,
                data,
                controller
            }).then(res => {
                if (res && res.status) {
                    requestSuccess(res);
                    dispatch({
                        type: type.TYPE_QTNVTT_CUOC_THANH_TRA_MAU_UPDATE,
                        value: {
                            idBienBan: data.idBienBan,
                            ...res.result
                        }
                    })
                    res.message && message.success({ content: res.message });
                }
                else {
                    requestError();
                    res.message && message.error({ content: res.message });
                }
            })
        }
    }
}

export const deleteRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.del({
            url: apiUrl.API_QTNVTT_CUOC_THANH_TRA_MAU_KIEM_TRA,
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

export const deleteFileRequest = (object = {}) => {
    const { data, requestSuccess, requestError } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.del({
            url: apiUrl.API_QTNVTT_CUOC_THANH_TRA_MAU_KIEM_TRA_UPLOADFILE,
            data,
        }).then(function (res) {
            if (res && res.status) {
                requestSuccess();
                message.success({ content: "Xóa thành công!" });
            }
            else {
                requestError();
                message.error({ content: "Xóa thất bại!" });

            }
        })
    }
}