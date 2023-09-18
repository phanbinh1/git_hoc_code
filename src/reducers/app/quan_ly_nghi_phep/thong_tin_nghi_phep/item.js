import * as type from './../../../../constants/type';

export default (state = {}, action) => {
    var { value } = action;
    switch (action.type) {
        case type.TYPE_QUAN_LY_NGHI_PHEP_EDIT:
            return { ...value };
        case type.TYPE_QUAN_LY_NGHI_PHEP_CREATE:
            return {};
        case type.TYPE_QUAN_LY_NGHI_PHEP_UPDATE:
            return {};
        case type.TYPE_RESET_STORE:
            return {};
        default:
            return state;
    }
}