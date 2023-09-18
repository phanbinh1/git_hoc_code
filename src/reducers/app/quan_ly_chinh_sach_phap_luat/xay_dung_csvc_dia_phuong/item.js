import * as type from './../../../../constants/type';

export default (state = {}, action) => {
    var { value } = action;
    switch (action.type) {
        case type.TYPE_XAY_DUNG_CSVC_ATTP_EDIT:
            return { ...value };
        case type.TYPE_XAY_DUNG_CSVC_ATTP_CREATE:
            return {};
        case type.TYPE_XAY_DUNG_CSVC_ATTP_UPDATE:
            return {};
        case type.TYPE_RESET_STORE:
            return {};
        default:
            return state;
    }
}