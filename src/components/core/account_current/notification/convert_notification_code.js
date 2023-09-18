import React from "react";
import {
    /**
     *  Common
     */
    NOTIFI_CODE_UPDATE_VERSION,
    NOTIFI_CODE_VBDH,

    /**
     *  Code Hồ sơ tự công bố
     */
    NOTIFI_CODE_HSTCB_CXL,
    NOTIFI_CODE_HSTCB_DPD,
    NOTIFI_CODE_HSTCB_KPD,
    NOTIFI_CODE_HSTCB_TPD,
    NOTIFI_CODE_HSTCB_YCBS,
    NOTIFI_CODE_HSTCB_MTN,
    NOTIFI_CODE_HSTCB_DTN,
    NOTIFI_CODE_HSTCB_YCCDBSHS,

    /**
     *  Code kế hoạch thẩm định cấp GCN
     */
    NOTIFI_CODE_KHTDCGCN_DPD,
    NOTIFI_CODE_KHTDCGCN_KPD,
    NOTIFI_CODE_KHTDCGCN_TPD,
    NOTIFI_CODE_KHTDCGCN_YCBS,
    NOTIFI_CODE_KHTDCGCN_PCCV,
    NOTIFI_CODE_KHTDCGCN_DG,
    NOTIFI_CODE_HSTCB_DTN_XL,

    /**
     *  Code kế hoạch giám sát ATTP
     */
    NOTIFI_CODE_GSATTP_TPD,
    NOTIFI_CODE_GSATTP_PD,

    /**
     *  Code thanh lý tài sản
     */
    NOTIFI_CODE_TLTS_TPD,
    NOTIFI_CODE_TLTS_PD,

    /**
     *  Code kế hoạch tài chính
     */
    NOTIFI_CODE_KHTC_CXL,
    NOTIFI_CODE_KHTC_YCBS,
    NOTIFI_CODE_KHTC_TPD,
    NOTIFI_CODE_KHTC_PD,
    /**
    *  Code Du Toan phan bo
    */
    NOTIFI_CODE_DTPB_TPD,
    NOTIFI_CODE_DTPB_PD,

    /**
     * 
     */
    NOTIFI_CODE_DTT_BSHS_TPD

} from "./notification_code";
import {
    URL_HO_SO_TU_CONG_BO_DETAIL,
    URL_HO_SO_CAP_GIAY_CHUNG_NHAN_CHI_TIET_KE_HOACH,
    URL_QUAN_LY_KE_HOACH_TAI_CHINH_DETAIL,
    URL_KE_HOACH_GIAM_SAT_ATTP_DETAIL,
    URL_THANH_LY_TAI_SAN_DETAIL,
    URL_QUAN_LY_TAI_CHINH_DETAIL,
    URL_QTNVTT_PHE_DUYET_BO_SUNG_CO_SO,
    URL_QTNVTT_CUOC_THANH_TRA_KE_HOACH
} from "./../../../../constants/url";
import { showVersion } from "./../navigation_account/version";
import { Fragment } from "react";
import getLinkFromVBDH from "./get_link_from_vbdh";
import { CommonAccount } from "../../../common";
import { ACT_ID_QTNVTT_CUOC_THANH_TRA } from "../../../../constants/action_id";

const convertMaThongBao = (thongBao) => {
    let notifi_redirect = 1;
    try {
        const maThongBao = thongBao.maThongBao;
        const nguoiGui = thongBao.nguoiGui || {};
        const ngayTao = thongBao.ngayTao;
        let noiDungChiTiet = {}
        try { noiDungChiTiet = JSON.parse(thongBao.noiDungChiTiet); }
        catch (e) { }
        switch (maThongBao) {
            case NOTIFI_CODE_UPDATE_VERSION:
                return {
                    link: `#`,
                    title: <Fragment><div onClick={showVersion}>Cập nhật phiên bản!</div></Fragment>,
                    content: null,
                    description: null,
                    iconClass: `fa fa-cloud-download icon-info-o`,
                    nguoiGui,
                    ngayTao
                };
            case NOTIFI_CODE_VBDH:
                return {
                    link: getLinkFromVBDH(noiDungChiTiet, notifi_redirect),
                    title: "Có 1 thông báo mới từ văn bản điều hành",
                    content: <div>
                        {noiDungChiTiet.maHoSo && <div><b>Mã hồ sơ:</b> {noiDungChiTiet.maHoSo}</div>}
                        {noiDungChiTiet.nguoiTao && <div><b>Cán bộ:</b> <CommonAccount username={noiDungChiTiet.nguoiTao} /></div>}
                    </div>,
                    description: null,
                    iconClass: `fa fa-file-text-o icon-info-o`,
                    nguoiGui: {
                        avatar: "/static/image/egov-dna.png",
                    },
                    ngayTao
                };
            /**
             *  Hồ sơ tự công bố
             */
            // Chuyển xử lý hồ sơ tự công bố
            case NOTIFI_CODE_HSTCB_CXL:
                return {
                    link: `${URL_HO_SO_TU_CONG_BO_DETAIL}?id=${noiDungChiTiet.id}&notifi_redirect=${notifi_redirect}`,
                    title: `${nguoiGui.fullName} Đã chuyển xử lý 1 hồ sơ tự công bố.`,
                    content: noiDungChiTiet.tenCoSo,
                    description: null,
                    iconClass: `fa fa-share-square-o icon-info-o`,
                    nguoiGui,
                    ngayTao
                };
            // Trình phê duyệt hồ sơ tự công bố
            case NOTIFI_CODE_HSTCB_TPD:
                return {
                    link: `${URL_HO_SO_TU_CONG_BO_DETAIL}?id=${noiDungChiTiet.id}&notifi_redirect=${notifi_redirect}`,
                    title: `${nguoiGui.fullName} Đã trình phê duyệt 1 hồ sơ tự công bố.`,
                    content: noiDungChiTiet.tenCoSo,
                    description: null,
                    iconClass: `fa fa-share-square-o icon-info-o`,
                    nguoiGui,
                    ngayTao
                };
            // Đã phê duyệt hồ sơ tự công bố
            case NOTIFI_CODE_HSTCB_DPD:
                return {
                    link: `${URL_HO_SO_TU_CONG_BO_DETAIL}?id=${noiDungChiTiet.id}&notifi_redirect=${notifi_redirect}`,
                    title: `${nguoiGui.fullName} Đã phê duyệt 1 hồ sơ tự công bố.`,
                    content: noiDungChiTiet.tenCoSo,
                    description: null,
                    iconClass: `fa fa-check-circle icon-success-o`,
                    nguoiGui,
                    ngayTao
                };
            // Yêu cầu bổ sung hồ sơ tự công bố
            case NOTIFI_CODE_HSTCB_YCBS:
                return {
                    link: `${URL_HO_SO_TU_CONG_BO_DETAIL}?id=${noiDungChiTiet.id}&notifi_redirect=${notifi_redirect}`,
                    title: `${nguoiGui.fullName} Đã yêu cầu bổ sung 1 hồ sơ tự công bố`,
                    content: noiDungChiTiet.tenCoSo,
                    description: noiDungChiTiet.lyDo,
                    iconClass: `fa fa-reply  icon-warning-o`,
                    nguoiGui,
                    ngayTao
                };
            // Từ chối phê duyệt hồ sơ tự công bố
            case NOTIFI_CODE_HSTCB_KPD:
                return {
                    link: `${URL_HO_SO_TU_CONG_BO_DETAIL}?id=${noiDungChiTiet.id}&notifi_redirect=${notifi_redirect}`,
                    title: `${nguoiGui.fullName} Đã từ chối phê duyệt 1 hồ sơ tự công bố`,
                    content: noiDungChiTiet.tenCoSo,
                    description: null,
                    iconClass: `fa fa-ban icon-danger-o`,
                    nguoiGui,
                    ngayTao
                };
            // Mới tiếp nhận hồ sơ tự công bố
            case NOTIFI_CODE_HSTCB_MTN:
                return {
                    link: `${URL_HO_SO_TU_CONG_BO_DETAIL}?id=${noiDungChiTiet.id}&notifi_redirect=${notifi_redirect}`,
                    title: `${nguoiGui.fullName} Mới tiếp nhận 1 hồ sơ tự công bố`,
                    content: noiDungChiTiet.tenCoSo,
                    description: null,
                    iconClass: `fa fa-exchange icon-info-o`,
                    nguoiGui,
                    ngayTao
                };
            // Đã tiếp nhận hồ sơ tự công bố
            case NOTIFI_CODE_HSTCB_DTN:
                return {
                    link: `${URL_HO_SO_TU_CONG_BO_DETAIL}?id=${noiDungChiTiet.id}&notifi_redirect=${notifi_redirect}`,
                    title: `${nguoiGui.fullName} Đã tiếp nhận 1 hồ sơ tự công bố`,
                    content: noiDungChiTiet.tenCoSo,
                    description: null,
                    iconClass: `fa fa-exchange icon-info-o`,
                    nguoiGui,
                    ngayTao
                };
            // Đã tiếp nhận và xử lý hồ sơ tự công bố
            case NOTIFI_CODE_HSTCB_DTN_XL:
                return {
                    link: `${URL_HO_SO_TU_CONG_BO_DETAIL}?id=${noiDungChiTiet.id}&notifi_redirect=${notifi_redirect}`,
                    title: `${nguoiGui.fullName} Đã tiếp nhận và xử lý 1 hồ sơ tự công bố`,
                    content: noiDungChiTiet.tenCoSo,
                    description: null,
                    iconClass: `fa fa-pencil-square-o icon-info-o`,
                    nguoiGui,
                    ngayTao
                };
            // Gửi văn bản yêu cầu công dân bổ sung hồ sơ
            case NOTIFI_CODE_HSTCB_YCCDBSHS:
                return {
                    link: `${URL_HO_SO_TU_CONG_BO_DETAIL}?id=${noiDungChiTiet.id}&notifi_redirect=${notifi_redirect}`,
                    title: `${nguoiGui.fullName} Đề nghị gửi văn bản yêu cầu công dân bổ sung hồ sơ`,
                    content: noiDungChiTiet.tenCoSo,
                    description: null,
                    iconClass: `fa fa-reply  icon-warning-o`,
                    nguoiGui,
                    ngayTao
                };


            /**
             *  Kế hoạch thẩm định cấp giấy chứng nhận
             */
            case NOTIFI_CODE_KHTDCGCN_TPD:
                return {
                    link: `${URL_HO_SO_CAP_GIAY_CHUNG_NHAN_CHI_TIET_KE_HOACH}?id=${noiDungChiTiet.id}&notifi_redirect=${notifi_redirect}`,
                    title: `${nguoiGui.fullName} Đã trình phê duyệt 1 kế hoạch thẩm định cấp GCN ATTP.`,
                    content: noiDungChiTiet.tenKeHoach,
                    description: null,
                    iconClass: `fa fa-share-square-o icon-info-o`,
                    nguoiGui,
                    ngayTao
                };
            case NOTIFI_CODE_KHTDCGCN_DPD:
                return {
                    link: `${URL_HO_SO_CAP_GIAY_CHUNG_NHAN_CHI_TIET_KE_HOACH}?id=${noiDungChiTiet.id}&notifi_redirect=${notifi_redirect}`,
                    title: `${nguoiGui.fullName} Đã phê duyệt 1 kế hoạch thẩm định cấp GCN ATTP.`,
                    content: noiDungChiTiet.tenKeHoach,
                    description: null,
                    iconClass: `fa fa-check-circle  icon-success-o`,
                    nguoiGui,
                    ngayTao
                };
            case NOTIFI_CODE_KHTDCGCN_YCBS:
                return {
                    link: `${URL_HO_SO_CAP_GIAY_CHUNG_NHAN_CHI_TIET_KE_HOACH}?id=${noiDungChiTiet.id}&notifi_redirect=${notifi_redirect}`,
                    title: `${nguoiGui.fullName} Đã yêu cầu bổ sung 1 kế hoạch thẩm định cấp GCN ATTP.`,
                    content: noiDungChiTiet.tenKeHoach,
                    description: noiDungChiTiet.lyDo,
                    iconClass: `fa fa-reply icon-warning-o`,
                    nguoiGui,
                    ngayTao
                };
            case NOTIFI_CODE_KHTDCGCN_KPD:
                return {
                    link: `${URL_HO_SO_CAP_GIAY_CHUNG_NHAN_CHI_TIET_KE_HOACH}?id=${noiDungChiTiet.id}&notifi_redirect=${notifi_redirect}`,
                    title: `${nguoiGui.fullName} Đã từ chối phê duyệt 1 kế hoạch thẩm định cấp GCN ATTP.`,
                    content: noiDungChiTiet.tenKeHoach,
                    description: noiDungChiTiet.lyDo,
                    iconClass: `fa fa-ban icon-danger-o`,
                    nguoiGui,
                    ngayTao
                };
            case NOTIFI_CODE_KHTDCGCN_PCCV:
                return {
                    link: `${URL_HO_SO_CAP_GIAY_CHUNG_NHAN_CHI_TIET_KE_HOACH}?id=${noiDungChiTiet.keHoachId}&ho_so_id=${noiDungChiTiet.hoSoId}&cong_viec_id=${noiDungChiTiet.congViecId}&notifi_redirect=${notifi_redirect}`,
                    title: `${nguoiGui.fullName} Đã phân công cho bạn 1 công việc kiểm định!`,
                    content: noiDungChiTiet.tenCongViec,
                    description: null,
                    iconClass: `fa fa-share-alt icon-success-o`,
                    nguoiGui,
                    ngayTao
                };
            case NOTIFI_CODE_KHTDCGCN_DG:
                return {
                    link: `${URL_HO_SO_CAP_GIAY_CHUNG_NHAN_CHI_TIET_KE_HOACH}?id=${noiDungChiTiet.keHoachId}&ho_so_id=${noiDungChiTiet.hoSoId}&cong_viec_id=${noiDungChiTiet.congViecId}&notifi_redirect=${notifi_redirect}`,
                    title: `${nguoiGui.fullName} Đã đánh giá 1 công việc được giao!`,
                    content: noiDungChiTiet.tenCongViec,
                    description: null,
                    iconClass: `fa fa-pencil-square-o icon-primary-o`,
                    nguoiGui,
                    ngayTao
                };

            // Kế hoạch tài chính
            // chuyển xử lý kế hoạch tài chính
            case NOTIFI_CODE_KHTC_CXL:
                return {
                    link: `${URL_QUAN_LY_KE_HOACH_TAI_CHINH_DETAIL}?id=${noiDungChiTiet.id}&notifi_redirect=${notifi_redirect}`,
                    title: `${nguoiGui.fullName} Đã chuyển xử lý 1 kế hoạch tài chính.`,
                    content: noiDungChiTiet.tenDangKyKinhDoanh,
                    description: null,
                    iconClass: `fa fa-share-square-o icon-info-o`,
                    nguoiGui,
                    ngayTao
                };
            // Yêu cầu bổ sung kế hoạch tài chính
            case NOTIFI_CODE_KHTC_YCBS:
                return {
                    link: `${URL_QUAN_LY_KE_HOACH_TAI_CHINH_DETAIL}?id=${noiDungChiTiet.id}&notifi_redirect=${notifi_redirect}`,
                    title: `${nguoiGui.fullName} Đã yêu cầu bổ sung 1  kế hoạch tài chính`,
                    content: noiDungChiTiet.tenDangKyKinhDoanh,
                    description: noiDungChiTiet.lyDo,
                    iconClass: `fa fa-reply  icon-warning-o`,
                    nguoiGui,
                    ngayTao
                };

            // Trình phê duyệt kế hoạch tài chính
            case NOTIFI_CODE_KHTC_TPD:
                return {
                    link: `${URL_QUAN_LY_KE_HOACH_TAI_CHINH_DETAIL}?id=${noiDungChiTiet.id}&notifi_redirect=${notifi_redirect}`,
                    title: `${nguoiGui.fullName} Đã trình phê duyệt 1  kế hoạch tài chính.`,
                    content: noiDungChiTiet.tenDangKyKinhDoanh,
                    description: null,
                    iconClass: `fa fa-share-square-o icon-info-o`,
                    nguoiGui,
                    ngayTao
                };

            // Đã phê duyệt kế hoạch tài chính
            case NOTIFI_CODE_KHTC_PD:
                return {
                    link: `${URL_QUAN_LY_KE_HOACH_TAI_CHINH_DETAIL}?id=${noiDungChiTiet.id}&notifi_redirect=${notifi_redirect}`,
                    title: `${nguoiGui.fullName} Đã phê duyệt 1 kế hoạch tài chính.`,
                    content: noiDungChiTiet.tenDangKyKinhDoanh,
                    description: null,
                    iconClass: `fa fa-check-circle icon-success-o`,
                    nguoiGui,
                    ngayTao
                };

            // Trình phê duyệt kế hoạch giám sát attp
            case NOTIFI_CODE_GSATTP_TPD:
                return {
                    link: `${URL_KE_HOACH_GIAM_SAT_ATTP_DETAIL}?id=${noiDungChiTiet.id}&notifi_redirect=${notifi_redirect}`,
                    title: `${nguoiGui.fullName} Đã trình phê duyệt 1 kế hoạch giám sát attp.`,
                    content: noiDungChiTiet.tenDangKyKinhDoanh,
                    description: null,
                    iconClass: `fa fa-share-square-o icon-info-o`,
                    nguoiGui,
                    ngayTao
                };

            // Đã phê duyệt kế hoạch giám sát attp
            case NOTIFI_CODE_GSATTP_PD:
                return {
                    link: `${URL_KE_HOACH_GIAM_SAT_ATTP_DETAIL}?id=${noiDungChiTiet.id}&notifi_redirect=${notifi_redirect}`,
                    title: `${nguoiGui.fullName} Đã phê duyệt 1 kế hoạch giám sát attp.`,
                    content: noiDungChiTiet.tenDangKyKinhDoanh,
                    description: null,
                    iconClass: `fa fa-check-circle icon-success-o`,
                    nguoiGui,
                    ngayTao
                };



            // Trình phê duyệt thanh lý tài sản
            case NOTIFI_CODE_TLTS_TPD:
                return {
                    link: `${URL_THANH_LY_TAI_SAN_DETAIL}?id=${noiDungChiTiet.id}&notifi_redirect=${notifi_redirect}`,
                    title: `${nguoiGui.fullName} Đã trình phê duyệt 1 thanh lý tài sản.`,
                    content: noiDungChiTiet.tenDangKyKinhDoanh,
                    description: null,
                    iconClass: `fa fa-share-square-o icon-info-o`,
                    nguoiGui,
                    ngayTao
                };

            // Đã phê duyệt thanh lý tài sản
            case NOTIFI_CODE_TLTS_PD:
                return {
                    link: `${URL_THANH_LY_TAI_SAN_DETAIL}?id=${noiDungChiTiet.id}&notifi_redirect=${notifi_redirect}`,
                    title: `${nguoiGui.fullName} Đã phê duyệt 1 thanh lý tài sản.`,
                    content: noiDungChiTiet.tenDangKyKinhDoanh,
                    description: null,
                    iconClass: `fa fa-check-circle icon-success-o`,
                    nguoiGui,
                    ngayTao
                };

            // Trình phê duyệt dự toán phân bổ
            case NOTIFI_CODE_DTPB_TPD:
                return {
                    link: `${URL_QUAN_LY_TAI_CHINH_DETAIL}?id=${noiDungChiTiet.id}&notifi_redirect=${notifi_redirect}`,
                    title: `${nguoiGui.fullName} Đã trình phê duyệt 1 dự toán phân bổ.`,
                    content: noiDungChiTiet.tenDangKyKinhDoanh,
                    description: null,
                    iconClass: `fa fa-share-square-o icon-info-o`,
                    nguoiGui,
                    ngayTao
                };

            // Đã phê duyệt dự toán phân bổ
            case NOTIFI_CODE_DTPB_PD:
                return {
                    link: `${URL_QUAN_LY_TAI_CHINH_DETAIL}?id=${noiDungChiTiet.id}&notifi_redirect=${notifi_redirect}`,
                    title: `${nguoiGui.fullName} Đã phê duyệt 1 dự toán phân bổ.`,
                    content: noiDungChiTiet.tenDangKyKinhDoanh,
                    description: null,
                    iconClass: `fa fa-check-circle icon-success-o`,
                    nguoiGui,
                    ngayTao
                };

            case NOTIFI_CODE_DTT_BSHS_TPD:
                const coSoIds = noiDungChiTiet.csids && Array.isArray(noiDungChiTiet.csids) ? noiDungChiTiet.csids.toString() : undefined;
                return {
                    link: `${URL_QTNVTT_CUOC_THANH_TRA_KE_HOACH}?action=${ACT_ID_QTNVTT_CUOC_THANH_TRA.ACT_LIST}&qdbbid=${noiDungChiTiet.qdbbid}&khp=${noiDungChiTiet.khp}&khp_step=${noiDungChiTiet.khp_step}${coSoIds ? `&csids=${coSoIds}` : ""}&notifi_redirect=${notifi_redirect}`,
                    title: `${nguoiGui.fullName} Đã trình phê duyệt bổ sung hồ sơ cho đợt thanh tra. - ${noiDungChiTiet.keHoachPhong}`,
                    content: noiDungChiTiet.tenCuocThanhTra,
                    description: null,
                    iconClass: `fa fa-check-circle icon-success-o`,
                    nguoiGui,
                    ngayTao
                };
            default:
                return {
                    link: `#`,
                    title: `Thông báo chưa được định nghĩa`,
                    content: `Thông báo chưa được định nghĩa`,
                    description: null,
                    iconClass: `fa fa-bell icon-danger-o`,
                    nguoiGui,
                    ngayTao
                }
        }
    }
    catch (e) {
        return {
            link: `#`,
            title: `Thông báo chưa được định nghĩa`,
            content: `Thông báo chưa được định nghĩa`,
            description: null,
            iconClass: `fa fa-bell  icon-danger-o`,
            nguoiGui: {},
        }
    }
}
export default convertMaThongBao;