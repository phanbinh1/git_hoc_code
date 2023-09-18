import React, { } from 'react';
import { CommonForm } from "./../../common";
import * as constants from "./../../../constants/constants";
import * as formName from "./../../../constants/form_name";

const AccountGroupSearch = ({
    getAllRequest,
    handleStartLoadData,
    handleChangeDataSearch,
    dataSort,
    handleEndLoadData,
    onSelectRow
}) => {
    const handleSubmit = (values) => {
        handleStartLoadData();
        var data = {};
        if (values.nameSearch && values.nameSearch.trim() !== "") {
            data.nameSearch = values.nameSearch;
        }
        handleChangeDataSearch(data);
        data = { ...data, ...dataSort, currentPage: 1 };
        getAllRequest({
            data,
            requestSuccess: () => {
                handleEndLoadData();
                onSelectRow();
            },
            requestError: handleEndLoadData
        });
    }
    return (
        <React.Fragment>
            <CommonForm
                data={[
                    [ //row 1
                        {
                            col: 12,
                            label: "Tên nhóm người dùng",
                            placeholder: "Tên nhóm người dùng",
                            name: "nameSearch"
                        }
                    ]
                ]}
                actions={[
                    {
                        htmlType: constants.FORM_HTML_TYPE_SUBMIT,
                        label: "Tìm kiếm",
                        icon: "fa fa-search",
                        type: constants.CONST_TYPE_BTN_SUBMIT,
                    },
                ]}
                onSubmit={handleSubmit}
                form={formName.FORM_NAME_ACCOUNT_GROUP_SEARCH}
            />
        </React.Fragment >
    );
}

export default AccountGroupSearch;