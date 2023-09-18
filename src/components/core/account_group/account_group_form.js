import React, { } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Divider } from "antd";
import AccountGroupListAccount from "./account_group_list_account";
import { CommonForm } from "./../../common";
import * as validate from "./../../../constants/validate"
import * as actAccountGroup from "./../../../actions/core/account_group";
import * as constants from "./../../../constants/constants";
import * as formName from "./../../../constants/form_name";

const AccountGroupForm = ({ handleBack, getAllAccountRequest }) => {

    const account_group = useSelector(state => state.core.account_group.item);
    const dispatch = useDispatch();
    const createRequest = (object = {}) => dispatch(actAccountGroup.createRequest(object));
    const updateRequest = (object = {}) => dispatch(actAccountGroup.updateRequest(object));

    const handleSubmit = (values) => {
        const isEnable = values.isEnable ? 1 : 0;
        let systemUsers = [];
        if (Array.isArray(values.listAccount)) {
            systemUsers = values.listAccount.map((username) => ({ username }))
        }
        const data = { ...values, systemUsers, isEnable };
        if (!values.hasOwnProperty("id")) {
            createRequest({
                data,
                requestSuccess: handleBack,
                // requestError: handleSubmitFail
            });
        }
        else {
            updateRequest({
                data,
                requestSuccess: handleBack,
                // requestError: handleSubmitFail
            });
        }
    };

    return (
        <React.Fragment>
            <CommonForm
                data={[
                    [
                        {
                            col: 4,
                            readOnly: account_group.hasOwnProperty("id"),
                            label: "Mã nhóm",
                            placeholder: "Mã nhóm",
                            name: "groupCode",
                            checkValid: true,
                            validates: [validate.VALIDATE_ACCOUNT_GROUP_CODE_REQUIRED]
                        },
                        {
                            col: 4,
                            label: "Tên nhóm",
                            placeholder: "Tên nhóm",
                            name: "name",
                            readOnly: constants.CONST_LIST_ACCOUNT_GROUP_DEFAULT.findIndex(item => account_group && item === account_group.groupCode) > -1,
                            checkValid: true,
                            validates: [validate.VALIDATE_ACCOUNT_GROUP_NAME_REQUIRED]
                        },
                        {
                            col: 4,
                            label: "Kích hoạt",
                            name: "isEnable",
                            fieldType: "checkbox",
                            disabled: constants.CONST_LIST_ACCOUNT_GROUP_DEFAULT.findIndex(item => account_group && item === account_group.groupCode) > -1,
                            className: "checkbox-success",
                            wrapperClass: "p-t-20"
                        },
                    ],
                    [ //row 2
                        {
                            type: "custom",
                            // renderCustom: (constants.CONST_LIST_ACCOUNT_GROUP_DEFAULT.indexOf(account_group.groupCode) !== -1) ?
                            //     <React.Fragment key="row-2">
                            //     </React.Fragment> :
                            //     <React.Fragment key="row-2">
                            //         <Divider orientation="left">Danh sách người dùng</Divider>
                            //         <AccountGroupListAccount
                            //             getAllAccountRequest={getAllAccountRequest}
                            //         />
                            //     </React.Fragment>
                            renderCustom: <React.Fragment key="row-2">
                                <Divider orientation="left">Danh sách người dùng</Divider>
                                <AccountGroupListAccount
                                    getAllAccountRequest={getAllAccountRequest}
                                />
                            </React.Fragment>
                        }
                    ]
                ]}
                actions={[
                    {
                        htmlType: constants.FORM_HTML_TYPE_SUBMIT,
                        label: account_group.hasOwnProperty("id") ? constants.FORM_BUTTON_LABEL_UPDATE : constants.FORM_BUTTON_LABEL_CREATE,
                        icon: "fa fa-save",
                        type: constants.CONST_TYPE_BTN_SUBMIT,
                    },
                    {
                        htmlType: constants.FORM_HTML_TYPE_RESET,
                        label: constants.FORM_BUTTON_LABEL_RESET,
                        icon: "fa fa-refresh",
                        type: constants.CONST_TYPE_BTN_CANCEL,
                    }
                ]}
                onSubmit={handleSubmit}
                form={formName.FORM_NAME_ACCOUNT_GROUP}
                initialValues={account_group}
            />
        </React.Fragment >
    );
}

export default AccountGroupForm;