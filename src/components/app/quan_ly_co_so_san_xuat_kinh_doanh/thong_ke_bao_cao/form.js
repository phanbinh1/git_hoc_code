import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CommonForm, CommonAddress } from "./../../../common";
import moment from 'moment';
import * as actLinhVuc from "./../../../../actions/app/danh_muc/linh_vuc/linh_vuc";
import * as actLoaiHinhCoSo from "./../../../../actions/app/danh_muc/loai_hinh_co_so/loai_hinh_co_so";
import * as actHistoryDownload from "./../../../../actions/core/history_download";
import * as constants from "./../../../../constants/constants";
import * as main from "./../../../../constants/main";
import * as apiUrl from "../../../../constants/api";
import * as formName from "./../../../../constants/form_name";
import { dateFormat } from "./../../../../constants/controll";

const Form = ({
    getAllRequest,
    handleStartLoadData,
    handleChangeDataSearch,
    dataSort,
    handleEndLoadData
}) => {

    const account_current = useSelector(state => state.core.account_current);
    const loai_hinh_co_so_tree = useSelector(state => state.app.danh_muc.loai_hinh_co_so.tree);
    const linh_vuc = useSelector(state => state.app.danh_muc.linh_vuc.list);
    const dispatch = useDispatch();
    const getLinhVuc = (object = {}) => dispatch(actLinhVuc.getAllRequest(object));
    const getLoaiHinhCoSoTree = (object = {}) => dispatch(actLoaiHinhCoSo.getTreeRequest(object));
    const createHistoryDownload = (value) => dispatch(actHistoryDownload.handleCreate(value));

    useEffect(() => {
        getLinhVuc();
        getLoaiHinhCoSoTree();
    }, []);

    const handleSubmit = (values) => {
        handleStartLoadData();
        var searchData = {};
        if (values.ngayCapPhep) {
            if (values.ngayCapPhep.from) {
                searchData.tuNgayCap = values.ngayCapPhep.from;
            }
            if (values.ngayCapPhep.to) {
                searchData.denNgayCap = values.ngayCapPhep.to;
            }
        }
        if (values.idLinhVuc) {
            searchData.idLinhVuc = values.idLinhVuc;
        }
        if (values.idLoaiHinhCoSo) {
            searchData.idLoaiHinhCoSo = values.idLoaiHinhCoSo;
        }
        if (values.maQuanHuyens) {
            searchData.maQuanHuyens = values.maQuanHuyens.toString();
        }
        if (values.maXaPhuong) {
            searchData.maXaPhuong = values.maXaPhuong;
        }
        if (values.hasOwnProperty("trangThaiGiayChungNhan")) {
            searchData.trangThaiGiayChungNhan = values.trangThaiGiayChungNhan === 1;
        }
        handleChangeDataSearch(searchData);
        const data = {
            ...searchData,
            sortData: main.parseStringDataSort(dataSort),
            currentPage: 1
        };
        getAllRequest({
            data,
            requestSuccess: () => {
                handleEndLoadData();
            },
            requestError: handleEndLoadData
        });
    };

    const onDownload = (values) => {
        var searchData = {};
        if (values.ngayCapPhep) {
            if (values.ngayCapPhep.from) {
                searchData.tuNgayCap = values.ngayCapPhep.from;
            }
            if (values.ngayCapPhep.to) {
                searchData.denNgayCap = values.ngayCapPhep.to;
            }
        }
        if (values.idLinhVuc) {
            searchData.idLinhVuc = values.idLinhVuc;
        }
        if (values.idLoaiHinhCoSo) {
            searchData.idLoaiHinhCoSo = values.idLoaiHinhCoSo;
        }
        if (values.maQuanHuyens) {
            searchData.maQuanHuyens = values.maQuanHuyens.toString();
        }
        if (values.maXaPhuong) {
            searchData.maXaPhuong = values.maXaPhuong;
        }
        if (values.hasOwnProperty("trangThaiGiayChungNhan")) {
            searchData.trangThaiGiayChungNhan = values.trangThaiGiayChungNhan === 1;
        }
        const item = {
            date: moment(new Date().toISOString()).format(`${dateFormat} hh:mm:ss`),
            title: "Thống kê tổng hợp cơ sở theo giấy chứng nhận",
            url: main.convertObjectToQueryVariable(apiUrl.API_CO_SO_SAN_XUAT_KINH_DOANH_THONG_KE_BAO_CAO_DOWNLOAD, searchData)
        }
        createHistoryDownload({
            username: account_current.name,
            process: item
        })
    };

    return (
        <React.Fragment >
            <CommonForm
                data={[
                    [//row 1
                        {
                            col: 6,
                            label: "Ngày cấp phép",
                            placeholder: "Ngày cấp phép",
                            name: "ngayCapPhep",
                            fieldType: "dateRange"
                        },
                        {
                            col: 3,
                            label: "Ngành",
                            placeholder: "Ngành",
                            fieldType: "select",
                            valueKey: "id",
                            labelKey: "ten",
                            name: "idLinhVuc",
                            options: linh_vuc
                        },
                        {
                            col: 3,
                            label: "Loại hình cơ sở",
                            placeholder: "Loại hình cơ sở",
                            fieldType: "selectTree",
                            valueKey: "id",
                            labelKey: "label",
                            name: "idLoaiHinhCoSo",
                            options: loai_hinh_co_so_tree
                        }

                    ],
                    [
                        {
                            type: "custom",
                            renderCustom: <React.Fragment key="col-2">
                                <div className="col-md-8">
                                    <div className="row">
                                        <CommonAddress
                                            key="address"
                                            form={formName.FORM_NAME_CO_SO_SAN_XUAT_KINH_DOANH_THONG_KE_BAO_CAO}
                                            tinhThanh={{
                                                hidden: true,
                                                name: "tinhThanh"
                                            }}
                                            quanHuyen={{
                                                validate: false,
                                                name: "maQuanHuyens",
                                                mode: "multiple"
                                            }}
                                            xaPhuong={{
                                                validate: false,
                                                name: "maXaPhuong"
                                            }}
                                        />
                                    </div>
                                </div>
                            </React.Fragment>
                        },
                        {
                            col: 4,
                            label: "Tình trạng chứng nhận",
                            placeholder: "Tình trạng chứng nhận",
                            name: "trangThaiGiayChungNhan",
                            fieldType: "select",
                            options: [{ value: 1, label: "Còn hạn" }, { value: 0, label: "Đã hết hạn" }]
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
                        icon: "fa fa-search",
                        type: constants.CONST_TYPE_BTN_SUBMIT,
                        label: "Thống kê"
                    }
                ]}
                onSubmit={handleSubmit}
                form={formName.FORM_NAME_CO_SO_SAN_XUAT_KINH_DOANH_THONG_KE_BAO_CAO}
                initialValues={{
                    tinhThanh: constants.CONST_DEFAULT_TINHTHANH.ma
                }}
            />
        </React.Fragment >
    );
}

export default Form;