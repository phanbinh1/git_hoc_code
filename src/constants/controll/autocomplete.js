import React from 'react';
import { Form, Input, AutoComplete } from "antd";
import { sizeDefault } from "./";
import { Base64, findFirstScrollParent } from '../main';

export default ({
    readOnly,
    input,
    checkValid = false,
    disabled = false,
    placeholder,
    dataSource = [],
    className = "",
    id,
    label,
    size = sizeDefault,
    allowClear = true,
    addonAfter = null,
    addonBefore = null,
    meta: { touched, error, warning, form },
    getPopupContainer,
}) => {
    var validateStatus = "";
    var help = "";
    if (touched && checkValid) {
        if (error) { validateStatus = "error"; help = error }
        else if (warning) { validateStatus = "warning"; help = warning }
    }
    if (dataSource === null || !Array.isArray(dataSource)) {
        dataSource = [];
    }

    return (<React.Fragment>
        <Form.Item
            hasFeedback
            validateStatus={validateStatus}
            help={help}
            label={label && <span className={checkValid ? "ant-form-item-required" : ""}>{label}</span>}
        >
            <AutoComplete
                {...input}
                readOnly={readOnly}
                dataSource={dataSource}
                id={id}
                className={className}
                disabled={disabled}
                size={size}
                filterOption={(inputValue, option) =>
                    option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
                getPopupContainer={(e) => {
                    let formElm = null;
                    try {
                        const formId = Base64.encode(form);
                        formElm = document.getElementById(formId);
                    }
                    catch (e) { }
                    return typeof getPopupContainer === "function" ? getPopupContainer(e) : (formElm || findFirstScrollParent(e) || document.body);
                }}
            >
                <Input
                    placeholder={placeholder}
                    allowClear={disabled ? false : allowClear}
                    addonAfter={addonAfter}
                    addonBefore={addonBefore}
                    readOnly={readOnly}
                />
            </AutoComplete>
        </Form.Item>
    </React.Fragment>)
}