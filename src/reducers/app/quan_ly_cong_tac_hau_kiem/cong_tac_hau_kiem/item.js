import * as type from './../../../../constants/type';

export default (state = {}, action) => {
    var { value } = action;
    switch (action.type) {
        case type.TYPE_CONG_TAC_HAU_KIEM_EDIT:
            return { ...value };
        case type.TYPE_KE_HOACH_HAU_KIEM_HO_SO_TU_CONG_BO_LIST:
            return { ...state, ho_so_hau_kiem_list: value };
        default:
            return state;
    }
}