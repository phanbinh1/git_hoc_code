import * as api from "./../../../../util/api_call";
import * as apiUrl from './../../../../constants/api';
import * as type from "./../../../../constants/type";
import * as main from "./../../../../constants/main";
import * as message from "./../../../../constants/message";
import * as actPagination from "./../../../../actions/core/pagination";
import * as actNhanSu from "./../../../../actions/app/quan_ly_nhan_su/nhan_su/nhan_su";
import * as actPhongBan from "./../../../../actions/app/quan_ly_nhan_su/danh_muc/phong_ban";

/**
 *  ==============================================================================
 *  ==============================================================================
 */

export const getDsNhanSu = () => {
    return dispatch => {
        return dispatch(actNhanSu.getAllRequest({
            data: {},
            requestSuccess: (r) => {
                if (r && r.result) {
                    dispatch(onAdditional(r.result, type.TYPE_THIDUA_KHENTHUONG_NHANSU_LIST));
                }
            }
        }));
    }
}

export const getDsPhongBan = () => {
    return dispatch => {
        return dispatch(actPhongBan.getAllRequest({
            data: {},
            requestSuccess: (r) => {
                if (r && r.result) {
                    dispatch(onAdditional(r.result, type.TYPE_THIDUA_KHENTHUONG_PHONGBAN_LIST));
                }
            }
        }));
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
            url: apiUrl.API_THONGTIN_KHENTHUONG,
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
            const urls = [
                apiUrl.API_THONGTIN_KHENTHUONG + `/${data.id}`,
                apiUrl.API_THONGTIN_KHENTHUONG_DS_NHANSU(data.id),
                apiUrl.API_THONGTIN_KHENTHUONG_DS_PHONGBAN(data.id),
            ];
            const allRequests = urls.map(url => {
                return api.get({
                    url: url,
                    controller
                }).then(res => {
                    return res;
                })
            });

            Promise.all(allRequests).then(res => {
                const detailInfo = res && res[0];
                const listNhanSu = res && res[1];
                const listPhongBan = res && res[2];
                dispatch(handleGetOne({
                    ...detailInfo.result,
                    list_nhansu: listNhanSu.result,
                    list_phongban: listPhongBan.result
                }));
                dispatch(getDsNhanSu());
                requestSuccess();
            }).catch(err => {
                requestError();
            });
        }
    }
}

export const getDetailRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        if (!data.id) {
            message.error({ content: "Dữ liệu đầu vào không chính xác!" });
        }
        else {
            const urls = [
                apiUrl.API_THONGTIN_KHENTHUONG + `/${data.id}`,
                apiUrl.API_THONGTIN_KHENTHUONG_DS_NHANSU(data.id),
                apiUrl.API_THONGTIN_KHENTHUONG_DS_PHONGBAN(data.id),
            ];
            const allRequests = urls.map(url => {
                return api.get({
                    url: url,
                    controller
                }).then(res => {
                    return res;
                })
            });

            Promise.all(allRequests).then(res => {
                const detailInfo = res && res[0];
                const listNhanSu = res && res[1];
                const listPhongBan = res && res[2];
                dispatch(handleGetDetail({
                    ...detailInfo.result,
                    list_nhansu: listNhanSu.result,
                    list_phongban: listPhongBan.result
                }));
                requestSuccess();
            }).catch(err => {
                requestError();
            });
        }
    }
}

export const getCreateRequest = (object = {}) => {
    return dispatch => {
        dispatch(handleGetOne(object));
        dispatch(getDsNhanSu());
    }
}

export const createRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    const isNhanSu = (data.doiTuongKhenThuong === "NHANSU") ? true : false;
    return dispatch => {
        return api.post({
            url: apiUrl.API_THONGTIN_KHENTHUONG,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                dispatch(handleCreate(res.result));
                const regResult = res.result;
                return api.put({
                    url: isNhanSu ? apiUrl.API_THONGTIN_KHENTHUONG_DS_NHANSU(regResult.id) : apiUrl.API_THONGTIN_KHENTHUONG_DS_PHONGBAN(regResult.id),
                    data: data.targetKeys,
                    controller
                }).then(res2 => {
                    if (res2 && res2.status) {
                        requestSuccess();
                        res2.msg && message.success({ content: res2.msg });
                    }
                    else {
                        requestError();
                        res2.msg && message.error({ content: res2.msg });
                    }
                })
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
    const isNhanSu = (data.doiTuongKhenThuong === "NHANSU") ? true : false;
    return dispatch => {
        return api.put({
            url: apiUrl.API_THONGTIN_KHENTHUONG,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                dispatch(handleUpdate(res.result));
                return api.put({
                    url: isNhanSu ? apiUrl.API_THONGTIN_KHENTHUONG_DS_NHANSU(data.id) : apiUrl.API_THONGTIN_KHENTHUONG_DS_PHONGBAN(data.id),
                    data: data.targetKeys,
                    controller
                }).then(res2 => {
                    if (res2 && res2.status) {
                        requestSuccess();
                        res2.msg && message.success({ content: res2.msg });
                    }
                    else {
                        requestError();
                        res2.msg && message.error({ content: res2.msg });
                    }
                })
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
            url: apiUrl.API_THONGTIN_KHENTHUONG,
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

const onAdditional = (value, type) => {
    return { type, value }
}

const handleGetAll = (values) => {
    return {
        type: type.TYPE_THIDUA_KHENTHUONG_LIST,
        values
    }
}

export const handleGetOne = (value) => {
    const listId = [];
    let isNhanSu = true;
    if (value.hasOwnProperty("doiTuongKhenThuong")) {
        isNhanSu = (value.doiTuongKhenThuong === "NHANSU") ? true : false;
    }
    if (isNhanSu && value.hasOwnProperty("list_nhansu")) {
        value.list_nhansu.map((nhansu) => {
            return listId.push(`${nhansu.id}`);
        })
    } else if (value.hasOwnProperty("list_phongban")) {
        value.list_phongban.map((phongban) => {
            return listId.push(`${phongban.id}`);
        })
    }
    value.targetKeys = listId;
    return {
        type: type.TYPE_THIDUA_KHENTHUONG_EDIT,
        value
    }
}

const handleGetDetail = (value) => {
    return {
        type: type.TYPE_THIDUA_KHENTHUONG_DETAIL,
        value
    }
}

const handleCreate = (value) => {
    return {
        type: type.TYPE_THIDUA_KHENTHUONG_CREATE,
        value
    }
}

const handleUpdate = (value) => {
    return {
        type: type.TYPE_THIDUA_KHENTHUONG_UPDATE,
        value
    }
}

const handleDelete = (values) => {
    return {
        type: type.TYPE_THIDUA_KHENTHUONG_DELETE,
        values
    }
}