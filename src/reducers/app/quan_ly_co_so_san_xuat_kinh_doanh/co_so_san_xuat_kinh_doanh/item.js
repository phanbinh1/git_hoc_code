import * as type from './../../../../constants/type';

export default (state = {}, action) => {
    var { value, hoSoMotCuaId } = action;
    switch (action.type) {
        case type.TYPE_CO_SO_SAN_XUAT_KINH_DOANH_EDIT:
            return { ...value };
        case type.TYPE_HO_SO_TIEP_NHAN_MOT_CUA_CREATE:
            return { ...state, hoSoMotCuaId };
        case type.TYPE_CO_SO_SAN_XUAT_KINH_DOANH_CAP_NHAT_DS_TINH_THANH:
            return { ...state, _dsTinhThanh: value }
        case type.TYPE_CO_SO_SAN_XUAT_KINH_DOANH_CAP_NHAT_DS_QUAN_HUYEN:
            return { ...state, _dsQuanHuyen: value }
        case type.TYPE_CO_SO_SAN_XUAT_KINH_DOANH_CAP_NHAT_DS_XA_PHUONG:
            return { ...state, _dsXaPhuong: value }
        default:
            return state;
    }
}