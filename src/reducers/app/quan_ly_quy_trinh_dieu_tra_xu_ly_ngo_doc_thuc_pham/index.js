import { combineReducers } from "redux";
import ho_so_ngo_doc_thuc_pham from "./ho_so_ngo_doc_thuc_pham"
import dieu_tra_ngo_doc_thuc_pham from "./dieu_tra_ngo_doc_thuc_pham"
import xu_ly_ngo_doc_thuc_pham from "./xu_ly_ngo_doc_thuc_pham"
import thong_ke_bao_cao from "./thong_ke_bao_cao"
import thong_ke_bao_cao_chi_tiet from "./thong_ke_bao_cao_chi_tiet"

export default combineReducers({
    ho_so_ngo_doc_thuc_pham,
    dieu_tra_ngo_doc_thuc_pham,
    xu_ly_ngo_doc_thuc_pham,
    thong_ke_bao_cao,
    thong_ke_bao_cao_chi_tiet,
});