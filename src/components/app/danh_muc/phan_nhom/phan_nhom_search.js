import React, { } from 'react';
import { CommonForm } from "./../../../common";
import * as constants from "./../../../../constants/constants";
import * as main from "./../../../../constants/main";
import * as formName from "./../../../../constants/form_name";

const PhanNhomSearch = ({
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
        if (values.tenPhanNhom && values.tenPhanNhom.trim() !== "") {
            data.tenPhanNhom = values.tenPhanNhom;
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
                            label: "Mã phân nhóm",
                            placeholder: "Mã phân nhóm",
                            name: "ma",
                        },
                    ],
                    [ // row 2
                        {
                            col: 12,
                            label: "Tên phân nhóm",
                            placeholder: "Tên phân nhóm",
                            name: "tenPhanNhom"
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
                form={formName.FORM_NAME_TCB_PHAN_NHOM_SEARCH}
            />
        </React.Fragment >
    );
}

export default PhanNhomSearch;