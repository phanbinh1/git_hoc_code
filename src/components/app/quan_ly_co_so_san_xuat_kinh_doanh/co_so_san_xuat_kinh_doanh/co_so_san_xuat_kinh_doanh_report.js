import AbortController from "abort-controller";
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CommonForm } from "./../../../common";
import moment from 'moment';
import * as constants from "./../../../../constants/constants";
import * as formName from "./../../../../constants/form_name";
import * as actHistoryDownload from "./../../../../actions/core/history_download";
import * as actLoaiHinhCoSo from "./../../../../actions/app/danh_muc/loai_hinh_co_so/loai_hinh_co_so";
import * as actCSSX from "./../../../../actions/app/quan_ly_co_so_san_xuat_kinh_doanh/co_so_san_xuat_kinh_doanh/co_so_san_xuat_kinh_doanh";
import * as apiUrl from "./../../../../constants/api";
import * as main from "./../../../../constants/main";
import { dateFormat } from "./../../../../constants/controll";

const CoSoSanXuatKinhDoanhReport = ({
    handleStartLoadData,
    handleEndLoadData,
    onSelectRow
}) => {

    const account_current = useSelector(state => state.core.account_current);
    const loaiHinhCoSoTree = useSelector(state => state.app.danh_muc.loai_hinh_co_so.tree);

    const dispatch = useDispatch();
    const createHistoryDownload = (value) => dispatch(actHistoryDownload.handleCreate(value));
    const getLoaiHinhCoSoTree = obj => dispatch(actLoaiHinhCoSo.getTreeRequest(obj));
    const reportRequest = obj => dispatch(actCSSX.reportRequest(obj));

    useEffect(() => {
        const controller = new AbortController();
        getLoaiHinhCoSoTree({ controller });
        return () => {
            controller.abort();
        }
    }, [])

    const handleSubmit = (values) => {
        handleStartLoadData();
        var data = {};
        if (values.ngayCapGCN) {
            if (values.ngayCapGCN.from) {
                data.capGcnAttpTuNgay = values.ngayCapGCN.from;
            }
            if (values.ngayCapGCN.to) {
                data.capGcnAttpDenNgay = values.ngayCapGCN.to;
            }
        }
        if (values.trangThaiGcnAttp) {
            data.trangThaiGcnAttp = values.trangThaiGcnAttp;
        }
        if (values.idLinhVuc) {
            data.idLinhVuc = values.idLinhVuc;
        }
        if (values.idLoaiHinhCoSo) {
            data.idLoaiHinhCoSo = values.idLoaiHinhCoSo;
        }
        reportRequest({
            data: {
                searchData: main.convertObjectToQueryVariableSearch(data),
                currentPage: 1
            },
            requestSuccess: () => {
                handleEndLoadData();
                onSelectRow();
            },
            requestError: handleEndLoadData
        })
    };

    const onDownload = (values) => {
        var data = {};
        if (values.ngayCapGCN) {
            if (values.ngayCapGCN.from) {
                data.capGcnAttpTuNgay = values.ngayCapGCN.from;
            }
            if (values.ngayCapGCN.to) {
                data.capGcnAttpDenNgay = values.ngayCapGCN.to;
            }
        }
        if (values.trangThaiGcnAttp) {
            data.trangThaiGcnAttp = values.trangThaiGcnAttp;
        }
        if (values.idLinhVuc) {
            data.idLinhVuc = values.idLinhVuc;
        }
        if (values.idLoaiHinhCoSo) {
            data.idLoaiHinhCoSo = values.idLoaiHinhCoSo;
        }
        const item = {
            date: moment(new Date().toISOString()).format(`${dateFormat} hh:mm:ss`),
            title: "Thống kê cơ sở sản xuất kinh doanh",
            url: main.convertObjectToQueryVariable(apiUrl.API_CO_SO_SAN_XUAT_KINH_DOANH_EXPORT, data)
        }
        createHistoryDownload({
            username: account_current.name,
            process: item
        })
    }

    return (
        <React.Fragment>
            <CommonForm
                data={[
                    [//row 1
                        {
                            col: 12,
                            label: "Ngày cấp giấy chứng nhận",
                            name: "ngayCapGCN",
                            fieldType: "dateRange",
                        },
                    ],
                    [//row 3
                        {
                            col: 12,
                            label: "Trạng thái hồ sơ",
                            placeholder: "Trạng thái hồ sơ",
                            name: "trangThaiGcnAttp",
                            fieldType: "select",
                            options: constants.CONST_TRANG_THAI_GCN_ATTP_OPTIONS
                        },
                    ],
                    [//row 3
                        {
                            col: 12,
                            label: "Loại hình cơ sở",
                            placeholder: "Loại hình cơ sở",
                            name: "idLoaiHinhCoSo",
                            fieldType: "selectTree",
                            options: loaiHinhCoSoTree,
                            valueKey: "id",
                            labelKey: "label"
                        },
                    ],
                    [//row 3
                        {
                            col: 12,
                            label: "Lĩnh vực",
                            placeholder: "Lĩnh vực",
                            fieldType: "selectLoadMore",
                            url: apiUrl.API_LINH_VUC,
                            valueKey: "id",
                            labelKey: "ten",
                            searchKey: "searchData",
                            searchKeyExtend: "tenLinhVuc",
                            name: "idLinhVuc",
                        }
                    ],
                ]}
                actions={[
                    {
                        htmlType: constants.FORM_HTML_TYPE_BUTTON,
                        label: "Tải xuống",
                        icon: "fa fa-download",
                        isSubmit: true,
                        type: "success",
                        handleClick: onDownload
                    },
                    {
                        htmlType: constants.FORM_HTML_TYPE_SUBMIT,
                        label: "Thống kê",
                        icon: "fa fa-search",
                    }
                ]}
                onSubmit={handleSubmit}
                form={formName.FORM_NAME_CO_SO_SAN_XUAT_KINH_DOANH_REPORT}
            />
        </React.Fragment >
    );
}

export default CoSoSanXuatKinhDoanhReport;