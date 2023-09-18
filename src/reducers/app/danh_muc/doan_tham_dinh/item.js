import * as type from './../../../../constants/type';

export default (state = {}, action) => {
    var { value } = action;
    switch (action.type) {
        case type.TYPE_DOAN_THAM_DINH_EDIT:
            return { ...value };
        case type.TYPE_DOAN_THAM_DINH_CREATE:
            return {};
        case type.TYPE_DOAN_THAM_DINH_UPDATE:
            return {};
        case type.TYPE_RESET_STORE:
            return {};
        default:
            return state;
    }
}