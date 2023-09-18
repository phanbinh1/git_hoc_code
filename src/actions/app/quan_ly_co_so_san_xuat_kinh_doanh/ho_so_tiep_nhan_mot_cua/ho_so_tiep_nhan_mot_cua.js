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
    if (data.searchData) {
        data = { ...data, ...data.searchData };
        delete data.searchData;
    }
    return dispatch => {
        return api.get({
            url: apiUrl.API_HO_SO_TIEP_NHAN_MOT_CUA,
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
                requestSuccess();
            }
            else {
                requestError();
            }
        });
    }
}

export const checkCoSoExistRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        if (!data._id) {
            // message.error({ content: "Dữ liệu đầu vào không chính xác!" });
        }
        else {
            return api.get({
                url: apiUrl.API_HO_SO_TIEP_NHAN_MOT_CUA_CHECKEXIST_CO_SO(data._id),
                controller
            }).then(res => {
                if (res && res.status) {
                    requestSuccess(res);
                }
                else {
                    requestError();
                }
            })
        }
    }
}

export const checkHoSoExistRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        if (!data._id) {
            // message.error({ : "Dữ liệu đầu vào không chính xác!" });
        }
        else {
            return api.get({
                url: apiUrl.API_HO_SO_TIEP_NHAN_MOT_CUA_CHECKEXIST_HO_SO(data._id),
                controller
            }).then(res => {
                if (res && res.status) {
                    requestSuccess(res);
                }
                else {
                    requestError();
                }
            })
        }
    }
}

const handleGetAll = (values) => {
    return {
        type: type.TYPE_HO_SO_TIEP_NHAN_MOT_CUA_LIST,
        values
    }
}

export const handleCreate = (hoSoMotCuaId) => {
    return {
        type: type.TYPE_HO_SO_TIEP_NHAN_MOT_CUA_CREATE,
        hoSoMotCuaId
    }
}