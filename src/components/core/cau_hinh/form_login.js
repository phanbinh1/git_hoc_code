import React from 'react';
import { CommonFormContent } from "./../../common";
import * as validate from "./../../../constants/validate"
import { cauHinhOptions } from "./../../../App";

const FormLogin = ({ initialValues }) => {
    return <CommonFormContent
        data={[
            [//row 1
                {
                    col: 5,
                    label: "Tên cấu hình",
                    placeholder: "Tên cấu hình",
                    name: "ten",
                    checkValid: true,
                    disabled: initialValues.hasOwnProperty("id") ? true : false,
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
                {
                    col: 5,
                    label: "Giá trị",
                    placeholder: "Giá trị",
                    name: "giaTri",
                    fieldType: "select",
                    options: cauHinhOptions.options,
                    allowClear: false,
                    checkValid: true,
                    validates: [validate.VALIDATE_CAU_HINH_GIA_TRI_REQUIRED]
                },
            ]
        ]}
    />
}

export default FormLogin;