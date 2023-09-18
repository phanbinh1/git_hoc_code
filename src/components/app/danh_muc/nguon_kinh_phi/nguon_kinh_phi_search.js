import React, { } from 'react';
import { CommonForm } from "./../../../common";
import * as constants from "./../../../../constants/constants";
import * as main from "./../../../../constants/main";
import * as formName from "./../../../../constants/form_name";

const NguonKinhPhiSearch = ({
    getAllRequest,
    handleStartLoadData,
    handleChangeDataSearch,
    dataSort,
    handleEndLoadData,
    onSelectRow,
}) => {
    const handleSubmit = (values) => {
        handleStartLoadData();
        let data = {};
        if (values.ma && values.ma.trim() !== "") {
            data.ma = values.ma;
        }
        if (values.ten && values.ten.trim() !== "") {
            data.ten = values.ten;
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
                    [ // row 3
                        {
                            col: 12,
                            label: "Mã nguồn kinh phí",
                            placeholder: "Mã nguồn kinh phí",
                            name: "ma",
                        },
                    ],
                    [ // row 3
                        {
                            col: 12,
                            label: "Tên nguồn kinh phí",
                            placeholder: "Tên nguồn kinh phí",
                            name: "ten",
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
                form={formName.FORM_NAME_NGUON_KINH_PHI_SEARCH}
            />
        </React.Fragment >
    );
}

export default NguonKinhPhiSearch;