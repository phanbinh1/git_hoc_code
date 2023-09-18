import React, { } from 'react';
import { CommonForm } from "./../../../common";
import * as constants from "./../../../../constants/constants";
import * as main from "./../../../../constants/main";
import * as formName from "./../../../../constants/form_name";
import * as apiUrl from "./../../../../constants/api";

const LoaiTaiChinhSearch = ({
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
        if (values.tenSuKien && values.tenSuKien.trim() !== "") {
            data.tenSuKien = values.tenSuKien;
        }
        if (values.tenLoai) {
            data.tenLoai = values.tenLoai;
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
                            fieldType: "selectLoadMore",
                            url: apiUrl.API_LOAI_SU_KIEN,
                            searchKey: "searchData",
                            searchKeyExtend: "tenLoai",
                            valueKey: "tenLoai",
                            labelKey: "tenLoai",
                            label: "Loại sự kiện",
                            placeholder: "Loại sự kiện",
                            name: "tenLoai",
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
                form={formName.FORM_NAME_LOAI_TAI_CHINH_SEARCH}
            />
        </React.Fragment >
    );
}

export default LoaiTaiChinhSearch;