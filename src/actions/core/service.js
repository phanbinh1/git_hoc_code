import * as api from "./../../util/api_call";
import * as apiUrl from './../../constants/api';
import * as type from "./../../constants/type";
import * as message from "./../../constants/message";
import * as main from "./../../constants/main";
import * as actPagination from "./pagination";

export const getAllRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller, pageKey, isPagination } = main.checkValidObjectRequest(object);
    if (isPagination) {
        var pagination = main.getParamPagination(pageKey);
        data = { ...pagination, ...data };
    }
    return dispatch => {
        return api.get({
            url: apiUrl.API_SERVICE,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                dispatch(handleGetAll(res.result));
                if (res.hasOwnProperty("pagination") && isPagination) {
                    dispatch(actPagination.Pagination({
                        ...res.pagination,
                        currentPage: data.currentPage
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

export const getOneRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        if (!data.clientId) {
            message.error({ content: "Dữ liệu đầu vào không chính xác!" });
        }
        else {
            return api.get({
                url: apiUrl.API_SERVICE + `/${data.clientId}`,
                controller
            }).then(res => {
                if (res && res.status) {
                    dispatch(handleGetOne(res.result));
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
            url: apiUrl.API_SERVICE,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                res.msg && message.success({ content: res.msg });
                dispatch(handleCreate(res.result));
                requestSuccess(res);
            }
            else {
                res.msg && message.error({ content: res.msg });
                requestError();
            }
        })
    }
}

export const updateRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.put({
            url: apiUrl.API_SERVICE,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                res.msg && message.success({ content: res.msg });
                dispatch(handleUpdate(res.result));
                requestSuccess(res);
            }
            else {
                res.msg && message.error({ content: res.msg });
                requestError();
            }
        })
    }
}

export const deleteRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        return api.del({
            url: apiUrl.API_SERVICE,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                res.msg && message.success({ content: res.msg });
                dispatch(handleDelete(data));
                requestSuccess();
            }
            else {
                res.msg && message.error({ content: res.msg });
                requestError();
            }
        })
    }
}


const handleGetAll = (values) => {
    return {
        type: type.TYPE_SERVICE_LIST,
        values
    }
}

export const handleGetOne = (value) => {
    return {
        type: type.TYPE_SERVICE_EDIT,
        value
    }
}

const handleCreate = (value) => {
    return {
        type: type.TYPE_SERVICE_CREATE,
        value
    }
}

const handleUpdate = (value) => {
    return {
        type: type.TYPE_SERVICE_UPDATE,
        value
    }
}

const handleDelete = (values) => {
    return {
        type: type.TYPE_SERVICE_DELETE,
        values
    }
}