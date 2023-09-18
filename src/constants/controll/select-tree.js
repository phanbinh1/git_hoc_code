import React from 'react';
import { Form, TreeSelect, Empty } from "antd";
import { change } from "redux-form";
import { sizeDefault, getValue, IconClear, parseOptions, selectTreeRenderChildren } from "./";
import { Base64, createID, findFirstScrollParent } from '../main';

export default ({
    readOnly,
    input,
    checkValid = false,
    disabled = false,
    placeholder = "Vui lòng chọn",
    className = "",
    mode = "default",
    id = createID(),
    options = [],
    searchPlaceholder = "Nhập từ khóa",
    label,
    showSearch = true,
    size = sizeDefault,
    valueKey = "value",
    labelKey = "label",
    childrenKey = "children",
    meta: { form, touched, error, warning, dispatch },
    getPopupContainer
}) => {

    var validateStatus = "";
    var help = "";
    const clearIcon = <IconClear
        className="c-pointer icon-clear-select"
        onClick={() => dispatch(change(form, input.name, mode === "multiple" || mode === "multiselect" ? [] : null))}
    />
    if (touched && checkValid) {
        if (error) { validateStatus = "error"; help = error }
        else if (warning) { validateStatus = "warning"; help = warning }
    }

    const _options = parseOptions(options, valueKey, labelKey, childrenKey);
    var exitsValue = checkExitValue(options, input.value, valueKey, childrenKey) > 0;
    const selectMultipleValue = getSelectMultipleValue(options, input.value, valueKey, childrenKey);
    if (!exitsValue && mode === "default") {
        input.value = null;
    }
    if (mode === "multiple") {
        input.value = [selectMultipleValue];
    }
    return (<React.Fragment>
        <Form.Item
            hasFeedback
            validateStatus={validateStatus}
            help={help}
            className="select-tree"
            label={label && <span className={checkValid ? "ant-form-item-required" : ""}>{label}</span>}
            htmlFor={`item-${id}`}
        >
            {clearIcon}
            <TreeSelect
                {...input}
                readOnly={readOnly}
                treeDefaultExpandedKeys={input.value ? [input.value] : []}
                searchPlaceholder={searchPlaceholder}
                allowClear={false}
                placeholder={placeholder}
                disabled={disabled}
                className={className}
                id={id}
                multiple={mode === "multiselect"}
                onBlur={() => input.onBlur()}
                showSearch={showSearch}
                size={size}
                style={{ width: "100%" }}
                filterTreeNode={(inputValue, option) => {
                    return option.props.title.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }}
                notFoundContent={<Empty description="Không có dữ liệu" />}
                dropdownClassName={`form-select-tree-dropdown ${id}`}
                dropdownMatchSelectWidth
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
                {selectTreeRenderChildren(_options)}
            </TreeSelect>
        </Form.Item>
    </React.Fragment>)
}

export const checkExitValue = (options = [], value, valueKey = "value", childrenKey = "children") => {
    let result = 0
    if (options && Array.isArray(options)) {
        options.map((option) => {
            if (option[valueKey] === value) {
                result++;
            }
            result += checkExitValue(option[childrenKey], value, valueKey, childrenKey);
            return null;
        })
    }
    return result;
}

export const getSelectMultipleValue = (options = [], value = [], valueKey = "value", childrenKey = "children") => {
    let result = []
    if (options && Array.isArray(options)) {
        options.map((option) => {
            if (Array.isArray(value) && value.indexOf(getValue(option, valueKey)) !== -1) {
                result.push(getValue(option, valueKey));
            }
            result = [
                ...result,
                ...getSelectMultipleValue(option[childrenKey], value, valueKey, childrenKey)
            ];
            return result;
        })
    }
    return result;
}