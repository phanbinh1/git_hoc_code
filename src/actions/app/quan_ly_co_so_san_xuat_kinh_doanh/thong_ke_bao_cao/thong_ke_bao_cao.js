import * as api from "./../../../../util/api_call";
import * as apiUrl from './../../../../constants/api';
import * as type from "./../../../../constants/type";
import * as main from "./../../../../constants/main";
import * as actPagination from "./../../../../actions/core/pagination";
/**
 *  ==============================================================================
 *  ==============================================================================
 */
export const getAllRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest(object);
    if (isPagination) {
        var pagination = main.getParamPagination(pageKey);
        data = { ...pagination, ...data };
    }

    return dispatch => {
        return api.get({
            url: apiUrl.API_CO_SO_SAN_XUAT_KINH_DOANH_THONG_KE_BAO_CAO,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                if (res.result.listCoSo) {
                    dispatch(handleGetAllCoSo(res.result.listCoSo));
                }
                else {
                    dispatch(handleGetAllCoSo([]));
                }

                if (res.result.soLieuTongHop) {
                    dispatch(handleGetAllSoLieuTongHop(res.result.soLieuTongHop));
                }
                else {
                    dispatch(handleGetAllSoLieuTongHop([]));
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

const handleGetAllCoSo = (values) => {
    return {
        type: type.TYPE_CO_SO_SAN_XUAT_KINH_DOANH_THONG_KE_BAO_CAO_LIST_CO_SO,
        values
    }
}

const handleGetAllSoLieuTongHop = (values) => {
    return {
        type: type.TYPE_CO_SO_SAN_XUAT_KINH_DOANH_THONG_KE_BAO_CAO_SO_LIEU_TONG_HOP,
        values
    }
}