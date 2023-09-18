import React, { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tag, Modal } from "antd";
import { CommonTable, CommonTableAction, CommonPheDuyet, CommonBanHanh, CommonFilter } from "./../../../common";
import moment from 'moment';
import * as actHistoryDownload from "./../../../../actions/core/history_download";
import * as constants from "./../../../../constants/constants";
import * as actID from "./../../../../constants/action_id";
import * as apiUrl from "./../../../../constants/api";
import * as main from "./../../../../constants/main";
import * as url from "./../../../../constants/url";
import * as actKeHoachThamDinh from "./../../../../actions/app/quan_ly_chuoi_thuc_pham_an_toan/ke_hoach_tham_dinh/ke_hoach_tham_dinh";
import { dateFormat } from "./../../../../constants/controll";
import { Link } from 'react-router-dom';
import KeHoachThamDinhSearch from './ke_hoach_tham_dinh_search';

const KeHoachThamDinhList = (props) => {
    const {
        pageKey,
        dataLoading,
        dataSort,
        handleChangeDataSort,
        handleChangeDataSearch,
        handleEdit,
        handleHoSoList,
        handleDelete,
        getAllRequest,
        handleEndLoadData,
        handleStartLoadData,
        dataSearch,
        onSelectRow,
        history,
        isVisiableSearch
    } = props;

    const dispatch = useDispatch();
    const [visiblePheDuyet, setVisiblePheDuyet] = useState(false);
    const [visibleBanHanh, setVisibleBanHanh] = useState(false);
    const [keHoach, setKeHoach] = useState(null);
    const ke_hoach_tham_dinh_list = useSelector(state => state.app.quan_ly_chuoi_thuc_pham_an_toan.ke_hoach_tham_dinh.list);
    const account_current = useSelector(state => state.core.account_current);
    const createHistoryDownload = (value) => dispatch(actHistoryDownload.handleCreate(value));
    const pheDuyetRequest = (object) => dispatch(actKeHoachThamDinh.pheDuyetRequest(object));
    const banHanhRequest = (object) => dispatch(actKeHoachThamDinh.banHanhRequest(object));

    const onChangeDataSort = (key) => {
        let dataSortChange = [];
        let sortMax = Math.max.apply(Math, dataSort.map((val) => { return val.sort; }));
        dataSort.map((item) => {
            if (item.key === key) {
                item.value = !item.value;
                item.sort = sortMax === item.sort ? sortMax : sortMax + 1;
            }
            return dataSortChange.push(item);
        })
        handleGetAllRequest({}, {
            dataSort: main.parseStringDataSort(dataSortChange),
            requestSuccess: () => { handleChangeDataSort(dataSortChange) }
        });
    }
    const columns = () => {
        let namSort = "asc",
            tenKeHoachSort = "asc",
            ngayBatDauSort = "asc",
            ngayKetThucSort = "asc",
            quyetDinhSort = "asc",
            soKeHoachSort = "asc",
            ngayKyQuyetDinhSort = "asc",
            trangThaiPheDuyetSort = "asc",
            ngayPheDuyetSort = "asc";
        dataSort.map((item) => {
            if (item.key === "nam" && !item.value) { namSort = "desc"; }
            if (item.key === "tenKeHoach" && !item.value) { tenKeHoachSort = "desc"; }
            if (item.key === "ngayBatDau" && !item.value) { ngayBatDauSort = "desc"; }
            if (item.key === "ngayKetThuc" && !item.value) { ngayKetThucSort = "desc"; }
            if (item.key === "quyetDinh" && !item.value) { quyetDinhSort = "desc"; }
            if (item.key === "soKeHoach" && !item.value) { soKeHoachSort = "desc"; }
            if (item.key === "ngayKyQuyetDinh" && !item.value) { ngayKyQuyetDinhSort = "desc"; }
            if (item.key === "trangThaiPheDuyet" && !item.value) { trangThaiPheDuyetSort = "desc"; }
            if (item.key === "ngayPheDuyet" && !item.value) { ngayPheDuyetSort = "desc"; }
            return item;
        })
        return [
            {
                title: 'STT',
                dataIndex: 'stt',
            },
            {
                title: <div onClick={() => onChangeDataSort("nam")} >
                    <span> Năm </span>
                    <i className={`fa fa-sort-amount-${namSort}`} />
                </div>,
                dataIndex: 'nam',
                align: "center",
                width: 90
            },
            {
                title: <div onClick={() => onChangeDataSort("soKeHoach")} >
                    <span> Số kế hoạch </span>
                    <i className={`fa fa-sort-amount-${soKeHoachSort}`} />
                </div>,
                dataIndex: 'soKeHoach',
                width: 140,
            },
            {
                title: <div onClick={() => onChangeDataSort("tenKeHoach")} >
                    <span> Tên kế hoạch </span>
                    <i className={`fa fa-sort-amount-${tenKeHoachSort}`} />
                </div>,
                width: 225,
                render: (_, r) => {
                    return <Link to={main.formatUrl({
                        pathname: url.URL_KE_HOACH_THAM_DINH_CHUOI_THUC_PHAM_AN_TOAN_DETAIL,
                        objSearch: { id: r.id }
                    })}>
                        <div>{r.tenKeHoach}</div>
                    </Link>
                }
            },
            {
                title: <div onClick={() => onChangeDataSort("trangThaiPheDuyet")} >
                    <span> Trạng thái </span>
                    <i className={`fa fa-sort-amount-${trangThaiPheDuyetSort}`} />
                </div>,
                dataIndex: 'trangThaiPheDuyet',
                width: 160,
                align: "center"
            },
            {
                title: <div onClick={() => onChangeDataSort("ngayPheDuyet")} >
                    <span> Ngày phê duyệt </span>
                    <i className={`fa fa-sort-amount-${ngayPheDuyetSort}`} />
                </div>,
                dataIndex: 'ngayPheDuyet',
                width: 160,
                align: "center"
            },
            {
                title: <div onClick={() => onChangeDataSort("ngayBatDau")} >
                    <span> Ngày bắt đầu </span>
                    <i className={`fa fa-sort-amount-${ngayBatDauSort}`} />
                </div>,
                dataIndex: 'ngayBatDau',
                align: "center",
                width: 140
            },
            {
                title: <div onClick={() => onChangeDataSort("ngayKetThuc")} >
                    <span> Ngày kết thúc </span>
                    <i className={`fa fa-sort-amount-${ngayKetThucSort}`} />
                </div>,
                dataIndex: 'ngayKetThuc',
                align: "center",
                width: 150
            },
            {
                title: <div onClick={() => onChangeDataSort("quyetDinh")} >
                    <span> Quyết định </span>
                    <i className={`fa fa-sort-amount-${quyetDinhSort}`} />
                </div>,
                dataIndex: 'quyetDinh',
                width: 150,
            },
            {
                title: <div onClick={() => onChangeDataSort("ngayKyQuyetDinh")} >
                    <span> Ngày ký quyết định </span>
                    <i className={`fa fa-sort-amount-${ngayKyQuyetDinhSort}`} />
                </div>,
                dataIndex: 'ngayKyQuyetDinh',
                align: "center",
                width: 190
            },
            {
                title: 'Thao tác',
                dataIndex: 'actions',
                align: "center",
                width: 140,
                fixed: "right"
            }
        ];
    }

    const data = () => {
        let result = [];
        ke_hoach_tham_dinh_list.map((item) => {
            return result.push({
                ...item,
                key: item.id,
                trangThaiPheDuyet: renderTrangThai(item.trangThaiPheDuyet),
                actions: renderAction(item)
            })
        });
        return result;
    }

    const renderTrangThai = (trangThai) => {
        const objTrangThai = constants.CONST_PHE_DUYET.options.find(o => o.value === trangThai) || { label: "" };
        return (
            <span>
                <Tag color={objTrangThai.color} key={trangThai}>
                    {objTrangThai.label.toUpperCase()}
                </Tag>
            </span>
        )
    };

    const renderAction = (ke_hoach_tham_dinh) => {
        return <React.Fragment>
            <CommonTableAction
                actions={[
                    {
                        idChucNang: actID.ACT_ID_KE_HOACH_THAM_DINH_CTP.ACT_DELETE,
                        confirm: true,
                        confirmLabel: "Bạn chắc chắn muốn xóa?",
                        onClick: () => handleDelete(false, ke_hoach_tham_dinh.id),
                        type: "danger",
                        hidden: ke_hoach_tham_dinh.trangThaiPheDuyet === constants.CONST_PHE_DUYET.DAPHEDUYET || ke_hoach_tham_dinh.trangThaiPheDuyet === constants.CONST_PHE_DUYET.KHONGPHEDUYET
                    },
                    {
                        idChucNang: actID.ACT_ID_KE_HOACH_THAM_DINH_CTP.ACT_UPDATE,
                        onClick: () => handleEdit(ke_hoach_tham_dinh.id),
                        hidden: ke_hoach_tham_dinh.trangThaiPheDuyet === constants.CONST_PHE_DUYET.DAPHEDUYET || ke_hoach_tham_dinh.trangThaiPheDuyet === constants.CONST_PHE_DUYET.KHONGPHEDUYET
                    },
                    {
                        idChucNang: actID.ACT_ID_KE_HOACH_THAM_DINH_CTP.ACT_TRINH_PHE_DUYET,
                        onClick: () => {
                            Modal.confirm({
                                title: "Xác nhận",
                                content: "Bạn chắc chắn muốn trình phê duyệt?",
                                okText: <Fragment><i className="fa fa-check m-r-10" />Xác nhận</Fragment>,
                                cancelText: <Fragment><i className="fa fa-times m-r-10" />Hủy</Fragment>,
                                onOk: () => {
                                    pheDuyetRequest({
                                        data: {
                                            ids: [ke_hoach_tham_dinh.id],
                                            trangThaiPheDuyet: constants.CONST_PHE_DUYET.CHOPHEDUYET
                                        },
                                        msgSuccess: "Đã trình phê duyệt!",
                                        msgError: "Trình phê duyệt thất bại!"
                                    });
                                }
                            })
                        },
                        hidden: ke_hoach_tham_dinh.trangThaiPheDuyet !== constants.CONST_PHE_DUYET.DANGHOANTHIEN
                    },
                    {
                        idChucNang: actID.ACT_ID_KE_HOACH_THAM_DINH_CTP.ACT_PHE_DUYET,
                        onClick: () => {
                            setKeHoach(ke_hoach_tham_dinh);
                            setVisiblePheDuyet(true);
                        },
                        hidden: ke_hoach_tham_dinh.trangThaiPheDuyet !== constants.CONST_PHE_DUYET.CHOPHEDUYET
                    },
                    {
                        idChucNang: actID.ACT_ID_KE_HOACH_THAM_DINH_CTP.ACT_BAN_HANH,
                        onClick: () => {
                            setKeHoach(ke_hoach_tham_dinh);
                            setVisibleBanHanh(true)
                        },
                        hidden: ke_hoach_tham_dinh.trangThaiPheDuyet !== constants.CONST_PHE_DUYET.DAPHEDUYET
                    },
                    {
                        idChucNang: actID.ACT_ID_KE_HOACH_THAM_DINH_CTP.ACT_HOSO_LIST,
                        onClick: () => handleHoSoList(ke_hoach_tham_dinh.id),
                        label: ke_hoach_tham_dinh.trangThaiPheDuyet === "DAPHEDUYET" ? "Thẩm định" : "Danh sách hồ sơ",
                        icon: ke_hoach_tham_dinh.trangThaiPheDuyet === "DAPHEDUYET" ? "fa fa-pencil-square-o" : "fa fa-list",
                    },
                    {
                        idChucNang: actID.ACT_ID_KE_HOACH_THAM_DINH_CTP.ACT_EXPORT,
                        onClick: () => onDownload({ data: ke_hoach_tham_dinh })
                    },
                    {
                        idChucNang: actID.ACT_ID_KE_HOACH_THAM_DINH_CTP.ACT_DETAIL,
                        onClick: () => {
                            history.push(main.formatUrl({
                                pathname: url.URL_KE_HOACH_THAM_DINH_CHUOI_THUC_PHAM_AN_TOAN_DETAIL,
                                objSearch: { id: ke_hoach_tham_dinh.id }
                            }))
                        }
                    },
                ]}
            />
        </React.Fragment>
    }

    const onDownload = ({ data = {} }) => {
        if (data && data.id) {
            const item = {
                date: moment(new Date().toISOString()).format(`${dateFormat} hh:mm:ss`),
                title: "Danh sách cấp giấp chứng nhận chuỗi thực phẩm an toàn",
                url: apiUrl.API_KE_HOACH_THAM_DINH_CTP + `/${data.id}/export/danhsachcapgiaychungnhanchuoi`,
            }
            createHistoryDownload({
                username: account_current.name,
                process: item
            })
        }
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

    return (
        <React.Fragment>
            <CommonPheDuyet
                visible={visiblePheDuyet}
                onCancel={() => setVisiblePheDuyet(false)}
                onConfirm={() => {
                    pheDuyetRequest({
                        data: {
                            ids: [keHoach.id],
                            trangThaiPheDuyet: constants.CONST_PHE_DUYET.DAPHEDUYET,
                            item: {
                                ...keHoach,
                                trangThaiPheDuyet: constants.CONST_PHE_DUYET.DAPHEDUYET,
                            },
                            msgSuccess: "Phê duyệt thành công!",
                            msgError: "Phê duyệt thất bại!"
                        },
                        requestSuccess: () => setVisiblePheDuyet(false)
                    })
                }}
                onNotConfirm={({ lyDo }) => {
                    pheDuyetRequest({
                        data: {
                            ids: [keHoach.id],
                            trangThaiPheDuyet: constants.CONST_PHE_DUYET.KHONGPHEDUYET,
                            lyDoKhongPheDuyet: lyDo,
                            item: {
                                ...keHoach,
                                trangThaiPheDuyet: constants.CONST_PHE_DUYET.KHONGPHEDUYET,
                                lyDoKhongPheDuyet: lyDo,
                            },
                            msgSuccess: "Phê duyệt thành công!",
                            msgError: "Phê duyệt thất bại!"
                        },
                        requestSuccess: () => setVisiblePheDuyet(false)
                    })
                }}
            />
            <CommonBanHanh
                key={keHoach ? keHoach.id : -1}
                visible={visibleBanHanh}
                onCancel={() => setVisibleBanHanh(false)}
                initialValues={keHoach ? {
                    soQuyetDinh: keHoach.soQuyetDinh,
                    soKeHoach: keHoach.soKeHoach,
                    nguoiLapQuyetDinh: keHoach.nguoiLapQuyetDinh,
                    nguoiKy: keHoach.nguoiKy,
                    ngayKy: keHoach.ngayKy,
                    id: keHoach.id
                } : {}}
                onBanHanh={banHanhRequest}
                attach={keHoach ? {
                    entityId: keHoach.id,
                    attachEntityType: constants.CONST_ATTACH_TYPE.KEHOACHTHAMDINH_CHUOITHUCPHAM
                } : null}
            />
            <CommonTable
                filter={<FilterDropdown
                    getAllRequest={getAllRequest}
                    dataSearch={dataSearch}
                    dataSort={dataSort}
                    onSelectRow={onSelectRow}
                    handleChangeDataSearch={handleChangeDataSearch}
                />}
                columns={columns()}
                dataSource={data()}
                loading={dataLoading}
                bordered={true}
                onChange={handleGetAllRequest}
                pageKey={pageKey}
                onSelectRow={rows => onSelectRow(rows, pageKey)}
                expanded={false}
                controllerKey={main.encode(apiUrl.API_KE_HOACH_THAM_DINH_CTP)}
                search={{
                    component: <KeHoachThamDinhSearch {...props} />,
                    show: isVisiableSearch
                }}
            />
        </React.Fragment>
    );
}

const FilterDropdown = ({ getAllRequest, dataSort, dataSearch, onSelectRow, handleChangeDataSearch }) => {
    const year = moment().year();
    const getSelectedKeys = () => {
        let result = [];
        if (!dataSearch.trangThaiPheDuyet && !dataSearch.nam) {
            result.push("ALL");
        }
        else {
            dataSearch.trangThaiPheDuyet && result.push(dataSearch.trangThaiPheDuyet);
            dataSearch.nam && dataSearch.nam === year && result.push("YEAR");
        }
        return result;
    }
    return <CommonFilter
        menus={[
            { label: "Tất cả kế hoạch", key: "ALL", iconCls: "fa-reply-all" },
            { type: "divider" },
            { isTitle: true, iconCls: "fa-pencil-square-o", label: "Trạng thái phê duyệt" },
            ...constants.CONST_PHE_DUYET.options.map(item => ({ key: item.value, label: item.label })),
            { type: "divider" },
            { isTitle: true, iconCls: "fa-calendar", label: "Năm" },
            { key: "YEAR", label: `Năm ${year}` }
        ]}
        selectedKeys={getSelectedKeys()}
        onSelect={key => {
            let data = {
                sortData: main.parseStringDataSort(dataSort),
                currentPage: 1
            }
            let _dataSearch = { ...dataSearch };
            switch (key) {
                case "ALL":
                    _dataSearch = { ..._dataSearch, trangThaiPheDuyet: undefined, nam: undefined }
                    break;
                default:
                    if (key === "YEAR") {
                        _dataSearch = { ..._dataSearch, nam: _dataSearch.nam === year ? undefined : year };
                    }
                    if (constants.CONST_PHE_DUYET.options.find(item => item.value === key)) {
                        _dataSearch = { ..._dataSearch, trangThaiPheDuyet: _dataSearch.trangThaiPheDuyet === key ? undefined : key };
                    }
                    break;
            }
            data.searchData = main.parseObjectToParams(_dataSearch);
            getAllRequest({
                data,
                requestSuccess: () => {
                    handleChangeDataSearch({ ..._dataSearch });
                    onSelectRow();
                },
            });
        }}
    />
}

export default KeHoachThamDinhList;