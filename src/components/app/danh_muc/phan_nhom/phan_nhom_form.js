import React, { } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CommonForm } from "./../../../common";
import * as validate from "./../../../../constants/validate"
import * as actPhanNhom from "./../../../../actions/app/danh_muc/nhom_phan_nhom/phan_nhom";
import * as constants from "./../../../../constants/constants";
import * as formName from "./../../../../constants/form_name";

const PhanNhomForm = ({ handleBack }) => {
    const phan_nhom = useSelector(state => state.app.danh_muc.phan_nhom.item);
    const dispatch = useDispatch();

    const createRequest = (object = {}) => dispatch(actPhanNhom.createRequest(object));
    const updateRequest = (object = {}) => dispatch(actPhanNhom.updateRequest(object));

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
                            label: "Mã phân nhóm",
                            placeholder: "Mã phân nhóm",
                            name: "ma",
                            readOnly: phan_nhom.hasOwnProperty("id"),
                            checkValid: true,
                            validates: [validate.VALIDATE_NHOM_MA_REQUIRED]
                        },
                        {
                            col: 6,
                            label: "Tên phân nhóm",
                            placeholder: "Tên phân nhóm",
                            name: "tenPhanNhom",
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
                        label: phan_nhom.hasOwnProperty("id") ? constants.FORM_BUTTON_LABEL_UPDATE : constants.FORM_BUTTON_LABEL_CREATE,
                        icon: "fa fa-save",
                        type: constants.CONST_TYPE_BTN_SUBMIT,
                    }
                ]}
                onSubmit={handleSubmit}
                form={formName.FORM_NAME_TCB_PHAN_NHOM}
                initialValues={phan_nhom}
            />
        </React.Fragment >
    );
}

export default PhanNhomForm;