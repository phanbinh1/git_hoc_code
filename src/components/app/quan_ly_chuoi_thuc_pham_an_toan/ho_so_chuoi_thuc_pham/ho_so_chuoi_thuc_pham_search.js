import React, { } from 'react';
import { CommonForm, CommonAddress } from "./../../../common";
import * as constants from "./../../../../constants/constants";
import * as main from "./../../../../constants/main";
import * as formName from "./../../../../constants/form_name";

const HoSoChuoiThucPhamSearch = ({
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
        if (values.tenCoSo && values.tenCoSo.trim() !== "") {
            data.tenCoSo = values.tenCoSo;
        }
        if (values.maQuanHuyen) {
            data.maQuanHuyen = values.maQuanHuyen;
        }
        if (values.maXaPhuong) {
            data.maXaPhuong = values.maXaPhuong;
        }
        if (values.diaDiemKinhDoanh && values.diaDiemKinhDoanh.trim() !== "") {
            data.diaDiemKinhDoanh = values.diaDiemKinhDoanh;
        }
        if (values.soGiayPhepDkkd && values.soGiayPhepDkkd.trim() !== "") {
            data.soGiayPhepDkkd = values.soGiayPhepDkkd;
        }
        if (values.thoiDiemTiepNhan) {
            if (values.thoiDiemTiepNhan.from) {
                data.tiepNhanTuNgay = values.thoiDiemTiepNhan.from;
            }
            if (values.thoiDiemTiepNhan.to) {
                data.tiepNhanDenNgay = values.thoiDiemTiepNhan.to;
            }
        }
        if (values.trangThaiHoSo) {
            data.trangThaiHoSo = values.trangThaiHoSo;
        }
        if (values.coKeHoachThamDinh) {
            data.coKeHoachThamDinh = values.coKeHoachThamDinh;
        }
        if (values.idKeHoachThamDinh) {
            data.idKeHoachThamDinh = values.idKeHoachThamDinh;
        }
        if (values.ketQuaThamDinh) {
            data.ketQuaThamDinh = values.ketQuaThamDinh;
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
                    [//row
                        {
                            col: 12,
                            label: "Tên cơ sở",
                            placeholder: "Tên cơ sở",
                            name: "tenCoSo"
                        },
                    ],
                    [//row
                        {
                            col: 12,
                            type: "custom",
                            renderCustom: <CommonAddress
                                key="address"
                                form={formName.FORM_NAME_NHOM_CHUOI_THUC_PHAM_SEARCH}
                                tinhThanh={{
                                    name: "tinhThanh",
                                    validate: false,
                                    hidden: true
                                }}
                                quanHuyen={{
                                    name: "maQuanHuyen",
                                    validate: false
                                }}
                                xaPhuong={{
                                    name: "maXaPhuong",
                                    validate: false
                                }}
                                diaChi={{
                                    name: "diaDiemKinhDoanh",
                                    label: "Địa điểm kinh doanh",
                                    placeholder: "Địa điểm kinh doanh",
                                    validate: false,
                                }}
                                mode="block"
                            />
                        }
                    ],
                    [//row
                        {
                            col: 12,
                            label: "Số giấy phép ĐKKD",
                            placeholder: "Số giấy phép ĐKKD",
                            name: "soGiayPhepDkkd"
                        },
                    ],
                    [//row
                        {
                            col: 12,
                            label: "Thời điểm tiếp nhận",
                            name: "thoiDiemTiepNhan",
                            fieldType: "dateRange",
                        },
                    ],
                ]}
                actions={[
                    {
                        htmlType: constants.FORM_HTML_TYPE_SUBMIT,
                        label: "Tìm kiếm",
                        icon: "fa fa-search",
                    }
                ]}
                onSubmit={handleSubmit}
                form={formName.FORM_NAME_NHOM_CHUOI_THUC_PHAM_SEARCH}
                initialValues={{
                    tinhThanh: constants.CONST_DEFAULT_TINHTHANH.ma
                }}
            />
        </React.Fragment>
    );
}
export default HoSoChuoiThucPhamSearch;