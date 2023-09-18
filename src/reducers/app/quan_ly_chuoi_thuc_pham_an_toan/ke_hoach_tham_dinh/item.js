import * as type from './../../../../constants/type';

export default (state = {}, action) => {
    var { value } = action;
    switch (action.type) {
        case type.TYPE_KE_HOACH_THAM_DINH_HS_CTP_EDIT:
            return { ...value };
        case type.TYPE_KE_HOACH_THAM_DINH_HS_CTP_HO_SO_LIST:
            return { ...state, ho_so_tham_dinh_list: value };
        default:
            return state;
    }
}