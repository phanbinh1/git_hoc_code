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
            url: apiUrl.API_KE_HOACH_THAM_DINH_CTP,
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
                requestError();
            }
        });
    }
}

export const getAllHoSoThamDinhRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest(object);
    if (isPagination) {
        var pagination = main.getParamPagination(pageKey);
        data = { ...pagination, ...data };
    }

    return dispatch => {
        return api.get({
            url: apiUrl.API_HO_SO_CHUOI_THUC_PHAM,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                dispatch(onAdditional(res.result, type.TYPE_KE_HOACH_THAM_DINH_HS_CTP_HO_SO_LIST));
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
                url: apiUrl.API_KE_HOACH_THAM_DINH_CTP + `/${data.id}`,
                controller
            }).then(async res => {
                if (res && res.status) {
                    let { result } = res;
                    await dispatch(handleGetOne({
                        ...result
                    }));
                    await requestSuccess(res);
                }
                else {
                    await requestError();
                }
            })
        }
    }
}

export const getCreateRequest = (object = {}) => {
    return dispatch => {
        dispatch(handleGetOne(object));
    }
}

export const createRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.post({
            url: apiUrl.API_KE_HOACH_THAM_DINH_CTP,
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
            url: apiUrl.API_KE_HOACH_THAM_DINH_CTP,
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
            url: apiUrl.API_KE_HOACH_THAM_DINH_CTP,
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

export const pheDuyetRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        if (!data.trangThaiPheDuyet) {
            message.error({ content: "Dữ liệu đầu vào không hợp lệ!" });
        }
        else {
            return api.put({
                url: apiUrl.API_KE_HOACH_THAM_DINH_CTP_PHE_DUYET(data.trangThaiPheDuyet),
                data,
                controller
            }).then(res => {
                if (res && res.status) {
                    data.item ? dispatch(handleUpdate(data.item)) : dispatch(getAllRequest({ pageKey: pageKeys.PAGE_KEY_KE_HOACH_THAM_DINH_HO_SO_CTP }));
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
    return dispatch => {
        if (!data.id) {
            message.error({ content: "Dữ liệu đầu vào không hợp lệ!" });
        }
        else {
            return api.put({
                url: apiUrl.API_KE_HOACH_THAM_DINH_CTP_BAN_HANH(data.id),
                data,
                controller
            }).then(res => {
                if (res && res.status) {
                    dispatch(handleUpdate(res.result));
                    requestSuccess();
                    message.success({ content: "Ban hành thành công!" });
                }
                else {
                    requestError();
                    res.msg && message.error({ content: res.msg });
                }
            })
        }
    }
}

export const updateListCoSo = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return () => {
        if (!data.idKeHoach) {
            message.error({ content: "Dữ liệu đầu vào không chính xác!" });
        }
        else {
            return api.put({
                url: apiUrl.API_KE_HOACH_THAM_DINH_CTP_UPDATE(data.idKeHoach),
                data: data.hoSoCapGiayChungNhanIds ? data.hoSoCapGiayChungNhanIds : [],
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
        type: type.TYPE_KE_HOACH_THAM_DINH_HS_CTP_LIST,
        values
    }
}

export const handleGetOne = (value) => {
    return {
        type: type.TYPE_KE_HOACH_THAM_DINH_HS_CTP_EDIT,
        value
    }
}

const handleCreate = (value) => {
    return {
        type: type.TYPE_KE_HOACH_THAM_DINH_HS_CTP_CREATE,
        value
    }
}

const handleUpdate = (value) => {
    return {
        type: type.TYPE_KE_HOACH_THAM_DINH_HS_CTP_UPDATE,
        value
    }
}

const handleDelete = (values) => {
    return {
        type: type.TYPE_KE_HOACH_THAM_DINH_HS_CTP_DELETE,
        values
    }
}