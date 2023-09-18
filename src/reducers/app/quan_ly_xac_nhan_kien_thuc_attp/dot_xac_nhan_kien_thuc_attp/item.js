import * as type from './../../../../constants/type';

export default (state = {}, action) => {
    var { value } = action;
    switch (action.type) {
        case type.TYPE_XNKT_ATTP_DOT_XAC_NHAN_EDIT:
            return { ...value };
        case type.TYPE_XNKT_ATTP_DOT_XAC_NHAN_CREATE:
            return value;
        case type.TYPE_XNKT_ATTP_DOT_XAC_NHAN_UPDATE:
            return value;
        case type.TYPE_RESET_STORE:
            return {};
        default:
            return state;
    }
}