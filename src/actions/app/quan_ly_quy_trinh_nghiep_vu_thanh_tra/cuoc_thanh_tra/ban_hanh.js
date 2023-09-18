import * as api from "./../../../../util/api_call";
import * as apiUrl from './../../../../constants/api';
import * as main from "./../../../../constants/main";
import * as message from "./../../../../constants/message";
/**
 *  ==============================================================================
 *  ==============================================================================
 */
export const createBanHanhQuyetDinhThanhLapDoanThanhTraRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.post({
            url: apiUrl.API_QTNVTT_CUOCTHANHTRA_QUYET_DINH_THANH_LAP_DOAN_THANH_TRA,
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

export const updateBanHanhQuyetDinhThanhLapDoanThanhTraRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.put({
            url: apiUrl.API_QTNVTT_CUOCTHANHTRA_QUYET_DINH_THANH_LAP_DOAN_THANH_TRA,
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
