import * as type from './../../../../constants/type';

export default (state = {}, action) => {
    var { value } = action;
    switch (action.type) {
        case type.TYPE_GOS_NHIEM_TPNN_EDIT:
            return { ...value };
        case type.TYPE_GOS_NHIEM_TPNN_CREATE:
            return {};
        case type.TYPE_GOS_NHIEM_TPNN_UPDATE:
            return {};
        case type.TYPE_RESET_STORE:
            return {};
        default:
            return state;
    }
}