import React from 'react';
import { Form, InputNumber } from "antd";
import { sizeDefault } from "./";

export default ({
    input,
    checkValid = false,
    disabled = false,
    placeholder,
    className = "form-control",
    id,
    label,
    size = sizeDefault,
    allowClear = true,
    min = 0,
    max,
    _onBlur,
    meta: { touched, error, warning }
}) => {
    var validateStatus = "";
    var help = "";
    if (touched && checkValid) {
        if (error) { validateStatus = "error"; help = error }
        else if (warning) { validateStatus = "warning"; help = warning }
    }
    return <Form.Item
        hasFeedback
        validateStatus={validateStatus}
        help={help}
        label={label && <span className={checkValid ? "ant-form-item-required" : ""}>{label}</span>}
    >
        <InputNumber
            {...input}
            onBlur={() => {
                _onBlur && typeof _onBlur === "function" && _onBlur();
            }}
            min={min}
            max={max}
            id={id}
            allowClear={disabled ? false : allowClear}
            className={className}
            placeholder={placeholder}
            disabled={disabled}
            style={{ width: '100%', marginTop: "3px" }}
            size={size}
        />
    </Form.Item>
}