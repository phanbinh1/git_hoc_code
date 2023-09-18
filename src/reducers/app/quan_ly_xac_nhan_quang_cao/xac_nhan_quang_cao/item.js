import * as type from './../../../../constants/type';

export default (state = {}, action) => {
    var { value } = action;
    switch (action.type) {
        case type.TYPE_XAC_NHAN_QUANG_CAO_EDIT:
            return { ...value };
        case type.TYPE_XAC_NHAN_QUANG_CAO_CREATE:
            return {};
        case type.TYPE_XAC_NHAN_QUANG_CAO_UPDATE:
            return {};
        case type.TYPE_RESET_STORE:
            return {};
        default:
            return state;
    }
}