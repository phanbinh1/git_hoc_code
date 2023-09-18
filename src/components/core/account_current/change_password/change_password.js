import React, { } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Popover } from "antd";
import { CommonForm } from "./../../../common";
import * as validate from "./../../../../constants/validate";
import * as actAccountCurrent from "./../../../../actions/core/account_current";
import * as constants from "./../../../../constants/constants";
import * as formName from "./../../../../constants/form_name";

const ChangePasswordForm = ({
    onClose
}) => {
    const account_current = useSelector(state => state.core.account_current);
    const newPassword = useSelector(state => {
        const form = state.form;
        if (
            form[formName.FORM_NAME_CHANGE_PASSWORD]
            && form[formName.FORM_NAME_CHANGE_PASSWORD].values
            && form[formName.FORM_NAME_CHANGE_PASSWORD].values.newPassword
        ) {
            return form[formName.FORM_NAME_CHANGE_PASSWORD].values.newPassword;
        }
        else {
            return null;
        }
    });

    const dispatch = useDispatch();
    const changePasswordRequest = (object = {}) => dispatch(actAccountCurrent.changePasswordRequest(object));


    const handleSubmit = (data) => {
        data.userName = account_current.name;
        changePasswordRequest({
            data,
            requestSuccess: onClose,
        });
    };

    const VALIDATE_RETYPE_PASSWORD = (value) => {
        if (value && value !== newPassword) {
            return "Xác nhận mật khẩu không đúng!";
        }
        return undefined;
    }

    return (
        <React.Fragment>
            <CommonForm
                formClassName="form-none-padding"
                wrapperClassName="form-change-password"
                data={[
                    [
                        {
                            col: 12,
                            name: "password",
                            placeholder: "Mật khẩu cũ",
                            label: "Mật khẩu cũ",
                            fieldType: "password",
                            validates: [validate.VALIDATE_PASSWORD_REQUIRED],
                            checkValid: true

                        }
                    ],
                    // row 2
                    [
                        {
                            col: 12,
                            name: "newPassword",
                            placeholder: "Mật khẩu mới",
                            label: <span>
                                <span style={{ marginRight: "10px" }}>
                                    Mật khẩu mới:
                                </span>
                                <Popover
                                    content={<div>
                                        <p>Mật khẩu hợp lệ gồm có:</p>
                                        <p> - Tối thiểu 12 ký tự</p>
                                        <p> - Ít nhất 1 chữ hoa</p>
                                        <p> - Ít nhất 1 chữ thường</p>
                                        <p> - Ít nhất 1 kí tự đặc biệt</p>
                                        <p> - Ít nhất 1 chữ số</p>
                                        <p> Ví dụ: 'Abc@12345678'</p>
                                    </div>}
                                    title="Mật khẩu hợp lệ"
                                    trigger="click"
                                >
                                    <span>
                                        <i className="fa fa-question-circle-o c-pointer" />
                                    </span>
                                </Popover>
                            </span>,
                            fieldType: "password",
                            validates: [validate.VALIDATE_PASSWORD_REQUIRED, validate.VALIDATE_PASSWORD],
                            checkValid: true

                        }
                    ],
                    // row 3
                    [
                        {
                            col: 12,
                            name: "reTypeNewPassword",
                            placeholder: "Nhập lại mật khẩu",
                            label: "Nhập lại mật khẩu",
                            fieldType: "password",
                            validates: [validate.VALIDATE_PASSWORD_REQUIRED, VALIDATE_RETYPE_PASSWORD],
                            checkValid: true

                        }
                    ],
                    // row 4
                    [
                        {
                            col: 12,
                            name: "logoutAll",
                            fieldType: "checkbox",
                            label: "Đăng xuất khỏi các thiết bị"
                        }
                    ]
                ]}
                actions={[
                    {
                        htmlType: constants.FORM_HTML_TYPE_SUBMIT,
                        label: "Đổi mật khẩu",
                        icon: "fa fa-save",
                        block: true,
                        type: constants.CONST_TYPE_BTN_SUBMIT,
                    },
                    {
                        htmlType: constants.FORM_HTML_TYPE_RESET,
                        hidden: true
                    }
                ]}
                onSubmit={handleSubmit}
                form={formName.FORM_NAME_CHANGE_PASSWORD}
            />
        </React.Fragment >
    );
}

export default ChangePasswordForm;