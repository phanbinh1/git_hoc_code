import * as type from './../../../../constants/type';

export default (state = {}, action) => {
    var { value } = action;
    switch (action.type) {
        case type.TYPE_THONGTIN_NGHIPHEP_USER_EDIT:
            return { ...value };
        case type.TYPE_THONGTIN_NGHIPHEP_USER_CREATE:
            return {};
        case type.TYPE_THONGTIN_NGHIPHEP_USER_UPDATE:
            return {};
        case type.TYPE_RESET_STORE:
            return {};
        default:
            return state;
    }
}