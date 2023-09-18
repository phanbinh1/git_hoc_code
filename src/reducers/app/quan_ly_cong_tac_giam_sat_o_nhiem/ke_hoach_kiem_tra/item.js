import * as type from './../../../../constants/type';

export default (state = {}, action) => {
    var { value } = action;
    switch (action.type) {
        case type.TYPE_QLONATTP_KE_HOACH_THANH_TRA_EDIT:
            return { ...value };
        case type.TYPE_QLONATTP_KE_HOACH_THANH_TRA_CREATE:
            return {};
        case type.TYPE_QLONATTP_KE_HOACH_THANH_TRA_UPDATE:
            return {};
        case type.TYPE_RESET_STORE:
            return {};
        default:
            return state;
    }
}