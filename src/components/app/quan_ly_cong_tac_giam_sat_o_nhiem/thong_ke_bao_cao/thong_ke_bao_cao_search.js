import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { CommonForm } from "../../../common";
import moment from 'moment';
import * as actHistoryDownload from "../../../../actions/core/history_download";
import * as constants from "../../../../constants/constants";
import * as main from "../../../../constants/main";
import * as apiUrl from "../../../../constants/api";
import * as formName from "../../../../constants/form_name";
import { dateFormat } from "./../../../../constants/controll";
import { getAllRequest as getAllLoaiThucPham } from "./../../../../actions/app/quan_ly_cong_tac_giam_sat_o_nhiem/danh_muc/loai_thuc_pham/loai_thuc_pham"
import { VALIDATE_QTGSONTP_DMTP_LOAI_THUC_PHAM_REQUIRED } from '../../../../constants/validate';
const ThongKeBaoCaoSearch = ({
    getAllRequest,
    handleStartLoadData,
    handleChangeDataSearch,
    handleEndLoadData,
    onSelectRow
}) => {
    const account_current = useSelector(state => state.core.account_current);
    const loai_thuc_pham_list = useSelector(state => state.app.quan_ly_cong_tac_giam_sat_o_nhiem.loai_thuc_pham.list);
    const dispatch = useDispatch();
    const createHistoryDownload = (value) => dispatch(actHistoryDownload.handleCreate(value));
    const getFormValue = (fieldName) => {
        return useSelector(state => formValueSelector(formName.FROM_NAME_QLCTGSON_THONG_KE_BAO_CAO_SEARCH)(state, fieldName));
    }

    useEffect(() => {
        dispatch(getAllLoaiThucPham({ isPagination: false }));
    }, [])

    const handleSubmit = (values) => {
        handleStartLoadData();
        var data = {};
        if (values.dotKiemTraId) {
            data.dotKiemTraId = values.dotKiemTraId;
        }
        if (values.thucPhamId) {
            data.thucPhamId = values.thucPhamId;
        }
        if (values.chiTieuId) {
            data.chiTieuId = values.chiTieuId;
        }
        if (values.coSo) {
            data.coSo = values.coSo;
        }
        if (values.toDate) {
            data.toDate = values.toDate;
        }
        if (values.fromDate) {
            data.fromDate = values.fromDate;
        }
        handleChangeDataSearch(data);
        getAllRequest({
            data,
            requestSuccess: () => {
                handleEndLoadData();
                onSelectRow();
                const contentElm = document.getElementById("wrapper-content");
                contentElm && contentElm.scrollTo({ top: 2000 });
            },
            requestError: handleEndLoadData
        });
    };

    const onDownload = (values) => {
        if (!values.loaiThucPhamIds || values.loaiThucPhamIds.toString().trim() === "") {
            values.loaiThucPhamIds = undefined;
        }
        const item = {
            date: moment(new Date().toISOString()).format(`${dateFormat} hh:mm:ss`),
            title: "Thống kê công tác giám sát ô nhiễm thực phẩm",
            url: main.convertObjectToQueryVariable(apiUrl.API_QLCT_GS_ONTP_EXPORT, values)
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
                            fieldType: "selectLoadMore",
                            url: apiUrl.API_DOT_KIEM_TRA,
                            searchKey: "searchString",
                            searchKeyExtend: "tenDotKiemTra",
                            valueKey: "id",
                            labelKey: "tenDotKiemTra",
                            label: "Đợt kiểm tra",
                            placeholder: "Đợt kiểm tra",
                            name: "idDotKiemTra",
                        },
                        {
                            col: 6,
                            mode: "multiple",
                            fieldType: "select",
                            name: "loaiThucPhamIds",
                            options: loai_thuc_pham_list.map(item => ({ value: item.id, label: item.tenLoaiThucPham })),
                            label: "Loại thực phẩm",
                            placeholder: "Loại thực phẩm",
                            // validates: [VALIDATE_QTGSONTP_DMTP_LOAI_THUC_PHAM_REQUIRED],
                            // checkValid: true
                        }
                        // {
                        //     col: 6,
                        //     // mode: "multiple",
                        //     fieldType: "selectLoadMore",
                        //     url: apiUrl.API_QL_DM_LOAI_THUC_PHAM,
                        //     searchKey: "searchString",
                        //     searchKeyExtend: "tenLoaiThucPham",
                        //     valueKey: "id",
                        //     labelKey: "tenLoaiThucPham",
                        //     label: "Loại thực phẩm",
                        //     placeholder: "Loại thực phẩm",
                        //     name: "thucPhamId",
                        // },
                    ],
                    [//row
                        // {
                        //     col: 4,
                        //     fieldType: "selectLoadMore",
                        //     url: apiUrl.API_QL_DM_CHI_TIEU,
                        //     searchKey: "searchString",
                        //     searchKeyExtend: "tenChiTieu",
                        //     valueKey: "id",
                        //     labelKey: "tenChiTieu",
                        //     label: "Chỉ tiêu",
                        //     placeholder: "Chỉ tiêu",
                        //     name: "chiTieuId",
                        // },
                        // {
                        //     col: 6,
                        //     fieldType: "date",
                        //     label: "Từ ngày",
                        //     placeholder: "Từ ngày",
                        //     name: "toDate",
                        //     maxDate: getFormValue("fromDate"),
                        // },
                        // {
                        //     col: 6,
                        //     fieldType: "date",
                        //     label: "Đến ngày",
                        //     placeholder: "Đến ngày",
                        //     name: "fromDate",
                        //     minDate: getFormValue("toDate"),
                        // },
                    ],
                ]}
                actions={[
                    {
                        htmlType: constants.FORM_HTML_TYPE_SUBMIT,
                        label: "Tải xuống",
                        icon: "fa fa-download",
                        isSubmit: true,
                        type: "success",
                        handleClick: onDownload
                    },
                    // {
                    //     htmlType: constants.FORM_HTML_TYPE_SUBMIT,
                    //     label: "Thống kê",
                    //     icon: "fa fa-search"
                    // }
                ]}
                onSubmit={onDownload}
                form={formName.FROM_NAME_QLCTGSON_THONG_KE_BAO_CAO_SEARCH}
            />
        </React.Fragment >
    );
}

export default ThongKeBaoCaoSearch;