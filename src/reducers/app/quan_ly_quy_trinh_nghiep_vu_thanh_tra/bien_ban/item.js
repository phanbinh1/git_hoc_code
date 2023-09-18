import * as type from './../../../../constants/type';

export default (state = {}, action) => {
    var { value } = action;
    switch (action.type) {
        case type.TYPE_QTNVTT_BIEN_BAN_EDIT:
            return { ...value };
        case type.TYPE_QTNVTT_BIEN_BAN_CREATE:
            return {};
        case type.TYPE_QTNVTT_BIEN_BAN_UPDATE:
            return {};
        case type.TYPE_RESET_STORE:
            return {};
        default:
            return state;
    }
}