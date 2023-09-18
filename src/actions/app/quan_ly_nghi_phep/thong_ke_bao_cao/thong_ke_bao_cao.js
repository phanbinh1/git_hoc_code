import * as api from "./../../../../util/api_call";
import * as apiUrl from './../../../../constants/api';
import * as type from "./../../../../constants/type";
import * as main from "./../../../../constants/main";
import * as actPagination from "./../../../../actions/core/pagination";
/**
 *  ==============================================================================
 *  ==============================================================================
 */
export const getAllRequestNghiPhep= (object = {}) => {
    var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest(object);
    if (isPagination) {
        var pagination = main.getParamPagination(pageKey);
        data = { ...pagination, ...data };
    }

    return dispatch => {
        return api.get({
            url: apiUrl.API_BAO_CAO_THONG_KE_NGHI_PHEP,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                if (res.result) {
                    dispatch(handleGetAllNghiPhep(res.result));
                }
                else {
                    dispatch(handleGetAllNghiPhep([]));
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

const handleGetAllNghiPhep = (values) => {
    return {
        type: type.TYPE_THONG_KE_BAO_CAO_NGHI_PHEP_LIST,
        values
    }
}


