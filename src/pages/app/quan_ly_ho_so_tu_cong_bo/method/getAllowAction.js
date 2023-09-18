import { CONST_PHONG_BAN, CONST_CHUC_VU, CONST_TRANG_THAI_HO_SO, CONST_HSTCB_TRANG_THAI_XU_LY } from '../../../../constants/constants';
const { DAXULY } = CONST_HSTCB_TRANG_THAI_XU_LY
const { CHUYENVIEN, PHOTRUONGPHONG, TRUONGPHONG, TRUONGBAN } = CONST_CHUC_VU;
const { NGHIEPVU, LANHDAO, VANPHONG, ADMIN } = CONST_PHONG_BAN;
const { TIEPNHAN } = CONST_TRANG_THAI_HO_SO;

export default (hoSo) => (state) => {
    const account_current = state.core.account_current;
    const { regency, managementDepartment, name } = account_current;
    let allowDownloadGBN = true,
        allowUpdate = false,
        allowDelete = false,
        allowTrinhPheDuyet = false,
        allowPheDuyet = false,
        allowChuyenXuLy = false;
    if (hoSo && hoSo.trangThaiChuyenHS) {
        const { trangThaiHoSo, trangThaiChuyenHS, trangThaiXuLy } = hoSo;
        const { chucVu, phongBan, nguoiXuLy } = trangThaiChuyenHS;
        if (chucVu === regency && phongBan === managementDepartment) {
            switch (managementDepartment) {
                case VANPHONG:
                    switch (regency) {
                        case CHUYENVIEN:
                            allowChuyenXuLy = (!nguoiXuLy || nguoiXuLy === name) && (trangThaiHoSo === TIEPNHAN) && trangThaiXuLy !== DAXULY;
                            allowUpdate = (!nguoiXuLy || nguoiXuLy === name) && trangThaiXuLy !== DAXULY;
                            allowDelete = (!nguoiXuLy || nguoiXuLy === name) && trangThaiXuLy !== DAXULY && trangThaiHoSo === TIEPNHAN;
                            break;
                        default: break;
                    }
                    break;
                case NGHIEPVU:
                    switch (regency) {
                        case CHUYENVIEN:
                            allowUpdate = (!nguoiXuLy || nguoiXuLy === name) && trangThaiXuLy !== DAXULY;
                            allowTrinhPheDuyet = (!nguoiXuLy || nguoiXuLy === name) && trangThaiXuLy !== DAXULY && trangThaiHoSo !== TIEPNHAN;
                            break;
                        case PHOTRUONGPHONG:
                            allowUpdate = (!nguoiXuLy || nguoiXuLy === name) && trangThaiXuLy !== DAXULY;
                            allowTrinhPheDuyet = (!nguoiXuLy || nguoiXuLy === name) && trangThaiXuLy !== DAXULY && trangThaiHoSo !== TIEPNHAN;
                            break;
                        case TRUONGPHONG:
                            allowUpdate = (!nguoiXuLy || nguoiXuLy === name) && trangThaiXuLy !== DAXULY;
                            allowTrinhPheDuyet = (!nguoiXuLy || nguoiXuLy === name) && trangThaiXuLy !== DAXULY && trangThaiHoSo !== TIEPNHAN;
                            break;
                        default: break;
                    }
                    break;
                case LANHDAO:
                    switch (regency) {
                        case TRUONGBAN:
                            allowUpdate = (!nguoiXuLy || nguoiXuLy === name) && trangThaiXuLy !== DAXULY;
                            allowPheDuyet = (!nguoiXuLy || nguoiXuLy === name) && trangThaiXuLy !== DAXULY;
                            break;
                        default: break;
                    }
                    break;
                default: break;
            }
        }
        else if (managementDepartment === ADMIN) {
            allowUpdate = trangThaiXuLy !== DAXULY;
            allowPheDuyet = trangThaiXuLy !== DAXULY && trangThaiHoSo !== TIEPNHAN;
            allowDelete = trangThaiXuLy !== DAXULY && trangThaiHoSo === TIEPNHAN;
        }
    }
    return {
        allowDownloadGBN,
        allowUpdate,
        allowDelete,
        allowTrinhPheDuyet,
        allowPheDuyet,
        allowChuyenXuLy
    }
}