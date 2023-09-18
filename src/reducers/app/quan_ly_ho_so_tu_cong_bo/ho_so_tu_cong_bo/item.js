import * as type from './../../../../constants/type';

export default (state = {}, action) => {
    var { value } = action;
    switch (action.type) {
        case type.TYPE_HO_SO_TU_CONG_BO_EDIT:
            return { ...value };
        case type.TYPE_HO_SO_TU_CONG_BO_CREATE:
            return {};
        case type.TYPE_HO_SO_TU_CONG_BO_UPDATE:
            return value;
        case type.TYPE_RESET_STORE:
            return {};
        default:
            return state;
    }
}