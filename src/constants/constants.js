import React from "react";
import { Tag } from "antd";

export const CONST_TITLE = " CSDL ATTP | ";
export const CONST_PAGE_TITLE =
  "HỆ THỐNG CSDL VÀ PHẦN MỀM QUẢN LÝ NHÀ NƯỚC NGÀNH AN TOÀN THỰC PHẨM";

export const CONST_PAGE_SIZE_OPTIONS = ["1", "10", "20", "50", "100"];
export const CONST_PAGINATION_KEY_DEFAULT = "PAGINATION_KEY_DEFAULT";
export const CONST_PAGE_KEY_DEFAULT = "PAGE_KEY_DEFAULT";
export const CONST_PAGINATION = {
  pageSize: 20,
  currentPage: 1,
};

export const CONST_VBDH_CONFIG = {
  /**
   *  Kế hoạch
   *      KH01    :   Kế hoạch thanh kiểm tra
   *      KH02    :   Cuộc thanh kiểm tra
   *      KH03    :   Kế hoạch thực hiện cuộc thanh kiểm tra
   *
   *      KH04    :   Kế hoạch giám sát attp
   *      KH05    :   Kế hoạch thẩm định cấp giấy chứng nhận
   *      KH06    :   Kế hoạch tài chính
   *
   *  Quyết định
   *      QD01    :   Quyết định thành lập đoàn thảm định cấp giấy chứng nhận
   *      QD02    :   Quyết định thành lập đoàn thanh kiểm tra
   *  Biên bản
   *      BB01    :   Biên bản thanh kiểm tra
   */

  QDTLDTD: {
    tenHoSo: "Quyết định thành lập đoàn thẩm định.",
    maHoSo: "QD01.",
  },
  QDTLDTKT: {
    tenHoSo: "Quyết định thành lập đoàn thanh kiểm tra.",
    maHoSo: "QD02.",
  },
  QDKLCTKT: {
    tenHoSo: "Quyết định kết luận cuộc thanh kiểm tra.",
    maHoSo: "QD03.",
  },
  /**
   *  Kế hoạch thanh kiểm tra
   */

  KHTKT: {
    tenHoSo: "Kế hoạch thanh kiểm tra.",
    maHoSo: "KH01.",
  },
  CTKT: {
    tenHoSo: "Cuộc thanh kiểm tra.",
    maHoSo: "KH02.",
  },
  KHTHTT: {
    tenHoSo: "Kế hoạch thực hiện cuộc thanh tra.",
    maHoSo: "KH03.",
  },

  /**
   *  Biên bản
   */
  BBTKT: {
    tenHoSo: "Biên bản thanh kiểm tra.",
    maHoSo: "BB01.",
  },

  /**
   * Giám sát ATTP
   */

  KHGSATTP: {
    tenHoSo: "Kế hoạch giám sát an toàn thực phẩm tại sự kiện lễ hội.",
    maHoSo: "KH04.",
  },
  QDGSATTP: {
    tenHoSo: "Quyết định giám sát an toàn thực phẩm tại sự kiện lễ hội.",
    maHoSo: "QD04.",
  },
  KHTDCGCN: {
    tenHoSo: "Kế hoạch thẩm định cấp giấy chứng nhận.",
    maHoSo: "KH05.",
  },
  CVHSTDCGCN: {
    tenHoSo: "Công văn hồ sơ thẩm định cấp giấy chứng nhận.",
    maHoSo: "CV01.",
  },
  QDTLDGS: {
    tenHoSo: "Quyết định thành lập đoàn kiểm tra - giám sát",
    maHoSo: "QD05",
  },

  /**
   *      Kế hoạch tài chính
   */
  KHTC: {
    tenHoSo: "Kế hoạch tài chính.",
    maHoSo: "KH06.",
  },
};

export const CONST_MA_LINH_VUC_NONG_NGHIEP = "nongnghiep";

export const CONST_OPTIONS_AUTH_GRAND_TYPE = [
  { value: "password", label: "password" },
  { value: "authorization_code", label: "authorization_code" },
  { value: "refresh_token", label: "refresh_token" },
  { value: "client_credentials", label: "client_credentials" },
];

export const CONST_ROLE_TYPE_URL = 1;
export const CONST_ROLE_TYPE_ACTION = 2;

export const CONST_PERMISSION_TYPE_URL = 1;
export const CONST_PERMISSION_TYPE_ACTION = 2;
export const CONST_PERMISSION_TYPE_URL_HIDDEN = 3;
export const CONST_PERMISSION_TYPE_ACTION_HIDDEN = 4;

export const CONST_NAVIGATION_MAX_SHOW = 4;

export const CONST_LIST_ACCOUNT_GROUP_DEFAULT = ["administrator"];
export const CONST_LIST_ACCOUNT_DEFAULT = ["admin"];
export const CONST_LIST_PERMISSION_DEFAULT = ["DICHVU", "DEFAULT_COMMON"];

export const CONST_TYPE_BTN_DETAIL = "success";
export const CONST_TYPE_BTN_EDIT = "success";
export const CONST_TYPE_BTN_DELETE = "danger";
export const CONST_TYPE_BTN_BACK = "default";
export const CONST_TYPE_BTN_SUBMIT = "primary";
export const CONST_TYPE_BTN_SUCCESS = "success";
export const CONST_TYPE_BTN_CANCEL = "default";
export const CONST_TYPE_BTN_SEARCH = "default";
export const CONST_TYPE_BTN_SEARCH_SUBMIT = "default";
export const CONST_TYPE_BTN_CREATE = "primary";
export const CONST_TYPE_BTN_DEFAULT = "default";
export const CONST_BTN_SHAPE_DEFAULT = "default";
export const CONST_BTN_SIZE_DEFAULT = "default";

export const CONST_LUAN_CHUYEN = {
  NEW: "NEW",
  BACK: "BACK",
  NEXT: "NEXT",
  DESTROY: "DESTROY",
  COMPLETED: "COMPLETED",
  APPROVAL: "APPROVAL",
  NOT_APPROVAL: "NOT_APPROVAL",
  TRANSFER_HANDLING: "TRANSFER_HANDLING",
  RECEIVE: "RECEIVE",
  HAS_RECEIVE: "HAS_RECEIVE",
  NEW_TRANSFER_HANDLING: "NEW_TRANSFER_HANDLING",
  WAIT_FOR_SYNTHETIC: "WAIT_FOR_SYNTHETIC",
  SYNTHESIZING: "SYNTHESIZING",
  BUDGET_BEING_SUBMITTED: "BUDGET_BEING_SUBMITTED",
  WAIT_FOR_APPROVAL: "WAIT_FOR_APPROVAL",
  SWITCH_TO_EXPERT: "SWITCH_TO_EXPERT",

  description: {
    NEW: {
      icon: "fa fa-plus-square",
      text: "Tạo mới",
      color: "blue",
      note: "Thêm mới",
    },
    TRANSFER_HANDLING: {
      icon: "fa fa-share-square-o",
      text: "Chuyển xử lý",
      color: "geekblue",
      note: "Chuyển xử lý",
    },
    BACK: {
      icon: "fa fa-pencil-square-o",
      text: "Chờ bổ sung",
      color: "orange",
      note: "Yêu cầu bổ sung hồ sơ",
    },
    NEXT: {
      icon: "fa fa-share-square-o",
      text: "Trình phê duyệt",
      color: "geekblue",
      note: "Trình cấp trên phê duyệt",
    },
    BUDGET_BEING_SUBMITTED: {
      icon: "fa fa-share-square-o",
      text: "Dự toán đang trình",
      color: "geekblue",
      note: "Trình cấp trên phê duyệt",
    },
    WAIT_FOR_APPROVAL: {
      icon: "fa fa-share-square-o",
      text: "Chờ phê duyệt",
      color: "geekblue",
      note: "Trình cấp trên phê duyệt",
    },
    DESTROY: {
      icon: "fa fa-ban",
      text: "Hủy",
      color: "volcano",
      note: "Thông báo - Hủy thông báo",
    },
    APPROVAL: {
      icon: "fa fa-check-circle-o",
      text: "Đã phê duyệt!",
      color: "green",
      note: "Đã phê duyệt",
    },
    SWITCH_TO_EXPERT: {
      icon: "fa fa-check-circle-o",
      text: "Chuyển phòng chuyên môn ý kiến!",
      color: "green",
      note: "Đã phê duyệt",
    },
    NOT_APPROVAL: {
      icon: "fa fa-minus-circle",
      text: "Không phê duyệt!",
      color: "volcano",
      note: "Đã phê duyệt",
    },
    RECEIVE: {
      icon: "fa fa-exchange",
      text: "Mới tiếp nhận!",
      color: "blue",
      note: "Mới tiếp nhận",
    },
    HAS_RECEIVE: {
      icon: "fa fa-exchange",
      text: "Đã tiếp nhận!",
      color: "green",
      note: "Đã tiếp nhận",
    },
    WAIT_FOR_SYNTHETIC: {
      icon: "fa fa-refresh",
      text: "Chờ tổng hợp!",
      color: "blue",
      note: "Chờ tổng hợp",
    },
    SYNTHESIZING: {
      icon: "fa fa-refresh",
      text: "Đang tổng hợp!",
      color: "blue",
      note: "Đang tổng hợp",
    },
  },
};

export const CONST_MONTH_OPTIONS = [
  { value: "01", label: "Tháng 1" },
  { value: "02", label: "Tháng 2" },
  { value: "03", label: "Tháng 3" },
  { value: "04", label: "Tháng 4" },
  { value: "05", label: "Tháng 5" },
  { value: "06", label: "Tháng 6" },
  { value: "07", label: "Tháng 7" },
  { value: "08", label: "Tháng 8" },
  { value: "09", label: "Tháng 9" },
  { value: "10", label: "Tháng 10" },
  { value: "11", label: "Tháng 11" },
  { value: "12", label: "Tháng 12" },
];
export const CONST_DIA_BAN_CAP_1 = [
  { value: 1, label: "Thành phố Trung ương" },
  { value: 2, label: "Tỉnh" },
];

export const CONST_DIA_BAN_CAP_2 = [
  { value: 3, label: "Thành phố trực thuộc tỉnh" },
  { value: 4, label: "Quận" },
  { value: 5, label: "Huyện" },
  { value: 6, label: "Thị xã" },
];

export const CONST_DIA_BAN_CAP_3 = [
  { value: 7, label: "Phường" },
  { value: 8, label: "Xã" },
  { value: 9, label: "Thị trấn" },
];

export const CONST_DIA_BAN_CAP_4 = [
  { value: 10, label: "Tổ" },
  { value: 11, label: "Thôn" },
];

export const CONST_DIA_BAN_LABEL = [
  "Tỉnh/Thành phố",
  "Quận/Huyện",
  "Xã/Phường/Thị trấn",
  "Tổ",
];

export const FORM_HTML_TYPE_SUBMIT = "submit";
export const FORM_HTML_TYPE_RESET = "reset";
export const FORM_HTML_TYPE_BUTTON = "button";

export const FORM_BUTTON_LABEL_CREATE = "Thêm mới";
export const FORM_BUTTON_LABEL_UPDATE = "Cập nhật";
export const FORM_BUTTON_LABEL_RESET = "Làm mới";
export const FORM_BUTTON_LABEL_SYNTH = "Đồng bộ";

export const CONST_LAYOUT_MENU_LEFT = {
  mode: "inline", // inline - vertical - horizontal
  width: 350,
  hidden: false,
  fixed: true,
  resize: false,
  autoZoomOut: false,
  fullText: true,
};
export const CONST_LAYOUT_MENU_RIGHT = {
  width: 300,
  hidden: true,
  content: null,
};
export const CONST_LAYOUT_TABLE = {
  fullText: true,
  allowCopy: false,
};

export const CONST_LAYOUT_FORM = {
  type: "horizontal", // vertical, inline, horizontal
};

export const CONST_GIOI_TINH = [
  { value: "Nam", label: "Nam" },
  { value: "Nữ", label: "Nữ" },
];

export const CONST_TRANG_THAI_KINH_DOANH = [
  { value: "DANGKINHDOANH", label: "Đang kinh doanh", color: "green" },
  { value: "NGHIKINHDOANH", label: "Nghỉ kinh doanh", color: "gray" },
];

export const CAU_HINH_NGHI_TRONG_TUAN = [
  { label: "Thứ Hai", value: 1 },
  { label: "Thứ Ba", value: 2 },
  { label: "Thứ Tư", value: 3 },
  { label: "Thứ Năm", value: 4 },
  { label: "Thứ Sáu", value: 5 },
  { label: "Thứ Bảy", value: 6 },
  { label: "Chủ nhật", value: 7 },
];

export const CONST_NGHI_PHEP_BUOI = {
  SANG: {
    value: "SANG",
    label: "Nghỉ buổi sáng",
    className: "nghi-phep-sang",
    soNgay: 0.5,
  },
  CHIEU: {
    value: "CHIEU",
    label: "Nghỉ buổi chiều",
    className: "nghi-phep-chieu",
    soNgay: 0.5,
  },
  CANGAY: {
    value: "CANGAY",
    label: "Nghỉ cả ngày",
    className: "nghi-phep-ca-ngay",
    soNgay: 1,
  },
};

export const CONST_PHE_DUYET = {
  name: "trang_thai_phe_duyet",
  DAPHEDUYET_NUM_KEY: "3",
  DANGHOANTHIEN: "DANGHOANTHIEN",
  CHOPHEDUYET: "CHOPHEDUYET",
  DAPHEDUYET: "DAPHEDUYET",
  KHONGPHEDUYET: "KHONGPHEDUYET",
  HUY: "HUY",
  CHOBOSUNG: "CHOBOSUNG",
  CHUYENXULY: "CHUYENXULY",
  coSoOptions: [
    {
      value: "CHOPHEDUYET",
      label: "Chờ phê duyệt",
      color: "geekblue",
      num_key: "2",
      name: "trang_thai_phe_duyet",
    },
    {
      value: "KHONGPHEDUYET",
      label: "Không phê duyệt",
      color: "volcano",
      num_key: "4",
      name: "trang_thai_phe_duyet",
    },
    {
      value: "DAPHEDUYET",
      label: "Đã phê duyệt",
      color: "green",
      num_key: "3",
      name: "trang_thai_phe_duyet",
    },
  ],
  nghiPhepOptions: [
    {
      value: "CHOPHEDUYET",
      label: "Chờ phê duyệt",
      color: "geekblue",
      num_key: "2",
      name: "trang_thai_phe_duyet",
    },
    {
      value: "KHONGPHEDUYET",
      label: "Không phê duyệt",
      color: "volcano",
      num_key: "4",
      name: "trang_thai_phe_duyet",
    },
    {
      value: "DAPHEDUYET",
      label: "Đã phê duyệt",
      color: "green",
      num_key: "3",
      name: "trang_thai_phe_duyet",
    },
  ],
  keHoachTaiChinhChuyenMonOptions: [
    {
      value: "DANGHOANTHIEN",
      label: "Đang hoàn thiện",
      color: "",
      num_key: "1",
      name: "trang_thai_phe_duyet",
    },
    {
      value: "CHOPHEDUYET",
      label: "Chờ tổng hợp",
      color: "geekblue",
      num_key: "2",
      name: "trang_thai_phe_duyet",
    },
    {
      value: "KHONGPHEDUYET",
      label: "Không tổng hợp",
      color: "volcano",
      num_key: "4",
      name: "trang_thai_phe_duyet",
    },
    {
      value: "DAPHEDUYET",
      label: "Đã tổng hợp",
      color: "green",
      num_key: "3",
      name: "trang_thai_phe_duyet",
    },
    {
      value: "CHOBOSUNG",
      label: "Chờ bổ sung",
      color: "orange",
      num_key: "6",
      name: "trang_thai_phe_duyet",
    },
  ],
  options: [
    {
      value: "DANGHOANTHIEN",
      label: "Đang hoàn thiện",
      color: "",
      num_key: "1",
      name: "trang_thai_phe_duyet",
    },
    {
      value: "CHOPHEDUYET",
      label: "Chờ phê duyệt",
      color: "geekblue",
      num_key: "2",
      name: "trang_thai_phe_duyet",
    },
    {
      value: "KHONGPHEDUYET",
      label: "Không phê duyệt",
      color: "volcano",
      num_key: "4",
      name: "trang_thai_phe_duyet",
    },
    {
      value: "DAPHEDUYET",
      label: "Đã phê duyệt",
      color: "green",
      num_key: "3",
      name: "trang_thai_phe_duyet",
    },
    {
      value: "CHOBOSUNG",
      label: "Chờ bổ sung",
      color: "orange",
      num_key: "6",
      name: "trang_thai_phe_duyet",
    },
  ],
  tuCongBoOptions: [
    {
      value: "DANGHOANTHIEN",
      label: "Đang hoàn thiện",
      color: "",
      num_key: "1",
      name: "trang_thai_phe_duyet",
    },
    {
      value: "CHOPHEDUYET",
      label: "Chờ phê duyệt",
      color: "geekblue",
      num_key: "2",
      name: "trang_thai_phe_duyet",
    },
    {
      value: "KHONGPHEDUYET",
      label: "Không phê duyệt",
      color: "volcano",
      num_key: "4",
      name: "trang_thai_phe_duyet",
    },
    {
      value: "DAPHEDUYET",
      label: "Đã phê duyệt",
      color: "green",
      num_key: "3",
      name: "trang_thai_phe_duyet",
    },
    {
      value: "CHOBOSUNG",
      label: "Chờ bổ sung",
      color: "orange",
      num_key: "6",
      name: "trang_thai_phe_duyet",
    },
  ],
  thanhTraOptions: [
    {
      value: "DANGHOANTHIEN",
      label: "Đang hoàn thiện",
      color: "",
      num_key: "1",
      name: "trang_thai_phe_duyet",
    },
    {
      value: "CHOPHEDUYET",
      label: "Chờ phê duyệt",
      color: "geekblue",
      num_key: "2",
      name: "trang_thai_phe_duyet",
    },
    {
      value: "KHONGPHEDUYET",
      label: "Không phê duyệt",
      color: "volcano",
      num_key: "4",
      name: "trang_thai_phe_duyet",
    },
    {
      value: "DAPHEDUYET",
      label: "Đã phê duyệt",
      color: "green",
      num_key: "3",
      name: "trang_thai_phe_duyet",
    },
  ],
  optionsThongBaoCongBoSanPham: [
    {
      value: "DANGHOANTHIEN",
      label: "Đang hoàn thiện",
      color: "",
      num_key: "1",
      name: "trang_thai_phe_duyet",
    },
    {
      value: "CHOPHEDUYET",
      label: "Chờ phê duyệt",
      color: "geekblue",
      num_key: "2",
      name: "trang_thai_phe_duyet",
    },
    {
      value: "KHONGPHEDUYET",
      label: "Không phê duyệt",
      color: "volcano",
      num_key: "4",
      name: "trang_thai_phe_duyet",
    },
    {
      value: "DAPHEDUYET",
      label: "Đã phê duyệt",
      color: "green",
      num_key: "3",
      name: "trang_thai_phe_duyet",
    },
    {
      value: "HUY",
      label: "Hủy thông báo",
      color: "red",
      num_key: "5",
      name: "trang_thai_phe_duyet",
    },
  ],
  pheDuyetOptions: [
    {
      value: "KHONGPHEDUYET",
      label: "Không phê duyệt",
      color: "volcano",
      num_key: "4",
      name: "trang_thai_phe_duyet",
    },
    {
      value: "DAPHEDUYET",
      label: "Đã phê duyệt",
      color: "green",
      num_key: "3",
      name: "trang_thai_phe_duyet",
    },
  ],
  pheDuyetcanhanOptions: [
    {
      value: "KHONGPHEDUYET",
      label: "Không phê duyệt",
      color: "volcano",
      num_key: "4",
      name: "trang_thai_phe_duyet",
    },
    {
      value: "CHOPHEDUYET",
      label: "Chờ phê duyệt",
      color: "geekblue",
      num_key: "2",
      name: "trang_thai_phe_duyet",
    },
    {
      value: "DAPHEDUYET",
      label: "Đã phê duyệt",
      color: "green",
      num_key: "3",
      name: "trang_thai_phe_duyet",
    },
  ],
  keHoachTaiChinhOptions0: [
    {
      value: "DANGHOANTHIEN",
      label: "Đang hoàn thiện",
      color: "",
      num_key: "1",
      name: "trang_thai_phe_duyet",
    },
    {
      value: "CHOPHEDUYET",
      label: "Dự toán đang trình",
      color: "geekblue",
      num_key: "2",
      name: "trang_thai_phe_duyet",
    },
    {
      value: "DAPHEDUYET",
      label: "Chuyển phòng chuyên môn ý kiến",
      color: "green",
      num_key: "3",
      name: "trang_thai_phe_duyet",
    },
    {
      value: "CHOBOSUNG",
      label: "Chờ bổ sung",
      color: "orange",
      num_key: "6",
      name: "trang_thai_phe_duyet",
    },
  ],
  keHoachTaiChinhOptions1: [
    {
      value: "DANGHOANTHIEN",
      label: "Đang tổng hợp",
      color: "",
      num_key: "1",
      name: "trang_thai_phe_duyet",
    },
    {
      value: "CHOPHEDUYET",
      label: "Chờ phê duyệt",
      color: "geekblue",
      num_key: "2",
      name: "trang_thai_phe_duyet",
    },
    {
      value: "CHOBOSUNG",
      label: "Chờ bổ sung",
      color: "orange",
      num_key: "6",
      name: "trang_thai_phe_duyet",
    },
    {
      value: "DAPHEDUYET",
      label: "Chuyển phòng chuyên môn ý kiến",
      color: "green",
      num_key: "3",
      name: "trang_thai_phe_duyet",
    },
  ],
  keHoachTaiChinhOptions2: [
    {
      value: "DANGHOANTHIEN",
      label: "Đang tổng hợp",
      color: "",
      num_key: "1",
      name: "trang_thai_phe_duyet",
    },
    {
      value: "CHOPHEDUYET",
      label: "Chờ phê duyệt",
      color: "geekblue",
      num_key: "2",
      name: "trang_thai_phe_duyet",
    },
    {
      value: "CHOBOSUNG",
      label: "Chờ bổ sung",
      color: "orange",
      num_key: "6",
      name: "trang_thai_phe_duyet",
    },
    {
      value: "DAPHEDUYET",
      label: "Đã phê duyệt",
      color: "green",
      num_key: "3",
      name: "trang_thai_phe_duyet",
    },
  ],
  render: (trangThai) => {
    switch (trangThai) {
      case "DANGHOANTHIEN":
        return {
          label: "Đang hoàn thiện",
          color: "",
          num_key: "1",
          name: "trang_thai_phe_duyet",
        };
      case "CHOPHEDUYET":
        return {
          label: "Chờ phê duyệt",
          color: "geekblue",
          num_key: "2",
          name: "trang_thai_phe_duyet",
        };
      case "KHONGPHEDUYET":
        return {
          label: "Không phê duyệt",
          color: "volcano",
          num_key: "4",
          name: "trang_thai_phe_duyet",
        };
      case "DAPHEDUYET":
        return {
          label: "Đã phê duyệt",
          color: "blue",
          num_key: "3",
          name: "trang_thai_phe_duyet",
        };
      case "CHOBOSUNG":
        return {
          label: "Chờ bổ sung",
          color: "orange",
          num_key: "6",
          name: "trang_thai_phe_duyet",
        };
      case "CHUYENXULY":
        return {
          label: "Chuyển xử lý",
          color: "blue",
          num_key: "7",
          name: "trang_thai_phe_duyet",
        };
      case "HUY":
        return {
          label: "Huỷ thông báo",
          color: "red",
          num_key: "5",
          name: "trang_thai_phe_duyet",
        };
      default:
        return {
          label: "Không xác định",
          color: "",
          num_key: "0",
          name: "trang_thai_phe_duyet",
        };
    }
  },
};
export const CONST_TRANG_THAI_DE_NGHI_THANH_TOAN = {
  DANGDENGHI: "DANGDENGHI",
  CHOTHANHTOAN: "CHOTHANHTOAN",
  DATHANHTOAN: "DATHANHTOAN",
  KHONGTHANHTOAN: "KHONGTHANHTOAN",
};

export const CONST_TRANG_THAI_HO_SO = {
  TIEPNHAN: "TIEPNHAN",
  DAT: "DAT",
  KHONGDAT: "KHONGDAT",
  CHUAHOANTHIEN: "CHUAHOANTHIEN",
  MOITIEPNHAN: "MOITIEPNHAN",
  DATIEPNHAN: "DATIEPNHAN",
  HOSODAT: "HOSODAT",
  HOSOCHOBOSUNG: "HOSOCHOBOSUNG",
  DABOSUNG: "DABOSUNG",
  RUTHOSO: "RUTHOSO",
  HOSOKHONGDAT: "HOSOKHONGDAT",
  CHOXULY: "CHOXULY",
  DANGXULY: "DANGXULY",
  DAXULYXONG: "DAXULYXONG",
  render: (trangThai) => {
    switch (trangThai) {
      case "TIEPNHAN":
        return {
          value: "TIEPNHAN",
          label: "Tiếp nhận",
          color: "orange",
          num_key: "11",
          name: "trang_thai_ho_so",
        };
      case "DAT":
        return {
          value: "DAT",
          label: "Đạt",
          color: "green",
          num_key: "12",
          name: "trang_thai_ho_so",
        };
      case "KHONGDAT":
        return {
          value: "KHONGDAT",
          label: "Không đạt",
          color: "volcano",
          num_key: "13",
          name: "trang_thai_ho_so",
        };
      case "CHUAHOANTHIEN":
        return {
          value: "CHUAHOANTHIEN",
          label: "Chưa hoàn thiện",
          color: "purple",
          num_key: "14",
          name: "trang_thai_ho_so",
        };
      case "MOITIEPNHAN":
        return {
          value: "MOITIEPNHAN",
          label: "Mới tiếp nhận",
          color: "orange",
          num_key: "1",
          name: "trang_thai_ho_so",
        };
      case "DATIEPNHAN":
        return {
          value: "DATIEPNHAN",
          label: "Đã tiếp nhận",
          color: "volcano",
          num_key: "2",
          name: "trang_thai_ho_so",
        };
      case "HOSODAT":
        return {
          value: "HOSODAT",
          label: "Hồ sơ đạt",
          color: "green",
          num_key: "3",
          name: "trang_thai_ho_so",
        };
      case "HOSOCHOBOSUNG":
        return {
          value: "HOSOCHOBOSUNG",
          label: "Chờ bổ sung",
          color: "cyan",
          num_key: "4",
          name: "trang_thai_ho_so",
        };
      case "DABOSUNG":
        return {
          value: "DABOSUNG",
          label: "Đã bổ sung",
          color: "purple",
          num_key: "5",
          name: "trang_thai_ho_so",
        };
      case "RUTHOSO":
        return {
          value: "RUTHOSO",
          label: "Rút hồ sơ",
          color: "red",
          num_key: "6",
          name: "trang_thai_ho_so",
        };
      case "HOSOKHONGDAT":
        return {
          value: "HOSOKHONGDAT",
          label: "Hồ sơ không đạt",
          color: "red",
          num_key: "7",
          name: "trang_thai_ho_so",
        };
      case "CHOXULY":
        return {
          value: "CHOXULY",
          label: "Chờ xử lý",
          color: "geekblue",
          num_key: "8",
          name: "trang_thai_ho_so",
        };
      case "DANGXULY":
        return {
          value: "DANGXULY",
          label: "Đang xử lý",
          color: "blue",
          num_key: "9",
          name: "trang_thai_ho_so",
        };
      case "DAXULYXONG":
        return {
          value: "DAXULYXONG",
          label: "Đã xử lý xong",
          color: "green",
          num_key: "10",
          name: "trang_thai_ho_so",
        };
      default:
        return {
          value: trangThai,
          label: "Không xác định",
          color: "orange",
          num_key: "1",
          name: "trang_thai_ho_so",
        };
    }
  },
  options: [
    {
      value: "MOITIEPNHAN",
      label: "Mới tiếp nhận",
      color: "orange",
      num_key: "1",
      name: "trang_thai_ho_so",
    },
    {
      value: "HOSOKHONGDAT",
      label: "Hồ sơ không đạt",
      color: "red",
      num_key: "7",
      name: "trang_thai_ho_so",
    },
    {
      value: "HOSODAT",
      label: "Hồ sơ đạt",
      color: "green",
      num_key: "3",
      name: "trang_thai_ho_so",
    },
    {
      value: "HOSOCHOBOSUNG",
      label: "Chờ bổ sung",
      color: "cyan",
      num_key: "4",
      name: "trang_thai_ho_so",
    },
  ],
  tuCongBoVanPhongOptions: [
    {
      value: "MOITIEPNHAN",
      label: "Tiếp nhận",
      color: "orange",
      num_key: "1",
      name: "trang_thai_ho_so",
    },
    {
      value: "HOSOCHOBOSUNG",
      label: "Chờ bổ sung",
      color: "cyan",
      num_key: "4",
      name: "trang_thai_ho_so",
    },
    {
      value: "DABOSUNG",
      label: "Đã bổ sung",
      color: "purple",
      num_key: "5",
      name: "trang_thai_ho_so",
    },
    {
      value: "HOSODAT",
      label: "Đạt",
      color: "green",
      num_key: "3",
      name: "trang_thai_ho_so",
    },
    {
      value: "RUTHOSO",
      label: "Rút hồ sơ",
      color: "red",
      num_key: "6",
      name: "trang_thai_ho_so",
    },
  ],
  tuCongBoNghiepVuOptions: [
    {
      value: "MOITIEPNHAN",
      label: "Tiếp nhận",
      color: "orange",
      num_key: "1",
      name: "trang_thai_ho_so",
    },
    {
      value: "DATIEPNHAN",
      label: "Đã tiếp nhận",
      color: "volcano",
      num_key: "2",
      name: "trang_thai_ho_so",
    },
    {
      value: "HOSOCHOBOSUNG",
      label: "Chờ bổ sung",
      color: "cyan",
      num_key: "4",
      name: "trang_thai_ho_so",
    },
    {
      value: "DABOSUNG",
      label: "Đã bổ sung",
      color: "purple",
      num_key: "5",
      name: "trang_thai_ho_so",
    },
    {
      value: "HOSODAT",
      label: "Đạt",
      color: "green",
      num_key: "3",
      name: "trang_thai_ho_so",
    },
  ],
  tuCongBoOptions: [
    {
      value: "TIEPNHAN",
      label: "Tiếp nhận",
      color: "orange",
      num_key: "11",
      name: "trang_thai_ho_so",
    },
    {
      value: "DAT",
      label: "Đạt",
      color: "volcano",
      num_key: "12",
      name: "trang_thai_ho_so",
    },
    {
      value: "KHONGDAT",
      label: "Không đạt",
      color: "cyan",
      num_key: "13",
      name: "trang_thai_ho_so",
    },
    {
      value: "CHUAHOANTHIEN",
      label: "Chưa hoàn thiện",
      color: "purple",
      num_key: "14",
      name: "trang_thai_ho_so",
    },
  ],
  tuCongBoOption: {
    MOITIEPNHAN: [
      {
        value: "DATIEPNHAN",
        label: "Đã tiếp nhận",
        color: "volcano",
        num_key: "2",
        name: "trang_thai_ho_so",
      },
      {
        value: "HOSOCHOBOSUNG",
        label: "Chờ bổ sung",
        color: "cyan",
        num_key: "4",
        name: "trang_thai_ho_so",
      },
      {
        value: "HOSODAT",
        label: "Đạt",
        color: "green",
        num_key: "3",
        name: "trang_thai_ho_so",
      },
    ],
    DATIEPNHAN: [
      {
        value: "DATIEPNHAN",
        label: "Đã tiếp nhận",
        color: "volcano",
        num_key: "2",
        name: "trang_thai_ho_so",
      },
      {
        value: "HOSOCHOBOSUNG",
        label: "Chờ bổ sung",
        color: "cyan",
        num_key: "4",
        name: "trang_thai_ho_so",
      },
      {
        value: "HOSODAT",
        label: "Đạt",
        color: "green",
        num_key: "3",
        name: "trang_thai_ho_so",
      },
    ],
    NGHIEPVU_HOSOCHOBOSUNG: [
      {
        value: "HOSOCHOBOSUNG",
        label: "Chờ bổ sung",
        color: "cyan",
        num_key: "4",
        name: "trang_thai_ho_so",
      },
      {
        value: "DABOSUNG",
        label: "Đã bổ sung",
        color: "purple",
        num_key: "5",
        name: "trang_thai_ho_so",
      },
      {
        value: "HOSODAT",
        label: "Đạt",
        color: "green",
        num_key: "3",
        name: "trang_thai_ho_so",
      },
    ],
    VANPHONG_HOSOCHOBOSUNG: [
      {
        value: "HOSOCHOBOSUNG",
        label: "Chờ bổ sung",
        color: "cyan",
        num_key: "4",
        name: "trang_thai_ho_so",
      },
      {
        value: "DABOSUNG",
        label: "Đã bổ sung",
        color: "purple",
        num_key: "5",
        name: "trang_thai_ho_so",
      },
      {
        value: "RUTHOSO",
        label: "Rút hồ sơ",
        color: "red",
        num_key: "6",
        name: "trang_thai_ho_so",
      },
    ],
    HOSOCHOBOSUNG: [
      {
        value: "HOSOCHOBOSUNG",
        label: "Chờ bổ sung",
        color: "cyan",
        num_key: "4",
        name: "trang_thai_ho_so",
      },
      {
        value: "DABOSUNG",
        label: "Đã bổ sung",
        color: "purple",
        num_key: "5",
        name: "trang_thai_ho_so",
      },
      {
        value: "RUTHOSO",
        label: "Rút hồ sơ",
        color: "red",
        num_key: "6",
        name: "trang_thai_ho_so",
      },
    ],
    DABOSUNG: [
      {
        value: "DABOSUNG",
        label: "Đã bổ sung",
        color: "purple",
        num_key: "5",
        name: "trang_thai_ho_so",
      },
      {
        value: "HOSOCHOBOSUNG",
        label: "Chờ bổ sung",
        color: "cyan",
        num_key: "4",
        name: "trang_thai_ho_so",
      },
      {
        value: "HOSODAT",
        label: "Đạt",
        color: "green",
        num_key: "3",
        name: "trang_thai_ho_so",
      },
    ],
    HOSODAT: [
      {
        value: "DABOSUNG",
        label: "Đã bổ sung",
        color: "purple",
        num_key: "5",
        name: "trang_thai_ho_so",
      },
      {
        value: "DATIEPNHAN",
        label: "Đã tiếp nhận",
        color: "volcano",
        num_key: "2",
        name: "trang_thai_ho_so",
      },
      {
        value: "HOSOCHOBOSUNG",
        label: "Chờ bổ sung",
        color: "cyan",
        num_key: "4",
        name: "trang_thai_ho_so",
      },
      {
        value: "HOSODAT",
        label: "Đạt",
        color: "green",
        num_key: "3",
        name: "trang_thai_ho_so",
      },
    ],
    RUTHOSO: [
      {
        value: "RUTHOSO",
        label: "Rút hồ sơ",
        color: "red",
        num_key: "6",
        name: "trang_thai_ho_so",
      },
    ],
  },
  xuLyOptions: [
    {
      value: "CHOXULY",
      label: "Chờ xử lý",
      color: "geekblue",
      num_key: "8",
      name: "trang_thai_ho_so",
    },
    {
      value: "DANGXULY",
      label: "Đang xử lý",
      color: "blue",
      num_key: "9",
      name: "trang_thai_ho_so",
    },
    {
      value: "DAXULYXONG",
      label: "Đã xử lý xong",
      color: "green",
      num_key: "10",
      name: "trang_thai_ho_so",
    },
  ],
};

export const CONST_KET_QUA_THAM_DINH = {
  DAT: "DAT",
  KHONGDAT: "KHONGDAT",
  CHOHOANTHIEN: "CHOHOANTHIEN",
  options: [
    { value: "DAT", label: "Đạt", color: "green" },
    { value: "KHONGDAT", label: "Không đạt", color: "volcano" },
    { value: "CHOHOANTHIEN", label: "Chờ hoàn thiện", color: "geekblue" },
  ],
};

export const CONST_KET_LUAN = {
  DAT: "DAT",
  KHONGDAT: "KHONGDAT",
  options: [
    { value: "DAT", label: "Đạt", color: "green" },
    { value: "KHONGDAT", label: "Không đạt", color: "volcano" },
  ],
  render: (ketLuan) => {
    switch (ketLuan) {
      case "DAT":
        return "Đạt";
      case "KHONGDAT":
        return "Không đạt";
      default:
        return "";
    }
  },
};

export const CONST_BIEUMAU_TYPE = {
  KEHOACHTHANHKIEMTRA: "KEHOACHTHANHKIEMTRA",
  CUOCTHANHKIEMTRA: "CUOCTHANHKIEMTRA",
  BIENBANTHANHKIEMTRA: "BIENBANTHANHKIEMTRA ",
  QUYETDINHTHANHLAPDOANTHANHKIEMTRA: "QUYETDINHTHANHLAPDOANTHANHKIEMTRA",
  KEHOACHTIENHANHTHANHKIEMTRA: "KEHOACHTIENHANHTHANHKIEMTRA",
  KEHOACHTHAMDINHCAPGCN: "KEHOACHTHAMDINHCAPGCN",

  KEHOACHGIAMSATATTP: "KEHOACHGIAMSATATTP",
  QUYETDINHGIAMSATATTP: "QUYETDINHGIAMSATATTP",

  HOSOTHAMDINH_BANHANHCONGVAN: "HOSOTHAMDINH_BANHANHCONGVAN",
  FILEHOSOMOTCUA: "FILEHOSOMOTCUA",
  data: {
    KEHOACHTHANHKIEMTRA: CONST_VBDH_CONFIG.KHTKT,
    CUOCTHANHKIEMTRA: {
      tenHoSo: "Cuộc thanh kiểm tra",
      maHoSo: "CTKT.",
    },
    BIENBANTHANHKIEMTRA: {
      tenHoSo: "Biên bản thanh kiểm tra",
      maHoSo: "BBTKT.",
    },
    KEHOACHGIAMSATATTP: {
      tenHoSo: "Biên bản giám sát an toàn thực phẩm",
      maHoSo: "BBGS.",
    },
  },
  options: ["KEHOACHTHANHKIEMTRA", "CUOCTHANHKIEMTRA", "BIENBANTHANHKIEMTRA"],
};

export const CONST_ATTACH_DOAN_VAO_TYPE = {
  FILEDINHKEMDOANVAO: "FILEDINHKEMDOANVAO",
};

export const CONST_ATTACH_DOAN_RA_TYPE = {
  FILEDINHKEMDOANRA: "FILEDINHKEMDOANRA",
};

export const CONST_ATTACH_TYPE = {
  KEHOACHTHAMDINH_GIAYCHUNGNHAN: "KEHOACHTHAMDINH_GIAYCHUNGNHAN",
  KEHOACHTHAMDINH_CHUOITHUCPHAM: "KEHOACHTHAMDINH_CHUOITHUCPHAM",
  HOSO_GIAYCHUNGNHAN: "HOSO_GIAYCHUNGNHAN",
  HOSO_CHUOITHUCPHAM: "HOSO_CHUOITHUCPHAM",
  HOSO_CONGBOSANPHAM: "HOSO_CONGBOSANPHAM",
  HOSO_CONGBOSANPHAM_SANPHAM: "HOSO_CONGBOSANPHAM_SANPHAM",
  KEHOACHTHANHKIEMTRA: "KEHOACHTHANHKIEMTRA",
  CUOCTHANHKIEMTRA: "CUOCTHANHKIEMTRA",
  BIEUMAUCUOCTHANHKIEMTRA: "BIEUMAUCUOCTHANHKIEMTRA",
  BIEUMAUKEHOACHTHANHKIEMTRA: "BIEUMAUKEHOACHTHANHKIEMTRA",
  BIEUMAUBIENBANTHANHKIEMTRA: "BIEUMAUBIENBANTHANHKIEMTRA",
  QUYETDINHTHANHLAPDOANTHANHKIEMTRA: "QUYETDINHTHANHLAPDOANTHANHKIEMTRA",
  QUYETDINHTHANHLAPDOANGIAMSAT: "QUYETDINHTHANHLAPDOANGIAMSAT",
  KEHOACHTIENHANHTHANHTRA: "KEHOACHTIENHANHTHANHTRA",
  KETLUANCUOCTHANHTRA: "KETLUANCUOCTHANHTRA",
  DENGHITHANHTOAN: "DENGHITHANHTOAN",
  QUYETDINHDIEUCHUYEN: "QUYETDINHDIEUCHUYEN",
  KEHOACHGIAMSATONHIEM: "KEHOACHGIAMSATONTP",

  QLTS_TAISAN: "FILEDINHKEMTAISAN",
  QLTS_TAISAN_DETAIL: "FILEDINHKEMTAISANCHITIET",
  QLTS_CAPPHAT: "CAPPHATTAISAN",
  QLTS_SUACHUA: "SUACHUATAISAN",
  KEHOACHGIAMSATATTP: "KEHOACHGIAMSATATTP",
  QUYETDINHGIAMSATATTP: "QUYETDINHGIAMSATATTP",
  KEHOACHTHAMDINHCAPGCN: "KEHOACHTHAMDINHCAPGCN",
  FILEHOSOMOTCUA: "FILEHOSOMOTCUA",
  HOSOTHAMDINH_BANHANHCONGVAN: "HOSOTHAMDINH_BANHANHCONGVAN",
  KEHOACHTAICHINH: "KEHOACHTAICHINH",
  data: {
    HOSOTHAMDINH_BANHANHCONGVAN: {
      tenHoSo: "Công văn",
      maHoSo: "CVHSTDCGCN-",
    },
    KEHOACHTHAMDINH_GIAYCHUNGNHAN: {
      tenHoSo: "Kế hoạch thẩm định cấp giấy chứng nhận",
      maHoSo: "KHTDCGCN-",
    },
    KEHOACHTHAMDINH_CHUOITHUCPHAM: {
      tenHoSo: "Kế hoạch thẩm định chuỗi thực phẩm",
      maHoSo: "KHTDCTP-",
    },
    HOSO_GIAYCHUNGNHAN: {
      tenHoSo: "Hồ sơ giấy chứng nhận",
      maHoSo: "HSGCN-",
    },
    HOSO_CHUOITHUCPHAM: {
      tenHoSo: "Hồ sơ chuỗi thực phẩm",
      maHoSo: "HSCTP-",
    },
    HOSO_CONGBOSANPHAM: {
      tenHoSo: "Hồ sơ công bố sản phẩm",
      maHoSo: "HSCBSP-",
    },
    HOSO_CONGBOSANPHAM_SANPHAM: {
      tenHoSo: "Hồ sơ công bố sản phẩm - Sản phẩm",
      maHoSo: "HSCBSP-SP-",
    },
    CUOCTHANHKIEMTRA: {
      tenHoSo: "Cuộc thanh kiểm tra",
      maHoSo: "CTKT-",
    },
    BIEUMAUCUOCTHANHKIEMTRA: {
      tenHoSo: "Biểu mẫu cuộc thanh kiểm tra",
      maHoSo: "BMCTKT-",
    },
    BIEUMAUKEHOACHTHANHKIEMTRA: {
      tenHoSo: "Biểu mẫu kế hoạch thanh kiểm tra",
      maHoSo: "BMKHTKT-",
    },
    BIEUMAUBIENBANTHANHKIEMTRA: {
      tenHoSo: "Biểu mẫu biên bản thanh kiểm tra",
      maHoSo: "BMBBTKT-",
    },
    KEHOACHGIAMSATATTP: {
      tenHoSo: "Kế hoạch giám sát ATTP tại sự kiện lễ hội",
    },
    QUYETDINHGIAMSATATTP: {
      tenHoSo: "Quyết định giám sát ATTP tại sự kiện lễ hội",
    },
    KEHOACHTHAMDINHCAPGCN: {
      tenHoSo: "Kế hoạch thẩm định cấp giáy chứng nhận",
    },
    KEHOACHTAICHINH: {
      tenHoSo: "Kế hoạch tài chính",
    },
  },
  options: [
    "KEHOACHTHAMDINH_GIAYCHUNGNHAN",
    "HOSO_GIAYCHUNGNHAN",
    "KEHOACHTHAMDINH_CHUOITHUCPHAM",
    "HOSO_CHUOITHUCPHAM",
    "HOSO_CONGBOSANPHAM",
    "HOSO_CONGBOSANPHAM_SANPHAM",
    "CUOCTHANHKIEMTRA",
    "BIEUMAUCUOCTHANHKIEMTRA",
    "BIEUMAUKEHOACHTHANHKIEMTRA",
    "BIEUMAUBIENBANTHANHKIEMTRA",
    "FILEDINHKEMTAISAN",
    "FILEDINHKEMTAISANCHITIET",
    "CAPPHATTAISAN",
    "SUACHUATAISAN",
    "GIAMSATATTPTAILEHOI",
    "KEHOACHGIAMSATATTP",
    "QUYETDINHGIAMSATATTP",
    "KEHOACHTHAMDINHCAPGCN",
    "KEHOACHTAICHINH",
  ],
};

export const CONST_TYPE_TRANG_THAI_CHUYEN_HO_SO = {
  KEHOACHTHANHKIEMTRA: "KEHOACHTHANHKIEMTRA",
  CUOCTHANHKIEMTRA: "CUOCTHANHKIEMTRA ",
  HOSOTUCONGBO: "HOSOTUCONGBO",
  KEHOACHTAICHINH: "KEHOACHTAICHINH",
  GIAMSATATTPTAILEHOI: "GIAMSATATTPTAILEHOI",
  THANHLYTAISAN: "THANHLYTAISAN",
  PHANBODUTOAN: "PHANBODUTOAN",
  COSOSXKD: "COSOSXKD",
  TRINHPHEDUYETBOSUNGCOSO: "TRINHPHEDUYETBOSUNGCOSO",
};

export const CONST_TRANG_THAI_TAI_SAN = {
  CHUACAP: "CHUACAP",
  DANGSUDUNG: "DANGSUDUNG",
  THUHOI: "THUHOI",
  render: (trangThai) => {
    switch (trangThai) {
      case "CHUACAP":
        return { label: "Chưa cấp", color: "blue" };
      case "DANGSUDUNG":
        return { label: "Đang sử dụng", color: "green" };
      case "THUHOI":
        return { label: "Thu hồi", color: "red" };
      default:
        return { label: "Không xác định", color: "" };
    }
  },
};

export const CONST_TRANG_THAI_THANH_LY_TAI_SAN = {
  CHUATHANHLY: "CHUATHANHLY",
  YEUCAUTHANHLY: "YEUCAUTHANHLY",
  CHOTHANHLY: "CHOTHANHLY",
  DATHANHLY: "DATHANHLY",
  render: (trangThai) => {
    switch (trangThai) {
      case "CHUATHANHLY":
        return { label: "Chưa thanh lý", color: "blue" };
      case "YEUCAUTHANHLY":
        return { label: "Yêu cầu thanh lý", color: "red" };
      case "CHOTHANHLY":
        return { label: "Chờ thanh lý", color: "orange" };
      case "DATHANHLY":
        return { label: "Đã thanh lý", color: "green" };
      default:
        return { label: "Không xác định", color: "" };
    }
  },
};

export const CONST_TRANG_THAI_CAP_PHAT_TAI_SAN = {
  CAPPHAT: "CAPPHAT",
  DIEUCHUYEN: "DIEUCHUYEN",
  THUHOI: "THUHOI",
  render: (trangThai) => {
    switch (trangThai) {
      case "CAPPHAT":
        return { label: "Cấp phát", color: "primary", icon: "fa fa-share-alt" };
      case "DIEUCHUYEN":
        return { label: "Điều chuyển", color: "green", icon: "fa fa-exchange" };
      case "THUHOI":
        return { label: "Thu hồi", color: "danger", icon: "fa fa-reply" };
      default:
        return { label: "Không xác định", color: "", icon: "" };
    }
  },
};

export const CONST_TRANG_THAI_HOAT_DONG = {
  name: "trang_thai_hoat_dong",
  DANGHOATDONG: "DANGHOATDONG",
  NGUNGHOATDONG: "NGUNGHOATDONG",
  DINHCHI: "DINHCHI",
  DANGHOATDONG_NUM_KEY: "1",
  NGUNGHOATDONG_NUM_KEY: "2",
  DINHCHI_NUM_KEY: "3",
  options: [
    {
      value: "DANGHOATDONG",
      label: "Đang hoạt động",
      num_key: "1",
      name: "trang_thai_hoat_dong",
    },
    {
      value: "NGUNGHOATDONG",
      label: "Ngưng hoạt động",
      num_key: "2",
      name: "trang_thai_hoat_dong",
    },
    {
      value: "DINHCHI",
      label: "Đình chỉ",
      num_key: "3",
      name: "trang_thai_hoat_dong",
    },
  ],
};

export const CONST_TINH_TRANG_GIAY_CHUNG_NHAN = {
  name: "tinh_trang_gcn",
  CONHAN: "CONHAN",
  HETHAN: "HETHAN",
  CONHAN_NUM_KEY: "1",
  HETHAN_NUM_KEY: "2",
  options: [
    {
      value: "CONHAN",
      selectValue: "true",
      label: "Còn hạn",
      num_key: "1",
      name: "tinh_trang_gcn",
    },
    {
      value: "HETHAN",
      selectValue: "false",
      label: "Hết hạn",
      num_key: "2",
      name: "tinh_trang_gcn",
    },
  ],
};

export const CONST_PHONG_BAN = {
  ADMIN: "ADMIN",
  LANHDAO: "LANHDAO",
  NGHIEPVU: "NGHIEPVU",
  THANHTRA: "THANHTRA",
  DOI1: "DOI1",
  DOI2: "DOI2",
  VANPHONG: "VANPHONG",
  label: {
    ADMIN: "Hệ thống",
    LANHDAO: "Lãnh đạo",
    NGHIEPVU: "Phòng Nghiệp vụ",
    THANHTRA: "Phòng Công tác Thanh tra",
    DOI1: "Đội Quản lý ATTP 1",
    DOI2: "Đội Quản lý ATTP 2",
    VANPHONG: "Văn phòng",
  },
  options: [
    { value: "ADMIN", label: "Hệ thống" },
    { value: "LANHDAO", label: "Lãnh đạo" },
    { value: "NGHIEPVU", label: "Phòng Nghiệp vụ" },
    { value: "THANHTRA", label: "Phòng Công tác Thanh tra" },
    { value: "DOI1", label: "Đội Quản lý ATTP 1" },
    { value: "DOI2", label: "Đội Quản lý ATTP 2" },
    { value: "VANPHONG", label: "Văn phòng" },
  ],
  optionsKeHoach: [
    { value: "THANHTRA", label: "Phòng Công tác Thanh tra" },
    { value: "NGHIEPVU", label: "Phòng Nghiệp vụ" },
    { value: "DOI1", label: "Đội Quản lý ATTP 1" },
    { value: "DOI2", label: "Đội Quản lý ATTP 2" },
  ],
};

export const CONST_CHUC_VU = {
  ADMIN: "ADMIN",
  TRUONGBAN: "TRUONGBAN",
  PHOTRUONGBAN: "PHOTRUONGBAN",
  TRUONGPHONG: "TRUONGPHONG",
  PHOTRUONGPHONG: "PHOTRUONGPHONG",
  DOITRUONG: "DOITRUONG",
  PHODOITRUONG: "PHODOITRUONG",
  CHANHVANPHONG: "CHANHVANPHONG",
  PHOCHANHVANPHONG: "PHOCHANHVANPHONG",
  CHUYENVIEN: "CHUYENVIEN",
  label: {
    ADMIN: "Quản trị viên",
    TRUONGBAN: "Trưởng ban",
    PHOTRUONGBAN: "Phó trưởng ban",
    TRUONGPHONG: "Trưởng phòng",
    PHOTRUONGPHONG: "Phó trưởng phòng",
    DOITRUONG: "Đội trưởng",
    PHODOITRUONG: "Phó đội trưởng",
    CHANHVANPHONG: "Chánh văn phòng",
    PHOCHANHVANPHONG: "Phó chánh văn phòng",
    CHUYENVIEN: "Chuyên viên",
  },
  options: [
    { value: "ADMIN", label: "Quản trị hệ thống" },
    { value: "TRUONGBAN", label: "Trưởng ban" },
    { value: "PHOTRUONGBAN", label: "Phó trưởng ban" },
    { value: "TRUONGPHONG", label: "Trưởng phòng" },
    { value: "PHOTRUONGPHONG", label: "Phó trưởng phòng" },
    { value: "DOITRUONG", label: "Đội trưởng" },
    { value: "PHODOITRUONG", label: "Phó đội trưởng" },
    { value: "CHANHVANPHONG", label: "Chánh văn phòng" },
    { value: "PHOCHANHVANPHONG", label: "Phó chánh văn phòng" },
    { value: "CHUYENVIEN", label: "Chuyên viên" },
  ],
  [`options${CONST_PHONG_BAN.LANHDAO}`]: [
    { value: "TRUONGBAN", label: "Trưởng ban" },
    { value: "PHOTRUONGBAN", label: "Phó trưởng ban" },
  ],
  [`options${CONST_PHONG_BAN.DOI1}`]: [
    { value: "DOITRUONG", label: "Đội trưởng" },
    { value: "PHODOITRUONG", label: "Phó đội trưởng" },
    { value: "CHUYENVIEN", label: "Chuyên viên" },
  ],
  [`options${CONST_PHONG_BAN.DOI2}`]: [
    { value: "DOITRUONG", label: "Đội trưởng" },
    { value: "PHODOITRUONG", label: "Phó đội trưởng" },
    { value: "CHUYENVIEN", label: "Chuyên viên" },
  ],
  [`options${CONST_PHONG_BAN.THANHTRA}`]: [
    { value: "TRUONGPHONG", label: "Trưởng phòng" },
    { value: "PHOTRUONGPHONG", label: "Phó trưởng phòng" },
    { value: "CHUYENVIEN", label: "Chuyên viên" },
  ],
  [`options${CONST_PHONG_BAN.NGHIEPVU}`]: [
    { value: "TRUONGPHONG", label: "Trưởng phòng" },
    { value: "PHOTRUONGPHONG", label: "Phó trưởng phòng" },
    { value: "CHUYENVIEN", label: "Chuyên viên" },
  ],
  [`options${CONST_PHONG_BAN.VANPHONG}`]: [
    { value: "CHANHVANPHONG", label: "Chánh văn phòng" },
    { value: "PHOCHANHVANPHONG", label: "Phó chánh văn phòng" },
    { value: "CHUYENVIEN", label: "Chuyên viên" },
  ],
  [`options${CONST_PHONG_BAN.ADMIN}`]: [
    { value: "ADMIN", label: "Quản trị hệ thống" },
    { value: "CHUYENVIEN", label: "Chuyên viên" },
  ],
  optionsChuyenHoSo: [
    { value: "TRUONGPHONG", label: "Trưởng phòng" },
    { value: "PHOTRUONGPHONG", label: "Phó trưởng phòng" },
    { value: "CHUYENVIEN", label: "Chuyên viên" },
  ],
  render: (chucVu) => {
    switch (chucVu) {
      case "ADMIN":
        return "Quản trị viên";
      case "TRUONGBAN":
        return "Trưởng ban";
      case "PHOTRUONGBAN":
        return "Phó trưởng ban";
      case "TRUONGPHONG":
        return "Trưởng phòng";
      case "PHOTRUONGPHONG":
        return "Phó trưởng phòng";
      case "DOITRUONG":
        return "Đội trưởng";
      case "PHODOITRUONG":
        return "Đội phó";
      case "CHANHVANPHONG":
        return "Chánh văn phòng";
      case "PHOCHANHVANPHONG":
        return "Phó chánh văn phòng";
      case "CHUYENVIEN":
        return "Chuyên viên";
      default:
        return null;
    }
  },
};

export const CONST_CHUC_DANH_DOAN_THAM_DINH = {
  TRUONGDOAN: "TRUONGDOAN",
  PHOTRUONGDOAN: "PHOTRUONGDOAN",
  THANHVIEN: "THANHVIEN",
  THUKY: "THUKY",
  options: [
    { value: "TRUONGDOAN", label: "Trưởng đoàn" },
    { value: "PHOTRUONGDOAN", label: "Phó trưởng đoàn" },
    { value: "THANHVIEN", label: "Thành viên" },
    { value: "THUKY", label: "Thư ký" },
  ],
  render: (chucDanh) => {
    switch (chucDanh) {
      case "TRUONGDOAN":
        return "Trưởng đoàn";
      case "PHOTRUONGDOAN":
        return "Phó trưởng đoàn";
      case "THANHVIEN":
        return "Thành viên";
      case "THUKY":
        return "Thư ký";
      default:
        return null;
    }
  },
};

export const CONST_CONFIRM_DATA_MSG =
  "Vui lòng kiểm tra dữ liệu trước khi gửi.";
export const CONST_CONFIRM_DATA_KEY = "CONST_CONFIRM_DATA_KEY";
export const CONST_FAILED_ACTION = "Thao tác thất bại!";
export const CONST_NOT_DEFIENED_ACTION = "Thao tác chưa được định nghĩa!";

export const CONST_START_DOWNLOAD_KEY = "CONST_START_DOWNLOAD_KEY";
export const CONST_START_DOWNLOAD_MSG = "Một file đang được tải xuống!";
export const CONST_DOWNLOAD_SUCCESS_KEY = "CONST_DOWNLOAD_SUCCESS_KEY";
export const CONST_DOWNLOAD_SUCCESS_MSG = "Tải file thành công!";
export const CONST_DOWNLOAD_ERROR_KEY = "CONST_DOWNLOAD_ERROR_KEY";
export const CONST_DOWNLOAD_ERROR_MSG = "Tải file thất bại!";

export const CONST_LAYOUT_KEY_MENU_LEFT = "CONST_LAYOUT_KEY_MENU_LEFT";
export const CONST_LAYOUT_KEY_MENU_RIGHT = "CONST_LAYOUT_KEY_MENU_RIGHT";
export const CONST_LAYOUT_KEY_TABLE = "CONST_LAYOUT_KEY_TABLE";
export const CONST_LAYOUT_KEY_FORM = "CONST_LAYOUT_KEY_FORM";

export const CONST_TRANG_THAI_HO_SO_OPTIONS = [
  { value: 3, label: "Chờ bổ sung hồ sơ" },
  { value: 4, label: "Chờ ký duyệt" },
  { value: 12, label: "Chờ thực hiện liên thông" },
  { value: 9, label: "Chờ thực hiện nghĩa vụ tài chính" },
  { value: 14, label: "Chờ trả thông báo nghĩa vụ tài chính" },
  { value: 2, label: "Chờ xử lý" },
  { value: 7, label: "Công dân yêu cầu rút hồ sơ" },
  { value: 1, label: "Hồ sơ chuyển phòng chuyên môn" },
  { value: 8, label: "Hồ sơ không xử lý được" },
  { value: 19, label: "Hồ sơ mới tiếp nhận" },
  { value: 0, label: "Hồ sơ đăng ký mới trực tuyến" },
  { value: 16, label: "Không tiếp nhận" },
  { value: 15, label: "Đang xử lý" },
  { value: 17, label: "Đã bổ sung - chờ tiếp nhận" },
  { value: 13, label: "Đã nhận kết quả liên thông" },
  { value: 18, label: "Đã rút hồ sơ" },
  { value: 5, label: "Đã trả kết quả" },
  { value: 6, label: "Đã xử lý xong" },
];

export const CONST_CHUC_VU_NHAN_SU_OPTIONS = [
  { value: "TRUONGBAN", label: "Trưởng ban" },
  { value: "PHOTRUONGBAN", label: "Phó trưởng ban" },
  { value: "TRUONGPHONG", label: "Trưởng phòng" },
  { value: "PHOTRUONGPHONG", label: "Phó trưởng phòng" },
  { value: "CHUYENVIEN", label: "Chuyên viên" },
  { value: "THUKY", label: "Thư ký" },
];

export const CONST_TRANG_THAI_NHAN_SU_OPTIONS = [
  { value: "DANGCONGTAC", label: "Đang công tác", color: "green" },
  { value: "NGHICONGTAC", label: "Nghỉ công tác", color: "volcano" },
  { value: "CHUYENCONGTAC", label: "Chuyển công tác", color: "geekblue" },
];

export const CONST_TRANGTHAI_KHENTHUONG_OPTIONS = [
  { value: "DATHUCHIEN", label: "Đã thực hiện", color: "green" },
  { value: "CHUATHUCHIEN", label: "Chưa thực hiện", color: "geekblue" },
  { value: "HUY", label: "Hủy", color: "volcano" },
];

export const CONST_DOITUONG_KHENTHUONG_OPTIONS = [
  { value: "NHANSU", label: "Nhân sự" },
  { value: "PHONGBAN", label: "Phòng ban" },
];

export const CONST_TAISANCONG_TINHTRANG_OPTIONS = [
  { value: "CHUASUDUNG", label: "Chưa sử dụng", color: "geekblue" },
  { value: "DANGSUDUNG", label: "Đang sử dụng", color: "green" },
  { value: "HUHONG", label: "Hư hỏng", color: "volcano" },
];

export const CONST_CHUC_DANH_THANH_VIEN_DOAN_THANH_TRA_OPTIONS = {
  TRUONG_DOAN: "Trưởng đoàn",
  PHO_TRUONG_DOAN: "Phó trưởng đoàn",
  THANH_VIEN: "Thành viên",
};

export const CONST_NGHIEPVUTHANHTRA_KETLUAN_OPTIONS = {
  DAT: "DAT",
  KHONGDAT: "KHONGDAT",
  TAMDUNGKINHDOANH: "TAMDUNGKINHDOANH",
  NGHI: "NGHI",
  CHUYENDIABAN: "CHUYENDIABAN",
  CHUYENSANGHOKINHDOANHCATHE: "CHUYENSANGHOKINHDOANHCATHE",
  COSOMOITHAMDINH: "COSOMOITHAMDINH",
  COSOKHONGPHUCVUANUONG: "COSOKHONGPHUCVUANUONG",
  options: [
    {
      value: "DAT",
      label: "Đạt",
      type: "success",
      iconClass: "fa fa-check-circle m-r-10",
      color: "green",
    },
    {
      value: "KHONGDAT",
      label: "Không đạt",
      type: "danger",
      iconClass: "fa fa-exclamation-circle m-r-10",
      color: "red",
    },
    { value: "TAMDUNGKINHDOANH", label: "Tạm dừng kinh doanh", color: "red" },
    { value: "NGHI", label: "Nghỉ", color: "red" },
    { value: "CHUYENDIABAN", label: "Chuyển địa bàn", color: "red" },
    {
      value: "CHUYENSANGHOKINHDOANHCATHE",
      label: "Chuyển sang hộ kinh doanh cá thể",
      color: "red",
    },
    { value: "COSOMOITHAMDINH", label: "Cơ sở mới thẩm định", color: "red" },
    {
      value: "COSOKHONGPHUCVUANUONG",
      label: "Cơ sở không phục vụ ăn uống",
      color: "red",
    },
  ],
  options1: [
    { value: "TAMDUNGKINHDOANH", label: "Tạm dừng kinh doanh", color: "red" },
    { value: "NGHI", label: "Nghỉ", color: "red" },
    { value: "CHUYENDIABAN", label: "Chuyển địa bàn", color: "red" },
    { value: "COSOMOITHAMDINH", label: "Cơ sở mới thẩm định", color: "red" },
  ],
  options2: [
    {
      value: "DAT",
      label: "Đạt",
      type: "success",
      iconClass: "fa fa-check-circle m-r-10",
      color: "green",
    },
    {
      value: "KHONGDAT",
      label: "Không đạt",
      type: "danger",
      iconClass: "fa fa-exclamation-circle m-r-10",
      color: "red",
    },
    {
      value: "CHUYENSANGHOKINHDOANHCATHE",
      label: "Chuyển sang hộ kinh doanh cá thể",
      color: "red",
    },
    {
      value: "COSOKHONGPHUCVUANUONG",
      label: "Cơ sở không phục vụ ăn uống",
      color: "red",
    },
  ],
  render: (value) => {
    switch (value) {
      case "DAT":
        return (
          <Tag color="green">
            <i className="fa fa-check-circle m-r-10" />
            Đạt
          </Tag>
        );
      case "KHONGDAT":
        return (
          <Tag color="red">
            <i className="fa fa-exclamation-circle m-r-10" />
            Không đạt
          </Tag>
        );
      case "TAMDUNGKINHDOANH":
        return <Tag color="red">Tạm dừng kinh doanh</Tag>;
      case "NGHI":
        return <Tag color="red">Nghỉ</Tag>;
      case "CHUYENDIABAN":
        return <Tag color="red">Chuyển địa bàn</Tag>;
      case "CHUYENSANGHOKINHDOANHCATHE":
        return <Tag color="red">Chuyển sang hộ kinh doanh cá thể</Tag>;
      case "COSOMOITHAMDINH":
        return <Tag color="blue">Cơ sở mới thẩm định</Tag>;
      case "COSOKHONGPHUCVUANUONG":
        return <Tag color="yellow">Cơ sở không phục vụ ăn uống</Tag>;
      default:
        return value ? <Tag>{value}</Tag> : null;
    }
  },
};

export const CONST_NGHIEPVUTHANHTRA_BIEN_BAN_THANH_TRA_NHOM_HANH_VI_OPTIONS = [
  { value: "DIEUKIEN", label: "Vi phạm điều kiện ATTP" },
  { value: "CHITIEU", label: "Vi phạm chỉ tiêu ATTP" },
  { value: "GIANLAN", label: "Vi phạm gian lận ATTP" },
];

export const CONST_DEFAULT_TINHTHANH = {
  ma: "48",
  ten: "Thành phố đà nẵng",
};

export const CONST_TRANG_THAI_GCN_ATTP_OPTIONS = [
  { value: true, label: "Còn hạn" },
  { value: false, label: "Hết hạn" },
];

export const CONST_LOAI_HOSO_CAP_GCN = {
  CAPMOI: "CAPMOI",
  CAPDOI: "CAPDOI",
  CAPLAI: "CAPLAI",
  options: [
    { value: "CAPMOI", label: "Cấp mới", color: "green" },
    { value: "CAPDOI", label: "Cấp đổi", color: "red" },
    { value: "CAPLAI", label: "Cấp lại", color: "blue" },
  ],
  render: (value) => {
    switch (value) {
      case "CAPMOI":
        return <Tag color="green">Cấp mới</Tag>;
      case "CAPDOI":
        return <Tag color="red">Cấp đổi</Tag>;
      case "CAPLAI":
        return <Tag color="blue">Cấp lại</Tag>;
      default:
        return <Tag>{value}</Tag>;
    }
  },
};

/**
 *  START_QLTDTXLNDTP
 *  Quản lý quy trình điều tra, xử lý ngộ độc thực phẩm
 */
export const CONST_TRANG_THAI_QTDT_XL_NDTP_HO_SO_OPTIONS = {
  options: [
    {
      value: "DaXacNhan",
      label: "Vụ ngộ độc thực phẩm",
      color: "green",
      status: "Vụ ngộ độc thực phẩm",
    },
    {
      value: "ChuaXacNhan",
      label: "Sự cố về ATTP",
      color: "volcano",
      status: "Sự cố về ATTP",
    },
  ],
  DaXacNhan: "DaXacNhan",
  ChuaXacNhan: "ChuaXacNhan",
  render: (key) => {
    switch (key) {
      case "DaXacNhan":
        return "Vụ ngộ độc thực phẩm";
      case "ChuaXacNhan":
        return "Sự cố về ATTP";
      default:
        return "Chưa xác định";
    }
  },
};

export const CONST_TRANG_THAI_QTDT_XL_NDTP_DIEU_TRA_OPTIONS = [
  { value: "ChuaLapBienBan", label: "Chưa lập biên bản" },
  { value: "DaLapBienBan", label: "Đã lập biên bản" },
];

export const CONST_TRANG_THAI_QTDT_XL_NDTP_XU_LY_OPTIONS = [
  { value: "DaBaoCaoLanhDao", label: "Đã báo cáo lảnh đạo" },
  { value: "DaXuPhat", label: "Đã xử phạt" },
];

export const CONST_QTDT_XL_NDTP_LOAI_CO_SO_OPTIONS = {
  COSOCHINH: "COSOCHINH",
  COSOLIENQUAN: "COSOLIENQUAN",
  options: [
    { value: "COSOCHINH", label: "Cơ sở nguyên nhân" },
    { value: "COSOLIENQUAN", label: "Cơ sở liên quan" },
  ],
};

export const CONST_QTDT_XL_NDTP_TRANG_THAI_XU_LY_OPTIONS = [
  { value: "DaXuLy", label: "Đã hoàn thành xử lý", color: "green" },
  { value: "ChuaXuLy", label: "Chưa hoàn thành  xử lý", color: "volcano" },
];
/**
 *  END_QLTDTXLNDTP
 */

/**
 *  START_QLTTTCB
 *  Quản lý thủ tục tự công bố
 */
export const CONST_TRANG_THAI_HAUKIEM_OPTIONS = [
  { value: 1, label: "Đã hậu kiểm" },
  { value: 0, label: "Chưa hậu kiểm" },
];
/**
 *  END_QLTTTCB
 */

/**
 *  START_QLCTPAT
 *  Quản lý chuỗi thực phẩm an toàn
 *      Hồ sơ chuỗi thực phảm an toàn
 */
export const CONST_CHUOI_THUC_PHAM_AN_TOAN_TRANG_THAI_HO_SO_OPTIONS = [
  { value: "CHOXULY", label: "Chờ xử lý", color: "geekblue" },
  { value: "DANGXULY", label: "Đang xử lý", color: "blue" },
  { value: "DAXULYXONG", label: "Đã xử lý xong", color: "green" },
];

export const CONST_CHUOI_THUC_PHAM_AN_TOAN_KET_QUA_THAM_DINH_OPTIONS = [
  { value: "DAT", label: "Đạt", color: "green" },
  { value: "KHONGDAT", label: "Không đạt", color: "volcano" },
  { value: "CHOHOANTHIEN", label: "Chờ hoàn thiện", color: "geekblue" },
];

/**
 *  Quản lý chuỗi thực phẩm an toàn
 *      Kế hoạch thẩm định chuỗi thực phẩm an toàn
 */
export const CONST_CHUOI_THUC_PHAM_AN_TOAN_LOAI_HINH_THAM_GIA_OPTIONS = [
  { value: "COSOSANXUAT", label: "Cơ sở sản xuất", color: "geekblue" },
  { value: "COSOKINHDOANH", label: "Cơ sở kinh doanh", color: "geekblue" },
  {
    value: "COSOCHEBIENGIETMO",
    label: "Cơ sở chế biến giết mổ",
    color: "geekblue",
  },
];
/**
 *  END_QLCTPAT
 */

export const CONST_KET_QUA_THAM_DINH_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_OPTIONS = [
  { value: "DAT", label: "Đạt", color: "green" },
  { value: "KHONGDAT", label: "Không đạt", color: "volcano" },
  { value: "CHOHOANTHIEN", label: "Chờ hoàn thiện", color: "geekblue" },
];

export const CONST_KET_QUA_THAM_DINH_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_LINHVUC_NONGNGHIEP_OPTIONS = [
  { value: "A", label: "A", color: "green" },
  { value: "B", label: "B", color: "geekblue" },
  { value: "C", label: "C", color: "volcano" },
];

export const CONST_LOAI_XAC_NHAN_OPTIONS = [
  { value: "DoanhNghiep", label: "Doanh nghiệp" },
  { value: "CaNhan", label: "Cá nhân" },
];

export const CONST_SEARCH = {
  ALL: {
    DEFAULT: true,
    KEY: "SEARCH_KEY_ALL",
    TITLE: "Tất cả",
  },
  CO_SO_SAN_XUAT: {
    DEFAULT: false,
    KEY: "SEARCH_KEY_CO_SO_SAN_XUAT",
    TITLE: "Cơ sở sản xuất",
  },
  NGHIEP_VU_THANH_TRA: {
    DEFAULT: false,
    KEY: "SEARCH_KEY_NGHIEP_VU_THANH_TRA",
    TITLE: "Nghiệp vụ thanh tra",
  },
  PHAN_ANH_KIEN_NGHI: {
    DEFAULT: false,
    KEY: "SEARCH_KEY_PHAN_ANH_KIEN_NGHI",
    TITLE: "Phản ánh kiến nghị",
  },
  NGO_DOC_THUC_PHAM: {
    DEFAULT: false,
    KEY: "SEARCH_KEY_NGO_DOC_THUC_PHAM",
    TITLE: "Ngộ độc thực phẩm",
  },
  O_NHIEM_THUC_PHAM: {
    DEFAULT: false,
    KEY: "SEARCH_KEY_O_NHIEM_THUC_PHAM",
    TITLE: "Ô nhiễm thực phẩm",
  },
};

export const CONST_HSTCB_TRANG_THAI_XU_LY = {
  DANGXULY: "DANGXULY",
  DAXULY: "DAXULY",
  options: [
    {
      value: "DANGXULY",
      label: "Đang xử lý",
      color: "purple",
      num_key: "1",
      name: "trang_thai_xu_ly",
    },
    {
      value: "DAXULY",
      label: "Đã xử lý",
      color: "green",
      num_key: "2",
      name: "trang_thai_xu_ly",
    },
  ],
  render: (trangThai, isTruongBan) => {
    switch (trangThai) {
      case "DANGXULY":
        return {
          value: "DANGXULY",
          label: isTruongBan ? "Chờ phê duyệt" : "Đang xử lý",
          color: "purple",
          num_key: "1",
          name: "trang_thai_xu_ly",
        };
      case "DAXULY":
        return {
          value: "DAXULY",
          label: isTruongBan ? "Đã phê duyệt" : "Đã xử lý",
          color: "green",
          num_key: "2",
          name: "trang_thai_xu_ly",
        };
      default:
        return {
          value: trangThai,
          label: trangThai,
          color: "",
          num_key: "0",
          name: "trang_thai_xu_ly",
        };
    }
  },
};

/**
 *  Quản lý tiếp nhận và xử lý hồ sơ phản ánh kiên nghị
 */

export const CONST_HSPAKN_TRANG_THAI_XU_LY = [
  { value: "YEUCAURUTHOSO", label: "Yêu cầu rút hồ sơ", color: "red" },
  { value: "CHOXULY", label: "Chờ xử lý", color: "cyan" },
  { value: "DANGXULY", label: "Đang xử lý", color: "volcano" },
  { value: "DAXULYXONG", label: "Đã xử lý xong", color: "blue" },
  { value: "DATRAKETQUA", label: "Đã trả kết quả", color: "green" },
];

export const CONST_HSPAKN_TRANG_THAI_PHE_DUYET = [
  // { value: "YEUCAURUTHOSO", label: "Yêu cầu rút hồ sơ", color: "red" },
  { value: "CHOPHEDUYET", label: "Chờ phê duyệt", color: "cyan" },
  { value: "DANGXULY", label: "Đang xử lý", color: "volcano" },
  { value: "DAPHEDUYET", label: "Đã phê duyệt", color: "blue" },
  { value: "KHONGPHEDUYET", label: "Không phê duyệt", color: "red" },
  { value: "DATRAKETQUA", label: "Đã trả kết quả", color: "green" },
];

export const CONST_PAKN_BIEN_BAN_THANH_TRA_KET_QUA = [
  { value: "VIPHAM", label: "Vi phạm", color: "red" },
  { value: "KHONGVIPHAM", label: "Không vi phạm", color: "green" },
  { value: "CHUAKIEMTRA", label: "Chưa kiểm tra", color: "" },
];

export const CONST_PAKN_BIEN_BAN_XU_PHAT_TRANG_THAI = [
  { value: 1, label: "Chấp hành", color: "green" },
  { value: 0, label: "Không chấp hành", color: "red" },
];
/**
 *  Quản lý hồ sơ xác nhận quảng cáo
 */
export const CONST_HSXNQC_TRANG_THAI = [
  { value: "DaDuyet", label: "Đã duyệt", color: "green" },
  { value: "ChuaDuyet", label: "Chưa duyệt", color: "blue" },
  { value: "KhongDuyet ", label: "Không duyệt", color: "red" },
];

/**
 *  Quản lý hồ sơ xác nhận kiến thức attp
 */
export const CONST_HSXNKTATTP_TRANG_THAI = [
  { value: "DAT", label: "Đạt", color: "green" },
  { value: "KHONGDAT", label: "Không đạt", color: "red" },
  { value: "CHUAXACNHAN", label: "Chưa xác nhận", color: "geekblue" },
  { value: "DAXACNHAN", label: "Đã xác nhận", color: "" },
];

/**
 *  Báo cáo tổng hợp
 */
export const CONST_BAO_CAO_TONG_HOP_TRANG_THAI = [
  { value: "DANGYEUCAU", label: "Yêu cầu báo cáo", color: "orange" },
  { value: "DANGHOANTHANH", label: "Đang hoàn thành", color: "geekblue" },
  { value: "DAHOANTHANH", label: "Đã hoàn thành", color: "green" },
];

export const CONST_TRANG_THAI_THU_HOI_GCN = [
  { value: true, label: "Đã thu hồi" },
  { value: false, label: "Không thu hồi" },
];

export const CONST_LOAI_CONG_BO_SAN_PHAM = {
  TUCONGBO: "TUCONGBO",
  BANCONGBO: "BANCONGBO",
  options: [
    { value: "TUCONGBO", label: "Hồ sơ tự công bố" },
    { value: "BANCONGBO", label: "Hồ sơ bản công bố" },
  ],
  render: (value) => {
    switch (value) {
      case "TUCONGBO":
        return "Hồ sơ tự công bố";
      case "BANCONGBO":
        return "Hồ sơ bản công bố";
      default:
        return value;
    }
  },
};

export const CONST_LOAI_CONG_BO_SAN_PHAM_OCOP = {
  TUCONGBO: "TUCONGBOSPOCOP",
  BANCONGBO: "BANCONGBOSPOCOP",
  options: [
    { value: "TUCONGBO", label: "Hồ sơ tự công bố" },
    { value: "BANCONGBO", label: "Hồ sơ bản công bố" },
  ],
  render: (value) => {
    switch (value) {
      case "TUCONGBO":
        return "Hồ sơ tự công bố";
      case "BANCONGBO":
        return "Hồ sơ bản công bố";
      default:
        return value;
    }
  },
};

export const CONST_NGUOC_GOC_SAN_PHAM = {
  TRONGNUOC: "TRONGNUOC",
  NHAPKHAU: "NHAPKHAU",
  options: [
    { value: "NHAPKHAU", label: "NK" },
    { value: "TRONGNUOC", label: "Không" },
  ],
  render: (value) => {
    switch (value) {
      case "NHAPKHAU":
        return "NK";
      case "TRONGNUOC":
        return "Không";
      default:
        return value;
    }
  },
};

/**
 *  START_QLTS
 *  Quản lý cấp phát tài sản
 */
export const CONST_TRANG_CAP_PHAT_TAI_SAN_OPTIONS = [
  { value: "DACAPPHAT", label: "Đã cấp phát", color: "green" },
  { value: "CHUACAPPHAT", label: "Chưa cấp phát", color: "volcano" },
];

/**
 *  START QLKHTC
 *  Quản lý kế hoạch tài chính
 */

export const CONST_QLKHTC_NGUON_KINH_PHI = {
  ATTP: "ATTP",
  KHAC: "KHAC",
  TONGHOP: "TONGHOP",
  options: [
    {
      value: "ATTP",
      label: "An toàn thực phẩm",
      num_key: "1",
      name: "nguon_kinh_phi",
    },
    { value: "KHAC", label: "Khác", num_key: "2", name: "nguon_kinh_phi" },
    {
      value: "TONGHOP",
      label: "Tổng hợp",
      num_key: "3",
      name: "nguon_kinh_phi",
    },
  ],
  options1: [
    {
      value: "ATTP",
      label: "An toàn thực phẩm",
      num_key: "1",
      name: "nguon_kinh_phi",
    },
    { value: "KHAC", label: "Khác", num_key: "2", name: "nguon_kinh_phi" },
  ],
  /**
   *  nguon: ATTP|TONGHOP|KHAC
   *  type:tag | text
   */
  render: (nguon, type = "tag") => {
    switch (nguon) {
      case "ATTP":
        return type === "tag" ? <Tag color="blue">ATTP</Tag> : "ATTP";
      case "KHAC":
        return type === "tag" ? <Tag color="orange">Khác</Tag> : "Khác";
      case "TONGHOP":
        return type === "tag" ? <Tag color="green">Tổng hợp</Tag> : "Tổng hợp";
      default:
        return null;
    }
  },
};
export const CONST_QLKHTC_LOAI_KE_HOACH = {
  CHUYENMON: "CHUYENMON",
  TONGHOP: "TONGHOP",
  EGOV: "EGOV",
  options: [
    { value: "CHUYENMON", label: "Chuyên môn" },
    { value: "TONGHOP", label: "Tổng hợp" },
    { value: "EGOV", label: "EGOV" },
  ],
  render: (loaiKeHoach, showText = false) => {
    switch (loaiKeHoach) {
      case "TONGHOP":
        return showText ? "TỔNG HỢP" : <Tag color="blue">TỔNG HỢP</Tag>;
      case "CHUYENMON":
        return showText ? "CHUYÊN MÔN" : <Tag color="green">CHUYÊN MÔN</Tag>;
      case "EGOV":
        return showText ? "EGOV" : <Tag color="orange">EGOV</Tag>;
      default:
        return null;
    }
  },
};

/**
 *  START QLKHTDCGCN
 *  Quản lý kế hoạch thẩm định cấp GCN
 */
export const CONST_QLKHTDCGCN_LOAI_QUYET_DINH = {
  CONGTHUONG: "CONGTHUONG",
  NONGNGHIEP: "NONGNGHIEP",
  YTE: "YTE",
  options: [
    { value: "CONGTHUONG", label: "Công thương" },
    { value: "NONGNGHIEP", label: "Nông nghiệp" },
    { value: "YTE", label: "Y tế" },
  ],
};

export const CONST_AVATAR_DEFAULT =
  "data:image/jpeg;base64,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";

/**
 *  START_CSPL
 *
 */
export const CONST_THANH_KIEM_TRA = {
  THIT_VA_SP_THIT: "THIT_VA_SP_THIT",
  THUY_SAN_VA_SP_THUY_SAN: "THUY_SAN_VA_SP_THUY_SAN",
  RAU_CU: "RAU_CU",
  CS_THUCPHAM_NGANH_Y_TE_QL: "CS_THUCPHAM_NGANH_Y_TE_QL",
  CS_THUCPHAM_NGANH_CONG_THUONG_QL: "CS_THUCPHAM_NGANH_CONG_THUONG_QL",
  CS_THUCPHAM_NGANH_NONG_NGHIEP_QL: "CS_THUCPHAM_NGANH_NONG_NGHIEP_QL",
  options: [
    { value: "THIT_VA_SP_THIT", label: "Thịt và sản phẩm thịt" },
    {
      value: "THUY_SAN_VA_SP_THUY_SAN",
      label: "Thuỷ sản và sản phẩm thuỷ sản",
    },
    { value: "RAU_CU", label: "Rau, Củ, Quả" },
    {
      value: "CS_THUCPHAM_NGANH_Y_TE_QL",
      label: "Cơ sở thực phẩm ngành Y tế quản lý",
    },
    {
      value: "CS_THUCPHAM_NGANH_CONG_THUONG_QL",
      label: "Cơ sở thực phẩm ngành Công thương quản lý",
    },
    {
      value: "CS_THUCPHAM_NGANH_NONG_NGHIEP_QL",
      label: "Cơ sở thực phẩm ngành Nông nghiệp quản lý",
    },
  ],
};

export const CONST_KET_QUA_KIEM_NGHIEM = {
  RAUCUTUOI: "RAUCUTUOI",
  THITTUOI: "THITTUOI",
  NUOCUONGDONGCHAI: "NUOCUONGDONGCHAI",
  THUCPHAMCHEBIEN: "THUCPHAMCHEBIEN",
  options: [
    { value: "RAUCUTUOI", label: "Rau Củ Tươi" },
    { value: "THITTUOI", label: "Thịt Tươi" },
    { value: "NUOCUONGDONGCHAI", label: "Nước uống đóng chai" },
    { value: "THUCPHAMCHEBIEN", label: "Thực phẩm chế biến" },
  ],
};

export const CONST_GOS_NHIEM_TPYT = {
  THITNGUOI: "THITNGUOI",
  CHATHIT: "CHATHIT",
  CHACA: "CHACA",
  THACHRAUCAU: "THACHRAUCAU",
  XIMUOI: "XIMUOI",
  PATE: "PATE",
  SOTTRUNGGA: "SOTTRUNGGA",
  BUNGTUOI: "BUNGTUOI",
  NUOCUONGDONGCHAI: "NUOCUONGDONGCHAI",
  THITHEOQUAY: "THITHEOQUAY",
  SOIBANHCANH: "SOIBANHCANH",
  KEM: "KEM",
  NUOCDA: "NUOCDA",
  SOIMY: "SOIMY",
  NEM: "NEM",
  SOIPHO: "SOIPHO",
  NUOCGIAIKHAT: "NUOCGIAIKHAT",
  DAUMODANGCHIENRAN: "DAUMODANGCHIENRAN",
  TSVASPTS: "TSVASPTS",
  THUCANTAIKS: "THUCANTAIKS",
  options: [
    { value: "THITNGUOI", label: "Thịt nguội" },
    { value: "CHATHIT", label: "Chả thịt" },
    { value: "CHACA", label: "Chả cá" },
    { value: "THACHRAUCAU", label: "Thạch rau cau" },
    { value: "XIMUOI", label: "Xí muội" },
    { value: "PATE", label: "Pate" },
    { value: "SOTTRUNGGA", label: "Sốt trứng gà" },
    { value: "BUNGTUOI", label: "Bún tươi" },
    { value: "NUOCUONGDONGCHAI", label: "Nước uống đóng chai" },
    { value: "THITHEOQUAY", label: "Thịt heo quay" },
    { value: "SOIBANHCANH", label: "Sợi bánh canh" },
    { value: "KEM", label: "Kem" },
    { value: "NUOCDA", label: "Nước đá" },
    { value: "SOIMY", label: "Sợi mỳ" },
    { value: "NEM", label: "Nem" },
    { value: "SOIPHO", label: "Sợi phở" },
    { value: "NUOCGIAIKHAT", label: "Nước giải khát" },
    { value: "DAUMODANGCHIENRAN", label: "Dầu, mỡ đang chiên rán" },
    { value: "TSVASPTS", label: "Thuỷ sản và sản phẩm thuỷ sản" },
    { value: "THUCANTAIKS", label: "Thức ăn tại khách sạn" },
  ],
};

export const CONST_KET_QUA_THUC_HIEN_TTHC = {
  CHAN_NUOI: "CHAN_NUOI",
  GIET_MO: "GIET_MO",
  CS_CHE_BIEN_DO_YTE_QL: "CS_CHE_BIEN_DO_YTE_QL",
  CS_CHE_BIEN_DO_CONG_THUONG_QL: "CS_CHE_BIEN_DO_CONG_THUONG_QL",
  CS_CHE_BIEN_DO_NONG_NGHIEP_QL: "CS_CHE_BIEN_DO_NONG_NGHIEP_QL",
  CS_KINH_DOANH_DO_YTE_QL: "CS_KINH_DOANH_DO_YTE_QL",
  CS_KINH_DOANH_DO_CONG_THUONG_QL: "CS_KINH_DOANH_DO_CONG_THUONG_QL",
  CS_KINH_DOANH_DO_NONG_NGHIEP_QL: "CS_KINH_DOANH_DO_NONG_NGHIEP_QL",
  CS_DV_AN_UONG: "CS_DV_AN_UONG",
  THUC_AN_DUONG_PHO: "THUC_AN_DUONG_PHO",
  options: [
    { value: "CHAN_NUOI", label: "Chăn nuôi" },
    { value: "GIET_MO", label: "Giết mổ" },
    { value: "CS_CHE_BIEN_DO_YTE_QL", label: "Cơ sở chế biến do y tế quản lý" },
    {
      value: "CS_CHE_BIEN_DO_CONG_THUONG_QL",
      label: "Cơ sở chế biến do công thương quản lý",
    },
    {
      value: "CS_CHE_BIEN_DO_NONG_NGHIEP_QL",
      label: "Cơ sở chế biến do nông nghiệp quản lý",
    },
    {
      value: "CS_KINH_DOANH_DO_YTE_QL",
      label: "Cơ sở kinh doanh do y tế quản lý",
    },
    {
      value: "CS_KINH_DOANH_DO_CONG_THUONG_QL",
      label: "Cơ sở kinh doanh do công thương quản lý",
    },
    {
      value: "CS_KINH_DOANH_DO_NONG_NGHIEP_QL",
      label: "Cơ sở kinh doanh do nông nghiệp quản lý",
    },
    { value: "CS_DV_AN_UONG", label: "Cơ sở dịch vụ ăn uống" },
    { value: "THUC_AN_DUONG_PHO", label: "Thức ăn đường phố" },
  ],
};

export const CONST_QUAN_LY_CHO_SIEU_THI = {
  CUAKHAU: "CUAKHAU",
  TRONGKHIKINHTECUAKHAU: "TRONGKHIKINHTECUAKHAU",
  BIENGIOI: "BIENGIOI",
  KIENCO: "KIENCO",
  DANSINH: "DANSINH",
  TAM: "TAM",
  options: [
    { value: "CUAKHAU", label: "Cửa khẩu" },
    { value: "TRONGKHIKINHTECUAKHAU", label: "Trong khi kinh tế cửa khẩu" },
    { value: "BIENGIOI", label: "Biên giới" },
    { value: "KIENCO", label: "Kiên cố" },
    { value: "DANSINH", label: "Dân Sinh" },
    { value: "TAM", label: "Tạm" },
  ],
};

export const CONST_MAU_KIEM_NGHIEM = {
  VISINHVAT: "VISINHVAT",
  HOAHOC: "HOAHOC",
  options: [
    { value: "VISINHVAT", label: "Vi Sinh vật" },
    { value: "HOAHOC", label: "Hoá học" },
  ],
};

export const CONST_TRUYEN_THONG = {
  NOICHUYEN: "NOICHUYEN",
  HOITHAO: "HOITHAO",
  PHATTHANH: "PHATTHANH",
  TRUYENHINH: "TRUYENHINH",
  BAOVIET: "BAOVIET",
  BANGRONKHAUHIEU: "BANGRONKHAUHIEU",
  APPHICH: "APPHICH",
  TOGAP: "TOGAP",
  BANGDIA: "BANGDIA",
  HINHTHUCKHAC: "HINHTHUCKHAC",
  options: [
    { value: "NOICHUYEN", label: "Nói chuyện" },
    { value: "HOITHAO", label: "Hội thảo" },
    { value: "PHATTHANH", label: "Phát thanh" },
    { value: "TRUYENHINH", label: "Truyền hình" },
    { value: "BAOVIET", label: "Báo viết" },
    { value: "BANGRONKHAUHIEU", label: "Băng rôn, khẩu hiệu" },
    { value: "APPHICH", label: "Áp – phích" },
    { value: "TOGAP", label: "Tờ gấp" },
    { value: "BANGDIA", label: "Băng đĩa" },
    { value: "HINHTHUCKHAC", label: "Hình thức khác" },
  ],
};

/**
 *  START_QLTS
 *  Quản lý giám sat attp
 */
export const CONST_THOI_DIEM = [
  { value: "DK", label: "Định kỳ", color: "green" },
  { value: "KDK", label: "Không định kỳ", color: "volcano" },
];

export const CONST_TRANG_THAI_CHI_TIEU = {
  option: [
    { value: "Dat", label: "Đạt" },
    { value: "ChuaDat", label: "Chưa Đạt" },
    { value: "DaLayMau", label: "Đã lấy mẫu" },
    { value: "ChuaLayMau", label: "Chưa lấy mẫu" },
  ],
  render: (trangThai) => {
    switch (trangThai) {
      case "Dat":
        return { value: "Dat", label: "Đạt" };
      case "ChuaDat":
        return { value: "ChuaDat", label: "Chưa Đạt" };
      case "DaLayMau":
        return { value: "DaLayMau", label: "Đã lấy mẫu" };
      case "ChuaLayMau":
        return { value: "ChuaLayMau", label: "Chưa lấy mẫu" };
      default:
        return { value: trangThai, label: trangThai };
    }
  },
};

export const CONST_PHUONG_PHAP_KIEM_TRA = {
  option: [
    { value: "PHONG_THI_NGHIEM", label: "Phòng thí nghiệm" },
    { value: "TEST_NHANH", label: "Test nhanh" },
  ],
  render: (phuongPhap) => {
    switch (phuongPhap) {
      case "PHONG_THI_NGHIEM":
        return { value: "PHONG_THI_NGHIEM", label: "Phòng thí nghiệm" };
      case "TEST_NHANH":
        return { value: "TEST_NHANH", label: "Test nhanh" };
      default:
        return { value: phuongPhap, label: phuongPhap };
    }
  },
};

export const CONST_NGUON_THUC_PHAM = [
  "Nhập khẩu",
  "SP của địa phương",
  "SP của địa phương khác",
  "Cơ sở kinh doanh",
  "Cơ sở sản xuất",
  "Nguồn khác",
];

export const CONST_LOAI_CO_SO = {
  COSO_BANATTP: "COSO_BANATTP",
  COSO_QUANHUYEN: "COSO_QUANHUYEN",
  COSO_NGOAI: "COSO_NGOAI",
  COSO_CONGBOSANPHAM: "COSO_CONGBOSANPHAM",
  COSO_CAPGCN: "COSO_CAPGCN",
  COSO_CHO: "COSO_CHO",
  options: [
    { value: "COSO_BANATTP", label: "Cơ sở ban ATTP" },
    { value: "COSO_QUANHUYEN", label: "Cơ sở dữ liệu quận huyện" },
    { value: "COSO_NGOAI", label: "Cơ sở ngoài" },
    { value: "COSO_CONGBOSANPHAM", label: "Cơ sở công bố sản phẩm" },
    { value: "COSO_CAPGCN", label: "Cơ sở cấp giấy chứng nhận" },
  ],
  render: (lcs) => {
    const loaiCoSo = CONST_LOAI_CO_SO.options.find(
      (item) => item.value === lcs
    );
    return (loaiCoSo && loaiCoSo.label) || "Không xác định";
  },
};

export const CONST_TRANG_THAI_PHE_DUYET_BO_SUNG_HO_SO = {
  DADUYET: "DADUYET",
  CHOPHEDUYET: "CHOPHEDUYET",
  KHONGDUYET: "KHONGDUYET",
  NONE: "NONE",
  render: (tt) => {
    const trangThai = CONST_TRANG_THAI_PHE_DUYET_BO_SUNG_HO_SO.options.find(
      (item) => item.value === tt
    );
    return (trangThai && trangThai.label) || "Không xác định";
  },
  options: [
    { value: "NONE", label: "Chưa có trạng thái" },
    { value: "CHOPHEDUYET", label: "Chờ phê duyệt" },
    { value: "DADUYET", label: "Đã phê duyệt" },
    { value: "KHONGDUYET", label: "Không phê duyệt" },
  ],
};

export const CONST_MODALTAICHINH = {
  KEHOACHTAICHINH: "KEHOACHTAICHINH",
  THUCHIENPHANBO: "THUCHIENPHANBO",
  DIEUCHUYEN: "DIEUCHUYEN",
};
