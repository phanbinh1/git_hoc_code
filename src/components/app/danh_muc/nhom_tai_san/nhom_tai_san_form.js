import React, { } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CommonForm } from "./../../../common";
import * as validate from "./../../../../constants/validate"
import * as actNhomTaiSan from "./../../../../actions/app/danh_muc/nhom_tai_san/nhom_tai_san";
import * as constants from "./../../../../constants/constants";
import * as formName from "./../../../../constants/form_name";
import { formValueSelector } from 'redux-form';

const NhomTaiSanForm = ({ handleBack }) => {
    const nhom = useSelector(state => state.app.danh_muc.nhom_tai_san.item);
    const khauHaoToiThieu = useSelector(state => formValueSelector(formName.FORM_NAME_QUAN_LY_DANH_MUC_NHOM_TAI_SAN)(state, "mucTrichKhauHaoToiThieu")) || 0
    const khauHaoToiDa = useSelector(state => formValueSelector(formName.FORM_NAME_QUAN_LY_DANH_MUC_NHOM_TAI_SAN)(state, "mucTrichKhauHaoToiDa"))
    const dispatch = useDispatch();

    const createRequest = (object = {}) => dispatch(actNhomTaiSan.createRequest(object));
    const updateRequest = (object = {}) => dispatch(actNhomTaiSan.updateRequest(object));

    const handleSubmit = (values) => {
        if (values.hasOwnProperty("id")) {
            updateRequest({
                data: values,
                requestSuccess: handleBack
            });
        }
        else {
            createRequest({
                data: values,
                requestSuccess: handleBack
            });
        }
    };

    return (
        <React.Fragment>
            <CommonForm
                data={[
                    [//row 1
                        {
                            col: 6,
                            label: "Mã nhóm",
                            placeholder: "Mã nhóm",
                            name: "maNhom",
                            disabled: nhom.hasOwnProperty("id"),
                            checkValid: true,
                            validates: [validate.VALIDATE_NHOM_MA_REQUIRED]
                        },
                        {
                            col: 6,
                            label: "Tên nhóm",
                            placeholder: "Tên nhóm",
                            name: "tenNhom",
                            checkValid: true,
                            validates: [validate.VALIDATE_NHOM_TEN_REQUIRED]
                        },
                    ],
                    [//row 2
                        {
                            col: 6,
                            label: "Mức trích khấu hao tối thiểu (Năm)",
                            placeholder: "Mức trích khấu hao tối thiểu",
                            name: "mucTrichKhauHaoToiThieu",
                            min: 0,
                            max: khauHaoToiDa || undefined,
                            fieldType: "number",
                            checkValid: true,
                            validates: [validate.VALIDATE_NHOM_MA_REQUIRED]
                        },
                        {
                            col: 6,
                            label: "Mức trích khấu hao tối đa (Năm)",
                            placeholder: "Mức trích khấu hao tối đa",
                            name: "mucTrichKhauHaoToiDa",
                            min: khauHaoToiThieu || 0,
                            fieldType: "number",
                            checkValid: true,
                            validates: [validate.VALIDATE_NHOM_TEN_REQUIRED]
                        },
                    ],
                    [
                        {
                            fieldType: "textarea",
                            name: "ghiChu",
                            label: "Ghi chú",
                            placeholder: "Ghi chú"
                        }
                    ]
                ]}
                actions={[
                    {
                        htmlType: constants.FORM_HTML_TYPE_SUBMIT,
                        label: nhom.hasOwnProperty("id") ? constants.FORM_BUTTON_LABEL_UPDATE : constants.FORM_BUTTON_LABEL_CREATE,
                        icon: "fa fa-save",
                        type: constants.CONST_TYPE_BTN_SUBMIT,
                    }
                ]}
                onSubmit={handleSubmit}
                form={formName.FORM_NAME_QUAN_LY_DANH_MUC_NHOM_TAI_SAN}
                initialValues={nhom}
            />
        </React.Fragment >
    );
}

export default NhomTaiSanForm;