import React, { Fragment, useState, useEffect } from "react";
import { Modal as AntModal, Table, Button, Tooltip, Popconfirm, Input, ConfigProvider, Empty } from "antd";
import { CONST_PAGE_SIZE_OPTIONS } from "../../../../../constants/constants";
import { CommonFieldset } from "../../../../common";
import { getAllRequest, deleteRequest, updateRequest, shareRequest } from "./../../../../../actions/app/quan_ly_co_so_san_xuat_kinh_doanh/co_so_san_xuat_kinh_doanh/co_so_du_kien";
import moment from "moment";
import { dateTimeFormat } from "../../../../../constants/controll";
import { API_CO_SO_SAN_XUAT_KINH_DOANH_KIEM_TRA_CO_SO } from "../../../../../constants/api";
import { useSelector, useDispatch } from "react-redux";
import { handleCreate } from "./../../../../../actions/core/history_download";
import ModalListCoSo from "./list_co_so";
import ShareAccount from "./share_account";
import { deduplicate } from "../../../../../constants/main";

const ModalList = ({
    visible,
    onCancel,
    action = {
        edit: true,
        delete: true,
        download: true,
        view: true,
        share: true
    },
    isUpdate,
    coSoSelected = []
}) => {
    const dispatch = useDispatch();
    const account_current = useSelector(state => state.core.account_current);
    const [pagination, setPagination] = useState({});
    const [data, setData] = useState([]);
    const [tieuDeSearch, setTieuDeSearch] = useState(null);
    const [loading, setLoading] = useState(false);
    const [rowSelected, setRowSelected] = useState([]);

    const [visibleList, setVisibleList] = useState(false);
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [visibleShare, setVisibleShare] = useState(false);
    const [item, setItem] = useState(null);

    const getData = async (currentPage = 1, pageSize = pagination.pageSize || 10, _tieuDeSearch = tieuDeSearch) => {
        setLoading(true);
        const searchData = _tieuDeSearch ? `tieuDe=${_tieuDeSearch}` : "";
        const res = await getAllRequest({
            data: { currentPage, pageSize, searchData }
        })
        if (res.status && res.result && res.pagination) {
            setData(res.result);
            setPagination(res.pagination);
        }
        setLoading(false);
    }

    const onDelete = async (id) => {
        setLoading(true);
        const res = await deleteRequest({ data: [id] });
        if (res && res.status) {
            setData(data => data.filter(item => item.id !== id));
            setPagination(pagination => ({
                ...pagination,
                total: (pagination.total || 0) - 1 >= 0 ? (pagination.total || 0) - 1 : 0
            }))
        }
        setLoading(false);
    }

    const onDownload = (record) => {
        const item = {
            date: moment().format(dateTimeFormat),
            title: `Danh sách cơ sở dự kiến thanh tra - ${record.tieuDe}`,
            url: `${API_CO_SO_SAN_XUAT_KINH_DOANH_KIEM_TRA_CO_SO}/export/${record.id}`
        }
        dispatch(handleCreate({
            username: account_current.name,
            process: item
        }))
    }

    useEffect(() => {
        if (visible) {
            getData(1);
            setTieuDeSearch(null);
            setRowSelected([]);
        }
    }, [visible]);

    const onPreview = (item) => {
        setItem(item);
        setVisibleList(true);
    }

    const onEdit = (item) => {
        setItem(item);
        setVisibleEdit(true);
    }

    const onShare = (item) => {
        setItem(item);
        setVisibleShare(true);
    }

    const onOk = async (accounts = []) => {
        setLoading(true);
        const res = await shareRequest({
            data: {
                idKiemTraCoSo: item.id,
                nguoiDung: accounts.map(acc => ({ name: acc.name, isAddNew: acc.isAddNew, isUpdate: acc.isUpdate, isDownload: acc.isDownload, isDelete: acc.isDelete }))
            }
        })
        if (res && res.status && Array.isArray(res.result)) {
            setData(data => data.map(_item => _item.id === item.id ? { ..._item, listChiaSe: res.result } : _item));
            setVisibleShare(false);
            setLoading(false);
        }
    }

    const onUpdateList = async () => {
        const item = rowSelected[0];
        if (item) {
            const { listCoSo } = item;
            setLoading(true);
            const res = await updateRequest({ data: { ...item, listCoSo: deduplicate([...listCoSo, ...(coSoSelected.map(id => ({ id })))], "id") } });
            if (res && res.status) {
                onCancel();
            }
            setLoading(false);
        }
    }

    const allowAction = (item) => {
        if (item.nguoiTao === account_current.name) {
            return {
                edit: action.edit,
                delete: action.delete,
                download: action.download,
                view: action.view,
                share: action.share,
            }
        }
        else {
            const allow = item.listChiaSe.find(share => share.name === account_current.name)
            if (!allow) {
                return {
                    edit: false,
                    delete: false,
                    download: false,
                    view: false,
                    share: false,
                }
            }
            else {
                return {
                    edit: action.edit && allow.isUpdate,
                    delete: action.delete && allow.isDelete,
                    download: action.download && allow.isDownload,
                    view: action.view,
                    share: false,
                }
            }
        }
    }

    const countAction = () => {
        return data.filter(item => Object.keys(allowAction(item)).filter(key => allowAction(item)[key])).length;
    };

    return <Fragment>
        <ShareAccount
            visible={visibleShare}
            data={item && item.listChiaSe && Array.isArray(item.listChiaSe) ? item.listChiaSe : []}
            onCancel={() => {
                setVisibleShare(false);
            }}
            onOk={onOk}
            key={`${visibleShare}-${item && item.id}`}
        />
        <ModalListCoSo
            key={item && item.id ? item.id : "md-lcs-not-id"}
            visible={item && (visibleList || visibleEdit)}
            onCancel={() => {
                setVisibleList(false)
                setVisibleEdit(false)
            }}
            data={item}
            edit={visibleEdit}
        />
        <AntModal
            width={isUpdate ? 500 : 1000}
            visible={item && (visibleList || visibleShare || visibleEdit) ? false : visible}
            onCancel={onCancel}
            style={{ top: 50 }}
            title="Danh sách cơ sở dự kiến thanh tra"
            footer={[
                <Button onClick={onCancel} ><i className="fa fa-times m-r-5" />Đóng</Button>,
                <Button onClick={onUpdateList} disabled={!isUpdate || rowSelected.length === 0} type="primary"><i className="fa fa-save m-r-5" />Lưu</Button>
            ]}
        >
            <CommonFieldset className="m-b-10">
                <div className="row">
                    <div className="col-md-6">
                        <Input.Search
                            className="input-round"
                            placeholder="Tìm kiếm... (Tiêu đề)"
                            onSearch={value => {
                                setTieuDeSearch(value);
                                getData(1, pagination.pageSize || 10, value);
                            }}
                        />
                    </div>
                </div>
            </CommonFieldset>
            <ConfigProvider renderEmpty={() => <Empty description="Không có dữ liệu" />}>
                <Table
                    rowSelection={isUpdate ? {
                        type: "radio",
                        selectedRowKeys: rowSelected.map(item => item.id),
                        onChange: (s, rows) => {
                            setRowSelected(rows)
                        }
                    } : undefined}
                    loading={loading}
                    rowKey="id"
                    columns={[
                        {
                            title: "STT",
                            width: 50,
                            align: "center",
                            render: (_, r, i) => {
                                const { currentPage, pageSize } = pagination;
                                return (((currentPage || 1) - 1) * (pageSize || 10)) + i + 1;
                            }
                        },
                        {
                            title: "Tiêu đề",
                            dataIndex: "tieuDe"
                        },
                        {
                            title: "Ghi chú",
                            dataIndex: "ghiChu"
                        },
                        ...(
                            !isUpdate && countAction() > 0 ? [
                                {
                                    title: "Thao tác",
                                    align: "center",
                                    width: Object.keys(action).length * 45,
                                    render: (_, item) => {
                                        const _allowAction = allowAction(item);
                                        return <Fragment>
                                            {
                                                _allowAction.edit &&
                                                <Tooltip title="Chỉnh sửa">
                                                    <Button type="primary" className="m-r-5" shape="circle" onClick={() => onEdit(item)}>
                                                        <i className="fa fa-pencil" />
                                                    </Button>
                                                </Tooltip>
                                            }
                                            {
                                                _allowAction.delete &&
                                                <Tooltip title="Xóa">
                                                    <Popconfirm title="Bạn chắc chắn muốn xóa?" onConfirm={() => onDelete(item.id)}>
                                                        <Button type="danger" className="m-r-5" shape="circle">
                                                            <i className="fa fa-trash" />
                                                        </Button>
                                                    </Popconfirm>
                                                </Tooltip>
                                            }
                                            {
                                                _allowAction.download &&
                                                <Tooltip title="Tải danh sách">
                                                    <Button type="success" className="m-r-5" onClick={() => onDownload(item)} shape="circle">
                                                        <i className="fa fa-download" />
                                                    </Button>
                                                </Tooltip>
                                            }
                                            {
                                                _allowAction.view &&
                                                <Tooltip title="Xem danh sách cơ sở">
                                                    <Button className="m-r-5" shape="circle" onClick={() => onPreview(item)}>
                                                        <i className="fa fa-eye" />
                                                    </Button>
                                                </Tooltip>
                                            }
                                            {
                                                _allowAction.share &&
                                                <Tooltip title="Chia sẻ">
                                                    <Button className="m-r-5" shape="circle" type="primary" onClick={() => onShare(item)}>
                                                        <i className="fa fa-share-alt" />
                                                    </Button>
                                                </Tooltip>
                                            }
                                        </Fragment>
                                    }
                                }
                            ] : []
                        )
                    ]}
                    size="small"
                    dataSource={data}
                    bordered
                    pagination={{
                        size: "default",
                        defaultCurrent: 1,
                        showSizeChanger: true,
                        pageSizeOptions: CONST_PAGE_SIZE_OPTIONS,
                        simple: false,
                        showTotal: (total, range) => `Hiển thị từ ${range[0]} - ${range[1]} / ${total}`,
                        ...pagination
                    }}
                    onChange={(pagination) => {
                        getData(pagination.current, pagination.pageSize)
                    }}
                />
            </ConfigProvider>
        </AntModal>
    </Fragment>
}

export default ModalList;