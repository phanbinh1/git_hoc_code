import * as type from './../../../../constants/type';

export default (state = { listHoSoChuoi:[], soLieuTongHopCongTac:[] }, action) => {
    const { value } = action;
    const listHoSoChuoi = value && Array.isArray(value.listHoSoChuoi) ? value.listHoSoChuoi : [];
    const soLieuTongHopCongTac = value && Array.isArray(value.soLieuTongHopCongTac) ? value.soLieuTongHopCongTac : [];
    switch (action.type) {
        case type.TYPE_CHUOI_THUCPHAM_ANTOAN_REPORT_LIST:
            return { listHoSoChuoi, soLieuTongHopCongTac };
        default:
            return state;
    }
}