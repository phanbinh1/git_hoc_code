import * as api from "../../../../util/api_call";
import * as apiUrl from '../../../../constants/api';
import * as type from "../../../../constants/type";
import * as main from "../../../../constants/main";
import * as actPagination from "../../../core/pagination";
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
            url: apiUrl.API_CSSXKD_QUAN_HUYEN,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                dispatch(handleGetAll(res.result.map(item => ({ ...item, idCoSo: item.id }))));
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

const handleGetAll = (values) => {
    return {
        type: type.TYPE_CO_SO_SAN_XUAT_KINH_DOANH_QUAN_HUYEN_LIST,
        values
    }
}
