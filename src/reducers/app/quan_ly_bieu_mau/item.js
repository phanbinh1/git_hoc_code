import * as type from './../../../constants/type';

export default (state = {}, action) => {
    var { value } = action;
    switch (action.type) {
        case type.TYPE_QUAN_LY_BIEU_MAU_EDIT:
            return { ...value };
        case type.TYPE_QUAN_LY_BIEU_MAU_CREATE:
            return {};
        case type.TYPE_QUAN_LY_BIEU_MAU_UPDATE:
            return {};
        case type.TYPE_RESET_STORE:
            return {};
        default:
            return state;
    }
}