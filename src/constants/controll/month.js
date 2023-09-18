import React from 'react';
import { Form, DatePicker } from "antd";
import moment from 'moment';
import { sizeDefault } from "./";
import { Base64, findFirstScrollParent } from '../main';

export default ({
    readOnly,
    input,
    checkValid = false,
    disabled = false,
    placeholder,
    className = "",
    id,
    label,
    size = sizeDefault,
    meta: { form, touched, error, warning },
    getPopupContainer
}) => {
    var validateStatus = "";
    var help = "";
    if (touched && checkValid) {
        if (error) { validateStatus = "error"; help = error }
        else if (warning) { validateStatus = "warning"; help = warning }
    }
    var value = (input.value) ? moment(input.value, "MM-YYYY") : null;
    return (<React.Fragment>
        <Form.Item
            hasFeedback
            validateStatus={validateStatus}
            help={help}
            label={label && <span className={checkValid ? "ant-form-item-required" : ""}>{label}</span>}
        >
            <DatePicker.MonthPicker
                {...input}
                readOnly={readOnly}
                value={value}
                id={id}
                className={className}
                placeholder={placeholder}
                disabled={disabled}
                size={size}
                style={{ width: "100%" }}
                format="MM-YYYY"
                getCalendarContainer={(e) => {
                    let formElm = null;
                    try {
                        const formId = Base64.encode(form);
                        formElm = document.getElementById(formId);
                    }
                    catch (e) { }
                    return typeof getPopupContainer === "function" ? getPopupContainer(e) : (formElm || findFirstScrollParent(e) || document.body);
                }}
            />
        </Form.Item>
    </React.Fragment>)
}