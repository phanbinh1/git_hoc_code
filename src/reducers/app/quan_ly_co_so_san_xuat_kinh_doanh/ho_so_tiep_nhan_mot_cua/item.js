import * as type from './../../../../constants/type';

export default (state = {}, action) => {
    var { value } = action;
    switch (action.type) {
        case type.TYPE_CO_SO_SAN_XUAT_KINH_DOANH_EDIT:
            return { ...value };
        case type.TYPE_CO_SO_SAN_XUAT_KINH_DOANH_CAP_NHAT_DS_TINH_THANH:
            return { ...state, dsTinhThanh: value }
        case type.TYPE_CO_SO_SAN_XUAT_KINH_DOANH_CAP_NHAT_DS_QUAN_HUYEN:
            return { ...state, dsQuanHuyen: value }
        case type.TYPE_CO_SO_SAN_XUAT_KINH_DOANH_CAP_NHAT_DS_XA_PHUONG:
            return { ...state, dsXaPhuong: value }
        default:
            return state;
    }
}