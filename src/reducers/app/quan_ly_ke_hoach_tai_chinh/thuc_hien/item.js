import * as type from './../../../../constants/type';

export default (state = {}, action) => {
    var { value } = action;
    switch (action.type) {
        case type.TYPE_TAI_CHINH_THUC_HIEN_EDIT:
            return { ...value };
        case type.TYPE_TAI_CHINH_THUC_HIEN_CREATE:
            return {};
        case type.TYPE_TAI_CHINH_THUC_HIEN_UPDATE:
            return {};
        case type.TYPE_RESET_STORE:
            return {};
        default:
            return state;
    }
}