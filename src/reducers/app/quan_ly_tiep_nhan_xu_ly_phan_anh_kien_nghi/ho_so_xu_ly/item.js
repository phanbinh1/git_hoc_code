import * as type from './../../../../constants/type';

export default (state = {}, action) => {
    var { value } = action;
    switch (action.type) {
        case type.TYPE_PAKN_HO_SO_DANG_XU_LY_EDIT:
            return { ...value };
        case type.TYPE_PAKN_HO_SO_DANG_XU_LY_CREATE:
            return {};
        case type.TYPE_PAKN_HO_SO_DANG_XU_LY_UPDATE:
            return {};
        case type.TYPE_RESET_STORE:
            return {};
        default:
            return state;
    }
}