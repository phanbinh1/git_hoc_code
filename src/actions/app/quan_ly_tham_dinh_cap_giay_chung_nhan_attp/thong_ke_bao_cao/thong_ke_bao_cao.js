import * as api from "../../../../util/api_call";
import * as apiUrl from '../../../../constants/api';
import * as type from "../../../../constants/type";
import * as main from "../../../../constants/main";
import * as message from "../../../../constants/message";
import * as actPagination from "../../../../actions/core/pagination";

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
            url: apiUrl.API_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_REPORT,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                dispatch(handleGetAll(res.result));
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

const handleGetAll = (value) => {
    return {
        type: type.TYPE_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_REPORT_LIST,
        value
    }
}