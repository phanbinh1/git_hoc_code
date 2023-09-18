import * as api from "./../../util/api_call";
import * as apiUrl from './../../constants/api';
import * as type from "./../../constants/type";
import * as main from "./../../constants/main";
import * as message from "./../../constants/message";

export const startSyncProcessRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        if (data.jobCode) {
            return api.post({
                url: apiUrl.API_SYNC_PROCESS_START(data.jobCode),
                controller
            }).then(res => {
                if (res && res.status) {
                    requestSuccess(res);
                }
                else {
                    res.msg && message.error({
                        content: "Không thể bắt đầu tiến trình đồng bộ!"
                    });
                    requestError(res);
                }
            })
        }
    }
}

export const getStatusSyncProcessRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        if (data.jobCode) {
            return api.get({
                url: apiUrl.API_SYNC_PROCESS_GET_STATUS(data.jobCode),
                errorNotifi: false,
                controller
            }).then(res => {
                if (res && res.status) {
                    res.result && dispatch(updateSyncProcess(res.result));
                    requestSuccess(res);
                }
                else {
                    requestError(res);
                }
            })
        }
    }
}

export const resetSyncProcessRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        if (data.jobCode) {
            return api.put({
                url: apiUrl.API_SYNC_PROCESS_RESET(data.jobCode),
                controller
            }).then(res => {
                if (res && res.status) {
                    res.result && dispatch(updateSyncProcess(res.result));
                    requestSuccess(res);
                }
                else {
                    requestError(res);
                }
            })
        }
    }
}

export const updateSyncProcessRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        if (data.jobCode && data.status) {
            return api.put({
                url: apiUrl.API_SYNC_PROCESS_UPDATE(data.jobCode, data.status),
                controller
            }).then(res => {
                if (res && res.status) {
                    requestSuccess(res);
                    res.result && dispatch(updateSyncProcess(res.result));
                }
                else {
                    requestError(res);
                }
            })
        }
    }
}

export const runSyncProcessRequest = (object = {}) => {
    let { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    data = { ...data, status: 1 };
    return dispatch => {
        if (data.jobCode) {
            return dispatch(updateSyncProcessRequest({ data, requestSuccess, requestError, controller }));
        }
    }
}

export const pauseSyncProcessRequest = (object = {}) => {
    let { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    data = { ...data, status: 2 };
    return dispatch => {
        if (data.jobCode) {
            return dispatch(updateSyncProcessRequest({ data, requestSuccess, requestError, controller }));
        }
    }
}

export const restartSyncProcessRequest = (object = {}) => {
    let { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    data = { ...data, status: 3 };
    return dispatch => {
        if (data.jobCode) {
            return dispatch(updateSyncProcessRequest({ data, requestSuccess, requestError, controller }));
        }
    }
}

export const destroySyncProcessRequest = (object = {}) => {
    let { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        if (data.jobCode) {
            return api.put({
                url: apiUrl.API_SYNC_PROCESS_UPDATE(data.jobCode, 2),
                controller
            }).then(res => {
                if (res && res.status) {
                    dispatch(resetSyncProcessRequest({
                        data: { jobCode: res.result.jobCode },
                        requestSuccess,
                    }));
                }
                else {
                    requestError(res);
                }
            })
        }
    }
}

export const createSyncProcess = (job) => {
    return {
        type: type.TYPE_SYNC_PROCESS_CREATE,
        job,
        jobCode: job.jobCode
    }
}

export const updateSyncProcess = (job) => {
    return {
        type: type.TYPE_SYNC_PROCESS_UPDATE,
        job,
        jobCode: job.jobCode
    }
}

export const deleteSyncProcess = (jobCode) => {
    return {
        type: type.TYPE_SYNC_PROCESS_DELETE,
        jobCode
    }
}