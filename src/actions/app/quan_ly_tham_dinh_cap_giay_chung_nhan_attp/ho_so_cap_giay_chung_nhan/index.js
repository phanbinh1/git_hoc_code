import * as api from "./../../../../util/api_call";
import * as apiUrl from './../../../../constants/api';
import * as type from "./../../../../constants/type";
import * as main from "./../../../../constants/main";
import * as message from "./../../../../constants/message";
import * as actPagination from "./../../../../actions/core/pagination";

export const chartCoSoCapGCNRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.get({
            url: apiUrl.API_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_CHART,
            data,
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
            url: apiUrl.API_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP,
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

export const countRequest = (object = {}) => {
    var { requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);

    return dispatch => {
        return api.get({
            url: `${apiUrl.API_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP}/count`,
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
        if (!data.id) {
            message.error({ content: "Dữ liệu đầu vào không chính xác!" });
        }
        else {
            return api.get({
                url: apiUrl.API_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP + `/${data.id}`,
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
                    await requestError(res);
                }
            })
        }
    }
}

export const createRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.post({
            url: apiUrl.API_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP,
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
            url: apiUrl.API_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                dispatch(handleUpdate(res.result));
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

export const updateGCNRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.put({
            url: apiUrl.API_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP + "/capgiay",
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                dispatch(handleUpdate(res.result));
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

export const deleteRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.del({
            url: apiUrl.API_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP,
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
        type: type.TYPE_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_LIST,
        values
    }
}

export const handleGetOne = (value) => {
    return {
        type: type.TYPE_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_EDIT,
        value
    }
}

const handleCreate = (value) => {
    return {
        type: type.TYPE_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_CREATE,
        value
    }
}

const handleUpdate = (value) => {
    return {
        type: type.TYPE_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_UPDATE,
        value
    }
}

const handleDelete = (values) => {
    return {
        type: type.TYPE_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_DELETE,
        values
    }
}

export const dongBoHoSo = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.post({
            url: main.convertObjectToQueryVariable(apiUrl.API_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_DONG_BO, data),
            // data,
            controller
        }).then(res => {
            if (res && res.status) {
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

export const dongBoHoSoDaChon = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return api.post({
        url: main.convertObjectToQueryVariable(`${apiUrl.API_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP}/dongbohosomotcuavaodulieu`, data),
        // data,
        controller
    }).then(res => {
        if (res && res.status) {
            requestSuccess();
            res.msg && message.success({ content: res.msg });
        }
        else {
            requestError();
            res.msg && message.error({ content: res.msg });
        }
    })
}

export const getSoGCNRequest = (object = {}) => {
    var { requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.get({
            url: apiUrl.API_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP + `/goiysochungnhanattp`,
            controller
        }).then(async res => {
            if (res && res.status) {
                requestSuccess(res);
            }
            else {
                requestError(res);
            }
        })
    }
}

export const layDanhSachHoSoMotCua = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return api.get({
        url: apiUrl.API_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP + `/laydanhsachhosomotcua`,
        data,
        controller
    }).then(async res => {
        if (res && res.status) {
            requestSuccess(res);
        }
        else {
            requestError(res);
        }
    })
}