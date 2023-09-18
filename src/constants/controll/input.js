import React, { useEffect, useState } from 'react';
import { Form, Input } from "antd";
import { sizeDefault } from "./";
import { change } from 'redux-form';

export default ({
    input: {
        value,
        onBlur,
        onFocus,
        name
    },
    onChange,
    checkValid = false,
    disabled = false,
    placeholder,
    type = "text",
    className = "",
    id,
    label,
    size = sizeDefault,
    allowClear = false,
    addonAfter = null,
    addonBefore = null,
    readOnly = false,
    suffix,
    onKeyDown,
    meta: { touched, error, warning, form, dispatch }
}) => {
    var validateStatus = null;
    var help = null;
    if (touched && checkValid && !disabled && !readOnly) {
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
    >
        <Input
            value={_value}
            onBlur={onBlur}
            onFocus={onFocus}
            onChange={(e) => {
                _setValue(e.target.value);
                onChange && onChange(e);
            }}
            name={name}
            onKeyDown={(e) => {
                e.keyCode === 13 && dispatch(change(form, name, e.target.value));
                onKeyDown && onKeyDown(e)
            }}
            style={{ marginTop: "2px" }}
            readOnly={readOnly}
            allowClear={disabled ? false : allowClear}
            id={id}
            className={className}
            placeholder={placeholder}
            disabled={disabled}
            type={type}
            size={size}
            suffix={suffix}
            addonAfter={addonAfter}
            addonBefore={addonBefore}
        />
    </Form.Item>
}