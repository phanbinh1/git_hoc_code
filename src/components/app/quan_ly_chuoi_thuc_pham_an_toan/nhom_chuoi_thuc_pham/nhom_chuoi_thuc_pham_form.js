import React, { } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CommonForm } from "./../../../common";
import * as actNhomChuoiThucPham from "./../../../../actions/app/quan_ly_chuoi_thuc_pham_an_toan/nhom_chuoi_thuc_pham/nhom_chuoi_thuc_tham";
import * as constants from "./../../../../constants/constants";
import * as formName from "./../../../../constants/form_name";
import * as validate from "./../../../../constants/validate";

const NhomChuoiThucPhamForm = ({ handleBack }) => {

    const nhom_chuoi_thuc_pham = useSelector(state => state.app.quan_ly_chuoi_thuc_pham_an_toan.nhom_chuoi_thuc_pham.item);
    const dispatch = useDispatch();
    const createRequest = (object = {}) => dispatch(actNhomChuoiThucPham.createRequest(object));
    const updateRequest = (object = {}) => dispatch(actNhomChuoiThucPham.updateRequest(object));

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
                            col: 4,
                            label: "Mã nhóm chuổi thực phẩm",
                            placeholder: "Mã nhóm chuổi thực phẩm",
                            name: "ma",
                            readOnly: nhom_chuoi_thuc_pham.hasOwnProperty("id"),
                            checkValid: true,
                            validates: [validate.VALIDATE_NHOM_CTP_MA_REQUIRED]
                        },
                        {
                            col: 4,
                            label: "Tên nhóm",
                            placeholder: "Tên nhóm",
                            name: "tenNhom",
                            checkValid: true,
                            validates: [validate.VALIDATE_NHOM_CTP_TEN_NHOM_REQUIRED]
                        },
                        {
                            col: 4,
                            label: "Sản phẩm",
                            placeholder: "Sản phẩm",
                            name: "sanPham",
                            checkValid: true,
                            validates: [validate.VALIDATE_NHOM_CTP_SAN_PHAM_REQUIRED]
                        },
                    ],
                    [//row 2
                        {
                            col: 12,
                            fieldType: "textarea",
                            label: "Ghi chú",
                            placeholder: "Ghi chú",
                            name: "ghiChu",
                        },
                    ]
                ]}
                onSubmit={handleSubmit}
                actions={[
                    {
                        htmlType: constants.FORM_HTML_TYPE_SUBMIT,
                        label: nhom_chuoi_thuc_pham.hasOwnProperty("id") ? constants.FORM_BUTTON_LABEL_UPDATE : constants.FORM_BUTTON_LABEL_CREATE,
                        icon: "fa fa-save",
                        type: constants.CONST_TYPE_BTN_SUBMIT,
                    }
                ]}
                form={formName.FORM_NAME_NHOM_CHUOI_THUC_PHAM}
                initialValues={nhom_chuoi_thuc_pham}
            />
        </React.Fragment >
    );
}

export default NhomChuoiThucPhamForm;