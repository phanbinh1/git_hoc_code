import React, { useState } from 'react';
import { Form, DatePicker } from "antd";
import moment from 'moment';
import { sizeDefault } from "./";
import { createID, findFirstScrollParent } from '../main';

export default ({
    readOnly,
    input,
    checkValid = false,
    disabled = false,
    placeholder,
    className = "",
    id = createID(),
    label,
    size = sizeDefault,
    meta: { form, touched, error, warning },
    getPopupContainer
}) => {

    const [open, setOpen] = useState(false);
    let validateStatus = "";
    let help = "";
    if (touched && checkValid && !disabled && !readOnly) {
        if (error) { validateStatus = "error"; help = error }
        else if (warning) { validateStatus = "warning"; help = warning }
    }
    let value = (input.value) ? moment(input.value, "YYYY") : null;
    return (<React.Fragment>
        <Form.Item
            hasFeedback
            validateStatus={validateStatus}
            help={help}
            label={label && <span className={checkValid ? "ant-form-item-required" : ""}>{label}</span>}
        >
            <DatePicker
                {...input}
                readOnly={readOnly}
                dropdownClassName="field-year-dropdown"
                value={value}
                id={id}
                className={className}
                placeholder={placeholder}
                disabled={disabled}
                size={size}
                style={{ width: "100%" }}
                format="YYYY"
                mode="year"
                open={open}
                onOpenChange={(open) => setOpen(open)}
                onChange={(value) => {
                    input.onChange && typeof input.onChange === "function" && input.onChange(value && value.isValid() ? value.format("YYYY") : null);
                    setOpen(false);
                }}
                onPanelChange={(value, mode) => {
                    input.onChange && typeof input.onChange === "function" && input.onChange(value && value.isValid() ? value.format("YYYY") : null);
                    setOpen(false);
                }}
                getCalendarContainer={(e) => {
                    return typeof getPopupContainer === "function" ? getPopupContainer(e) : (findFirstScrollParent(e) || document.body);
                }}
            />
        </Form.Item>
    </React.Fragment>)
}