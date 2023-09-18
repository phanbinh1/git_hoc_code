import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { CommonForm } from "./../../../common";
import * as validate from "./../../../../constants/validate"
import * as formName from "./../../../../constants/form_name";
import * as apiUrl from "./../../../../constants/api";
import * as message from "./../../../../constants/message";
import * as api from "./../../../../util/api_call";
import * as constants from "./../../../../constants/constants";
import moment from 'moment';
import NghiPhepCalendar from './calendar';

const { CONST_PHONG_BAN, CONST_CHUC_VU, CONST_NGHI_PHEP_BUOI, CONST_PHE_DUYET } = constants;
const { THANHTRA, NGHIEPVU, DOI1, DOI2, VANPHONG, ADMIN, LANHDAO } = CONST_PHONG_BAN;
const { TRUONGBAN, TRUONGPHONG, CHANHVANPHONG, DOITRUONG } = CONST_CHUC_VU;


const countNgayNghi = (ngayNghi = []) => {
    if (ngayNghi && Array.isArray(ngayNghi)) {
        return ngayNghi
            .map(item => {
                switch (item.loaiBuoi) {
                    case CONST_NGHI_PHEP_BUOI.SANG.value:
                    case CONST_NGHI_PHEP_BUOI.CHIEU.value:
                        return 0.5;
                    case CONST_NGHI_PHEP_BUOI.CANGAY.value:
                        return 1;
                    default: return 0;
                }
            })
            .reduce((a, b) => a + b, 0)
    }
    return 0;
};

const NghiPhep = ({ renderActionThemMoi, setData, itemUpdate, ngayNghiTrongTuan = [], ngayDiLamTrongTuan = [], loadData, data, ngayLes, getNgayNghiLeTrongNam }) => {
    const account_current = useSelector(state => state.core.account_current);
    const accounts = useSelector(state => state.core.account.profiles)

    const nguoiTiepNhan = () => {
        const { regency, managementDepartment } = account_current;
        switch (managementDepartment) {
            case NGHIEPVU:
            case THANHTRA:
                return regency === TRUONGPHONG ?
                    {
                        chucVu: TRUONGBAN,
                        phongBan: LANHDAO
                    } :
                    {
                        chucVu: TRUONGPHONG,
                        phongBan: managementDepartment
                    }
            case DOI1:
            case DOI2:
                return regency === DOITRUONG ?
                    {
                        chucVu: TRUONGBAN,
                        phongBan: LANHDAO
                    } :
                    {
                        chucVu: DOITRUONG,
                        phongBan: managementDepartment
                    }
            case VANPHONG:
                return regency === CHANHVANPHONG ?
                    {
                        chucVu: TRUONGBAN,
                        phongBan: LANHDAO
                    } :
                    {
                        chucVu: CHANHVANPHONG,
                        phongBan: VANPHONG
                    }
            case ADMIN:
                return regency === ADMIN ?
                    {
                        chucVu: TRUONGBAN,
                        phongBan: LANHDAO
                    } :
                    {
                        chucVu: ADMIN,
                        phongBan: CONST_CHUC_VU.ADMIN
                    }
            default:
                return {
                    chucVu: TRUONGBAN,
                    phongBan: LANHDAO
                }
        }
    }

    const handleSubmit = async (values) => {
        const thongTinNghiPhepChiTiets = values.thongTinNghiPhepChiTiets || [];
        const data = {
            ...values,
            thongTinNghiPhepChiTiets,
            thongTinNghiPhepCaNhanThucTe: {
                ...(values.thongTinNghiPhepCaNhanThucTe ? values.thongTinNghiPhepCaNhanThucTe : {}),
                soNgayNghi: countNgayNghi(thongTinNghiPhepChiTiets),
                trangThai: CONST_PHE_DUYET.DANGHOANTHIEN
            }
        };
        if (data.hasOwnProperty("id")) {
            const res = await api.put({ url: apiUrl.API_THONG_TIN_NGHI_PHEP, data });
            if (res && res.status) {
                res.msg && message.success({ content: res.msg });
                setData(data => data.map(item => item.id === res.result.id ? res.result : item));
                renderActionThemMoi();
            }
            else {
                res.msg && message.error({ content: res.msg });
            }
        }
        else {
            const res = await api.post({ url: apiUrl.API_THONG_TIN_NGHI_PHEP, data });
            if (res && res.status) {
                res.msg && message.success({ content: res.msg });
                setData(data => [...data, res.result]);
                renderActionThemMoi();
            }
            else {
                res.msg && message.error({ content: res.msg });
            }
        }
    };

    return <Fragment>
        <CommonForm
            key="f-c-1"
            data={[
                [
                    {
                        col: 4,
                        label: "Người tiếp nhận",
                        placeholder: "Người tiếp nhận",
                        fieldType: "select",
                        name: "nguoiTiepNhan",
                        checkValid: true,
                        validates: [validate.VALIDATE_QLTTNP_NGUOI_TIEP_NHAN_REQUIRED],
                        options: accounts.filter(acc => acc.managementDepartment === nguoiTiepNhan().phongBan && acc.regency === nguoiTiepNhan().chucVu).map(acc => ({ value: acc.name, label: acc.fullName })),
                    },
                    {
                        col: 8,
                        label: "Lý do",
                        placeholder: "Lý do",
                        name: "lyDo",
                        fieldType: "textarea",
                        checkValid: true,
                        autoSize: true,
                        validates: [validate.VALIDATE_QUAN_LY_THONG_TIN_NGHI_LY_DO_REQUIRED]
                    },
                ],
                [
                    {
                        type: "custom",
                        renderCustom: <div className="col-md-12">
                            <NghiPhepCalendar
                                ngayNghiTrongTuan={ngayNghiTrongTuan}
                                ngayDiLamTrongTuan={ngayDiLamTrongTuan}
                                loadData={loadData}
                                data={data}
                                ngayLes={ngayLes}
                                getNgayNghiLeTrongNam={getNgayNghiLeTrongNam}
                            />
                        </div>
                    }
                ],
            ]}
            onSubmit={handleSubmit}
            form={formName.FORM_NAME_THONG_TIN_NGHI_PHEP}
            initialValues={{
                trangThaiDuyet: constants.CONST_PHE_DUYET.CHOPHEDUYET,
                nhanSu: { userName: account_current.name },
                nam: moment().year(),
                ...itemUpdate
            }}
        />
    </Fragment>
}

export default NghiPhep;