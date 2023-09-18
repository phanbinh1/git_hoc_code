import React from 'react';
import { CommonFormContent, CommonFieldset } from "./../../common";
import * as validate from "./../../../constants/validate"

const FormVersion = ({ VALIDATE_EXIST_CODE, initialValues }) => {

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
                                        label: "Phiên bản",
                                        placeholder: "Phiên bản",
                                        name: "description.version",
                                        checkValid: true,
                                        validates: [validate.VALIDATE_CAU_HINH_VERSION.VERSION]
                                    },
                                    {
                                        col: 6,
                                        label: "Ngày cập nhật",
                                        placeholder: "Ngày cập nhật",
                                        name: "description.date",
                                        fieldType: "date",
                                        checkValid: true,
                                        validates: [validate.VALIDATE_CAU_HINH_VERSION.DATE]
                                    },
                                ],
                                [
                                    {
                                        label: "Nội dung cập nhật",
                                        placeholder: "Nội dung cập nhật",
                                        name: "description.content",
                                        fieldType: "textarea",
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

export default FormVersion;