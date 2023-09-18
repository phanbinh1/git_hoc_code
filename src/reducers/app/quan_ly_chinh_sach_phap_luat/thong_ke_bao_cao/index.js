import { combineReducers } from "redux";

import thong_ke_danh_muc_truyen_thong from "./thong_ke_danh_muc_truyen_thong";
import thong_ke_gos_nhiem_tpnn from "./thong_ke_gos_nhiem_tpnn";
import thong_ke_gos_nhiem_tpyte from "./thong_ke_gos_nhiem_tpyte";
import thong_ke_ket_qua_kiem_nghiem_tp from "./thong_ke_ket_qua_kiem_nghiem_tp";
import thong_ke_ket_qua_thanh_kiem_tra_attp from "./thong_ke_ket_qua_thanh_kiem_tra_attp";
import thong_ke_ket_qua_thuc_hien_tthc from "./thong_ke_ket_qua_thuc_hien_tthc";
import thong_ke_mau_kiem_nghiem from "./thong_ke_mau_kiem_nghiem";
import thong_ke_mau_thuc_pham_nn from "./thong_ke_mau_thuc_pham_nn";
import thong_ke_quan_ly_attp_dia_phuong from "./thong_ke_quan_ly_attp_dia_phuong";
import thong_ke_quan_ly_cho_sieu_thi from "./thong_ke_quan_ly_cho_sieu_thi";
import thong_ke_su_dung_kinh_phi_dia_phuong from "./thong_ke_su_dung_kinh_phi_dia_phuong";
import thong_ke_su_dung_kinh_phi_trung_uong from "./thong_ke_su_dung_kinh_phi_trung_uong";
import thong_ke_tinh_hinh_vsattp from "./thong_ke_tinh_hinh_vsattp";
import thong_ke_xay_dung_csvc_dia_phuong from "./thong_ke_xay_dung_csvc_dia_phuong";

export default combineReducers({
    thong_ke_danh_muc_truyen_thong,
    thong_ke_gos_nhiem_tpnn,
    thong_ke_gos_nhiem_tpyte,
    thong_ke_ket_qua_kiem_nghiem_tp,
    thong_ke_ket_qua_thanh_kiem_tra_attp,
    thong_ke_ket_qua_thuc_hien_tthc,
    thong_ke_mau_kiem_nghiem,
    thong_ke_mau_thuc_pham_nn,
    thong_ke_quan_ly_attp_dia_phuong,
    thong_ke_quan_ly_cho_sieu_thi,
    thong_ke_su_dung_kinh_phi_dia_phuong,
    thong_ke_su_dung_kinh_phi_trung_uong,
    thong_ke_tinh_hinh_vsattp,
    thong_ke_xay_dung_csvc_dia_phuong

});