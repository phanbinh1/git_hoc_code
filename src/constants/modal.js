import { Modal, message } from 'antd';
import React from "react";

export const createMessage = (content = "Đang tải...", type = "loading") => {
    var msg;
    switch (type) {
        case "info":
            msg = message.info(content, 0);
            break;
        case "error":
            msg = message.error(content, 0);
            break;
        case "warn":
            msg = message.warn(content, 0);
            break;
        default:
            msg = message.loading(content, 0);
            break;
    }
    return msg;
}

export const info = (title = "Thông báo", content = "Bạn đã hết thời hạn truy cập!", okText = "Đồng ý", onOk = () => { }) => {
    Modal.info({
        title: title,
        content: content,
        okText: okText,
        okType: 'success',
        onOk() { onOk(); },
        onCancel() { onOk(); }
    });
}

export const error = (title = "Thông báo", content = "Bạn đã hết thời hạn truy cập!", okText = "Đồng ý", onOk = () => { }) => {
    Modal.error({
        title: title,
        content: content,
        okText: okText,
        okType: 'success',
        onOk() { onOk(); },
        onCancel() { onOk(); }
    });
}

export const confirm = (title = "", content = "", onOk = () => { }, onCancel = () => { }, okText = <span><i className="fa fa-check-circle m-r-10" />Đồng ý</span>, cancelText = <span><i className="fa fa-times m-r-10" />Hủy</span>) => {
    Modal.confirm({
        title: title,
        content: content,
        okType: 'success',
        okText,
        cancelText,
        onOk() {
            typeof onOk === "function" && onOk();
        },
        onCancel() {
            typeof onCancel === "function" && onCancel();
        },
    });
}