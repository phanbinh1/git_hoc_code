import React from 'react';
import { TreeSelect } from "antd";

export { default as FieldAutoComplete } from "./autocomplete";
export { default as FieldCascader } from "./cascader";
export { default as FieldCheckbox } from "./checkbox";
export { default as FieldCurrency } from "./currency";
export { default as FieldDateTime } from "./date-time";
export { default as FieldDateRange } from "./date-range";
export { default as FieldDate } from "./date";
export { default as FieldEditor } from "./editor";
export { default as FieldMonth } from "./month";
export { default as FieldInputNumber } from "./number";
export { default as FieldInput } from "./input";
export { default as FieldPassword } from "./password";
export { default as FieldRadio } from "./radio";
export { default as FieldSearch } from "./search";
export { default as FieldSelectLoadMore } from "./select-load-more";
export { default as FieldSelectTree } from "./select-tree";
export { default as FieldSelect } from "./select";
export { default as FieldTextArea } from "./textarea";
export { default as FieldYear } from "./year";
export { default as FieldSwitch } from "./switch";


export const parseOptions = (options, valueKey = "value", labelKey = "label", childrenKey = "children", disabled = false) => {
    let results = [];
    if (options && Array.isArray(options)) {
        results = options.map((option) => {
            return {
                title: option[labelKey],
                value: option[valueKey],
                key: option[valueKey],
                disabled: option.disabled || disabled,
                children: parseOptions(option[childrenKey], valueKey, labelKey, childrenKey, option.disabled)
            }
        })
    }
    return results;
}

export const selectTreeRenderChildren = (treeData = []) => {
    return treeData.map((item, i) => {
        return item.children.length > 0 ?
            <TreeSelect.TreeNode value={item.value} title={item.title} key={i}>
                {selectTreeRenderChildren(item.children)}
            </TreeSelect.TreeNode> :
            <TreeSelect.TreeNode value={item.value} title={item.title} key={i} />


    });
}

export const IconClear = ({ onClick, className }) => {
    return <i className={`fa fa-times-circle icon-clear-field ${typeof className === "string" ? className : ""}`} onClick={typeof onClick === "function" ? onClick : null} />
}
export const sizeDefault = "default";
export const monthFormat = "MM/YYYY";
export const dateFormat = "DD/MM/YYYY";
export const dateTimeFormat = "DD/MM/YYYY HH:mm:ss";
export const getValue = (item, dataIndex) => {
    const keyArr = dataIndex.split(".");
    let res = item;
    keyArr.map((val) => { return res = res[val]; })
    return res;
};