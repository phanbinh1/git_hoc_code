import React from 'react';
import { Form } from "antd";
import CommonEditor from '../../components/common/common_editor';
import { sizeDefault } from "./";

export default ({
    input,
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
            <CommonEditor
                {...input}
                content={input.value}
            />
        </Form.Item>
    </React.Fragment>)
}