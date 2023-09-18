import * as api from "./../../../../util/api_call";
import * as apiUrl from './../../../../constants/api';
import * as type from "./../../../../constants/type";
import * as main from "./../../../../constants/main";
import * as message from "./../../../../constants/message";
import * as actPagination from "./../../../../actions/core/pagination";

/**
 *  ==============================================================================
 *  ==============================================================================
 */

export const getAllThongKeRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest(object);
    if (isPagination) {
        var pagination = main.getParamPagination(pageKey);
        data = { ...pagination, ...data };
    }

    return dispatch => {
        return api.get({
            url: apiUrl.API_QTDTXL_NDTP_THONG_KE_BAO_CAO,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                dispatch(handleGetAllThongKe(res.result));
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

export const getAllThongKeChiTietRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest(object);
    if (isPagination) {
        var pagination = main.getParamPagination(pageKey);
        data = { ...pagination, ...data };
    }

    return dispatch => {
        return api.get({
            url: apiUrl.API_QTDTXL_NDTP_THONG_KE_BAO_CAO_CHI_TIET,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                dispatch(handleGetAllThongKeBaoCao(res.result));
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

const handleGetAllThongKe = (values) => {
    return {
        type: type.TYPE_QTDTXL_NDTP_THONG_KE_BAO_CAO_LIST,
        values
    }
}

const handleGetAllThongKeBaoCao = (values) => {
    return {
        type: type.TYPE_QTDTXL_NDTP_THONG_KE_BAO_CAO_CHI_TIET_LIST,
        values
    }
}