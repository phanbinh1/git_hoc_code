import moment from "moment";
import { CONST_PHONG_BAN, CONST_CHUC_VU, CONST_LUAN_CHUYEN, CONST_TRANG_THAI_HO_SO, CONST_PHE_DUYET, CONST_HSTCB_TRANG_THAI_XU_LY } from '../../../../constants/constants';
import { dateTimeFormat } from '../../../../constants/controll';
import newLuanChuyenHoSo from "./newLuanChuyenHoSo";
const { TRUONGPHONG } = CONST_CHUC_VU;
const { NGHIEPVU } = CONST_PHONG_BAN;
const { CHOPHEDUYET, CHOBOSUNG, DAPHEDUYET, KHONGPHEDUYET } = CONST_PHE_DUYET;
const { HOSOCHOBOSUNG } = CONST_TRANG_THAI_HO_SO;
const { NEXT, NOT_APPROVAL, APPROVAL, BACK, TRANSFER_HANDLING } = CONST_LUAN_CHUYEN;
export default (hoSos = [], thaoTac = CHOPHEDUYET, lyDo = null, nguoiXuLy = null) => (state) => {
    const account_current = state.core.account_current;
    const { regency, managementDepartment } = account_current;
    if (hoSos.length > 0) {
        const newTrangThaiChuyenHoSo = newLuanChuyenHoSo(nguoiXuLy)(state);
        let lichSuLuanChuyen = [];
        switch (thaoTac) {
            case "CXL":
                return {
                    hoSos: hoSos.map(hoSo => {
                        const { ghiChu, trangThaiHoSo } = hoSo;
                        try {
                            lichSuLuanChuyen = JSON.parse(hoSo.lichSuLuanChuyen);
                            if (!Array.isArray(lichSuLuanChuyen)) { lichSuLuanChuyen = []; }
                        }
                        catch (e) { lichSuLuanChuyen = []; }
                        lichSuLuanChuyen.unshift({
                            maXuLy: TRANSFER_HANDLING,
                            nguoiXuLy: account_current.fullName,
                            username: account_current.name,
                            lyDo: null,
                            thoiGian: moment().format(dateTimeFormat),
                            trangThaiHoSo,
                            ghiChu
                        })
                        return {
                            ...hoSo,
                            trangThaiChuyenHS: newTrangThaiChuyenHoSo.next,
                            lichSuLuanChuyen: JSON.stringify(lichSuLuanChuyen)
                        }
                    }),
                    trangThaiChuyenHS: newTrangThaiChuyenHoSo.next,
                    msgSuccess: "Chuyển xử lý thành công!",
                    msgError: "Chuyển xứ lý thất bại!"
                };
            case CHOPHEDUYET:
                return {
                    hoSos: hoSos.map(hoSo => {
                        const { ghiChu, trangThaiHoSo } = hoSo;
                        try {
                            lichSuLuanChuyen = JSON.parse(hoSo.lichSuLuanChuyen);
                            if (!Array.isArray(lichSuLuanChuyen)) { lichSuLuanChuyen = []; }
                        }
                        catch (e) { lichSuLuanChuyen = []; }
                        lichSuLuanChuyen.unshift({
                            maXuLy: NEXT,
                            nguoiXuLy: account_current.fullName,
                            username: account_current.name,
                            lyDo: null,
                            thoiGian: moment().format(dateTimeFormat),
                            trangThaiHoSo,
                            ghiChu
                        })
                        return {
                            ...hoSo,
                            trangThaiChuyenHS: newTrangThaiChuyenHoSo.next,
                            trangThaiPheDuyet: CHOPHEDUYET,
                            lichSuLuanChuyen: JSON.stringify(lichSuLuanChuyen)
                        }
                    }),
                    trangThaiChuyenHS: newTrangThaiChuyenHoSo.next,
                    msgSuccess: "Trình phê duyệt thành công!",
                    msgError: "Trình phê duyệt thất bại!"
                };
            case DAPHEDUYET:
                return {
                    hoSos: hoSos.map(hoSo => {
                        const { ghiChu, trangThaiHoSo } = hoSo;
                        try {
                            lichSuLuanChuyen = JSON.parse(hoSo.lichSuLuanChuyen);
                            if (!Array.isArray(lichSuLuanChuyen)) { lichSuLuanChuyen = []; }
                        }
                        catch (e) { lichSuLuanChuyen = []; }
                        lichSuLuanChuyen.unshift({
                            maXuLy: APPROVAL,
                            nguoiXuLy: account_current.fullName,
                            username: account_current.name,
                            lyDo: null,
                            thoiGian: moment().format(dateTimeFormat),
                            trangThaiHoSo,
                            ghiChu
                        })
                        return {
                            ...hoSo,
                            trangThaiChuyenHS: newTrangThaiChuyenHoSo.next,
                            trangThaiXuLy: CONST_HSTCB_TRANG_THAI_XU_LY.DAXULY,
                            trangThaiPheDuyet: DAPHEDUYET,
                            lichSuLuanChuyen: JSON.stringify(lichSuLuanChuyen)
                        }
                    }),
                    trangThaiChuyenHS: newTrangThaiChuyenHoSo.next,
                    msgSuccess: "Phê duyệt thành công!",
                    msgError: "Phê duyệt thất bại!"
                };
            case KHONGPHEDUYET:
                return {
                    hoSos: hoSos.map(hoSo => {
                        const { ghiChu, trangThaiHoSo } = hoSo;
                        try {
                            lichSuLuanChuyen = JSON.parse(hoSo.lichSuLuanChuyen);
                            if (!Array.isArray(lichSuLuanChuyen)) { lichSuLuanChuyen = []; }
                        }
                        catch (e) { lichSuLuanChuyen = []; }
                        lichSuLuanChuyen.unshift({
                            maXuLy: NOT_APPROVAL,
                            nguoiXuLy: account_current.fullName,
                            username: account_current.name,
                            lyDo,
                            thoiGian: moment().format(dateTimeFormat),
                            trangThaiHoSo,
                            ghiChu
                        })
                        return {
                            ...hoSo,
                            trangThaiChuyenHS: newTrangThaiChuyenHoSo.next,
                            trangThaiPheDuyet: KHONGPHEDUYET,
                            lyDoKhongPheDuyet: lyDo,
                            lichSuLuanChuyen: JSON.stringify(lichSuLuanChuyen)
                        }
                    }),
                    trangThaiChuyenHS: newTrangThaiChuyenHoSo.next,
                    msgSuccess: "Phê duyệt thành công!",
                    msgError: "Phê duyệt thất bại!"
                };
            case CHOBOSUNG:
                return {
                    hoSos: hoSos.map(hoSo => {
                        const { ghiChu, trangThaiHoSo } = hoSo;
                        try {
                            lichSuLuanChuyen = JSON.parse(hoSo.lichSuLuanChuyen);
                            if (!Array.isArray(lichSuLuanChuyen)) { lichSuLuanChuyen = []; }
                        }
                        catch (e) { lichSuLuanChuyen = []; }
                        lichSuLuanChuyen.unshift({
                            maXuLy: BACK,
                            nguoiXuLy: account_current.fullName,
                            username: account_current.name,
                            lyDo,
                            thoiGian: moment().format(dateTimeFormat),
                            trangThaiHoSo,
                            ghiChu
                        })
                        return {
                            ...hoSo,
                            trangThaiChuyenHS: newTrangThaiChuyenHoSo.back,
                            trangThaiPheDuyet: CHOBOSUNG,
                            trangThaiHoSo: HOSOCHOBOSUNG,
                            ghiChu: lyDo,
                            lichSuLuanChuyen: JSON.stringify(lichSuLuanChuyen)
                        }
                    }),
                    guiThongBao: regency === TRUONGPHONG && managementDepartment === NGHIEPVU,
                    trangThaiChuyenHS: newTrangThaiChuyenHoSo.back,
                    msgSuccess: "Yêu cầu bổ sung thành công!",
                    msgError: "Yêu cầu bổ sung thất bại!"
                };
            default:
                return {
                    hoSos,
                    msgSuccess: "Thao tác thành công!",
                    msgError: "Thao tác thất bại!"
                };
        }
    }
    return {
        hoSos,
        msgSuccess: "Thao tác thành công!",
        msgError: "Thao tác thất bại!"
    };
}