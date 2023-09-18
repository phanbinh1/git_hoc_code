import * as type from './../../../../../constants/type';

export default (state = {}, action) => {
    var { value } = action;
    switch (action.type) {
        case type.TYPE_MAU_THUC_PHAM_NN_EDIT:
            return { ...value };
        case type.TYPE_MAU_THUC_PHAM_NN_CREATE:
            return {};
        case type.TYPE_MAU_THUC_PHAM_NN_UPDATE:
            return {};
        case type.TYPE_RESET_STORE:
            return {};
        default:
            return state;
    }
}