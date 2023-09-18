/***
 *    CONSTRUCT
 *    API_...
 ***/

export const HOST_DANANG = "https://csdl-antoanthucpham.danang.gov.vn/";
export const HOST_DANANG_SOCKET =
  "https://csdl-antoanthucpham.danang.gov.vn:8765/socket";

export const HOST_UNIOFFICE = "http://csdlattp.unioffice.vn/";
export const HOST_UNIOFFICE_SOCKET = "http://csdlattp.unioffice.vn:8765/socket";

// export const HOST_LOCAL = "http://192.168.5.189:8070/"; //Api pc Lanhnt
// export const HOST_LOCAL = "http://192.168.5.185:8070/"; //Api pc Trangtth
// export const HOST_LOCAL = "http://192.168.5.189:8070/"; //Api pc Lanhnt
// export const HOST_LOCAL = "http://csdlattp.unioffice.vn/";
// export const HOST_LOCAL_SOCKET = "http://192.168.5.197:8070/socket";
// export const HOST_LOCAL = "http://192.168.5.186:8070/";
// export const HOST_LOCAL = "http://192.168.5.146:8070/"; //Api pc Binhpn
export const HOST_LOCAL = "http://192.168.1.5:8070/"; //Api pc Binhpn

export const HOST_LOCAL_SOCKET = "http://192.168.5.197:8070/socket";

const PORT = HOST_LOCAL;
export const SOCKET_PORT = HOST_UNIOFFICE_SOCKET;

const PORT_APP = PORT + "antoanthucpham/";
const PORT_APP_NGHIEP_VU = PORT + "nghiepvu/";

export const API_BAI_VIET = `${PORT}dungchung/baiviet`;
// ===== common =====
export const API_LOGIN = PORT + "uaa/oauth/token";
export const API_LOGIN_CASE = PORT + "uaa/login/cas/validticket";
export const API_CHECK_TOKEN = PORT + "uaa/oauth/check_token";
export const API_DESTROY_TOKEN = PORT + "uaa/users/revoke-token";
export const API_ACCOUNT_CURRENT_CHANGE_PASSWORD =
  PORT + "uaa/users/current/changepass";
export const API_ACCOUNT_CURRENT = PORT + "accounts/current/";
export const API_UPDATE_ACCOUNT_CURRENT = PORT + "accounts/";
export const API_MENU_LEFT = PORT + "uaa/permission/user";
export const API_PERMISSION = PORT + "uaa/permission";
export const API_PERMISSION_ALL = PORT + "uaa/permission/all";
export const API_ACCOUNT = PORT + "accounts/";
export const API_ACCOUNT_UNLOCK = (username) =>
  `${PORT}uaa/users/${username}/unblocked`;
export const API_ACCOUNT_GROUP = PORT + "accounts/group";
export const API_ACCOUNT_GROUP_PERMISSIONS = PORT + "uaa/group/";
export const API_SERVICE = PORT + "uaa/clients/oauthclients";
export const API_LOCALITY = PORT_APP + "diaban";
export const API_LOCALITY_GET_CHILDREN = (parentCode = "0") => {
  return `${API_LOCALITY}/${parentCode}/diabancon`;
};

export const API_QRCODE_VALID = (id) => PORT + `dungchung/qrcode/${id}`;
export const API_QRCODE_PUBLIC_VALID = (id) =>
  PORT + `dungchung/qrcode-public/${id}`;

export const API_NOTIFICATION = `${PORT}notification/`;

export const API_CAU_HINH = PORT_APP + "cauhinh";

export const API_DANHMUC_TTHC = PORT + "dungchung/gov/tracuu/danhmuctthc";
export const API_DANHMUC_CQQL = PORT + "dungchung/gov/tracuu/danhmuccqql";

export const API_LAY_THANH_PHAN_HO_SO_MOT_CUA =
  PORT + "dungchung/gov/tracuu/thanhphanhoso";
// sync process
export const API_SYNC_PROCESS_GET_STATUS = (jobCode) =>
  `${PORT_APP}job/${jobCode}`; //get
export const API_SYNC_PROCESS_RESET = (jobCode) =>
  `${PORT_APP}job/${jobCode}/reset`; //put
export const API_SYNC_PROCESS_START = (jobCode) =>
  `${PORT_APP}job/${jobCode}/start`; //post
export const API_SYNC_PROCESS_UPDATE = (jobCode, status) =>
  `${PORT_APP}job/${jobCode}/status/${status}`; //put

/**
 *    START_DM
 *        Địa bàn
 */
export const API_DIA_BAN = PORT_APP + "diaban";
export const API_DIA_BAN_TREE = PORT_APP + "diaban/tree";
export const API_DIA_BAN_GET_CHILDREN = (parentCode = "0") => {
  return `${API_DIA_BAN}/${parentCode}/diabancon`;
};
export const API_DIA_BAN_GET_CHILDREN_TREE = (parentCode = "0") => {
  return `${API_DIA_BAN}/${parentCode}/diabancon/steptree`;
};
/**
 *    END_DM
 */

/**
 *    attachFiles
 */
export const API_ATTACH_FILE = `${PORT}nghiepvu/attachfile`;
export const API_ATTACH_FILE_IMPORT = `${PORT}nghiepvu/tucongbosanpham/hosotucongbo/import/dssptucongbo`;
export const API_ATTACH_FILE_SP_OCOP_IMPORT = `${PORT}nghiepvu/tucongbosanpham/sanphamocop/import`;

export const API_CONVERT_HTML_TO_PDF_BASE64 = `${PORT}nghiepvu/convertfile/converthtml2pdf`;

export const API_VBDH_GET_FILE_DONG_BO = `${PORT}nghiepvu/filedongbo/laydanhsachfile`;

export const API_VBDH_THEM_MOI_CONG_VIEC = `${PORT}nghiepvu/hoso/themmoicongviectuhosocsdl`;
export const API_VBDH_THEM_MOI_CONG_VIEC_CAP_CGN = `${PORT}nghiepvu/hoso/themmoicongviectuhosocsdlbycgcn`;
export const API_VBDH_THEM_MOI_CONG_VIEC_KHTKT = `${PORT}nghiepvu/hoso/themmoicongviectukehoachthanhkiemtra`;
export const API_VBDH_THEM_MOI_CONG_VIEC_CTKT = `${PORT}nghiepvu/hoso/themmoicongviectucuocthanhkiemtra`;
export const API_VBDH_THEM_MOI_CONG_VIEC_QDTLDTKT = `${PORT}nghiepvu/hoso/themmoicongviectuquyetdinhthanhlapdoanthanhtra`;
export const API_VBDH_THEM_MOI_CONG_VIEC_KHTHTT = `${PORT}nghiepvu/hoso/themmoicongviectukehoachtienhanhthanhtra`;
export const API_VBDH_THEM_MOI_CONG_VIEC_KLCTKT = `${PORT}nghiepvu/hoso/themmoicongviectuketluanthanhtra`;
export const API_VBDH_THEM_MOI_CONG_VIEC_KHTDCGCN = `${PORT}nghiepvu/hoso/themmoicongviectukehoachthamdinh`;
export const API_VBDH_THEM_MOI_CONG_VIEC_HSTDBHCV = `${PORT}nghiepvu/hoso/themmoicongviectuhosothamdinh`;
export const API_VBDH_THEM_MOI_CONG_VIEC_KHTC = `${PORT}nghiepvu/hoso/themmoicongviectukehoachtaichinh`;
export const API_VBDH_THEM_MOI_CONG_VIEC_QDTLDGS = `${PORT}nghiepvu/hoso/themmoicongviectuquyetdinhthanhlapdoangiamsat`;

export const API_VBDH_THEM_MOI_CONG_VIEC_KHGSATTP = `${PORT}nghiepvu/hoso/themmoicongviectukehoachthanhgiamsatattp`;
export const API_VBDH_THEM_MOI_CONG_VIEC_KHGSATTP_QUYETDINH = `${PORT}nghiepvu/hoso/themmoicongviectuquyetdinhgiamsat`;

export const API_VBDH_HOSO = `${PORT}nghiepvu/hoso`;
export const API_VBDH_DONG_BO = `${PORT}nghiepvu/hoso/getdanhsachvanbandiforcsdl`;

export const API_MOTCUA_KETQUATHAMDINHHOSO = `${PORT}nghiepvu/motcua/ketquathamdinhhoso`;
export const API_MOTCUA_DONGBOHOSO = `${PORT}nghiepvu/capgiaychungnhanattp/hosocapgiaychungnhanattp/dongbo`;
/**
 *    START_QLCSSXKD
 *    Quản lý cơ sở sản xuất kinh doanh
 *        Danh mục
 */
export const API_LINH_VUC = PORT_APP + "linhvuc";
export const API_LOAI_HINH_CO_SO = PORT_APP + "loaihinhcoso";
export const API_LOAI_HINH_CO_SO_COUNT_CO_SO = PORT_APP + "linhvuc/cosolinhvuc";
export const API_PHONG_BAN = PORT_APP_NGHIEP_VU + "phongban";
export const API_QUOC_GIA = PORT_APP_NGHIEP_VU + "quocgia/danhmucquocgia";
export const API_DANH_MUC_CHO = PORT + "nghiepvu/danhmuc/cho";
export const API_NHOM_NGANH_HANG = PORT + "nghiepvu/danhmuc/nhomnganhhang";
export const API_HO_TIEU_THUONG = PORT + "nghiepvu/quanlycho/hotieuthuong";
export const API_LO_KINH_DOANH = PORT + "nghiepvu/quanlycho/lokinhdoanh";
export const API_BAO_CAO_HO_TIEU_THUONG =
  PORT + "nghiepvu/quanlycho/hotieuthuong/dsbaocaohotieuthuong";
export const API_EXPORT_BAO_CAO_HO_TIEU_THUONG =
  PORT + "nghiepvu/quanlycho/hotieuthuong/export/dsbaocaohotieuthuong";
export const API_DOAN_THAM_DINH = PORT + "nghiepvu/danhmuc/doanthamdinh";

const PORT_QUAN_LY_TAI_SAN = PORT_APP_NGHIEP_VU + "qltaisan/";
export const API_QUAN_LY_TAI_SAN = PORT_QUAN_LY_TAI_SAN + "taisan";
export const API_QUAN_LY_TAI_SAN_LIST_DETAIL = (id) =>
  `${PORT_QUAN_LY_TAI_SAN}taisan/${id}/chitiet`;
export const API_QUAN_LY_CAP_PHAT_TAI_SAN = PORT_QUAN_LY_TAI_SAN + "capphat";
export const API_QUAN_LY_TAI_SAN_LICH_SU_CAP_PHAT = (id) =>
  `${PORT_QUAN_LY_TAI_SAN}capphat/lichsu/${id}`;

export const API_QUAN_LY_SUA_CHUA_TAI_SAN = PORT_QUAN_LY_TAI_SAN + "suachua";
export const API_QUAN_LY_TAI_SAN_LICH_SU_SUA_CHUA = (id) =>
  `${PORT_QUAN_LY_TAI_SAN}suachua/lichsu/${id}`;

export const API_QUAN_LY_DANH_MUC_LOAI_TAI_SAN =
  PORT_QUAN_LY_TAI_SAN + "loaitaisan";
export const API_QUAN_LY_FILE_UPLOAD =
  PORT_QUAN_LY_TAI_SAN + "loaitaisan/file/uploadfile/";
export const API_QUAN_LY_FILE_DOWLOAD = (id) =>
  PORT_QUAN_LY_TAI_SAN + `loaitaisan/downloadfile/${id}`;

export const API_QUAN_LY_TAI_SAN_NHOM_TAI_SAN =
  PORT_QUAN_LY_TAI_SAN + "danhmuc/nhomtaisan";
export const API_QUAN_LY_TAI_SAN_CHI_TIET = PORT_QUAN_LY_TAI_SAN + "taisan";

/**
 *    Quản lý dối ngoại
 *        quản lý đoàn vào
 */
const PORT_QUAN_LY_QUOC_GIA = PORT_APP_NGHIEP_VU + "quocgia/";
const PORT_QUAN_LY_DOI_NGOAI = PORT_APP_NGHIEP_VU + "qldoinoidoingoai/";
export const API_QUAN_LY_DOAN_VAO = PORT_QUAN_LY_DOI_NGOAI + "doanvao";
export const API_DANH_MUC_QUOC_GIA = PORT_QUAN_LY_QUOC_GIA + "danhmucquocgia";

// quản lý đoàn ra
export const API_QUAN_LY_DOAN_RA = PORT_QUAN_LY_DOI_NGOAI + "doanra";

/**
 *    Quản lý nghỉ phép
 *        nghỉ phép
 */
const PORT_QUAN_LY_NGHI_PHEP = PORT_APP_NGHIEP_VU + "qlchamcong/";
export const API_QUAN_LY_NGHI_PHEP =
  PORT_QUAN_LY_NGHI_PHEP + "thongtinnghiphep";
export const API_QUAN_LY_CONG_TAC = PORT_QUAN_LY_NGHI_PHEP + "congtac";
export const API_CAU_HINH_NGHI_PHEP = PORT_APP_NGHIEP_VU + "qlchamcong/cauhinh";

/**
 *    Quản lý cơ sở sản xuất kinh doanh
 *        Cơ sở sản xuất kinh doanh
 */
export const API_CO_SO_SAN_XUAT_KINH_DOANH1 = PORT_APP + "coso/all";
export const API_CO_SO_SAN_XUAT_KINH_DOANH = PORT_APP + "coso";
export const API_CO_SO_SAN_XUAT_KINH_DOANH_CHECKEXIST =
  PORT_APP + "coso/goiytrung";
export const API_CO_SO_SAN_XUAT_KINH_DOANH_EXPORT =
  PORT_APP + "/baocaothongke/danhsachcoso/export";
export const API_CO_SO_SAN_XUAT_KINH_DOANH_REPORT =
  PORT_APP + "/baocaothongke/danhsachcoso";
export const API_CO_SO_SAN_XUAT_KINH_DOANH_EXPORT_GCNATTP = (id) =>
  PORT_APP + `coso/${id}/export/giaychungnhanattp`;
export const API_CO_SO_SAN_XUAT_KINH_DOANH_THONG_KE_BAO_CAO =
  PORT_APP + "baocaothongke/cosotheogiaychungnhan";
export const API_CO_SO_SAN_XUAT_KINH_DOANH_THONG_KE_BAO_CAO_DOWNLOAD =
  API_CO_SO_SAN_XUAT_KINH_DOANH_THONG_KE_BAO_CAO + "/export-excel";
export const API_CO_SO_SAN_XUAT_KINH_DOANH_KIEM_TRA_CO_SO =
  PORT_APP + "coso/kiemtra";

export const API_CSSXKD_QUAN_HUYEN = PORT_APP + "coso/quanly/";
// export const API_CSSXKD_QUAN_HUYEN = "https://csdlquanhuyen.danang.gov.vn/";

/**
 *    Quản lý cơ sở sản xuất kinh doanh
 *        Hồ sơ tiếp nhận một cửa
 */
export const API_HO_SO_TIEP_NHAN_MOT_CUA =
  PORT_APP + "coso/hosomotcuatiepnhan/danhsach";
export const API_HO_SO_TIEP_NHAN_MOT_CUA_DOWNLOAD =
  PORT_APP + "baocaothongke/danhsachcapgiaychungnhanattp/export";
export const API_HO_SO_TIEP_NHAN_MOT_CUA_CHECKEXIST_CO_SO = (hoSoMotCuaId) =>
  `${PORT_APP}coso/hosomotcuatiepnhan/${hoSoMotCuaId}/checkexist`;
export const API_HO_SO_TIEP_NHAN_MOT_CUA_CHECKEXIST_HO_SO = (hoSoMotCuaId) =>
  `${PORT}nghiepvu/capgiaychungnhanattp/hosocapgiaychungnhanattp/hosomotcuatiepnhan/${hoSoMotCuaId}/checkexist`;
/**
 *    END_QLCSSXKD
 */

/**
 *    START_QLVBPL
 *    Quản lý văn bản pháp luật
 */
export const API_VAN_BAN_PHAP_LUAT = PORT + "vanbanphapluat/";
export const API_VAN_BAN_PHAP_LUAT_UPLOAD = PORT + "vanbanphapluat/uploadfile/";
export const API_VAN_BAN_PHAP_LUAT_DOWNLOAD =
  PORT + "vanbanphapluat/downloadfile/";
export const API_VBPL_LINH_VUC = PORT + "vanbanphapluat/linhvuc/";
/**
 *    END_QLVBPL
 */

/**
 *    THONG TIN CA NHAN NGHI PHEP
 *    Quản lý thong tin ca nhân nghỉ phep
 */
export const API_THONG_TIN_CA_NHAN_NGHI_PHEP =
  PORT_APP_NGHIEP_VU + "qlchamcong/thongtinnghiphep/user/current";
export const API_THONG_TIN_CA_NHAN_CONG_TAC =
  PORT_APP_NGHIEP_VU + "qlchamcong/congtac/user/current";

export const API_THONG_TIN_NGHI_PHEP =
  PORT_APP_NGHIEP_VU + "qlchamcong/thongtinnghiphep";
export const API_THONG_TIN_CONG_TAC = PORT_APP_NGHIEP_VU + "qlchamcong/congtac";
export const API_BAO_CAO_THONG_KE_NGHI_PHEP =
  PORT + "nghiepvu/qlchamcong/thongtinnghiphep";
/**
 *    END_QLVBPL
 */

/**
 *    START_QLNS
 *    Quản lý nhân sự
 */
const PORT_NHANSU = PORT + "nghiepvu/qlchamcong/";
export const API_NHAN_SU = PORT_NHANSU + "hosonhansu";
export const API_NHAN_SU_DETAIL = (nhanSuId) =>
  `${API_NHAN_SU}/${nhanSuId}/chitiet`;
export const API_PHONG_BAN_NHAN_SU = PORT_NHANSU + "phongban";
export const API_DANHHIEU_THIDUA = PORT_NHANSU + "danhhieuthidua";
export const API_CHUONGTRINH_DAOTAOTAPHUAN =
  PORT_NHANSU + "chuongtrinhdaotaotaphuan";
export const API_THONGTIN_KHENTHUONG = PORT_NHANSU + "thongtinkhenthuong";
export const API_THONGTIN_KHENTHUONG_DS_NHANSU = (khenThuongId) =>
  `${API_THONGTIN_KHENTHUONG}/${khenThuongId}/danhsachnhansu`;
export const API_THONGTIN_KHENTHUONG_DS_PHONGBAN = (khenThuongId) =>
  `${API_THONGTIN_KHENTHUONG}/${khenThuongId}/danhsachphongban`;
export const API_THONGTIN_NGHIPHEP = PORT_NHANSU + "thongtinnghiphep";
export const API_THONGTIN_NGHIPHEP_DS_PHEDUYET = `${API_THONGTIN_NGHIPHEP}/user/current/pheduyet`;
export const API_THONGTIN_TAISANCONG = PORT_NHANSU + "thongtintaisancong";
export const API_THONGTIN_DAOTAOTAPHUAN = (chuongTrinhId) =>
  `${PORT_NHANSU}chuongtrinhdaotaotaphuan/${chuongTrinhId}/danhsachnhansu`;
/**
 *    END_QLNS
 */

/**
 *    START_QLQTNVTT
 *    Quy trình nghiệp vụ thanh tra
 */
const POST_THANH_TRA = PORT + "nghiepvu/congtacthanhkiemtra/";
export const API_QTNVTT_KE_HOACH_THANH_TRA =
  POST_THANH_TRA + "kehoachthanhkiemtra";
export const API_QTNVTT_KE_HOACH_THANH_TRA_PHE_DUYET = (trangThaiPheDuyet) =>
  `${POST_THANH_TRA}kehoachthanhkiemtra/pheduyet/${trangThaiPheDuyet}`;
export const API_QTNVTT_KE_HOACH_THANH_TRA_DOWNLOAD = (id) =>
  `${POST_THANH_TRA}kehoachthanhkiemtra/${id}/download`;
export const API_QTNVTT_CUOC_THANH_TRA = POST_THANH_TRA + "cuocthanhkiemtra";
export const API_QTNVTT_CUOC_THANH_TRA_KET_LUAN =
  POST_THANH_TRA + "cuocthanhkiemtra/ketluan";
export const API_QTNVTT_CUOC_THANH_TRA_PHE_DUYET = (trangThaiPheDuyet) =>
  `${POST_THANH_TRA}cuocthanhkiemtra/pheduyet/${trangThaiPheDuyet}`;
export const API_QTNVTT_CUOC_THANH_TRA_DOWNLOAD = (id) =>
  POST_THANH_TRA + `baocaothongke/danhsachcosotheocuocthanhkiemtra/${id}`;
export const API_QTNVTT_CUOC_THANH_TRA_CO_SO =
  API_QTNVTT_CUOC_THANH_TRA + "/coso";
export const API_QTNVTT_BIEN_BAN_THANH_TRA =
  POST_THANH_TRA + "bienbanthanhkiemtra";
export const API_QTNVTT_BIEN_BAN_THANH_TRA_CHI_TIET_VI_PHAM_DOWNLOAD = (nam) =>
  POST_THANH_TRA + `baocaothongke/thongkexuphatviphamhanhchinhattp/${nam}`;
export const API_QTNVTT_DOAN_THANH_TRA = POST_THANH_TRA + "doanthanhtra";
export const API_QTNVTT_TKBC_DSCS =
  POST_THANH_TRA + `baocaothongke/xemdanhsachcosotheocuocthanhkiemtra/`;
export const API_QTNVTT_TKBC_DSCS_CTKT =
  POST_THANH_TRA + `baocaothongke/xemdanhsachcosotheocuocthanhkiemtra/`;
export const API_QTNVTT_TKBC_DSCS_DB =
  POST_THANH_TRA + `baocaothongke/xemdanhsachcosotheodiaban/`;
export const API_QTNVTT_TKBC_TTPC = POST_THANH_TRA + `thongtindoanthanhkiemtra`;
export const API_QTNVTT_TKBC_DSCS_DOWNLOAD =
  POST_THANH_TRA + `baocaothongke/danhsachcosotheocuocthanhkiemtra/`;
export const API_QTNVTT_TKBC_CTVP =
  POST_THANH_TRA + `baocaothongke/xemthongkexuphatviphamhanhchinhattp`;
export const API_QTNVTT_TKBC_CTVP_DOWNLOAD = (nam) =>
  POST_THANH_TRA + `baocaothongke/thongkexuphatviphamhanhchinhattp/${nam}`;
export const API_QTNVTT_LICH_SU_CUOC_KIEM_TRA = (idCoSo) =>
  API_QTNVTT_CUOC_THANH_TRA + `/lichsukiemtra/${idCoSo}`;

export const API_QTNVTT_CUOCTHANHTRA_DOWNLOAD_COSO =
  POST_THANH_TRA + "baocaothongke/danhsachcosotheocuocthanhkiemtra/";

export const API_QTNVTT_CUOCTHANHTRA_QUYET_DINH_THANH_LAP_DOAN_THANH_TRA =
  POST_THANH_TRA + "cuocthanhkiemtra/quyetdinhthanhlapdoan";

export const API_QTNVTT_UPLOADFILE =
  POST_THANH_TRA + "bienbanthanhkiemtra/uploadfile/";
export const API_QTNVTT_DOWNLOADFILE = (id) =>
  POST_THANH_TRA + "bienbanthanhkiemtra/dowloadfile/" + id;

export const API_QTNVTT_CUOC_THANH_TRA_NHIEM_VU = `${API_QTNVTT_CUOC_THANH_TRA}/congviecthanhkiemtra`;
export const API_QTNVTT_CUOC_THANH_TRA_NHIEM_VU_ALL = `${API_QTNVTT_CUOC_THANH_TRA}/tatcacongviecthanhkiemtra`;
export const API_QTNVTT_CUOC_THANH_TRA_DM_NHIEM_VU = `${API_QTNVTT_CUOC_THANH_TRA}/congviecthanhkiemtra/danhmuccongviecthanhkiemtra`;

export const API_QTNVTT_CUOC_THANH_TRA_XEP_HANG_DANH_GIA = `${API_QTNVTT_CUOC_THANH_TRA_NHIEM_VU}/xephangdanhgiacoso`;
export const API_QTNVTT_CUOC_THANH_TRA_XEP_HANG = (idCuocThanhTra) =>
  `${API_QTNVTT_CUOC_THANH_TRA_NHIEM_VU}/xephangdanhgiacoso/${idCuocThanhTra}`;
export const API_QTNVTT_CUOC_THANH_TRA_XEP_HANG_BY_ACCOUNT = (idCuocThanhTra) =>
  `${API_QTNVTT_CUOC_THANH_TRA_NHIEM_VU}/xephangdanhgiacosotheoaccount/${idCuocThanhTra}`;

export const API_QTNVTT_CUOC_THANH_TRA_UU_NHUOC_DIEM = `${API_QTNVTT_CUOC_THANH_TRA_NHIEM_VU}/ykiencongviecthanhkiemtra`;
export const API_QTNVTT_CUOC_THANH_TRA_MAU_KIEM_TRA = `${POST_THANH_TRA}/maukiemtra`;
export const API_QTNVTT_CUOC_THANH_TRA_MAU_KIEM_TRA_UPLOADFILE =
  POST_THANH_TRA + "maukiemtra/file/uploadfile/";
export const API_QTNVTT_CUOC_THANH_TRA_MAU_KIEM_TRA_DOWNLOADFILE = (id) =>
  POST_THANH_TRA + "maukiemtra/downloadfile/" + id;
/**
 *    END_QLQTNVTT
 */

/**
 *    START_QLCTGSONTP
 *    Quản lý công tác giám sát ô nhiễm thực phẩm
 */
const PORT_QUANLY_ONTP = PORT + "nghiepvu/qlonhiemthucpham/";
export const API_DOT_KIEM_TRA = PORT_QUANLY_ONTP + "dotkiemtra";
export const API_DOT_KIEM_TRA_TIEU_CHI = (id) =>
  `${API_DOT_KIEM_TRA}/chitieugiamsat/${id}/cactieuchi`;
export const API_DOT_KIEM_TRA_DANH_GIA_MAU =
  API_DOT_KIEM_TRA + "/chitieu/danhgia";
export const API_QL_DM_LOAI_THUC_PHAM = PORT_QUANLY_ONTP + "loaithucpham";
export const API_QL_DM_CHI_TIEU = PORT_QUANLY_ONTP + "chitieu";
export const API_QLCT_GS_ONTP_THONG_KE_BAO_CAO =
  PORT_QUANLY_ONTP + "giamsat/thongke";
export const API_QLCT_GS_ONTP_EXPORT = PORT_QUANLY_ONTP + "export";
export const API_QLONTP_CUOC_GIAM_SAT = PORT_QUANLY_ONTP + "cuocgiamsat";
export const API_QLONTP_CUOC_GIAM_SAT_PHE_DUYET = (trangThaiPheDuyet) =>
  `${PORT_QUANLY_ONTP}cuocgiamsat/pheduyet/${trangThaiPheDuyet}`;
/**
 *    END_QLCTGSONTP
 */

/**
 *    START_QLTNVXLPAKN
 *    Quản lý tiếp nhận xử lý phản ánh kiến nghị
 */
const PORT_PAKN = PORT + "nghiepvu/tiepnhanvaxulyphananhkiennghi/";
export const API_PAKN_HO_SO = PORT_PAKN + "hosophananhkiennghi";
export const API_PAKN_HO_SO_TRINH_PHE_DUYET =
  PORT_PAKN + "hosophananhkiennghi/trinhpheduyet";
export const API_PAKN_HO_SO_CHUYEN_XU_LY =
  PORT_PAKN + "hosophananhkiennghi/chuyenxuly";
export const API_PAKN_HO_SO_PHE_DUYET =
  PORT_PAKN + "hosophananhkiennghi/pheduyet";
export const API_PAKN_HO_SO_KHONG_PHE_DUYET =
  PORT_PAKN + "hosophananhkiennghi/khongpheduyet";
export const API_PAKN_BIEN_BAN_THANH_TRA = PORT_PAKN + "bienbanthanhtra";
export const API_PAKN_BIEN_BAN_XU_PHAT = PORT_PAKN + "bienbanxuphat";
export const API_PAKN_BIEN_BAN_THANH_TRA_KET_QUA =
  API_QTNVTT_BIEN_BAN_THANH_TRA + "/hosophandanhkiennghi";
/**
 *    END_QLTNVXLPAKN
 */

/**
 * START_QLQTDTXLNDTP
 * Quy trình điều tra, xử lý ngộ độc thực phẩm
 */
export const API_QTDT_XL_NDTP = PORT + "nghiepvu/ngodocthucpham";
export const API_QTDT_XL_NDTP_UPLOAD_FILE =
  PORT + "nghiepvu/ngodocthucpham/file/uploadfile/";
export const API_QTDT_XL_NDTP_DOWNLOAD_FILE = (id) =>
  PORT + "nghiepvu/ngodocthucpham/downloadfile/" + id;
export const API_HO_SO_NGO_DOC_THUC_PHAM_DS_COSO =
  API_QTDT_XL_NDTP + "/hosongodoc/coso/list";
export const API_HO_SO_NGO_DOC_THUC_PHAM = API_QTDT_XL_NDTP + "/hosongodoc";
export const API_DIEU_TRA_NGO_DOC_THUC_PHAM =
  API_QTDT_XL_NDTP + "/dieutrangodoc";
export const API_XU_LY_NGO_DOC_THUC_PHAM = API_QTDT_XL_NDTP + "/xulyngodoc";
export const API_CHI_TIET_XU_LY_NDTP = API_QTDT_XL_NDTP + "/chitietxuly";
export const API_QTDTXL_NDTP_THONG_KE_BAO_CAO =
  API_QTDT_XL_NDTP + "/ngodocthucpham/thongke";
export const API_QTDTXL_NDTP_THONG_KE_BAO_CAO_CHI_TIET =
  API_QTDT_XL_NDTP + "/ngodocthucpham/thongkechitiet";
export const API_QTDTXL_NDTP_EXPORT =
  API_QTDT_XL_NDTP + "/ngodocthucpham/export-excel";
export const API_QTDTXL_NDTP_EXPORT_CHI_TIET =
  API_QTDT_XL_NDTP + "/ngodocthucpham/chitiet/export-excel";
/**
 *    END_QLQTDTXLNDTP
 */

/**
 *    START_QLTTTCB
 *    Quản lý thủ tục tự công bố
 *        Hồ sơ thủ tục tự công bố
 */
export const API_TU_CONG_BO = PORT + "nghiepvu/tucongbosanpham";
export const API_HO_SO_TU_CONG_BO = API_TU_CONG_BO + "/hosotucongbo";
export const API_THONG_BAO_HO_SO_TU_CONG_BO =
  API_TU_CONG_BO + "/thongbaocongbosanpham";
export const API_THONG_BAO_CONG_BO_YEU_CAU_BO_SUNG_HO_SO =
  API_THONG_BAO_HO_SO_TU_CONG_BO + "/capnhattrangthai";
export const API_HO_SO_TU_CONG_BO_BIEN_BAN_HAU_KIEM =
  API_HO_SO_TU_CONG_BO + "/bienbanhaukiem";
export const API_HO_SO_TU_CONG_BO_EXPORT = (id) =>
  `${API_TU_CONG_BO}/${id}/export/giayxacnhan`;
export const API_HO_SO_TU_CONG_BO_DS = (id) =>
  `${API_HO_SO_TU_CONG_BO}/${id}/bienbanhaukiem`;
export const API_HO_SO_TU_CONG_BO_THONGKE =
  API_TU_CONG_BO + "/hosotucongbo/thongke";
export const API_HO_SO_TU_CONG_BO_THONGKE_DOWNLOAD =
  API_TU_CONG_BO + "/hosotucongbo/export-excel";
export const API_HO_SO_TU_CONG_BO_OCOP = API_TU_CONG_BO + "/dssanphamocop";
export const API_HO_SO_TU_CONG_BO_OCOP_DEL =
  API_TU_CONG_BO + "/sanphamocop/del";
export const API_HO_SO_TU_CONG_BO_OCOP_FILE_MAU =
  API_TU_CONG_BO + "/sanphamocop/export/tempalte";

export const API_TCB_NHOM = API_TU_CONG_BO + "/danhmucnhom";
export const API_TCB_NHOM_PHAN_NHOM = API_TU_CONG_BO + "/danhmucphannhom";
/**
 *    Quản lý thủ tục tự công bố
 *        Công tác hậu kiểm
 */
export const API_CONG_TAC_HAU_KIEM = API_TU_CONG_BO + "/kehoachhaukiem";
export const API_CONG_TAC_HAU_KIEM_PHE_DUYET = (trangThaiPheDuyet) =>
  `${API_CONG_TAC_HAU_KIEM}/pheduyet/${trangThaiPheDuyet} `;
export const API_CONG_TAC_HAU_KIEM_EXPORT = (id) =>
  `${API_CONG_TAC_HAU_KIEM}/${id}/export/danhsachhosotucongbosanpham`;
export const API_CONG_TAC_HAU_KIEM_HO_SO_TU_CONG_BO_UPDATE = (id) =>
  `${API_CONG_TAC_HAU_KIEM}/${id}/hosotucongbo`;
/**
 *    END_QLTTTCB
 */

/**
 *    START_QLTDCGCNATTP
 *    Quản lý thẩm định cấp giấy chứng nhận an toàn thực phẩm
 */
const API_CAP_GIAY_CHUNG_NHAN_ATTP = PORT + "nghiepvu/capgiaychungnhanattp";
export const API_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_CHART =
  API_CAP_GIAY_CHUNG_NHAN_ATTP +
  "/hosocapgiaychungnhanattp/thongkecosocapgiaychungnhan";
export const API_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP =
  API_CAP_GIAY_CHUNG_NHAN_ATTP + "/hosocapgiaychungnhanattp";
export const API_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_REPORT =
  API_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP + "/tonghopsolieuxuly";
export const API_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_EXPORT =
  API_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_REPORT + "/export-excel";
export const API_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_DONG_BO =
  API_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP + "/dongbo";
export const API_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_BIEN_BAN_THAM_DINH =
  API_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP + "/bienbanthamdinh";
export const API_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_BIEN_BAN_THAM_DINH_DS = (id) =>
  `${API_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP}/${id}/bienbanthamdinh`;
export const API_KE_HOACH_THAM_DINH_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP =
  API_CAP_GIAY_CHUNG_NHAN_ATTP + "/kehoachthamdinh";
export const API_KE_HOACH_THAM_DINH_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_DS = (id) =>
  `${API_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP}?searchData = idKeHoachThamDinh % 3D${id} `;
export const API_KE_HOACH_THAM_DINH_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_EXPORT = (
  id
) =>
  `${API_KE_HOACH_THAM_DINH_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP}/${id}/export/danhsachcapgiaychungnhanattp`;
export const API_KE_HOACH_THAM_DINH_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_DSHS_EXPORT = (
  id
) =>
  `${API_KE_HOACH_THAM_DINH_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP}/hosocgcn/chitietkehoach/export/${id}`;
export const API_KE_HOACH_THAM_DINH_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_UPDATE = (
  id
) =>
  `${API_KE_HOACH_THAM_DINH_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP}/${id}/hosocapgiaychungnhan`;
export const API_KE_HOACH_THAM_DINH_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_DELETE_HO_SO = (
  id
) =>
  `${API_KE_HOACH_THAM_DINH_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP}/hosocapgiaychungnhan/${id}`;
export const API_KE_HOACH_THAM_DINH_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_PHEDUYET = (
  trangThaiPheDuyet
) =>
  `${API_KE_HOACH_THAM_DINH_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP}/pheduyet/${trangThaiPheDuyet} `;
export const API_KE_HOACH_THAM_DINH_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_YEUCAUBOSUNG = `${API_KE_HOACH_THAM_DINH_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP}/bosung/hosocapgiaychungnhan`;

export const API_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_DOAN_THAM_DINH = (id) =>
  `${API_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP}/doanthamdinh/${id}`;
export const API_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_DOAN_THAM_DINH_UPDATE = (id) =>
  `${API_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP}/${id}/doanthamdinh`;

export const API_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_EXPORT_GCNATTP = (id) =>
  `${API_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP}/exportgiaychungnhan/${id}`;

// Quyết định thành lập đoàn thẩm định
export const API_KE_HOACH_THAM_DINH_GIAY_CHUNG_NHAN_ATTP_QDTLDTD = (id) =>
  `${API_KE_HOACH_THAM_DINH_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP}/hosocgcn/${id}/exportquyetdinh`;

/**
 *    Nhiệm vụ
 */

export const API_HO_SO_CAP_GCN_NHIEM_VU = (idHoSo) =>
  `${API_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP}/congvieckiemdinh/${idHoSo}`;
export const API_HO_SO_CAP_GCN_DM_NHIEM_VU = `${API_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP}/congvieckiemdinh/danhmuccongviec`;
/**
 *    END_QLTDCGCNATTP
 */

/**
 *    START_QLXNQC
 *    Quản lý xác nhận quảng cáo
 */
const PORT_QUANLY_XNQC = PORT + "nghiepvu/xacnhanquangcao/";
export const API_XAC_NHAN_QUANG_CAO = PORT_QUANLY_XNQC + "hosoquangcao";
export const API_XAC_NHAN_QUANG_CAO_CAP_SO =
  PORT_QUANLY_XNQC + "hosoquangcao/sanpham/capsophieu";
export const API_XNQC_BAO_CAO_THONG_KE =
  PORT_QUANLY_XNQC + "xacnhanquangcao/thongke";
export const API_XNQC_EXPORT =
  PORT_QUANLY_XNQC + "xacnhanquangcao/export-excel";
/**
 *    END_QLXNQC
 */

/**
 *    START_QLCTPAT
 *    Quản lý chuỗi thực phẩm an toàn
 */
const PORT_CHUOI_THUC_PHAM_AN_TOAN = PORT + "nghiepvu/chuoithucphamantoan/";
export const API_NHOM_CHUOI_THUC_PHAM =
  PORT_CHUOI_THUC_PHAM_AN_TOAN + "nhomchuoithucpham";
export const API_HO_SO_CHUOI_THUC_PHAM =
  PORT_CHUOI_THUC_PHAM_AN_TOAN + "hosochuoithucpham";
export const API_HO_SO_CHUOI_THUC_PHAM_BIEN_BAN_THAM_DINH =
  API_HO_SO_CHUOI_THUC_PHAM + "/bienbanthamdinh";
export const API_HO_SO_CHUOI_THUC_PHAM_BIEN_BAN_THAM_DINH_DS = (id) =>
  `${API_HO_SO_CHUOI_THUC_PHAM}/${id}/bienbanthamdinh`;
export const API_KE_HOACH_THAM_DINH_CTP =
  PORT_CHUOI_THUC_PHAM_AN_TOAN + "kehoachthamdinh";
export const API_KE_HOACH_THAM_DINH_CTP_BAN_HANH = (id) =>
  `${API_KE_HOACH_THAM_DINH_CTP}/${id}/raquyetdinhthamdinh`;
export const API_KE_HOACH_THAM_DINH_CTP_HO_SO_CTP_DS = (id) =>
  `${API_HO_SO_CHUOI_THUC_PHAM}?searchData = idKeHoachThamDinh % 3D${id} `;
export const API_KE_HOACH_THAM_DINH_CTP_EXPORT = (id) =>
  `${API_KE_HOACH_THAM_DINH_CTP}/${id}/export/danhsachcapgiaychungnhanchuoi`;
export const API_KE_HOACH_THAM_DINH_CTP_UPDATE = (id) =>
  `${API_KE_HOACH_THAM_DINH_CTP}/${id}/hosochuoithucpham`;
export const API_KE_HOACH_THAM_DINH_CTP_PHE_DUYET = (trangThaiPheDuyet) =>
  `${API_KE_HOACH_THAM_DINH_CTP}/pheduyet/${trangThaiPheDuyet} `;
export const API_CHUOI_THUCPHAM_ANTOAN_REPORT =
  PORT_CHUOI_THUC_PHAM_AN_TOAN + "thongke/tonghopsolieuxuly";
export const API_CHUOI_THUCPHAM_ANTOAN_REPORT_EXPORT_EXCEL =
  API_CHUOI_THUCPHAM_ANTOAN_REPORT + "/export-excel";
/**
 *    END_QLCTPAT
 */

/**
 *    START_QLXNKTATTP
 *    Quản lý xác nhận kiến thức an toàn thực phẩm
 */
const PORT_QUANLY_XNKTATTP = PORT + "nghiepvu/kienthucantoanthucpham/";
export const API_XAC_NHAN_KIEN_THUC_ATTP_HSXN =
  PORT_QUANLY_XNKTATTP + "hosoxacnhan";
export const API_XAC_NHAN_KIEN_THUC_ATTP_HSXN_CAP_SO =
  API_XAC_NHAN_KIEN_THUC_ATTP_HSXN + "/capso";
export const API_XAC_NHAN_KIEN_THUC_ATTP_DXN =
  PORT_QUANLY_XNKTATTP + "dotxacnhan";
export const API_XAC_NHAN_KIEN_THUC_ATTP_DXN_PHEDUYET =
  PORT_QUANLY_XNKTATTP + "dotxacnhan/pheduyet";
export const API_DS_HO_SO_XAC_NHAN_KIEN_THUC_BY_ID_CO_SO = (id) =>
  `${API_XAC_NHAN_KIEN_THUC_ATTP_HSXN}/coso/${id} `;
export const API_XAC_NHAN_KIEN_THUC_ATTP_THONG_KE =
  PORT_QUANLY_XNKTATTP + "thongke";
export const API_XAC_NHAN_KIEN_THUC_ATTP_EXPORT =
  PORT_QUANLY_XNKTATTP + "export-excel";
export const API_XAC_NHAN_KIEN_THUC_ATTP_DXN_CAP_SO =
  PORT_QUANLY_XNKTATTP + "dotxacnhan/capso";
export const API_DS_HO_SO_XAC_NHAN_KIEN_THUC_BY_LOAI =
  PORT_QUANLY_XNKTATTP + "dotxacnhan/loai/CaNhan";
/**
 *    END_QLXNKTATTP
 */
/**
 *    START_BCTH
 *    Báo cáo tổng hợp
 */
export const API_BAO_CAO_TONG_HOP = PORT + "baocaotonghop/baocao";
export const API_BAO_CAO_TONG_HOP_TEMPLATE = PORT + "baocaotonghop/maubaocao";
export const API_BAO_CAO_TONG_HOP_EXPORT = (id) =>
  PORT + `baocaotonghop/baocao/${id}/export`;

export const API_BAO_CAO_THONG_KE_CAP_GIAY_CHUNG_NHAN_ATTP =
  PORT + `baocaotonghop/thongke/congtaccapgiaychungnhanattp`;
export const API_BAO_CAO_THONG_KE_CAP_GIAY_CHUNG_NHAN_ATTP_EXPORT =
  PORT + `baocaotonghop/thongke/congtaccapgiaychungnhanattp/export`;
export const API_BAO_CAO_THONG_KE_CONG_TAC_GIAM_SAT_ONTP =
  PORT + `baocaotonghop/thongke/congtacgiamsatonhiemthucpham/export`;
export const API_BAO_CAO_THONG_KE_CONG_TAC_THANH_KIEM_TRA =
  PORT + `baocaotonghop/thongke/congtacthanhkiemtra/export`;
export const API_BAO_CAO_THONG_KE_CO_SO_THANH_KIEM_TRA =
  PORT + `nghiepvu/congtacthanhkiemtra/baocaothongke/baocaotonghopcoso/`;
export const API_BAO_CAO_THONG_KE_CONG_TAC_TU_CONG_BO_SP =
  PORT + `baocaotonghop/thongke/congtactucongbosanpham/export`;
/**
 *    END_BCTH
 */

/**
 *    START QLBM
 *    Quản lý biểu mẫu
 */
export const API_QUAN_LY_BIEU_MAU =
  PORT + `nghiepvu/congtacthanhkiemtra/bieumau`;
export const API_QUAN_LY_BIEU_MAU_GET =
  PORT + `nghiepvu/congtacthanhkiemtra/xemdanhsachbieumau`;

export const API_QUAN_LY_BIEU_MAU_DINH_KEM = PORT + `nghiepvu/bieumaudikem`;
/**
 *    END QLBM
 */

/**
 *    START QLKHTC
 *    Quản lý kế hoạch tài chính
 */
export const API_QUAN_LY_KE_HOACH_TAI_CHINH =
  PORT + `nghiepvu/kehoachtaichinh/kehoachtaichinh`;
export const API_QUAN_LY_KE_HOACH_TAI_CHINH_EXPORT_DU_TOAN = (id) =>
  `${PORT}nghiepvu/kehoachtaichinh/kehoachtaichinh/${id}/export/dutoantaichinh`;

export const API_QUAN_LY_TAI_CHINH_DANH_MUC_LOAI_KINH_PHI =
  PORT + `nghiepvu/quanlytaichinh/loaikinhphi`;
export const API_QUAN_LY_TAI_CHINH_DANH_MUC_NGUON_KINH_PHI =
  PORT + `nghiepvu/quanlytaichinh/nguonkinhphi`;
/**
 *    END QLKHTC
 *    Quản lý kế hoạch tài chính
 */

/**
 *    START QLCSPL
 *
 */
export const API_QUAN_LY_ATTP_DIA_PHUONG =
  PORT + "nghiepvu/thuchienchinhsachphapluat/qlattpdiaphuong";
export const API_KET_QUA_THANH_KIEM_TRA =
  PORT + "nghiepvu/thuchienchinhsachphapluat/kqtktattp";
export const API_KET_QUA_KIEM_NGHIEM_TP =
  PORT + "nghiepvu/thuchienchinhsachphapluat/kqkntp";
export const API_GOS_NGHIEM_TPNN =
  PORT + "nghiepvu/thuchienchinhsachphapluat/gsonhiemtpnn";
export const API_GOS_NGHIEM_TPYT =
  PORT + "nghiepvu/thuchienchinhsachphapluat/gsonhiemtpyte";
export const API_KET_QUA_THUC_HIEN_TTHC =
  PORT + "nghiepvu/thuchienchinhsachphapluat/kqthuchientthc";
export const API_QUAN_LY_CHO_SIEU_THI =
  PORT + "nghiepvu/thuchienchinhsachphapluat/qlchosieuthi";
export const API_SU_DUNG_KINH_PHI_DIA_PHUONG =
  PORT + "nghiepvu/thuchienchinhsachphapluat/sdkinhphidp";
export const API_SU_DUNG_KINH_PHI_TRUNG_UONG =
  PORT + "nghiepvu/thuchienchinhsachphapluat/sdkinhphitw";
export const API_TONG_HOP_TINH_HINH_VPATTP =
  PORT + "nghiepvu/thuchienchinhsachphapluat/tonghoptinhhinhvipham";
export const API_XAY_DUNG_CSVC_DIA_PHUONG =
  PORT + "nghiepvu/thuchienchinhsachphapluat/xaydungcsvsattpdiaphuong";
export const API_MAU_KIEM_NGHIEM =
  PORT + "nghiepvu/thuchienchinhsachphapluat/dmmaukiemnghiem";
export const API_MAU_THUC_PHAM_NN =
  PORT + "nghiepvu/thuchienchinhsachphapluat/dmmauthucphamnn";
export const API_TRUYEN_THONG =
  PORT + "nghiepvu/thuchienchinhsachphapluat/truyenthong";
/**
 *    END QLKHTC
 *    Quản lý kế hoạch tài chính
 */

/**
 *    START Quản lý giám sát attp
 *
 */

export const API_SU_KIEN = PORT + "nghiepvu/giamsatattptaisk/sukien";
export const API_CHI_TIET_SU_KIEN =
  PORT + "nghiepvu/giamsatattptaisk/chitietsukien";
export const API_LOAI_SU_KIEN = PORT + "nghiepvu/giamsatattptaisk/loaisk";
export const API_KE_HOACH_GIAM_SAT =
  PORT + "nghiepvu/giamsatattptaisk/kehoachgiamsatattp";
export const API_GIAM_SAT_ATTP = PORT + "nghiepvu/giamsatattptaisk/giamsatattp";
export const API_GIAM_SAT_ATTP_QUYET_DINH_GIAM_SAT_BY_KE_HOACH =
  PORT + "nghiepvu/giamsatattptaisk/quyetdinhgiamsat/kehoach/";
export const API_GIAM_SAT_ATTP_QUYET_DINH_GIAM_SAT =
  PORT + "nghiepvu/giamsatattptaisk/quyetdinhgiamsat/";
export const API_GIAM_SAT_ATTP_PHIEU_GIAM_SAT =
  PORT + `nghiepvu/giamsatattptaisk/phieugiamsat/`;
export const API_GIAM_SAT_ATTP_CO_SO_GIAM_SAT =
  PORT + `nghiepvu/giamsatattptaisk/cosogiamsat/`;
export const API_GIAM_SAT_ATTP_CO_SO_GIAM_SAT_PHIEU_GIAM_SAT = (
  idCoSoGiamSat,
  idQuyetDinhGiamSat
) =>
  PORT +
  `nghiepvu/giamsatattptaisk/cosogiamsat/phieugiamsat/${idCoSoGiamSat}/${idQuyetDinhGiamSat}`;
export const API_GIAM_SAT_ATTP_CO_SO_GIAM_SAT_THEM_MOI =
  PORT + `nghiepvu/giamsatattptaisk/cosogiamsat/phieugiamsat`;
export const API_GIAM_SAT_ATTP_PHIEU_GIAM_SAT_EXPORT =
  PORT + `nghiepvu/giamsatattptaisk/quyetdinhgiamsat/phieugiamsat/export/`;

export const API_GIAM_SAT_ATTP_BIEN_BAN_LAM_VIEC =
  PORT + `nghiepvu/giamsatattptaisk/bienbanlamviec/`;
export const API_GIAM_SAT_ATTP_CO_SO_GIAM_SAT_BIEN_BAN_LAM_VIEC = (
  idCoSoGiamSat,
  idQuyetDinhGiamSat
) =>
  PORT +
  `nghiepvu/giamsatattptaisk/cosogiamsat/bienbanlamviec/${idCoSoGiamSat}/${idQuyetDinhGiamSat}`;
export const API_GIAM_SAT_ATTP_CO_SO_GIAM_SAT_BIEN_BAN_LAM_VIEC_THEM_MOI =
  PORT + `nghiepvu/giamsatattptaisk/cosogiamsat/bienbanlamviec`;
export const API_GIAM_SAT_ATTP_PHIEU_GIAM_SAT_BIEN_BAN_LAM_VIEC_EXPORT =
  PORT + `nghiepvu/giamsatattptaisk/quyetdinhgiamsat/bienbanlamviec/export/`;
/**
 *    END Quản lý giám sát attp
 *
 */

/**
 *    START Quản lý tài sản thanh lý
 *
 */
export const API_QUAN_LY_TAI_SAN_THANH_LY = PORT + "nghiepvu/qltaisan/thanhly";

export const API_BAO_CAO_THONG_KE_TAI_SAN_CO_DINH =
  PORT + "nghiepvu/qltaisan/thongke/taisancodinh";
export const API_BAO_CAO_THONG_KE_CONG_CU_DUNG_CU =
  PORT + "nghiepvu/qltaisan/thongke/congcudungcu";

export const API_BAO_CAO_THONG_KE_CONG_CU_DUNG_CU_DOWLOAD =
  PORT + "nghiepvu/qltaisan/thongke/congcudungcu/export";
export const API_BAO_CAO_THONG_KE_TAI_SAN_CO_DINH_DOWLOAD =
  PORT + "nghiepvu/qltaisan/thongke/taisancodinh/export";
/**
 *    END Quản lý tài sản thanh lý
 *
 */

/**
 *    START Quản lý giám sát attp
 *
 */
export const API_BAO_CAO_THONG_KE_SU_KIEN =
  PORT + "nghiepvu/giamsatattptaisk/thongke/sukien";
export const API_BAO_CAO_THONG_KE_CHI_TIET_SU_KIEN =
  PORT + "nghiepvu/giamsatattptaisk/thongke/chitietsk";
export const API_BAO_CAO_THONG_KE_GIAM_SAT_ATTP =
  PORT + "nghiepvu/giamsatattptaisk/thongke/giamsatattp";
export const API_BAO_CAO_THONG_KE_KE_HOACH_GIAM_SAT =
  PORT + "nghiepvu/giamsatattptaisk/thongke/kehoachgiamsatattp";
/**
 *    END Quản lý giám sát attp
 *
 */

/**
 *    START Quản lý tài chính
 *
 */

export const API_QUAN_LY_TAI_CHINH =
  PORT + "nghiepvu/quanlytaichinh/phanbodutoan";
export const API_QUAN_LY_LOAI_KINH_PHI =
  PORT + "nghiepvu/quanlytaichinh/loaikinhphi";
export const API_QUAN_LY_NGUON_KINH_PHI =
  PORT + "nghiepvu/quanlytaichinh/nguonkinhphi";
export const API_QUAN_LY_THUC_HIEN =
  PORT + "nghiepvu/quanlytaichinh/phanbodutoan";
export const API_QUAN_LY_THUC_HIEN_TAI_CHINH =
  PORT + "nghiepvu/quanlytaichinh/thuchien";
export const API_QUAN_LY_THUC_HIEN_TAI_CHINH_CHI_TIET =
  PORT + "nghiepvu/quanlytaichinh/thuchien/chitiet";
export const API_QUAN_LY_TAI_CHINH_DE_NGHI_THANH_TOAN =
  PORT + "nghiepvu/quanlytaichinh/denghithanhtoan";
export const API_QUAN_LY_TAI_CHINH_DIEU_CHUYEN =
  PORT + "nghiepvu/quanlytaichinh/dieuchuyen";
export const API_QUAN_LY_TAI_CHINH_UPDATE_TRANG_THAI_LUAN_CHUYEN =
  PORT + "nghiepvu/quanlytaichinh/phanbodutoan/updatetrangthailuanchuyen";
export const API_QUAN_LY_TAI_CHINH_UPDATE_TRANG_THAI_PHE_DUYET =
  PORT + "nghiepvu/quanlytaichinh/phanbodutoan/updatetrangthaipheduyet";
export const API_QUAN_LY_TAI_CHINH_LICH_SU_CAP_NHAT =
  PORT + "nghiepvu/quanlytaichinh/phanbodutoan/lichsu";

/**
 *    END Quản lý tài chính
 */

/**
 *    START Quản lý chính sách pháp luật
 *
 */

export const API_THONG_KE_DAU_TU_QUAN_LY_DIA_PHUONG =
  PORT + "nghiepvu/thuchienchinhsachphapluat/thongke/dautuqlattpdiaphuong";
export const API_THONG_KE_MAU_KIEM_NGHIEM =
  PORT + "nghiepvu/thuchienchinhsachphapluat/thongke/dmmaukiemnghiem";
export const API_THONG_KE_MAU_THUC_PHAM_NN =
  PORT + "nghiepvu/thuchienchinhsachphapluat/thongke/dmmauthucphamnn";
export const API_THONG_KE_DANH_MUC_TRUYEN_THONG =
  PORT + "nghiepvu/thuchienchinhsachphapluat/thongke/dmtruyenthong";
export const API_THONG_KE_KET_QUA_KIEM_NGHIEM_TP =
  PORT + "nghiepvu/thuchienchinhsachphapluat/thongke/kqkntp";
export const API_THONG_KE_KET_QUA_THANH_KIEM_TRA_ATTP =
  PORT + "nghiepvu/thuchienchinhsachphapluat/thongke/kqthanhkiemtraattp";
export const API_THONG_KE_KET_QUA_THUC_HIEN_TTHC =
  PORT + "nghiepvu/thuchienchinhsachphapluat/thongke/kqthuchientthc";
export const API_THONG_KE_QUAN_LY_CHO_SIEU_THI =
  PORT + "nghiepvu/thuchienchinhsachphapluat/thongke/qlchosieuthi";
export const API_THONG_KE_SU_DUNG_KINH_PHI_DIA_PHUONG =
  PORT + "nghiepvu/thuchienchinhsachphapluat/thongke/sdkpdiaphuong";
export const API_THONG_KE_SU_DUNG_KINH_PHI_TRUNG_UONG =
  PORT + "nghiepvu/thuchienchinhsachphapluat/thongke/sdkptw";
export const API_THONG_KE_GOS_NHIEM_TPNN =
  PORT + "nghiepvu/thuchienchinhsachphapluat/thongke/sgnnhiemtpnn";
export const API_THONG_KE_GOS_NHIEM_TPYTE =
  PORT + "nghiepvu/thuchienchinhsachphapluat/thongke/sgnnhiemtpyte";
export const API_THONG_KE_TONG_HOP_TINH_HINH_VSATTP =
  PORT + "nghiepvu/thuchienchinhsachphapluat/thongke/tonghoptinhhinhvpattp";
export const API_THONG_KE_XAY_DUNG_CSVC_DIA_PHUONG =
  PORT + "nghiepvu/thuchienchinhsachphapluat/thongke/xaydungcsvattpdiaphuong";

//Export
export const API_DAU_TU_QUAN_LY_DIA_PHUONG_THONG_KE_BAO_CAO_DOWNLOAD =
  PORT +
  "nghiepvu/thuchienchinhsachphapluat/thongke/dautuqlattpdiaphuong/export";
export const API_MAU_KIEM_NGHIEM_THONG_KE_BAO_CAO_DOWNLOAD =
  PORT + "nghiepvu/thuchienchinhsachphapluat/thongke/dmmaukiemnghiem/export";
export const API_MAU_THUC_PHAM_NN_THONG_KE_BAO_CAO_DOWNLOAD =
  PORT + "nghiepvu/thuchienchinhsachphapluat/thongke/dmmauthucphamnn/export";
export const API_DANH_MUC_TRUYEN_THONG_THONG_KE_BAO_CAO_DOWNLOAD =
  PORT + "nghiepvu/thuchienchinhsachphapluat/thongke/dmtruyenthong/export";
export const API_KET_QUA_KIEM_NGHIEM_TP_THONG_KE_BAO_CAO_DOWNLOAD =
  PORT + "nghiepvu/thuchienchinhsachphapluat/thongke/kqkntp/export";
export const API_KET_QUA_THANH_KIEM_TRA_ATTP_THONG_KE_BAO_CAO_DOWNLOAD =
  PORT + "nghiepvu/thuchienchinhsachphapluat/thongke/kqthanhkiemtraattp/export";
export const API_KET_QUA_THUC_HIEN_TTHC_THONG_KE_BAO_CAO_DOWNLOAD =
  PORT + "nghiepvu/thuchienchinhsachphapluat/thongke/kqthuchientthc/export";
export const API_QUAN_LY_CHO_SIEU_THI_THONG_KE_BAO_CAO_DOWNLOAD =
  PORT + "nghiepvu/thuchienchinhsachphapluat/thongke/qlchosieuthi/export";
export const API_SU_DUNG_KINH_PHI_DIA_PHUONG_THONG_KE_BAO_CAO_DOWNLOAD =
  PORT + "nghiepvu/thuchienchinhsachphapluat/thongke/sdkpdiaphuong/export";
export const API_SU_DUNG_KINH_PHI_TRUNG_UONG_THONG_KE_BAO_CAO_DOWNLOAD =
  PORT + "nghiepvu/thuchienchinhsachphapluat/thongke/sdkptw/export";
export const API_GOS_NHIEM_TPNN_THONG_KE_BAO_CAO_DOWNLOAD =
  PORT + "nghiepvu/thuchienchinhsachphapluat/thongke/sgnnhiemtpnn/export";
export const API_GOS_NHIEM_TPYTE_THONG_KE_BAO_CAO_DOWNLOAD =
  PORT + "nghiepvu/thuchienchinhsachphapluat/thongke/sgnnhiemtpyte/export";
export const API_TONG_HOP_TINH_HINH_VSATTP_THONG_KE_BAO_CAO_DOWNLOAD =
  PORT +
  "nghiepvu/thuchienchinhsachphapluat/thongke/tonghoptinhhinhvpattp/export";
export const API_XAY_DUNG_CSVC_DIA_PHUONG_THONG_KE_BAO_CAO_DOWNLOAD =
  PORT +
  "nghiepvu/thuchienchinhsachphapluat/thongke/xaydungcsvattpdiaphuong/export";
//danh muc đánh giá hạng sao
export const API_DANHMUCTIEUCHI =
  PORT + "nghiepvu/capgiaychungnhanattp/danhgiahangsao/danhmuctieuchi";
export const API_DANHMUCTIEUCHI_CHA =
  PORT +
  "nghiepvu/capgiaychungnhanattp/danhgiahangsao/danhmuctieuchi/fetchbyidcha";
export const API_DANHGIATIEUCHI =
  PORT + "nghiepvu/capgiaychungnhanattp/danhgiahangsao/coso";
export const API_DANHGIATIEUCHI_EXPORT =
  PORT + "nghiepvu/capgiaychungnhanattp/danhgiahangsao/coso/export";
export const API_BAOCAOCOSOHANGSAO_EXPORT =
  PORT + "antoanthucpham/coso/xephangsao/export";
export const API_QLONATTP_KE_HOACH_THANH_TRA =
  PORT + "nghiepvu/qlonhiemthucpham/kehoachgiamsat";
export const API_QLONATTP_KE_HOACH_THANH_TRA_BAN_HANH =
  PORT + "nghiepvu/qlonhiemthucpham/kehoachgiamsat/banhanh";
export const API_VBDH_THEM_MOI_TRINH_KY_GIAM_SAT_O_NHIEM =
  PORT + "nghiepvu/hoso/themmoicongviectukehoachthanhgiamsatattp";
export const API_QLONTP_KE_HOACH_GIAM_SAT_PHE_DUYET = (trangThaiPheDuyet) =>
  PORT +
  `nghiepvu/qlonhiemthucpham/kehoachgiamsat/pheduyet/${trangThaiPheDuyet}`;
/**
 *    END Quản lý Quản lý chính sách pháp luật
 */
