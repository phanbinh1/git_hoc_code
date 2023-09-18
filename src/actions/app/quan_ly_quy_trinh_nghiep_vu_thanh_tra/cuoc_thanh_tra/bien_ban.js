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
            url: apiUrl.API_QTNVTT_BIEN_BAN_THANH_TRA,
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

export const getOneRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        if (!data.id) {
            message.error({ content: "Dữ liệu đầu vào không chính xác!" });
        }
        else {
            return api.get({
                url: apiUrl.API_QTNVTT_BIEN_BAN_THANH_TRA + `/${data.id}`,
                controller
            }).then(res => {
                if (res && res.status) {
                    const result = {
                        ...res.result.cuocThanhKiemTra,
                        keHoachThanhKiemTra: res.result.keHoachThanhKiemTra,
                        danhSachCoSoKinhDoanh: res.result.danhSachCoSoKinhDoanh
                    }
                    dispatch(handleGetOne(result));
                    requestSuccess({ ...res, result });
                }
                else {
                    requestError();
                }
            })
        }
    }
}

export const getOneByIdCoSoRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => api.get({
        url: apiUrl.API_QTNVTT_BIEN_BAN_THANH_TRA + `/coso`,
        data: {
            ...data,
            idCoSo: !data.idCoSo ? undefined : data.idCoSo
        },
        controller
    }).then(res => {
        if (res && res.status) {
            let result = {
                cuocThanhKiemTra: res.result.cuocThanhKiemTra ? res.result.cuocThanhKiemTra : {},
            }
            if (res.result.bienBanThanhKiemTra) {
                result = {
                    ...result,
                    ...res.result.bienBanThanhKiemTra
                };
            }
            dispatch(handleGetOne(result));
            requestSuccess({ status: res.status, result });
        }
        else {
            requestError();
        }
    })
}

export const createRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.post({
            url: apiUrl.API_QTNVTT_BIEN_BAN_THANH_TRA,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                dispatch(handleCreate({ ...res.result, idCoSoEntity: data.idCoSoEntity }));
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

export const updateRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.put({
            url: apiUrl.API_QTNVTT_BIEN_BAN_THANH_TRA,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                dispatch(handleUpdate(res.result));
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

export const capNhatThoiGianChinhSuaRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        if (!data.id) {
            message.error({ content: "Dữ liệu đầu vào không chính xác!" });
        }
        else {
            return api.put({
                url: `${apiUrl.API_QTNVTT_BIEN_BAN_THANH_TRA}/${data.id}`,
                data,
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

export const deleteRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.del({
            url: apiUrl.API_QTNVTT_BIEN_BAN_THANH_TRA,
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
        type: type.TYPE_QTNVTT_BIEN_BAN_LIST,
        values
    }
}

export const handleGetOne = (value) => {
    return {
        type: type.TYPE_QTNVTT_BIEN_BAN_EDIT,
        value
    }
}

const handleCreate = (value) => {
    return {
        type: type.TYPE_QTNVTT_BIEN_BAN_CREATE,
        value
    }
}

const handleUpdate = (value) => {
    return {
        type: type.TYPE_QTNVTT_BIEN_BAN_UPDATE,
        value
    }
}

const handleDelete = (values) => {
    return {
        type: type.TYPE_QTNVTT_BIEN_BAN_DELETE,
        values
    }
}

export const deleteFile_Request = (object) => {
    const { data, requestSuccess, requestError } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.del({
            url: apiUrl.API_QTNVTT_UPLOADFILE,
            data,
        }).then(function (res) {
            if (res && res.status) {
                requestSuccess();
            }
            else {
                requestError();
            }
        })
    }
}