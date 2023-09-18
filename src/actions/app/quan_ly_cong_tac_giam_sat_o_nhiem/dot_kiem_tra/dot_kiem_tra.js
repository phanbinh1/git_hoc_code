import * as api from "../../../../util/api_call";
import * as apiUrl from '../../../../constants/api';
import * as type from "../../../../constants/type";
import * as main from "../../../../constants/main";
import * as message from "../../../../constants/message";
import * as actPagination from "../../../core/pagination";
import * as actCoSo from "../../quan_ly_co_so_san_xuat_kinh_doanh/co_so_san_xuat_kinh_doanh/co_so_san_xuat_kinh_doanh";
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
            url: apiUrl.API_DOT_KIEM_TRA,
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
                url: apiUrl.API_DOT_KIEM_TRA + `/${data.id}`,
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
            url: apiUrl.API_DOT_KIEM_TRA,
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
            url: apiUrl.API_DOT_KIEM_TRA,
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
            url: apiUrl.API_DOT_KIEM_TRA,
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

export const getAllCoSo = () => {
    return dispatch => {
        return dispatch(actCoSo.getAllCoSo({
            requestSuccess: (r) => {
                if (r && r.result) {
                    dispatch(listCoSo(r.result, type.TYPE_DOT_KIEM_TRA_CO_SO_LIST));
                }
            }
        }));
    }
}

export const getTieuChiByIdChiTieu = (object) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        if (!data.id) {
            message.error({ content: "Dữ liệu đầu vào không chính xác!" });
        }
        else {
            return api.get({
                url: apiUrl.API_DOT_KIEM_TRA_TIEU_CHI(data.id),
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

export const danhGiaMauCreateRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.post({
            url: apiUrl.API_DOT_KIEM_TRA_DANH_GIA_MAU,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
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

export const danhGiaMauUpdateRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.put({
            url: apiUrl.API_DOT_KIEM_TRA_DANH_GIA_MAU,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
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

export const danhGiaMauDeleteRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.del({
            url: apiUrl.API_DOT_KIEM_TRA_DANH_GIA_MAU,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
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

const listCoSo = (value, type) => {
    return { type, value }
}

const handleGetAll = (values) => {
    return {
        type: type.TYPE_QLCTDSON_DOT_KIEM_TRA_LIST,
        values
    }
}

export const handleGetOne = (value) => {
    value.ngayKiemTra = { from: null, to: null };
    if (value.ngayKiemTraTu) {
        value.ngayKiemTra.from = value.ngayKiemTraTu
    }
    if (value.ngayKiemTraDen) {
        value.ngayKiemTra.to = value.ngayKiemTraDen
    }
    return {
        type: type.TYPE_QLCTDSON_DOT_KIEM_TRA_EDIT,
        value
    }
}

const handleCreate = (value) => {
    return {
        type: type.TYPE_QLCTDSON_DOT_KIEM_TRA_CREATE,
        value
    }
}

const handleUpdate = (value) => {
    return {
        type: type.TYPE_QLCTDSON_DOT_KIEM_TRA_UPDATE,
        value
    }
}

const handleDelete = (values) => {
    return {
        type: type.TYPE_QLCTDSON_DOT_KIEM_TRA_DELETE,
        values
    }
}