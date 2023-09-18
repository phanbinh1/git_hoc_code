import React, { Fragment, useState, useEffect } from "react";
import { Modal, Form, Input, AutoComplete, Spin, Table } from "antd";
import { useSelector } from "react-redux";
import { getFiles } from "./../../../../actions";
import { HoSoMotCua_KetQuaThamDinh } from "./../../../../actions/app/van_ban_dieu_hanh";
import * as message from "./../../../../constants/message";

let timeout = null;
const TrinhKy = ({
    entityId,
    callback,
    visible,
    onCancel,
    attachEntityType
}) => {

    const [files, setFiles] = useState([]);
    useEffect(() => {
        if (visible && entityId) {
            getFiles({
                data: {
                    attachEntityType,
                    entityId,
                },
                requestSuccess: (res) => {
                    const list = res.result;
                    if (Array.isArray(list)) {
                        setFiles(list.map(item => ({ ...item, uid: item.id })));
                    }
                }
            })
        }
    }, [entityId, visible]);

    const account_current = useSelector(state => state.core.account_current);

    const [rowSelecteds, setRowSelecteds] = useState([]);
    const [loading, setLoading] = useState(false);

    const onOk = async () => {
        setLoading(true);
        const data = {
            emailNguoiNop: account_current.email,
            files: rowSelecteds.map(item => item.id),
            idHoSo: entityId,
        }
        const res = await HoSoMotCua_KetQuaThamDinh(data);
        if (res.status) {
            message.success({ content: "Đã trình ký văn bản" });
            callback && callback({
                status: true
            })
            onCancel()
        }
        else {
            message.error({ content: "Trình ký văn bản thất bại!" });
            callback && callback({ status: false })
        }
        setLoading(false);
    }
    return <Fragment>
        <Modal
            key="modal-trinh-ky"
            style={{ top: 50 }}
            title={"Xác nhận trả kết quả về một cửa!"}
            visible={visible}
            closable={!loading}
            onCancel={onCancel}
            cancelButtonProps={{ disabled: loading }}
            cancelText={<Fragment><i className="fa fa-times m-r-10" />Hủy</Fragment>}
            onOk={() => {
                rowSelecteds.length === 0 ?
                    Modal.confirm({
                        title: "Cảnh báo",
                        content: <Fragment>
                            Chưa có tài liệu nào được chọn<br />
                            Bạn chắc chắn muốn thao tác?
                        </Fragment>,
                        onOk,
                        okText: <Fragment><i className="fa fa-check m-r-5" />Đồng ý</Fragment>,
                        cancelText: <Fragment><i className="fa fa-times m-r-5" />Huỷ</Fragment>,
                    })
                    : onOk()
            }}
            // okButtonProps={{ disabled: loading || !tenHoSo || tenHoSo.trim() === "" || !nguoiNhanEmail || nguoiNhanEmail.trim() === "" }}
            okText={<Fragment><i className="fa fa-check m-r-10" />Xác nhận</Fragment>}
            destroyOnClose
        >
            <Spin spinning={loading}>
                <div className="ant-form-inline">
                    <Form.Item >
                        <Table
                            rowSelection={{
                                selectedRowKeys: rowSelecteds.map(item => item.id),
                                onChange: (keys, rows) => setRowSelecteds(rows)
                            }}
                            rowKey="id"
                            className="m-t-10"
                            pagination={false}
                            size="small"
                            columns={[
                                {
                                    title: "STT",
                                    render: (t, r, i) => i + 1,
                                    align: "center"
                                },
                                {
                                    title: "Tên file",
                                    dataIndex: "name"
                                }
                            ]}
                            dataSource={files}
                        />
                    </Form.Item>
                </div>
            </Spin>
        </Modal>
    </Fragment>
}

export default TrinhKy;