import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from "antd";
import { CommonForm } from "./../../../common";
import HoSoTiepNhanMotCuaList from "./ho_so_tiep_nhan_mot_cua_list";
import HoSoTiepNhanMotCuaReport from "./ho_so_tiep_nhan_mot_cua_report";
import * as act from "./../../../../actions/index";
import * as actID from "./../../../../constants/action_id";
import * as actHoSoCGCN from "./../../../../actions/app/quan_ly_tham_dinh_cap_giay_chung_nhan_attp/ho_so_cap_giay_chung_nhan/index";
import * as constants from "./../../../../constants/constants";
import * as main from "./../../../../constants/main";
import * as message from "./../../../../constants/message";
import * as actSyncProcess from "./../../../../actions/core/sync_process";
const CoSoSanXuatKinhDoanh = ({ ...props }) => {

    const {
        isVisiableList,
        isVisiableReport,
        pageKey,
        handleReport,
        handleBack,
        handleStartLoadData,
        handleEndLoadData,
        getAllRequest,
        dataSort,
        dataSearch
    } = props;

    const [visibleModal, setVisibleModal] = useState(false);
    const rows_selected = useSelector(state => state.core.rows_selected);
    const sync_process = useSelector(state => state.core.sync_process);

    const dispatch = useDispatch();
    const setAction = (arrAction = []) => {
        dispatch(act.setAction(arrAction))
    };
    const handleChangeLayout = (value = {}) => {
        dispatch(act.handleChangeLayout(value));
    }
    const dongBoHoSo = object => dispatch(actHoSoCGCN.dongBoHoSo(object));
    const createSyncProcess = (job = {}) => {
        dispatch(actSyncProcess.createSyncProcess(job));
    }
    const deleteSyncProcess = (job = {}) => {
        dispatch(actSyncProcess.deleteSyncProcess(job));
    }

    const handleSync = (message = null) => {
        createSyncProcess({
            jobCode: "dongbo_hoso_thamdinh_gcnattp",
            ...(message ? { message } : {}),
            show: true,
            readOnly: true
        })
    }

    const handleGetAllRequest = (pagination = {}, data = {}) => {
        handleStartLoadData();
        let requestSuccess = handleEndLoadData;
        const requestError = handleEndLoadData;
        data = { dataSort: main.parseStringDataSort(dataSort), ...data };
        var dataSortStr = "";
        if (data.hasOwnProperty("dataSort") && typeof data.dataSort === "string") {
            dataSortStr = data.dataSort;
        }
        if (data.hasOwnProperty("requestSuccess") && typeof data.requestSuccess === "function") {
            requestSuccess = () => {
                data.requestSuccess();
                handleEndLoadData();
            }
        }
        var value = { ...pagination, searchData: main.parseObjectToParams(dataSearch), sortData: dataSortStr };
        getAllRequest({
            data: value,
            requestSuccess,
            requestError
        });
    }

    useEffect(() => {
        if (sync_process && sync_process.findIndex(item => item.jobCode === "dongbo_hoso_thamdinh_gcnattp" && item.message === "over") !== -1) {
            deleteSyncProcess({ jobCode: "dongbo_hoso_thamdinh_gcnattp" })
            message.success({ content: "Đồng bộ thành công!" });
            handleGetAllRequest();
        }
    }, [sync_process])

    useEffect(() => {
        // componentDidMount
        onSetAction();
        // componentWillUnmount
        return () => {
            handleChangeLayout({
                key: constants.CONST_LAYOUT_KEY_MENU_RIGHT,
                value: {
                    hidden: true,
                    content: null
                }
            });
        }
    }, []);

    // componentDidUpdate
    useEffect(() => {
        onSetAction();
    }, [isVisiableList, isVisiableReport, main.getItemSelected(rows_selected, pageKey)])

    const onSetAction = () => {
        isVisiableReport ?
            handleChangeLayout({
                key: constants.CONST_LAYOUT_KEY_MENU_RIGHT,
                value: {
                    hidden: false,
                    title: "",
                    width: 390,
                    content: <HoSoTiepNhanMotCuaReport {...props} />
                }
            }) :
            handleChangeLayout({
                key: constants.CONST_LAYOUT_KEY_MENU_RIGHT,
                value: {
                    hidden: true,
                }
            })
        let arrAction = [];
        arrAction.push(renderActionBack());
        arrAction.push(renderActionReport());
        arrAction.push(renderActionDongBoHoSo());
        setAction(arrAction);
    }

    const renderActionDongBoHoSo = () => {
        let result = {};
        result.key = actID.ACT_ID_HO_SO_TIEP_NHAN_MOT_CUA.ACT_DONG_BO_HO_SO;
        result.disabled = false;
        result.hidden = false;
        result.handleClick = () => {
            let allowShow = true;
            if (sync_process && sync_process.length > 0) {
                allowShow = sync_process.findIndex(item => item.jobCode === "dongbo_hoso_thamdinh_gcnattp" && item.message === "over") !== -1;
            }
            if (allowShow) {
                setVisibleModal(true)
            }
            else {
                message.warning({ content: "Tiến trình đồng bộ đang được chạy!" })
                handleSync();
            }

        };
        return result;
    }

    const renderActionReport = () => {
        let result = {};
        result.key = actID.ACT_ID_HO_SO_TIEP_NHAN_MOT_CUA.ACT_REPORT;
        result.disabled = false;
        result.hidden = (isVisiableList && !isVisiableReport) ? false : true;
        result.handleClick = handleReport;
        result.type = constants.CONST_TYPE_BTN_SEARCH;
        return result;
    }

    const renderActionBack = () => {
        let result = {};
        result.key = actID.ACT_BACK;
        result.disabled = false;
        result.hidden = (!isVisiableList || isVisiableReport) ? false : true;
        result.handleClick = handleBack;
        result.type = constants.CONST_TYPE_BTN_BACK;
        return result;
    }

    return (
        <React.Fragment>
            <Modal
                title="Đồng bộ hồ sơ"
                visible={visibleModal}
                onCancel={() => setVisibleModal(false)}
                footer={[]}
            >
                <CommonForm
                    data={[
                        [
                            {
                                col: 12,
                                name: "date",
                                fieldType: "dateRange",
                                label: "Thời gian",
                                checkValid: true
                            }
                        ]
                    ]}
                    actions={[{
                        htmlType: "submit",
                        label: "Đồng bộ",
                        icon: "fa fa-refresh"
                    },
                    { htmlType: "reset", hidden: true }
                    ]}
                    onSubmit={(values) => {
                        let data = {}
                        if (values.date) {
                            if (values.date.from) {
                                data.tuNgay = values.date.from;
                            }
                            if (values.date.to) {
                                data.denNgay = values.date.to;
                            }
                        }
                        data.trangThaiHoSo = 6;
                        dongBoHoSo({
                            data,
                            requestSuccess: () => {
                                setVisibleModal(false);
                                handleSync("run");
                            }
                        })
                    }}
                    form="FORM_DONG_BO_HO_SO"
                />
            </Modal>
            {isVisiableList && <HoSoTiepNhanMotCuaList {...props} />}
        </React.Fragment>
    );
}

export default CoSoSanXuatKinhDoanh;