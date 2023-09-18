import React, { } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { CommonForm, CommonAddress } from "../../common";
import moment from 'moment';
import * as actHistoryDownload from "../../../actions/core/history_download";
import * as constants from "../../../constants/constants";
import * as main from "../../../constants/main";
import * as apiUrl from "../../../constants/api";
import * as formName from "../../../constants/form_name";
import * as validate from "../../../constants/validate"
import { dateFormat } from "./../../../constants/controll";

const ThongKeBaoCaoSearch = ({
    getAllRequest,
    handleStartLoadData,
    handleChangeDataSearch,
    handleEndLoadData,
}) => {
    const account_current = useSelector(state => state.core.account_current);
    const dispatch = useDispatch();
    const createHistoryDownload = (value) => dispatch(actHistoryDownload.handleCreate(value));
    const getFormValue = (fieldName) => {
        return useSelector(state => formValueSelector(formName.FORM_NAME_TCBSP_BAO_CAO_THONG_KE_SEARCH)(state, fieldName));
    }

    const formValueConvert = values => {
        var data = {};
        if (values.trangThaiHauKiem === 0 || values.trangThaiHauKiem === 1) {
            data.trangThaiHauKiem = values.trangThaiHauKiem === 1 ? true : false;
        }
        if (values.tuNgayTiepNhan) {
            data.tuNgayTiepNhan = values.tuNgayTiepNhan;
        }
        if (values.denNgayTiepNhan) {
            data.denNgayTiepNhan = values.denNgayTiepNhan;
        }
        if (values.ketQuaHauKiem) {
            data.ketQuaHauKiem = values.ketQuaHauKiem;
        }
        if (values.maQuanHuyen) {
            data.maQuanHuyen = values.maQuanHuyen;
        }
        if (values.maXaPhuong) {
            data.maXaPhuong = values.maXaPhuong;
        }
        if (values.loaiCongBo) {
            data.loaiCongBo = values.loaiCongBo;
        }
        if (values.nguonGoc) {
            data.nguonGoc = values.nguonGoc;
        }
        if (values.nhomId) {
            data.nhomId = values.nhomId;
        }
        if (values.phanNhomId) {
            data.phanNhomId = values.phanNhomId;
        }
        if (values.trangThaiPheDuyet) {
            data.trangThaiPheDuyet = values.trangThaiPheDuyet;
        }
        if (values.trangThaiHoSo) {
            data.trangThaiHoSo = values.trangThaiHoSo;
        }
        return data;
    }

    const handleSubmit = (values) => {
        handleStartLoadData();
        let data = formValueConvert(values);
        handleChangeDataSearch(data);
        getAllRequest({
            data,
            requestSuccess: () => {
                handleEndLoadData();
                const contentElm = document.getElementById("wrapper-content");
                contentElm && contentElm.scrollTo({ top: 2000 });
            },
            requestError: handleEndLoadData
        });
    };

    const onDownload = (values) => {
        let data = formValueConvert(values)
        const item = {
            date: moment(new Date().toISOString()).format(`${dateFormat} hh:mm:ss`),
            title: "Thống kê tự công bố sản phẩm",
            url: main.convertObjectToQueryVariable(apiUrl.API_HO_SO_TU_CONG_BO_THONGKE_DOWNLOAD, data)
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
                            col: 3,
                            fieldType: "date",
                            label: "Ngày tiếp nhận",
                            placeholder: "Từ ngày",
                            name: "tuNgayTiepNhan",
                            maxDate: getFormValue("denNgayTiepNhan"),
                            checkValid: true,
                            validates: [validate.VALIDATE_TU_NGAY_REQUIRED]
                        },
                        {
                            col: 3,
                            fieldType: "date",
                            label: "  ",
                            placeholder: "Đến ngày",
                            name: "denNgayTiepNhan",
                            minDate: getFormValue("tuNgayTiepNhan"),
                            checkValid: false,
                        },
                        {
                            col: 3,
                            fieldType: "select",
                            name: "loaiCongBo",
                            label: "Loại hồ sơ",
                            placeholder: "Loại hồ sơ",
                            allowClear: false,
                            options: constants.CONST_LOAI_CONG_BO_SAN_PHAM.options
                        },
                        {
                            col: 3,
                            fieldType: "select",
                            label: "NK",
                            placeholder: "NK",
                            name: "nguonGoc",
                            options: constants.CONST_NGUOC_GOC_SAN_PHAM.options
                        },
                    ],
                    [//row
                        {
                            col: 3,
                            fieldType: "selectLoadMore",
                            label: "Nhóm",
                            placeholder: "Nhóm",
                            name: "nhomId",
                            url: apiUrl.API_TCB_NHOM,
                            valueKey: "id",
                            labelKey: "tenNhom",
                            searchKey: "searchData",
                            searchKeyExtend: "tenNhom"
                        },
                        {
                            col: 3,
                            fieldType: "selectLoadMore",
                            label: "Phân nhóm",
                            placeholder: "Phân nhóm",
                            name: "phanNhomId",
                            url: apiUrl.API_TCB_NHOM_PHAN_NHOM,
                            valueKey: "id",
                            labelKey: "tenPhanNhom",
                            searchKey: "searchData",
                            searchKeyExtend: "tenPhanNhom"
                        },
                        {
                            col: 3,
                            fieldType: "select",
                            label: "Trạng thái hồ sơ",
                            placeholder: "Trạng thái hồ sơ",
                            name: "trangThaiHoSo",
                            options: constants.CONST_TRANG_THAI_HO_SO.tuCongBoOptions
                        },
                        {
                            col: 3,
                            fieldType: "select",
                            label: "Trạng thái xử lý",
                            placeholder: "Trạng thái xử lý",
                            name: "trangThaiXuLy",
                            options: constants.CONST_HSTCB_TRANG_THAI_XU_LY.options
                        },
                    ],
                    [
                        {
                            col: 4,
                            type: "custom",
                            renderCustom: <React.Fragment key="address">
                                <CommonAddress
                                    form={formName.FORM_NAME_TCBSP_BAO_CAO_THONG_KE_SEARCH}
                                    tinhThanh={{ name: "tinhThanh", hidden: true }}
                                    quanHuyen={{ name: "maQuanHuyen", validate: false }}
                                    xaPhuong={{ name: "maXaPhuong", validate: false }}
                                />
                            </React.Fragment>
                        }
                    ],
                ]}
                actions={[
                    {
                        htmlType: constants.FORM_HTML_TYPE_BUTTON,
                        type: "success",
                        label: "Tải xuống",
                        icon: "fa fa-download",
                        isSubmit: true,
                        handleClick: onDownload
                    },
                    {
                        htmlType: constants.FORM_HTML_TYPE_SUBMIT,
                        label: "Thống kê",
                        icon: "fa fa-search"
                    }
                ]}
                onSubmit={handleSubmit}
                initialValues={{ loaiCongBo: constants.CONST_LOAI_CONG_BO_SAN_PHAM.TUCONGBO, tinhThanh: constants.CONST_DEFAULT_TINHTHANH.ma }}
                form={formName.FORM_NAME_TCBSP_BAO_CAO_THONG_KE_SEARCH}
            />
        </React.Fragment >
    );
}

export default ThongKeBaoCaoSearch;