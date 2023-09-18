import React, { } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CommonForm } from "./../../../common";
import * as validate from "./../../../../constants/validate"
import * as actPhongBan from "./../../../../actions/app/danh_muc/quan_ly_phong_ban/quan_ly_phong_ban";
import * as constants from "./../../../../constants/constants";
import * as formName from "./../../../../constants/form_name";

const QuanLyPhongBanForm = ({ handleBack }) => {
    const phong_ban = useSelector(state => state.app.danh_muc.quan_ly_phong_ban.item);
    const dispatch = useDispatch();

    const createRequest = (object = {}) => dispatch(actPhongBan.createRequest(object));
    const updateRequest = (object = {}) => dispatch(actPhongBan.updateRequest(object));

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
                            col: 5,
                            label: "Mã phòng ban",
                            placeholder: "Mã phòng ban",
                            name: "ma",
                            readOnly: phong_ban.hasOwnProperty("id"),
                            checkValid: true,
                            validates: [validate.VALIDATE_QUAN_LY_PHONG_BAN_MA_REQUIRED]
                        },
                        {
                            col: 5,
                            label: "Tên phòng ban",
                            placeholder: "Tên phòng ban",
                            name: "ten",
                            checkValid: true,
                            validates: [validate.VALIDATE_QUAN_LY_PHONG_BAN_TEN_REQUIRED]
                        },
                        {
                            col: 2,
                            label: "Sắp xếp",
                            placeholder: "Sắp xếp",
                            name: "sort",
                            fieldType: "number"
                        },
                    ],
                    [//row 2
                        {
                            col: 12,
                            fieldType: "textarea",
                            label: "Ghi chú",
                            placeholder: "Ghi chú",
                            name: "ghiChu",
                        }
                    ],
                ]}
                actions={[
                    {
                        htmlType: constants.FORM_HTML_TYPE_SUBMIT,
                        label: phong_ban.hasOwnProperty("id") ? constants.FORM_BUTTON_LABEL_UPDATE : constants.FORM_BUTTON_LABEL_CREATE,
                        icon: "fa fa-save",
                        type: constants.CONST_TYPE_BTN_SUBMIT,
                    }
                ]}
                onSubmit={handleSubmit}
                form={formName.FORM_NAME_QUAN_LY_PHONG_BAN}
                initialValues={phong_ban}
            />
        </React.Fragment >
    );
}

export default QuanLyPhongBanForm;