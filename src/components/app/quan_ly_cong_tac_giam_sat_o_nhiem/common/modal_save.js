import React, { Fragment, useState } from "react";
import { Modal, Button } from "antd";

const ModalSave = ({
    onConfirm,
    onNotConfirm,
    children
}) => {
    const [visible, setVisible] = useState(false);
    return <Fragment>
        <Modal
            key="modalAll"
            title={null}
            footer={null}
            closable={false}
            visible={visible}
            onCancel={() => setVisible(false)}
            className="ant-modal-confirm ant-modal-confirm-confirm"
            style={{ top: 50 }}
            width={600}
        >
            <div className="ant-modal-confirm-body-wrapper">
                <div className="ant-modal-confirm-body">
                    <span className="anticon anticon-question-circle "><i className="fa fa-check-circle" /></span>
                    <span className="ant-modal-confirm-title">Chú ý</span>
                    <span className="ant-modal-confirm-content">
                        Sau khi <b><i>Lưu bản chính</i></b> sẽ không thể cập nhật nội dung.<br />
                        Bạn có thể chọn <b><i>Lưu bản nháp</i></b> để tiện việc chỉnh sửa trước khi lưu làm bản chính.
                    </span>
                </div>
                <div className="ant-modal-confirm-btns">
                    <Button type="danger" key="1" onClick={onNotConfirm} style={{marginBottom:"10px"}}>
                        <i className="fa fa-trash m-r-10" />Lưu thành bản nháp
                    </Button>
                    <Button type="primary" key="2" onClick={onConfirm} style={{marginBottom:"10px"}}>
                        <i className="fa fa-save m-r-10" />Lưu thành bản chính
                    </Button>
                    <Button key="3" onClick={() => setVisible(false)} style={{marginBottom:"10px"}}>
                        <i className="fa fa-times m-r-10" />Hủy
                    </Button>
                </div>
            </div>
        </Modal>
        <Button
            className="m-r-10"
            type="primary"
            key="save"
            onClick={() => setVisible(true)}
        >
            {children || <Fragment><i className="fa fa-save m-r-10" />Lưu</Fragment>}
        </Button>
    </Fragment>
}

export default ModalSave;