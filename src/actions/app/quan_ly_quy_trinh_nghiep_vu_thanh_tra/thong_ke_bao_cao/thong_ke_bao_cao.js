import * as api from "./../../../../util/api_call";
import * as apiUrl from './../../../../constants/api';
import * as main from "./../../../../constants/main";
import * as message from "./../../../../constants/message";
import * as actPagination from "./../../../../actions/core/pagination";
/**
 *  ==============================================================================
 *  ==============================================================================
 */

//  /nghiepvu/congtacthanhkiemtra/thongtindoanthanhkiemtra
export const getAllThongTinPhanCong = (object = {}) => {
    var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest(object);
    if (isPagination) {
        var pagination = main.getParamPagination(pageKey);
        data = { ...pagination, ...data };
    }

    return dispatch => {
        return api.get({
            url: apiUrl.API_QTNVTT_TKBC_TTPC,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
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
                res && res.msg && message.error({ content: res.msg });
                requestError();
            }
        });
    }
}

export const getAllDSCSRequest = (object = {}, type = 1) => {
    var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest(object);
    if (isPagination) {
        var pagination = main.getParamPagination(pageKey);
        data = { ...pagination, ...data };
    }
    let url = apiUrl.API_QTNVTT_TKBC_DSCS_DB
    if (type === 1) {
        url = apiUrl.API_QTNVTT_TKBC_DSCS_DB;
    }
    else {
        url = apiUrl.API_QTNVTT_TKBC_DSCS_CTKT;
    }

    return dispatch => {
        return api.get({
            url,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
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
                res && res.msg && message.error({ content: res.msg });
                requestError();
            }
        });
    }
}

export const getAllCTVPRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest(object);
    if (isPagination) {
        var pagination = main.getParamPagination(pageKey);
        data = { ...pagination, ...data };
    }
    return dispatch => {
        if (data && data.tuNgay) {
            return api.get({
                url: apiUrl.API_QTNVTT_TKBC_CTVP,
                data,
                controller
            }).then(res => {
                if (res && res.status) {
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
                    res && res.msg && message.error({ content: res.msg });
                    requestError();
                }
            });
        }
    }
}