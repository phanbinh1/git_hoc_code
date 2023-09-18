import * as api from "./../../../../util/api_call";
import * as apiUrl from './../../../../constants/api';
import * as main from "./../../../../constants/main";
import * as message from "./../../../../constants/message";
import * as type from "./../../../../constants/type";

export const getAllRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest(object);
    if (isPagination) {
        var pagination = main.getParamPagination(pageKey);
        data = { ...pagination, ...data };
    }
    return dispatch => {
        return api.get({
            url: data.getAllXepHang ? apiUrl.API_QTNVTT_CUOC_THANH_TRA_XEP_HANG(data.idCuocThanhTra) : apiUrl.API_QTNVTT_CUOC_THANH_TRA_XEP_HANG_BY_ACCOUNT(data.idCuocThanhTra),
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
        if (data.hasOwnProperty("id") && data.hasOwnProperty("idCoSo") && data.hasOwnProperty("xepHangCoSo")) {
            return api.post({
                url: `${apiUrl.API_QTNVTT_CUOC_THANH_TRA_XEP_HANG_DANH_GIA}?id=${data.id}&idCoSo=${data.idCoSo}`,
                data: data.xepHangCoSo,
                controller
            }).then(res => {
                if (res && res.status) {
                    dispatch({
                        type: type.TYPE_QTNVTT_CUOC_THANH_TRA_XEP_HANG_CREATE,
                        value: {
                            idCoSo: data._idCoSo,
                            ...res.result
                        }
                    })
                    requestSuccess(res);
                    message.success({ content: "Xếp hạng thành công!" });

                }
                else {
                    requestError();
                    message.error({ content: "Xếp hạng thất bại!" });
                }
            })
        }
        else {
            message.error({ content: "Dữ liệu đầu vào không chính xác!" });
        }
    }
}

export const updateRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        if (data.hasOwnProperty("id") && data.hasOwnProperty("xepHangCoSo")) {
            return api.put({
                url: apiUrl.API_QTNVTT_CUOC_THANH_TRA_XEP_HANG(data.id),
                data: data.xepHangCoSo,
                controller
            }).then(res => {
                if (res && res.status) {
                    dispatch({
                        type: type.TYPE_QTNVTT_CUOC_THANH_TRA_XEP_HANG_UPDATE,
                        value: {
                            idCoSo: data._idCoSo,
                            ...res.result
                        }
                    })
                    requestSuccess(res);
                    message.success({ content: "Xếp hạng thành công!" });

                }
                else {
                    requestError();
                    message.error({ content: "Xếp hạng thất bại!" });
                }
            })
        }
        else {
            message.error({ content: "Dữ liệu đầu vào không chính xác!" });
        }
    }
}

export const deleteRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.del({
            url: apiUrl.API_QTNVTT_CUOC_THANH_TRA_XEP_HANG_DANH_GIA,
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