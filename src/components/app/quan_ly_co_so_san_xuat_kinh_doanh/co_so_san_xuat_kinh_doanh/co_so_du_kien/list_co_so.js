import React, { Fragment, useState } from "react";
import { Modal as AntModal, Button, Table, ConfigProvider, Empty, Input, Form } from "antd";

const ModalListCoSo = ({
    visible,
    onCancel,
    data,
    edit,
    onOk
}) => {

    const [_tieuDe, setTieuDe] = useState(data && data.tieuDe);
    const [_ghiChu, setGhiChu] = useState(data && data.ghiChu);

    return <AntModal
        visible={visible}
        onCancel={onCancel}
        footer={[
            <Button onClick={onCancel}><i className="fa fa-times m-r-5" />Đóng</Button>,
            <Button
                onClick={() => { onOk && onOk({ ...data, tieuDe: _tieuDe, ghiChu: _ghiChu }) }}
                disabled={!edit}
                type="primary"
            >
                <i className="fa fa-save m-r-5" />
                Lưu thay đổi
            </Button>,
        ]}
        title="Danh sách cơ sở"
        width={1000}
        style={{ top: 50 }}
    >
        {
            edit && <Fragment>
                <Form layout="vertical">
                    <Form.Item label="Tiêu đề">
                        <Input.TextArea value={_tieuDe} onChange={e => setTieuDe(e.target.value)} placeholder="Tiêu đề" autoSize />
                    </Form.Item>
                    <Form.Item label="Ghi chú">
                        <Input.TextArea value={_ghiChu} onChange={e => setGhiChu(e.target.value)} placeholder="Ghi chú" autoSize />
                    </Form.Item>
                </Form>
            </Fragment>
        }
        <ConfigProvider renderEmpty={() => <Empty description="Không có dữ liệu" />}>
            <Table
                className="table-custom"
                bordered
                size="small"
                columns={[
                    {
                        title: "STT",
                        width: 50,
                        align: "center",
                        render: (t, r, i) => i + 1
                    },
                    {
                        title: "Tên cơ sở",
                        dataIndex: "tenCoSo"
                    },
                    {
                        title: "Tên chủ cơ sở",
                        dataIndex: "tenChuCoSo"
                    },
                    {
                        title: "Địa chỉ cơ sở",
                    },
                    {
                        title: "STT"
                    }
                ]}
                dataSource={data && data.listCoSo && Array.isArray(data.listCoSo) ? data.listCoSo : []}
                pagination={false}
            />
        </ConfigProvider>
    </AntModal>
}

export default ModalListCoSo;