import React, { } from 'react';
import { CommonForm } from "./../../../common";
import * as constants from "./../../../../constants/constants";
import * as main from "./../../../../constants/main";
import * as formName from "./../../../../constants/form_name";

const NhomSearch = ({
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
        if (values.ma && values.ma.trim() !== "") {
            data.ma = values.ma;
        }
        if (values.tenNhom && values.tenNhom.trim() !== "") {
            data.tenNhom = values.tenNhom;
        }
        handleChangeDataSearch(data);
        data = {
            searchData: main.parseObjectToParams(data),
            sortData: main.parseStringDataSort(dataSort),
            currentPage: 1
        };
        getAllRequest({
            data,
            requestSuccess: () => {
                handleEndLoadData();
                onSelectRow();
            },
            requestError: handleEndLoadData
        });
    };

    return (
        <React.Fragment >
            <CommonForm
                data={[
                    [//row 1
                        {
                            col: 12,
                            label: "Mã nhóm",
                            placeholder: "Mã nhóm",
                            name: "ma",
                        },
                    ],
                    [ // row 2
                        {
                            col: 12,
                            label: "Tên nhóm",
                            placeholder: "Tên nhóm",
                            name: "tenNhom"
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
                form={formName.FORM_NAME_TCB_NHOM_SEARCH}
            />
        </React.Fragment >
    );
}

export default NhomSearch;