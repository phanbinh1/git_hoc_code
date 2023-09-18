import React, { } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Popover } from "antd";
import { getFormValues } from "redux-form";
import { CommonForm } from "./../../common";
import * as validate from "./../../../constants/validate"
import * as actAccount from "./../../../actions/core/account";
import * as constants from "./../../../constants/constants";
import * as formName from "./../../../constants/form_name";
import { API_PHONG_BAN } from '../../../constants/api';

const AccountForm = ({ handleBack }) => {

    const account = useSelector(state => state.core.account.item);
    const formValue = useSelector(state => getFormValues(formName.FORM_NAME_ACCOUNT)(state));
    const password_form = formValue ? formValue.password : null;

    const dispatch = useDispatch();
    const createRequest = (object = {}) => dispatch(actAccount.createRequest(object));
    const updateRequest = (object = {}) => dispatch(actAccount.updateRequest(object));


    const handleSubmit = (values) => {
        values.isEnable = values.isEnable ? 1 : 0;
        if (values.hasOwnProperty("id")) {
            updateRequest({
                data: values,
                requestSuccess: handleBack
            });
        }
        else {
            var data = { username: values.name, password: values.password };
            data.account = { ...values };
            createRequest({
                data,
                requestSuccess: handleBack
            });
        }
    };

    const VALIDATE_RETYPE_PASSWORD = (value) => {
        if (value && value !== password_form) {
            return "Xác nhận mật khẩu không đúng!";
        }
        return undefined;
    }

    return (
        <React.Fragment>
            <CommonForm
                data={[
                    [//row 1
                        {
                            col: 6,
                            label: "Họ và tên",
                            placeholder: "Họ và tên",
                            name: "fullName",
                            checkValid: true,
                            validates: [validate.VALIDATE_ACCOUNT_FULLNAME_REQUIRED]
                        },
                        {
                            col: 6,
                            label: "Email",
                            placeholder: "Email",
                            name: "email",
                            checkValid: true,
                            validates: [validate.VALIDATE_EMAIL_REQUIRED, validate.VALIDATE_IS_EMAIL]
                        },
                    ],
                    [//row 2
                        {
                            col: 6,
                            label: "Điện thoại di động",
                            placeholder: "Điện thoại di động",
                            name: "phoneNumber",
                        },
                        {
                            col: 6,
                            label: "Điện thoại cơ quan",
                            placeholder: "Điện thoại cơ quan",
                            name: "desktopPhoneNumber",
                        },
                    ],
                    [//row 3
                        {
                            col: 6,
                            label: "Phòng ban",
                            placeholder: "Phòng ban",
                            name: "managementDepartment",
                            fieldType: "selectLoadMore",
                            url: API_PHONG_BAN,
                            searchKey: "searchData",
                            searchKeyExtend: "ten",
                            valueKey: "ma",
                            labelKey: "ten",
                        },
                        {
                            col: 6,
                            label: "Chức vụ",
                            placeholder: "Chức vụ",
                            name: "regency",
                            fieldType: "select",
                            options: constants.CONST_CHUC_VU[formValue && formValue.managementDepartment ? `options${formValue.managementDepartment}` : `options`]
                        },
                    ],
                    [//row 4
                        {
                            col: 6,
                            readOnly: account.hasOwnProperty("id"),
                            label: "Tên đăng nhập",
                            placeholder: "Tên đăng nhập",
                            name: "name",
                            checkValid: true,
                            allowClear: true,
                            validates: [validate.VALIDATE_USERNAME_REQUIRED]
                        },
                        {
                            col: 6,
                            fieldType: "checkbox",
                            label: "Kích hoạt tài khoản",
                            name: "isEnable",
                            className: "checkbox-success",
                            wrapperClass: "p-t-20"
                        },
                    ],
                    [ // row 5
                        ...(account.hasOwnProperty("id") ?
                            [] :
                            [
                                {
                                    col: 6,
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
                                    col: 6,
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
                            ]
                        )
                    ],
                ]}
                onSubmit={handleSubmit}
                actions={[
                    {
                        htmlType: constants.FORM_HTML_TYPE_SUBMIT,
                        label: account.hasOwnProperty("id") ? constants.FORM_BUTTON_LABEL_UPDATE : constants.FORM_BUTTON_LABEL_CREATE,
                        icon: "fa fa-save",
                        type: constants.CONST_TYPE_BTN_SUBMIT
                    }
                ]}
                form={formName.FORM_NAME_ACCOUNT}
                initialValues={account}
            />
        </React.Fragment >
    );
}

export default AccountForm;