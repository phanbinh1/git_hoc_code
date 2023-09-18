import * as api from "./../../../util/api_call";
import * as apiUrl from './../../../constants/api';
import * as main from "./../../../constants/main";

/**
 *  ==============================================================================
 *  ==============================================================================
 */

export const thongKeCapGiayChungNhan = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);

    return dispatch => {
        return api.get({
            url: apiUrl.API_BAO_CAO_THONG_KE_CAP_GIAY_CHUNG_NHAN_ATTP,
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