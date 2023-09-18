import React from 'react';
import { Form, Radio } from "antd";

export default ({
    input,
    checkValid = false,
    disabled = false,
    className = "",
    id,
    label,
    options = [],
    style,
    meta: { touched, error, warning }
}) => {
    var validateStatus = "";
    var help = "";
    if (touched && checkValid) {
        if (error) { validateStatus = "error"; help = error }
        else if (warning) { validateStatus = "warning"; help = warning }
        // else { validateStatus = "success" }
    }
    var radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    }
    var result = options.map((item, index) => {
        if (style === "block") {
            return <Radio style={radioStyle} key={index} value={item.value}>{item.label}</Radio>
        }
        else {
            return <Radio key={index} value={item.value}>{item.label}</Radio>
        }
    })
    return (<React.Fragment>
        <Form.Item
            hasFeedback
            validateStatus={validateStatus}
            help={help}
            label={label && <span className={checkValid ? "ant-form-item-required" : ""}>{label}</span>}
        >
            <Radio.Group {...input} className={className} disabled={disabled} id={id}>
                {result}
            </Radio.Group>
        </Form.Item>
    </React.Fragment>)
}