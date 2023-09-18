import React from "react";
import { message } from 'antd';
import * as notification from "./notification";

const parameterInit = { content: "", duration: 5, notifi: true, onClose: () => { } };
const hiddenWhenClick = true;
const showBtnClose = true;
const content = ({ content, notifi }) => {
    return <React.Fragment>
        <div
            style={{ marginRight: showBtnClose ? "20px" : "0" }}
            onClick={hiddenWhenClick && !notifi ? () => message.destroy() : null}
        >
            {content}
        </div>
    </React.Fragment>
}

export const destroy = () => {
    message.destroy();
}

export const success = (parameter = parameterInit) => {
    message.destroy();
    parameter = { ...parameterInit, ...parameter }
    parameter.notifi ?
        notification.success({ ...parameter, message: content(parameter), duration: parameter.duration }) :
        message.success(content(parameter), parameter.duration, parameter.onClose)

};

export const error = (parameter = parameterInit) => {
    message.destroy();
    parameter = { ...parameterInit, ...parameter };
    parameter.notifi ?
        notification.error({ ...parameter, message: content(parameter), duration: parameter.duration }) :
        message.error(content(parameter), parameter.duration, parameter.onClose);
};

export const warning = (parameter = parameterInit) => {
    message.destroy();
    parameter = { ...parameterInit, ...parameter }
    parameter.notifi ?
        notification.warning({ ...parameter, message: content(parameter), duration: parameter.duration }) :
        message.warning(content(parameter), parameter.duration, parameter.onClose);
};

export const info = (parameter = parameterInit) => {
    message.destroy();
    parameter = { ...parameterInit, ...parameter }
    parameter.notifi ?
        notification.info({ ...parameter, message: content(parameter), duration: parameter.duration }) :
        message.info(content(parameter), parameter.duration, parameter.onClose);
};

export const loading = (parameter = parameterInit) => {
    message.destroy();
    parameter = { ...parameterInit, content: "Đang tải...", ...parameter }
    message.loading(parameter.content, parameter.duration, parameter.onClose);
};