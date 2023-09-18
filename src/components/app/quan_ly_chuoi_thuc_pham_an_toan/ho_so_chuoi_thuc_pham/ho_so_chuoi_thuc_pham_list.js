import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tag, Modal, Button, Input, DatePicker, Spin } from "antd";
import { CommonTable, CommonTableAction, CommonFilter } from "./../../../common";
import moment from 'moment';
import * as actHistoryDownload from "./../../../../actions/core/history_download";
import * as constants from "./../../../../constants/constants";
import * as actID from "./../../../../constants/action_id";
import * as apiUrl from "./../../../../constants/api";
import * as main from "./../../../../constants/main";
import * as message from "./../../../../constants/message";
import * as actHoSoChuoiThucPham from "./../../../../actions/app/quan_ly_chuoi_thuc_pham_an_toan/ho_so_chuoi_thuc_pham/ho_so_chuoi_thuc_pham";
import { dateFormat } from "./../../../../constants/controll";
import CoSoThamGiaChuoi from "./co_so_tham_gia_chuoi";
import HoSoChuoiThucPhamSearch from "./ho_so_chuoi_thuc_pham_search";

const HoSoChuoiThucPhamList = (props) => {
    const {
        pageKey,
        dataLoading,
        dataSort,
        handleChangeDataSort,
        handleChangeDataSearch,
        handleEdit,
        handleDelete,
        getAllRequest,
        handleEndLoadData,
        handleStartLoadData,
        dataSearch,
        onSelectRow,
        allowUpdateList,
        queryVariable,
        isVisiableSearch
    } = props;

    const [visibleModal, setVisibleModal] = useState(false);
    const [visibleModalGXN, setVisibleModalGXN] = useState(false);
    const [soGiayXN, setSoGiayXN] = useState(null);
    const [ngayCap, setNgayCap] = useState(null);
    const [loading, setLoading] = useState(false);
    const [itemActive, setItemActive] = useState(null);


    const [coSoThamGiaChuoi, setCoSoThamGiaChuoi] = useState([]);
    const ho_so_chuoi_thuc_pham_list = useSelector(state => state.app.quan_ly_chuoi_thuc_pham_an_toan.ho_so_chuoi_thuc_pham.list);

    const account_current = useSelector(state => state.core.account_current);

    const dispatch = useDispatch();
    const createHistoryDownload = (value) => dispatch(actHistoryDownload.handleCreate(value));
    const updateRequest = (object) => dispatch(actHoSoChuoiThucPham.updateRequest(object));

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
        let tenCoSoSort = "asc",
            soChungNhanAttpSort = "asc",
            tenDangKyKinhDoanhSort = "asc",
            diaDiemKinhDoanhSort = "asc",
            trangThaiHoSoSort = "asc",
            ketQuaThamDinhSort = "asc";
        dataSort.map((item) => {
            if (item.key === "tenCoSo" && !item.value) { tenCoSoSort = "desc"; }
            if (item.key === "soChungNhanAttp" && !item.value) { soChungNhanAttpSort = "desc"; }
            if (item.key === "tenDangKyKinhDoanh" && !item.value) { tenDangKyKinhDoanhSort = "desc"; }
            if (item.key === "diaDiemKinhDoanh" && !item.value) { diaDiemKinhDoanhSort = "desc"; }
            if (item.key === "trangThaiHoSo" && !item.value) { trangThaiHoSoSort = "desc"; }
            if (item.key === "ketQuaThamDinh" && !item.value) { ketQuaThamDinhSort = "desc"; }
            return item;
        })
        return [
            {
                title: 'STT',
                dataIndex: 'stt',
            },
            {
                title: <div onClick={() => onChangeDataSort("tenCoSo")} >
                    <span> Tên cơ sở được cấp GXN </span>
                    <i className={`fa fa-sort-amount-${tenCoSoSort}`} />
                </div>,
                dataIndex: 'tenCoSo',
                width: 245
            },
            {
                title: <div onClick={() => onChangeDataSort("soChungNhanAttp")} >
                    <span> Số chứng nhận ATTP </span>
                    <i className={`fa fa-sort-amount-${soChungNhanAttpSort}`} />
                </div>,
                dataIndex: 'soChungNhanAttp',
                width: 190
            },
            {
                title: <div onClick={() => onChangeDataSort("tenDangKyKinhDoanh")} >
                    <span> Tên doanh nghiệp </span>
                    <i className={`fa fa-sort-amount-${tenDangKyKinhDoanhSort}`} />
                </div>,
                dataIndex: 'tenDangKyKinhDoanh',
                width: 230,
            },
            {
                title: <div onClick={() => onChangeDataSort("diaDiemKinhDoanh")} >
                    <span> Địa điểm kinh doanh </span>
                    <i className={`fa fa-sort-amount-${diaDiemKinhDoanhSort}`} />
                </div>,
                dataIndex: 'diaChi',
                width: 280
            },
            {
                title: "Loại sản phẩm được xác nhận",
                dataIndex: 'nhomChuoiThucPham.tenNhom',
                width: 250,
                render: (_, item) => {
                    if (item.nhomChuoiThucPham && item.nhomChuoiThucPham.tenNhom && item.nhomChuoiThucPham.sanPham) {
                        return `${item.nhomChuoiThucPham.sanPham} (${item.nhomChuoiThucPham.tenNhom})`;
                    }
                    else {
                        return null;
                    }
                }
            },
            {
                title: "Số GXN CTP an toàn",
                dataIndex: 'soGiayXacNhanChuoi',
                width: 170,
            },
            {
                title: "Ngày cấp",
                dataIndex: 'ngayCapXacNhanChuoi',
                width: 100,
            },
            {
                title: <div onClick={() => onChangeDataSort("trangThaiHoSo")} >
                    <span> Trạng thái </span>
                    <i className={`fa fa-sort-amount-${trangThaiHoSoSort}`} />
                </div>,
                dataIndex: 'trangThaiHoSo',
                width: 140,
                align: "center"
            },
            {
                title: <div onClick={() => onChangeDataSort("ketQuaThamDinh")} >
                    <span> Kết quả thẩm định </span>
                    <i className={`fa fa-sort-amount-${ketQuaThamDinhSort}`} />
                </div>,
                dataIndex: 'ketQuaThamDinh',
                width: 180,
                align: "center"
            },

            {
                ...(!allowUpdateList ?
                    {
                        title: 'Thao tác',
                        dataIndex: 'actions',
                        align: "center",
                        width: 140,
                        fixed: "right"
                    } : { width: 0 })
            }
        ];
    }

    const checkDisabled = (item) => {
        if (
            allowUpdateList
            && item.keHoachThamDinh
            && item.keHoachThamDinh.id
            && queryVariable.ke_hoach_id
            && parseInt(queryVariable.ke_hoach_id, 0) !== item.keHoachThamDinh.id
        ) {
            return true;
        }
        else {
            return false;
        }
    }

    const data = () => {
        let result = [];
        ho_so_chuoi_thuc_pham_list.map((item) => {
            return result.push({
                ...item,
                key: item.id,
                diaChi: renderDiaChi(item),
                trangThaiHoSo: renderTrangThai(item.trangThaiHoSo),
                ketQuaThamDinh: renderKetQua(item.ketQuaThamDinh),
                actions: renderAction(item),
                disabled: checkDisabled(item)
            })
        });
        return result;
    }

    const renderTrangThai = (trangThai) => {
        const objTrangThai = constants.CONST_TRANG_THAI_HO_SO.xuLyOptions.find(o => o.value === trangThai) || { label: "" };
        return <Tag color={objTrangThai.color} key={trangThai}>
            {objTrangThai.label.toUpperCase()}
        </Tag>
    };

    const renderKetQua = (ketQua) => {
        const objKetQua = constants.CONST_KET_QUA_THAM_DINH.options.find(o => o.value === ketQua) || { label: "" };
        return (
            <span>
                <Tag color={objKetQua.color} key={ketQua}>
                    {objKetQua.label.toUpperCase()}
                </Tag>
            </span>
        )
    };

    const renderDiaChi = (item) => {
        return `${item.diaDiemKinhDoanh} 
        ${item.xaPhuong && item.xaPhuong.ten ? ` - ${item.xaPhuong.ten}` : ""}
        ${item.quanHuyen && item.quanHuyen.ten ? ` - ${item.quanHuyen.ten}` : ""}
        ${item.tinhThanh && item.tinhThanh.ten ? ` - ${item.tinhThanh.ten}` : ""}
        `.toString().replace(/-|,/, "");
    }

    const renderAction = (item) => {
        return <React.Fragment>
            <CommonTableAction
                actions={[
                    {
                        idChucNang: actID.ACT_ID_HO_SO_CHUOI_THUC_PHAM.ACT_EXPORT,
                        onClick: () => {
                            item.soGiayXacNhanChuoi === null || item.soGiayXacNhanChuoi === "" ?
                                message.warning({
                                    content: "Hồ sơ chuỗi thực phẩm an toàn chưa đạt điều kiện. Không thể tải giấy chứng nhận!",
                                    key: "NOT_ALLOW_UPDATE"
                                }) :
                                onDownload({ data: item })
                        }
                    },
                    {
                        idChucNang: actID.ACT_ID_HO_SO_CHUOI_THUC_PHAM.ACT_DELETE,
                        confirm: true,
                        confirmLabel: "Bạn chắc chắn muốn xóa?",
                        onClick: () => handleDelete(false, item.id),
                        type: "danger"
                    },
                    {
                        idChucNang: actID.ACT_ID_HO_SO_CHUOI_THUC_PHAM.ACT_LIST_CO_SO,
                        onClick: () => {
                            setVisibleModal(true);
                            setCoSoThamGiaChuoi(item.danhSachCoSoThamGiaChuoi);
                        },
                        type: "primary"
                    },
                    {
                        idChucNang: actID.ACT_ID_HO_SO_CHUOI_THUC_PHAM.ACT_UPDATE,
                        onClick: () => handleEdit(item.id)
                    },
                    {
                        idChucNang: actID.ACT_ID_HO_SO_CHUOI_THUC_PHAM.ACT_CAP_SO_GXN,
                        onClick: () => {
                            setVisibleModalGXN(true);
                            setItemActive(item);
                        }
                    }
                ]}
            />
        </React.Fragment>
    }

    const onDownload = ({ data = {} }) => {
        if (data && data.id) {
            const item = {
                date: moment(new Date().toISOString()).format(`${dateFormat} hh:mm:ss`),
                title: "Giấy chứng nhận cơ sở đủ điều kiện tham gia chuỗi thực phẩm an toàn",
                url: apiUrl.API_HO_SO_CHUOI_THUC_PHAM + `/${data.id}/export/giayxacnhan`,
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

    const onCloseModal = () => {
        setVisibleModal(false);
        setCoSoThamGiaChuoi([]);
    }

    return (
        <React.Fragment>
            <Modal
                title="Cấp số giấy xác nhận"
                visible={visibleModalGXN}
                destroyOnClose
                onCancel={() => {
                    setVisibleModalGXN(false);
                    setItemActive(null);
                }}
                onOk={() => {
                    setLoading(true);
                    updateRequest({
                        data: {
                            ...itemActive,
                            soGiayXacNhanChuoi: soGiayXN,
                            ngayCapXacNhanChuoi: ngayCap
                        },
                        requestSuccess: () => {
                            setVisibleModalGXN(false);
                            setItemActive(null);
                            setLoading(false);
                        },
                        requestError: () => {
                            setLoading(false);
                        }
                    })
                }}
                okText={<React.Fragment><i className="fa fa-pencil-square-o m-r-5" />Cấp số</React.Fragment>}
                cancelText={<React.Fragment><i className="fa fa-times m-r-5" />Hủy</React.Fragment>}
            >
                <Spin spinning={loading}>
                    <CapSoGiayXacNhan
                        onChangeSoGXN={soGXN => setSoGiayXN(soGXN)}
                        onChangeNgayCap={ngayCap => setNgayCap(ngayCap)}
                    />
                </Spin>
            </Modal>
            <Modal
                destroyOnClose
                title="Danh sách cơ sở tham gia chuỗi"
                visible={visibleModal}
                onCancel={onCloseModal}
                width={1000}
                footer={[
                    <Button type="default" onClick={onCloseModal}><i className="fa fa-times m-r-5" />Đóng</Button>
                ]}
            >
                <CoSoThamGiaChuoi coSos={coSoThamGiaChuoi} />
            </Modal>
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
                onSelectRow={onSelectRow}
                expanded={false}
                controllerKey={main.encode(apiUrl.API_HO_SO_CHUOI_THUC_PHAM)}
                search={{
                    show: isVisiableSearch,
                    component: <HoSoChuoiThucPhamSearch {...props} />
                }}
            />
        </React.Fragment >
    );
}

const CapSoGiayXacNhan = ({ onChangeSoGXN, onChangeNgayCap }) => {
    const [soGiayXacNhan, setSoGiayXacNhan] = useState(null);
    const [ngayCap, setNgayCap] = useState(moment(new Date().toISOString()).format(dateFormat));

    const dispatch = useDispatch();
    const getSoGXNRequest = (object) => dispatch(actHoSoChuoiThucPham.getSoGXNRequest(object));

    useEffect(() => {
        getSoGXNRequest({
            requestSuccess: (res) => {
                setSoGiayXacNhan(res.result);
                onChangeSoGXN(res.result);
                onChangeNgayCap(moment().format(dateFormat));
            }
        });
    }, []);

    return <React.Fragment>
        <div className="row">
            <div className="col-md-4">
                Số giấy xác nhận:
            </div>
            <div className="col-md-8">
                <Input
                    value={soGiayXacNhan}
                    placeholder="Số giấy xác nhận"
                    onChange={e => {
                        setSoGiayXacNhan(e.target.value);
                        onChangeSoGXN(e.target.value);
                    }}
                />
            </div>
        </div>
        <div className="row" style={{ marginTop: 15 }}>
            <div className="col-md-4">
                Ngày cấp:
            </div>
            <div className="col-md-8">
                <DatePicker
                    style={{ width: "100%" }}
                    placeholder="Ngày cấp"
                    value={ngayCap ? moment(ngayCap, dateFormat) : null}
                    onChange={(_, date) => {
                        setNgayCap(date)
                        onChangeNgayCap(date)
                    }}
                    format={dateFormat}
                />
            </div>
        </div>
    </React.Fragment>
}

const FilterDropdown = ({ getAllRequest, dataSort, dataSearch, onSelectRow, handleChangeDataSearch }) => {
    const getSelectedKeys = () => {
        let result = [];
        if (!dataSearch.trangThaiHoSo && !dataSearch.ketQuaThamDinh) {
            result.push("ALL");
        }
        else {
            dataSearch.trangThaiHoSo && result.push(dataSearch.trangThaiHoSo);
            dataSearch.ketQuaThamDinh && result.push(dataSearch.ketQuaThamDinh);
        }
        return result;
    }

    return <CommonFilter
        menus={[
            { label: "Tất cả kế hoạch", key: "ALL", iconCls: "fa-reply-all" },
            { type: "divider" },
            { isTitle: true, iconCls: "fa-share-square-o", label: "Trạng thái hồ sơ" },
            ...constants.CONST_TRANG_THAI_HO_SO.xuLyOptions.map(item => ({ key: item.value, label: item.label })),
            { type: "divider" },
            { isTitle: true, iconCls: "fa-file-text", label: "Kết quả thẩm định" },
            ...constants.CONST_KET_QUA_THAM_DINH.options.map(item => ({ key: item.value, label: item.label })),
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
                    _dataSearch = { ..._dataSearch, trangThaiHoSo: undefined, ketQuaThamDinh: undefined }
                    break;
                default:
                    if (constants.CONST_TRANG_THAI_HO_SO.xuLyOptions.find(item => item.value === key)) {
                        _dataSearch = { ..._dataSearch, trangThaiHoSo: _dataSearch.trangThaiHoSo === key ? undefined : key };
                    }
                    if (constants.CONST_KET_QUA_THAM_DINH.options.find(item => item.value === key)) {
                        _dataSearch = { ..._dataSearch, ketQuaThamDinh: _dataSearch.ketQuaThamDinh === key ? undefined : key };
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

export default HoSoChuoiThucPhamList;