import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CommonForm } from "../../../common";
import moment from 'moment';
import * as actHistoryDownload from "../../../../actions/core/history_download";
import * as constants from "../../../../constants/constants";
import * as main from "../../../../constants/main";
import * as apiUrl from "../../../../constants/api";
import * as formName from "../../../../constants/form_name";
import * as actDiaBan from "./../../../../actions/app/danh_muc/dia_ban/dia_ban";
import * as actNhomChuoi from "./../../../../actions/app/quan_ly_chuoi_thuc_pham_an_toan/nhom_chuoi_thuc_pham/nhom_chuoi_thuc_tham";
import { dateFormat } from "./../../../../constants/controll";

const ThongKeBaoCaoSearch = ({
    getAllRequest,
    handleStartLoadData,
    handleChangeDataSearch,
    handleEndLoadData,
    onSelectRow
}) => {
    const [tinhThanhDefault] = useState(constants.CONST_DEFAULT_TINHTHANH);
    const [dsQuanHuyen, setDsQuanHuyen] = useState([]);
    const [dsNhomChuoi, setDsNhomChuoi] = useState([]);
    const account_current = useSelector(state => state.core.account_current);
    const dispatch = useDispatch();
    const createHistoryDownload = (value) => dispatch(actHistoryDownload.handleCreate(value));
    const getDsNhomChuoi = (object = {}) => dispatch(actNhomChuoi.getAllRequest(object));
    const getDiaBan = (object) => dispatch(actDiaBan.getAllRequest(object))

    useEffect(() => {
        getDsNhomChuoi({
            data: {},
            requestSuccess: (res) => {
                setDsNhomChuoi(res.result);
            }
        });
        getDiaBan({
            data: { parentCode: tinhThanhDefault.ma },
            requestSuccess: (res) => {
                setDsQuanHuyen(res.result);
            }
        });
    }, [])


    const onSubmit = (values) => {
        handleStartLoadData();
        var data = {};

        if (values.ngayCap) {
            if (values.ngayCap.from) {
                data.tuNgayCap = values.ngayCap.from;
            }
            if (values.ngayCap.to) {
                data.denNgayCap = values.ngayCap.to;
            }
        }

        if (values.ngayTiepNhan) {
            if (values.ngayTiepNhan.from) {
                data.tuNgayTiepNhan = values.ngayTiepNhan.from;
            }
            if (values.ngayTiepNhan.to) {
                data.denNgayTiepNhan = values.ngayTiepNhan.to;
            }
        }
        if (values.idNhomChuoiThucPham) {
            data.idNhomChuoiThucPham = values.idNhomChuoiThucPham;
        }
        if (values.maQuanHuyen) {
            data.maQuanHuyen = values.maQuanHuyen;
        }
        if (values.ketQuaThamDinh) {
            data.ketQuaThamDinh = values.ketQuaThamDinh;
        }
        handleChangeDataSearch(data);
        getAllRequest({
            data,
            requestSuccess: () => {
                handleEndLoadData();
                onSelectRow();
            },
            requestError: handleEndLoadData
        });
    };

    const onDownload = (values) => {
        var data = {};

        if (values.ngayCap) {
            if (values.ngayCap.from) {
                data.tuNgayCap = values.ngayCap.from;
            }
            if (values.ngayCap.to) {
                data.denNgayCap = values.ngayCap.to;
            }
        }

        if (values.ngayTiepNhan) {
            if (values.ngayTiepNhan.from) {
                data.tuNgayTiepNhan = values.ngayTiepNhan.from;
            }
            if (values.ngayTiepNhan.to) {
                data.denNgayTiepNhan = values.ngayTiepNhan.to;
            }
        }
        if (values.idNhomChuoiThucPham) {
            data.idNhomChuoiThucPham = values.idNhomChuoiThucPham;
        }
        if (values.maQuanHuyen) {
            data.maQuanHuyen = values.maQuanHuyen;
        }
        if (values.ketQuaThamDinh) {
            data.ketQuaThamDinh = values.ketQuaThamDinh;
        }
        const item = {
            date: moment(new Date().toISOString()).format(`${dateFormat} hh:mm:ss`),
            title: "Thống kê hồ sơ chuỗi thực phẫm",
            url: main.convertObjectToQueryVariable(apiUrl.API_CHUOI_THUCPHAM_ANTOAN_REPORT_EXPORT_EXCEL, data)
        }
        createHistoryDownload({
            username: account_current.name,
            process: item
        })
    };
    return (
        <React.Fragment>
            <CommonForm
                data={[
                    [//row
                        {
                            col: 6,
                            fieldType: "dateRange",
                            label: "Ngày cấp giấy xác nhận",
                            placeholder: "Ngày cấp",
                            name: "ngayCap"
                        },
                        {
                            col: 6,
                            fieldType: "dateRange",
                            label: "Ngày tiếp nhận",
                            placeholder: "Ngày tiếp nhận",
                            name: "ngayTiepNhan",
                        },
                    ],
                    [
                        {
                            col: 4,
                            label: "Chuỗi thực phẩm",
                            placeholder: "Chuỗi thực phẩm",
                            valueKey: "id",
                            labelKey: "tenNhom",
                            fieldType: "select",
                            name: "idNhomChuoiThucPham",
                            options: dsNhomChuoi,
                        },
                        {
                            col: 4,
                            label: "Quận/ Huyện",
                            placeholder: "Quận/Huyện",
                            valueKey: "ma",
                            labelKey: "ten",
                            name: "maQuanHuyen",
                            fieldType: "select",
                            options: dsQuanHuyen,
                        },
                        {
                            col: 4,
                            label: "Kết quả thẩm định",
                            placeholder: "Kết quả thẩm định",
                            valueKey: "value",
                            labelKey: "label",
                            name: "ketQuaThamDinh",
                            fieldType: "select",
                            options: constants.CONST_CHUOI_THUC_PHAM_AN_TOAN_KET_QUA_THAM_DINH_OPTIONS,
                        },
                    ]
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
                        icon: "fa fa-search"
                    }
                ]}
                onSubmit={onSubmit}
                form={formName.FORM_NAME_THONGKE_BAOCAO_CHUOI_THUCPHAM_SEARCH}
            />
        </React.Fragment >
    );
}

export default ThongKeBaoCaoSearch;