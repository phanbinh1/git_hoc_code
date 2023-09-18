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
            url: apiUrl.API_HO_SO_TU_CONG_BO,
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

export const getAllSanPhamOcopRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest(object);
    if (isPagination) {
        var pagination = main.getParamPagination(pageKey);
        data = { ...pagination, ...data };
    }

    return dispatch => {
        return api.get({
            url: apiUrl.API_HO_SO_TU_CONG_BO_OCOP,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                dispatch(handleGetAllSanPhamOcop(res.result));
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

export const getOneRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        if (!data.id) {
            message.error({ content: "Dữ liệu đầu vào không chính xác!" });
        }
        else {
            return api.get({
                url: apiUrl.API_HO_SO_TU_CONG_BO + `/${data.id}`,
                controller
            }).then(res => {
                if (res && res.status) {
                    dispatch(handleGetOne(res.result));
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
            url: apiUrl.API_HO_SO_TU_CONG_BO,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                dispatch(handleCreate(res.result));
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

export const createListRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.post({
            url: apiUrl.API_HO_SO_TU_CONG_BO + "/createlist",
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                dispatch(handleCreate(res.result));
                requestSuccess(res);
                res.msg && message.success({ content: res.msg });
            }
            else {
                requestError();
                res.msg && message.error({ content: res.msg });
            }
        })
    }
}

export const uploadRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.post({
            url: apiUrl.API_ATTACH_FILE_IMPORT,
            data,
            controller,
            isUpload: true
        }).then(res => {
            if (res && res.status) {
                res.msg && message.success({ content: res.msg });
                requestSuccess(res);
            }
            else {
                res.msg && message.error({ content: res.msg });
            }
        })
    }
}

export const uploadSPOCopRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.post({
            url: apiUrl.API_ATTACH_FILE_SP_OCOP_IMPORT,
            data,
            controller,
            isUpload: true
        }).then(res => {
            if (res && res.status) {
                res.msg && message.success({ content: res.msg });
                requestSuccess(res);
            }
            else {
                res.msg && message.error({ content: res.msg });
            }
        })
    }
}

export const getDownloadFileMau = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
            return api.get({
                url: apiUrl.API_HO_SO_TU_CONG_BO_OCOP_FILE_MAU,
                controller
            }).then(res => {
                if (res && res.status) {
                    // dispatch(handleGetOne(res.result));
                    requestSuccess(res);
                }
                else {
                    requestError();
                }
            })
    }
}

export const updateListRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.put({
            url: apiUrl.API_HO_SO_TU_CONG_BO + "/list",
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                res.result.map(hs => dispatch(handleUpdate(hs.entity)))
                requestSuccess(res);
            }
            else {
                requestError();
            }
        })
    }
}

export const updateRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.put({
            url: apiUrl.API_HO_SO_TU_CONG_BO,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                dispatch(handleUpdate(res.result));
                requestSuccess(res);
                message.success({ content: data.msgSuccess || res.msg || "Cập nhật thành công" });
            }
            else {
                requestError();
                message.error({ content: data.msgError || res.msg || "Cập nhật thất bại" });
            }
        })
    }
}

export const deleteRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.del({
            url: apiUrl.API_HO_SO_TU_CONG_BO,
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

export const deleteSPOcopRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.del({
            url: apiUrl.API_HO_SO_TU_CONG_BO_OCOP_DEL,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                dispatch(handleOcopDelete(data));
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
        if (data.ids && data.trangThaiPheDuyet) {
            return api.put({
                url: `${apiUrl.API_HO_SO_TU_CONG_BO}/pheduyet/${data.trangThaiPheDuyet}`,
                data,
                controller
            }).then(res => {
                if (res && res.status) {
                    dispatch({
                        type: type.TYPE_HO_SO_TU_CONG_BO_PHE_DUYET,
                        value: data
                    })
                    requestSuccess(res);
                    res.msg && message.success({ content: res.msg });
                }
                else {
                    requestError();
                    res.msg && message.error({ content: res.msg });
                }
            })
        }
        else {
            message.error({ content: "Dữ liệu không hợp lệ", key: "DATA_ERROR" });
        }
    }
}

const handleGetAll = (values) => {
    return {
        type: type.TYPE_HO_SO_TU_CONG_BO_LIST,
        values
    }
}

const handleGetAllSanPhamOcop = (values) => {
    return {
        type: type.TYPE_SAN_PHAM_OCOP_LIST,
        values
    }
}

export const handleGetOne = (value) => {
    return {
        type: type.TYPE_HO_SO_TU_CONG_BO_EDIT,
        value
    }
}

const handleCreate = (value) => {
    return {
        type: type.TYPE_HO_SO_TU_CONG_BO_CREATE,
        value
    }
}

const handleUpdate = (value) => {
    return {
        type: type.TYPE_HO_SO_TU_CONG_BO_UPDATE,
        value
    }
}

const handleDelete = (values) => {
    return {
        type: type.TYPE_HO_SO_TU_CONG_BO_DELETE,
        values
    }
}

const handleOcopDelete = (values) => {
    return {
        type: type.TYPE_DANH_SACH_OCOP_DELETE,
        values
    }
}