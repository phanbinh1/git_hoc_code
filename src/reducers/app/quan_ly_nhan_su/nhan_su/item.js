import * as type from './../../../../constants/type';

export default (state = {}, action) => {
    var { value } = action;
    switch (action.type) {
        case type.TYPE_NHAN_SU_EDIT:
            return { ...value };
        case type.TYPE_NHAN_SU_DETAIL:
            return { ...state, danhsach: value };
        case type.TYPE_NHAN_SU_DS_TINH_THANH:
            return { ...state, dsTinhThanh: value }
        case type.TYPE_NHAN_SU_DS_QUAN_HUYEN:
            return { ...state, dsQuanHuyen: value }
        case type.TYPE_NHAN_SU_DS_XA_PHUONG:
            return { ...state, dsXaPhuong: value }
        default:
            return state;
    }
}