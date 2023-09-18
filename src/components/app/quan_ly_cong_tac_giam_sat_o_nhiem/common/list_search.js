import React, { Fragment, useState } from "react";
import { Button, Modal, Table, Input } from "antd";
import { useDispatch } from "react-redux";
import * as actBieuMau from "./../../../../actions/app/quan_ly_bieu_mau";
import * as constants from "./../../../../constants/constants";
import { CommonPagination } from "../../../common";

const ListSearch = ({
    onOk,
    visible,
    onCancel
}) => {
    const [search, setSearch] = useState("");
    const [selectedRows, setSelectedRows] = useState([]);
    const [list, setList] = useState([]);
    const [pagination, setPagination] = useState(constants.CONST_PAGINATION);

    const dispatch = useDispatch();
    const getDanhSachBieuMau = object => dispatch(actBieuMau.getAllRequest({ ...object, pageKey: "PAGE_KEY_POPUP_LIST_BIEU_MAU" }));

    const onChange = (_pagination = pagination, _search = search) => {
        getDanhSachBieuMau({
            data: {
                ..._pagination,
                ...(_search && _search.trim() !== "" ? { searchData: `tenBieuMau=${_search}` } : {}),
                sortData: "stt asc"
            },
            requestSuccess: (res) => {
                setPagination(_pagination);
                setList(res.result);
            }
        });
    }

    return <Fragment>
        <Modal
            title="Danh sách Quyết định/ Biên bản"
            style={{ top: 50 }}
            visible={visible}
            onCancel={onCancel}
            width={900}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    <i className="fa fa-times m-r-10" />Đóng
                </Button>,
                <Button
                    key="ok"
                    type="primary"
                    disabled={selectedRows.length !== 1}
                    onClick={() => {
                        onOk && onOk(selectedRows[0]);
                    }}
                >
                    <i className="fa fa-check m-r-10" />Lập Quyết định/ Biên bản
                </Button>
            ]}
        >
            <CommonPagination
                firstLoad={true}
                onChange={onChange}
                paginationKey="PAGE_KEY_POPUP_LIST_BIEU_MAU"
            />
            <Table
                title={() => {
                    return <Input.Search
                        onSearch={(value) => {
                            setSearch(value);
                            value !== search && onChange({ ...pagination, currentPage: 1 }, value);
                        }}
                        placeholder="Tìm kiếm ... (Nhập tên mẫu quyết định/ biên bản)"
                        allowClear
                        className="input-round"
                    />
                }}
                size="small"
                bordered
                pagination={false}
                rowKey="id"
                dataSource={list}
                columns={[
                    {
                        title: "STT", render: (_, r, index) => {
                            const { currentPage, pageSize } = pagination;
                            return (currentPage - 1) * pageSize + index + 1;
                        },
                        width: 50,
                        align: "center"
                    },
                    { title: "Tên biểu mẫu", dataIndex: "tenBieuMau" },
                    { title: "Ghi chú", dataIndex: "ghiChu" }
                ]}
                rowSelection={{
                    selectedRowKeys: selectedRows.map(item => item.id),
                    type: "radio",
                    onChange: (_, selectedRows) => { setSelectedRows(selectedRows) }
                }}
            />
            <CommonPagination
                firstLoad={true}
                onChange={onChange}
                paginationKey="PAGE_KEY_POPUP_LIST_BIEU_MAU"
            />
        </Modal>
    </Fragment>
}

export default ListSearch;