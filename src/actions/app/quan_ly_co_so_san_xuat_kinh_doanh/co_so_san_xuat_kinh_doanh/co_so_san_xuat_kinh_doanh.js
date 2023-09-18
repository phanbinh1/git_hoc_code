import * as api from "./../../../../util/api_call";
import * as apiUrl from './../../../../constants/api';
import * as type from "./../../../../constants/type";
import * as main from "./../../../../constants/main";
import * as message from "./../../../../constants/message";
import * as actPagination from "./../../../../actions/core/pagination";
import * as actDiaBan from "./../../../../actions/app/danh_muc/dia_ban/dia_ban";
/**
 *  ==============================================================================
 *  ==============================================================================
 */

export const getDsTinhThanh = (onChange) => {
    return dispatch => {
        return dispatch(actDiaBan.getAllRequest({
            data: {
                parentCode: "0"
            },
            requestSuccess: (r) => {
                if (r && r.result) {
                    typeof onChange === "function" ?
                        onChange(r.result) :
                        dispatch(onAdditional(r.result, type.TYPE_CO_SO_SAN_XUAT_KINH_DOANH_CAP_NHAT_DS_TINH_THANH));
                }
            }
        }));
    }
}

export const getDsQuanHuyen = (maTinhThanh, onChange) => {
    return dispatch => {
        if (maTinhThanh) {
            return dispatch(actDiaBan.getAllRequest({
                data: {
                    parentCode: maTinhThanh
                },
                requestSuccess: (r) => {
                    if (r && r.result) {
                        typeof onChange === "function" ?
                            onChange(r.result) :
                            dispatch(onAdditional(r.result, type.TYPE_CO_SO_SAN_XUAT_KINH_DOANH_CAP_NHAT_DS_QUAN_HUYEN));
                    }
                }
            }));
        }
        else {
            typeof onChange === "function" ?
                onChange([]) :
                dispatch(onAdditional([], type.TYPE_CO_SO_SAN_XUAT_KINH_DOANH_CAP_NHAT_DS_QUAN_HUYEN));
        }
    }
}

export const getDsXaPhuong = (maQuanHuyen, onChange) => {
    return dispatch => {
        if (maQuanHuyen) {
            return dispatch(actDiaBan.getAllRequest({
                data: {
                    parentCode: maQuanHuyen
                },
                requestSuccess: (r) => {
                    if (r && r.result) {
                        typeof onChange === "function" ?
                            onChange(r.result) :
                            dispatch(onAdditional(r.result, type.TYPE_CO_SO_SAN_XUAT_KINH_DOANH_CAP_NHAT_DS_XA_PHUONG));
                    }
                }
            }));
        }
        else {
            typeof onChange === "function" ?
                onChange([]) :
                dispatch(onAdditional([], type.TYPE_CO_SO_SAN_XUAT_KINH_DOANH_CAP_NHAT_DS_XA_PHUONG));
        }
    }
}

export const reportRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest(object);
    if (isPagination) {
        var pagination = main.getParamPagination(pageKey);
        data = { ...pagination, ...data };
    }

    return dispatch => {
        return api.get({
            url: apiUrl.API_CO_SO_SAN_XUAT_KINH_DOANH_REPORT,
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

export const checkExistRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest(object);
    if (isPagination) {
        var pagination = main.getParamPagination(pageKey);
        data = { ...pagination, ...data };
    }
    return dispatch => {
        return api.get({
            url: apiUrl.API_CO_SO_SAN_XUAT_KINH_DOANH_CHECKEXIST,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                if (res.hasOwnProperty("pagination") && isPagination) {
                    dispatch(actPagination.Pagination({ ...res.pagination }, pageKey));
                }
                requestSuccess(res);
            }
            else {
                requestError();
            }
        });
    }
}

export const countRequest = (object = {}) => {
    var { requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);

    return dispatch => {
        return api.get({
            url: `${apiUrl.API_CO_SO_SAN_XUAT_KINH_DOANH}/count`,
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

export const getAllRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest(object);
    if (isPagination) {
        var pagination = main.getParamPagination(pageKey);
        data = { ...pagination, ...data };
    }

    return dispatch => {
        return api.get({
            url: apiUrl.API_CO_SO_SAN_XUAT_KINH_DOANH1,
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

export const getOneRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        if (!data.id) {
            message.error({ content: "Dữ liệu đầu vào không chính xác!" });
        }
        else {
            return api.get({
                url: apiUrl.API_CO_SO_SAN_XUAT_KINH_DOANH + `/id/${data.id}`,
                controller
            }).then(async res => {
                if (res && res.status) {
                    let { result } = res;
                    await dispatch(handleGetOne({
                        ...result
                    }));
                    await requestSuccess();
                }
                else {
                    await requestError();
                }
            })
        }
    }
}

export const createRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.post({
            url: apiUrl.API_CO_SO_SAN_XUAT_KINH_DOANH,
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
            url: apiUrl.API_CO_SO_SAN_XUAT_KINH_DOANH,
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
            url: apiUrl.API_CO_SO_SAN_XUAT_KINH_DOANH,
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


const onAdditional = (value, type) => {
    return { type, value }
}

const handleGetAll = (values) => {
    return {
        type: type.TYPE_CO_SO_SAN_XUAT_KINH_DOANH_LIST,
        values
    }
}

export const handleGetOne = (value) => {
    if (value) {
        if (value.hasOwnProperty("hoSoMotCuaId") && !isNaN(value.hoSoMotCuaId)) {
            value.hoSoMotCuaId = parseInt(value.hoSoMotCuaId, 0);
        }
        else {
            delete value.hoSoMotCuaId;
        }
    }
    return {
        type: type.TYPE_CO_SO_SAN_XUAT_KINH_DOANH_EDIT,
        value
    }
}

const handleCreate = (value) => {
    return {
        type: type.TYPE_CO_SO_SAN_XUAT_KINH_DOANH_CREATE,
        value
    }
}

const handleUpdate = (value) => {
    return {
        type: type.TYPE_CO_SO_SAN_XUAT_KINH_DOANH_UPDATE,
        value
    }
}

const handleDelete = (values) => {
    return {
        type: type.TYPE_CO_SO_SAN_XUAT_KINH_DOANH_DELETE,
        values
    }
}

export const getAllCoSo = (object = {}) => {
    var { data, controller, requestSuccess, requestError, pageKey, isPagination } = main.checkValidObjectRequest(object);
    if (isPagination) {
        var pagination = main.getParamPagination(pageKey);
        pagination.pageSize = 100;
        data = { ...pagination, ...data };
    }
    return dispatch => {
        return api.get({
            url: apiUrl.API_CO_SO_SAN_XUAT_KINH_DOANH,
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
                dispatch(handleGetAll([]));
                if (isPagination) {
                    dispatch(actPagination.Pagination(main.getPaginationEmpty(), pageKey));
                }
                requestError(res);
            }
        });
    }
}

export const getLichSuThanhTraRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);

    if (!data.idCoSo) {
        message.error({ content: "Dữ liệu đầu vào không chính xác!" });
    }
    else {
        return dispatch => {
            return api.get({
                url: apiUrl.API_QTNVTT_LICH_SU_CUOC_KIEM_TRA(data.idCoSo),
                // data,
                controller
            }).then(res => {
                if (res && res.status) {
                    dispatch({ type: type.TYPE_CO_SO_SAN_XUAT_KINH_DOANH_LICH_SU_THANH_TRA, values: res.result });
                    requestSuccess(res);
                }
                else {
                    dispatch({ type: type.TYPE_CO_SO_SAN_XUAT_KINH_DOANH_LICH_SU_THANH_TRA, values: [] });
                    requestError();
                }
            });
        }
    }
}