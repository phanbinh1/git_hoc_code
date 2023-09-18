import { combineReducers } from "redux";
import dot_xac_nhan_kien_thuc_attp from "./dot_xac_nhan_kien_thuc_attp";
import ho_so_xac_nhan_kien_thuc_attp from "./ho_so_xac_nhan_kien_thuc_attp";
import thong_ke_bao_cao from "./thong_ke_bao_cao";

export default combineReducers({
    dot_xac_nhan_kien_thuc_attp,
    ho_so_xac_nhan_kien_thuc_attp,
    thong_ke_bao_cao,
});