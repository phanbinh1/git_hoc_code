import React, { } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CommonForm } from "./../../../common";
import * as validate from "./../../../../constants/validate"
import * as actNhom from "./../../../../actions/app/danh_muc/nhom_phan_nhom/nhom";
import * as constants from "./../../../../constants/constants";
import * as formName from "./../../../../constants/form_name";

const NhomForm = ({ handleBack }) => {
    const nhom = useSelector(state => state.app.danh_muc.nhom.item);
    const dispatch = useDispatch();

    const createRequest = (object = {}) => dispatch(actNhom.createRequest(object));
    const updateRequest = (object = {}) => dispatch(actNhom.updateRequest(object));

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
                            name: "ma",
                            readOnly: nhom.hasOwnProperty("id"),
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
                form={formName.FORM_NAME_TCB_NHOM}
                initialValues={nhom}
            />
        </React.Fragment >
    );
}

export default NhomForm;