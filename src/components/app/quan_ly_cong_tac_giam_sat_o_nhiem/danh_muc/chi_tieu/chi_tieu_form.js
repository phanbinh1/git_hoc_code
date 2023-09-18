import React, { } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CommonForm } from "../../../../common";
import * as validate from "../../../../../constants/validate"
import * as actChiTieu from "./../../../../../actions/app/quan_ly_cong_tac_giam_sat_o_nhiem/danh_muc/chi_tieu/chi_tieu";
import * as constants from "../../../../../constants/constants";
import * as formName from "../../../../../constants/form_name";

const ChiTieuForm = ({ handleBack, loaiOptions }) => {
    const chi_tieu = useSelector(state => state.app.quan_ly_cong_tac_giam_sat_o_nhiem.chi_tieu.item);
    const dispatch = useDispatch();

    const createRequest = (object = {}) => dispatch(actChiTieu.createRequest(object));
    const updateRequest = (object = {}) => dispatch(actChiTieu.updateRequest(object));

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
                            col: 3,
                            label: "Mã chỉ tiêu",
                            placeholder: "Mã chỉ tiêu",
                            name: "maChiTieu",
                            readOnly: chi_tieu.hasOwnProperty("id"),
                            checkValid: true,
                            validates: [validate.VALIDATE_QTGSONTP_DMTP_MA_REQUIRED],
                        },
                        {
                            col: 3,
                            label: "Tên chỉ tiêu",
                            placeholder: "Tên chỉ tiêu",
                            name: "tenChiTieu",
                            checkValid: true,
                            validates: [validate.VALIDATE_QTGSONTP_DMTP_TEN_REQUIRED],
                        },
                        {
                            col: 3,
                            label: "Loại chỉ tiêu",
                            placeholder: "Loại",
                            name: "loaiChiTieu",
                            fieldType: "select",
                            options: loaiOptions
                        },
                        {
                            col: 3,
                            fieldType: "checkbox",
                            label: "Kich hoạt",
                            name: "kichHoat",
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
                    ],
                ]}
                actions={[
                    {
                        htmlType: constants.FORM_HTML_TYPE_SUBMIT,
                        label: chi_tieu.hasOwnProperty("id") ? constants.FORM_BUTTON_LABEL_UPDATE : constants.FORM_BUTTON_LABEL_CREATE,
                        icon: "fa fa-save",
                        type: constants.CONST_TYPE_BTN_SUBMIT,
                    }
                ]}
                onSubmit={handleSubmit}
                form={formName.FORM_NAME_QLCTGSON_DM_CHI_TIEU}
                initialValues={chi_tieu}
            />
        </React.Fragment >
    );
}

export default ChiTieuForm;