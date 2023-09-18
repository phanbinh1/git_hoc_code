import React, { Fragment, useState } from "react";
import { Modal, Button, Tooltip } from "antd";
import { CONST_BTN_SIZE_DEFAULT } from "./"
import { findFirstScrollParent } from "../../../constants/main";

const ModalConfirm = ({
    onCancel,
    onOk,

    title,
    okText,
    okType,
    cancelText,

    tooltip,
    disabled,

    beforeText,
    text,
    afterText,
    iconClass,
    btnType,
    onMouseEnter,
    onMouseLeave,
    shape
}) => {
    const [visible, setVisible] = useState(false);
    return <Fragment>
        <Modal
            key="modalAll"
            title={null}
            footer={null}
            visible={visible}
            closable={false}
            onCancel={() => {
                onCancel && onCancel();
                setVisible(false);
            }}
            className="ant-modal-confirm ant-modal-confirm-confirm"
            width={415}
            style={{ top: 50 }}
        >
            <div className="ant-modal-confirm-body-wrapper">
                <div className="ant-modal-confirm-body">
                    <span className="anticon anticon-question-circle "><i className="fa fa-check-circle" /></span>
                    <span className="ant-modal-confirm-title">Xác nhận</span>
                    <span className="ant-modal-confirm-content">{title}</span>
                </div>
                <div className="ant-modal-confirm-btns">
                    <Button key="1" onClick={() => {
                        onCancel && onCancel();
                        setVisible(false);
                    }}>
                        <i className="fa fa-times m-r-10" />{cancelText}
                    </Button>
                    <Button type={okType || "danger"} key="2" onClick={() => {
                        onOk && onOk();
                        setVisible(false);
                    }}>
                        <i className="fa fa-check m-r-10" />{okText}
                    </Button>
                </div>
            </div>
        </Modal>
        <Tooltip title={tooltip} getPopupContainer={e => findFirstScrollParent(e)}>
            <Button
                className="list-action-item"
                size={CONST_BTN_SIZE_DEFAULT}
                shape={shape}
                type={btnType}
                disabled={disabled}
                onClick={() => setVisible(true)}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <span className="header-action-icon"><i className={iconClass} /></span>
                <span className="header-action-label">{beforeText}{text}{afterText}</span>
            </Button>
        </Tooltip>
    </Fragment>
}

export default ModalConfirm;