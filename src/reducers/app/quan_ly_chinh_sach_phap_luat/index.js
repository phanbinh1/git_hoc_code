import { combineReducers } from "redux";

import dau_tu_qlattp_diaphuong from "./dau_tu_qlattp_dia_phuong";
import ket_qua_thanh_kiem_tra_attp from "./ket_qua_thanh_kiem_tra_attp";
import ket_qua_kiem_nghiem_tp from "./ket_qua_kiem_nghiem_tp";
import gos_nhiem_tpnn from "./gos_nhiem_tpnn";
import gos_nhiem_tpyt from "./gos_nhiem_tpyt";
import ket_qua_thuc_hien_tthc from "./ket_qua_thuc_hien_tthc";
import quan_ly_cho_sieu_thi from "./quan_ly_cho_sieu_thi";
import su_dung_kinh_phi_dia_phuong from "./su_dung_kinh_phi_dia_phuong";
import su_dung_kinh_phi_trung_uong from "./su_dung_kinh_phi_trung_uong";
import tong_hop_tinh_hinh_vpattp from "./tong_hop_tinh_hinh_vpattp";
import xay_dung_csvc_dia_phuong from "./xay_dung_csvc_dia_phuong";
import danh_muc from "./danh_muc";
import thong_ke_bao_cao from "./thong_ke_bao_cao";

export default combineReducers({
    dau_tu_qlattp_diaphuong,
    ket_qua_thanh_kiem_tra_attp,
    ket_qua_kiem_nghiem_tp,
    gos_nhiem_tpnn,
    gos_nhiem_tpyt,
    ket_qua_thuc_hien_tthc,
    quan_ly_cho_sieu_thi,
    su_dung_kinh_phi_dia_phuong,
    su_dung_kinh_phi_trung_uong,
    tong_hop_tinh_hinh_vpattp,
    xay_dung_csvc_dia_phuong,
    danh_muc,
    thong_ke_bao_cao

});