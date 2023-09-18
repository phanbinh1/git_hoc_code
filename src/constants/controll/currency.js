import React from 'react';
import { Form, InputNumber } from "antd";
import { sizeDefault } from "./";
import { read } from '../../components/common/common_currency';

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
    showText,
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
            <InputNumber
                {...input}
                onBlur={(e) => input.onBlur}
                id={id}
                min={min}
                max={max}
                allowClear={disabled ? false : allowClear}
                className={className}
                placeholder={placeholder}
                disabled={disabled}
                style={{ width: '100%', marginTop: "3px" }}
                size={size}
                formatter={value => `${value}`.split(".").join(",").replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                parser={value => value ? value.split(" ").join("").split(".").join("").replace(",", ".").split(",").join("").split("").filter(val => val === "," || val === "." || !isNaN(val)).join("") : undefined}
            />
        </Form.Item>
        {showText && <div style={{ textAlign: "right", fontSize: 10, fontStyle: "italic", color: "red" }}>{read(input.value || 0)}</div>}
    </React.Fragment>)
}