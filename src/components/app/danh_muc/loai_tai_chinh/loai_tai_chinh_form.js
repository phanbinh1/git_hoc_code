import React, { } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CommonForm } from "./../../../common";
import * as actLoaiTaiChinh from "./../../../../actions/app/danh_muc/loai_tai_chinh/loai_tai_chinh";
import * as constants from "./../../../../constants/constants";
import * as formName from "./../../../../constants/form_name";
import * as validate from "./../../../../constants/validate"

const LoaiTaiChinhForm = ({ handleBack }) => {
    const loai_tai_chinh = useSelector(state => state.app.danh_muc.loai_tai_chinh.item);
    const dispatch = useDispatch();

    const createRequest = data => dispatch(actLoaiTaiChinh.createRequest(data));
    const updateRequest = data => dispatch(actLoaiTaiChinh.updateRequest(data));

    const handleSubmit = (values) => {
        if (values.hasOwnProperty("id")) {
            updateRequest({
                data: values,
                requestSuccess: handleBack,
            });
        }
        else {
            createRequest({
                data: values,
                requestSuccess: handleBack,
            });
        }
    }

    return (
        <React.Fragment>
            <CommonForm
                data={[
                    [//row 1
                        {
                            col: 6,
                            label: "Mã kinh phí",
                            placeholder: "Mã kinh phí",
                            name: "ma",
                            checkValid: true,
                            validates: [validate.VALIDATE_QUAN_LY_TAI_CHINH_MA_KINH_PHI_REQUIRED]
                        },
                        {
                            col: 6,
                            label: "Tên kinh phí",
                            placeholder: "Tên kinh phí",
                            name: "ten",
                            checkValid: true,
                            validates: [validate.VALIDATE_QUAN_LY_TAI_CHINH_TEN_KINH_PHI_REQUIRED]
                        },
                    ],
                    [//row 4

                        {
                            col: 12,
                            label: "Ghi chú",
                            placeholder: "Ghi chú",
                            name: "ghiChu",
                            fieldType: "textarea",
                        },

                    ],
                ]}
                actions={[
                    {
                        htmlType: constants.FORM_HTML_TYPE_SUBMIT,
                        label: loai_tai_chinh.hasOwnProperty("id") ? constants.FORM_BUTTON_LABEL_UPDATE : constants.FORM_BUTTON_LABEL_CREATE,
                        icon: "fa fa-save",
                        type: constants.CONST_TYPE_BTN_SUBMIT,
                    },
                ]}
                onSubmit={handleSubmit}
                form={formName.FORM_NAME_LOAI_TAI_CHINH}
                initialValues={{
                    ...loai_tai_chinh
                }}
            />
        </React.Fragment >
    );
}

export default LoaiTaiChinhForm;