import * as api from "./../../../../util/api_call";
import * as apiUrl from './../../../../constants/api';
import * as type from "./../../../../constants/type";
import * as main from "./../../../../constants/main";
import * as message from "./../../../../constants/message";
import * as actPagination from "./../../../../actions/core/pagination";
import * as pageKeys from "./../../../../constants/page_key";

/**
 *  ==============================================================================
 *  ==============================================================================
 */

export const getAllDSCoSoRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest(object);
    if (isPagination) {
        var pagination = main.getParamPagination(pageKey);
        data = { ...pagination, ...data };
    }
    return dispatch => {
        return api.get({
            url: apiUrl.API_QTNVTT_CUOC_THANH_TRA_CO_SO,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
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

export const getDSCoSoByIdHoSoNgoDocThucPhamRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        if (!data.ids || !Array.isArray(data.ids)) {
            message.error({ content: "Dữ liệu không hợp lệ!" });
        }
        else {
            return api.get({
                url: apiUrl.API_HO_SO_NGO_DOC_THUC_PHAM_DS_COSO,
                data: {
                    ids: data.ids.toString()
                },
                controller
            }).then(res => {
                if (res && res.status) {
                    requestSuccess(res);
                }
                else {
                    requestError(res);
                }
            });
        }
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
            url: apiUrl.API_QTNVTT_CUOC_THANH_TRA,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                const result = res.result.map((item) => {
                    return {
                        ...item.cuocThanhKiemTra,
                        keHoachThanhKiemTra: item.keHoachThanhKiemTra,
                        danhSachCongViecThanhKiemTras: item.danhSachCongViecThanhKiemTras,
                        daPhanCongCongViec: item.danhSachCongViecThanhKiemTras.filter(val => val.danhSachCongViecThanhKiemTra.length === 0).length === 0,
                        dotThanhKiemTra: (item.dotThanhKiemTra || []).map(dtt => {
                            return {
                                ...dtt,
                                coSoKinhDoanhs: [
                                    ...dtt.coSoKinhDoanhs.filter(dtt_cs => dtt_cs.trangThaiPheDuyetBoSungHoSo === "CHOPHEDUYET"),
                                    ...dtt.coSoKinhDoanhs.filter(dtt_cs => dtt_cs.trangThaiPheDuyetBoSungHoSo !== "CHOPHEDUYET" && dtt_cs.trangThaiPheDuyetBoSungHoSo !== "DADUYET"),
                                    ...dtt.coSoKinhDoanhs.filter(dtt_cs => dtt_cs.trangThaiPheDuyetBoSungHoSo === "DADUYET"),
                                ]
                            }
                        }),
                        cuocThanhKiemTraCha: item.cuocThanhKiemTraCha
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
                requestSuccess({ ...res, result });
            }
            else {
                res && res.msg && message.error({ content: res.msg });
                requestError();
            }
        });
    }
}

export const countRequest = (object = {}) => {
    var { requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);

    return dispatch => {
        return api.get({
            url: `${apiUrl.API_QTNVTT_CUOC_THANH_TRA}/count`,
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

export const getOneRequest = (object = {}, allowDispatch = true, typeDispatch = type.TYPE_QTNVTT_CUOC_THANH_TRA_EDIT) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        if (!data.hasOwnProperty("id")) {
            message.error({ content: "Dữ liệu đầu vào không chính xác!" });
        }
        else {
            return api.get({
                url: apiUrl.API_QTNVTT_CUOC_THANH_TRA + `/${data.id}`,
                data,
                controller
            }).then(res => {
                if (res && res.status) {
                    const { listBienBanThanhKiemTra } = res.result;

                    const coSoKinhDoanhs = res.result.cuocThanhKiemTra.coSoKinhDoanhs.map((coSo, i) => {
                        return {
                            ...coSo,
                            bienBan: listBienBanThanhKiemTra.find(item => item.idCoSoEntity === coSo.id && item.idCoSo === coSo.idCoSo) || {}
                        }
                    });
                    const result = {
                        ...res.result.cuocThanhKiemTra,
                        coSoKinhDoanhs: coSoKinhDoanhs,
                        keHoachThanhKiemTra: res.result.keHoachThanhKiemTra,
                        danhSachCongViecThanhKiemTras: res.result.danhSachCongViecThanhKiemTras,
                        listBienBanThanhKiemTra,
                        danhSachXepHang: res.result.danhSachXepHang,
                        dotThanhKiemTra: (res.result.dotThanhKiemTra || []).map(dtt => {
                            return {
                                ...dtt,
                                coSoKinhDoanhs: [
                                    ...dtt.coSoKinhDoanhs.filter(dtt_cs => dtt_cs.trangThaiPheDuyetBoSungHoSo === "CHOPHEDUYET"),
                                    ...dtt.coSoKinhDoanhs.filter(dtt_cs => dtt_cs.trangThaiPheDuyetBoSungHoSo !== "CHOPHEDUYET" && dtt_cs.trangThaiPheDuyetBoSungHoSo !== "DADUYET"),
                                    ...dtt.coSoKinhDoanhs.filter(dtt_cs => dtt_cs.trangThaiPheDuyetBoSungHoSo === "DADUYET"),
                                ]
                            }
                        }),
                        cuocThanhKiemTraCha: res.result.cuocThanhKiemTraCha
                    }
                    allowDispatch && dispatch(handleGetOne(result, typeDispatch));
                    requestSuccess({ ...res, result });
                }
                else {
                    requestError();
                }
            })
        }
    }
}

export const createRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller, isQDTLD } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.post({
            url: apiUrl.API_QTNVTT_CUOC_THANH_TRA,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                const result = {
                    ...res.result.cuocThanhKiemTra,
                    keHoachThanhKiemTra: res.result.keHoachThanhKiemTra,
                    danhSachCongViecThanhKiemTras: res.result.danhSachCongViecThanhKiemTras || [],
                    daPhanCongCongViec: res.result.danhSachCongViecThanhKiemTras ? res.result.danhSachCongViecThanhKiemTras.filter(val => val.danhSachCongViecThanhKiemTra.length === 0).length === 0 : true,
                    danhSachXepHang: [],
                    dotThanhKiemTra: (res.result.dotThanhKiemTra || []).map(dtt => {
                        return {
                            ...dtt,
                            coSoKinhDoanhs: [
                                ...dtt.coSoKinhDoanhs.filter(dtt_cs => dtt_cs.trangThaiPheDuyetBoSungHoSo === "CHOPHEDUYET"),
                                ...dtt.coSoKinhDoanhs.filter(dtt_cs => dtt_cs.trangThaiPheDuyetBoSungHoSo !== "CHOPHEDUYET" && dtt_cs.trangThaiPheDuyetBoSungHoSo !== "DADUYET"),
                                ...dtt.coSoKinhDoanhs.filter(dtt_cs => dtt_cs.trangThaiPheDuyetBoSungHoSo === "DADUYET"),
                            ]
                        }
                    }),
                }
                isQDTLD ? dispatch(handleCreateCuocThanhTra(result)) : dispatch(handleCreate(result));
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
    var { data, requestSuccess, requestError, controller, isQDTLD } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.put({
            url: apiUrl.API_QTNVTT_CUOC_THANH_TRA,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                const result = {
                    ...res.result.cuocThanhKiemTra,
                    coSoKinhDoanhs: [
                        ...(res.result.cuocThanhKiemTra.coSoKinhDoanhs || []).filter(dtt_cs => dtt_cs.trangThaiPheDuyetBoSungHoSo === "CHOPHEDUYET"),
                        ...(res.result.cuocThanhKiemTra.coSoKinhDoanhs || []).filter(dtt_cs => dtt_cs.trangThaiPheDuyetBoSungHoSo !== "CHOPHEDUYET" && dtt_cs.trangThaiPheDuyetBoSungHoSo !== "DADUYET"),
                        ...(res.result.cuocThanhKiemTra.coSoKinhDoanhs || []).filter(dtt_cs => dtt_cs.trangThaiPheDuyetBoSungHoSo === "DADUYET"),
                    ],
                    keHoachThanhKiemTra: res.result.keHoachThanhKiemTra,
                    danhSachCongViecThanhKiemTras: res.result.danhSachCongViecThanhKiemTras || [],
                    daPhanCongCongViec: res.result.danhSachCongViecThanhKiemTras ? res.result.danhSachCongViecThanhKiemTras.filter(val => val.danhSachCongViecThanhKiemTra.length === 0).length === 0 : true,
                    dotThanhKiemTra: res.result.dotThanhKiemTra || [],
                }
                isQDTLD ? dispatch(handleUpdateCuocThanhTra(result)) : dispatch(handleUpdate(result));
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


export const updateThongTinBanHanhQDTLDRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller, id, idCuocThanhTra } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.put({
            url: `${apiUrl.API_QTNVTT_CUOC_THANH_TRA}/quyetdinhthanhlapdoan/${id}`,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                requestSuccess();
                dispatch(handleUpdateThongTinBanHanhQDTLD(res.result, idCuocThanhTra));
                res.msg && message.success({ content: res.msg });
            }
            else {
                requestError();
                res.msg && message.error({ content: res.msg });
            }
        })
    }
}

export const updateThongTinBanHanhKHTHTTRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller, id, idCuocThanhTra } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.put({
            url: `${apiUrl.API_QTNVTT_CUOC_THANH_TRA}/kehoachtienhanhcuocthanhkiemtra/${id}`,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                requestSuccess();
                dispatch(handleUpdateThongTinBanHanhKHTHTT(res.result, idCuocThanhTra));
                res.msg && message.success({ content: res.msg });
            }
            else {
                requestError();
                res.msg && message.error({ content: res.msg });
            }
        })
    }
}

export const ketLuanRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        if (!data.hasOwnProperty("id")) {
            message.error({ content: "Dữ liệu đầu vào không chính xác!" });
        }
        else {
            return api.put({
                url: `${apiUrl.API_QTNVTT_CUOC_THANH_TRA_KET_LUAN}/${data.id}`,
                data,
                controller
            }).then(res => {
                if (res && res.status) {
                    const result = {
                        ...res.result,
                        keHoachThanhKiemTra: data.keHoachThanhKiemTra,
                    }
                    dispatch(handleKetLuan(result));
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
}

export const pheDuyetRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    if (!data.ids || !data.trangThaiDuyet) {
        message.error({ content: "Dữ liệu đầu vào không chính xác!" });
    }
    else {
        return dispatch => {
            return api.put({
                url: apiUrl.API_QTNVTT_CUOC_THANH_TRA_PHE_DUYET(data.trangThaiDuyet),
                data,
                controller
            }).then(res => {
                if (res && res.status) {
                    data.item ? dispatch(handleUpdate(data.item)) : dispatch(getAllRequest({ pageKey: pageKeys.PAGE_KEY_QTNVTT_CUOC_THANH_TRA }));
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
    if (!data.id) {
        message.error({ content: "Dữ liệu đầu vào không hợp lệ!" });
    }
    else {
        return dispatch => {
            return api.put({
                url: `${apiUrl.API_QTNVTT_CUOC_THANH_TRA}/${data.id}`,
                data,
                controller
            }).then(res => {
                if (res && res.status) {
                    const result = {
                        ...res.result,
                        keHoachThanhKiemTra: data.keHoachThanhKiemTra,
                        danhSachCongViecThanhKiemTras: res.result.danhSachCongViecThanhKiemTras || [],
                        daPhanCongCongViec: res.result.danhSachCongViecThanhKiemTras ? res.result.danhSachCongViecThanhKiemTras.filter(val => val.danhSachCongViecThanhKiemTra.length === 0).length === 0 : true
                    }
                    dispatch(handleUpdate(result));
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
            url: apiUrl.API_QTNVTT_CUOC_THANH_TRA,
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
        type: type.TYPE_QTNVTT_CUOC_THANH_TRA_LIST,
        values
    }
}

export const handleGetOne = (value, typeDispatch = type.TYPE_QTNVTT_CUOC_THANH_TRA_EDIT) => {
    return {
        type: typeDispatch,
        value
    }
}
const handleCreateCuocThanhTra = (value) => {
    return {
        type: type.TYPE_QTNVTT_CUOC_THANH_TRA_CHILD_CREATE,
        value
    }
}

export const handleUpdateCuocThanhTra = (value) => {
    return {
        type: type.TYPE_QTNVTT_CUOC_THANH_TRA_CHILD_UPDATE,
        value
    }
}

export const handleUpdateThongTinBanHanhQDTLD = (value, idCuocThanhTra) => {
    return {
        type: type.TYPE_QTNVTT_DOT_THANH_TRA_UPDATE_THONG_TIN_BAN_HANH,
        value,
        idCuocThanhTra
    }
}

export const handleUpdateThongTinBanHanhKHTHTT = (value, idCuocThanhTra) => {
    return {
        type: type.TYPE_QTNVTT_DOT_THANH_TRA_UPDATE_THONG_TIN_BAN_HANH,
        value,
        idCuocThanhTra
    }
}

const handleCreate = (value) => {
    return {
        type: type.TYPE_QTNVTT_CUOC_THANH_TRA_CREATE,
        value
    }
}

export const handleUpdate = (value) => {
    return {
        type: type.TYPE_QTNVTT_CUOC_THANH_TRA_UPDATE,
        value
    }
}

const handleKetLuan = (value) => {
    return {
        type: type.TYPE_QTNVTT_CUOC_THANH_TRA_KETLUAN,
        value
    }
}

const handleDelete = (values) => {
    return {
        type: type.TYPE_QTNVTT_CUOC_THANH_TRA_DELETE,
        values
    }
}