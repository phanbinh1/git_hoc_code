import React from 'react';
import { Form } from "antd";
import SelectLoadMore from "./../../components/common/select_load_more";
import { change } from "redux-form";
import { sizeDefault, IconClear } from "./";
import { Base64, createID, findFirstScrollParent } from '../main';

export default ({
    key,
    readOnly,
    input,
    checkValid = false,
    disabled = false,
    placeholder = "Vui lòng chọn",
    className = "",
    mode = "default",
    id = createID(),
    label,
    size = sizeDefault,
    url,
    selectDefaultValue,
    pageSize,
    valueKey,
    labelKey,
    searchKey = "searchString",
    searchKeyExtend,
    allowClear = true,
    onLoadMore,
    changeCallback,
    searchData = {},
    renderData,
    meta: { form, touched, error, warning, dispatch },
    getPopupContainer
}) => {

    var validateStatus = "";
    var help = "";
    const clearIcon = <IconClear
        onClick={() => dispatch(change(form, input.name, mode === "multiple" ? [] : null))}
    />
    if (touched && checkValid) {
        if (error) { validateStatus = "error"; help = error }
        else if (warning) { validateStatus = "warning"; help = warning }
    }
    if (!pageSize) {
        pageSize = 10;
    }
    if (!url) {
        console.error("url is required!");
        return null;
    }
    if (!valueKey) {
        console.error("valueKey is required!");
        return null;
    }
    else if (valueKey && typeof valueKey !== "string") {
        console.error("valueKey must be of type string!");
        return null;
    }
    if (!labelKey) {
        console.error("labelKey is required!");
        return null;
    }
    else if (labelKey && typeof labelKey !== "string") {
        console.error("labelKey must be of type string!");
        return null;
    }
    else {
        return (<React.Fragment>
            <Form.Item
                hasFeedback
                validateStatus={validateStatus}
                help={help}
                label={label && <span className={checkValid ? "ant-form-item-required" : ""}>{label}</span>}
            >
                <SelectLoadMore
                    readOnly={readOnly}
                    key={`${key || ""}-${input.name}`}
                    meta={{ form, touched, error, warning, dispatch }}
                    {...input}
                    changeCallback={changeCallback}
                    onLoadMore={onLoadMore}
                    selectDefaultValue={selectDefaultValue}
                    url={url}
                    mode={mode}
                    size={size}
                    pageSize={pageSize}
                    valueKey={valueKey}
                    labelKey={labelKey}
                    searchKey={searchKey}
                    searchKeyExtend={searchKeyExtend}
                    disabled={disabled}
                    placeholder={placeholder}
                    className={`${className} select-load-more`}
                    id={id}
                    clearIcon={clearIcon}
                    allowClear={allowClear}
                    searchData={searchData}
                    renderData={renderData}
                    getPopupContainer={(e) => {
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
}