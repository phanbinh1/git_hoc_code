import * as type from './../../../../constants/type';

export default (state = {}, action) => {
    var { value } = action;
    switch (action.type) {
        case type.TYPE_XU_LY_NGO_DOC_THUC_PHAM_EDIT:
            return { ...value };
        case type.TYPE_XU_LY_NGO_DOC_THUC_PHAM_CREATE:
            return {};
        case type.TYPE_XU_LY_NGO_DOC_THUC_PHAM_UPDATE:
            return {};
        case type.TYPE_RESET_STORE:
            return {};
        default:
            return state;
    }
}