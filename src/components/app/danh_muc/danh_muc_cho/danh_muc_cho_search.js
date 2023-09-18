import React, { } from 'react';
import { CommonAddress, CommonForm } from "./../../../common";
import * as constants from "./../../../../constants/constants";
import * as main from "./../../../../constants/main";
import * as formName from "./../../../../constants/form_name";
import * as apiUrl from "./../../../../constants/api";
import { useLocation } from 'react-router';

const DanhMucChoSearch = ({
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
        if (values.ten_cho && values.ten_cho.trim() !== "") {
            data.ten = values.ten_cho;
        }
        if (values.ma_tinh_thanh) {
            data.maTinh = values.ma_tinh_thanh;
        }
        if (values.ma_quan_huyen) {
            data.maQuan = values.ma_quan_huyen;
        }
        if (values.ma_xa_phuong) {
            data.maPhuong = values.ma_xa_phuong;
        }
        if (values.dia_chi && values.dia_chi.trim() !== "") {
            data.diaChi = values.dia_chi;
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
                            label: "Tên chợ",
                            placeholder: "Tên chợ",
                            name: "ten_cho",
                        },
                    ],
                    [
                        {
                            type: "custom",
                            renderCustom: <React.Fragment key="address">
                                <CommonAddress
                                    mode="block"
                                    form={formName.FORM_NAME_LOAI_TAI_CHINH_SEARCH}
                                    tinhThanh={{ name: "ma_tinh_thanh", validate: false }}
                                    quanHuyen={{ name: "ma_quan_huyen", validate: false }}
                                    xaPhuong={{ name: "ma_xa_phuong", validate: false }}
                                    diaChi={{ name: "dia_chi", validate: false }}
                                />
                            </React.Fragment>
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
                form={formName.FORM_NAME_LOAI_TAI_CHINH_SEARCH}
            />
        </React.Fragment >
    );
}

export default DanhMucChoSearch;