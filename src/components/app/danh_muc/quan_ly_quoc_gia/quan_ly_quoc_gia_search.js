import React, { } from 'react';
import { CommonForm } from "./../../../common";
import * as constants from "./../../../../constants/constants";
import * as main from "./../../../../constants/main";
import * as formName from "./../../../../constants/form_name";

const QuocGiaSearch = ({
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
        if (values.maQuocGia && values.maQuocGia.trim() !== "") {
            data.maQuocGia = values.maQuocGia;
        }
        if (values.tenQuocGia && values.tenQuocGia.trim() !== "") {
            data.tenQuocGia = values.tenQuocGia;
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
                            label: "Mã quốc gia",
                            placeholder: "Mã quốc gia",
                            name: "maQuocGia",
                        },
                    ],
                    [ // row 2
                        {
                            col: 12,
                            label: "Tên quốc gia",
                            placeholder: "Tên quốc gia",
                            name: "tenQuocGia"
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
                form={formName.FORM_NAME_QUAN_LY_QUOC_GIA_SEARCH}
            />
        </React.Fragment >
    );
}

export default QuocGiaSearch;