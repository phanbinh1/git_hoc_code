import React, { } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { change, getFormValues } from "redux-form";
import { CommonForm } from "./../../../../common";
import ListChiTieu from "./list_chi_tieu";
import * as validate from "./../../../../../constants/validate"
import * as actLoaiThucPham from "../../../../../actions/app/quan_ly_cong_tac_giam_sat_o_nhiem/danh_muc/loai_thuc_pham/loai_thuc_pham";
import * as constants from "./../../../../../constants/constants";
import * as formName from "./../../../../../constants/form_name";

const LoaiThucPhamForm = ({ handleBack }) => {
    const loai_thuc_pham = useSelector(state => state.app.quan_ly_cong_tac_giam_sat_o_nhiem.loai_thuc_pham.item);
    const formValues = useSelector(state => getFormValues(formName.FORM_NAME_QLCTGSON_DM_NHOM_THUC_PHAM)(state));
    const dispatch = useDispatch();
    const changeValue = (fieldName, value) => dispatch(change(formName.FORM_NAME_QLCTGSON_DM_NHOM_THUC_PHAM, fieldName, value));
    const createRequest = (object = {}) => dispatch(actLoaiThucPham.createRequest(object));
    const updateRequest = (object = {}) => dispatch(actLoaiThucPham.updateRequest(object));


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

    const onChangeChiTieus = chiTieus => {
        changeValue("listChiTieu", chiTieus);
    }
    return (
        <React.Fragment>
            <CommonForm
                data={[
                    [//row 1
                        {
                            col: 6,
                            label: "Mã loại thực phẩm",
                            placeholder: "Mã loại thực phẩm",
                            name: "maLoaiThucPham",
                            readOnly: loai_thuc_pham.hasOwnProperty("id"),
                            checkValid: true,
                            validates: [validate.VALIDATE_QTGSONTP_DMLTP_MA_REQUIRED],
                        },
                        {
                            col: 6,
                            label: "Tên loại thực phẩm",
                            placeholder: "Tên loại thực phẩm",
                            name: "tenLoaiThucPham",
                            checkValid: true,
                            validates: [validate.VALIDATE_QTGSONTP_DMLTP_TEN_REQUIRED],
                        },
                    ],
                    [//row 1
                        {
                            col: 12,
                            fieldType: "textarea",
                            label: "Ghi chú",
                            placeholder: "Ghi chú",
                            name: "ghiChu",
                        },
                    ],
                    [
                        {
                            type: "custom",
                            renderCustom: <ListChiTieu
                                key="chi-tieu"
                                listChiTieu={formValues && Array.isArray(formValues.listChiTieu) ? formValues.listChiTieu : []}
                                onChange={chiTieus => onChangeChiTieus(chiTieus)}
                            />
                        }
                    ]
                ]}
                actions={[
                    {
                        htmlType: constants.FORM_HTML_TYPE_SUBMIT,
                        label: loai_thuc_pham.hasOwnProperty("id") ? constants.FORM_BUTTON_LABEL_UPDATE : constants.FORM_BUTTON_LABEL_CREATE,
                        icon: "fa fa-save",
                        type: constants.CONST_TYPE_BTN_SUBMIT,
                    }
                ]}
                onSubmit={handleSubmit}
                form={formName.FORM_NAME_QLCTGSON_DM_NHOM_THUC_PHAM}
                initialValues={loai_thuc_pham}
            />
        </React.Fragment >
    );
}

export default LoaiThucPhamForm;