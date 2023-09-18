import * as type from './../../../../constants/type';

export default (state = {}, action) => {
    var { value } = action;
    switch (action.type) {
        case type.TYPE_QUAN_LY_CONG_TAC_EDIT:
            return { ...value };
        case type.TYPE_QUAN_LY_CONG_TAC_CREATE:
            return {};
        case type.TYPE_QUAN_LY_CONG_TAC_UPDATE:
            return {};
        case type.TYPE_RESET_STORE:
            return {};
        default:
            return state;
    }
}