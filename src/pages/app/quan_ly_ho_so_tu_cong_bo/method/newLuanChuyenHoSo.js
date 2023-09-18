
import { CONST_PHONG_BAN, CONST_CHUC_VU, CONST_TYPE_TRANG_THAI_CHUYEN_HO_SO } from '../../../../constants/constants';
const { CHUYENVIEN, PHOTRUONGPHONG, TRUONGPHONG, TRUONGBAN } = CONST_CHUC_VU;
const { NGHIEPVU, LANHDAO, VANPHONG } = CONST_PHONG_BAN;

export default (nguoiXuLy = null) => (state) => {
    const account_current = state.core.account_current;
    const profiles = state.core.account.profiles;
    const _nguoiXuLy = nguoiXuLy ? profiles.find(profile => profile.name === nguoiXuLy) : null;
    if (account_current) {
        const { managementDepartment, regency } = account_current;

        switch (regency) {
            case CHUYENVIEN:
                if (managementDepartment === NGHIEPVU) {
                    return {
                        next: {
                            nguoiXuLy,
                            chucVu: _nguoiXuLy ? _nguoiXuLy.regency : PHOTRUONGPHONG,
                            phongBan: _nguoiXuLy ? _nguoiXuLy.managementDepartment : NGHIEPVU,
                            entityType: CONST_TYPE_TRANG_THAI_CHUYEN_HO_SO.HOSOTUCONGBO
                        }
                    };
                }
                else {
                    return {
                        next: {
                            nguoiXuLy,
                            chucVu: _nguoiXuLy ? _nguoiXuLy.regency : CHUYENVIEN,
                            phongBan: _nguoiXuLy ? _nguoiXuLy.managementDepartment : NGHIEPVU,
                            entityType: CONST_TYPE_TRANG_THAI_CHUYEN_HO_SO.HOSOTUCONGBO
                        }
                    };
                }
            case PHOTRUONGPHONG:
                return {
                    next: {
                        nguoiXuLy,
                        chucVu: _nguoiXuLy ? _nguoiXuLy.regency : TRUONGPHONG,
                        phongBan: _nguoiXuLy ? _nguoiXuLy.managementDepartment : NGHIEPVU,
                        entityType: CONST_TYPE_TRANG_THAI_CHUYEN_HO_SO.HOSOTUCONGBO
                    },
                    back: {
                        nguoiXuLy,
                        chucVu: _nguoiXuLy ? _nguoiXuLy.regency : TRUONGPHONG,
                        phongBan: _nguoiXuLy ? _nguoiXuLy.managementDepartment : NGHIEPVU,
                        entityType: CONST_TYPE_TRANG_THAI_CHUYEN_HO_SO.HOSOTUCONGBO
                    }
                }
            case TRUONGPHONG:
                return {
                    next: {
                        nguoiXuLy,
                        chucVu: _nguoiXuLy ? _nguoiXuLy.regency : TRUONGBAN,
                        phongBan: _nguoiXuLy ? _nguoiXuLy.managementDepartment : LANHDAO,
                        entityType: CONST_TYPE_TRANG_THAI_CHUYEN_HO_SO.HOSOTUCONGBO
                    },
                    back: {
                        nguoiXuLy,
                        chucVu: _nguoiXuLy ? _nguoiXuLy.regency : CHUYENVIEN,
                        phongBan: _nguoiXuLy ? _nguoiXuLy.managementDepartment : VANPHONG,
                        entityType: CONST_TYPE_TRANG_THAI_CHUYEN_HO_SO.HOSOTUCONGBO
                    }
                }
            case TRUONGBAN:
                return {
                    next: {
                        nguoiXuLy,
                        chucVu: _nguoiXuLy ? _nguoiXuLy.regency : TRUONGBAN,
                        phongBan: _nguoiXuLy ? _nguoiXuLy.managementDepartment : LANHDAO,
                        entityType: CONST_TYPE_TRANG_THAI_CHUYEN_HO_SO.HOSOTUCONGBO
                    },
                    back: {
                        nguoiXuLy,
                        chucVu: _nguoiXuLy ? _nguoiXuLy.regency : TRUONGPHONG,
                        phongBan: _nguoiXuLy ? _nguoiXuLy.managementDepartment : NGHIEPVU,
                        entityType: CONST_TYPE_TRANG_THAI_CHUYEN_HO_SO.HOSOTUCONGBO
                    }
                }
            default: return {
                next: {
                    nguoiXuLy,
                    chucVu: _nguoiXuLy ? _nguoiXuLy.regency : regency,
                    phongBan: _nguoiXuLy ? _nguoiXuLy.managementDepartment : managementDepartment,
                    entityType: CONST_TYPE_TRANG_THAI_CHUYEN_HO_SO.HOSOTUCONGBO
                },
                back: {
                    nguoiXuLy,
                    chucVu: _nguoiXuLy ? _nguoiXuLy.regency : regency,
                    phongBan: _nguoiXuLy ? _nguoiXuLy.managementDepartment : managementDepartment,
                    entityType: CONST_TYPE_TRANG_THAI_CHUYEN_HO_SO.HOSOTUCONGBO
                }
            }
        }
    }
    return {};
}
