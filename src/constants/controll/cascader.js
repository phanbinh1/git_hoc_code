import React from 'react';
import { Form, Cascader } from "antd";
import { sizeDefault } from "./";

export default ({
    input,
    checkValid = false,
    placeholder,
    className = "",
    id,
    options = [],
    label,
    size = sizeDefault,
    onChange,
    changeOnSelect = false,
    loadData = () => { },
    meta: { touched, error, warning } }) => {
    var validateStatus = "";
    var help = "";
    if (touched && checkValid) {
        if (error) { validateStatus = "error"; help = error }
        else if (warning) { validateStatus = "warning"; help = warning }
        // else { validateStatus = "success" }
    }
    return (<React.Fragment>
        <Form.Item
            hasFeedback
            validateStatus={validateStatus}
            help={help}
            label={label && <span className={checkValid ? "ant-form-item-required" : ""}>{label}</span>}
        >
            <Cascader
                {...input}
                changeOnSelect={changeOnSelect}
                id={id}
                className={className}
                size={size}
                options={options}
                onChange={(value) => {
                    if (typeof onChange === "function") {
                        onChange(value);
                    }

                }}
                loadData={loadData}
                notFoundContent="Không có dữ liệu"
                placeholder={placeholder}
                showSearch={(inputValue, path) => {
                    return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
                }}
            />
        </Form.Item>
    </React.Fragment>)
}