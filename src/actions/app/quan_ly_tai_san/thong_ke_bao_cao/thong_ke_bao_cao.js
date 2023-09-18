import * as api from "./../../../../util/api_call";
import * as apiUrl from './../../../../constants/api';
import * as type from "./../../../../constants/type";
import * as main from "./../../../../constants/main";
import * as actPagination from "./../../../../actions/core/pagination";
/**
 *  ==============================================================================
 *  ==============================================================================
 */
export const getAllRequestTaiSanCoDinh = (object = {}) => {
    var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest(object);
    if (isPagination) {
        var pagination = main.getParamPagination(pageKey);
        data = { ...pagination, ...data };
    }

    return dispatch => {
        return api.get({
            url: apiUrl.API_BAO_CAO_THONG_KE_TAI_SAN_CO_DINH,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                if (res.result) {
                    dispatch(handleGetAllTaiSanCoDinh(res.result));
                }
                else {
                    dispatch(handleGetAllTaiSanCoDinh([]));
                }

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
                requestError();
            }
        });
    }
}

const handleGetAllTaiSanCoDinh = (values) => {
    return {
        type: type.TYPE_THONG_KE_BAO_CAO_TAI_SAN_CO_DINH_LIST,
        values
    }
}


export const getAllRequestCongCuDungCu = (object = {}) => {
    var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest(object);
    if (isPagination) {
        var pagination = main.getParamPagination(pageKey);
        data = { ...pagination, ...data };
    }

    return dispatch => {
        return api.get({
            url: apiUrl.API_BAO_CAO_THONG_KE_CONG_CU_DUNG_CU,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                if (res.result) {
                    dispatch(handleGetAllCongCuDungCu(res.result));
                }
                else {
                    dispatch(handleGetAllCongCuDungCu([]));
                }

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
                requestError();
            }
        });
    }
}

const handleGetAllCongCuDungCu = (values) => {
    return {
        type: type.TYPE_THONG_KE_BAO_CAO_CONG_CU_DUNG_CU_LIST,
        values
    }
}


