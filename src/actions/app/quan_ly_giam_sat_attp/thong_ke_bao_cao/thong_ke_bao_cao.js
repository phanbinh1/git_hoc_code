import * as api from "./../../../../util/api_call";
import * as apiUrl from './../../../../constants/api';
import * as type from "./../../../../constants/type";
import * as main from "./../../../../constants/main";
import * as actPagination from "./../../../../actions/core/pagination";
/**
 *  ==============================================================================
 *  ==============================================================================
 */
export const getAllRequestSuKen = (object = {}) => {
    var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest(object);
    if (isPagination) {
        var pagination = main.getParamPagination(pageKey);
        data = { ...pagination, ...data };
    }

    return dispatch => {
        return api.get({
            url: apiUrl.API_BAO_CAO_THONG_KE_SU_KIEN,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                if (res.result) {
                    dispatch(handleGetAllSuKien(res.result));
                }
                else {
                    dispatch(handleGetAllSuKien([]));
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

const handleGetAllSuKien = (values) => {
    return {
        type: type.TYPE_THONG_KE_BAO_CAO_SU_KIEN_LIST,
        values
    }
}


export const getAllRequestChiTietSuKen = (object = {}) => {
    var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest(object);
    if (isPagination) {
        var pagination = main.getParamPagination(pageKey);
        data = { ...pagination, ...data };
    }

    return dispatch => {
        return api.get({
            url: apiUrl.API_BAO_CAO_THONG_KE_CHI_TIET_SU_KIEN,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                if (res.result) {
                    dispatch(handleGetAllChiTietSuKien(res.result));
                }
                else {
                    dispatch(handleGetAllChiTietSuKien([]));
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

const handleGetAllChiTietSuKien = (values) => {
    return {
        type: type.TYPE_THONG_KE_BAO_CAO_CHI_TIET_SU_KIEN_LIST,
        values
    }
}


export const getAllRequestKeHoachGiamSat = (object = {}) => {
    var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest(object);
    if (isPagination) {
        var pagination = main.getParamPagination(pageKey);
        data = { ...pagination, ...data };
    }

    return dispatch => {
        return api.get({
            url: apiUrl.API_BAO_CAO_THONG_KE_KE_HOACH_GIAM_SAT,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                if (res.result) {
                    dispatch(handleGetAllKeHoachGiamSat(res.result));
                }
                else {
                    dispatch(handleGetAllKeHoachGiamSat([]));
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

const handleGetAllKeHoachGiamSat = (values) => {
    return {
        type: type.TYPE_THONG_KE_BAO_CAO_KE_HOACH_GIAM_SAT_LIST,
        values
    }
}


export const getAllRequestGiamSatAttp = (object = {}) => {
    var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest(object);
    if (isPagination) {
        var pagination = main.getParamPagination(pageKey);
        data = { ...pagination, ...data };
    }

    return dispatch => {
        return api.get({
            url: apiUrl.API_BAO_CAO_THONG_KE_GIAM_SAT_ATTP,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                if (res.result) {
                    dispatch(handleGetAllGiamSatAttp(res.result));
                }
                else {
                    dispatch(handleGetAllGiamSatAttp([]));
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

const handleGetAllGiamSatAttp = (values) => {
    return {
        type: type.TYPE_THONG_KE_BAO_CAO_GIAM_SAT_ATTP_LIST,
        values
    }
}
