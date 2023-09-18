import * as type from './../../../constants/type';

export default (state = [], action) => {
    var { values, value, payload } = action;
    switch (action.type) {
        case type.TYPE_ACCOUNT_GROUP_LIST:
            return [...values];
        case type.TYPE_ACCOUNT_GROUP_CREATE:
            return [value, ...state];
        case type.TYPE_ACCOUNT_GROUP_UPDATE:
            return state.map((item) => item.groupCode === value.groupCode ? value : item);
        case type.TYPE_ACCOUNT_GROUP_DELETE:
            return state.filter(item => values.findIndex(groupCode => groupCode === item.groupCode) === -1);
        case type.TYPE_SOCKET_ACCOUNT_GROUP:
            switch (payload.type) {
                case type.TYPE_ACCOUNT_GROUP_CREATE:
                    return [payload.data, ...state];
                case type.TYPE_ACCOUNT_GROUP_UPDATE:
                    return state.map((item) => item.groupCode === payload.data.groupCode ? payload.data : item);
                case type.TYPE_ACCOUNT_GROUP_DELETE:
                    return state.filter(item => payload.data.findIndex(groupCode => groupCode === item.groupCode) === -1);
                default:
                    return state;
            }
        case type.TYPE_RESET_STORE:
            return [];
        default:
            return state;
    }
}