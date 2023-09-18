import React, { Fragment, useState } from "react";
import { Modal, Button, Input } from "antd";

const CommonPheDuyet = ({
    visible,
    onCancel,
    showOk = false,
    showConfirm = true,
    showNotConfirm = true,
    onConfirm,
    onNotConfirm,
    onOk,

    confirmText = <Fragment><i className="fa fa-check-circle m-r-10" />Phê duyệt</Fragment>,
    notConfirmText = <Fragment><i className="fa fa-minus-circle m-r-10" />Từ chối</Fragment>,
    okText = <Fragment><i className="fa fa-check-circle m-r-10" />Xác nhận</Fragment>,

    title = "Phê duyệt",
    content = "Vui lòng chọn trạng thái phê duyệt",
    labelConfirmText = "Bạn chắc chắn muốn phê duyệt?",
    labelNotConfirmText = "Bạn chắc chắn muốn không phê duyệt?"
}) => {
    const [visibleKhongPheDuyet, setVisibleKhongPheDuyet] = useState(false);
    const [visiblePheDuyet, setVisiblePheDuyet] = useState(false);
    const [lyDo, setLyDo] = useState("");
    return <Fragment>
        <Modal
            key="modalNotConfirm"
            title={null}
            footer={null}
            closable={false}
            visible={visibleKhongPheDuyet}
            onCancel={() => setVisibleKhongPheDuyet(false)}
            className="ant-modal-confirm ant-modal-confirm-confirm"
            style={{ top: 50 }}
            destroyOnClose
        >
            <div className="ant-modal-confirm-body-wrapper">
                <div className="ant-modal-confirm-body">
                    <span className="anticon anticon-question-circle "><i className="fa fa-question-circle-o" /></span>
                    <span className="ant-modal-confirm-title">Xác nhận</span>
                    <div className="ant-modal-confirm-content">
                        <div>
                            {labelNotConfirmText}
                        </div>
                        <div>
                            Vui lòng nhập lý do
                        </div>
                        <Input.TextArea
                            placeholder="Lý do"
                            value={lyDo}
                            onChange={e => setLyDo(e.target.value)}
                        />
                    </div>
                </div>
                <div className="ant-modal-confirm-btns">
                    <Button onClick={() => setVisibleKhongPheDuyet(false)}>
                        <i className="fa fa-times m-r-10" />Hủy
                    </Button>
                    <Button type="danger" disabled={!lyDo || lyDo.trim() === ""} onClick={() => {
                        onNotConfirm({ lyDo });
                        setVisibleKhongPheDuyet(false);
                    }}>
                        <i className="fa fa-check m-r-10" />Xác nhận
                    </Button>
                </div>
            </div>
        </Modal>

        <Modal
            key="modalConfirm"
            title={null}
            footer={null}
            closable={false}
            visible={visiblePheDuyet}
            onCancel={() => setVisiblePheDuyet(false)}
            className="ant-modal-confirm ant-modal-confirm-confirm"
            destroyOnClose
            style={{ top: 50 }}
        >
            <div className="ant-modal-confirm-body-wrapper">
                <div className="ant-modal-confirm-body">
                    <span className="anticon anticon-question-circle "><i className="fa fa-question-circle-o" /></span>
                    <span className="ant-modal-confirm-title">Xác nhận</span>
                    <div className="ant-modal-confirm-content">
                        <div>
                            {labelConfirmText}
                        </div>
                    </div>
                </div>
                <div className="ant-modal-confirm-btns">
                    <Button onClick={() => setVisiblePheDuyet(false)}>
                        <i className="fa fa-times m-r-10" />Hủy
                    </Button>
                    <Button type="primary" onClick={() => {
                        onConfirm();
                        setVisiblePheDuyet(false);
                    }}>
                        <i className="fa fa-check m-r-10" />Xác nhận
                    </Button>
                </div>
            </div>
        </Modal>

        <Modal
            key="modalAll"
            title={null}
            footer={null}
            closable={false}
            visible={visible}
            onCancel={onCancel}
            className="ant-modal-confirm ant-modal-confirm-confirm"
            style={{ top: 50 }}
        >
            <div className="ant-modal-confirm-body-wrapper">
                <div className="ant-modal-confirm-body">
                    <span className="anticon anticon-question-circle "><i className="fa fa-check-circle" /></span>
                    <span className="ant-modal-confirm-title">{title}</span>
                    <span className="ant-modal-confirm-content">{content}</span>
                </div>
                <div className="ant-modal-confirm-btns">
                    <Button key="3" onClick={onCancel}>
                        <i className="fa fa-times m-r-10" />Hủy
                    </Button>
                    {
                        showConfirm && <Button type="primary" key="1" onClick={() => setVisiblePheDuyet(true)}>
                            {confirmText}
                        </Button>
                    }
                    {
                        showNotConfirm && <Button type="danger" key="2" onClick={() => setVisibleKhongPheDuyet(true)}>
                            {notConfirmText}
                        </Button>
                    }
                    {
                        showOk && <Button type="primary" key="2" onClick={onOk}>
                            {okText}
                        </Button>
                    }
                </div>
            </div>
        </Modal>
    </Fragment>
}

export default CommonPheDuyet;