import React, { useEffect, useState } from 'react';
import { CommonFormContent, CommonFieldset } from "./../../common";
import * as validate from "./../../../constants/validate"
import { API_DANHMUC_CQQL } from "./../../../constants/api"
import { get } from "./../../../util/api_call"
import { useDispatch } from 'react-redux';
import { change } from 'redux-form';
import { FORM_NAME_CAU_HINH } from '../../../constants/form_name';

const FormVanBanDieuHanh = ({ VALIDATE_EXIST_CODE, initialValues }) => {

    return <CommonFormContent
        data={[
            [//row 1
                {
                    type: "custom",
                    renderCustom: <ThongTinChung key="f-0" VALIDATE_EXIST_CODE={VALIDATE_EXIST_CODE} initialValues={initialValues} />
                },
                {
                    type: "custom",
                    renderCustom: <Account key="f-1" VALIDATE_EXIST_CODE={VALIDATE_EXIST_CODE} />
                },
                {
                    type: "custom",
                    renderCustom: <Api key="f-2" VALIDATE_EXIST_CODE={VALIDATE_EXIST_CODE} />
                },
            ]
        ]}
    />
}

const Account = () => {

    const dispatch = useDispatch();
    const [coQuanQuanLys, setCoQuanQuanLys] = useState([]);

    const getCoQuanQuanLy = async () => {
        const res = await get({
            url: API_DANHMUC_CQQL,
        });
        if (res.status && Array.isArray(res.result)) {
            setCoQuanQuanLys(res.result)
        }
    }

    useEffect(() => {
        getCoQuanQuanLy();
    }, []);

    return <CommonFieldset title="ACCOUNT INFORMATION">
        <CommonFormContent
            data={[
                [//row 1
                    {
                        col: 4,
                        label: "Cơ quan quản lý",
                        placeholder: "Cơ quan quản lý",
                        name: "coQuanQuanLy.id",
                        fieldType: "select",
                        options: coQuanQuanLys.map(item => ({ value: item.id, label: item.name, ...item })),
                        checkValid: true,
                        onChange: (id) => {
                            const coQuanQuanLy = coQuanQuanLys.find(cqql => cqql.id === id);
                            if (coQuanQuanLy) {
                                dispatch(change(FORM_NAME_CAU_HINH, "coQuanQuanLy", {
                                    id: coQuanQuanLy.id,
                                    name: coQuanQuanLy.name,
                                    code: coQuanQuanLy.code,
                                    identityCode: coQuanQuanLy.identityCode
                                }));
                                dispatch(change(FORM_NAME_CAU_HINH, "account.idCoQuan", id));
                                dispatch(change(FORM_NAME_CAU_HINH, "account.idDonVi", id));
                                dispatch(change(FORM_NAME_CAU_HINH, "account.maCoQuan", id));
                            }
                            else {
                                dispatch(change(FORM_NAME_CAU_HINH, "coQuanQuanLy", null));
                                dispatch(change(FORM_NAME_CAU_HINH, "account.idCoQuan", null));
                                dispatch(change(FORM_NAME_CAU_HINH, "account.idDonVi", null));
                                dispatch(change(FORM_NAME_CAU_HINH, "account.maCoQuan", null));
                            }
                        },
                        validates: [validate.VALIDATE_CAU_HINH_CO_QUAN_QUAN_LY_REQUIRED],
                    },
                    {
                        col: 2,
                        label: "ID cơ quan",
                        placeholder: "ID cơ quan",
                        name: "account.idCoQuan",
                        checkValid: true,
                        validates: [validate.VALIDATE_CAU_HINH_VBDH.ACCOUNT.ID_CO_QUAN]
                    },
                    {
                        col: 2,
                        label: "ID đơn vị",
                        placeholder: "ID đơn vị",
                        name: "account.idDonVi",
                        checkValid: true,
                        validates: [validate.VALIDATE_CAU_HINH_VBDH.ACCOUNT.ID_DON_VI]
                    },
                    {
                        col: 4,
                        label: "Mã cơ quan",
                        placeholder: "Mã cơ quan",
                        name: "account.maCoQuan",
                        checkValid: true,
                        validates: [validate.VALIDATE_CAU_HINH_VBDH.ACCOUNT.MA_CO_QUAN]
                    },
                ],
                [//row 1
                    {
                        col: 6,
                        label: "Mật khẩu",
                        placeholder: "Mật khẩu",
                        name: "account.password",
                        fieldType: "password",
                        checkValid: true,
                        validates: [validate.VALIDATE_CAU_HINH_VBDH.ACCOUNT.MAT_KHAU]
                    },
                    {
                        col: 6,
                        label: "Loại hồ sơ",
                        placeholder: "Loại hồ sơ",
                        name: "account.loaiHoSo",
                        checkValid: true,
                        validates: [validate.VALIDATE_CAU_HINH_VBDH.ACCOUNT.LOAI_HO_SO]
                    },
                ]
            ]}
        />
    </CommonFieldset>
}

const Api = () => {
    return <CommonFieldset title="API INFORMATION">
        <CommonFormContent
            data={[
                [//row 1
                    {
                        col: 12,
                        label: "Đường dẫn",
                        placeholder: "Đường dẫn",
                        name: "api.url",
                        checkValid: true,
                        validates: [validate.VALIDATE_CAU_HINH_VBDH.API.URL]
                    },
                ],
                [
                    {
                        col: 4,
                        label: "Action thêm mới",
                        placeholder: "Action thêm mới",
                        name: "api.action.themMoi",
                        checkValid: true,
                        validates: [validate.VALIDATE_CAU_HINH_VBDH.API.ACTION_THEM_MOI]
                    },
                    {
                        col: 4,
                        label: "Action lấy danh sách",
                        placeholder: "Action thêm mới",
                        name: "api.action.layDanhSach",
                        checkValid: true,
                        validates: [validate.VALIDATE_CAU_HINH_VBDH.API.ACTION_LAY_DANH_SACH]
                    },
                    {
                        col: 4,
                        label: "Action đồng bộ",
                        placeholder: "Action thêm mới",
                        name: "api.action.dongBo",
                        checkValid: true,
                        validates: [validate.VALIDATE_CAU_HINH_VBDH.API.ACTION_DONG_BO]
                    }
                ]
            ]}
        />
    </CommonFieldset>
}

const ThongTinChung = ({ VALIDATE_EXIST_CODE, initialValues }) => {
    return <CommonFieldset title="THÔNG TIN CHUNG">
        <CommonFormContent
            data={[
                [
                    {
                        col: 5,
                        label: "Mã cấu hình",
                        placeholder: "Mã cấu hình",
                        name: "ma",
                        checkValid: true,
                        disabled: initialValues.hasOwnProperty("id") ? true : false,
                        validates: [VALIDATE_EXIST_CODE, validate.VALIDATE_CAU_HINH_MA_REQUIRED]
                    },
                    {
                        col: 5,
                        label: "Tên cấu hình",
                        placeholder: "Tên cấu hình",
                        name: "ten",
                        checkValid: true,
                        validates: [validate.VALIDATE_CAU_HINH_TEN_REQUIRED]
                    },
                    {
                        col: 2,
                        label: "Sắp xếp",
                        placeholder: "Sắp xếp",
                        name: "sapXep",
                        fieldType: "number",
                        checkValid: true,
                        validates: [validate.VALIDATE_IS_NUMBER]
                    },
                ]
            ]}
        />
    </CommonFieldset>
}
export default FormVanBanDieuHanh;