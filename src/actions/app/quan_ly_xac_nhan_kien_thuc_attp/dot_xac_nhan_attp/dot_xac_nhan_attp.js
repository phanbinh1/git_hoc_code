import * as api from "../../../../util/api_call";
import * as apiUrl from '../../../../constants/api';
import * as type from "../../../../constants/type";
import * as main from "../../../../constants/main";
import * as message from "../../../../constants/message";
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
            url: apiUrl.API_XAC_NHAN_KIEN_THUC_ATTP_DXN,
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

export const getOneRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        if (!data.id) {
            message.error({ content: "Dữ liệu đầu vào không chính xác!" });
        }
        else {
            return api.get({
                url: apiUrl.API_XAC_NHAN_KIEN_THUC_ATTP_DXN + `/${data.id}`,
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

export const getDSHoSoByLoaiRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return () => {
        if (!data.loaiXacNhan) {
            message.error({ content: "Dữ liệu đầu vào không chính xác!" });
        }
        else {
            return api.get({
                url: apiUrl.API_DS_HO_SO_XAC_NHAN_KIEN_THUC_BY_LOAI,
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

export const createRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.post({
            url: apiUrl.API_XAC_NHAN_KIEN_THUC_ATTP_DXN,
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
            url: apiUrl.API_XAC_NHAN_KIEN_THUC_ATTP_DXN,
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
    return dispatch => {
        return api.put({
            url: apiUrl.API_XAC_NHAN_KIEN_THUC_ATTP_DXN_PHEDUYET,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                if (res.result && Array.isArray(res.result)) {
                    res.result.map((item) => {
                        return dispatch(handleUpdate(item));
                    })
                }
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

export const capSoRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.put({
            url: apiUrl.API_XAC_NHAN_KIEN_THUC_ATTP_DXN_CAP_SO,
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
            url: apiUrl.API_XAC_NHAN_KIEN_THUC_ATTP_DXN,
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
        type: type.TYPE_XNKT_ATTP_DOT_XAC_NHAN_LIST,
        values
    }
}

export const handleGetOne = (value) => {
    return {
        type: type.TYPE_XNKT_ATTP_DOT_XAC_NHAN_EDIT,
        value
    }
}

const handleCreate = (value) => {
    return {
        type: type.TYPE_XNKT_ATTP_DOT_XAC_NHAN_CREATE,
        value
    }
}

const handleUpdate = (value) => {
    return {
        type: type.TYPE_XNKT_ATTP_DOT_XAC_NHAN_UPDATE,
        value
    }
}

const handleDelete = (values) => {
    return {
        type: type.TYPE_XNKT_ATTP_DOT_XAC_NHAN_DELETE,
        values
    }
}