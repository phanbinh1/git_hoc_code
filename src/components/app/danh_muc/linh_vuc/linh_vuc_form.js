import React, { } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CommonForm } from "./../../../common";
import * as validate from "./../../../../constants/validate"
import * as actLinhVuc from "./../../../../actions/app/danh_muc/linh_vuc/linh_vuc";
import * as constants from "./../../../../constants/constants";
import * as formName from "./../../../../constants/form_name";

const LinhVucForm = ({ handleBack }) => {
    const linh_vuc = useSelector(state => state.app.danh_muc.linh_vuc.item);
    const dispatch = useDispatch();

    const createRequest = (object = {}) => dispatch(actLinhVuc.createRequest(object));
    const updateRequest = (object = {}) => dispatch(actLinhVuc.updateRequest(object));

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
                            label: "Mã lĩnh vực",
                            placeholder: "Mã lĩnh vực",
                            name: "ma",
                            readOnly: linh_vuc.hasOwnProperty("id"),
                            checkValid: true,
                            validates: [validate.VALIDATE_LINH_VUC_MA_REQUIRED]
                        },
                        {
                            col: 6,
                            label: "Tên lĩnh vực",
                            placeholder: "Tên lĩnh vực",
                            name: "ten",
                            checkValid: true,
                            validates: [validate.VALIDATE_LINH_VUC_TEN_REQUIRED]
                        },
                    ],
                ]}
                actions={[
                    {
                        htmlType: constants.FORM_HTML_TYPE_SUBMIT,
                        label: linh_vuc.hasOwnProperty("id") ? constants.FORM_BUTTON_LABEL_UPDATE : constants.FORM_BUTTON_LABEL_CREATE,
                        icon: "fa fa-save",
                        type: constants.CONST_TYPE_BTN_SUBMIT,
                    }
                ]}
                onSubmit={handleSubmit}
                form={formName.FORM_NAME_LINH_VUC}
                initialValues={linh_vuc}
            />
        </React.Fragment >
    );
}

export default LinhVucForm;