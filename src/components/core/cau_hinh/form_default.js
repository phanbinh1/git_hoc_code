import React from 'react';
import { CommonFormContent } from "./../../common";
import * as validate from "./../../../constants/validate"

const FormDefault = ({ initialValues, VALIDATE_EXIST_CODE }) => {

    return <CommonFormContent
        data={[
            [//row 1
                {
                    col: 5,
                    label: "Mã cấu hình",
                    placeholder: "Mã cấu hình",
                    name: "ma",
                    disabled: initialValues.hasOwnProperty("id") ? true : false,
                    checkValid: true,
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
            ],
            [
                {
                    col: 12,
                    label: "Giá trị",
                    placeholder: "Giá trị",
                    name: "giaTri",
                    fieldType: "textarea",
                    checkValid: true,
                    validates: [validate.VALIDATE_CAU_HINH_GIA_TRI_REQUIRED]
                },
            ]
        ]}
    />;
}

export default FormDefault;