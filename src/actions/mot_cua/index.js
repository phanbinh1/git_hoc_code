import * as api from "./../../util/api_call";
import { API_LAY_THANH_PHAN_HO_SO_MOT_CUA, API_DANHMUC_TTHC, API_DANHMUC_CQQL } from './../../constants/api';
import * as main from "./../../constants/main";

export const layThanhPhanHoSoMotCua = (_data) => {
    const { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(_data);
    return api.get({
        url: API_LAY_THANH_PHAN_HO_SO_MOT_CUA,
        data,
        controller
    }).then((res) => {
        if (res && res.status) {
            requestSuccess(res);
        }
        else {
            requestError(res)
        }
    }).catch((res) => {
        requestError(res)
    })
}

export const layThuTucHanhChinhMotCua = (_data) => {
    const { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(_data);
    return api.get({
        url: API_DANHMUC_TTHC,
        data,
        controller
    }).then((res) => {
        if (res && res.status) {
            requestSuccess(res);
        }
        else {
            requestError(res)
        }
    }).catch((res) => {
        requestError(res)
    })
}

export const layCoQuanQuanLyMotCua = (_data) => {
    const { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(_data);
    return api.get({
        url: API_DANHMUC_CQQL,
        data,
        controller
    }).then((res) => {
        if (res && res.status) {
            requestSuccess(res);
        }
        else {
            requestError(res)
        }
    }).catch((res) => {
        requestError(res)
    })
}