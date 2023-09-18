import * as api from "./../../../util/api_call";
import * as apiUrl from './../../../constants/api';
import * as type from "./../../../constants/type";
import * as main from "./../../../constants/main";
import * as message from "./../../../constants/message";
import * as actPagination from "./../../../actions/core/pagination";
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
            url: apiUrl.API_CONG_TAC_HAU_KIEM,
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

export const getAllHoSoHauKiemRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest(object);
    if (isPagination) {
        var pagination = main.getParamPagination(pageKey);
        data = { ...pagination, ...data };
    }

    return dispatch => {
        return api.get({
            url: apiUrl.API_HO_SO_TU_CONG_BO,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                dispatch(onAdditional(res.result, type.TYPE_KE_HOACH_HAU_KIEM_HO_SO_TU_CONG_BO_LIST));
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
                requestError(res);
            }
        });
    }
}

export const getOneRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        if (!data.id) {
            message.error({ content: "Dữ liệu đầu vào không chính xác!" });
        }
        else {
            return api.get({
                url: apiUrl.API_CONG_TAC_HAU_KIEM + `/${data.id}`,
                controller
            }).then(res => {
                if (res && res.status) {
                    dispatch(handleGetOne(res.result));
                    requestSuccess();
                }
                else {
                    requestError();
                }
            })
        }
    }
}

export const createRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.post({
            url: apiUrl.API_CONG_TAC_HAU_KIEM,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                dispatch(handleCreate(res.result));
                requestSuccess();
                res.msg && message.success({ content: res.msg });
            }
            else {
                requestError();
                res.msg && message.error({ content: res.msg });
            }
        })
    }
}

export const updateRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.put({
            url: apiUrl.API_CONG_TAC_HAU_KIEM,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                dispatch(handleUpdate(res.result));
                requestSuccess();
                res.msg && message.success({ content: res.msg });
            }
            else {
                requestError();
                res.msg && message.error({ content: res.msg });
            }
        })
    }
}

export const deleteRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.del({
            url: apiUrl.API_CONG_TAC_HAU_KIEM,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                dispatch(handleDelete(data));
                requestSuccess();
                res.msg && message.success({ content: res.msg });
            }
            else {
                requestError();
                res.msg && message.error({ content: res.msg });
            }
        })
    }
}

export const confirmRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.put({
            url: apiUrl.API_CONG_TAC_HAU_KIEM_PHE_DUYET(data.trangThaiPheDuyet),
            data: data.keHoachHauKiemIds,
            controller
        }).then(res => {
            if (res && res.status) {
                dispatch(getAllRequest());
                requestSuccess();
                res.msg && message.success({ content: res.msg });
            }
            else {
                requestError();
                res.msg && message.error({ content: res.msg });
            }
        })
    }
}

export const updateListHoSo = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return () => {
        if (!data.idKeHoach) {
            message.error({ content: "Dữ liệu đầu vào không chính xác!" });
        }
        else {
            return api.put({
                url: apiUrl.API_CONG_TAC_HAU_KIEM_HO_SO_TU_CONG_BO_UPDATE(data.idKeHoach),
                data: data.hoSoTuCongBoIds ? data.hoSoTuCongBoIds : [],
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
}

const onAdditional = (value, type) => {
    return { type, value }
}

const handleGetAll = (values) => {
    return {
        type: type.TYPE_CONG_TAC_HAU_KIEM_LIST,
        values
    }
}

export const handleGetOne = (value) => {
    return {
        type: type.TYPE_CONG_TAC_HAU_KIEM_EDIT,
        value
    }
}

const handleCreate = (value) => {
    return {
        type: type.TYPE_CONG_TAC_HAU_KIEM_CREATE,
        value
    }
}

const handleUpdate = (value) => {
    return {
        type: type.TYPE_CONG_TAC_HAU_KIEM_UPDATE,
        value
    }
}

const handleDelete = (values) => {
    return {
        type: type.TYPE_CONG_TAC_HAU_KIEM_DELETE,
        values
    }
}