import { notification } from 'antd';

const parameterInit = { content: "", duration: 10, notifi: true, onClose: () => { }, placement: "bottomRight", className: "" };
export const success = (object = parameterInit) => {
    object = { ...parameterInit, ...object };
    object = { ...object, message: object.message ? object.message : object.content };
    notification.success({
        ...object,
        placement: object.placement,
        className: "notifi-success",
    })
}

export const error = (object = parameterInit) => {
    object = { ...parameterInit, ...object };
    object = { ...object, message: object.message ? object.message : object.content };
    notification.error({
        ...object,
        placement: object.placement,
        className: "notifi-error",
    })
}

export const warning = (object = parameterInit) => {
    if (!object.placement) {
        object.placement = "topRight";
    }
    object = { ...parameterInit, ...object };
    object = { ...object, message: object.message ? object.message : object.content };
    notification.warning({
        ...object,
        placement: object.placement,
        className: "notifi-warning",
    })
}

export const info = (object = parameterInit) => {
    object = { ...parameterInit, ...object };
    object = { ...object, message: object.message ? object.message : object.content };
    notification.info({
        ...object,
        placement: object.placement,
        className: "notifi-info",
    })
}

export const open = (object = parameterInit) => {
    object = { ...parameterInit, ...object };
    object = { ...object, message: object.message ? object.message : object.content };
    notification.open({
        ...object,
        placement: object.placement,
        className: object.className
    })
}

export const sync = (object = parameterInit) => {
    object = { ...parameterInit, placement: "bottomLeft", ...object };
    object = { ...object, message: object.message ? object.message : object.content };
    notification.open({
        ...object,
        placement: object.placement,
        className: "notifi-sync",
    })
}

export const close = (key) => {
    return notification.close(key);
}