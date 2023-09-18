import * as type from './../../../../constants/type';

export default (state = { listHoSoCapGiayChungNhan:[], soLieuTongHopCongTac:[] }, action) => {
    const { value } = action;
    const listHoSoCapGiayChungNhan = value && Array.isArray(value.listHoSoCapGiayChungNhan) ? value.listHoSoCapGiayChungNhan : [];
    const soLieuTongHopCongTac = value && Array.isArray(value.soLieuTongHopCongTac) ? value.soLieuTongHopCongTac : [];
    switch (action.type) {
        case type.TYPE_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_REPORT_LIST:
            return { listHoSoCapGiayChungNhan, soLieuTongHopCongTac };
        default:
            return state;
    }
}