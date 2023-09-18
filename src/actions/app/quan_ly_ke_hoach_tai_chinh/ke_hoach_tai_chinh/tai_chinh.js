import * as api from "./../../../../util/api_call";
import * as apiUrl from './../../../../constants/api';
import * as type from "./../../../../constants/type";
import * as main from "./../../../../constants/main";
import * as message from "./../../../../constants/message";
import * as actPagination from "./../../../../actions/core/pagination";
import * as act from "./../../../../actions";
import { CONST_ATTACH_TYPE } from "./../../../../constants/constants";
/**
 *  ==============================================================================
 *  ==============================================================================
 */


function convert(tree, idParent = 0) {
    return tree.reduce(function (acc, o) {
        if (o.id) {
            o.idParent = idParent;
            acc.push(o);
        }
        if (o.chiTietPhanBos)
            acc = acc.concat(convert(o.chiTietPhanBos, o.id));
        return acc;
    }, []);
}
function list_to_tree_2(list) {
    var map = {}, node, roots = [], i;

    for (i = 0; i < list.length; i += 1) {
        map[list[i].id] = i;
        list[i].chiTietPhanBos = [];
    }

    for (i = 0; i < list.length; i += 1) {
        node = list[i];
        if (node.idParent !== 0) {
            if (list[map[node.idParent]]) {
                node.level = list[map[node.idParent]].level + 1;
                list[map[node.idParent]].chiTietPhanBos.push(node);
            }
        } else {
            node.level = 1;
            roots.push(node);
        }
    }
    return roots;
}
export const getAllRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest(object);
    if (isPagination) {
        var pagination = main.getParamPagination(pageKey);
        data = { ...pagination, ...data };
    }
    return dispatch => {
        return api.get({
            url: apiUrl.API_QUAN_LY_TAI_CHINH,
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
                requestSuccess();
                let result = [...res.result];
                let promiseArrayParent = [];
                let promiseArray = [];
                result.map(item => {
                    promiseArrayParent.push(new Promise((resolve, reject) => {
                        if (item && item.hasOwnProperty("chiTietPhanBos") && item.chiTietPhanBos && item.chiTietPhanBos.length > 0) {
                            let tempArray = [...convert(item.chiTietPhanBos)];
                            let arrFile = new Set();
                            tempArray.map(x => {
                                x.hasOwnProperty("dieuChuyenKinhPhiChuyens") && x.dieuChuyenKinhPhiChuyens && x.dieuChuyenKinhPhiChuyens.length > 0 && x.dieuChuyenKinhPhiChuyens.map(ele => {
                                    arrFile.add(ele.id);
                                });
                                x.hasOwnProperty("dieuChuyenKinhPhiNhans") && x.dieuChuyenKinhPhiNhans && x.dieuChuyenKinhPhiNhans.length > 0 && x.dieuChuyenKinhPhiNhans.map(ele => {
                                    arrFile.add(ele.id);
                                });
                            });
                            [...Array.from(arrFile)].map((value) => {
                                promiseArray.push(new Promise((resolve, reject) => {
                                    act.getFiles({
                                        url: apiUrl.API_ATTACH_FILE,
                                        data: {
                                            attachEntityType: CONST_ATTACH_TYPE.QUYETDINHDIEUCHUYEN,
                                            entityId: value,
                                        },
                                        requestSuccess: (res) => {
                                            if (res && res.result) {
                                                tempArray.map(_ele => {
                                                    _ele.hasOwnProperty("dieuChuyenKinhPhiChuyens") && _ele.dieuChuyenKinhPhiChuyens && _ele.dieuChuyenKinhPhiChuyens.length > 0 && _ele.dieuChuyenKinhPhiChuyens.map(ele => {
                                                        if (ele.id === value) {
                                                            ele.listFiles = [...res.result];
                                                        }
                                                    });
                                                    _ele.hasOwnProperty("dieuChuyenKinhPhiNhans") && _ele.dieuChuyenKinhPhiNhans && _ele.dieuChuyenKinhPhiNhans.length > 0 && _ele.dieuChuyenKinhPhiNhans.map(ele => {
                                                        if (ele.id === value) {
                                                            ele.listFiles = [...res.result];
                                                        }
                                                    });
                                                })
                                            }
                                            resolve(true);
                                        },
                                        requestError: () => {
                                            resolve(true);
                                        }
                                    });
                                }));
                            });
                            Promise.all(promiseArray).then(() => {
                                item.chiTietPhanBos = list_to_tree_2(tempArray);
                                resolve(true);
                            });
                        } else {
                            resolve(true);
                        }
                    }))
                });
                Promise.all(promiseArrayParent).then(() => {
                    dispatch(handleGetAll(result));
                });
            } else {
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
            requestError();
        } else {
            return api.get({
                url: apiUrl.API_QUAN_LY_TAI_CHINH + `/${data.id}`,
                controller
            }).then(res => {
                if (res && res.status && res.result_tree) {
                    // const result = { ...res.result,phanBoPhongBanTongHops:[...res.phanBoPhongBanTongHops] };
                    dispatch(handleGetOne(res.result_tree));
                    
                    requestSuccess(res);
                } else {
                    requestError(res);
                }
            })
        }
    }
}


export const getThucHienRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        if (!data.id) {
            message.error({ content: "Dữ liệu đầu vào không chính xác!" });
            requestError();
        } else {
            return api.get({
                url: apiUrl.API_QUAN_LY_THUC_HIEN + `/${data.id}/chitiet`,
                controller
            }).then(res => {
                if (res && res.status && res.result) {
                    const result = { ...res.result };
                    dispatch(handleGetOne(result));
                    requestSuccess({ ...res, result });
                } else {
                    requestError(res);
                }
            })
        }
    }
}

export const createRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.post({
            url: apiUrl.API_QUAN_LY_TAI_CHINH,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                res.result.chiTietPhanBos = res.result_list || [];
                dispatch(handleCreate(res.result));
                requestSuccess();
                message.success({ content: res.msg || "Thêm mới thành công!" });
            } else {
                requestError();
                message.error({ content: res.msg || "Thêm mới thất bại" });
            }
        })
    }
}


export const updateRequest = (object = {}, isCheckDaTongHop = false, maPhongBan = null) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.put({
            url: `${apiUrl.API_QUAN_LY_TAI_CHINH}?isCheckDaTongHop=${isCheckDaTongHop}${`&maPhongBan=${maPhongBan}`}`,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                res.result.chiTietPhanBos = res.result_list || [];
                dispatch(handleUpdate({...res.result,phanBoPhongBanTongHops:res.phanBoPhongBanTongHops}));
                requestSuccess();
                message.success({ content: res.msg || "Cập nhật thành công!" });
            } else {
                requestError();
                message.error({ content: res.msg || "Cập nhật thất bại!" });
            }
        })
    }
}

export const deleteRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.del({
            url: apiUrl.API_QUAN_LY_TAI_CHINH,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                dispatch(handleDelete(data));
                requestSuccess();
                res.msg && message.success({ content: res.msg });
            } else {
                requestError();
                res.msg && message.error({ content: res.msg });
            }
        })
    }
}




const handleGetAll = (values) => {
    return {
        type: type.TYPE_TAI_CHINH_LIST,
        values,
    }
}

export const handleGetOne = (value) => {
    return {
        type: type.TYPE_TAI_CHINH_EDIT,
        value,
    }
}

const handleCreate = (value) => {
    return {
        type: type.TYPE_TAI_CHINH_CREATE,
        value,
    }
}

const handleUpdate = (value) => {
    return {
        type: type.TYPE_TAI_CHINH_UPDATE,
        value,
    }
}

const handleDelete = (values) => {
    return {
        type: type.TYPE_TAI_CHINH_DELETE,
        values,
    }
}

export const updateTrangThaiLuanChuyenRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.put({
            url: apiUrl.API_QUAN_LY_TAI_CHINH_UPDATE_TRANG_THAI_LUAN_CHUYEN,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                if (res.hasOwnProperty("result_phanbodutoan") && res.result_phanbodutoan) {
                    dispatch(handleUpdate(res.result_phanbodutoan));
                }
                requestSuccess();
                message.success({ content: res.msg || "Cập nhật thành công!" });
            } else {
                requestError();
                message.error({ content: res.msg || "Cập nhật thất bại!" });
            }
        })
    }
}

export const updateTrangThaiPheDuyetRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.put({
            url: apiUrl.API_QUAN_LY_TAI_CHINH_UPDATE_TRANG_THAI_PHE_DUYET,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                dispatch(handleUpdate(res.result));
                requestSuccess();
                message.success({ content: res.msg || "Cập nhật thành công!" });
            } else {
                requestError();
                message.error({ content: res.msg || "Cập nhật thất bại!" });
            }
        })
    }
}
function list_to_tree(list) {
    var map = {}, node, roots = [], i;

    for (i = 0; i < list.length; i += 1) {
        map[list[i].idChiTietPhanBo] = i;
        list[i].children = null;
    }

    for (i = 0; i < list.length; i += 1) {
        node = list[i];
        if (node.idParent !== 0) {
            if (list[map[node.idParent]]) {
                if (list[map[node.idParent]].children === null) {
                    list[map[node.idParent]].children = [];
                }
                node.level = list[map[node.idParent]].level + 1;
                list[map[node.idParent]].children.push(node);
            }
        } else {
            node.level = 1;
            roots.push(node);
        }
    }
    return roots;
}

export const listLichSuCapNhatRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.get({
            url: apiUrl.API_QUAN_LY_TAI_CHINH_LICH_SU_CAP_NHAT + `?idPhanBo=${data.idPhanBo}`,
            controller
        }).then(res => {
            if (res && res.status) {
                if (res.result && res.result.length > 0) {
                    let tempObject = {};
                    res.result.map(x => {
                        if (tempObject.hasOwnProperty(`${x.ngaySua.split(".")[0]}`)) {
                            tempObject[`${x.ngaySua.split(".")[0]}`].push(x);
                        } else {
                            tempObject[`${x.ngaySua.split(".")[0]}`] = [];
                            tempObject[`${x.ngaySua.split(".")[0]}`].push(x);
                        }
                    });
                    let tempArray = [];
                    Object.keys(tempObject).map(key => {
                        tempArray.push(list_to_tree(tempObject[`${key}`]))
                    });
                    let result = [];
                    tempArray.map((x, i) => {
                        if (x && x.length > 0 && x[0]) {
                            result.push({ ...JSON.parse(x[0].lichSuPhanBo), index: i, chiTietPhanBos: [...x], ngaySua: x[0].ngaySua, nguoiSua: x[0].nguoiSua })
                        }
                    })
                    dispatch(handleGetLichSuCapNhat(result));
                } else {
                    dispatch(handleGetLichSuCapNhat([]));
                }
                requestSuccess();
            } else {
                dispatch(handleGetLichSuCapNhat([]));
                requestError();
            }
        })
    }
}

const handleGetLichSuCapNhat = (values) => {
    return {
        type: type.TYPE_TAI_CHINH_LICH_SU_CAP_NHAT_LIST,
        values,
    }
}
export const exportKeHoachTaiChinhRequest = (object = {}) => {
    var { data, controller } = main.checkValidObjectRequest(object);
    let param = `${data.isTrinhPheDuyet !== null ? "isTrinhPheDuyet=" + data.isTrinhPheDuyet + "&" : ""}${data.maPhongBan !== null ? "maPhongBan=" + data.maPhongBan + "&" : ""}${data.step !== null ? "step=" + data.step : ""}`;
    return dispatch => {
        return api.download({
            url: apiUrl.API_QUAN_LY_THUC_HIEN + `/${data.id}/export/chitietphanbo${param.trim() !== "" ? "?" + param : ""}`,
            controller
        }).then(res => {

        })
    }
}
