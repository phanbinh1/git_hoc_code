import { combineReducers } from "redux";

import nhan_su from "./nhan_su";
import danh_muc from "./danh_muc";
import quan_ly_nghi_phep from "./quan_ly_nghi_phep";
import quan_ly_nghi_phep_user from "./quan_ly_nghi_phep_user";
import quan_ly_tai_san_cong from "./quan_ly_tai_san_cong";
import quan_ly_thi_dua from "./quan_ly_thi_dua";
import quan_ly_dao_tao_tap_huan from "./quan_ly_dao_tao_tap_huan";

export default combineReducers({
    nhan_su,
    danh_muc,
    quan_ly_nghi_phep,
    quan_ly_nghi_phep_user,
    quan_ly_tai_san_cong,
    quan_ly_thi_dua,
    quan_ly_dao_tao_tap_huan
});