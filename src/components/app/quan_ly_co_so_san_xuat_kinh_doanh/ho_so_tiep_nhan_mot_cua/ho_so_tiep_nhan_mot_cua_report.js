import React, { } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CommonForm } from "./../../../common";
import moment from 'moment';
import * as constants from "./../../../../constants/constants";
import * as formName from "./../../../../constants/form_name";
import * as actHistoryDownload from "./../../../../actions/core/history_download";
import * as apiUrl from "./../../../../constants/api";
import { dateFormat } from "./../../../../constants/controll";

const HoSoTiepNhanMotCuaReport = ({
    getAllRequest,
    handleStartLoadData,
    handleChangeDataSearch,
    handleEndLoadData,
    onSelectRow
}) => {

    const account_current = useSelector(state => state.core.account_current);

    const dispatch = useDispatch();
    const createHistoryDownload = (value) => dispatch(actHistoryDownload.handleCreate(value));

    const handleSubmit = (values) => {
        handleStartLoadData();
        var data = {};
        if (values.tuNgay) {
            data.tuNgay = values.tuNgay;
        }
        if (values.denNgay) {
            data.denNgay = values.denNgay;
        }
        handleChangeDataSearch(data);
        data = {
            ...data,
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

    const onDownload = (values) => {
        const item = {
            date: moment(new Date().toISOString()).format(`${dateFormat} hh:mm:ss`),
            title: "Thống kê hồ sơ tiếp nhận một cửa",
            url: apiUrl.API_HO_SO_TIEP_NHAN_MOT_CUA_DOWNLOAD
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
                            label: "Ngày nộp",
                            name: "ngayNop",
                            fieldType: "dateRange"
                        },
                    ],
                    [//row 1
                        {
                            col: 12,
                            label: "Ngày nhận",
                            name: "ngayNhan",
                            fieldType: "dateRange"
                        },
                    ],
                ]}
                actions={[
                    {
                        htmlType: constants.FORM_HTML_TYPE_BUTTON,
                        label: "Tải xuống",
                        isSubmit: true,
                        icon: "fa fa-download",
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
                form={formName.FORM_NAME_HO_SO_TIEP_NHAN_MOT_CUA_REPORT}
            />
        </React.Fragment >
    );
}

export default HoSoTiepNhanMotCuaReport;