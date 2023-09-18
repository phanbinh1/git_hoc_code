import AbortController from "abort-controller";
import React, { useEffect, Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { change } from "redux-form";
import { CommonForm, CommonAddress } from "./../../../common";
import * as constants from "./../../../../constants/constants";
import * as main from "./../../../../constants/main";
import * as formName from "./../../../../constants/form_name";
import * as apiUrl from "./../../../../constants/api";
import * as actLoaiHinhCoSo from "./../../../../actions/app/danh_muc/loai_hinh_co_so/loai_hinh_co_so";
import { useHistory, useLocation } from "react-router";
import { dateTimeFormat } from '../../../../constants/controll';
import * as actHistoryDownload from "./../../../../actions/core/history_download";
import moment from "moment";
import * as actID from "./../../../../constants/action_id";
import { queryString } from "./../../../../constants/main";
import { CONST_TRANG_THAI_HOAT_DONG, CONST_TINH_TRANG_GIAY_CHUNG_NHAN, CONST_PHE_DUYET } from "./../../../../constants/constants";

const CoSoSanXuatKinhDoanhSearch = ({ quanHuyenQuanLys }) => {

    const history = useHistory();
    const location = useLocation();
    const qs = main.queryString.parse(location.search);
    const loaiHinhCoSoTree = useSelector(state => state.app.danh_muc.loai_hinh_co_so.tree);
    const account_current = useSelector(state => state.core.account_current);

    const dispatch = useDispatch();
    const getLoaiHinhCoSoTree = obj => dispatch(actLoaiHinhCoSo.getTreeRequest(obj));
    const createHistoryDownload = (value) => dispatch(actHistoryDownload.handleCreate(value));

    useEffect(() => {
        const controller = new AbortController();
        getLoaiHinhCoSoTree({ controller });
        return () => controller.abort();
    }, [])

    const onReset = () => {
        const clearData = fields => fields.map(field => dispatch(change(formName.FORM_NAME_CO_SO_SAN_XUAT_KINH_DOANH_SEARCH, field, null)))
        clearData([
            "sgp_dkkd",
            "scn_attp",
            "ten_co_so",
            "loai_hinh_co_so_id",
            "linh_vuc_id",
            "trang_thai_hoat_dong",
            "tinh_trang_gcn",
            "linh_vuc_id",
            "ma_quan_huyen",
            "ma_xa_phuong",
            "dia_diem_kinh_doanh",
            "isXepHangSao"
        ])
    }

    const onDownloadDanhGiaHangSao = (data) => {
        // var data = { id, loaiQuyetDinh };
        const item = {
            date: moment().format(dateTimeFormat),
            title: "Đánh giá hạng sao",
            url: main.convertObjectToQueryVariable(apiUrl.API_BAOCAOCOSOHANGSAO_EXPORT, data)
        }
        createHistoryDownload({
            username: account_current.name,
            process: item
        })
    };

    const handleSubmit = (values) => {
        if (qs.action === actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_SEARCH) {
            let data = {
                page: 1,
                sgp_dkkd: values.sgp_dkkd ? encodeURIComponent(values.sgp_dkkd) : undefined,
                scn_attp: values.scn_attp ? encodeURIComponent(values.scn_attp) : undefined,
                ten_co_so: values.ten_co_so && values.ten_co_so.trim() !== "" ? encodeURIComponent(values.ten_co_so) : undefined,
                loai_hinh_co_so_id: values.loai_hinh_co_so_id ? values.loai_hinh_co_so_id : undefined,
                linh_vuc_id: values.linh_vuc_id ? values.linh_vuc_id : undefined,
                trang_thai_hoat_dong: values.trang_thai_hoat_dong ? values.trang_thai_hoat_dong : undefined,
                tinh_trang_gcn: values.tinh_trang_gcn ? values.tinh_trang_gcn : undefined,
                ma_quan_huyen: values.ma_quan_huyen ? values.ma_quan_huyen : undefined,
                ma_xa_phuong: values.ma_xa_phuong ? values.ma_xa_phuong : undefined,
                dia_diem_kinh_doanh: values.dia_diem_kinh_doanh && values.dia_diem_kinh_doanh.trim() !== "" ? encodeURIComponent(values.dia_diem_kinh_doanh) : undefined,
                isXepHangSao: values.isXepHangSao ? values.isXepHangSao : false
            }
            history.push({ search: main.queryString.stringify({ ...qs, ...data }) })
        }
        if (qs.action === actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_EXPORT) {
            if (Array.isArray(quanHuyenQuanLys)) {
                const maQuanHuyen = values.ma_quan_huyen;
                const soGiayPhepDkkd = values.sgp_dkkd && decodeURIComponent(values.sgp_dkkd);
                const soChungNhanAttp = values.scn_attp && decodeURIComponent(values.scn_attp);
                const tenCoSo = values.ten_co_so && decodeURIComponent(values.ten_co_so);
                const loaiHinhCoSoId = values.loai_hinh_co_so_id;
                const listMaQuanHuyen = quanHuyenQuanLys.findIndex(item => item.ma === maQuanHuyen) >= 0 ? maQuanHuyen : quanHuyenQuanLys.map(item => item.ma).join(",");
                const maXaPhuong = values.ma_xa_phuong;
                const diaDiemKinhDoanh = values.dia_diem_kinh_doanh && decodeURIComponent(values.dia_diem_kinh_doanh);
                const trangThaiCoSo = values.trang_thai_hoat_dong && CONST_TRANG_THAI_HOAT_DONG.options.findIndex(item => item.num_key === values.trang_thai_hoat_dong) >= 0 ? CONST_TRANG_THAI_HOAT_DONG.options.find(item => item.num_key === values.trang_thai_hoat_dong).value : undefined;
                const trangThaiGcnAttp = values.tinh_trang_gcn && CONST_TINH_TRANG_GIAY_CHUNG_NHAN.options.findIndex(item => item.num_key === values.tinh_trang_gcn) >= 0 ? CONST_TINH_TRANG_GIAY_CHUNG_NHAN.options.find(item => item.num_key === values.tinh_trang_gcn).selectValue : undefined;
                let isXepHangSao = Boolean(values.isXepHangSao)
                let searchData = {
                    soGiayPhepDkkd,
                    soChungNhanAttp,
                    tenCoSo,
                    loaiHinhCoSoId,
                    listMaQuanHuyen,
                    maXaPhuong,
                    diaDiemKinhDoanh,
                    trangThaiCoSo,
                    trangThaiGcnAttp,
                    isXepHangSao
                }
                let dataExport = {
                    searchData: queryString.stringify(searchData)
                }
                onDownloadDanhGiaHangSao(dataExport)
            }
        }
    }

    return <Fragment>
        <CommonForm
            data={[
                [//row 1
                    {
                        col: 12,
                        label: "Số giấy phép ĐKKD",
                        placeholder: "Số giấy phép ĐKKD",
                        name: "sgp_dkkd"
                    },
                ],
                [
                    {
                        col: 12,
                        label: "Số chứng nhận ATTP",
                        placeholder: "Số chứng nhận ATTP",
                        name: "scn_attp"
                    },
                ],
                [//row 3
                    {
                        col: 12,
                        label: "Tên cơ sở",
                        placeholder: "Tên cơ sở",
                        name: "ten_co_so"
                    },
                ],
                [//row 3
                    {
                        col: 12,
                        label: "Loại hình cơ sở",
                        placeholder: "Loại hình cơ sở",
                        name: "loai_hinh_co_so_id",
                        fieldType: "selectTree",
                        options: loaiHinhCoSoTree,
                        valueKey: "id",
                        labelKey: "label"
                    },
                ],
                [
                    {
                        col: 12,
                        label: "Ngành",
                        placeholder: "Ngành",
                        fieldType: "selectLoadMore",
                        url: apiUrl.API_LINH_VUC,
                        valueKey: "id",
                        labelKey: "ten",
                        searchKey: "searchData",
                        searchKeyExtend: "tenLinhVuc",
                        name: "linh_vuc_id",
                    },
                ],
                [
                    {
                        col: 12,
                        fieldType: "select",
                        label: "Trạng thái hoạt động",
                        placeholder: "Trạng thái hoạt động",
                        name: "trang_thai_hoat_dong",
                        options: constants.CONST_TRANG_THAI_HOAT_DONG.options.map(item => ({ ...item, value: item.num_key }))
                    },
                ],
                [
                    {
                        col: 12,
                        fieldType: "select",
                        label: "Trạng thái giấy chứng nhận",
                        placeholder: "Trạng thái giấy chứng nhận",
                        name: "tinh_trang_gcn",
                        options: constants.CONST_TINH_TRANG_GIAY_CHUNG_NHAN.options.map(item => ({ ...item, value: item.num_key }))
                    },
                ],
                [
                    {
                        type: "custom",
                        renderCustom: <React.Fragment key="address">
                            <CommonAddress
                                mode="block"
                                form={formName.FORM_NAME_CO_SO_SAN_XUAT_KINH_DOANH_SEARCH}
                                tinhThanh={{ name: "tinhThanh", validate: false, hidden: true }}
                                quanHuyen={{ name: "ma_quan_huyen", validate: false, optionShows: quanHuyenQuanLys }}
                                xaPhuong={{ name: "ma_xa_phuong", validate: false }}
                                diaChi={{ name: "dia_diem_kinh_doanh", label: "Địa điểm kinh doanh", placeholder: "Địa điểm kinh doanh", validate: false }}
                            />
                        </React.Fragment>
                    }
                ],
                [
                    {
                        col: 12,
                        fieldType: "checkbox",
                        label: "Xếp hạng sao",
                        name: "isXepHangSao",
                    },
                ],
            ]}
            actions={[
                {
                    htmlType: constants.FORM_HTML_TYPE_SUBMIT,
                    label: qs.action === actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_EXPORT ? "Báo cáo" : "Tìm kiếm",
                    icon: qs.action === actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_EXPORT ? "fa fa-download" : "fa fa-search",
                },
                {
                    htmlType: constants.FORM_HTML_TYPE_RESET,
                    hidden: true,

                },
                {
                    htmlType: constants.FORM_HTML_TYPE_BUTTON,
                    label: "Huỷ",
                    icon: "fa fa-times",
                    handleClick: onReset
                }
            ]}
            initialValues={qs.action === actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_EXPORT ? {
                tinhThanh: constants.CONST_DEFAULT_TINHTHANH.ma,
            } : {
                tinhThanh: constants.CONST_DEFAULT_TINHTHANH.ma,
                loai_hinh_co_so_id: qs.loai_hinh_co_so_id && !isNaN(qs.loai_hinh_co_so_id) ? parseInt(qs.loai_hinh_co_so_id, 0) : undefined,
                linh_vuc_id: qs.linh_vuc_id && !isNaN(qs.linh_vuc_id) ? parseInt(qs.linh_vuc_id, 0) : undefined,
                sgp_dkkd: decodeURIComponent(qs.sgp_dkkd || ""),
                scn_attp: decodeURIComponent(qs.scn_attp || ""),
                ten_co_so: decodeURIComponent(qs.ten_co_so || ""),
                trang_thai_hoat_dong: qs.trang_thai_hoat_dong,
                tinh_trang_gcn: qs.tinh_trang_gcn,
                ma_quan_huyen: qs.ma_quan_huyen,
                ma_xa_phuong: qs.ma_xa_phuong,
                dia_diem_kinh_doanh: decodeURIComponent(qs.dia_diem_kinh_doanh || ""),
                isXepHangSao: qs.isXepHangSao === "true" ? true : false
            }}
            onSubmit={handleSubmit}
            form={formName.FORM_NAME_CO_SO_SAN_XUAT_KINH_DOANH_SEARCH}
        />
    </Fragment>
}
export default CoSoSanXuatKinhDoanhSearch;