import React, { } from 'react';
import { CommonForm } from "./../../../common";
import * as constants from "./../../../../constants/constants";
import * as main from "./../../../../constants/main";
import * as formName from "./../../../../constants/form_name";

const LinhVucSearch = ({
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
        if (values.maLinhVuc && values.maLinhVuc.trim() !== "") {
            data.maLinhVuc = values.maLinhVuc;
        }
        if (values.tenLinhVuc && values.tenLinhVuc.trim() !== "") {
            data.tenLinhVuc = values.tenLinhVuc;
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
                            label: "Mã lĩnh vực",
                            placeholder: "Mã lĩnh vực",
                            name: "maLinhVuc",
                        },
                    ],
                    [ // row 2
                        {
                            col: 12,
                            label: "Tên lĩnh vực",
                            placeholder: "Tên lĩnh vực",
                            name: "tenLinhVuc"
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
                form={formName.FORM_NAME_LINH_VUC_SEARCH}
            />
        </React.Fragment >
    );
}

export default LinhVucSearch;