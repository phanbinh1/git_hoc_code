import * as type from './../../../../constants/type';

export default (state = {}, action) => {
    var { value } = action;
    switch (action.type) {
        case type.TYPE_KE_HOACH_GIAM_SAT_EDIT:
            return { ...value };
        case type.TYPE_KE_HOACH_GIAM_SAT_CREATE:
            return {};
        case type.TYPE_KE_HOACH_GIAM_SAT_UPDATE:
            return {};
        case type.TYPE_RESET_STORE:
            return {};
        default:
            return state;
    }
}