import * as type from './../../../../constants/type';

export default (state = {}, action) => {
    var { value } = action;
    let coSoKinhDoanhs = state.coSoKinhDoanhs;
    let index = -1, danhSachXepHang = state.danhSachXepHang ? state.danhSachXepHang : [];
    switch (action.type) {
        case type.TYPE_QLONATTP_THANH_LAP_DOAN_KIEM_TRA_EDIT:
            return { ...value };
        case type.TYPE_QLONATTP_THANH_LAP_DOAN_KIEM_TRA_CREATE:
            return {};
        case type.TYPE_QLONATTP_THANH_LAP_DOAN_KIEM_TRA_UPDATE:
            return {};
        case type.TYPE_RESET_STORE:
            return {};
        default:
            return state;
    }
}