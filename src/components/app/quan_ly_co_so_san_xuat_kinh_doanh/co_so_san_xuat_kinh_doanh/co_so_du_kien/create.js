import React, { Fragment, useState, useEffect } from "react";
import { Modal as AntModal, Button, Form, Input, } from "antd";
import { createRequest } from "./../../../../../actions/app/quan_ly_co_so_san_xuat_kinh_doanh/co_so_san_xuat_kinh_doanh/co_so_du_kien";

const ModalCreate = ({
    visible,
    onCancel,
    coSoSelected = [],
    tieuDe,
    ghiChu,
    id,
}) => {
    const [_id, setId] = useState(id);
    const [_tieuDe, setTieuDe] = useState(tieuDe);
    const [_ghiChu, setGhiChu] = useState(ghiChu);

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (visible) {
            setId(undefined);
            setTieuDe(undefined);
            setGhiChu(undefined);
        }
        else {
            setId(id);
            setTieuDe(tieuDe);
            setGhiChu(ghiChu);
        }
    }, [tieuDe, ghiChu, visible]);

    const _onCancel = () => {
        if (tieuDe === _tieuDe && ghiChu === _ghiChu) {
            onCancel();
        }
        else {
            AntModal.confirm({
                title: "Xác nhận!",
                content: "Bạn chắc chắn muốn thoát?",
                onOk: onCancel,
                okText: <Fragment><i className="fa fa-check m-r-5" />Đồng ý</Fragment>,
                cancelText: <Fragment><i className="fa fa-times m-r-5" />Hủy</Fragment>
            })
        }
    }

    const _onSave = () => {
        const data = {
            id: _id,
            tieuDe: _tieuDe,
            ghiChu: _ghiChu,
            listCoSo: coSoSelected.map(id => ({ id })),
        }
        setLoading(true);
        createRequest({
            data,
            requestSuccess: () => {
                onCancel();
                setLoading(false);
            },
            requestError: () => setLoading(false)
        })
    }

    return <Fragment>
        <AntModal
            title="Tạo mới danh sách cơ sở dự kiến thanh tra"
            visible={visible}
            onCancel={_onCancel}
            style={{ top: 50 }}
            width={400}
            destroyOnClose
            footer={[
                <Button loading={loading} disabled={!_tieuDe || _tieuDe.trim() === ""} type="primary" onClick={_onSave}>{loading ? "Đang lưu..." : <Fragment><i className="fa fa-save m-r-10" />Lưu</Fragment>}</Button>,
                <Button onClick={_onCancel}><i className="fa fa-times m-r-10" /> Hủy</Button>
            ]}
        >
            <Form layout="vertical">
                <Form.Item label="Tiêu đề">
                    <Input.TextArea value={_tieuDe} onChange={e => setTieuDe(e.target.value)} placeholder="Tiêu đề" autoSize />
                </Form.Item>
                <Form.Item label="Ghi chú">
                    <Input.TextArea value={_ghiChu} onChange={e => setGhiChu(e.target.value)} placeholder="Ghi chú" autoSize />
                </Form.Item>
            </Form>
        </AntModal>
    </Fragment>
}

export default ModalCreate;
