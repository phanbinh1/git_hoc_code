import React, { } from 'react';
import { CommonForm } from "../../../../common";
import * as constants from "../../../../../constants/constants";
import * as main from "../../../../../constants/main";
import * as formName from "../../../../../constants/form_name";

const ChiTieuSearch = ({
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
        if (values.maChiTieu && values.maChiTieu.trim() !== "") {
            data.maChiTieu = values.maChiTieu;
        }
        if (values.tenChiTieu && values.tenChiTieu.trim() !== "") {
            data.tenChiTieu = values.tenChiTieu;
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
                            label: "Mã chỉ tiêu",
                            placeholder: "Mã chỉ tiêu",
                            name: "maChiTieu",
                        },
                    ],
                    [ // row 2
                        {
                            col: 12,
                            label: "Tên chỉ tiêu",
                            placeholder: "Tên chỉ tiêu",
                            name: "tenChiTieu"
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
                form={formName.FORM_NAME_QLCTGSON_DM_CHI_TIEU_SEARCH}
            />
        </React.Fragment >
    );
}

export default ChiTieuSearch;