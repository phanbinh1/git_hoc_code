const required = (msg) => (value) => {
  if (value !== null && value !== undefined && value.length === 0) {
    return msg;
  } else {
    return value || typeof value === "number" ? undefined : msg;
  }
};

const validateNumber = (msg) => (value) => {
  if (isNaN(Number(value))) {
    return msg;
  }
  return undefined;
};

const validateYear = (msg) => (value) => {
  // Check for a year is equal or than 2019
  if (!/^(2019|20[2-9]\d|2[1-9]\d{2})$/i.test(value)) {
    return msg;
  }
  return undefined;
};

const validateEmail = (msg) => (value) => {
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return msg;
  }
  return undefined;
};

const validatePhoneNumber = (msg) => (value) => {
  if (!value || !value.trim()) return undefined;

  if (isNaN(Number(value))) return msg;

  if (!/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(value)) {
    return msg;
  }

  return undefined;
};

const validateCMND = (msg) => (value) => {
  if (!value || !value.trim()) return undefined;

  if (isNaN(Number(value))) return msg;

  return undefined;
};

export const VALIDATE_COMMON_FROM_DATE = required("Vui lòng nhập từ ngày!");
export const VALIDATE_COMMON_TO_DATE = required("Vui lòng nhập đến ngày!");

export const VALIDATE_MA_REQUIRED = required("Vui lòng nhập mã!");
export const VALIDATE_TEN_REQUIRED = required("Vui lòng nhập tên!");
/**
 *  START_COMMON
 *  Common
 */
export const VALIDATE_REQUIRED = required("Vui lòng nhập vào trường này!");
export const VALIDATE_NAM_REQUIRED = required("Vui lòng nhập vào trường này!");
export const VALIDATE_IS_NUMBER = validateNumber("Vui lòng nhập vào số!");
export const VALIDATE_EMAIL_REQUIRED = required("Vui lòng nhập email!");
export const VALIDATE_IS_EMAIL = validateEmail(
  "Vui lòng nhập đúng định dạng email!"
);
export const VALIDATE_USERNAME_REQUIRED = required(
  "Vui lòng nhập tên đăng nhập!"
);
export const VALIDATE_PASSWORD_REQUIRED = required("Vui lòng nhập mật khẩu!");
export const VALIDATE_RETYPE_PASSWORD_REQUIRED = required(
  "Vui lòng xác nhận lại mật khẩu!"
);
export const VALIDATE_PASSWORD = (value) => {
  var myRe = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{12,50}$/;
  if (value === null || value === undefined) {
    return "Vui lòng nhập mật khẩu!";
  }
  if (!value.match(myRe)) {
    return "Mật khẩu không đúng định dạng!";
  }
  return undefined;
};

/**
 *  Ban Hành
 */

export const VALIDATE_BAN_HANH_SO_KE_HOACH_REQUIRED = required(
  "Vui lòng nhập số kế hoạch!"
);
export const VALIDATE_BAN_HANH_SO_QUYET_DINH_REQUIRED = required(
  "Vui lòng nhập số quyết định!"
);
export const VALIDATE_BAN_HANH_NGUOI_LAP_KE_HOACH_REQUIRED = required(
  "Vui lòng nhập người lập kế hoạch!"
);
export const VALIDATE_BAN_HANH_NGUOI_KY_REQUIRED = required(
  "Vui lòng nhập người ký!"
);
export const VALIDATE_BAN_HANH_NGAY_KY_REQUIRED = required(
  "Vui lòng nhập ngày ký!"
);
export const VALIDATE_BAN_HANH_NGAY_BAN_HANH_REQUIRED = required(
  "Vui lòng nhập ngày ban hành!"
);
/**
 *  Common
 *      Địa chỉ
 */
export const VALIDATE_ADDRESS_TINHTHANH_REQUIRED = required(
  "Vui lòng chọn Tỉnh/Thành!"
);
export const VALIDATE_ADDRESS_QUANHUYEN_REQUIRED = required(
  "Vui lòng chọn Quận/Huyện!"
);
export const VALIDATE_ADDRESS_XAPHUONG_REQUIRED = required(
  "Vui lòng chọn Xã/Phường!"
);
export const VALIDATE_ADDRESS_DIACHI_REQUIRED = required(
  "Vui lòng nhập địa chỉ!"
);
/**
 *  END_COMMON
 */

/**
 *  START_SYSTEM
 *  Hệ thống
 *      Quyền
 */
export const VALIDATE_ROLE_TEN_REQUIRED = required("Vui lòng nhập tên quyền!");
export const VALIDATE_ROLE_BIEUTHUC_REQUIRED = required(
  "Vui lòng nhập biểu thức!"
);
export const VALIDATE_ROLE_LOAI_REQUIRED = required(
  "Vui lòng chọn loại quyền!"
);
export const VALIDATE_ROLE_URL_REQUIRED = required("Vui lòng nhập đường dẫn!");
export const VALIDATE_ROLE_IDCHUCNANG_REQUIRED = required(
  "Vui lòng nhập ID chức năng!"
);
export const VALIDATE_PERMISSION_TEN_REQUIRED = required(
  "Vui lòng nhập tên quyền!"
);
export const VALIDATE_PERMISSION_BIEUTHUC_REQUIRED = required(
  "Vui lòng nhập biểu thức!"
);
export const VALIDATE_PERMISSION_LOAI_REQUIRED = required(
  "Vui lòng chọn loại quyền!"
);
export const VALIDATE_PERMISSION_URL_REQUIRED = required(
  "Vui lòng nhập đường dẫn!"
);
export const VALIDATE_PERMISSION_IDCHUCNANG_REQUIRED = required(
  "Vui lòng nhập ID chức năng!"
);

/**
 *  Hệ thống
 *      Người dùng
 */
export const VALIDATE_ACCOUNT_FULLNAME_REQUIRED = required(
  "Vui lòng nhập họ và tên!"
);
export const VALIDATE_ACCOUNT_PHONENUMBER_REQUIRED = required(
  "Vui lòng nhập số điện thoại!"
);
export const VALIDATE_ACCOUNT_MANAGEMENT_DEPARTMENT_REQUIRED = required(
  "Vui lòng nhập bộ phận quản lý!"
);

/**
 *  Hệ thống
 *      Nhóm người dùng
 */
export const VALIDATE_ACCOUNT_GROUP_CODE_REQUIRED = required(
  "Vui lòng nhập mã nhóm người dùng!"
);
export const VALIDATE_ACCOUNT_GROUP_NAME_REQUIRED = required(
  "Vui lòng nhập tên nhóm người dùng!"
);

/**
 *  Hệ thống
 *      Dịch vụ
 */
export const VALIDATE_SERVICE_CLIENT_ID_REQUIRED = required(
  "Vui lòng nhập CLIENT ID!"
);
export const VALIDATE_SERVICE_RESOURCEIDS_REQUIRED = required(
  "Vui lòng nhập RESOURCEIDS!"
);
export const VALIDATE_SERVICE_CLIENT_SECRET_REQUIRED = required(
  "Vui lòng nhập CLIENT SECRET!"
);
export const VALIDATE_SERVICE_SCOPE_REQUIRED = required("Vui lòng nhập SCOPE!");
export const VALIDATE_SERVICE_AUTHORIZED_GRANT_TYPES_REQUIRED = required(
  "Vui lòng nhập AUTHORIZED GRANT TYPES!"
);
export const VALIDATE_SERVICE_ACCESS_TOKEN_VALIDITY_REQUIRED = required(
  "Vui lòng nhập ACCESS TOKEN VALIDITY!"
);
export const VALIDATE_SERVICE_REFRESH_TOKEN_VALIDITY_REQUIRED = required(
  "Vui lòng nhập REFRESH TOKEN VALIDITY!"
);
export const VALIDATE_SERVICE_AUTOAPPTOVE_REQUIRED = required(
  "Vui lòng nhập AUTOAPPTOVE!"
);

/**
 *  Hệ thống
 *      Cấu hình
 */
export const VALIDATE_CAU_HINH_MA_REQUIRED = required(
  "Vui lòng nhập mã cấu hình!"
);
export const VALIDATE_CAU_HINH_TEN_REQUIRED = required(
  "Vui lòng nhập tên cấu hình!"
);
export const VALIDATE_CAU_HINH_GIA_TRI_REQUIRED = required(
  "Vui lòng nhập giá trị cấu hình!"
);

export const VALIDATE_CAU_HINH_CO_QUAN_QUAN_LY_REQUIRED = required(
  "Vui lòng chọn cơ quan quản lý!"
);

export const VALIDATE_CAU_HINH_VERSION = {
  VERSION: required("Vui lòng nhập phiên bản!"),
  DATE: required("Vui lòng nhập ngày cập nhật!"),
};
export const VALIDATE_CAU_HINH_VBDH = {
  ACCOUNT: {
    ID_CO_QUAN: required("Vui lòng nhập ID cơ quan!"),
    ID_DON_VI: required("Vui lòng nhập ID đơn vị!"),
    MA_CO_QUAN: required("Vui lòng nhập mã cơ quan!"),
    MAT_KHAU: required("Vui lòng nhập mật khẩu!"),
    LOAI_HO_SO: required("Vui lòng nhập loại hồ sơ!"),
  },
  API: {
    URL: required("Vui lòng nhập đường dẫn!"),
    ACTION_THEM_MOI: required("Vui lòng nhập action thêm mới!"),
    ACTION_LAY_DANH_SACH: required("Vui lòng nhập action lấy danh sách!"),
    ACTION_DONG_BO: required("Vui lòng nhập action đồng bộ!"),
  },
};
/**
 *  END_SYSTEM
 */
export const VALIDATE_DOAN_THAM_DINH_STT = required(
  "Vui lòng nhập số thứ tự đoàn!"
);

/**
 *  START_DM
 *  Danh mục
 *      Địa bàn
 */
export const VALIDATE_DIA_BAN_MA_REQUIRED = required(
  "Vui lòng nhập mã địa bàn!"
);
export const VALIDATE_DIA_BAN_TEN_REQUIRED = required(
  "Vui lòng nhập tên địa bàn!"
);
export const VALIDATE_DIA_BAN_CAP_REQUIRED = required("Vui lòng chọn cấp!");
/**
 *  END_DM
 */

export const VALIDATE_TU_NGAY_REQUIRED = required("Vui lòng nhập từ ngày!");
export const VALIDATE_DEN_NGAY_REQUIRED = required("Vui lòng nhập đến ngày!");
export const VALIDATE_NGAY_BAT_DAU_REQUIRED = required(
  "Vui lòng nhập ngày bắt đầu!"
);
export const VALIDATE_NGAY_KET_THUC_REQUIRED = required(
  "Vui lòng nhập ngày kết thúc!"
);

/**
 *  START_QLCSSXKD
 *  Quản lý cơ sở sản xuất kinh doanh
 *      Danh mục
 *          Lĩnh vực
 */
export const VALIDATE_LINH_VUC_MA_REQUIRED = required(
  "Vui lòng nhập mã lĩnh vực!"
);
export const VALIDATE_LINH_VUC_TEN_REQUIRED = required(
  "Vui lòng nhập tên lĩnh vực!"
);

/**
 *  Quản lý cơ sở sản xuất kinh doanh
 *      Danh mục
 *          Loại hình cơ sở
 */
export const VALIDATE_LOAI_HINH_CO_SO_MA_REQUIRED = required(
  "Vui lòng nhập mã loại hình cơ sở!"
);
export const VALIDATE_LOAI_HINH_CO_SO_TEN_REQUIRED = required(
  "Vui lòng nhập tên loại hình cơ sở!"
);
export const VALIDATE_LOAI_HINH_CO_SO_LINH_VUC_REQUIRED = required(
  "Vui lòng chọn lĩnh vực!"
);
export const VALIDATE_LOAI_HINH_CO_SO_LOAI_CO_SO_REQUIRED = required(
  "Vui lòng chọn loại cơ sở!"
);

/**
 *  Quản lý phòng ban
 *      Danh mục
 *          Phòng ban
 */
export const VALIDATE_QUAN_LY_PHONG_BAN_MA_REQUIRED = required(
  "Vui lòng nhập mã phòng ban!"
);
export const VALIDATE_QUAN_LY_PHONG_BAN_TEN_REQUIRED = required(
  "Vui lòng nhập tên phòng ban!"
);

/**
 *  Quản lý quốc gia
 *      Danh mục
 *          Quốc gia
 */
export const VALIDATE_QUAN_LY_QUOC_GIA_MA_REQUIRED = required(
  "Vui lòng nhập mã quốc gia!"
);
export const VALIDATE_QUAN_LY_QUOC_GIA_TEN_REQUIRED = required(
  "Vui lòng nhập tên quốc gia!"
);
export const VALIDATE_QUAN_LY_QUOC_GIA_NGON_NGU_REQUIRED = required(
  "Vui lòng nhập ngôn ngữ!"
);
export const VALIDATE_QUAN_LY_QUOC_GIA_KHU_VUC_REQUIRED = required(
  "Vui lòng nhập tên khu vực!"
);
export const VALIDATE_QUAN_LY_QUOC_GIA_DIEN_TICH_REQUIRED = required(
  "Vui lòng nhập diện tích!"
);
export const VALIDATE_QUAN_LY_QUOC_GIA_DAN_SO_REQUIRED = required(
  "Vui lòng nhập dân số!"
);

/**
 *  Quản lý phòng ban
 *      Danh mục
 *          tài sản
 */
export const VALIDATE_QUAN_LY_TAI_SAN_MA_TAI_SAN_REQUIRED = required(
  "Vui lòng nhập mã tài sản!"
);
export const VALIDATE_QUAN_LY_TAI_SAN_TEN_TAI_SAN_REQUIRED = required(
  "Vui lòng nhập tên tài sản!"
);
export const VALIDATE_QUAN_LY_TAI_SAN_SO_LUONG_REQUIRED = required(
  "Vui lòng nhập số lượng!"
);
export const VALIDATE_QUAN_LY_TAI_SAN_SO_LUONG_DA_CAP_REQUIRED = required(
  "Vui lòng nhập số lượng đã cấp!"
);
export const VALIDATE_QUAN_LY_TAI_SAN_DON_GIA_REQUIRED = required(
  "Vui lòng nhập đơn giá!"
);
export const VALIDATE_QUAN_LY_TAI_SAN_NAM_MUA_SAM_REQUIRED = required(
  "Vui lòng nhập năm mua sắm!"
);
export const VALIDATE_QUAN_LY_TAI_SAN_HAN_SU_DUNG_REQUIRED = required(
  "Vui lòng nhập hạn sử dụng!"
);
export const VALIDATE_QUAN_LY_TAI_SAN_KHAU_HAO_REQUIRED = required(
  "Vui lòng nhập khấu hao!"
);
export const VALIDATE_QUAN_LY_TAI_SAN_VANBAN_LIEN_QUAN_REQUIRED = required(
  "Vui lòng nhập văn bản liên quan!"
);
export const VALIDATE_QUAN_LY_TAI_SAN_DANHMUC_LOAITAISAN_REQUIRED = required(
  "Vui lòng nhập loại tài sản!"
);

/**
 *  Quản lý phòng ban
 *      Danh mục
 *          loai tài sản
 */
export const VALIDATE_QUAN_LY_DANH_MUC_LOAI_TAI_SAN_MA_REQUIRED = required(
  "Vui lòng nhập mã!"
);
export const VALIDATE_QUAN_LY_DANH_MUC_LOAI_TAI_SAN_TEN_REQUIRED = required(
  "Vui lòng nhập tên tài sản!"
);

/**
 *  Quản lý Tài sản
 *      Cáp pát tài sản
 */
export const VALIDATE_QUAN_LY_CAP_PHAT_TAI_SAN_NGAY_CAP_PHAT_REQUIRED = required(
  "Vui lòng nhập ngày!"
);
export const VALIDATE_QUAN_LY_CAP_PHAT_TAI_SAN_TRANG_THAI_REQUIRED = required(
  "Vui lòng chọn trạng thái!"
);
export const VALIDATE_QUAN_LY_CAP_PHAT_TAI_SAN_PHONG_BAN_REQUIRED = required(
  "Vui lòng chọn phòng ban!"
);

export const VALIDATE_QUAN_LY_SUA_CHUA_TAI_SAN_NGAY_SUA_REQUIRED = required(
  "Vui lòng nhập ngày sửa!"
);
export const VALIDATE_QUAN_LY_SUA_CHUA_TAI_SAN_SO_TIEN_REQUIRED = required(
  "Vui lòng nhập số tiền!"
);
export const VALIDATE_QUAN_LY_SUA_CHUA_TAI_SAN_NOI_DUNG_REQUIRED = required(
  "Vui lòng nhập nội dung!"
);

/**
 *  Quản lý ngay nghi phpe
 */
export const VALIDATE_QLTTNP_NGUOI_TIEP_NHAN_REQUIRED = required(
  "Vui lòng chọn người tiếp nhận!"
);
export const VALIDATE_QUAN_LY_THONG_TIN_NGHI_NAM_REQUIRED = required(
  "Vui lòng chọn năm!"
);
export const VALIDATE_QUAN_LY_THONG_TIN_NGHI_TU_NGAY_REQUIRED = required(
  "Vui lòng chọn từ ngày!"
);
export const VALIDATE_QUAN_LY_THONG_TIN_NGHI_DEN_NGAY_REQUIRED = required(
  "Vui lòng nhập đến ngày!"
);
export const VALIDATE_QUAN_LY_THONG_TIN_NGHI_LY_DO_REQUIRED = required(
  "Vui lòng nhập lý do!"
);
export const VALIDATE_QUAN_LY_THONG_TIN_KINH_PHI_REQUIRED = required(
  "Vui lòng nhập kinh phí!"
);
export const VALIDATE_QUAN_LY_THONG_TIN_NOI_DUNG_REQUIRED = required(
  "Vui lòng nhập nội dung!"
);
export const VALIDATE_QUAN_LY_THONG_TIN_SO_NGAY_NGHI_REQUIRED = required(
  "Vui lòng số ngày nghỉ!"
);

/**
 *  Quản lý cơ sở sản xuất kinh doanh
 *      Cơ sở sản xuất kinh doanh
 */
export const VALIDATE_CO_SO_SXKD_TEN_CO_SO_REQUIRED = required(
  "Vui lòng nhập tên cơ sở sản xuất kinh doanh!"
);
export const VALIDATE_CO_SO_SXKD_TEN_CHU_REQUIRED = required(
  "Vui lòng nhập tên chủ cơ sở sản xuất kinh doanh!"
);
export const VALIDATE_CO_SO_SXKD_TEN_DKKD_REQUIRED = required(
  "Vui lòng nhập tên doanh nghiệp!"
);
export const VALIDATE_CO_SO_SXKD_DIA_CHI_REQUIRED = required(
  "Vui lòng nhập địa chỉ chi tiết!"
);
export const VALIDATE_CO_SO_SXKD_LOAI_HINH_CO_SO_REQUIRED = required(
  "Vui lòng chọn loại hình cơ sở!"
);
export const VALIDATE_CO_SO_SXKD_SAN_PHAM_REQUIRED = required(
  "Vui lòng nhập sản phẩm!"
);
export const VALIDATE_CO_SO_SXKD_SO_LAO_DONG_TRUC_TIEP_REQUIRED = required(
  "Vui lòng nhập số lao động trực tiếp!"
);
export const VALIDATE_CO_SO_SXKD_SO_LAO_DONG_GIAN_TIEP_REQUIRED = required(
  "Vui lòng nhập số lao động gián tiếp!"
);
export const VALIDATE_CO_SO_SXKD_SO_GIAY_PHEP_DKKD_REQUIRED = required(
  "Vui lòng nhập số giấy phép đăng ký kinh doanh!"
);
export const VALIDATE_CO_SO_SXKD_NGAY_CAP_PHEP_DKKD_REQUIRED = required(
  "Vui lòng nhập ngày cấp giấy phép đăng ký kinh doanh!"
);
export const VALIDATE_CO_SO_SXKD_SO_GIAY_CHUNG_NHAN_ATTP_REQUIRED = required(
  "Vui lòng nhập số giấy chứng nhận ATTP!"
);
export const VALIDATE_CO_SO_SXKD_NGAY_CAP_GIAY_CHUNG_NHAN_ATTP_REQUIRED = required(
  "Vui lòng nhập ngày cấp giấy chứng nhận ATTP!"
);
export const VALIDATE_CO_SO_SXKD_NGAY_HET_HAN_CHUNG_NHAN_ATTP_REQUIRED = required(
  "Vui lòng nhập ngày hết hạn chứng nhận ATTP!"
);
export const VALIDATE_CO_SO_SXKD_SO_GIAY_CAM_KET_ATTP_REQUIRED = required(
  "Vui lòng nhập số giấy cam kết ATTP!"
);
export const VALIDATE_CO_SO_SXKD_NGAY_CAP_GIAY_CAM_KET_ATTP_REQUIRED = required(
  "Vui lòng nhập ngày cấp giấy cam kết ATTP!"
);
export const VALIDATE_CO_SO_SXKD_NGAY_HET_HAN_CAM_KET_ATTP_REQUIRED = required(
  "Vui lòng nhập ngày hết hạn cam kết ATTP!"
);
export const VALIDATE_CO_SO_SXKD_DANHMUCCHO = required("vui lòng chọn chợ");
export const VALIDATE_CO_SO_SXKD_TENMAU = required("Vui lòng nhập tên mẫu");
export const VALIDATE_CO_SO_SXKD_SOLUONGMAU = required(
  "vui lòng nhập số lượng mẫu"
);
export const VALIDATE_CO_SO_SXKD_CHITIEUXETNGHIEM = required(
  "vui lòng chọn chỉ tiêu"
);
/**
 *  END_QLCSSXKD
 */

/**
 *  START_QLNS
 *  Quản lý nhân sự
 *      Nhân sự
 */
export const VALIDATE_NHAN_SU_HO_TEN_REQUIRED = required(
  "Vui lòng nhập họ tên!"
);
export const VALIDATE_NHAN_SU_MA_REQUIRED = required(
  "Vui lòng nhập mã nhân sự!"
);
export const VALIDATE_NHAN_SU_GIOI_TINH_REQUIRED = required(
  "Vui lòng nhập giới tính!"
);
export const VALIDATE_NHAN_SU_NGAY_SINH_REQUIRED = required(
  "Vui lòng nhập ngày sinh!"
);
export const VALIDATE_NHAN_SU_SO_DIEN_THOAI_REQUIRED = required(
  "Vui lòng nhập số điện thoại!"
);
export const VALIDATE_NHAN_SU_ACCOUNT_REQUIRED = required(
  "Vui lòng nhập Account!"
);
export const VALIDATE_NHAN_SU_CMND_REQUIRED = required(
  "Vui lòng nhập số CMND!"
);
export const VALIDATE_NHAN_SU_NGAY_CAP_CMND_REQUIRED = required(
  "Vui lòng nhập ngày cấp CMND!"
);
export const VALIDATE_NHAN_SU_NOI_CAP_CMND_REQUIRED = required(
  "Vui lòng nhập nơi cấp CMND!"
);
export const VALIDATE_NHAN_SU_CHUYEN_NGANH_REQUIRED = required(
  "Vui lòng nhập chuyên ngành!"
);
export const VALIDATE_NHAN_SU_HOC_VI_REQUIRED = required(
  "Vui lòng nhập học vị!"
);
export const VALIDATE_NHAN_SU_PHONG_BAN_REQUIRED = required(
  "Vui lòng nhập phòng ban!"
);
export const VALIDATE_NHAN_SU_CHUC_VU_REQUIRED = required(
  "Vui lòng nhập chức vụ!"
);
export const VALIDATE_NHAN_SU_NGAY_BAT_DAU_CONG_TAC_REQUIRED = required(
  "Vui lòng nhập ngày bắt đầu công tác!"
);
export const VALIDATE_NHAN_SU_TRANG_THAI_REQUIRED = required(
  "Vui lòng nhập trạng thái!"
);

/**
 *  Quản lý nhân sự
 *      Phòng ban
 */
export const VALIDATE_PHONG_BAN_MA_REQUIRED = required(
  "Vui lòng nhập mã phòng ban!"
);
export const VALIDATE_PHONG_BAN_TEN_REQUIRED = required(
  "Vui lòng nhập tên phòng ban!"
);

/**
 *  Quản lý nhân sự
 *      Danh hiệu thi đua
 */
export const VALIDATE_DANHHIEU_THIDUA_MA_REQUIRED = required(
  "Vui lòng nhập mã danh hiệu thi đua!"
);
export const VALIDATE_DANHHIEU_THIDUA_TEN_REQUIRED = required(
  "Vui lòng nhập tên danh hiệu thi đua!"
);

/**
 *  Quản lý nhân sự
 *      Chương trình đào tạo tập huấn
 */
export const VALIDATE_CHUONGTRINH_DAOTAOTAPHUAN_MA_REQUIRED = required(
  "Vui lòng nhập mã chương trình đào tạo tập huấn!"
);
export const VALIDATE_CHUONGTRINH_DAOTAOTAPHUAN_TEN_REQUIRED = required(
  "Vui lòng nhập tên chương trình đào tạo tập huấn!"
);
export const VALIDATE_CHUONGTRINH_DAOTAOTAPHUAN_GIANGVIEN_REQUIRED = required(
  "Vui lòng nhập tên giảng viên!"
);
export const VALIDATE_CHUONGTRINH_DAOTAOTAPHUAN_NAM_REQUIRED = required(
  "Vui lòng nhập năm!"
);
export const VALIDATE_CHUONGTRINH_DAOTAOTAPHUAN_NAM_VALID = validateYear(
  "Vui lòng nhập năm hợp lệ!"
);
export const VALIDATE_CHUONGTRINH_DAOTAOTAPHUAN_NGAYBATDAU_REQUIRED = required(
  "Vui lòng nhập ngày bắt đầu!"
);
export const VALIDATE_CHUONGTRINH_DAOTAOTAPHUAN_NGAYKETTHUC_REQUIRED = required(
  "Vui lòng nhập ngày kết thúc!"
);

/**
 *  Quản lý nhân sự
 *      Thi đua khen thưởng
 */
export const VALIDATE_KHENTHUONG_DOITUONG_KHENTHUONG_REQUIRED = required(
  "Vui lòng nhập đối tượng khen thưởng!"
);
export const VALIDATE_KHENTHUONG_DANHHIEU_THIDUA_REQUIRED = required(
  "Vui lòng nhập danh hiệu thi đua!"
);
export const VALIDATE_KHENTHUONG_QUYETDINH_KHENTHUONG_REQUIRED = required(
  "Vui lòng nhập quyết định khen thưởng!"
);
export const VALIDATE_KHENTHUONG_NAM_REQUIRED = required(
  "Vui lòng nhập năm khen thưởng!"
);
export const VALIDATE_KHENTHUONG_NAM_VALID = validateYear(
  "Vui lòng nhập năm hợp lệ!"
);
export const VALIDATE_KHENTHUONG_NGAYKHENTHUONG_REQUIRED = required(
  "Vui lòng nhập ngày khen thưởng!"
);
export const VALIDATE_KHENTHUONG_NGAYKY_QUYETDINH_REQUIRED = required(
  "Vui lòng nhập ngày ký quyết định!"
);
export const VALIDATE_KHENTHUONG_TRANGTHAI_REQUIRED = required(
  "Vui lòng nhập trạng thái!"
);

/**
 *  Quản lý nhân sự
 *      Nghỉ phép
 */
export const VALIDATE_NGHIPHEP_NHANSU_REQUIRED = required(
  "Vui lòng nhập nhân sự!"
);
export const VALIDATE_NGHIPHEP_NAM_REQUIRED = required(
  "Vui lòng nhập năm nghỉ phép!"
);
export const VALIDATE_NGHIPHEP_NAM_VALID = validateYear(
  "Vui lòng nhập năm hợp lệ!"
);
export const VALIDATE_NGHIPHEP_TUNGAY_REQUIRED = required(
  "Vui lòng nhập ngày bắt đầu nghỉ phép!"
);
export const VALIDATE_NGHIPHEP_DENNGAY_REQUIRED = required(
  "Vui lòng nhập ngày kết thúc nghỉ phép!"
);
export const VALIDATE_NGHIPHEP_SONGAYNGHI_REQUIRED = required(
  "Vui lòng nhập số ngày nghỉ!"
);
export const VALIDATE_NGHIPHEP_LYDO_REQUIRED = required("Vui lòng nhập lý do!");
export const VALIDATE_NGHIPHEP_NGUOIPHEDUYET_REQUIRED = required(
  "Vui lòng nhập người phê duyệt!"
);
export const VALIDATE_NGHIPHEP_NGAYPHEDUYET_REQUIRED = required(
  "Vui lòng nhập ngày phê duyệt!"
);
export const VALIDATE_NGHIPHEP_TRANGTHAIDUYET_REQUIRED = required(
  "Vui lòng nhập trạng thái duyệt!"
);

/**
 *  Quản lý nhân sự
 *      Nghỉ phép cá nhân
 */
export const VALIDATE_TAISANCONG_NHANSU_REQUIRED = required(
  "Vui lòng nhập nhân sự!"
);
export const VALIDATE_TAISANCONG_TENTAISAN_REQUIRED = required(
  "Vui lòng nhập tên tài sản!"
);
export const VALIDATE_TAISANCONG_MOTACHITIET_REQUIRED = required(
  "Vui lòng nhập mô tả chi tiết!"
);
export const VALIDATE_TAISANCONG_NGAYBANGIAO_REQUIRED = required(
  "Vui lòng nhập ngày bàn giao!"
);
export const VALIDATE_TAISANCONG_TINHTRANG_REQUIRED = required(
  "Vui lòng nhập tình trạng!"
);

/**
 *  Quản lý nhân sự
 *      Đào tạo tập huấn
 */
export const VALIDATE_THONGTIN_DAOTAOTAPHUAN_CHUONGTRINH_REQUIRED = required(
  "Vui lòng chọn chương trình đào tạo tập huấn!"
);
export const VALIDATE_THONGTIN_DAOTAOTAPHUAN_NHANSU_REQUIRED = required(
  "Vui lòng chọn nhân sự!"
);
/**
 *  END_QLNS
 */

/**
 *  Quản lý đoàn vào
 *      Đoàn vào
 */
export const VALIDATE_QUAN_LY_DOAN_VAO_TENDOAN_REQUIRED = required(
  "Vui lòng nhập tên đoàn!"
);
export const VALIDATE_QUAN_LY_DOAN_VAO_CO_QUAN_REQUIRED = required(
  "Vui lòng nhập tên cơ quan!"
);
export const VALIDATE_QUAN_LY_DOAN_VAO_THOI_GIAN_ĐEN_REQUIRED = required(
  "Vui lòng chọn thời gian đến !"
);
export const VALIDATE_QUAN_LY_DOAN_VAO_THOI_GIAN_ĐI_REQUIRED = required(
  "Vui lòng chọn thời gian đi !"
);
export const VALIDATE_QUAN_LY_DOAN_VAO_TO_CHUC_REQUIRED = required(
  "Vui lòng nhập tổ chức !"
);
export const VALIDATE_QUAN_LY_DOAN_VAO_TRUONG_DOAN_REQUIRED = required(
  "Vui lòng nhập trưởng đoàn !"
);
export const VALIDATE_QUAN_LY_DOAN_VAO_QUOC_GIA_REQUIRED = required(
  "Vui lòng nhập quốc gia !"
);

// Đoàn ra
export const VALIDATE_QUAN_LY_DOAN_RA_TENDOAN_REQUIRED = required(
  "Vui lòng nhập tên đoàn!"
);
export const VALIDATE_QUAN_LY_DOAN_RA_NOI_DEN_REQUIRED = required(
  "Vui lòng nhập nơi đến!"
);
export const VALIDATE_QUAN_LY_DOAN_RA_THOI_GIAN_VE_REQUIRED = required(
  "Vui lòng chọn thời gian về !"
);
export const VALIDATE_QUAN_LY_DOAN_RA_THOI_GIAN_ĐI_REQUIRED = required(
  "Vui lòng chọn thời gian đi !"
);
export const VALIDATE_QUAN_LY_DOAN_RA_SO_LUONG_REQUIRED = required(
  "Vui lòng nhập số lượng !"
);
export const VALIDATE_QUAN_LY_DOAN_RA_TRUONG_DOAN_REQUIRED = required(
  "Vui lòng nhập trưởng đoàn !"
);

/**
 *  END_QLNS
 */

/**
 *  START_QLQTNVTT
 *  Quản lý quy trình nghiệp vụ thanh tra
 *      Đoàn thanh tra
 */
export const VALIDATE_QTNVTT_DOAN_THANH_TRA_SO_QD_THANH_LAP_REQUIRED = required(
  "Vui lòng nhập số QĐ!"
);
export const VALIDATE_QTNVTT_DOAN_THANH_TRA_NGAY_THANH_LAP_REQUIRED = required(
  "Vui lòng nhập ngày thành lập!"
);
export const VALIDATE_QTNVTT_DOAN_THANH_TRA_CUOC_THANH_TRA_REQUIRED = required(
  "Vui lòng chọn cuộc thanh tra!"
);
export const VALIDATE_QTNVTT_DOAN_THANH_TRA_MA_DOAN_REQUIRED = required(
  "Vui lòng nhập mã đoàn!"
);
export const VALIDATE_QTNVTT_DOAN_THANH_TRA_DON_VI_CHU_TRI_REQUIRED = required(
  "Vui lòng nhập đơn vị chủ trì!"
);
export const VALIDATE_QTNVTT_DOAN_THANH_TRA_TEN_DOAN_REQUIRED = required(
  "Vui lòng nhập tên đoàn!"
);
export const VALIDATE_QTNVTT_DOAN_THANH_TRA_THANHVIEN_MNV_REQUIRED = required(
  "Nhập mã nhân viên!"
);
export const VALIDATE_QTNVTT_DOAN_THANH_TRA_THANHVIEN_TNV_REQUIRED = required(
  "Nhập tên nhân viên!"
);
export const VALIDATE_QTNVTT_DOAN_THANH_TRA_THANHVIEN_TCT_REQUIRED = required(
  "Nhập tổ công tác!"
);
export const VALIDATE_QTNVTT_DOAN_THANH_TRA_THANHVIEN_CD_REQUIRED = required(
  "Nhập chức danh!"
);
export const VALIDATE_QTNVTT_DOAN_THANH_TRA_THANHVIEN_CV_REQUIRED = required(
  "Nhập chức vụ!"
);
export const VALIDATE_QTNVTT_DOAN_THANH_TRA_THANHVIEN_DVCT_REQUIRED = required(
  "Nhập đơn vị công tác!"
);

/**
 *  Quản lý quy trình nghiệp vụ thanh tra
 *      Kế hoạch thanh tra
 */

export const VALIDATE_QTNVTT_KEHOACHTHANHTRA_KINHPHI_NOIDUNG_REQUIRED = required(
  "Vui lòng nhập nội dung!"
);
export const VALIDATE_QTNVTT_KEHOACHTHANHTRA_KINHPHI_KINHPHI_REQUIRED = required(
  "Vui lòng nhập kinh phí!"
);

export const VALIDATE_QTNVTT_KEHOACHTHANHTRA_NGUOI_LAP_QD_REQUIRED = required(
  "Vui lòng nhập người lập quyết định!"
);
export const VALIDATE_QTNVTT_KEHOACHTHANHTRA_NGUOI_KY_REQUIRED = required(
  "Vui lòng nhập người ký!"
);
export const VALIDATE_QTNVTT_KEHOACHTHANHTRA_NGAY_KY_REQUIRED = required(
  "Vui lòng nhập ngày ký!"
);
export const VALIDATE_QTNVTT_KEHOACHTHANHTRA_NGAY_LAPQD_REQUIRED = required(
  "Vui lòng nhập ngày lập quyết định!"
);

export const VALIDATE_QTNVTT_KEHOACHTHANHTRA_TEN_REQUIRED = required(
  "Vui lòng nhập tên kế hoạch!"
);
export const VALIDATE_QTNVTT_KEHOACHTHANHTRA_SO_KE_HOACH_REQUIRED = required(
  "Vui lòng nhập số kế hoạch!"
);
export const VALIDATE_QTNVTT_KEHOACHTHANHTRA_SO_QUYET_DINH_REQUIRED = required(
  "Vui lòng nhập số quyết định!"
);
export const VALIDATE_QTNVTT_KEHOACHTHANHTRA_TO_CHUC_TIEN_HANH_REQUIRED = required(
  "Vui lòng nhập tổ chức tiến hành!"
);
export const VALIDATE_QTNVTT_KEHOACHTHANHTRA_NAM_REQUIRED = required(
  "Vui lòng nhập năm!"
);
export const VALIDATE_QTNVTT_KEHOACHTHANHTRA_TRANG_THAI_REQUIRED = required(
  "Vui lòng chọn trạng thái!"
);
export const VALIDATE_QTNVTT_KEHOACHTHANHTRA_PHAM_VI_REQUIRED = required(
  "Vui lòng nhập phạm vi!"
);
export const VALIDATE_QTNVTT_KEHOACHTHANHTRA_MUC_DICH_REQUIRED = required(
  "Vui lòng nhập mục đích!"
);
export const VALIDATE_QTNVTT_KEHOACHTHANHTRA_NOI_DUNG_REQUIRED = required(
  "Vui lòng nhập nội dung!"
);
export const VALIDATE_QTNVTT_KEHOACHTHANHTRA_YEU_CAU_REQUIRED = required(
  "Vui lòng nhập yêu cầu!"
);
export const VALIDATE_QTNVTT_KEHOACHTHANHTRA_PHONG_REQUIRED = required(
  "Vui lòng chọn phòng!"
);

/**
 *  Quản lý quy trình nghiệp vụ thanh tra
 *      Cuộc thanh tra
 */
export const VALIDATE_QTNVTT_CUOCTHANHTRA_SO_QUYET_DINH_REQUIRED = required(
  "Vui lòng nhập số quyết định!"
);
export const VALIDATE_QTNVTT_CUOCTHANHTRA_SO_KE_HOACH_REQUIRED = required(
  "Vui lòng nhập số kế hoạch!"
);
export const VALIDATE_QTNVTT_CUOCTHANHTRA_NGAY_KY_QUYET_DINH_REQUIRED = required(
  "Vui lòng nhập ngày ký quyết định!"
);

export const VALIDATE_QTNVTT_DOTTHANHTRA_TEN_REQUIRED = required(
  "Vui lòng nhập tên đợt thanh tra!"
);
export const VALIDATE_QTNVTT_DOTTHANHTRA_CUOCTHANHTRA_REQUIRED = required(
  "Vui lòng chọn cuộc thanh tra!"
);

export const VALIDATE_QTNVTT_CUOCTHANHTRA_TEN_REQUIRED = required(
  "Vui lòng nhập tên cuộc thanh tra!"
);
export const VALIDATE_QTNVTT_CUOCTHANHTRA_TEN_QUYET_DINH_REQUIRED = required(
  "Vui lòng nhập tên quyết định!"
);
export const VALIDATE_QTNVTT_CUOCTHANHTRA_NGAY_BAT_DAU_REQUIRED = required(
  "Vui lòng nhập ngày bắt đầu!"
);
export const VALIDATE_QTNVTT_CUOCTHANHTRA_NGAY_KET_THUC_REQUIRED = required(
  "Vui lòng nhập ngày kết thúc!"
);
export const VALIDATE_QTNVTT_CUOCTHANHTRA_TRANG_THAI_REQUIRED = required(
  "Vui lòng chọn trạng thái!"
);
export const VALIDATE_QTNVTT_CUOCTHANHTRA_PHAM_VI_REQUIRED = required(
  "Vui lòng nhập phạm vi!"
);
export const VALIDATE_QTNVTT_CUOCTHANHTRA_KE_HOACH_THANH_TRA_REQUIRED = required(
  "Vui lòng chọn kế hoạch thanh tra!"
);
export const VALIDATE_QTNVTT_CUOCTHANHTRA_NOI_DUNG_REQUIRED = required(
  "Vui lòng nhập nội dung!"
);
export const VALIDATE_QTNVTT_CUOCTHANHTRA_NAM_REQUIRED = required(
  "Vui lòng nhập năm!"
);

export const VALIDATE_QTNVTT_CUOCTHANHTRA_KETLUAN_REQUIRED = required(
  "Vui lòng chọn kết luận!"
);

export const VALIDATE_QTNVTT_CUOCTHANHTRA_BIENBAN_TENBIENBAN_REQUIRED = required(
  "Vui lòng nhập tên biên bản!"
);
export const VALIDATE_QTNVTT_CUOCTHANHTRA_BIENBAN_NGAYKIEMTRA_REQUIRED = required(
  "Vui lòng nhập ngày kiểm tra!"
);
export const VALIDATE_QTNVTT_CUOCTHANHTRA_BIENBAN_DOANTHANHTRA_REQUIRED = required(
  "Vui lòng chọn đoàn thanh tra!"
);

/**
 *  Quản lý quy trình nghiệp vụ thanh tra
 *      Thống kê báo cáo
 */
export const VALIDATE_QTNVTT_TKBC_CUOCTHANHTRA_REQUIRED = required(
  "Vui lòng chọn cuộc thanh tra!"
);
export const VALIDATE_QTNVTT_TKBC_NAM_REQUIRED = required("Vui lòng chọn năm!");
/**
 *  END_QLQTNVTT
 */

/**
 *  START_QLDTXLHSNDTP
 *  Quản lý điều tra xử lý hồ sơ ngộ độc thực phẩm
 *      Hồ sơ ngộ độc thực phẩm
 */
export const VALIDATE_QTDT_XL_HS_NDTP_MA_REQUIRED = required(
  "Vui lòng nhập mã hồ sơ!"
);
export const VALIDATE_QTDT_XL_HS_NDTP_TIEU_DE_REQUIRED = required(
  "Vui lòng nhập tiêu đề hồ sơ!"
);
export const VALIDATE_QTDT_XL_HS_NDTP_NGAY_XAY_RA_REQUIRED = required(
  "Vui lòng nhập ngày xảy ra ngộ độc thực phẩm!"
);
export const VALIDATE_QTDT_XL_HS_NDTP_DIA_DIEM_REQUIRED = required(
  "Vui lòng nhập địa điểm xảy ra ngộ độc thực phẩm!"
);
export const VALIDATE_QTDT_XL_HS_NDTP_CO_SO_REQUIRED = required(
  "Vui lòng nhập cơ sở!"
);
export const VALIDATE_QTDT_XL_HS_NDTP_TRANG_THAI_REQUIRED = required(
  "Vui lòng chọn trạng thái hồ sơ!"
);

/**
 *  START_DOAN
 *  Quản lý đoàn ra
 */
export const VALIDATE_QTDR_HO_VA_TEN_REQUIRED = required(
  "Vui lòng nhập họ tên!"
);
export const VALIDATE_QTDR_PHONG_BAN_REQUIRED = required(
  "Vui lòng nhập phòng ban!"
);
export const VALIDATE_QTDR_CHUC_VU_REQUIRED = required(
  "Vui lòng nhập chức vụ!"
);

//Quản lý đoàn vào
export const VALIDATE_QTDV_HO_VA_TEN_REQUIRED = required(
  "Vui lòng nhập họ tên!"
);
export const VALIDATE_QTDV_GIOI_TINH_REQUIRED = required(
  "Vui lòng nhập giới tính!"
);
export const VALIDATE_QTDV_NAM_SINH_REQUIRED = required(
  "Vui lòng nhập năm sinh!"
);
export const VALIDATE_QTDV_CHUC_VU_REQUIRED = required("Vui lòng chức vụ!");

/**
 *  Quản lý điều tra xử lý hồ sơ ngộ độc thực phẩm
 *      Điều tra ngộ độc thực phẩm
 */
export const VALIDATE_QTDT_XL_DIEU_TRA_NGO_DOC_THUC_PHAM_HS_REQUIRED = required(
  "Vui lòng chọn hồ sơ ngộ độc thực phẩm!"
);
export const VALIDATE_QTDT_XL_DIEU_TRA_NGO_DOC_THUC_PHAM_NBD_REQUIRED = required(
  "Vui lòng nhập ngày bắc đầu điều tra!"
);
export const VALIDATE_QTDT_XL_DIEU_TRA_NGO_DOC_THUC_PHAM_TRANG_THAI_REQUIRED = required(
  "Vui lòng chọn trạng thái đợt điều tra!"
);

/**
 *  Quản lý điều tra xử lý hồ sơ ngộ độc thực phẩm
 *      Xử lý ngộ độc thực phẩm
 */
export const VALIDATE_QTDT_XL_TEN_CO_SO_LIEN_QUAN_REQUIRED = required(
  "Nhập tên cơ sở"
);
export const VALIDATE_QTDT_XL_DIA_CHI_CO_SO_LIEN_QUAN_REQUIRED = required(
  "Nhập địa chỉ cơ sở"
);
export const VALIDATE_QTDT_XL_LOAI_CO_SO_LIEN_QUAN_REQUIRED = required(
  "Nhập loại cơ sở"
);
export const VALIDATE_QTDT_XL_CSLQ_NDVP_REQUIRED = required(
  "Nhập nội dung vi phạm"
);
export const VALIDATE_QTDT_XL_CSLQ_HTXL_REQUIRED = required(
  "Nhập hình thức xử lý"
);
export const VALIDATE_QTDT_XL_CSLQ_TT_REQUIRED = required(
  "Chọn trạng thái xử lý"
);
/**
 *  END_QLDTXLHSNDTP
 */

/**
 *  START_QLGSONTP
 *  Quản lý giám sát ô nhiễm tực phẩm
 */
export const VALIDATE_QTGSONTP_DMTT_MA_REQUIRED = required(
  "Vui lòng nhập mã trạng thái!"
);
export const VALIDATE_QTGSONTP_DMTT_TEN_REQUIRED = required(
  "Vui lòng nhập tên trạng thái!"
);
export const VALIDATE_QTGSONTP_GHI_CHU_REQUIRED = required(
  "Vui lòng nhập ghi chú!"
);
export const VALIDATE_QTGSONTP_DMLTP_MA_REQUIRED = required(
  "Vui lòng nhập mã loại thực phẩm!"
);
export const VALIDATE_QTGSONTP_DMLTP_TEN_REQUIRED = required(
  "Vui lòng nhập tên loại thực phẩm!"
);
export const VALIDATE_QTGSONTP_DMTP_MA_REQUIRED = required(
  "Vui lòng nhập mã thực phẩm!"
);
export const VALIDATE_QTGSONTP_DMTP_TEN_REQUIRED = required(
  "Vui lòng nhâp tên thực phẩm!"
);
export const VALIDATE_QTGSONTP_DMTP_LOAI_THUC_PHAM_REQUIRED = required(
  "Vui lòng chọn loại thực phẩm!"
);
export const VALIDATE_QTGSONTP_DMTP_QUY_CACH_CHE_BIEN = required(
  "Vui lòng nhập quy cách chế biến!"
);
export const VALIDATE_QTGSONTP_NGUY_CO_MA_REQUIRED = required(
  "Vui lòng nhập mã nguy cơ!"
);
export const VALIDATE_QTGSONTP_NGUY_CO_TEN_REQUIRED = required(
  "Vui lòng nhập tên nguy cơ!"
);
export const VALIDATE_QTGSONTP_NGUY_CO_THUC_PHAM_REQUIRED = required(
  "Vui lòng chọn nhóm thực phẩm!"
);
export const VALIDATE_QTGSONTP_NGAY_KHAO_SAT_REQUIRED = required(
  "Vui lòng nhập ngày khảo sát!"
);
export const VALIDATE_QTGSONTP_SO_MAU_DA_LAY_REQUIRED = required(
  "Vui lòng nhập số mẫu đã lấy!"
);
export const VALIDATE_QTGSONTP_THANH_PHAN_THUC_HIEN_REQUIRED = required(
  "Vui lòng nhập thành phần thực hiện!"
);
export const VALIDATE_QTGSONTP_DOT_KIEM_TRA_MA_REQUIRED = required(
  "Vui lòng nhập mã đợt kiểm tra!"
);
export const VALIDATE_QTGSONTP_DOT_KIEM_TRA_TEN_REQUIRED = required(
  "Vui lòng nhập tên đợt kiểm tra!"
);
export const VALIDATE_QTGSONTP_DIA_DIEM_REQUIRED = required(
  "Vui lòng nhập địa điểm!"
);
export const VALIDATE_QTGSONTP_SO_MAU_CHUA_LAY_REQUIRED = required(
  "Vui lòng nhập số mẫu chưa lấy!"
);
export const VALIDATE_QTGSONTP_SO_MAU_DAT_CHUAN_REQUIRED = required(
  "Vui lòng nhập số mẫu đạt chuẩn!"
);
export const VALIDATE_QTGSONTP_TRA_NGAY_LAY_MAU_REQUIRED = required(
  "Vui lòng nhập ngày lấy mẫu!"
);
export const VALIDATE_QTGSONTP_SO_MAU_DAT_CHUA_CHUAN_REQUIRED = required(
  "Vui lòng nhập số mẫu chưa đạt chuẩn!"
);
export const VALIDATE_QTGSONTP_KET_LUAN_REQUIRED = required(
  "Vui lòng nhập kết luận!"
);
export const VALIDATE_QTGSONTP_TRANG_THAI_REQUIRED = required(
  "Vui lòng chọn trạng thái!"
);
export const VALIDATE_QTGSONTP_TONG_SO_REQUIRED = required(
  "Vui lòng nhập tổng số!"
);

export const VALIDATE_QTGSONTP_CUOCGIAMSAT_TEN_REQUIRED = required(
  "Vui lòng nhập tên cuộc giám sát!"
);
export const VALIDATE_QTGSONTP_CUOCGIAMSAT_KE_HOACH_GIAM_SAT_REQUIRED = required(
  "Vui lòng chọn kế hoạch!"
);
export const VALIDATE_QTGSONTP_CUOCGIAMSAT_THANHVIEN_TNV_REQUIRED = required(
  "Nhập tên nhân viên!"
);
export const VALIDATE_QTGSONTP_CUOCGIAMSAT_THANHVIEN_DVCT_REQUIRED = required(
  "Nhập đơn vị công tác!"
);
export const VALIDATE_QTGSONTP_CUOCGIAMSAT_THANHVIEN_CV_REQUIRED = required(
  "Nhập chức vụ!"
);
export const VALIDATE_QTGSONTP_CUOCGIAMSAT_THANHVIEN_CD_REQUIRED = required(
  "Nhập chức danh!"
);
/**
 *  END_QLGSONTP
 */

/**
 *  START_QLTDCGCNATTP
 *  Quản lý thẩm định cấp giấy chứng nhận an toàn thực phẩm
 *      Hồ sơ cấp giấy chứng nhận
 */
export const VALIDATE_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_TEN_DKKD_REQUIRED = required(
  "Vui lòng nhập tên đăng ký kinh doanh!"
);
export const VALIDATE_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_TEN_CO_SO_KD_REQUIRED = required(
  "Vui lòng nhập tên cơ sở kinh doanh!"
);
export const VALIDATE_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_LOAI_HINH_CO_SO_REQUIRED = required(
  "Vui lòng nhập loại hình cơ sở!"
);
export const VALIDATE_HO_SO_CAP_GIAY_CHUNG_NHAN_TRANG_THAI_HO_SO_REQUIRED = required(
  "Vui lòng chọn trạng thái hồ sơ!"
);
export const VALIDATE_HO_SO_CAP_GIAY_CHUNG_NHAN_MA_THU_TUC_REQUIRED = required(
  "Vui lòng nhập mã thủ tục!"
);

export const VALIDATE_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_NGUOI_NOP_REQUIRED = required(
  "Vui lòng nhập họ tên người nộp!"
);
export const VALIDATE_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_CMND_REQUIRED = required(
  "Vui lòng nhập số CMND!"
);
export const VALIDATE_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_DIA_CHI_NGUOI_NOP_REQUIRED = required(
  "Vui lòng nhập địa chỉ!"
);

export const VALIDATE_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_DTD_HOTEN_REQUIRED = required(
  "Vui lòng nhập họ tên!"
);
export const VALIDATE_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_DTD_CHUCDANH_REQUIRED = required(
  "Vui lòng nhập chức danh!"
);
export const VALIDATE_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_DTD_GIOITINH_REQUIRED = required(
  "Vui lòng chọn!"
);

/**
 *  Quản lý thẩm định cấp giấy chứng nhận an toàn thực phẩm
 *      Kế hoạch thẩm định
 */
export const VALIDATE_KE_HOACH_THAM_DINH_SO_QUYET_DINH_REQUIRED = required(
  "Vui lòng nhập số quyết định!"
);
export const VALIDATE_KE_HOACH_THAM_DINH_NGAY_KY_QUYET_DINH_REQUIRED = required(
  "Vui lòng nhập ngày ký quyết định!"
);
export const VALIDATE_KE_HOACH_THAM_DINH_NGUOI_KY_QUYET_DINH_REQUIRED = required(
  "Vui lòng nhập người ký quyết định!"
);

export const VALIDATE_KE_HOACH_THAM_DINH_HO_SO_CAP_GCN_ATTP_NAM_REQUIRED = required(
  "Vui lòng nhập năm!"
);
export const VALIDATE_KE_HOACH_THAM_DINH_HO_SO_CAP_GCN_ATTP_TEN_KE_HOACH_REQUIRED = required(
  "Vui lòng nhập tên kế hoạch!"
);
export const VALIDATE_KE_HOACH_THAM_DINH_HO_SO_CAP_GCN_ATTP_BIEN_BAN_TRUONG_DOAN_REQUIRED = required(
  "Vui lòng nhập trưởng đoàn!"
);
export const VALIDATE_KE_HOACH_THAM_DINH_HO_SO_CAP_GCN_ATTP_BIEN_BAN_DAI_DIEN_CO_SO_REQUIRED = required(
  "Vui lòng nhập đại diện cơ sở!"
);
export const VALIDATE_KE_HOACH_THAM_DINH_HO_SO_CAP_GCN_ATTP_BIEN_BAN_DAI_DIEN_NGAY_REQUIRED = required(
  "Vui lòng nhập ngày lập biên bản!"
);

/**
 *  END_QLTDCGCNATTP
 */

/**
 *  START_QLTTTCB
 *  Quản lý thủ tục tự công bố
 *      Hồ sơ tự công bố
 */
export const VALIDATE_HS_TCB_CO_SO_REQUIRED = required(
  "Vui lòng chọn cơ sở tự công bố!"
);
export const VALIDATE_HS_TCB_TEN_SAN_PHAM_REQUIRED = required(
  "Vui lòng nhập tên sản phẩm!"
);
export const VALIDATE_HS_TCB_NGAY_TIEP_NHAN_REQUIRED = required(
  "Vui lòng nhập ngày tiếp nhận!"
);
export const VALIDATE_HS_TCB_THOI_HAN_SU_DUNG_REQUIRED = required(
  "Vui lòng nhập thời hạn sử dụng!"
);
export const VALIDATE_HS_TCB_THOI_DIEM_TU_CONG_BO_REQUIRED = required(
  "Vui lòng nhập thời thời điểm tự công bố!"
);
export const VALIDATE_HS_TCB_THANH_PHAN_REQUIRED = required(
  "Vui lòng nhập thành phần!"
);
export const VALIDATE_HS_TCB_THOI_TRANG_THAI_HO_SO_REQUIRED = required(
  "Vui lòng chọn trạng thái hồ sơ!"
);
export const VALIDATE_HS_TCB_KET_QUA_HAU_KIEM_REQUIRED = required(
  "Vui lòng chọn kết quả hậu kiểm!"
);
export const VALIDATE_HS_TCB_NGUOI_NOP_REQUIRED = required(
  "Vui lòng nhập người nộp!"
);

export const VALIDATE_TBHSTCB_SOTHONGBAO = required(
  "Vui lòng nhập số thông báo!"
);
export const VALIDATE_TBHSTCB_NGUOIKY = required("Vui lòng nhập người ký!");
export const VALIDATE_TBHSTCB_NGAYKY = required("Vui lòng nhập ngày ký!");
export const VALIDATE_TBHSTCB_LOAICONGBO = required(
  "Vui lòng chọn loại công bố!"
);
export const VALIDATE_TBHSTCB_TIEUDE = required("Vui lòng nhập tiêu đề!");
/**
 *  Quản lý thủ tục tự công bố
 *      Danh mục
 *          Nhóm
 */
export const VALIDATE_NHOM_MA_REQUIRED = required("Vui lòng nhập mã nhóm!");
export const VALIDATE_NHOM_TEN_REQUIRED = required("Vui lòng nhập tên nhóm!");
/**
 *  Quản lý thủ tục tự công bố
 *      Công tác hậu kiểm
 */
export const VALIDATE_TEN_KE_HOACH_HAU_KIEM_REQUIRED = required(
  "Vui lòng nhập tên kế hoạch hậu kiểm!"
);
export const VALIDATE_QUYET_DINH_REQUIRED = required(
  "Vui lòng nhập quyết định!"
);
/**
 *  END_QLTTTCB
 */

/**
 *  START_QLTNVXLPAKN
 *  Quản lý tiếp nhận và xử lý phản ánh kiến nghị
 *      Hồ sơ phản ánh kiến nghị
 */
export const VALIDATE_HO_SO_PHAN_ANH_KIEN_NGHI_TEN_CO_SO_REQUIRED = required(
  "Vui lòng nhập tên cơ sở!"
);
export const VALIDATE_HO_SO_PHAN_ANH_KIEN_NGHI_DIA_CHI_CO_SO_REQUIRED = required(
  "Vui lòng nhập địa chỉ cơ sở!"
);
export const VALIDATE_HO_SO_PHAN_ANH_KIEN_NGHI_MA_HO_SO_REQUIRED = required(
  "Vui lòng nhập mã hồ sơ!"
);
export const VALIDATE_HO_SO_PHAN_ANH_KIEN_NGHI_SO_HO_SO_REQUIRED = required(
  "Vui lòng nhập số hồ sơ!"
);
export const VALIDATE_HO_SO_PHAN_ANH_KIEN_NGHI_TIEU_DE_REQUIRED = required(
  "Vui lòng nhập tiêu đề!"
);
export const VALIDATE_HO_SO_PHAN_ANH_KIEN_NGHI_TRANG_THAI_REQUIRED = required(
  "Vui lòng nhập trạng thái!"
);
export const VALIDATE_HO_SO_PHAN_ANH_KIEN_NGHI_NOI_DUNG_REQUIRED = required(
  "Vui lòng nhập nội dung!"
);

/**
 *  Quản lý tiếp nhận và xử lý phản ánh kiến nghị
 *      Biên bản thanh tra
 */
export const VALIDATE_PAKN_BIEN_BAN_THANH_TRA_MA_REQUIRED = required(
  "Vui lòng nhập mã biên bản!"
);
export const VALIDATE_PAKN_BIEN_BAN_THANH_TRA_NGAY_THANH_TRA_REQUIRED = required(
  "Vui lòng nhập ngày thanh tra!"
);
export const VALIDATE_PAKN_BIEN_BAN_THANH_TRA_SO_QUYET_DINH_REQUIRED = required(
  "Vui lòng nhập số quyết định!"
);
export const VALIDATE_PAKN_BIEN_BAN_THANH_TRA_TRUONG_DOAN_REQUIRED = required(
  "Vui lòng nhập trưởng đoàn!"
);
export const VALIDATE_PAKN_BIEN_BAN_THANH_TRA_PHONG_BAN_REQUIRED = required(
  "Vui lòng nhập phòng ban!"
);
export const VALIDATE_PAKN_BIEN_BAN_THANH_TRA_KET_LUAN_REQUIRED = required(
  "Vui lòng nhập kết luận!"
);

/**
 *  Quản lý tiếp nhận và xử lý phản ánh kiến nghị
 *      Biên bản xử phạt
 */
export const VALIDATE_PAKN_BIEN_BAN_XU_PHAT_TONG_TIEN_REQUIRED = required(
  "Vui lòng nhập tổng tiền!"
);
export const VALIDATE_PAKN_BIEN_BAN_XU_PHAT_TRANG_THAI_REQUIRED = required(
  "Vui lòng chọn trạng thái!"
);
export const VALIDATE_PAKN_BIEN_BAN_XU_PHAT_BIEN_BAN_THANH_TRA_REQUIRED = required(
  "Vui lòng chọn biên bản thanh tra!"
);
export const VALIDATE_PAKN_BIEN_BAN_XU_PHAT_NOI_DUNG_REQUIRED = required(
  "Vui lòng nhập nội dung!"
);
export const VALIDATE_PAKN_BIEN_BAN_XU_PHAT_VI_PHAM_HANH_VI_REQUIRED = required(
  "Vui lòng nhập hành vi!"
);
export const VALIDATE_PAKN_BIEN_BAN_XU_PHAT_VI_PHAM_SO_TIEN_REQUIRED = required(
  "Vui lòng nhập số tiền!"
);
/**
 *  END_QLTNVXLPAKN
 */

/**
 *  START_QLXNQC
 *  Quản lý xác nhận quảng cáo
 */
export const VALIDATE_SO_HO_SO_REQUIRED = required("Vui lòng nhập số hồ sơ!");
export const VALIDATE_NOI_DUNG_QUANG_CAO_REQUIRED = required(
  "Vui lòng nhập nội dung quảng cáo!"
);
export const VALIDATE_XNQC_DIA_CHI_DON_VI_REQUIRED = required(
  "Vui lòng nhập địa chỉ đơn vị!"
);
export const VALIDATE_XNQC_TEN_DON_VI_REQUIRED = required(
  "Vui lòng nhập tên đơn vị!"
);
export const VALIDATE_XNQC_TEN_SAN_PHAM_REQUIRED = required(
  "Vui lòng nhập tên sản phẩm!"
);
export const VALIDATE_XNQC_HINH_THUC_QC_REQUIRED = required(
  "Vui lòng nhập hình thức quảng cáo!"
);
export const VALIDATE_XNQC_TRANG_THAI_REQUIRED = required(
  "Vui lòng chọn trạng thái!"
);

/**
 *  END_QLXNQC
 */

/**
 *  START_QLCTPAT
 *  Quản lý chuỗi thực phẩm an toàn
 *      Nhóm chuỗi thực phẩm
 */
export const VALIDATE_NHOM_CTP_MA_REQUIRED = required(
  "Vui lòng nhập mã nhóm chuổi thực phẩm!"
);
export const VALIDATE_NHOM_CTP_TEN_NHOM_REQUIRED = required(
  "Vui lòng nhập tên nhóm chuổi thực phẩm!"
);
export const VALIDATE_NHOM_CTP_SAN_PHAM_REQUIRED = required(
  "Vui lòng nhập sản phẩm!"
);

/**
 *  Quản lý chuỗi thực phẩm an toàn
 *      Hồ sơ chuỗi thực phẩm
 */
export const VALIDATE_HO_SO_CTP_CO_SO_DANG_KY_REQUIRED = required(
  "Vui lòng chọn cơ sở đăng ký chuỗi thực phẩm an toàn!"
);
export const VALIDATE_HO_SO_CTP_NGAY_TIEP_NHAN_REQUIRED = required(
  "Vui lòng nhập ngày tiếp nhận hồ sơ!"
);
export const VALIDATE_HO_SO_CTP_NHOM_CTP_REQUIRED = required(
  "Vui lòng chọn nhóm chuỗi thực phẩm an toàn!"
);
export const VALIDATE_HO_SO_CTP_TTHS_REQUIRED = required(
  "Vui lòng chọn trạng thái hồ sơ!"
);
export const VALIDATE_HO_SO_CTP_KQTD_REQUIRED = required(
  "Vui lòng chọn kết quả thẩm định!"
);

export const VALIDATE_HO_SO_CTP_THANHVIEN_CTP_TCS_REQUIRED = required(
  "Nhập tên cơ sở!"
);
export const VALIDATE_HO_SO_CTP_THANHVIEN_CTP_TDKKD_REQUIRED = required(
  "Nhập tên đăng ký kinh doanh!"
);
export const VALIDATE_HO_SO_CTP_THANHVIEN_CTP_LHTG_REQUIRED = required(
  "Chọn loại hình tham gia!"
);
/**
 *  Quản lý chuỗi thực phẩm an toàn
 *      Kế hoạch thẩm định
 */
export const VALIDATE_KE_HOACH_THAM_DINH_HO_SO_CTP_NAM_REQUIRED = required(
  "Vui lòng nhập năm!"
);
export const VALIDATE_KE_HOACH_THAM_DINH_HO_SO_CTP_TEN_KE_HOACH_REQUIRED = required(
  "Vui lòng nhập tên kế hoạch!"
);
export const VALIDATE_KE_HOACH_THAM_DINH_HO_SO_CTP_TTPD_REQUIRED = required(
  "Vui lòng chọn trạng thái phê duyệt!"
);

/**
 *  Quản lý chuỗi thực phẩm an toàn
 *      Biên bản thẩm định
 */
export const VALIDATE_KE_HOACH_THAM_DINH_HO_SO_CTP_BIEN_BAN_TRUONG_DOAN_REQUIRED = required(
  "Vui lòng nhập trưởng đoàn thẩm định!"
);
export const VALIDATE_KE_HOACH_THAM_DINH_HO_SO_CTP_BIEN_BAN_DAI_DIEN_CO_SO_REQUIRED = required(
  "Vui lòng nhập đại diện cơ sở thẩm định!"
);
export const VALIDATE_KE_HOACH_THAM_DINH_HO_SO_CTP_BIEN_BAN_NGAY_LAP_REQUIRED = required(
  "Vui lòng nhập ngày lập biên bản thẩm định!"
);

/**
 *  END_QLCTPAT
 */

/**
 *  START_BCTH
 *  Báo cáo tổng hợp
 */
export const VALIDATE_BAO_CAO_TONG_HOP_QUAN_HUYEN_REQUIRED = required(
  "Vui lòng nhập quận huyện!"
);
export const VALIDATE_BAO_CAO_TONG_HOP_MAU_BAO_CAO_REQUIRED = required(
  "Vui lòng chọn mẫu báo cáo!"
);
export const VALIDATE_BAO_CAO_TONG_HOP_MAU_TRANG_THAI_REQUIRED = required(
  "Vui lòng chọn trạng thái!"
);
export const VALIDATE_BAO_CAO_TONG_HOP_MAU_THOI_GIAN_REQUIRED = required(
  "Vui lòng chọn thời gian!"
);
/**
 *  END_BCTH
 */

/**
 *  START_QLCTXNKTATTP
 *  Quản lý hồ sơ xác nhận kiến thức
 */
export const VALIDATE_HSXNKT_HO_TEN_REQUIRED = required(
  "Vui lòng nhập họ và tên!"
);
export const VALIDATE_HSXNKT_SO_CMND_REQUIRED = required(
  "Vui lòng nhập số chứng minh nhân dân!"
);
export const VALIDATE_HSXNKT_NGAY_CAP_REQUIRED = required(
  "Vui lòng nhập ngày cấp!"
);
export const VALIDATE_HSXNKT_NOI_CAP_REQUIRED = required(
  "Vui lòng nhập nơi cấp!"
);
export const VALIDATE_HSXNKT_LOAI_REQUIRED = required(
  "Vui lòng chọn loại hồ sơ!"
);
export const VALIDATE_HSXNKT_TEN_CO_SO_REQUIRED = required(
  "Vui lòng nhập tên cơ sở!"
);
export const VALIDATE_HSXNKT_DIA_CHI_REQUIRED = required(
  "Vui lòng nhập địa chỉ!"
);
export const VALIDATE_HSXNKT_DIEM_REQUIRED = required("Vui lòng nhập điểm!");
export const VALIDATE_HSXNKT_TRANG_THAI_REQUIRED = required(
  "Vui lòng chọn trạng thái!"
);
/**
 *  START_QLCTXNKTATTP
 *  Quản lý đợt xác nhận kiến thức
 */
export const VALIDATE_DXNKT_LOAI_XAC_NHAN_REQUIRED = required(
  "Vui lòng chọn loại xác nhận!"
);
// export const VALIDATE_HSXNKT_SO_CMND_REQUIRED = required("Vui lòng nhập số chứng minh nhân dân!");
// export const VALIDATE_HSXNKT_NGAY_CAP_REQUIRED = required("Vui lòng nhập ngày cấp!");
// export const VALIDATE_HSXNKT_NOI_CAP_REQUIRED = required("Vui lòng nhập nơi cấp!");
/**
 *  END_QLCTXNKTATTP
 */

export const VALIDATE_LYDOPHEDUYET_REQUIRED = required(
  "Vui lòng nhập lý do không phê duyệt"
);

/**
 *  START QUAN_LY_BIEU_MAU
 *  Quản lý biểu mẫu
 */
export const VALIDATE_QLBM_TEN_BIEU_MAU_REQUIRED = required(
  "Vui lòng nhập tên biểu mẫu!"
);

/**
 *  Quản lý Chinh sách pháp luật
 *     đầu tư qlattp địa phương
 *
 */
export const VALIDATE_QUAN_LY_KEHOACH_NSDP_REQUIRED = required(
  "Vui lòng nhập ngân sách địa phương!"
);
export const VALIDATE_QUAN_LY_THUCHIEN_NSDP_REQUIRED = required(
  "Vui lòng nhập tên tài sản!"
);

/**
 *  Giám sat ATTP
 *
 */
// Sự kiện
export const VALIDATE_GIAM_SAT_ATTP_TEN_SU_KIEN_REQUIRED = required(
  "Vui lòng nhập tên sự kiện!"
);
export const VALIDATE_GIAM_SAT_ATTP_CHI_DAO_REQUIRED = required(
  "Nhập chỉ đạo!"
);
export const VALIDATE_GIAM_SAT_ATTP_LOAI_SU_KIEN_REQUIRED = required(
  "Nhập loại sự kiện!"
);
export const VALIDATE_GIAM_SAT_ATTP_KET_HOACH_GIAM_SAT_REQUIRED = required(
  "Nhập kế hoạch giám sát!"
);

// giám sát attp
export const VALIDATE_GIAM_SAT_ATTP_VAN_BAN_THUC_HIEN_REQUIRED = required(
  "Vui lòng nhập văn bản thực hiện!"
);
export const VALIDATE_GIAM_SAT_ATTP_DIA_DIEM_SU_KIEN_REQUIRED = required(
  "Nhập địa điểm sự kiện!"
);
export const VALIDATE_GIAM_SAT_ATTP_THOI_DIEM_REQUIRED = required(
  "Nhập thời điểm!"
);
export const VALIDATE_GIAM_SAT_ATTP_THOI_GIAN_REQUIRED = required(
  "Nhập thời gian!"
);

// Loại sự kiện
export const VALIDATE_GIAM_SAT_ATTP_MA_LOAI_SU_KIEN_REQUIRED = required(
  "Vui lòng nhập mã loại!"
);
export const VALIDATE_GIAM_SAT_ATTP_TEN_LOAI_SU_KIEN_REQUIRED = required(
  "Nhập tên loại sự kiện!"
);

// Kế hoạch giám sát attp
export const VALIDATE_GIAM_SAT_ATTP_NAM_KE_HOACH_REQUIRED = required(
  "Vui lòng nhập năm kế hoạch!"
);
export const VALIDATE_GIAM_SAT_ATTP_SO_KE_HOACH_REQUIRED = required(
  "Nhập số kế hoạch!"
);
export const VALIDATE_GIAM_SAT_ATTP_TEN_KE_HOACH_REQUIRED = required(
  "Nhập tên kế hoạch!"
);

// chi tiết sự kiện
export const VALIDATE_GIAM_SAT_ATTP_CHI_TIET_SU_KIEN_REQUIRED = required(
  "Vui lòng nhập sự kiện!"
);

// Thanh lý tài sản
export const VALIDATE_THANH_LY_TAI_SAN_SO_CHUNG_TU_REQUIRED = required(
  "Vui lòng số chứng từ!"
);
export const VALIDATE_THANH_LY_TAI_SAN_SO_TIEN_REQUIRED = required(
  "Nhập số tiền!"
);
export const VALIDATE_THANH_LY_TAI_SAN_NGAY_THANH_LY_REQUIRED = required(
  "Nhập ngày thanh lý!"
);
export const VALIDATE_THANH_LY_TAI_SAN_NGUOI_THANH_LY_REQUIRED = required(
  "Nhập nguoi thanh lý!"
);

//Quản lý tài chính
export const VALIDATE_QUAN_LY_TAI_CHINH_CO_SO_VAT_CHAT_REQUIRED = required(
  "Nhập cơ sở xây dựng!"
);
export const VALIDATE_QUAN_LY_TAI_CHINH_LOAI_KINH_PHI_REQUIRED = required(
  "Nhập loại kinh phí!"
);
export const VALIDATE_QUAN_LY_TAI_CHINH_NGUON_KINH_PHI_REQUIRED = required(
  "Nhập nguồn kinh phí!"
);
export const VALIDATE_QUAN_LY_TAI_CHINH_TEN_KE_HOACH_REQUIRED = required(
  "Nhập tên kế hoạch!"
);
export const VALIDATE_QUAN_LY_TAI_CHINH_NAM_REQUIRED = required("Nhập năm!");
// loại kinh phí
export const VALIDATE_QUAN_LY_TAI_CHINH_MA_KINH_PHI_REQUIRED = required(
  "Nhập mã kinh phí!"
);
export const VALIDATE_QUAN_LY_TAI_CHINH_TEN_KINH_PHI_REQUIRED = required(
  "Nhập tên kinh phí!"
);

// Chính sách pháp luật
export const VALIDATE_QUAN_LY_CHINH_SACH_PHAP_LUAT_HINH_THUC_REQUIRED = required(
  "Vui lòng chọn hình thức!"
);
export const VALIDATE_QUAN_LY_CHINH_SACH_PHAP_LUAT_MAU_GIAM_SAT_REQUIRED = required(
  "Vui lòng chọn mẫu giám sát!"
);
export const VALIDATE_QUAN_LY_CHINH_SACH_PHAP_LUAT_LOAI_HINH_REQUIRED = required(
  "Vui lòng chọn loại hình!"
);
export const VALIDATE_QUAN_LY_CHINH_SACH_PHAP_LUAT_TEN_MAU_REQUIRED = required(
  "Nhập tên mẫu!"
);
export const VALIDATE_QUAN_LY_CHINH_SACH_PHAP_LUAT_NHOM_MAU_REQUIRED = required(
  "Vui lòng chọn nhóm mẫu!"
);
export const VALIDATE_QUAN_LY_CHINH_SACH_PHAP_LUAT_NHOM_MAU_THUC_PHAM_REQUIRED = required(
  "Vui lòng chọn mẫu thực phẩm!"
);

export const VALIDATE_DANH_MUC_CHO_TEN_CHO_REQUIRED = required(
  "Vui lòng nhập tên chợ!"
);
export const VALIDATE_DANH_MUC_CHO_MA_CHO_REQUIRED = required(
  "Vui lòng nhập mã chợ!"
);
export const VALIDATE_DANH_MUC_CHO_SDT_VALID = validatePhoneNumber(
  "Số điện thoại không hợp lệ!"
);

//Nhóm ngành hàng
export const VALIDATE_NHOM_NGANH_HANG_MA_NHOM_REQUIRED = required(
  "Vui lòng nhập mã nhóm!"
);
export const VALIDATE_NHOM_NGANH_HANG_TEN_NHOM_REQUIRED = required(
  "Vui lòng nhập tên nhóm!"
);
export const VALIDATE_CAU_HINH_TRANG_THAI_HO_SO_REQUIRED = required(
  "Vui lòng chọn trạng thái hồ sơ!"
);

//Danh mục tiêu chí
export const VALIDATE_DANH_MUC_TIEU_CHI = required("Vui lòng số chỉ mục!");

//Quản lý hộ tiểu thương
export const VALIDATE_HO_TIEU_THUONG_HOTEN_REQUIRED = required(
  "Vui lòng nhập họ tên!"
);
export const VALIDATE_HO_TIEU_THUONG_SDT_VALID = validatePhoneNumber(
  "Số điện thoại không hợp lệ!"
);
export const VALIDATE_HO_TIEU_THUONG_CMND_VALID = validateCMND(
  "Số chứng minh nhân dân không hợp lệ!"
);
export const VALIDATE_HO_TIEU_THUONG_CMND_REQUIRED = required(
  "Vui lòng nhập chứng minh nhân dân"
);
export const VALIDATE_HO_TIEU_THUONG__NGAYCAP_CMND_REQUIRED = required(
  "Vui lòng nhập ngày cấp chứng minh nhân dân"
);

//Lô kinh doanh
export const VALIDATE_LO_KINH_DOANH_SOLO_REQUIRED = required(
  "Vui lòng nhập số lô!"
);
export const VALIDATE_LO_KINH_DOANH_DONGIADIENTICH_REQUIRED = required(
  "Vui lòng nhập đơn giá diện tích!"
);
export const VALIDATE_LO_KINH_DOANH_DONGIAVSMT_REQUIRED = required(
  "Vui lòng nhập đơn giá vệ sinh môi trường!"
);
export const VALIDATE_LO_KINH_DOANH_CHIEUDAI_REQUIRED = required(
  "Vui lòng nhập chiều dài lô!"
);
export const VALIDATE_LO_KINH_DOANH_CHIEURONG_REQUIRED = required(
  "Vui lòng nhập chiều rộng lô!"
);
export const VALIDATE_LO_KINH_DOANH_DIENTICH_REQUIRED = required(
  "Vui lòng nhập diện tích lô!"
);
export const VALIDATE_LO_KINH_DOANH_NGANHHANG_REQUIRED = required(
  "Vui lòng nhập ngành hàng!"
);
export const VALIDATE_LO_KINH_DOANH_CHO_REQUIRED = required(
  "Vui lòng nhập chợ!"
);
