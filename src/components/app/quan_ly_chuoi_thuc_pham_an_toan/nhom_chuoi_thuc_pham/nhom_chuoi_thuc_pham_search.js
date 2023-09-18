import React, { } from 'react';
import { CommonForm } from "./../../../common";
import * as constants from "./../../../../constants/constants";
import * as main from "./../../../../constants/main";
import * as formName from "./../../../../constants/form_name";

const NhomChuoiThucPhamSearch = ({
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
        if (values.maNhom && values.maNhom.trim() !== "") {
            data.maNhom = values.maNhom;
        }
        if (values.tenNhom && values.tenNhom.trim() !== "") {
            data.tenNhom = values.tenNhom;
        }
        if (values.sanPham && values.sanPham.trim() !== "") {
            data.sanPham = values.sanPham;
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
                            label: "Mã nhóm chuổi thực phẩm",
                            placeholder: "Mã nhóm chuổi thực phảm",
                            name: "maNhom",
                        },
                    ],
                    [//row 2
                        {
                            col: 12,
                            label: "Tên nhóm chuổi sản phẩm",
                            placeholder: "Tên nhóm chuổi sản phẩm",
                            name: "tenNhom"
                        },
                    ],
                    [//row 3
                        {
                            col: 12,
                            label: "Sản phẩm",
                            placeholder: "Sản phẩm",
                            name: "sanPham"
                        },
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
                form={formName.FORM_NAME_NHOM_CHUOI_THUC_PHAM_SEARCH}
            />
        </React.Fragment >
    );
}
export default NhomChuoiThucPhamSearch;