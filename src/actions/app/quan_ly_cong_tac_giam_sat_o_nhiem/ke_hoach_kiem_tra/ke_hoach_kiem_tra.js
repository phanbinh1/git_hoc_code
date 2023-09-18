import * as api from "./../../../../util/api_call";
import * as apiUrl from './../../../../constants/api';
import * as type from "./../../../../constants/type";
import * as main from "./../../../../constants/main";
import * as message from "./../../../../constants/message";
import * as pageKeys from "./../../../../constants/page_key";
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
            url: apiUrl.API_QLONATTP_KE_HOACH_THANH_TRA,
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

export const countRequest = (object = {}) => {
    var { requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.get({
            url: `${apiUrl.API_QTNVTT_KE_HOACH_THANH_TRA}/count`,
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

export const getOneRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        if (!data.hasOwnProperty("id")) {
            message.error({ content: "Dữ liệu đầu vào không chính xác!" });
        }
        else {
            return api.get({
                url: apiUrl.API_QLONATTP_KE_HOACH_THANH_TRA + `/${data.id}`,
                controller
            }).then(res => {
                if (res && res.status) {
                    dispatch(handleGetOne(res.result));
                    dispatch({
                        type: type.TYPE_QLONATTP_THANH_LAP_DOAN_KIEM_TRA_UPDATE_KEHOACH_BY_ID,
                        keHoachGiamSat: res.result
                    })
                    requestSuccess(res);
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
            url: apiUrl.API_QLONATTP_KE_HOACH_THANH_TRA,
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
            url: apiUrl.API_QLONATTP_KE_HOACH_THANH_TRA,
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

export const pheDuyetRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    if (!data.trangThaiDuyet) {
        message.error({ content: "Dữ liệu đầu vào không hợp lệ!" });
    }
    else {
        return dispatch => {
            return api.put({
                url: apiUrl.API_QLONTP_KE_HOACH_GIAM_SAT_PHE_DUYET(data.trangThaiDuyet),
                data,
                controller
            }).then(res => {
                if (res && res.status) {
                    data.item ? dispatch(handleUpdate(data.item)) : dispatch(getAllRequest({ pageKey: pageKeys.PAGE_KEY_QTNVTT_KE_HOACH_THANH_TRA }));
                    requestSuccess();
                    data.msgSuccess ? message.success({ content: data.msgSuccess }) : (res.msg && message.success({ content: res.msg }));
                }
                else {
                    requestError();
                    data.msgError ? message.error({ content: data.msgError }) : (res.msg && message.error({ content: res.msg }));
                }
            })
        }
    }
}

export const banHanhRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    if (!data.id) {
        message.error({ content: "Dữ liệu đầu vào không hợp lệ!" });
    }
    else {
        return dispatch => {
            return api.put({
                url: `${apiUrl.API_QLONATTP_KE_HOACH_THANH_TRA_BAN_HANH}/${data.id}`,
                data,
                controller
            }).then(res => {
                if (res && res.status) {
                    dispatch(handleUpdate(res.result));
                    requestSuccess(); message.success({ content: "Ban hành thành công!" });
                }
                else {
                    requestError();
                    message.error({ content: "Ban hành thất bại!" });
                }
            })
        }
    }
}

export const deleteRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.del({
            url: apiUrl.API_QTNVTT_KE_HOACH_THANH_TRA,
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

const handleGetAll = (values) => {
    return {
        type: type.TYPE_QLONATTP_KE_HOACH_THANH_TRA_LIST,
        values
    }
}

export const handleGetOne = (value) => {
    return {
        type: type.TYPE_QLONATTP_KE_HOACH_THANH_TRA_EDIT,
        value
    }
}

const handleCreate = (value) => {
    return {
        type: type.TYPE_QLONATTP_KE_HOACH_THANH_TRA_CREATE,
        value
    }
}

const handleUpdate = (value) => {
    return {
        type: type.TYPE_QLONATTP_KE_HOACH_THANH_TRA_UPDATE,
        value
    }
}

const handleDelete = (values) => {
    return {
        type: type.TYPE_QLONATTP_KE_HOACH_THANH_TRA_DELETE,
        values
    }
}

export const ThemMoiTrinhKy = async (data) => {
    const res = await api.post({
        url: apiUrl.API_VBDH_THEM_MOI_TRINH_KY_GIAM_SAT_O_NHIEM,
        data,
    });
    return res;
}