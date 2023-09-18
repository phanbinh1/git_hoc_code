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
            url: apiUrl.API_THONG_BAO_HO_SO_TU_CONG_BO,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                const result = res.result.map(item => {
                    return {
                        ...item.thongBaoCongBo,
                        listHoSo: item.listHoSo
                    }
                })
                dispatch(handleGetAll(result));
                if (res.hasOwnProperty("pagination") && isPagination) {
                    dispatch(actPagination.Pagination({
                        ...res.pagination
                    },
                        pageKey)
                    );
                }
                requestSuccess({
                    ...res,
                    result
                });
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
                url: apiUrl.API_THONG_BAO_HO_SO_TU_CONG_BO + `/${data.id}`,
                controller
            }).then(res => {
                if (res && res.status) {
                    const thongBaoCongBo = res.result.thongBaoCongBo;
                    const listHoSo = res.result.listHoSo;

                    dispatch(handleGetOne({
                        thongBaoCongBo: {
                            ...thongBaoCongBo,
                            thoiGian: {
                                from: thongBaoCongBo.tuNgay,
                                to: thongBaoCongBo.denNgay
                            }
                        },
                        listHoSo
                    }));
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
            url: apiUrl.API_THONG_BAO_HO_SO_TU_CONG_BO,
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
            url: apiUrl.API_THONG_BAO_HO_SO_TU_CONG_BO,
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

export const trinhPheDuyetRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.put({
            url: apiUrl.API_THONG_BAO_HO_SO_TU_CONG_BO,
            data,
            controller
        }).then(res => {
            if (res && res.status && res.result && res.result.thongBaoCongBo) {
                dispatch({
                    type: type.TYPE_THONG_BAO_HO_SO_TU_CONG_BO_TRINHPHEDUYET,
                    value: {
                        ...res.result.thongBaoCongBo,
                        listHoSo: res.result.listHoSo
                    }
                });
                requestSuccess();
                message.success({ content: data.msg || "Trình phê duyệt thành công!" });
            }
            else {
                requestError();
                res.msg && message.error({ content: res.msg });
            }
        })
    }
}

export const yeuCauBoSungHoSoRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        if (data.thongBaoCongBo && data.listHoSoCongBo) {
            return api.put({
                url: apiUrl.API_THONG_BAO_CONG_BO_YEU_CAU_BO_SUNG_HO_SO,
                data,
                controller
            }).then(res => {
                if (res && res.status) {
                    dispatch({
                        type: type.TYPE_THONG_BAO_HO_SO_TU_CONG_BO_YEU_CAU_BO_SUNG_HO_SO,
                        value: data
                    });
                    requestSuccess();
                    message.success({ content: res.msg || "Yêu cầu thành công!" });
                }
                else {
                    requestError();
                    res.msg && message.error({ content: res.msg });
                }
            })
        }
        else {
            message.error({ content: "Dữ liệu không hợp lệ!" });
        }
    }
}

export const deleteRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.del({
            url: apiUrl.API_THONG_BAO_HO_SO_TU_CONG_BO,
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
    if (data.ids && data.trangThaiPheDuyet && data.item) {
        return dispatch => {
            return api.put({
                url: `${apiUrl.API_THONG_BAO_HO_SO_TU_CONG_BO}/pheduyet/${data.trangThaiPheDuyet}`,
                data: data,
                controller
            }).then(res => {
                if (res && res.status) {
                    dispatch(handleUpdate(data.item));
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
    else {
        message.error({ content: "Dữ liệu không hợp lệ", key: "DATA_ERROR" });
    }
}

export const banHanhRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    if (data.id && data.soThongBao && data.ngayKy && data.nguoiKy) {
        return dispatch => {
            return api.put({
                url: `${apiUrl.API_THONG_BAO_HO_SO_TU_CONG_BO}/${data.id}/banhanhthongbao`,
                data: {
                    soThongBao: data.soThongBao,
                    ngayKy: data.ngayKy,
                    nguoiKy: data.nguoiKy
                },
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
    else {
        message.error({ content: "Dữ liệu không hợp lệ", key: "DATA_ERROR" });
    }
}

const handleGetAll = (values) => {
    return {
        type: type.TYPE_THONG_BAO_HO_SO_TU_CONG_BO_LIST,
        values
    }
}

export const handleGetOne = (value) => {
    return {
        type: type.TYPE_THONG_BAO_HO_SO_TU_CONG_BO_EDIT,
        value
    }
}

const handleCreate = (value) => {
    return {
        type: type.TYPE_THONG_BAO_HO_SO_TU_CONG_BO_CREATE,
        value
    }
}

const handleUpdate = (value) => {
    return {
        type: type.TYPE_THONG_BAO_HO_SO_TU_CONG_BO_UPDATE,
        value
    }
}

const handleDelete = (values) => {
    return {
        type: type.TYPE_THONG_BAO_HO_SO_TU_CONG_BO_DELETE,
        values
    }
}