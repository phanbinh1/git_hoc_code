import React, { } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CommonForm } from "./../../../common";
import * as validate from "./../../../../constants/validate"
import * as actQuocGia from "./../../../../actions/app/danh_muc/quan_ly_quoc_gia/quan_ly_quoc_gia";
import * as constants from "./../../../../constants/constants";
import * as formName from "./../../../../constants/form_name";
import asyncValidate from "./async_validate";

const QuocGiaForm = ({ handleBack }) => {
    const quoc_gia = useSelector(state => state.app.danh_muc.quan_ly_quoc_gia.item);
    const dispatch = useDispatch();

    const createRequest = (object = {}) => dispatch(actQuocGia.createRequest(object));
    const updateRequest = (object = {}) => dispatch(actQuocGia.updateRequest(object));

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
                            label: "Mã quốc gia",
                            placeholder: "Mã quốc gia",
                            name: "maQuocGia",
                            checkValid: true,
                            validates: [validate.VALIDATE_QUAN_LY_QUOC_GIA_MA_REQUIRED]
                        },
                        {
                            col: 4,
                            label: "Tên quốc gia",
                            placeholder: "Tên quốc gia",
                            name: "tenQuocGia",
                            checkValid: true,
                            validates: [validate.VALIDATE_QUAN_LY_QUOC_GIA_TEN_REQUIRED]
                        },
                        {
                            col: 4,
                            label: "Ngôn ngữ",
                            placeholder: "Ngôn ngữ",
                            name: "ngonNgu",
                            checkValid: true,
                            validates: [validate.VALIDATE_QUAN_LY_QUOC_GIA_NGON_NGU_REQUIRED]
                        },
                    ],
                    [//row 2
                        {
                            col: 4,
                            label: "Khu vực",
                            placeholder: "Khu vực",
                            name: "khuVuc",
                            checkValid: true,
                            validates: [validate.VALIDATE_QUAN_LY_QUOC_GIA_KHU_VUC_REQUIRED]
                        },
                        {
                            col: 4,
                            label: "Dân số",
                            placeholder: "Dân số",
                            name: "danSo",
                            checkValid: true,
                            validates: [validate.VALIDATE_QUAN_LY_QUOC_GIA_DAN_SO_REQUIRED]
                        },
                        {
                            col: 4,
                            label: "Diện tích",
                            placeholder: "Diện tích",
                            name: "dienTich",
                            checkValid: true,
                            validates: [validate.VALIDATE_QUAN_LY_QUOC_GIA_DIEN_TICH_REQUIRED]
                        },
                    ],
                    [//row 3
                        {
                            col: 12,
                            label: "Ghi chú",
                            placeholder: "Ghi chú",
                            name: "ghiChu",
                            fieldType: "textarea",
                            hight: "130%",
                        },
                    ]
                ]}
                actions={[
                    {
                        htmlType: constants.FORM_HTML_TYPE_SUBMIT,
                        label: quoc_gia.hasOwnProperty("id") ? constants.FORM_BUTTON_LABEL_UPDATE : constants.FORM_BUTTON_LABEL_CREATE,
                        icon: "fa fa-save",
                        type: constants.CONST_TYPE_BTN_SUBMIT,
                    }
                ]}
                onSubmit={handleSubmit}
                form={formName.FORM_NAME_QUAN_LY_QUOC_GIA}
                initialValues={quoc_gia}
                asyncValidate={asyncValidate}
                asyncBlurFields={['maQuocGia']}
            />
        </React.Fragment >
    );
}

export default QuocGiaForm;