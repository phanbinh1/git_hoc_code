import * as type from './../../../../constants/type';

export default (state = {}, action) => {
    var { value } = action;
    switch (action.type) {
        case type.TYPE_QUAN_LY_DOAN_RA_EDIT:
            return { ...value };
        case type.TYPE_QUAN_LY_DOAN_RA_CREATE:
            return {};
        case type.TYPE_QUAN_LY_DOAN_RA_UPDATE:
            return {};
        case type.TYPE_RESET_STORE:
            return {};
        default:
            return state;
    }
}