import React, { } from 'react';
import { CommonForm } from "./../../../../common";
import * as constants from "./../../../../../constants/constants";
import * as main from "./../../../../../constants/main";
import * as formName from "./../../../../../constants/form_name";

const LoaiThucPhamSearch = ({
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
        if (values.maLoaiThucPham && values.maLoaiThucPham.trim() !== "") {
            data.maLoaiThucPham = values.maLoaiThucPham;
        }
        if (values.tenLoaiThucPham && values.tenLoaiThucPham.trim() !== "") {
            data.tenLoaiThucPham = values.tenLoaiThucPham;
        }
        handleChangeDataSearch(data);
        data = {
            searchString: main.parseObjectToParams(data),
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
                            label: "Mã loại thực phẩm",
                            placeholder: "Mã loại thực phẩm",
                            name: "maLoaiThucPham",
                        },
                    ],
                    [ // row 2
                        {
                            col: 12,
                            label: "Tên loại thực phẩm",
                            placeholder: "Tên loại thực phẩm",
                            name: "tenLoaiThucPham"
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
                form={formName.FORM_NAME_QLCTGSON_DM_NHOM_THUC_PHAM_SEARCH}
            />
        </React.Fragment >
    );
}

export default LoaiThucPhamSearch;