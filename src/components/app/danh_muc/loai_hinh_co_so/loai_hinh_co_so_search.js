import React, { } from 'react';
import { CommonForm } from "./../../../common";
import * as constants from "./../../../../constants/constants";
import * as main from "./../../../../constants/main";
import * as formName from "./../../../../constants/form_name";

const LoaiHinhCoSoSearch = ({
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
        if (values.maLoaiHinhCoSo && values.maLoaiHinhCoSo.trim() !== "") {
            data.maLoaiHinhCoSo = values.maLoaiHinhCoSo;
        }
        if (values.tenLoaiHinhCoSo && values.tenLoaiHinhCoSo.trim() !== "") {
            data.tenLoaiHinhCoSo = values.tenLoaiHinhCoSo;
        }
        if (values.linhVuc && values.linhVuc.id) {
            data.linhVucId = values.linhVuc.id;
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
        <React.Fragment>
            <CommonForm
                data={[
                    [//row 1
                        {
                            col: 12,
                            label: "Mã loại hình cơ sở",
                            placeholder: "Mã loại hình cơ sở",
                            name: "maLoaiHinhCoSo",
                        },
                        {
                            col: 12,
                            label: "Tên loại cơ sở",
                            placeholder: "Tên loại hình cơ sở",
                            name: "tenLoaiHinhCoSo"
                        }
                    ]
                ]}
                actions={[
                    {
                        htmlType: constants.FORM_HTML_TYPE_SUBMIT,
                        label: "Tìm kiếm",
                        icon: "fa fa-search"
                    }
                ]}
                onSubmit={handleSubmit}
                form={formName.FORM_NAME_LOAI_HINH_CO_SO_SEARCH}
            />
        </React.Fragment >
    );
}
export default LoaiHinhCoSoSearch;