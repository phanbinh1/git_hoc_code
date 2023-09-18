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
    enterButton,
    onSearch,
    allowClear = false,
    meta: { touched, error, warning }
}) => {
    var validateStatus = "";
    var help = "";
    if (touched && checkValid) {
        if (error) { validateStatus = "error"; help = error }
        else if (warning) { validateStatus = "warning"; help = warning }
    }
    return (<React.Fragment>
        <div className="form-group form-group-custom clearfix">
            {label && <span className={checkValid ? "ant-form-item-required" : ""}>{label}</span>}
            <Form.Item
                hasFeedback
                validateStatus={validateStatus}
                help={help}
            >
                <Input.Search
                    {...input}
                    allowClear={allowClear}
                    id={id}
                    className={className}
                    placeholder={placeholder}
                    disabled={disabled}
                    size={size}
                    enterButton={enterButton}
                    onSearch={onSearch}
                />
            </Form.Item>
        </div>
    </React.Fragment>)
}