import * as type from './../../../../constants/type';

export default (state = {}, action) => {
    var { value } = action;
    switch (action.type) {
        case type.TYPE_KET_QUA_THANH_KIEM_TRA_ATTP_EDIT:
            return { ...value };
        case type.TYPE_KET_QUA_THANH_KIEM_TRA_ATTP_CREATE:
            return {};
        case type.TYPE_KET_QUA_THANH_KIEM_TRA_ATTP_UPDATE:
            return {};
        case type.TYPE_RESET_STORE:
            return {};
        default:
            return state;
    }
}