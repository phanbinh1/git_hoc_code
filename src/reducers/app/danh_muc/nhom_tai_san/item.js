import * as type from './../../../../constants/type';

export default (state = {}, action) => {
    var { value } = action;
    switch (action.type) {
        case type.TYPE_NHOM_TAI_SAN_EDIT:
            return { ...value };
        case type.TYPE_NHOM_TAI_SAN_CREATE:
            return {};
        case type.TYPE_NHOM_TAI_SAN_UPDATE:
            return {};
        case type.TYPE_RESET_STORE:
            return {};
        default:
            return state;
    }
}