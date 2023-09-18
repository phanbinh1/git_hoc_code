import React, { } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CommonForm } from "./../../../common";
import * as actNguonKinhPhi from "./../../../../actions/app/danh_muc/nguon_kinh_phi/nguon_kinh_phi";
import * as constants from "./../../../../constants/constants";
import * as formName from "./../../../../constants/form_name";
import * as validate from "./../../../../constants/validate"

const NguonKinhPhiForm = ({ handleBack }) => {
    const nguon_kinh_phi = useSelector(state => state.app.danh_muc.nguon_kinh_phi.item);
    const dispatch = useDispatch();

    const createRequest = data => dispatch(actNguonKinhPhi.createRequest(data));
    const updateRequest = data => dispatch(actNguonKinhPhi.updateRequest(data));

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
                            label: "Mã",
                            placeholder: "Mã",
                            name: "ma",
                            checkValid: true,
                            validates: [validate.VALIDATE_MA_REQUIRED]
                        },
                        {
                            col: 6,
                            label: "Tên nguồn kinh phí",
                            placeholder: "Tên nguồn kinh phí",
                            name: "ten",
                            checkValid: true,
                            validates: [validate.VALIDATE_TEN_REQUIRED]
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
                        label: nguon_kinh_phi.hasOwnProperty("id") ? constants.FORM_BUTTON_LABEL_UPDATE : constants.FORM_BUTTON_LABEL_CREATE,
                        icon: "fa fa-save",
                        type: constants.CONST_TYPE_BTN_SUBMIT,
                    },
                ]}
                onSubmit={handleSubmit}
                form={formName.FORM_NAME_NGUON_KINH_PHI}
                initialValues={{
                    ...nguon_kinh_phi
                }}
            />
        </React.Fragment >
    );
}

export default NguonKinhPhiForm;