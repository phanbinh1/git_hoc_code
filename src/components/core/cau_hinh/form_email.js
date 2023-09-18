import React from 'react';
import { CommonFormContent, CommonFieldset } from "./../../common";
import * as validate from "./../../../constants/validate"

const FormEmail = ({ VALIDATE_EXIST_CODE, initialValues }) => {

    return <CommonFormContent
        data={[
            [//row 1
                {
                    type: "custom",
                    renderCustom: <CommonFieldset title="THÔNG TIN CHUNG" key="thong-tin-chung">
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
                },
                {
                    type: "custom",
                    renderCustom: <CommonFieldset title="CHI TIẾT" key="chi-tiet">
                        <CommonFormContent
                            data={[
                                [
                                    {
                                        col: 6,
                                        label: "Email",
                                        placeholder: "Email",
                                        name: "email",
                                        checkValid: true,
                                        validates: [validate.VALIDATE_EMAIL_REQUIRED]
                                    },
                                    {
                                        col: 6,
                                        label: "Mật khẩu",
                                        placeholder: "Mật khẩu",
                                        name: "password",
                                        fieldType: "password",
                                        checkValid: true,
                                        validates: [validate.VALIDATE_PASSWORD_REQUIRED]
                                    },
                                ]
                            ]}
                        />
                    </CommonFieldset>
                }
            ]
        ]}
    />
}

export default FormEmail;