import * as type from './../../../constants/type';

export default (state = {}, action) => {
    const { value } = action;
    switch (action.type) {
        case type.TYPE_BAO_CAO_TONG_HOP_EDIT:
            return { ...value };
        case type.TYPE_BAO_CAO_TONG_HOP_CREATE:
            return {};
        case type.TYPE_BAO_CAO_TONG_HOP_UPDATE:
            return {};
        case type.TYPE_RESET_STORE:
            return {};
        default:
            return state;
    }
}