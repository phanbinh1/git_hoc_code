import * as type from './../../../constants/type';

export default (state = [], action) => {
    const { values, value, payload } = action;
    switch (action.type) {
        case type.TYPE_CAU_HINH_LIST:
            return [...values];
        case type.TYPE_CAU_HINH_CREATE:
            return [value, ...state];
        case type.TYPE_CAU_HINH_UPDATE:
            return state.map((item) => item.id === value.id ? value : item);
        case type.TYPE_CAU_HINH_DELETE:
            return state.filter(item => values.findIndex(id => id === item.id) === -1);
        case type.TYPE_SOCKET_CONFIG:
            switch (payload.type) {
                case type.TYPE_CAU_HINH_CREATE:
                    return [payload.data, ...state];
                case type.TYPE_CAU_HINH_UPDATE:
                    return state.map((item) => item.id === payload.data.id ? payload.data : item);
                case type.TYPE_CAU_HINH_DELETE:
                    return state.filter(item => payload.data.findIndex(id => id === item.id) === -1);
                default:
                    return state;
            }
        case type.TYPE_RESET_STORE:
            return [];
        default:
            return state;
    }
}