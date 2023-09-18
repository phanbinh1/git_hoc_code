import React, { } from 'react';
import { CommonForm } from "../../../common";
import * as constants from "../../../../constants/constants";
import * as main from "../../../../constants/main";
import * as formName from "../../../../constants/form_name";

const DotKiemTraSearch = ({
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
        if (values.maKeHoach && values.maKeHoach.trim() !== "") {
            data.maKeHoach = values.maKeHoach;
        }
        if (values.tenKeHoach && values.tenKeHoach.trim() !== "") {
            data.tenKeHoach = values.tenKeHoach;
        }
        if (values.maNguyCo && values.maNguyCo.trim() !== "") {
            data.maNguyCo = values.maNguyCo;
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
                            label: "Mã đợt kiểm tra",
                            placeholder: "Mã đợt kiểm tra",
                            name: "maDotKiemTra",
                        },
                    ],
                    [ // row 2
                        {
                            col: 12,
                            label: "Tên đợt kiểm tra",
                            placeholder: "Tên đợt kiểm tra",
                            name: "tenDotKiemTra"
                        },
                    ],
                    [//row 3
                        {
                            col: 12,
                            label: "Địa điểm",
                            placeholder: "Mã nguy cơ",
                            name: "diaDiem",
                        },
                    ],
                    [//row 3
                        {
                            col: 12,
                            label: "Thành phần thực hiện",
                            placeholder: "Mã nguy cơ",
                            name: "thanhPhanThucHien",
                        },
                    ],
                    [//row 3
                        {
                            col: 12,
                            label: "Trạng thái",
                            placeholder: "Mã nguy cơ",
                            name: "trangThai",
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
                form={formName.FORM_NAME_QLCTGSON_DOT_KIEM_TRA_SEARCH}
            />
        </React.Fragment >
    );
}

export default DotKiemTraSearch;