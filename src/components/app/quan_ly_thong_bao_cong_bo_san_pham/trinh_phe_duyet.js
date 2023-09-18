import React, { Fragment, useState, useEffect } from "react";
import { Modal, Button, Input } from "antd";

const ThongBaoCongBoSanPhamTrinhPheDuyet = ({
    tieuDeDefault,
    visible,
    onCancel,
    onConfirm,
    allowUpdateTieuDe = false
}) => {
    const [tieuDe, setTieuDe] = useState(tieuDeDefault);
    useEffect(() => {
        setTieuDe(tieuDeDefault)
    }, [tieuDeDefault])
    return <Fragment>
        <Modal
            key="modalTrinhPheDuyet"
            title={null}
            footer={null}
            closable={false}
            visible={visible}
            onCancel={onCancel}
            className="ant-modal-confirm ant-modal-confirm-confirm"
            style={{ top: 50 }}
            destroyOnClose
        >
            <div className="ant-modal-confirm-body-wrapper">
                <div className="ant-modal-confirm-body">
                    <span className="anticon anticon-question-circle "><i className="fa fa-question-circle-o" /></span>
                    <span className="ant-modal-confirm-title">Xác nhận</span>
                    <div className="ant-modal-confirm-content">
                        <p>Bạn chắc chắn muốn trình phê duyệt?</p>
                        {
                            allowUpdateTieuDe &&
                            <Fragment>
                                <label>Tiêu đề</label>
                                <Input.TextArea
                                    placeholder="Tiêu đề"
                                    value={tieuDe}
                                    onChange={e => setTieuDe(e.target.value)}
                                />
                            </Fragment>
                        }
                    </div>
                </div>
                <div className="ant-modal-confirm-btns">
                    <Button onClick={onCancel}><i className="fa fa-times m-r-10" />Hủy</Button>
                    <Button type="primary" disabled={!tieuDe || tieuDe.trim() === ""} onClick={() => onConfirm({ tieuDe })}>
                        <i className="fa fa-check m-r-10" />Xác nhận
                    </Button>
                </div>
            </div>
        </Modal>
    </Fragment >
}

export default ThongBaoCongBoSanPhamTrinhPheDuyet;