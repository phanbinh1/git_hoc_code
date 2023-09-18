import * as type from './../../../constants/type';

export default (state = [], action) => {
    var { values, value, payload } = action;
    switch (action.type) {
        case type.TYPE_ACCOUNT_LIST:
            return [...values];
        case type.TYPE_ACCOUNT_CREATE:
            return [value, ...state];
        case type.TYPE_ACCOUNT_UPDATE:
            return state.map(item => item.id === value.id ? value : item);
        case type.TYPE_ACCOUNT_DELETE:
            return state.filter(item => values.findIndex(name => name === item.name) === -1);
        case type.TYPE_SOCKET_ACCOUNT:
            switch (payload.type) {
                case type.TYPE_ACCOUNT_CREATE:
                    return [payload.data, ...state];
                case type.TYPE_ACCOUNT_UPDATE:
                    return state.map((item) => item.id === payload.data.id ? payload.data : item);
                case type.TYPE_ACCOUNT_DELETE:
                    return state.filter(item => payload.data.findIndex(name => name === item.name) === -1);
                default:
                    return state;
            }
        case type.TYPE_RESET_STORE:
            return [];
        default:
            return state;
    }
}