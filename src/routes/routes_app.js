import React, { useCallback, lazy } from "react";
import * as url from "./../constants/url";
import * as main from "./../constants/main";
import * as constants from "./../constants/constants";
import Permission from "../reducers/core/permission";

const QRCode = lazy(() => import("./../pages/app/qr_code/qrcode"));
const LinhVuc = lazy(() => import("./../pages/app/danh_muc/linh_vuc/linh_vuc"));
const QuanLyPhongBan = lazy(() =>
  import("./../pages/app/danh_muc/quan_ly_phong_ban/quan_ly_phong_ban")
);
const QuanLyQuocGia = lazy(() =>
  import("./../pages/app/danh_muc/quan_ly_quoc_gia/quan_ly_quoc_gia")
);
const LoaiHinhCoSo = lazy(() =>
  import("./../pages/app/danh_muc/loai_hinh_co_so/loai_hinh_co_so")
);
const DiaBan = lazy(() => import("./../pages/app/danh_muc/dia_ban/dia_ban"));
const LoaiTaiChinh = lazy(() =>
  import("./../pages/app/danh_muc/loai_tai_chinh/loai_tai_chinh")
);
const NguonKinhPhi = lazy(() =>
  import("./../pages/app/danh_muc/nguon_kinh_phi/nguon_kinh_phi")
);
const DoanThamDinh = lazy(() =>
  import("./../pages/app/danh_muc/doan_tham_dinh")
);

// const DanhMucCho = lazy(() =>
//   import(
//     "./../pages/app/quan_ly_thong_tin_tieu_thuong_kdtp/danh_muc_cho/danh_muc_cho"
//   )
// );
// const DanhMucChoDetail = lazy(() =>
//   import(
//     "./../components/app/quan_ly_thong_tin_tieu_thuong_kdtp/danh_muc_cho/danh_muc_cho_detail"
//   )
// );
// const NhomNganhHang = lazy(() =>
//   import(
//     "./../pages/app/quan_ly_thong_tin_tieu_thuong_kdtp/nhom_nganh_hang/nhom_nganh_hang"
//   )
// );
// const HoTieuThuong = lazy(() =>
//   import(
//     "./../pages/app/quan_ly_thong_tin_tieu_thuong_kdtp/ho_tieu_thuong/ho_tieu_thuong"
//   )
// );
// const BaoCaoDSHoTieuThuong = lazy(() =>
//   import(
//     "./../pages/app/quan_ly_thong_tin_tieu_thuong_kdtp/bao_cao_ds_ho_tieu_thuong/bao_cao_ds_ho_tieu_thuong"
//   )
// );
const DanhMucTieuChi = lazy(() =>
  import(
    "./../pages/app/quan_ly_danh_muc_tieu_chi_danh_gia_sao/danh_muc_tieu_chi/danh_muc_tieu_chi"
  )
);

const CoSoSanXuatKinhDoanhCauHinh = lazy(() =>
  import("./../components/app/quan_ly_co_so_san_xuat_kinh_doanh/cau_hinh")
);
const CoSoSanXuatKinhDoanh = lazy(() =>
  import(
    "./../pages/app/quan_ly_co_so_san_xuat_kinh_doanh/co_so_san_xuat_kinh_doanh/co_so_san_xuat_kinh_doanh"
  )
);
const CoSoSanXuatKinhDoanhQuanQuanLy = lazy(() =>
  import("./../pages/app/quan_ly_co_so_san_xuat_kinh_doanh/quan_huyen")
);
const CoSoSanXuatKinhDoanhThongKeBaoCao = lazy(() =>
  import(
    "./../pages/app/quan_ly_co_so_san_xuat_kinh_doanh/thong_ke_bao_cao/thong_ke_bao_cao"
  )
);
const HoSoTiepNhanMotCua = lazy(() =>
  import(
    "./../pages/app/quan_ly_co_so_san_xuat_kinh_doanh/ho_so_tiep_nhan_mot_cua/ho_so_tiep_nhan_mot_cua"
  )
);

// const VanBanPhapLuat = lazy(() =>
//   import(
//     "./../pages/app/quan_ly_van_ban_phap_luat/van_ban_phap_luat/van_ban_phap_luat"
//   )
// );
// const VanBanPhapLuatLinhVuc = lazy(() =>
//   import("./../pages/app/quan_ly_van_ban_phap_luat/danh_muc/linh_vuc/linh_vuc")
// );

// const NhanSu = lazy(() =>
//   import("./../pages/app/quan_ly_nhan_su/nhan_su/nhan_su")
// );
// const PhongBan = lazy(() =>
//   import("../pages/app/quan_ly_nhan_su/danh_muc/phong_ban")
// );
// const DanhHieuThiDua = lazy(() =>
//   import("../pages/app/quan_ly_nhan_su/danh_muc/danh_hieu_thi_dua")
// );
// const ThongTinKhenThuong = lazy(() =>
//   import("../pages/app/quan_ly_nhan_su/quan_ly_thi_dua/thong_tin_khen_thuong")
// );
// const ThongTinDaoTaoTapHuan = lazy(() =>
//   import(
//     "../pages/app/quan_ly_nhan_su/quan_ly_dao_tao_tap_huan/thongtin_daotao_taphuan"
//   )
// );
// const ThongTinNghiPhep = lazy(() =>
//   import("../pages/app/quan_ly_nhan_su/quan_ly_nghi_phep/nghiphep")
// );
// const ThongTinNghiPhepUser = lazy(() =>
//   import("../pages/app/quan_ly_nhan_su/quan_ly_nghi_phep/nghiphep_user")
// );
// const ThongTinTaiSanCong = lazy(() =>
//   import("../pages/app/quan_ly_nhan_su/quan_ly_tai_san_cong/taisancong")
// );

// const NghiepVuThanhTraCauHinh = lazy(() =>
//   import("./../components/app/quan_ly_quy_trinh_nghiep_vu_thanh_tra/cau_hinh")
// );
// const KeHoachThanhTra = lazy(() =>
//   import(
//     "./../pages/app/quan_ly_quy_trinh_nghiep_vu_thanh_tra/ke_hoach_thanh_tra/ke_hoach_thanh_tra"
//   )
// );
// const KeHoachThanhTraDetail = lazy(() =>
//   import(
//     "./../pages/app/quan_ly_quy_trinh_nghiep_vu_thanh_tra/ke_hoach_thanh_tra/chi_tiet"
//   )
// );
// const CuocThanhTra = lazy(() =>
//   import(
//     "./../pages/app/quan_ly_quy_trinh_nghiep_vu_thanh_tra/cuoc_thanh_tra/cuoc_thanh_tra"
//   )
// );
// const CuocThanhTraDetail = lazy(() =>
//   import(
//     "./../pages/app/quan_ly_quy_trinh_nghiep_vu_thanh_tra/cuoc_thanh_tra/chi_tiet"
//   )
// );
// const DotThanhTra = lazy(() =>
//   import(
//     "./../pages/app/quan_ly_quy_trinh_nghiep_vu_thanh_tra/dot_thanh_tra/dot_thanh_tra"
//   )
// );
// const DotThanhTraDetail = lazy(() =>
//   import(
//     "./../pages/app/quan_ly_quy_trinh_nghiep_vu_thanh_tra/dot_thanh_tra/chi_tiet"
//   )
// );
// const QTNVTTThongKeBaoCao = lazy(() =>
//   import(
//     "./../pages/app/quan_ly_quy_trinh_nghiep_vu_thanh_tra/thong_ke_bao_cao/thong_ke_bao_cao"
//   )
// );
// const QTNVTTThongKeBaoCaoDanhSachCoSo = lazy(() =>
//   import(
//     "./../pages/app/quan_ly_quy_trinh_nghiep_vu_thanh_tra/thong_ke_bao_cao/danh_sach_co_so"
//   )
// );
// const QTNVTTThongKeBaoCaoThongTinPhanCong = lazy(() =>
//   import(
//     "./../pages/app/quan_ly_quy_trinh_nghiep_vu_thanh_tra/thong_ke_bao_cao/thong_tin_phan_cong"
//   )
// );

// const QTNVTTThongKeBaoCaoChiTietViPham = lazy(() =>
//   import(
//     "./../pages/app/quan_ly_quy_trinh_nghiep_vu_thanh_tra/thong_ke_bao_cao/chi_tiet_vi_pham"
//   )
// );

// const HoSoPhanAnhKienNghi = lazy(() =>
//   import(
//     "./../pages/app/quan_ly_tiep_nhan_xu_ly_phan_anh_kien_nghi/ho_so/ho_so"
//   )
// );
// const BienBanThanhTra = lazy(() =>
//   import(
//     "./../pages/app/quan_ly_tiep_nhan_xu_ly_phan_anh_kien_nghi/bien_ban_thanh_tra/bien_ban_thanh_tra"
//   )
// );
// const BienBanXuPhat = lazy(() =>
//   import(
//     "./../pages/app/quan_ly_tiep_nhan_xu_ly_phan_anh_kien_nghi/bien_ban_xu_phat/bien_ban_xu_phat"
//   )
// );

// const HoSoNgoDocThucPham = lazy(() =>
//   import(
//     "./../pages/app/quan_ly_quy_trinh_dieu_tra_xu_ly_ngo_doc_thuc_pham/ho_so_ngo_doc_thuc_pham/ho_so_ngo_doc_thuc_pham"
//   )
// );
// const QTDTCKNDTPThongKeBaoCao = lazy(() =>
//   import(
//     "./../pages/app/quan_ly_quy_trinh_dieu_tra_xu_ly_ngo_doc_thuc_pham/thong_ke_bao_cao/thong_ke_bao_cao"
//   )
// );
// const QTDTCKNDTPThongKeBaoCaoChiTiet = lazy(() =>
//   import(
//     "./../pages/app/quan_ly_quy_trinh_dieu_tra_xu_ly_ngo_doc_thuc_pham/thong_ke_bao_cao/thong_ke_bao_cao_chi_tiet"
//   )
// );

const QuanLyDmLoaiThucPham = lazy(() =>
  import(
    "./../pages/app/quan_ly_cong_tac_giam_sat_o_nhiem/danh_muc/loai_thuc_pham"
  )
);
const QuanLyDmChiTieu = lazy(() =>
  import("./../pages/app/quan_ly_cong_tac_giam_sat_o_nhiem/danh_muc/chi_tieu")
);
const DotKiemTra = lazy(() =>
  import(
    "./../pages/app/quan_ly_cong_tac_giam_sat_o_nhiem/dot_kiem_tra/dot_kiem_tra"
  )
);
const GSONTPThongKe = lazy(() =>
  import(
    "./../pages/app/quan_ly_cong_tac_giam_sat_o_nhiem/thong_ke_bao_cao/thong_ke_bao_cao"
  )
);
const ThanhLapDoanKiemTra = lazy(() =>
  import(
    "./../pages/app/quan_ly_cong_tac_giam_sat_o_nhiem/thanh_lap_doan_kiem_tra/thanh_lap_doan_kiem_tra"
  )
);
const ThanhLapDoanKiemTraDetail = lazy(() =>
  import(
    "./../pages/app/quan_ly_cong_tac_giam_sat_o_nhiem/thanh_lap_doan_kiem_tra/chi_tiet"
  )
);

// const HoSoCapGiayChungNhanReport = lazy(() =>
//   import(
//     "./../pages/app/quan_ly_tham_dinh_cap_giay_chung_nhan_attp/thong_ke_bao_cao/thong_ke_bao_cao"
//   )
// );
// const HoSoCapGiayChungNhanChiTiet = lazy(() =>
//   import(
//     "./../pages/app/quan_ly_tham_dinh_cap_giay_chung_nhan_attp/chi_tiet/ho_so_chi_tiet"
//   )
// );
// const HoSoCapGiayChungNhan = lazy(() =>
//   import(
//     "../pages/app/quan_ly_tham_dinh_cap_giay_chung_nhan_attp/ho_so_cap_giay_chung_nhan"
//   )
// );
// const HoSoCapGiayChungNhanDaXuLy = lazy(() =>
//   import(
//     "../pages/app/quan_ly_tham_dinh_cap_giay_chung_nhan_attp/ho_so_da_xu_ly"
//   )
// );
// const KeHoachThamDinh = lazy(() =>
//   import(
//     "../pages/app/quan_ly_tham_dinh_cap_giay_chung_nhan_attp/ke_hoach_tham_dinh"
//   )
// );
// const HoSoCapGiayChungNhanChiTietKeHoach = lazy(() =>
//   import(
//     "./../pages/app/quan_ly_tham_dinh_cap_giay_chung_nhan_attp/chi_tiet/chi_tiet_ke_hoach"
//   )
// );

const HoSoTuCongBo = lazy(() =>
  import("./../pages/app/quan_ly_ho_so_tu_cong_bo/ho_so_tu_cong_bo")
);
const ThongBaoCongBoSanPham = lazy(() =>
  import("./../pages/app/quan_ly_ho_so_tu_cong_bo/thong_bao_cong_bo_san_pham")
);
const ThongBaoCongBoSanPhamDetail = lazy(() =>
  import(
    "./../pages/app/quan_ly_ho_so_tu_cong_bo/thong_bao_cong_bo_san_pham_detail"
  )
);
const HoSoTuCongBoDetail = lazy(() =>
  import("./../pages/app/quan_ly_ho_so_tu_cong_bo/ho_so_tu_cong_bo_detail")
);
// const CongTacHauKiem = lazy(() =>
//   import("../pages/app/quan_ly_cong_tac_hau_kiem/cong_tac_hau_kiem")
// );
const TCBSPThongKeBaoCao = lazy(() =>
  import("../pages/app/quan_ly_ho_so_tu_cong_bo/thong_ke_bao_cao")
);
const DMNhom = lazy(() => import("./../pages/app/danh_muc/nhom/nhom"));
const DMPhanNhom = lazy(() =>
  import("./../pages/app/danh_muc/phan_nhom/phan_nhom")
);

// const XacNhanQuangCao = lazy(() =>
//   import("../pages/app/quan_ly_xac_nhan_quang_cao/xac_nhan_quang_cao")
// );
// const XNQCThongKeBaoCao = lazy(() =>
//   import("../pages/app/quan_ly_xac_nhan_quang_cao/thong_ke_bao_cao")
// );

// const HoSoXacNhanKienThucAttp = lazy(() =>
//   import(
//     "../pages/app/quan_ly_xac_nhan_kien_thuc_attp/ho_so_xac_nhan_attp/ho_so_xac_nhan_attp"
//   )
// );
// const DotXacNhanKienThucAttp = lazy(() =>
//   import(
//     "../pages/app/quan_ly_xac_nhan_kien_thuc_attp/dot_xac_nhan_attp/dot_xac_nhan_attp"
//   )
// );
// const DXNKTATTPThongKe = lazy(() =>
//   import(
//     "../pages/app/quan_ly_xac_nhan_kien_thuc_attp/thong_ke_bao_cao/thong_ke_bao_cao"
//   )
// );

const NhomChuoiThucPham = lazy(() =>
  import(
    "./../pages/app/quan_ly_chuoi_thuc_pham_an_toan/nhom_chuoi_thuc_pham/nhom_chuoi_thuc_pham"
  )
);
const KeHoachThamDinhCTPAT = lazy(() =>
  import(
    "./../pages/app/quan_ly_chuoi_thuc_pham_an_toan/ke_hoach_tham_dinh/ke_hoach_tham_dinh"
  )
);
const HoSoChuoiThucPhamDetail = lazy(() =>
  import(
    "./../pages/app/quan_ly_chuoi_thuc_pham_an_toan/ho_so_chuoi_thuc_pham/ho_so_chuoi_thuc_pham_detail"
  )
);
const HoSoChuoiThucPham = lazy(() =>
  import(
    "./../pages/app/quan_ly_chuoi_thuc_pham_an_toan/ho_so_chuoi_thuc_pham/ho_so_chuoi_thuc_pham"
  )
);
const ChuoiThucPhamAnToanReport = lazy(() =>
  import(
    "./../pages/app/quan_ly_chuoi_thuc_pham_an_toan/thong_ke_bao_cao/thong_ke_bao_cao"
  )
);
const KeHoachThamDinhCTPATDetail = lazy(() =>
  import(
    "./../pages/app/quan_ly_chuoi_thuc_pham_an_toan/chi_tiet/chi_tiet_ke_hoach"
  )
);

// const BaoCaoTongHop = lazy(() =>
//   import("./../pages/app/bao_cao_tong_hop/bao_cao_tong_hop")
// );
// const BaoCaoThongKe = lazy(() =>
//   import("./../pages/app/bao_cao_tong_hop/bao_cao_thong_ke")
// );
// const QuanLyBieuMau = lazy(() => import("../pages/app/quan_ly_bieu_mau"));
// const BieuMauDetail = lazy(() =>
//   import("../pages/app/quan_ly_bieu_mau/detail")
// );

// const TaiSan = lazy(() =>
//   import("../pages/app/quan_ly_tai_san/tai_san/tai_san")
// );
// const NhomTaiSan = lazy(() =>
//   import("./../pages/app/danh_muc/nhom_tai_san/nhom_tai_san")
// );
// const ThongKeBaoCaoCongCuDungCu = lazy(() =>
//   import(
//     "../pages/app/quan_ly_tai_san/thong_ke_bao_cao/thong_ke_cong_cu_dung_cu"
//   )
// );
// const ThongKeBaoCaoTaiSanCoDinh = lazy(() =>
//   import(
//     "../pages/app/quan_ly_tai_san/thong_ke_bao_cao/thong_ke_tai_san_co_dinh"
//   )
// );

// const QuanLyNghiPhep = lazy(() =>
//   import("../pages/app/quan_ly_nghi_phep/quan_ly_nghi_phep")
// );
// const QuanLyCongTac = lazy(() =>
//   import("../pages/app/quan_ly_nghi_phep/quan_ly_cong_tac")
// );
// const QuanLyCauHinhNghiPhep = lazy(() =>
//   import("../pages/app/quan_ly_nghi_phep/quan_ly_cau_hinh_nghi_phep")
// );
// const ThongKeBaoCaoNghiPhep = lazy(() =>
//   import("../pages/app/quan_ly_nghi_phep/thong_ke_bao_cao")
// );

// const QuanLyDoanVao = lazy(() =>
//   import("../pages/app/quan_ly_doi_ngoai/quan_ly_doan_vao/quan_ly_doan_vao")
// );
// const QuanLyDoanRa = lazy(() =>
//   import("../pages/app/quan_ly_doi_ngoai/quan_ly_doan_ra/quan_ly_doan_ra")
// );
// const KeHoachTaiChinh = lazy(() =>
//   import("../pages/app/quan_ly_ke_hoach_tai_chinh/ke_hoach/ke_hoach")
// );
// const KeHoachTaiChinhDetail = lazy(() =>
//   import("../pages/app/quan_ly_ke_hoach_tai_chinh/ke_hoach/ke_hoach_detail")
// );
// const TaiChinh = lazy(() =>
//   import("../pages/app/quan_ly_ke_hoach_tai_chinh/tai_chinh/tai_chinh")
// );
// const TaiChinhDetail = lazy(() =>
//   import("../pages/app/quan_ly_ke_hoach_tai_chinh/tai_chinh/tai_chinh_detail")
// );

// const QuanLyATTPDiaPhuong = lazy(() =>
//   import(
//     "../pages/app/quan_ly_chinh_sach_phap_luat/dau_tu_qlattp_dia_phuong/dau_tu_qlattp_dia_phuong"
//   )
// );
// const KetQuaThanhKiemTraATTP = lazy(() =>
//   import(
//     "../pages/app/quan_ly_chinh_sach_phap_luat/ket_qua_thanh_kiem_tra_attp/ket_qua_thanh_kiem_tra_attp"
//   )
// );
// const KetQuaKiemNghiemTP = lazy(() =>
//   import(
//     "../pages/app/quan_ly_chinh_sach_phap_luat/ket_qua_kiem_nghiem_tp/ket_qua_kiem_nghiem_tp"
//   )
// );
// const GosNhiemTPNN = lazy(() =>
//   import(
//     "../pages/app/quan_ly_chinh_sach_phap_luat/gos_nhiem_tpnn/gos_nhiem_tpnn"
//   )
// );
// const GosNhiemTPYT = lazy(() =>
//   import(
//     "../pages/app/quan_ly_chinh_sach_phap_luat/gos_nhiem_tpyt/gos_nhiem_tpyt"
//   )
// );
// const KetQuaThucHienTTHC = lazy(() =>
//   import(
//     "../pages/app/quan_ly_chinh_sach_phap_luat/ket_qua_thuc_hien_tthc/ket_qua_thuc_hien_tthc"
//   )
// );
// const QuanLyChoSieuThi = lazy(() =>
//   import(
//     "../pages/app/quan_ly_chinh_sach_phap_luat/quan_ly_cho_sieu_thi/quan_ly_cho_sieu_thi"
//   )
// );
// const SuDungKinhPhiDiaPhuong = lazy(() =>
//   import(
//     "../pages/app/quan_ly_chinh_sach_phap_luat/su_dung_kinh_phi_dia_phuong/su_dung_kinh_phi_dia_phuong"
//   )
// );
// const SuDungKinhPhiTrungUong = lazy(() =>
//   import(
//     "../pages/app/quan_ly_chinh_sach_phap_luat/su_dung_kinh_phi_trung_uong/su_dung_kinh_phi_trung_uong"
//   )
// );
// const TongTinhHinhVSATTP = lazy(() =>
//   import(
//     "../pages/app/quan_ly_chinh_sach_phap_luat/tong_hop_tinh_hinh_vpattp/tong_hop_tinh_hinh_vpattp"
//   )
// );
// const XayDungCSVCDiaPhuong = lazy(() =>
//   import(
//     "../pages/app/quan_ly_chinh_sach_phap_luat/xay_dung_csvc_dia_phuong/xay_dung_csvc_dia_phuong"
//   )
// );
// const MauKiemNghiem = lazy(() =>
//   import(
//     "../pages/app/quan_ly_chinh_sach_phap_luat/danh_muc/mau_kiem_nghiem/mau_kiem_nghiem"
//   )
// );
// const MauThucPhamNN = lazy(() =>
//   import(
//     "../pages/app/quan_ly_chinh_sach_phap_luat/danh_muc/mau_thuc_pham_nong_nghiep/mau_thuc_pham_nong_nghiep"
//   )
// );
// const TruyenThong = lazy(() =>
//   import(
//     "../pages/app/quan_ly_chinh_sach_phap_luat/danh_muc/truyen_thong/truyen_thong"
//   )
// );

// const SuKien = lazy(() =>
//   import("../pages/app/quan_ly_giam_sat_attp/su_kien/su_kien")
// );
// const GiamSatATTP = lazy(() =>
//   import("../pages/app/quan_ly_giam_sat_attp/giam_sat_attp/giam_sat_attp")
// );
// const LoaiSuKien = lazy(() =>
//   import("../pages/app/quan_ly_giam_sat_attp/loai_su_kien/loai_su_kien")
// );
// const KeHoachGiamSatATTP = lazy(() =>
//   import(
//     "../pages/app/quan_ly_giam_sat_attp/ke_hoach_giam_sat_attp/ke_hoach_giam_sat_attp"
//   )
// );
// const KeHoachGiamSatATTP_QuyetDinh = lazy(() =>
//   import(
//     "../pages/app/quan_ly_giam_sat_attp/ke_hoach_giam_sat_attp/quyet_dinh_giam_sat"
//   )
// );
// const ChiTietSuKien = lazy(() =>
//   import("../pages/app/quan_ly_giam_sat_attp/chi_tiet_su_kien/chi_tiet_su_kien")
// );
// const KeHoachGiamSatATTPDetail = lazy(() =>
//   import(
//     "../pages/app/quan_ly_giam_sat_attp/ke_hoach_giam_sat_attp/ke_hoach_giam_sat_detail"
//   )
// );

// const BaoCaoThongKeSuKien = lazy(() =>
//   import(
//     "../pages/app/quan_ly_giam_sat_attp/thong_ke_bao_cao/thong_ke_danh_sach_su_kien"
//   )
// );
// const BaoCaoThongKeGiamSatATTP = lazy(() =>
//   import(
//     "../pages/app/quan_ly_giam_sat_attp/thong_ke_bao_cao/thong_ke_danh_sach_giam_sat_attp"
//   )
// );
// const BaoCaoThongKeChiTietSuKien = lazy(() =>
//   import(
//     "../pages/app/quan_ly_giam_sat_attp/thong_ke_bao_cao/thong_ke_danh_sach_chi_tiet_su_kien"
//   )
// );
// const BaoCaoThongKeKeHoachGiamSat = lazy(() =>
//   import(
//     "../pages/app/quan_ly_giam_sat_attp/thong_ke_bao_cao/thong_ke_danh_sach_ke_hoach"
//   )
// );

// const ThanhLyTaiSan = lazy(() =>
//   import("../pages/app/quan_ly_tai_san/tai_san/thanh_ly_tai_san")
// );
// const ThanhLyTaiSanDetail = lazy(() =>
//   import("../pages/app/quan_ly_tai_san/tai_san/thanh_ly_tai_san_detail")
// );

// const BaoCaoThongKeQuanLyAttpDiaPhuong = lazy(() =>
//   import(
//     "../pages/app/quan_ly_chinh_sach_phap_luat/thong_ke_bao_cao/thong_ke_quan_ly_attp_dia_phuong"
//   )
// );
// const BaoCaoThongKeMauKiemNghiem = lazy(() =>
//   import(
//     "../pages/app/quan_ly_chinh_sach_phap_luat/thong_ke_bao_cao/thong_ke_mau_kiem_nghiem"
//   )
// );
// const BaoCaoThongKeMauThucPhamNN = lazy(() =>
//   import(
//     "../pages/app/quan_ly_chinh_sach_phap_luat/thong_ke_bao_cao/thong_ke_mau_thuc_pham_nn"
//   )
// );
// const BaoCaoThongKeDanhMucTruyenThong = lazy(() =>
//   import(
//     "../pages/app/quan_ly_chinh_sach_phap_luat/thong_ke_bao_cao/thong_ke_danh_muc_truyen_thong"
//   )
// );
// const BaoCaoThongKeKetQuaKiemNghiemTp = lazy(() =>
//   import(
//     "../pages/app/quan_ly_chinh_sach_phap_luat/thong_ke_bao_cao/thong_ke_ket_qua_kiem_nghiem_tp"
//   )
// );
// const BaoCaoThongKeKetQuaThanhKiemTraAttp = lazy(() =>
//   import(
//     "../pages/app/quan_ly_chinh_sach_phap_luat/thong_ke_bao_cao/thong_ke_ket_qua_thanh_kiem_tra_attp"
//   )
// );
// const BaoCaoThongKeKetQuaThucHienTTHC = lazy(() =>
//   import(
//     "../pages/app/quan_ly_chinh_sach_phap_luat/thong_ke_bao_cao/thong_ke_ket_qua_thuc_hien_tthc"
//   )
// );
// const BaoCaoThongKeQuanLyChoSieuThi = lazy(() =>
//   import(
//     "../pages/app/quan_ly_chinh_sach_phap_luat/thong_ke_bao_cao/thong_ke_quan_ly_cho_sieu_thi"
//   )
// );
// const BaoCaoThongKeSuDungKinhPhiDiaPhuong = lazy(() =>
//   import(
//     "../pages/app/quan_ly_chinh_sach_phap_luat/thong_ke_bao_cao/thong_ke_su_dung_kinh_phi_dia_phuong"
//   )
// );
// const BaoCaoThongKeSuDungKinhPhiTrungUong = lazy(() =>
//   import(
//     "../pages/app/quan_ly_chinh_sach_phap_luat/thong_ke_bao_cao/thong_ke_su_dung_kinh_phi_trung_uong"
//   )
// );
// const BaoCaoThongKeGosNhiemTPNN = lazy(() =>
//   import(
//     "../pages/app/quan_ly_chinh_sach_phap_luat/thong_ke_bao_cao/thong_ke_gos_nhiem_tpnn"
//   )
// );
// const BaoCaoThongKeGosNhiemTPYTE = lazy(() =>
//   import(
//     "../pages/app/quan_ly_chinh_sach_phap_luat/thong_ke_bao_cao/thong_ke_gos_nhiem_tpyte"
//   )
// );
// const BaoCaoThongKeTongHopTinhHinhVSATTP = lazy(() =>
//   import(
//     "../pages/app/quan_ly_chinh_sach_phap_luat/thong_ke_bao_cao/thong_ke_tinh_hinh_vsattp"
//   )
// );
// const BaoCaoThongKeXayDungCSVCDiaPhuong = lazy(() =>
//   import(
//     "../pages/app/quan_ly_chinh_sach_phap_luat/thong_ke_bao_cao/thong_ke_xay_dung_csvc_dia_phuong"
//   )
// );
// const PheDuyetBoSungCoSo = lazy(() =>
//   import(
//     "../pages/app/quan_ly_quy_trinh_nghiep_vu_thanh_tra/cuoc_thanh_tra/phe_duyet_bo_sung_co_so"
//   )
// );
const KeHoachGiamSatONhiem = lazy(() =>
  import(
    "../pages/app/quan_ly_cong_tac_giam_sat_o_nhiem/ke_hoach_kiem_tra/ke_hoach_kiem_tra"
  )
);
const KeHoachGiamSatDetail = lazy(() =>
  import(
    "../pages/app/quan_ly_cong_tac_giam_sat_o_nhiem/ke_hoach_kiem_tra/chi_tiet"
  )
);
const DanhSachSanPhamOCOP = lazy(() =>
  import("./../pages/app/quan_ly_ho_so_tu_cong_bo/danh_sach_san_pham_ocop")
);
// const DanhSachHoSoTiepNhanPhanAnhKienNghi = lazy(() =>
//   import(
//     "./../pages/app/quan_ly_tiep_nhan_xu_ly_phan_anh_kien_nghi/ho_so_tiep_nhan/ho_so_tiep_nhan"
//   )
// );
// const DanhSachHoSoDangXuLyPhanAnhKienNghi = lazy(() =>
//   import(
//     "./../pages/app/quan_ly_tiep_nhan_xu_ly_phan_anh_kien_nghi/ho_so_dang_xu_ly/ho_so_dang_xu_ly"
//   )
// );

const getQueryVariable = (location) =>
  useCallback(main.queryString.parse(location.search), [location]);

const routes_qrcode = [
  {
    path: url.URL_QR_CODE,
    exact: true,
    main: ({ match, history, location }) => (
      <QRCode
        match={match}
        history={history}
        location={location}
        queryVariable={getQueryVariable(location)}
        isPublic={true}
      />
    ),
    isHiddenTitle: true,
    requireAuth: false,
    extendTemplate: false,
  },

  {
    path: url.URL_QR_CODE_1,
    exact: true,
    main: ({ match, history, location }) => (
      <QRCode
        match={match}
        history={history}
        location={location}
        queryVariable={getQueryVariable(location)}
        isPublic={false}
      />
    ),
    isHiddenTitle: true,
    requireAuth: true,
    extendTemplate: true,
  },
];
const routes_danh_muc = [
  {
    path: url.URL_LINH_VUC,
    exact: true,
    main: ({ match, history, location }) => (
      <LinhVuc
        match={match}
        history={history}
        location={location}
        queryVariable={getQueryVariable(location)}
      />
    ),
    requireAuth: true,
    extendTemplate: true,
  },
  {
    path: url.URL_TCB_DM_NHOM,
    exact: true,
    main: ({ match, history, location }) => (
      <DMNhom
        match={match}
        history={history}
        location={location}
        queryVariable={getQueryVariable(location)}
      />
    ),
    requireAuth: true,
    extendTemplate: true,
  },
  {
    path: url.URL_TCB_DM_PHAN_NHOM,
    exact: true,
    main: ({ match, history, location }) => (
      <DMPhanNhom
        match={match}
        history={history}
        location={location}
        queryVariable={getQueryVariable(location)}
      />
    ),
    requireAuth: true,
    extendTemplate: true,
  },
  {
    path: url.URL_DANH_MUC_DIA_BAN,
    exact: true,
    main: ({ match, history, location }) => (
      <DiaBan
        match={match}
        history={history}
        location={location}
        queryVariable={getQueryVariable(location)}
      />
    ),
    requireAuth: true,
    extendTemplate: true,
  },
  {
    path: url.URL_LOAI_HINH_CO_SO,
    exact: true,
    main: ({ match, history, location }) => (
      <LoaiHinhCoSo
        match={match}
        history={history}
        location={location}
        queryVariable={getQueryVariable(location)}
      />
    ),
    requireAuth: true,
    extendTemplate: true,
  },
  {
    path: url.URL_QUAN_LY_PHONG_BAN,
    exact: true,
    main: ({ match, history, location }) => (
      <QuanLyPhongBan
        match={match}
        history={history}
        location={location}
        queryVariable={getQueryVariable(location)}
      />
    ),
    requireAuth: true,
    extendTemplate: true,
  },
  {
    path: url.URL_QUAN_LY_QUOC_GIA,
    exact: true,
    main: ({ match, history, location }) => (
      <QuanLyQuocGia
        match={match}
        history={history}
        location={location}
        queryVariable={getQueryVariable(location)}
      />
    ),
    requireAuth: true,
    extendTemplate: true,
  },
  {
    path: url.URL_LOAI_TAI_CHINH,
    exact: true,
    main: ({ match, history, location }) => (
      <LoaiTaiChinh
        match={match}
        history={history}
        location={location}
        queryVariable={getQueryVariable(location)}
      />
    ),
    requireAuth: true,
    extendTemplate: true,
  },
  {
    path: url.URL_NGUON_KINH_PHI,
    exact: true,
    main: ({ match, history, location }) => (
      <NguonKinhPhi
        match={match}
        history={history}
        location={location}
        queryVariable={getQueryVariable(location)}
      />
    ),
    requireAuth: true,
    extendTemplate: true,
  },
  {
    path: url.URL_DOAN_THAM_DINH,
    exact: true,
    main: ({ match, history, location }) => (
      <DoanThamDinh queryVariable={getQueryVariable(location)} />
    ),
    requireAuth: true,
    extendTemplate: true,
  },
];

const routes_quan_ly_co_so_san_xuat_kinh_doanh = [
  {
    path: url.URL_CO_SO_SAN_XUAT_KINH_DOANH,
    exact: true,
    main: ({ match, history, location }) => (
      <CoSoSanXuatKinhDoanh
        match={match}
        history={history}
        location={location}
        queryVariable={getQueryVariable(location)}
      />
    ),
    requireAuth: true,
    extendTemplate: true,
  },
  {
    path: url.URL_CO_SO_SAN_XUAT_KINH_DOANH_QUAN_QUAN_LY,
    exact: true,
    main: ({ match, history, location }) => (
      <CoSoSanXuatKinhDoanhQuanQuanLy
        match={match}
        history={history}
        location={location}
        queryVariable={getQueryVariable(location)}
      />
    ),
    requireAuth: true,
    extendTemplate: true,
  },
  {
    path: url.URL_CO_SO_SAN_XUAT_KINH_DOANH_THONG_KE_BAO_CAO,
    exact: true,
    main: ({ match, history, location }) => (
      <CoSoSanXuatKinhDoanhThongKeBaoCao
        match={match}
        history={history}
        location={location}
        queryVariable={getQueryVariable(location)}
      />
    ),
    requireAuth: true,
    extendTemplate: true,
  },
  {
    path: url.URL_HO_SO_TIEP_NHAN_MOT_CUA,
    exact: true,
    main: ({ match, history, location }) => (
      <HoSoTiepNhanMotCua
        match={match}
        history={history}
        location={location}
        queryVariable={getQueryVariable(location)}
      />
    ),
    requireAuth: true,
    extendTemplate: true,
  },
  {
    path: url.URL_CO_SO_SAN_XUAT_KINH_DOANH_CAU_HINH,
    exact: true,
    main: () => <CoSoSanXuatKinhDoanhCauHinh />,
    requireAuth: true,
    extendTemplate: true,
  },
];

// const routes_quan_ly_nhan_su = [
//   {
//     path: url.URL_NHAN_SU,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <NhanSu
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_PHONG_BAN,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <PhongBan
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_DANHHIEU_THIDUA,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <DanhHieuThiDua
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_THONGTIN_DAOTAOTAPHUAN,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <ThongTinDaoTaoTapHuan
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_THONGTIN_NGHIPHEP,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <ThongTinNghiPhep
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_THONGTIN_NGHIPHEP_USER,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <ThongTinNghiPhepUser
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_THONGTIN_TAISANCONG,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <ThongTinTaiSanCong
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_THONGTIN_KHENTHUONG,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <ThongTinKhenThuong
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
// ];

// const routes_quan_ly_van_ban_phap_luat = [
//   {
//     path: url.URL_VAN_BAN_PHAP_LUAT,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <VanBanPhapLuat
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_VAN_BAN_PHAP_LUAT_DANH_MUC_LINH_VUC,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <VanBanPhapLuatLinhVuc
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
// ];

// const routes_quan_ly_quy_trinh_nghiep_vu_thanh_tra = [
//   {
//     path: url.URL_QTNVTT_PHE_DUYET_BO_SUNG_CO_SO,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <PheDuyetBoSungCoSo
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_QTNVTT_CAU_HINH,
//     exact: true,
//     main: () => <NghiepVuThanhTraCauHinh />,
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_QTNVTT_KE_HOACH_THANH_TRA,
//     exact: true,
//     main: ({ match, history, location }) => <KeHoachThanhTra />,
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_QTNVTT_KE_HOACH_THANH_TRA_DETAIL,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <KeHoachThanhTraDetail
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_QTNVTT_CUOC_THANH_TRA_KE_HOACH,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <CuocThanhTra
//         match={match}
//         history={history}
//         location={location}
//         dotXuat={0}
//         key="ke-hoach"
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_QTNVTT_CUOC_THANH_TRA_DETAIL,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <CuocThanhTraDetail
//         match={match}
//         history={history}
//         location={location}
//         dotXuat={0}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_QTNVTT_CUOC_THANH_TRA_DOT_XUAT,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <CuocThanhTra
//         match={match}
//         history={history}
//         location={location}
//         dotXuat={1}
//         key="dot-xuat"
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_QTNVTT_DOT_THANH_TRA,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <DotThanhTra
//         match={match}
//         history={history}
//         location={location}
//         dotXuat={0}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_QTNVTT_DOT_THANH_TRA_DETAIL,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <DotThanhTraDetail
//         match={match}
//         history={history}
//         location={location}
//         dotXuat={0}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },

//   {
//     path: url.URL_QTNVTT_BAO_CAO_THONG_KE,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <QTNVTTThongKeBaoCao
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_QTNVTT_BAO_CAO_THONG_KE_DSCOSO,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <QTNVTTThongKeBaoCaoDanhSachCoSo
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },

//   {
//     path: url.URL_QTNVTT_BAO_CAO_THONG_KE_DSCOSO1,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <QTNVTTThongKeBaoCaoDanhSachCoSo
//         key={url.URL_QTNVTT_BAO_CAO_THONG_KE_DSCOSO1}
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//         type={1}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },

//   {
//     path: url.URL_QTNVTT_BAO_CAO_THONG_KE_DSCOSO2,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <QTNVTTThongKeBaoCaoDanhSachCoSo
//         key={url.URL_QTNVTT_BAO_CAO_THONG_KE_DSCOSO2}
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//         type={2}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_QTNVTT_BAO_CAO_THONG_KE_THONGTINPHANCONG,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <QTNVTTThongKeBaoCaoThongTinPhanCong
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_QTNVTT_BAO_CAO_THONG_KE_HANHVIVIPHAM,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <QTNVTTThongKeBaoCaoChiTietViPham
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_QLONTP_KE_HOACH_GIAM_SAT,
//     exact: true,
//     main: ({ match, history, location }) => <KeHoachGiamSatONhiem />,
//     requireAuth: true,
//     extendTemplate: true,
//   },
// ];

// const routes_quan_ly_tiep_nhan_va_xu_ly_phan_anh_kien_nghi = [
//   {
//     path: url.URL_PAKN_HO_SO,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <HoSoPhanAnhKienNghi
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path:
//       "/quan-ly-tiep-nhan-&-xu-ly-phan-anh-kien-nghi/ho-so-tiep-nhan-phan-anh-kien-nghi.html",
//     exact: true,
//     main: ({ match, history, location }) => (
//       <DanhSachHoSoTiepNhanPhanAnhKienNghi
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_DANH_SACH_DANG_XU_LY_PAKN,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <DanhSachHoSoDangXuLyPhanAnhKienNghi
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_PAKN_BIEN_BAN_THANH_TRA,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <BienBanThanhTra
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_PAKN_BIEN_BAN_XU_PHAT,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <BienBanXuPhat
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
// ];

// export const routes_quan_ly_quy_trinh_dieu_tra_xu_ly_ho_so_ngo_doc_thuc_pham = [
//   {
//     path: url.URL_HO_SO_NGO_DOC_THUC_PHAM,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <HoSoNgoDocThucPham
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_QTDTXL_NDTP_THONG_KE_BAO_CAO,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <QTDTCKNDTPThongKeBaoCao
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_QTDTXL_NDTP_THONG_KE_BAO_CAO_CHI_TIET,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <QTDTCKNDTPThongKeBaoCaoChiTiet
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
// ];

const routes_quan_ly_cong_tac_giam_sat_o_nhiem = [
  {
    path: url.URL_QL_DM_CHI_TIEU,
    exact: true,
    main: ({ match, history, location }) => (
      <QuanLyDmChiTieu
        match={match}
        history={history}
        location={location}
        queryVariable={getQueryVariable(location)}
      />
    ),
    requireAuth: true,
    extendTemplate: true,
  },
  {
    path: url.URL_QL_DM_LOAI_THUC_PHAM,
    exact: true,
    main: ({ match, history, location }) => (
      <QuanLyDmLoaiThucPham
        match={match}
        history={history}
        location={location}
        queryVariable={getQueryVariable(location)}
      />
    ),
    requireAuth: true,
    extendTemplate: true,
  },
  {
    path: url.URL_DOT_KIEM_TRA_ONTP,
    exact: true,
    main: ({ match, history, location }) => (
      <DotKiemTra
        match={match}
        history={history}
        location={location}
        queryVariable={getQueryVariable(location)}
      />
    ),
    requireAuth: true,
    extendTemplate: true,
  },
  {
    path: url.URL_QLONTP_THONG_KE,
    exact: true,
    main: ({ match, history, location }) => (
      <GSONTPThongKe
        match={match}
        history={history}
        location={location}
        queryVariable={getQueryVariable(location)}
      />
    ),
    requireAuth: true,
    extendTemplate: true,
  },
  {
    path: url.URL_QTNVTT_O_NHIEM_GIAM_SAT_DETAIL,
    exact: true,
    main: ({ match, history, location }) => (
      <KeHoachGiamSatDetail
        match={match}
        history={history}
        location={location}
        queryVariable={getQueryVariable(location)}
      />
    ),
    requireAuth: true,
    extendTemplate: true,
  },
  {
    path: url.URL_QLONTP_THANH_LAP_DOAN_KIEM_TRA,
    exact: true,
    main: ({ match, history, location }) => (
      <ThanhLapDoanKiemTra
        match={match}
        history={history}
        location={location}
        dotXuat={0}
        key="ke-hoach"
        queryVariable={getQueryVariable(location)}
      />
    ),
    requireAuth: true,
    extendTemplate: true,
  },
  {
    path: url.URL_QLONTP_THANH_LAP_DOAN_KIEM_TRA_DETAIL,
    exact: true,
    main: ({ match, history, location }) => (
      <ThanhLapDoanKiemTraDetail
        match={match}
        history={history}
        location={location}
        dotXuat={0}
        queryVariable={getQueryVariable(location)}
      />
    ),
    requireAuth: true,
    extendTemplate: true,
  },
];

// const routes_quan_ly_tham_dinh_ho_so_cap_giay_chung_nhan_attp = [
//   {
//     path: url.URL_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_REPORT,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <HoSoCapGiayChungNhanReport
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_DETAIL,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <HoSoCapGiayChungNhanChiTiet
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <HoSoCapGiayChungNhan
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_HO_SO_CAP_GIAY_CHUNG_NHAN_DA_XU_LY,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <HoSoCapGiayChungNhanDaXuLy
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_KE_HOACH_THAM_DINH_HO_SO_ATTP,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <KeHoachThamDinh
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_HO_SO_TIEP_NHAN_MOT_CUA_THAM_DINH,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <HoSoTiepNhanMotCua
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//         trangThaiDefault={6} // Trạng thái đã xử lý xong
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_HO_SO_CAP_GIAY_CHUNG_NHAN_CHI_TIET_KE_HOACH,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <HoSoCapGiayChungNhanChiTietKeHoach
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
// ];

const routes_quan_ly_thu_tuc_tu_cong_bo = [
  {
    path: url.URL_HO_SO_BAN_CONG_BO_DETAIL,
    exact: true,
    main: ({ match, history, location }) => (
      <HoSoTuCongBoDetail
        key={constants.CONST_LOAI_CONG_BO_SAN_PHAM.BANCONGBO}
        match={match}
        history={history}
        location={location}
        queryVariable={getQueryVariable(location)}
        loaiCongBo={constants.CONST_LOAI_CONG_BO_SAN_PHAM.BANCONGBO}
      />
    ),
    requireAuth: true,
    extendTemplate: true,
  },
  {
    path: url.URL_DANH_SACH_SAN_PHAM_OCOP,
    exact: true,
    main: ({ match, history, location }) => (
      <DanhSachSanPhamOCOP
        key={constants.CONST_LOAI_CONG_BO_SAN_PHAM_OCOP.BANCONGBO}
        match={match}
        history={history}
        location={location}
        queryVariable={getQueryVariable(location)}
        loaiCongBo={constants.CONST_LOAI_CONG_BO_SAN_PHAM_OCOP.BANCONGBO}
      />
    ),
    requireAuth: true,
    extendTemplate: true,
  },
  {
    path: url.URL_HO_SO_TU_CONG_BO_DETAIL,
    exact: true,
    main: ({ match, history, location }) => (
      <HoSoTuCongBoDetail
        key={constants.CONST_LOAI_CONG_BO_SAN_PHAM.TUCONGBO}
        match={match}
        history={history}
        location={location}
        queryVariable={getQueryVariable(location)}
        loaiCongBo={constants.CONST_LOAI_CONG_BO_SAN_PHAM.TUCONGBO}
      />
    ),
    requireAuth: true,
    extendTemplate: true,
  },
  {
    path: url.URL_THONG_BAO_HO_SO_TU_CONG_BO,
    exact: true,
    main: ({ match, history, location }) => (
      <ThongBaoCongBoSanPham
        match={match}
        history={history}
        location={location}
        queryVariable={getQueryVariable(location)}
      />
    ),
    requireAuth: true,
    extendTemplate: true,
  },
  {
    path: url.URL_THONG_BAO_HO_SO_TU_CONG_BO_DETAIL,
    exact: true,
    main: ({ match, history, location }) => (
      <ThongBaoCongBoSanPhamDetail
        match={match}
        history={history}
        location={location}
        queryVariable={getQueryVariable(location)}
      />
    ),
    requireAuth: true,
    extendTemplate: true,
  },
  {
    path: url.URL_HO_SO_BAN_CONG_BO,
    exact: true,
    main: ({ match, history, location }) => (
      <HoSoTuCongBo
        key={constants.CONST_LOAI_CONG_BO_SAN_PHAM.BANCONGBO}
        loaiCongBo={constants.CONST_LOAI_CONG_BO_SAN_PHAM.BANCONGBO}
        match={match}
        history={history}
        location={location}
        queryVariable={getQueryVariable(location)}
      />
    ),
    requireAuth: true,
    extendTemplate: true,
  },
  {
    path: url.URL_HO_SO_TU_CONG_BO,
    exact: true,
    main: ({ match, history, location }) => (
      <HoSoTuCongBo
        key={constants.CONST_LOAI_CONG_BO_SAN_PHAM.TUCONGBO}
        loaiCongBo={constants.CONST_LOAI_CONG_BO_SAN_PHAM.TUCONGBO}
        match={match}
        history={history}
        location={location}
        queryVariable={getQueryVariable(location)}
      />
    ),
    requireAuth: true,
    extendTemplate: true,
  },
  // {
  //   path: url.URL_CONG_TAC_HAU_KIEM,
  //   exact: true,
  //   main: ({ match, history, location }) => (
  //     <CongTacHauKiem
  //       match={match}
  //       history={history}
  //       location={location}
  //       queryVariable={getQueryVariable(location)}
  //     />
  //   ),
  //   requireAuth: true,
  //   extendTemplate: true,
  // },
  {
    path: url.URL_TCBSP_THONGKE_BAOCAO,
    exact: true,
    main: ({ match, history, location }) => (
      <TCBSPThongKeBaoCao
        match={match}
        history={history}
        location={location}
        queryVariable={getQueryVariable(location)}
      />
    ),
    requireAuth: true,
    extendTemplate: true,
  },
    {
    path: url.URL_QUAN_LY_TIEU_CHI_HANG_SAO,
    // exact: true,
    main: ({ match, history, location }) => (
      <DanhMucTieuChi
        match={match}
        history={history}
        location={location}
        queryVariable={getQueryVariable(location)}
      />
    ),
    requireAuth: true,
    extendTemplate: true,
  },
];
// const routes_quan_ly_xac_nhan_quang_cao = [
//   {
//     path: url.URL_XAC_NHAN_QUANG_CAO,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <XacNhanQuangCao
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_XNQC_THONG_KE_BAO_CAO,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <XNQCThongKeBaoCao
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
// ];

// const routes_quan_ly_xac_nhan_kien_thuc_attp = [
//   {
//     path: url.URL_HO_SO_XAC_NHAN_KIEN_THUC_ATTP,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <HoSoXacNhanKienThucAttp
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_DOT_XAC_NHAN_KIEN_THUC_ATTP,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <DotXacNhanKienThucAttp
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_DXNKT_ATTP_THONG_KE_BAO_CAO,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <DXNKTATTPThongKe
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
// ];

const routes_quan_ly_chuoi_thuc_pham_an_toan = [
  {
    path: url.URL_NHOM_CHUOI_THUC_PHAM,
    exact: true,
    main: ({ match, history, location }) => (
      <NhomChuoiThucPham
        match={match}
        history={history}
        location={location}
        queryVariable={getQueryVariable(location)}
      />
    ),
    requireAuth: true,
    extendTemplate: true,
  },
  {
    path: url.URL_KE_HOACH_THAM_DINH_CHUOI_THUC_PHAM_AN_TOAN,
    exact: true,
    main: ({ match, history, location }) => (
      <KeHoachThamDinhCTPAT
        match={match}
        history={history}
        location={location}
        queryVariable={getQueryVariable(location)}
      />
    ),
    requireAuth: true,
    extendTemplate: true,
  },
  {
    path: url.URL_HO_SO_CHUOI_THUC_PHAM,
    exact: true,
    main: ({ match, history, location }) => (
      <HoSoChuoiThucPham
        match={match}
        history={history}
        location={location}
        queryVariable={getQueryVariable(location)}
      />
    ),
    requireAuth: true,
    extendTemplate: true,
  },
  {
    path: url.URL_HO_SO_CHUOI_THUC_PHAM_DETAIL,
    exact: true,
    main: ({ match, history, location }) => (
      <HoSoChuoiThucPhamDetail
        match={match}
        history={history}
        location={location}
        queryVariable={getQueryVariable(location)}
      />
    ),
    requireAuth: true,
    extendTemplate: true,
  },
  {
    path: url.URL_THONGKE_BAOCAO_CHUOI_THUC_PHAM,
    exact: true,
    main: ({ match, history, location }) => (
      <ChuoiThucPhamAnToanReport
        match={match}
        history={history}
        location={location}
        queryVariable={getQueryVariable(location)}
      />
    ),
    requireAuth: true,
    extendTemplate: true,
  },
  {
    path: url.URL_KE_HOACH_THAM_DINH_CHUOI_THUC_PHAM_AN_TOAN_DETAIL,
    exact: true,
    main: ({ match, history, location }) => (
      <KeHoachThamDinhCTPATDetail
        match={match}
        history={history}
        location={location}
        queryVariable={getQueryVariable(location)}
      />
    ),
    requireAuth: true,
    extendTemplate: true,
  },
];

// const routes_bao_cao_tong_hop = [
//   {
//     path: url.URL_BAO_CAO_TONG_HOP,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <BaoCaoTongHop
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_BAO_CAO_THONG_KE,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <BaoCaoThongKe
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
// ];

// const routes_quan_ly_bieu_mau = [
//   {
//     path: url.URL_QUAN_LY_BIEU_MAU,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <QuanLyBieuMau
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_BIEU_MAU_DETAIL,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <BieuMauDetail
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: false,
//     extendTemplate: true,
//     isHiddenTitle: true,
//   },
// ];

// const routes_quan_ly_tai_san = [
//   {
//     path: url.URL_QUAN_LY_TAI_SAN_CO_DINH,
//     exact: true,
//     main: () => <TaiSan loaiTaiSan="TSCD" key="TSCD" />,
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_QUAN_LY_TAI_SAN_CONG_CU_DUNG_CU,
//     exact: true,
//     main: () => <TaiSan loaiTaiSan="CCDC" key="CCDC" />,
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_QUAN_LY_TAI_SAN_NHOM_TAI_SAN,
//     exact: true,
//     main: () => <NhomTaiSan key="CCDC" />,
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_THANH_LY_TAI_SAN,
//     exact: true,
//     main: () => <ThanhLyTaiSan />,
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_THANH_LY_TAI_SAN_DETAIL,
//     exact: true,
//     main: () => <ThanhLyTaiSanDetail />,
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_THONG_KE_BAO_CAO_TAI_SAN_CONG_CU_DUNG_CU,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <ThongKeBaoCaoCongCuDungCu
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_THONG_KE_BAO_CAO_TAI_SAN_CO_DINH,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <ThongKeBaoCaoTaiSanCoDinh
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
// ];

// const routes_quan_ly_nghi_phep = [
//   {
//     path: url.URL_QUAN_LY_NGHI_PHEP,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <QuanLyNghiPhep
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_QUAN_LY_CONG_TAC,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <QuanLyCongTac
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },

//   {
//     path: url.URL_CAU_HINH_NGHI_PHEP,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <QuanLyCauHinhNghiPhep
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_THONG_KE_BAO_CAO_NGHI_PHEP,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <ThongKeBaoCaoNghiPhep
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
// ];

// const routes_quan_ly_doi_ngoai = [
//   {
//     path: url.URL_QUAN_LY_DOAN_VAO,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <QuanLyDoanVao
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_QUAN_LY_DOAN_RA,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <QuanLyDoanRa
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
// ];

// const routes_quan_ly_ke_hoach_tai_chinh = [
//   {
//     path: url.URL_QUAN_LY_KE_HOACH_TAI_CHINH_CHUYEN_MON,
//     exact: true,
//     main: () => (
//       <KeHoachTaiChinh
//         loaiKeHoach={constants.CONST_QLKHTC_LOAI_KE_HOACH.CHUYENMON}
//         key="CHUYENMON"
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//     titlePage: "Kế hoạch phòng chuyên môn",
//   },
//   {
//     path: url.URL_QUAN_LY_KE_HOACH_TAI_CHINH_TONG_HOP_NGUON_ATTP,
//     exact: true,
//     main: () => (
//       <KeHoachTaiChinh
//         loaiKeHoach={constants.CONST_QLKHTC_LOAI_KE_HOACH.TONGHOP}
//         nguonKinhPhi={constants.CONST_QLKHTC_NGUON_KINH_PHI.ATTP}
//         key="TONGHOP_ATTP"
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//     titlePage: "Kế hoạch Tổng hợp - Nguồn ATTP",
//   },
//   {
//     path: url.URL_QUAN_LY_KE_HOACH_TAI_CHINH_TONG_HOP_NGUON_KHAC,
//     exact: true,
//     main: () => (
//       <KeHoachTaiChinh
//         loaiKeHoach={constants.CONST_QLKHTC_LOAI_KE_HOACH.TONGHOP}
//         nguonKinhPhi={constants.CONST_QLKHTC_NGUON_KINH_PHI.KHAC}
//         key="TONGHOP_KHAC"
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//     titlePage: "Kế hoạch Tổng hợp - Nguồn khác",
//   },
//   {
//     path: url.URL_QUAN_LY_KE_HOACH_TAI_CHINH_TONG_HOP_NGUON_TONG_HOP,
//     exact: true,
//     main: () => (
//       <KeHoachTaiChinh
//         loaiKeHoach={constants.CONST_QLKHTC_LOAI_KE_HOACH.EGOV}
//         nguonKinhPhi={constants.CONST_QLKHTC_NGUON_KINH_PHI.TONGHOP}
//         key="TONGHOP_TONG_HOP"
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//     titlePage: "Kế hoạch Tổng hợp",
//   },
//   {
//     path: url.URL_QUAN_LY_KE_HOACH_TAI_CHINH_DETAIL,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <KeHoachTaiChinhDetail
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_QUAN_LY_TAI_CHINH,
//     exact: true,
//     main: () => <TaiChinh />,
//     requireAuth: true,
//     extendTemplate: true,
//   },

//   {
//     path: url.URL_QUAN_LY_TAI_CHINH_DETAIL,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <TaiChinhDetail
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
// ];

// const routes_quan_ly_attp_dia_phuong = [
//   {
//     path: url.URL_QUAN_LY_ATTP_DIA_PHUONG,
//     exact: true,
//     main: () => <QuanLyATTPDiaPhuong />,
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_KET_QUA_THANH_KIEM_TRA_ATTP,
//     exact: true,
//     main: () => <KetQuaThanhKiemTraATTP />,
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_KET_QUA_KIEM_NGHIEM_TP,
//     exact: true,
//     main: () => <KetQuaKiemNghiemTP />,
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_GOS_NHIEM_TPNN,
//     exact: true,
//     main: () => <GosNhiemTPNN />,
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_GOS_NHIEM_TPYT,
//     exact: true,
//     main: () => <GosNhiemTPYT />,
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_KET_QUA_THUC_HIEN_TTHC,
//     exact: true,
//     main: () => <KetQuaThucHienTTHC />,
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_QUAN_LY_CHO_SIEUTHI,
//     exact: true,
//     main: () => <QuanLyChoSieuThi />,
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_SU_DUNG_KINH_PHI_DIA_PHUONG,
//     exact: true,
//     main: () => <SuDungKinhPhiDiaPhuong />,
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_SU_DUNG_KINH_PHI_TRUNG_UONG,
//     exact: true,
//     main: () => <SuDungKinhPhiTrungUong />,
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_TONG_HOP_TINH_HINH_VPATTP,
//     exact: true,
//     main: () => <TongTinhHinhVSATTP />,
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_XAY_DUNG_CSVC_DIA_PHUONG,
//     exact: true,
//     main: () => <XayDungCSVCDiaPhuong />,
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_MAU_KIEM_NGHIEM,
//     exact: true,
//     main: () => <MauKiemNghiem />,
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_MAU_THUC_PHAM_NN,
//     exact: true,
//     main: () => <MauThucPhamNN />,
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_TRUYEN_THONG,
//     exact: true,
//     main: () => <TruyenThong />,
//     requireAuth: true,
//     extendTemplate: true,
//   },
// ];

// const routes_quan_ly_giam_sat_attp = [
//   {
//     path: url.URL_SU_KIEN,
//     exact: true,
//     main: () => <SuKien />,
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_GIAM_SAT_ATTP,
//     exact: true,
//     main: () => <GiamSatATTP />,
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_LOAI_SU_KIEN,
//     exact: true,
//     main: () => <LoaiSuKien />,
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_KE_HOACH_GIAM_SAT_ATTP,
//     exact: true,
//     main: () => <KeHoachGiamSatATTP />,
//     requireAuth: true,
//     extendTemplate: true,
//   },

//   {
//     path: url.URL_KE_HOACH_GIAM_SAT_ATTP_QUYET_DINH,
//     exact: true,
//     main: () => <KeHoachGiamSatATTP_QuyetDinh />,
//     requireAuth: true,
//     extendTemplate: true,
//   },

//   {
//     path: url.URL_CHI_TIET_SU_KIEN,
//     exact: true,
//     main: () => <ChiTietSuKien />,
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_KE_HOACH_GIAM_SAT_ATTP_DETAIL,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <KeHoachGiamSatATTPDetail
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_BAO_CAO_THONG_KE_SU_KIEN,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <BaoCaoThongKeSuKien
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_BAO_CAO_THONG_KE_CHI_TIET_SU_KIEN,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <BaoCaoThongKeChiTietSuKien
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },

//   {
//     path: url.URL_BAO_CAO_THONG_KE_GIAM_SAT_ATTP,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <BaoCaoThongKeGiamSatATTP
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_BAO_CAO_THONG_KE_KE_HOACH_GIAM_SAT,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <BaoCaoThongKeKeHoachGiamSat
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
// ];

// const routes_thong_ke_bao_cao_chinh_sach_phap_luat = [
//   {
//     path: url.URL_THONG_KE_DAU_TU_QUAN_LY_DIA_PHUONG,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <BaoCaoThongKeQuanLyAttpDiaPhuong
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_THONG_KE_MAU_KIEM_NGHIEM,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <BaoCaoThongKeMauKiemNghiem
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_THONG_KE_MAU_THUC_PHAM_NN,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <BaoCaoThongKeMauThucPhamNN
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_THONG_KE_DANH_MUC_TRUYEN_THONG,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <BaoCaoThongKeDanhMucTruyenThong
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_THONG_KE_KET_QUA_KIEM_NGHIEM_TP,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <BaoCaoThongKeKetQuaKiemNghiemTp
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_THONG_KE_KET_QUA_THANH_KIEM_TRA_ATTP,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <BaoCaoThongKeKetQuaThanhKiemTraAttp
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_THONG_KE_KET_QUA_THUC_HIEN_TTHC,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <BaoCaoThongKeKetQuaThucHienTTHC
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_THONG_KE_QUAN_LY_CHO_SIEU_THI,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <BaoCaoThongKeQuanLyChoSieuThi
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_THONG_KE_SU_DUNG_KINH_PHI_DIA_PHUONG,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <BaoCaoThongKeSuDungKinhPhiDiaPhuong
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_THONG_KE_SU_DUNG_KINH_PHI_TRUNG_UONG,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <BaoCaoThongKeSuDungKinhPhiTrungUong
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_THONG_KE_GOS_NHIEM_TPNN,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <BaoCaoThongKeGosNhiemTPNN
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_THONG_KE_GOS_NHIEM_TPYTE,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <BaoCaoThongKeGosNhiemTPYTE
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_THONG_KE_TONG_HOP_TINH_HINH_VSATTP,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <BaoCaoThongKeTongHopTinhHinhVSATTP
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_THONG_KE_XAY_DUNG_CSVC_DIA_PHUONG,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <BaoCaoThongKeXayDungCSVCDiaPhuong
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_QUAN_LY_TIEU_CHI_HANG_SAO,
//     // exact: true,
//     main: ({ match, history, location }) => (
//       <DanhMucTieuChi
//         match={match}
//         history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
// ];

// const routes_quan_ly_thong_tin_tieu_thuong_kdtp = [
//   {
//     path: url.URL_DANH_MUC_CHO,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <DanhMucCho
//         match={match}
//         // history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_DANH_MUC_CHO_DETAIL,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <DanhMucChoDetail
//         match={match}
//         // history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_NHOM_NGANH_HANG,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <NhomNganhHang
//         match={match}
//         // history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_HO_TIEU_THUONG,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <HoTieuThuong
//         match={match}
//         // history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
//   {
//     path: url.URL_BAO_CAO_HO_TIEU_THUONG,
//     exact: true,
//     main: ({ match, history, location }) => (
//       <BaoCaoDSHoTieuThuong
//         match={match}
//         // history={history}
//         location={location}
//         queryVariable={getQueryVariable(location)}
//       />
//     ),
//     requireAuth: true,
//     extendTemplate: true,
//   },
// ];

const routes_app = [
  ...routes_qrcode,
  ...routes_danh_muc,
  ...routes_quan_ly_co_so_san_xuat_kinh_doanh,
  // ...routes_quan_ly_van_ban_phap_luat,
  // ...routes_quan_ly_nhan_su,
  // ...routes_quan_ly_quy_trinh_nghiep_vu_thanh_tra,
  // ...routes_quan_ly_tiep_nhan_va_xu_ly_phan_anh_kien_nghi,
  // ...routes_quan_ly_quy_trinh_dieu_tra_xu_ly_ho_so_ngo_doc_thuc_pham,
  ...routes_quan_ly_cong_tac_giam_sat_o_nhiem,
  // ...routes_quan_ly_tham_dinh_ho_so_cap_giay_chung_nhan_attp,
  ...routes_quan_ly_thu_tuc_tu_cong_bo,
  // ...routes_quan_ly_xac_nhan_quang_cao,
  ...routes_quan_ly_chuoi_thuc_pham_an_toan,
  // ...routes_quan_ly_xac_nhan_kien_thuc_attp,
  // ...routes_bao_cao_tong_hop,
  // ...routes_quan_ly_bieu_mau,
  // ...routes_quan_ly_tai_san,
  // ...routes_quan_ly_nghi_phep,
  // ...routes_quan_ly_doi_ngoai,
  // ...routes_quan_ly_ke_hoach_tai_chinh,
  // ...routes_quan_ly_attp_dia_phuong,
  // ...routes_quan_ly_giam_sat_attp,
  // ...routes_thong_ke_bao_cao_chinh_sach_phap_luat,
  // ...routes_quan_ly_thong_tin_tieu_thuong_kdtp,
];

export default routes_app;
