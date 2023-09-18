import * as api from "./../../../../util/api_call";
import * as apiUrl from './../../../../constants/api';
import * as type from "./../../../../constants/type";
import * as main from "./../../../../constants/main";
import * as message from "./../../../../constants/message";
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
            url: apiUrl.API_PAKN_HO_SO,
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
                requestError(res);
            }
        });
    }
}

export const updateTrinhPheDuyetRequest = (object = {}) => {
    
    const { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.post({
            url: apiUrl.API_PAKN_HO_SO_TRINH_PHE_DUYET,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                // dispatch(handleCreate(res.result));
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

export const updateChuyenXuLyRequest = (object = {}) => {
    
    const { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.post({
            url: apiUrl.API_PAKN_HO_SO_CHUYEN_XU_LY,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                // dispatch(handleCreate(res.result));
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

export const updatePheDuyetRequest = (object = {}) => {
    
    const { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.post({
            url: apiUrl.API_PAKN_HO_SO_PHE_DUYET,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                // dispatch(handleCreate(res.result));
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

export const updateKhongPheDuyetRequest = (object = {}) => {
    const { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.post({
            url: apiUrl.API_PAKN_HO_SO_KHONG_PHE_DUYET,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                // dispatch(handleCreate(res.result));
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

export const getOneRequest = (object = {}) => {
    const { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        if (!data.id) {
            message.error({ content: "Dữ liệu đầu vào không chính xác!" });
        }
        else {
            return api.get({
                url: apiUrl.API_PAKN_HO_SO + `/${data.id}`,
                controller
            }).then(res => {
                if (res && res.status) {
                    const hoSoPhanAnhKienNghi = res.result.hoSoPhanAnhKienNghi ? res.result.hoSoPhanAnhKienNghi : {};
                    const bienBanThanhTra = res.result.bienBanThanhTra ? res.result.bienBanThanhTra : null;
                    const bienBanXuPhat = res.result.bienBanXuPhat ? res.result.bienBanXuPhat : null;
                    dispatch(handleGetOne({
                        ...hoSoPhanAnhKienNghi,
                        bienBanThanhTra,
                        bienBanXuPhat
                    }));
                    requestSuccess({
                        status: res.status,
                        msg: res.msg,
                        result: {
                            ...hoSoPhanAnhKienNghi,
                            bienBanThanhTra,
                            bienBanXuPhat
                        }
                    });
                }
                else {
                    requestError();
                }
            })
        }
    }
}

export const createRequest = (object = {}) => {
    const { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.post({
            url: apiUrl.API_PAKN_HO_SO,
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
    const { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.put({
            url: apiUrl.API_PAKN_HO_SO,
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
    const { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.del({
            url: apiUrl.API_PAKN_HO_SO,
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

export const getKetQuaThanhTraRequest = (object = {}) => {
    const { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        if (!data.id) {
            message.error({ content: "Dữ liệu đầu vào không chính xác!" });
        }
        else {
            return api.get({
                url: apiUrl.API_PAKN_BIEN_BAN_THANH_TRA_KET_QUA + `/${data.id}`,
                controller
            }).then(res => {
                if (res && res.status && res.result && Object.keys(res.result).length) {
                    let result = {
                        cuocThanhKiemTra: res.result.cuocThanhKiemTra ? res.result.cuocThanhKiemTra : {},
                    }
                    if (res.result.bienBanThanhKiemTra) {
                        result = {
                            ...result,
                            ...res.result.bienBanThanhKiemTra
                        };
                    }
                    dispatch(handleGetKetQuaThanhTra(result));
                    requestSuccess({
                        status: res.status,
                        msg: res.msg,
                        result: {...res.result}
                    });
                }
                else {
                    dispatch(handleGetKetQuaThanhTra({}))
                    requestError();
                }
            })
        }
    }
}

const handleGetAll = (values) => {
    return {
        type: type.TYPE_PAKN_HO_SO_TIEP_NHAN_LIST,
        values: values.map(item => ({
            ...{
                ...item.hoSoPhanAnhKienNghi,
                trangThaiChapHanh: item.hoSoPhanAnhKienNghi.trangThaiChapHanh ? 1 : 0
            },
            ...item
        }))
    }
}

export const handleGetOne = (value) => {
    return {
        type: type.TYPE_PAKN_HO_SO_EDIT,
        value
    }
}

const handleCreate = (value) => {
    return {
        type: type.TYPE_PAKN_HO_SO_CREATE,
        value
    }
}

const handleUpdate = (value) => {
    return {
        type: type.TYPE_PAKN_HO_SO_UPDATE,
        value
    }
}

const handleDelete = (values) => {
    return {
        type: type.TYPE_PAKN_HO_SO_TIEP_NHAN_DELETE,
        values
    }
}

const handleGetKetQuaThanhTra = (value) => {
    return {
        type: type.TYPE_PAKN_HO_SO_KET_QUA_THANH_TRA,
        value
    }
}