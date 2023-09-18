import React, { Fragment } from "react";
import { Button, Modal, Table, ConfigProvider, Tooltip, Dropdown, Menu, Empty } from "antd";
import { useDispatch } from "react-redux";
import moment from "moment";
import { CONST_TRANG_THAI } from "./";
import * as constants from "./../../../../constants/constants";
import * as actBieuMauDiKem from "./../../../../actions/app/quan_ly_bieu_mau/bieu_mau";
import * as controll from "./../../../../constants/controll";
import ActionBar from "./action_bar";

const List = ({
    readOnly,
    listBieuMauDaLap,
    setListBieuMauDaLap,
    setVisibleDraw,
    setVisible,
    setBieuMau,
    setNoiDung,
    search,
    setSearch,
    setVisibleAttachFile,
}) => {
    const dispatch = useDispatch();
    const deleteRequest = (object) => dispatch(actBieuMauDiKem.deleteRequest(object))

    return <Fragment>
        <div className="row">
            <div className="col-md-12">
                <ActionBar
                    search={search}
                    onChange={value => setSearch(value)}
                    readOnly={readOnly}
                    setVisible={setVisible}
                />
                <ConfigProvider renderEmpty={() => <Empty description="Không có dữ liệu" />}>
                    <Table
                        rowKey="id"
                        pagination={{
                            size: "default",
                            showSizeChanger: true,
                            pageSizeOptions: constants.CONST_PAGE_SIZE_OPTIONS,
                        }}
                        size="small"
                        columns={[
                            { title: "STT", width: 50, dataIndex: "stt" },
                            {
                                title: "Tên Quyết định/ Biên bản",
                                render: (_, item) => {
                                    return item.trangThaiBieuMau === CONST_TRANG_THAI.DAHOANTHIEN ?
                                        <span
                                            className="link"
                                            onClick={() => {
                                                setBieuMau({ ...item, readOnly: true });
                                                setNoiDung(item.maHtml);
                                                setVisible(false);
                                                setVisibleDraw(true);
                                            }}
                                        >
                                            <Tooltip title="Bản chính thức"><i className="fa fa-check-circle m-r-10 c-pointer" style={{ color: "var(--bg-primary)" }} /></Tooltip>
                                            {item.tenBieuMau}
                                        </span>
                                        : <Dropdown
                                            trigger={["contextMenu"]}
                                            overlay={<Menu>
                                                <Menu.Item
                                                    key="delete"
                                                    onClick={() => {
                                                        Modal.confirm({
                                                            title: "Xác nhận",
                                                            content: "Bạn chắc chắn muốn xóa?",
                                                            okButtonProps: { type: "danger" },
                                                            okText: <Fragment><i className="fa fa-check m-r-10" />Đồng ý</Fragment>,
                                                            cancelText: <Fragment><i className="fa fa-times m-r-10" />Hủy</Fragment>,
                                                            onOk: () => {
                                                                deleteRequest({
                                                                    data: [item.id],
                                                                    requestSuccess: () => {
                                                                        setListBieuMauDaLap(list => {
                                                                            let _list = [...list];
                                                                            const index = list.findIndex(val => val.id === item.id);
                                                                            _list.splice(index, 1);
                                                                            return [..._list];
                                                                        });
                                                                        setVisibleDraw(false)
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }}
                                                >
                                                    <i className="fa fa-trash m-r-10" />Xóa
                                                </Menu.Item>
                                                <Menu.Item
                                                    key="edit"
                                                    onClick={() => {
                                                        setBieuMau({ ...item, readOnly: false });
                                                        setNoiDung(item.maHtml);
                                                        setVisible(false);
                                                        setVisibleDraw(true);
                                                    }}
                                                >
                                                    <i className="fa fa-pencil m-r-10" />Chỉnh sửa
                                                </Menu.Item>
                                            </Menu>}
                                        >
                                            <span
                                                className="link"
                                                onClick={() => {
                                                    setBieuMau({ ...item, readOnly: false });
                                                    setNoiDung(item.maHtml);
                                                    setVisible(false);
                                                    setVisibleDraw(true);
                                                }}
                                            >
                                                <Tooltip title="Bản nháp"><i className="fa fa-minus-circle m-r-10 c-pointer" style={{ color: "var(--bg-danger)" }} /></Tooltip>
                                                {item.tenBieuMau}
                                            </span>
                                        </Dropdown>
                                        ;
                                }
                            },
                            {
                                title: "Ngày tạo",
                                render: (_, item) => {
                                    return moment(item.ngayTao).format(controll.dateTimeFormat);
                                }
                            },
                            {
                                render: (_, item) => {
                                    return <Fragment>
                                        <Button
                                            className="m-r-5"
                                            onClick={() => {
                                                setBieuMau({
                                                    ...item,
                                                    ngayTao: null,
                                                    id: undefined
                                                });
                                                setNoiDung(item.maHtml);
                                                setVisible(false);
                                                setVisibleDraw(true);
                                            }}
                                        >
                                            Sử dụng lại
                                        </Button>
                                    </Fragment>
                                }

                            }
                        ]}
                        dataSource={listBieuMauDaLap.filter(item => item.tenBieuMau.toLowerCase().indexOf(search.toLowerCase()) >= 0).map((item, i) => ({ ...item, stt: i + 1 }))}
                    />
                </ConfigProvider>
            </div>
        </div>
    </Fragment >
}

export default List;