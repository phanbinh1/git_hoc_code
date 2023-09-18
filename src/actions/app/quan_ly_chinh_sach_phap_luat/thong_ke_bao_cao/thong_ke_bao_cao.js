import * as api from "./../../../../util/api_call";
import * as apiUrl from './../../../../constants/api';
import * as type from "./../../../../constants/type";
import * as main from "./../../../../constants/main";
import * as actPagination from "./../../../../actions/core/pagination";
/**
 *  ==============================================================================
 *  ==============================================================================
 */

export const URL_THONG_KE_DAU_TU_QUAN_LY_DIA_PHUONG = "/thong-ke-bao-cao/chinh-sach-phat-luat/dau-tu-quan-ly-attp-dia-phuong.html";
export const URL_THONG_KE_MAU_KIEM_NGHIEM = "/thong-ke-bao-cao/chinh-sach-phat-luat/mau-kiem-nghiem.html";
export const URL_THONG_KE_MAU_THUC_PHAM_NN = "/thong-ke-bao-cao/chinh-sach-phat-luat/mau-thuc-pham-nn.html";
export const URL_THONG_KE_DANH_MUC_TRUYEN_THONG = "/thong-ke-bao-cao/chinh-sach-phat-luat/danh-muc-truyen-thong.html";
export const URL_THONG_KE_KET_QUA_KIEM_NGHIEM_TP = "/thong-ke-bao-cao/chinh-sach-phat-luat/ket-qua-kiem-nghiem-tp.html";
export const URL_THONG_KE_KET_QUA_THANH_KIEM_TRA_ATTP = "/thong-ke-bao-cao/chinh-sach-phat-luat/ket-qua-thanh-kiem-tra-attp.html";
export const URL_THONG_KE_KET_QUA_THUC_HIEN_TTHC = "/thong-ke-bao-cao/chinh-sach-phat-luat/ket-qua-thuc-hien-tthc.html";
export const URL_THONG_KE_QUAN_LY_CHO_SIEU_THI= "/thong-ke-bao-cao/chinh-sach-phat-luat/quan-ly-cho-sieu-thi.html";
export const URL_THONG_KE_SU_DUNG_KINH_PHI_DIA_PHUONG= "/thong-ke-bao-cao/chinh-sach-phat-luat/su-dung-kinh-phi-dia-phuong.html";
export const URL_THONG_KE_SU_DUNG_KINH_PHI_TRUNG_UONG= "/thong-ke-bao-cao/chinh-sach-phat-luat/su-dung-kinh-phi-trung-uong.html";
export const URL_THONG_KE_GOS_NHIEM_TPNN= "/thong-ke-bao-cao/chinh-sach-phat-luat/gos-nhiem-tpnn.html";
export const URL_THONG_KE_GOS_NHIEM_TPYTE= "/thong-ke-bao-cao/chinh-sach-phat-luat/gos-nhiem-tpyte.html";
export const URL_THONG_KE_TONG_HOP_TINH_HINH_VSATTP= "/thong-ke-bao-cao/chinh-sach-phat-luat/tong-hop-tinh-hinh-vsattp.html";
export const URL_THONG_KE_XAY_DUNG_CSVC_DIA_PHUONG= "/thong-ke-bao-cao/chinh-sach-phat-luat/xay-dung-co-so-vat-chat-dia-phuong.html";

//THONG_KE_DAU_TU_QUAN_LY_DIA_PHUONG
export const getAllRequestDauTuQuanLyDiaPhuong = (object = {}) => {
    var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest(object);
    if (isPagination) {
        var pagination = main.getParamPagination(pageKey);
        data = { ...pagination, ...data };
    }
 
    return dispatch => {
        return api.get({
            url: apiUrl.API_THONG_KE_DAU_TU_QUAN_LY_DIA_PHUONG,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                if (res.result) {
                    dispatch(handleGetDauTuQuanLyDiaPhuong(res.result));
                }
                else {
                    dispatch(handleGetDauTuQuanLyDiaPhuong([]));
                }

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

const handleGetDauTuQuanLyDiaPhuong = (values) => {
    return {
        type: type.TYPE_THONG_KE_DAU_TU_QUAN_LY_DIA_PHUONG_LIST,
        values
    }
}


export const getAllRequestMauKiemNghiem = (object = {}) => {
    var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest(object);
    if (isPagination) {
        var pagination = main.getParamPagination(pageKey);
        data = { ...pagination, ...data };
    }

    return dispatch => {
        return api.get({
            url: apiUrl.API_THONG_KE_MAU_KIEM_NGHIEM,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                if (res.result) {
                    dispatch(handleGetAllMauKiemNghiem(res.result));
                }
                else {
                    dispatch(handleGetAllMauKiemNghiem([]));
                }

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

const handleGetAllMauKiemNghiem = (values) => {
    return {
        type: type.TYPE_THONG_KE_MAU_KIEM_NGHIEM_LIST,
        values
    }
}


export const getAllRequestMauThucPhamNN = (object = {}) => {
    var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest(object);
    if (isPagination) {
        var pagination = main.getParamPagination(pageKey);
        data = { ...pagination, ...data };
    }

    return dispatch => {
        return api.get({
            url: apiUrl.API_THONG_KE_MAU_THUC_PHAM_NN,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                if (res.result) {
                    dispatch(handleGetAllMauThucPhamNN(res.result));
                }
                else {
                    dispatch(handleGetAllMauThucPhamNN([]));
                }

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

const handleGetAllMauThucPhamNN = (values) => {
    return {
        type: type.TYPE_THONG_KE_MAU_THUC_PHAM_NN_LIST,
        values
    }
}


export const getAllRequestDanhMucTruyenThong = (object = {}) => {
    var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest(object);
    if (isPagination) {
        var pagination = main.getParamPagination(pageKey);
        data = { ...pagination, ...data };
    }

    return dispatch => {
        return api.get({
            url: apiUrl.API_THONG_KE_DANH_MUC_TRUYEN_THONG,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                if (res.result) {
                    dispatch(handleGetAllDanhMucTruyenThong(res.result));
                }
                else {
                    dispatch(handleGetAllDanhMucTruyenThong([]));
                }

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

const handleGetAllDanhMucTruyenThong = (values) => {
    return {
        type: type.TYPE_THONG_KE_DANH_MUC_TRUYEN_THONG_LIST,
        values
    }
}


export const getAllRequestKetQuaKiemNghiemTP = (object = {}) => {
    var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest(object);
    if (isPagination) {
        var pagination = main.getParamPagination(pageKey);
        data = { ...pagination, ...data };
    }

    return dispatch => {
        return api.get({
            url: apiUrl.API_THONG_KE_KET_QUA_KIEM_NGHIEM_TP,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                if (res.result) {
                    dispatch(handleGetAllKetQuaKiemNghiemTP(res.result));
                }
                else {
                    dispatch(handleGetAllKetQuaKiemNghiemTP([]));
                }

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

const handleGetAllKetQuaKiemNghiemTP = (values) => {
    return {
        type: type.TYPE_THONG_KE_KET_QUA_KIEM_NGHIEM_TP_LIST,
        values
    }
}



export const getAllRequestKetQuaThanhKiemTraATTP = (object = {}) => {
    var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest(object);
    if (isPagination) {
        var pagination = main.getParamPagination(pageKey);
        data = { ...pagination, ...data };
    }

    return dispatch => {
        return api.get({
            url: apiUrl.API_THONG_KE_KET_QUA_THANH_KIEM_TRA_ATTP,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                if (res.result) {
                    dispatch(handleGetAllKetQuaThanhKiemTraATTP(res.result));
                }
                else {
                    dispatch(handleGetAllKetQuaThanhKiemTraATTP([]));
                }

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

const handleGetAllKetQuaThanhKiemTraATTP = (values) => {
    return {
        type: type.TYPE_THONG_KE_KET_QUA_THANH_KIEM_TRA_ATTP_LIST,
        values
    }
}



export const getAllRequestKetQuaThucHienTTHC = (object = {}) => {
    var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest(object);
    if (isPagination) {
        var pagination = main.getParamPagination(pageKey);
        data = { ...pagination, ...data };
    }

    return dispatch => {
        return api.get({
            url: apiUrl.API_THONG_KE_KET_QUA_THUC_HIEN_TTHC,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                if (res.result) {
                    dispatch(handleGetAllKetQuaThucHienTTHC(res.result));
                }
                else {
                    dispatch(handleGetAllKetQuaThucHienTTHC([]));
                }

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

const handleGetAllKetQuaThucHienTTHC = (values) => {
    return {
        type: type.TYPE_THONG_KE_KET_QUA_THUC_HIEN_TTHC_LIST,
        values
    }
}



export const getAllRequestQuanLyChoSieuThi = (object = {}) => {
    var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest(object);
    if (isPagination) {
        var pagination = main.getParamPagination(pageKey);
        data = { ...pagination, ...data };
    }

    return dispatch => {
        return api.get({
            url: apiUrl.API_THONG_KE_QUAN_LY_CHO_SIEU_THI,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                if (res.result) {
                    dispatch(handleGetAllQuanLyChoSieuThi(res.result));
                }
                else {
                    dispatch(handleGetAllQuanLyChoSieuThi([]));
                }

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

const handleGetAllQuanLyChoSieuThi = (values) => {
    return {
        type: type.TYPE_THONG_KE_QUAN_LY_CHO_SIEU_THI_LIST,
        values
    }
}




export const getAllRequestSuDungKinhPhiDiaPhuong = (object = {}) => {
    var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest(object);
    if (isPagination) {
        var pagination = main.getParamPagination(pageKey);
        data = { ...pagination, ...data };
    }

    return dispatch => {
        return api.get({
            url: apiUrl.API_THONG_KE_SU_DUNG_KINH_PHI_DIA_PHUONG,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                if (res.result) {
                    dispatch(handleGetAllSuDungKinhPhiDiaPhuong(res.result));
                }
                else {
                    dispatch(handleGetAllSuDungKinhPhiDiaPhuong([]));
                }

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

const handleGetAllSuDungKinhPhiDiaPhuong = (values) => {
    return {
        type: type.TYPE_THONG_KE_SU_DUNG_KINH_PHI_DIA_PHUONG_LIST,
        values
    }
}


export const getAllRequestSuDungKinhPhiTrungUong = (object = {}) => {
    var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest(object);
    if (isPagination) {
        var pagination = main.getParamPagination(pageKey);
        data = { ...pagination, ...data };
    }

    return dispatch => {
        return api.get({
            url: apiUrl.API_THONG_KE_SU_DUNG_KINH_PHI_TRUNG_UONG,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                if (res.result) {
                    dispatch(handleGetAllSuDungKinhPhiTrungUong(res.result));
                }
                else {
                    dispatch(handleGetAllSuDungKinhPhiTrungUong([]));
                }

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

const handleGetAllSuDungKinhPhiTrungUong = (values) => {
    return {
        type: type.TYPE_THONG_KE_SU_DUNG_KINH_PHI_TRUNG_UONG_LIST,
        values
    }
}


export const getAllRequestGosNhiemTPNN = (object = {}) => {
    var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest(object);
    if (isPagination) {
        var pagination = main.getParamPagination(pageKey);
        data = { ...pagination, ...data };
    }

    return dispatch => {
        return api.get({
            url: apiUrl.API_THONG_KE_GOS_NHIEM_TPNN,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                if (res.result) {
                    dispatch(handleGetAllGosNhiemTPNN(res.result));
                }
                else {
                    dispatch(handleGetAllGosNhiemTPNN([]));
                }

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

const handleGetAllGosNhiemTPNN = (values) => {
    return {
        type: type.TYPE_THONG_KE_GOS_NHIEM_TPNN_LIST,
        values
    }
}

export const getAllRequestGosNhiemTPYTE = (object = {}) => {
    var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest(object);
    if (isPagination) {
        var pagination = main.getParamPagination(pageKey);
        data = { ...pagination, ...data };
    }

    return dispatch => {
        return api.get({
            url: apiUrl.API_THONG_KE_GOS_NHIEM_TPYTE,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                if (res.result) {
                    dispatch(handleGetAllGosNhiemTPYTE(res.result));
                }
                else {
                    dispatch(handleGetAllGosNhiemTPYTE([]));
                }

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

const handleGetAllGosNhiemTPYTE = (values) => {
    return {
        type: type.TYPE_THONG_KE_GOS_NHIEM_TPYTE_LIST,
        values
    }
}


export const getAllRequestTongHopTinhHinhVSATTP = (object = {}) => {
    var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest(object);
    if (isPagination) {
        var pagination = main.getParamPagination(pageKey);
        data = { ...pagination, ...data };
    }

    return dispatch => {
        return api.get({
            url: apiUrl.API_THONG_KE_TONG_HOP_TINH_HINH_VSATTP,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                if (res.result) {
                    dispatch(handleGetAllTongHopTinhHinhVSATTP(res.result));
                }
                else {
                    dispatch(handleGetAllTongHopTinhHinhVSATTP([]));
                }

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

const handleGetAllTongHopTinhHinhVSATTP = (values) => {
    return {
        type: type.TYPE_THONG_KE_TONG_HOP_TINH_HINH_VSATTP_LIST,
        values
    }
}


export const getAllRequestXayDungCSVCDiaPhuong = (object = {}) => {
    var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest(object);
    if (isPagination) {
        var pagination = main.getParamPagination(pageKey);
        data = { ...pagination, ...data };
    }

    return dispatch => {
        return api.get({
            url: apiUrl.API_THONG_KE_XAY_DUNG_CSVC_DIA_PHUONG,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                if (res.result) {
                    dispatch(handleGetAllXayDungCSVCDiaPhuong(res.result));
                }
                else {
                    dispatch(handleGetAllXayDungCSVCDiaPhuong([]));
                }

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

const handleGetAllXayDungCSVCDiaPhuong = (values) => {
    return {
        type: type.TYPE_THONG_KE_XAY_DUNG_CSVC_DIA_PHUONG_LIST,
        values
    }
}
