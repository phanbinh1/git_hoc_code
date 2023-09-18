import React, { useEffect, useState } from 'react';
import { Form, Input } from "antd";
import { sizeDefault } from "./";

export default ({
    input: {
        value,
        onBlur,
        onFocus,
        name
    },
    onChange,
    readOnly,
    checkValid = false,
    disabled = false,
    placeholder,
    type = "text",
    className = "",
    id,
    label,
    size = sizeDefault,
    autoSize = { minRows: 2, maxRows: 6 },
    meta: { touched, error, warning }
}) => {
    var validateStatus = "";
    var help = "";
    if (touched && checkValid) {
        if (error) { validateStatus = "error"; help = error }
        else if (warning) { validateStatus = "warning"; help = warning }
    }

    const [_value, _setValue] = useState(value);

    useEffect(() => {
        _setValue(value);
    }, [value])

    return <Form.Item
        hasFeedback
        validateStatus={validateStatus}
        help={help}
        label={label && <span className={checkValid ? "ant-form-item-required" : ""}>{label}</span>}
        className="form-item-textarea"
    >
        <Input.TextArea
            value={_value}
            onBlur={onBlur}
            onFocus={onFocus}
            onChange={(e) => {
                _setValue(e.target.value);
                onChange && onChange(e);
            }}
            name={name}
            readOnly={readOnly}
            style={{ marginTop: "3px" }}
            autoSize={autoSize}
            id={id}
            className={className}
            placeholder={placeholder}
            disabled={disabled}
            type={type}
            size={size}
        />
    </Form.Item>
}
