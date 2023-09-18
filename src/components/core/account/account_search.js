import React, { } from 'react';
import { useSelector } from 'react-redux';
import { getFormValues } from "redux-form";
import { CommonForm } from "./../../common";
import * as constants from "./../../../constants/constants";
import * as formName from "./../../../constants/form_name";
import { API_PHONG_BAN } from '../../../constants/api';

const AccountSearch = ({
    getAllRequest,
    handleStartLoadData,
    handleChangeDataSearch,
    dataSort,
    handleEndLoadData,
    onSelectRow
}) => {

    const formValue = useSelector(state => getFormValues(formName.FORM_NAME_ACCOUNT_SEARCH)(state));

    const handleSubmit = (values) => {
        handleStartLoadData();
        let data = {};
        if (values.nameSearch && values.nameSearch.trim() !== "") {
            data.nameSearch = values.nameSearch.trim();
        }
        if (values.fullNameSearch && values.fullNameSearch.trim() !== "") {
            data.fullNameSearch = values.fullNameSearch.trim();
        }
        if (values.emailSearch && values.emailSearch.trim() !== "") {
            data.emailSearch = values.emailSearch.trim();
        }
        if (values.department) {
            data.department = values.department.trim();
        }
        if (values.regency) {
            data.regency = values.regency.trim();
        }
        handleChangeDataSearch(data);
        data = { ...data, ...dataSort, currentPage: 1 };
        getAllRequest({
            data,
            requestSuccess: () => {
                handleEndLoadData();
                onSelectRow([]);
            },
            requestError: handleEndLoadData

        });
    };

    return (
        <React.Fragment>
            <CommonForm
                data={[
                    [//row 1
                        {
                            col: 12,
                            label: "Tên đăng nhập",
                            placeholder: "Tên đăng nhập",
                            name: "nameSearch"
                        },
                        {
                            col: 12,
                            label: "Họ và tên",
                            placeholder: "Họ và tên",
                            name: "fullNameSearch",
                        },
                        {
                            col: 12,
                            label: "Email",
                            placeholder: "Email",
                            name: "emailSearch"
                        },
                        {
                            col: 12,
                            label: "Phòng ban",
                            placeholder: "Phòng ban",
                            name: "department",
                            fieldType: "selectLoadMore",
                            url: API_PHONG_BAN,
                            searchKey: "searchData",
                            searchKeyExtend: "ten",
                            valueKey: "ma",
                            labelKey: "ten",
                        },
                        {
                            col: 12,
                            label: "Chức vụ",
                            placeholder: "Chức vụ",
                            name: "regency",
                            fieldType: "select",
                            options: constants.CONST_CHUC_VU[formValue && formValue.department ? `options${formValue.department}` : `options`]
                        },
                    ],
                ]}
                actions={[
                    {
                        htmlType: constants.FORM_HTML_TYPE_SUBMIT,
                        label: "Tìm kiếm",
                        icon: "fa fa-search"
                    }
                ]}
                onSubmit={handleSubmit}
                form={formName.FORM_NAME_ACCOUNT_SEARCH}
            />
        </React.Fragment >
    );
}

export default AccountSearch;