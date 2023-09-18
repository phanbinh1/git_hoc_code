import * as type from './../../../../constants/type';

export default (state = [], action) => {
    var { values, value } = action;
    var index = -1;
    switch (action.type) {
        case type.TYPE_DOAN_THAM_DINH_LIST:
            return [...values];
        case type.TYPE_DOAN_THAM_DINH_CREATE:
            return [value, ...state];
        case type.TYPE_DOAN_THAM_DINH_UPDATE:
            return state.map((item) => item.id === value.id ? value : item);
        case type.TYPE_DOAN_THAM_DINH_DELETE:
            return state.filter(item => values.findIndex(id => item.id === id) === -1);
        case type.TYPE_RESET_STORE:
            return [];
        default:
            return state;
    }
}