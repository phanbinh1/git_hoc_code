import * as type from './../../../../../constants/type';

export default (state = [], action) => {
    var { values } = action;
    switch (action.type) {
        case type.TYPE_THONG_KE_MAU_KIEM_NGHIEM_LIST:
            return [...values];
        case type.TYPE_RESET_STORE:
            return [];
        default:
            return state;
    }
}