import * as type from './../../../../constants/type';

export default (state = {}, action) => {
    var { value } = action;
    switch (action.type) {
        case type.TYPE_PAKN_BIEN_BAN_XU_PHAT_EDIT:
            return { ...value };
        case type.TYPE_PAKN_BIEN_BAN_XU_PHAT_CREATE:
            return {};
        case type.TYPE_PAKN_BIEN_BAN_XU_PHAT_UPDATE:
            return {};
        case type.TYPE_RESET_STORE:
            return {};
        default:
            return state;
    }
}