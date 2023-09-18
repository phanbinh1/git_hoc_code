import * as api from "./../../../../util/api_call";
import * as apiUrl from './../../../../constants/api';
import * as type from "./../../../../constants/type";
import * as main from "./../../../../constants/main";
import * as message from "./../../../../constants/message";
import * as actPagination from "./../../../../actions/core/pagination";

export const countRequest = (object = {}) => {
    var { requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);

    return dispatch => {
        return api.get({
            url: `${apiUrl.API_KE_HOACH_THAM_DINH_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP}/count`,
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
            url: apiUrl.API_KE_HOACH_THAM_DINH_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP,
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
            url: apiUrl.API_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                const result = res.result || [];
                const listBienBan = res.listBienBan || [];

                dispatch(onAdditional(result.map(item => ({
                    ...item,
                    bienBans: (listBienBan.find(bb => bb.hoSoId === item.id) && listBienBan.find(bb => bb.hoSoId === item.id).bienBans) || []
                })),
                    type.TYPE_KE_HOACH_THAM_DINH_HO_SO_ATTP_HO_SO_LIST));
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
                url: apiUrl.API_KE_HOACH_THAM_DINH_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP + `/${data.id}`,
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
            url: apiUrl.API_KE_HOACH_THAM_DINH_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP,
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
    var { data, requestSuccess, requestError, controller, msgSuccess, msgError } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.put({
            url: apiUrl.API_KE_HOACH_THAM_DINH_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                dispatch({
                    type: type.TYPE_KE_HOACH_THAM_DINH_HO_SO_ATTP_UPDATE,
                    value: res.result
                });
                requestSuccess();
                message.success({ content: msgSuccess || res.msg || "Cập nhật thành công!" });
            }
            else {
                requestError();
                message.error({ content: msgError || res.msg || "Cập nhật thất bại!" });
            }
        })
    }
}

export const banHanhRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        if (!data.id) {
            message.error({ content: "Dữ liệu đầu vào không chính xác!" });
        }
        else {
            return api.put({
                url: apiUrl.API_KE_HOACH_THAM_DINH_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP + `/${data.id}/raquyetdinhthamdinh`,
                data,
                controller
            }).then(res => {
                if (res && res.status) {
                    dispatch({
                        type: type.TYPE_KE_HOACH_THAM_DINH_HO_SO_ATTP_UPDATE,
                        value: res.result
                    });
                    requestSuccess();
                    message.success({ content: res.msg });
                }
                else {
                    requestError();
                    message.error({ content: res.msg });
                }
            })
        }
    }
}

export const deleteRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.del({
            url: apiUrl.API_KE_HOACH_THAM_DINH_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP,
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
        return api.put({
            url: apiUrl.API_KE_HOACH_THAM_DINH_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_PHEDUYET(data.trangThaiPheDuyet),
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                dispatch({
                    type: type.TYPE_KE_HOACH_THAM_DINH_HO_SO_ATTP_UPDATE,
                    value: data.item
                });
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

export const updateListCoSo = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return () => {
        if (!data.idKeHoach) {
            message.error({ content: "Dữ liệu đầu vào không chính xác!" });
        }
        else {
            return api.put({
                url: apiUrl.API_KE_HOACH_THAM_DINH_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_UPDATE(data.idKeHoach),
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

export const deleteHoSoCapGCN = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return () => {
        if (!data.id) {
            message.error({ content: "Dữ liệu đầu vào không chính xác!" });
        }
        else {
            return api.del({
                url: apiUrl.API_KE_HOACH_THAM_DINH_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_DELETE_HO_SO(data.id),
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


export const yeuCauBoSungHoSo = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return () => {
        if (!data.listHoSo || !data.lyDo) {
            message.error({ content: "Dữ liệu đầu vào không chính xác!" });
        }
        else {
            return api.put({
                url: apiUrl.API_KE_HOACH_THAM_DINH_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_YEUCAUBOSUNG,
                data: {
                    ghiChu: data.lyDo,
                    listHoSo: data.listHoSo || []
                },
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

export const getDoanThamDinhRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        if (!data.id) {
            message.error({ content: "Dữ liệu đầu vào không chính xác!" });
        }
        else {
            return api.get({
                url: apiUrl.API_KE_HOACH_THAM_DINH_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP + `/${data.id}/thanhviendoanthamdinh`,
                controller
            }).then(async res => {
                if (res && res.status) {
                    requestSuccess(res);
                }
                else {
                    requestError();
                    res.msg && message.error({ content: res.msg });
                }
            })
        }
    }
}

export const updateDoanThamDinhRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.put({
            url: apiUrl.API_KE_HOACH_THAM_DINH_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP + `/${data.id}/thanhviendoanthamdinh`,
            data: data.thanhViens,
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

export const handleUpdateHSTD = (value) => {
    return dispatch => {
        dispatch(onAdditional(value, type.TYPE_KE_HOACH_THAM_DINH_HO_SO_ATTP_HO_SO_LIST));
    }
}

const onAdditional = (value, type) => {
    return { type, value }
}

const handleGetAll = (values) => {
    return {
        type: type.TYPE_KE_HOACH_THAM_DINH_HO_SO_ATTP_LIST,
        values
    }
}

export const handleGetOne = (value) => {
    return {
        type: type.TYPE_KE_HOACH_THAM_DINH_HO_SO_ATTP_EDIT,
        value
    }
}

const handleCreate = (value) => {
    return {
        type: type.TYPE_KE_HOACH_THAM_DINH_HO_SO_ATTP_CREATE,
        value
    }
}

const handleDelete = (values) => {
    return {
        type: type.TYPE_KE_HOACH_THAM_DINH_HO_SO_ATTP_DELETE,
        values
    }
}