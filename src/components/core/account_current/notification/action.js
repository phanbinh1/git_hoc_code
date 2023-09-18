import { API_NOTIFICATION, SOCKET_PORT } from "./../../../../constants/api"
import { get, post, put, del } from "./../../../../util/api_call"
import {
    TYPE_NOTIFICATION_LIST,
    TYPE_NOTIFICATION_COUNT,
    TYPE_NOTIFICATION_TICK_SEEN,
    TYPE_NOTIFICATION_TICK_NOT_SEEN,
    TYPE_NOTIFICATION_DELETE,
    TYPE_NOTIFICATION_LOAD_MORE,
    TYPE_NOTIFICATION_TICK_SEEN_ALL,
    TYPE_NOTIFICATION_TICK_RECEIVED,
    TYPE_NOTIFICATION_TICK_NOT_RECEIVED,
    TYPE_NOTIFICATION_TICK_RECEIVED_ALL,
    TYPE_NOTIFICATION_PAGE_LIST,
    TYPE_NOTIFICATION_LOAD_MORE_PAGE
} from "../../../../constants/type"
import SockJS from 'sockjs-client'; // Note this line
import Stomp from 'stompjs';

export const send = () => {
    const socket = new SockJS(SOCKET_PORT);
    const stompClient = Stomp.over(socket);
    stompClient.debug = null;
    stompClient.connect({}, () => {
        return stompClient.send("/notification/notify", {}, JSON.stringify([10319]));
    });
}

export const createNotifi = ({
    maThongBao,
    phongBans = null,
    chucVus = null,
    nguoiNhans = null,
    noiDungChiTiet
}) => {
    post({
        url: `${API_NOTIFICATION}notification/createnotification`,
        data: {
            maThongBao,
            phongBans,
            html: "<a href='http://192.168.5.169:8080/'>Trang chủ</a>",
            chucVus,
            nguoiNhans,
            noiDungChiTiet: noiDungChiTiet ? JSON.stringify(noiDungChiTiet) : ""
        },
        errorNotifi: false
    }).then(res => {
        if (res.status) {
            const socket = new SockJS(SOCKET_PORT);
            const stompClient = Stomp.over(socket);
            stompClient.debug = null;
            stompClient.connect({}, () => {
                res.result.map(item => {
                    return stompClient.send("/notification/notify", {}, JSON.stringify([item]));
                })
            });
        }
    })
}

export const getNotifi = ({
    currentPage = 1,
    pageSize = 5,
    daNhan,
    callback
}) => {
    return dispatch => get({
        url: `${API_NOTIFICATION}notification/user?currentPage=${currentPage}&pageSize=${pageSize}${daNhan === true || daNhan === false ? `&daNhan=${daNhan ? 1 : 0}` : ``}`,
        errorNotifi: false
    })
        .then(res => {
            if (res && res.status) {
                dispatch({
                    type: currentPage === 1 ? TYPE_NOTIFICATION_LIST : TYPE_NOTIFICATION_LOAD_MORE,
                    values: (res.result || []).map(item => ({
                        ...item,
                        daXem: item.daXem === 1,
                        daNhan: item.daNhan === 1,
                        daXoa: item.daXoa === 1,
                    })),
                    pagination: res.pagination
                })
                dispatch({
                    type: TYPE_NOTIFICATION_COUNT,
                    count: res.chuaNhan || 0
                })
            }
            typeof callback === "function" && callback();
        })
}

export const getAllNotifi = ({
    currentPage = 1,
    pageSize = 20,
    daNhan,
    callback
}) => {
    return dispatch => get({
        url: `${API_NOTIFICATION}notification/user?currentPage=${currentPage}&pageSize=${pageSize}${daNhan === true || daNhan === false ? `&daNhan=${daNhan ? 1 : 0}` : ``}`,
        errorNotifi: false
    })
        .then(res => {
            if (res && res.status) {
                dispatch({
                    type: currentPage === 1 ? TYPE_NOTIFICATION_PAGE_LIST : TYPE_NOTIFICATION_LOAD_MORE_PAGE,
                    values: (res.result || []).map(item => ({
                        ...item,
                        daXem: item.daXem === 1,
                        daNhan: item.daNhan === 1,
                        daXoa: item.daXoa === 1,
                    })),
                    pagination: res.pagination
                })
            }
            typeof callback === "function" && callback();
        })
}

export const seenNotifi = ({
    ids = [],
    daXem = 1
}) => {
    return dispatch => put({
        url: `${API_NOTIFICATION}notification/updatenotification?daXem=${daXem}`,
        data: ids,
        errorNotifi: false
    }).then(res => {
        if (res.status) {
            dispatch({
                type: daXem === 1 ? TYPE_NOTIFICATION_TICK_SEEN : TYPE_NOTIFICATION_TICK_NOT_SEEN,
                ids,
                count: ids.length
            })
        }
    })
}

export const seenAllNotifi = ({
    daXem = 1
}) => {
    return dispatch => put({
        url: `${API_NOTIFICATION}notification/updatenotificationall?daXem=${daXem}`,
        errorNotifi: false
    }).then(res => {
        if (res.status) {
            dispatch({
                type: TYPE_NOTIFICATION_TICK_SEEN_ALL
            })
        }
    })
}

export const deleteNotifi = ({
    ids = []
}) => {
    return dispatch => del({
        url: `${API_NOTIFICATION}notification/deletenotification`,
        data: ids,
        errorNotifi: false
    }).then(res => {
        if (res.status) {
            dispatch({
                type: TYPE_NOTIFICATION_DELETE,
                ids,
                count: ids.length
            })
        }
    })
}

export const receiveNotifi = ({
    ids = [],
    daNhan = 1
}) => {
    return dispatch => put({
        url: `${API_NOTIFICATION}notification/updatenotification/danhan?daNhan=${daNhan}`,
        data: ids,
        errorNotifi: false
    }).then(res => {
        if (res.status) {
            dispatch({
                type: daNhan === 1 ? TYPE_NOTIFICATION_TICK_RECEIVED : TYPE_NOTIFICATION_TICK_NOT_RECEIVED,
                ids,
                count: ids.length
            })
        }
    })
}

export const receiveAllNotifi = ({
    daNhan = 1
}) => {
    return dispatch => put({
        url: `${API_NOTIFICATION}notification/updatenotificationallreceive?daNhan=${daNhan}`,
        errorNotifi: false
    }).then(res => {
        if (res.status) {
            dispatch({
                type: TYPE_NOTIFICATION_TICK_RECEIVED_ALL
            })
        }
    })
}