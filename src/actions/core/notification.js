import * as main from "./../../constants/main";
import * as type from "./../../constants/type";
import moment from 'moment';

const dataNew = [
    {
        id: main.createID(),
        avtIcon: "fa fa-plus-square",
        notiType: "create",
        content: "Thông báo mới",
        daNhan: false,
        daXem: false,
        isNew: false
    },
    {
        id: main.createID(),
        avtIcon: "fa fa-pencil-square",
        notiType: "update",
        content: "Thông báo mới",
        daNhan: false,
        daXem: false,
        isNew: false
    }
]
const dataInit = [
    // {
    //     id: main.createID(),
    //     content: "Thông báo 1 Thông báo 1 Thông báo 1 Thông báo 1",
    //     daNhan: true,
    //     daXem: true,
    //     date: "2019/10/24 10:20:00"
    // }
];
const dataLoadMore = [
];

export const getAllRequest = () => {
    return dispatch => {
        return dispatch(handleGetAll(dataInit));
    }
}

export const loadNewRequest = () => {
    return dispatch => {
        return dispatch(handleLoadNew(dataNew.map((item) => {
            return { ...item, date: moment(new Date(), "YYYY-MM-DD hh:mm:ss") }
        })));
    }
}

export const loadMoreRequest = () => {
    return dispatch => {
        return dispatch(handleLoadMore(dataLoadMore));
    }
}

export const tickSeenAllRequest = () => {
    return dispatch => {
        return dispatch(handleTickSeenAll())
    }
}

export const tickSeenRequest = (notification) => {
    return dispatch => {
        return dispatch(handleTickSeen(notification))
    }
}

export const tickNotSeenRequest = (notification) => {
    return dispatch => {
        return dispatch(handleTickNotSeen(notification))
    }
}

export const tickReceivedAllRequest = () => {
    return dispatch => {
        return dispatch(handleTickReceivedAll())
    }
}

export const tickReceivedRequest = (notification) => {
    return dispatch => {
        return dispatch(handleTickReceived(notification))
    }
}

export const deleteRequest = (notification) => {
    return dispatch => {
        return dispatch(handleDelete(notification))
    }
}

const handleGetAll = (values) => {
    return {
        type: type.TYPE_NOTIFICATION_LIST,
        values
    }
}

const handleLoadNew = (values) => {
    return {
        type: type.TYPE_NOTIFICATION_LOAD_NEW,
        values
    }
}

const handleLoadMore = (values) => {
    return {
        type: type.TYPE_NOTIFICATION_LOAD_MORE,
        values
    }
}

const handleTickSeenAll = () => {
    return {
        type: type.TYPE_NOTIFICATION_TICK_SEEN_ALL
    }
}

const handleTickSeen = (notification) => {
    return {
        type: type.TYPE_NOTIFICATION_TICK_SEEN,
        notification
    }
}

const handleTickNotSeen = (notification) => {
    return {
        type: type.TYPE_NOTIFICATION_TICK_NOT_SEEN,
        notification
    }
}

const handleTickReceivedAll = () => {
    return {
        type: type.TYPE_NOTIFICATION_TICK_RECEIVED_ALL
    }
}

const handleTickReceived = (notification) => {
    return {
        type: type.TYPE_NOTIFICATION_TICK_RECEIVED,
        notification
    }
}

const handleDelete = (notification) => {
    return {
        type: type.TYPE_NOTIFICATION_DELETE,
        notification
    }
}


export const getAllPageRequest = () => {
    return dispatch => {
        return dispatch(handleGetAllPage(dataInit));
    }
}

export const loadMorePageRequest = () => {
    return dispatch => {
        return dispatch(handleLoadMorePage(dataLoadMore));
    }
}

const handleGetAllPage = (values) => {
    return {
        type: type.TYPE_NOTIFICATION_PAGE_LIST,
        values
    }
}
const handleLoadMorePage = (values) => {
    return {
        type: type.TYPE_NOTIFICATION_LOAD_MORE_PAGE,
        values
    }
}