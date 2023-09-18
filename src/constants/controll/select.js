import React, { useState } from 'react';
import { Form, Select, Empty } from "antd";
import { change } from "redux-form";
import { Base64, createID, findFirstScrollParent } from './../main';
import { sizeDefault, getValue, IconClear } from "./";

export default ({
    input,
    checkValid = false,
    disabled = false,
    placeholder = "Vui lòng chọn",
    className = "",
    mode = "default",
    id = createID(),
    options = [],
    label,
    showSearch = true,
    size = sizeDefault,
    allowClear = true,
    valueKey = "value",
    labelKey = "label",
    changeCallback,
    readOnly,
    meta: { form, touched, error, warning, dispatch },
    getPopupContainer
}) => {
    const [open, setOpen] = useState(false);
    var validateStatus = "";
    var help = "";
    if (touched && checkValid && !readOnly) {
        if (error) { validateStatus = "error"; help = error }
        else if (warning) { validateStatus = "warning"; help = warning }
    }
    var exitsValue = false
    var selectMultipleValue = [];
    var result = options.map((item, index) => {
        if (mode === "default" && getValue(item, valueKey) === input.value) {
            exitsValue = true;
        }
        if (mode === "multiple" && Array.isArray(input.value) && input.value.indexOf(getValue(item, valueKey)) !== -1) {
            selectMultipleValue.push(getValue(item, valueKey));
        }
        if (mode === "tags") {
            selectMultipleValue.push(getValue(item, valueKey));
        }
        return <Select.Option key={index} value={getValue(item, valueKey)} {...item}>{getValue(item, labelKey)}</Select.Option>
    })
    if (!exitsValue && mode === "default") {
        input.value = undefined;
    }
    if (mode === "multiple") {
        input.value = selectMultipleValue;
    }
    const clearIcon = <IconClear
        onClick={() => dispatch(change(form, input.name, mode === "multiple" || mode === "tags" ? [] : null))}
    />
    return (<React.Fragment>
        <Form.Item
            hasFeedback
            validateStatus={validateStatus}
            help={help}
            label={label && <span className={checkValid ? "ant-form-item-required" : ""}>{label}</span>}
        >
            <Select
                {...input}
                onChange={(value, option) => {
                    input.onChange(value, option);
                    changeCallback && changeCallback(value, option);
                }}
                allowClear={disabled || readOnly ? false : allowClear}
                mode={mode}
                placeholder={placeholder}
                disabled={disabled}
                className={className}
                id={id}
                showSearch={showSearch}
                optionFilterProp="children"
                size={size}
                style={{ width: "100%" }}
                filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                clearIcon={clearIcon}
                notFoundContent={<Empty description="Không có dữ liệu" />}
                dropdownClassName={`form-select-dropdown ${id}`}
                getPopupContainer={(e) => {
                    let formElm = null;
                    try {
                        const formId = Base64.encode(form);
                        formElm = document.getElementById(formId);
                    }
                    catch (e) { }
                    return typeof getPopupContainer === "function" ? getPopupContainer(e) : (formElm || findFirstScrollParent(e) || document.body);
                }}
                open={open}
                onDropdownVisibleChange={v => setOpen(disabled || readOnly ? false : v)}
            >
                {result}
            </Select>
        </Form.Item>
    </React.Fragment>)
}