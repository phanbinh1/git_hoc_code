import { combineReducers } from "redux";
import danh_muc from "./danh_muc";
import quan_ly_chuoi_thuc_pham_an_toan from "./quan_ly_chuoi_thuc_pham_an_toan";
import quan_ly_co_so_san_xuat_kinh_doanh from "./quan_ly_co_so_san_xuat_kinh_doanh";
import quan_ly_van_ban_phap_luat from "./quan_ly_van_ban_phap_luat";
import quan_ly_nhan_su from "./quan_ly_nhan_su";
import quan_ly_quy_trinh_nghiep_vu_thanh_tra from "./quan_ly_quy_trinh_nghiep_vu_thanh_tra";
import quan_ly_quy_trinh_dieu_tra_xu_ly_ngo_doc_thuc_pham from "./quan_ly_quy_trinh_dieu_tra_xu_ly_ngo_doc_thuc_pham";
import quan_ly_ho_so_tu_cong_bo from "./quan_ly_ho_so_tu_cong_bo";
import quan_ly_cong_tac_giam_sat_o_nhiem from "./quan_ly_cong_tac_giam_sat_o_nhiem";
import quan_ly_tiep_nhan_xu_ly_phan_anh_kien_nghi from "./quan_ly_tiep_nhan_xu_ly_phan_anh_kien_nghi";
import quan_ly_tham_dinh_cap_giay_chung_nhan_attp from "./quan_ly_tham_dinh_cap_giay_chung_nhan_attp";
import quan_ly_cong_tac_hau_kiem from "./quan_ly_cong_tac_hau_kiem";
import quan_ly_xac_nhan_quang_cao from "./quan_ly_xac_nhan_quang_cao";
import quan_ly_xac_nhan_kien_thuc_attp from "./quan_ly_xac_nhan_kien_thuc_attp";
import bao_cao_tong_hop from "./bao_cao_tong_hop";
import quan_ly_bieu_mau from "./quan_ly_bieu_mau";
import quan_ly_tai_san from "./quan_ly_tai_san";
import quan_ly_nghi_phep from "./quan_ly_nghi_phep";
import quan_ly_doi_ngoai from "./quan_ly_doi_ngoai";
import quan_ly_ke_hoach_tai_chinh from "./quan_ly_ke_hoach_tai_chinh"
import quan_ly_chinh_sach_phap_luat from "./quan_ly_chinh_sach_phap_luat"
import quan_ly_giam_sat_attp from "./quan_ly_giam_sat_attp"
import quan_ly_thong_tin_tieu_thuong_kdtp from "./quan_ly_thong_tin_tieu_thuong_kdtp"
import quan_ly_danh_muc_danh_gia_hang_sao from "./quan_ly_danh_muc_chi_tieu_danh_gia_sao"
import quan_ly_xep_hang_sao_co_so from "./quan_ly_danh_gia_co_so_duoc_xep_hang_sao/index"

export default combineReducers({
    danh_muc,
    quan_ly_chuoi_thuc_pham_an_toan,
    quan_ly_co_so_san_xuat_kinh_doanh,
    quan_ly_van_ban_phap_luat,
    quan_ly_nhan_su,
    quan_ly_quy_trinh_nghiep_vu_thanh_tra,
    quan_ly_quy_trinh_dieu_tra_xu_ly_ngo_doc_thuc_pham,
    quan_ly_ho_so_tu_cong_bo,
    quan_ly_cong_tac_giam_sat_o_nhiem,
    quan_ly_tiep_nhan_xu_ly_phan_anh_kien_nghi,
    quan_ly_tham_dinh_cap_giay_chung_nhan_attp,
    quan_ly_cong_tac_hau_kiem,
    quan_ly_xac_nhan_quang_cao,
    quan_ly_xac_nhan_kien_thuc_attp,
    bao_cao_tong_hop,
    quan_ly_bieu_mau,
    quan_ly_tai_san,
    quan_ly_nghi_phep,
    quan_ly_doi_ngoai,
    quan_ly_ke_hoach_tai_chinh,
    quan_ly_chinh_sach_phap_luat,
    quan_ly_giam_sat_attp,
    quan_ly_thong_tin_tieu_thuong_kdtp,
    quan_ly_danh_muc_danh_gia_hang_sao,
    quan_ly_xep_hang_sao_co_so
});