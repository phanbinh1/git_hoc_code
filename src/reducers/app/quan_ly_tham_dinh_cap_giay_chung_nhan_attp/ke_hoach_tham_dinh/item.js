import * as type from './../../../../constants/type';

export default (state = {}, action) => {
    var { value } = action;
    switch (action.type) {
        case type.TYPE_KE_HOACH_THAM_DINH_HO_SO_ATTP_EDIT:
            return { ...value };
        case type.TYPE_KE_HOACH_THAM_DINH_HO_SO_ATTP_HO_SO_LIST:
            return { ...state, ho_so_tham_dinh_list: value };
        case type.TYPE_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_UPDATE:
            return {
                ...state,
                ho_so_tham_dinh_list: (state.ho_so_tham_dinh_list || []).map(item => {
                    if (item.id === value.id) {
                        return value;
                    }
                    else {
                        return item;
                    }
                })
            };
        case type.TYPE_KE_HOACH_THAM_DINH_HO_SO_ATTP_UPDATE:
            return {
                ...state,
                ...value
            }
        case "UPDATE_BIENBAN_HOSOTHAMDINH":
            const { bienBan, hoSoCapGiayChungNhan } = action.payload;
            return {
                ...state,
                ho_so_tham_dinh_list: (state.ho_so_tham_dinh_list || []).map(hoSo => {
                    if (hoSoCapGiayChungNhan.id === hoSo.id) {
                        if (bienBan) {
                            const _bienBans = (hoSo.bienBans || []);
                            const __bienBans = _bienBans.findIndex(bb => bb.id === bienBan.id) === -1 ? [..._bienBans, bienBan] : _bienBans.map(bb => bb.id === bienBan.id ? bienBan : bb);
                            return {
                                ...hoSoCapGiayChungNhan,
                                bienBans: __bienBans
                            }
                        }
                        else {
                            return {
                                ...hoSo,
                                ...hoSoCapGiayChungNhan,
                            }
                        }
                    }
                    return hoSo;
                })
            }
        default:
            return state;
    }
}