import * as type from './../../../../constants/type';

export default (state = {}, action) => {
    var { value } = action;
    switch (action.type) {
        case type.TYPE_VAN_BAN_PHAP_LUAT_EDIT:
            return { ...value };
        case type.TYPE_VAN_BAN_PHAP_LUAT_CREATE:
            return {};
        case type.TYPE_VAN_BAN_PHAP_LUAT_UPDATE:
            return {};
        case type.TYPE_RESET_STORE:
            return {};
        default:
            return state;
    }
}