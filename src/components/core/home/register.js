import React, { Fragment } from 'react';
import { CommonForm } from '../../common';
import { useSelector, useDispatch } from 'react-redux';
import { Popover } from "antd";
import { getFormValues } from "redux-form";
import * as validate from "./../../../constants/validate"
import { CONST_TYPE_BTN_EDIT, FORM_HTML_TYPE_BUTTON, FORM_HTML_TYPE_SUBMIT } from '../../../constants/constants';
import { registerRequest } from "./../../../actions/core/auth";
import { useHistory } from 'react-router';

const RegisterForm = () => {
    const dispatch = useDispatch();

    const history = useHistory();
    const formValue = useSelector(state => getFormValues("FORM_REGISTER")(state));
    const password_form = formValue ? formValue.password : null;

    const VALIDATE_RETYPE_PASSWORD = (value) => {
        if (value && value !== password_form) {
            return "Xác nhận mật khẩu không đúng!";
        }
        return undefined;
    };

    const handleSubmit = (values) => {
        var data = { username: values.name, password: values.password };
        data.account = { ...values };
        console.log(data);
        dispatch(registerRequest({ data }))
    };

    return <Fragment>
        <div className="register-wrapper">
            <div className="register-form">
                <div className="register-title" >
                    ĐĂNG KÝ TÀI KHOẢN
                </div>
                <CommonForm
                    wrapperClassName="register-body"
                    form="FORM_REGISTER"
                    onSubmit={handleSubmit}
                    actions={[
                        {
                            htmlType: FORM_HTML_TYPE_BUTTON,
                            label: "Quay lại",
                            icon: "fa fa-reply",
                            handleClick: () => history.go(-1)
                        },
                        {
                            htmlType: FORM_HTML_TYPE_SUBMIT,
                            label: "Đăng ký",
                            icon: "fa fa-rebel",
                            type: CONST_TYPE_BTN_EDIT
                        }
                    ]}
                    data={[
                        [
                            {
                                label: "Tên đăng nhập",
                                placeholder: "Tên đăng nhập",
                                name: "name",
                                checkValid: true,
                                allowClear: true,
                                validates: [validate.VALIDATE_USERNAME_REQUIRED]
                            },
                            {
                                fieldType: "password",
                                label: <span>
                                    <span style={{ marginRight: "10px" }}>
                                        Mật khẩu:
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
                                placeholder: "Mật khẩu",
                                name: "password",
                                checkValid: true,
                                validates: [validate.VALIDATE_PASSWORD_REQUIRED, validate.VALIDATE_PASSWORD]
                            },
                            {
                                fieldType: "password",
                                label: "Xác nhận mật khẩu",
                                placeholder: "Xác nhận mật khẩu",
                                name: "retypePassword",
                                checkValid: true,
                                validates: [
                                    validate.VALIDATE_RETYPE_PASSWORD_REQUIRED,
                                    VALIDATE_RETYPE_PASSWORD
                                ]
                            },
                            {
                                label: "Email",
                                placeholder: "Email",
                                name: "email",
                                checkValid: true,
                                validates: [validate.VALIDATE_EMAIL_REQUIRED, validate.VALIDATE_IS_EMAIL]
                            },
                            {
                                label: "Họ và tên",
                                placeholder: "Họ và tên",
                                name: "fullName",
                                checkValid: true,
                                validates: [validate.VALIDATE_ACCOUNT_FULLNAME_REQUIRED]
                            },
                        ]
                    ]}
                />
            </div>
        </div>
    </Fragment >
}

export default RegisterForm;