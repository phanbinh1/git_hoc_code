import * as type from './../../../../constants/type';

export default (state = {}, action) => {
    var { value } = action;
    switch (action.type) {
        case type.TYPE_HO_TIEU_THUONG_EDIT:
            return { ...value };
        case type.TYPE_HO_TIEU_THUONG_CREATE:
            return {};
        case type.TYPE_HO_TIEU_THUONG_UPDATE:
            return {};
        case type.TYPE_RESET_STORE:
            return {};
        default:
            return state;
    }
}