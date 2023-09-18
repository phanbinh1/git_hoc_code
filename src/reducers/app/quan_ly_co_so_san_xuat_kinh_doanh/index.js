import { combineReducers } from "redux";

import co_so_san_xuat_kinh_doanh from "./co_so_san_xuat_kinh_doanh";
import ho_so_tiep_nhan_mot_cua from "./ho_so_tiep_nhan_mot_cua";
import thong_ke_bao_cao from "./thong_ke_bao_cao";
import quan_huyen from "./quan_huyen";

export default combineReducers({
    co_so_san_xuat_kinh_doanh,
    ho_so_tiep_nhan_mot_cua,
    thong_ke_bao_cao,
    quan_huyen,
});