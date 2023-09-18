import React from 'react';
import { Form, Input } from "antd";
import { sizeDefault } from "./";

export default ({
    input,
    checkValid = false,
    disabled = false,
    placeholder,
    className = "",
    id,
    label,
    size = sizeDefault,
    allowClear = true,
    meta: { touched, error, warning }
}) => {
    var validateStatus = "";
    var help = "";
    if (touched && checkValid) {
        if (error) { validateStatus = "error"; help = error }
        else if (warning) { validateStatus = "warning"; help = warning }
    }
    return (<React.Fragment>
        <Form.Item
            hasFeedback
            validateStatus={validateStatus}
            help={help}
            label={label && <span className={checkValid ? "ant-form-item-required" : ""}>{label}</span>}
        >
            <Input.Password
                {...input}
                allowClear={disabled ? false : allowClear}
                id={id}
                className={className}
                placeholder={placeholder}
                disabled={disabled}
                size={size}
            />
        </Form.Item>
    </React.Fragment>)
}