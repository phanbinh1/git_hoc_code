/**
 *  data = [
 *      [ // row1
 *          {
 *              type,               //** Text       (ex: "text","custom");
 *              renderCustom,       //** React
 *              col,                //** Number     ( (1 <= col <=12) && (12 % col ===0) )
 *              name,               //** Text
 *              label,              //** Text 
 *              fieldType,          //** Text       (ex: text | checkbox | number | date | month | password | select | selectLoadMore | textarea )
 *              className,          //** Text
 *              checkValid,         //** Boolean 
 *              disabled,           //** Boolean 
 *              options,            //** Array      (ex: [{value,label...}]) use: Select, Radio
 *              mode,               //** String     (ex: "default" | "multiple" | "tag") use: Select, SelectLoadMore
 *              url,                //** String     use: SelectLoadMore
 *              pageSize,           //** Number     min:10 use: SelectLoadMore
 *              validates,          //** Array
 *              warnings,           //** Array
 *              onClick,            //** Function
 *              onChange,           //** Function
 *              onBlur,             //** Function
 *              onFocus,            //** Function
 *          }
 *      ]
 * ]
 */

import React, { } from 'react';
import { Field } from 'redux-form'
import * as field from "./../../../constants/controll";

const CommonFormContent = ({
    data,
    formLayout = "vertical",
    style = {},
    formClassName
}) => {

    const getComponentFromFileType = (fieldType = "text") => {
        switch (fieldType) {
            case "text":
                return field.FieldInput;
            case "search":
                return field.FieldSearch;
            case "checkbox":
                return field.FieldCheckbox;
            case "select":
                return field.FieldSelect;
            case "number":
                return field.FieldInputNumber;
            case "currency":
                return field.FieldCurrency;
            case "autocomplete":
                return field.FieldAutoComplete;
            case "password":
                return field.FieldPassword;
            case "date":
                return field.FieldDate;
            case "dateTime":
                return field.FieldDateTime;
            case "month":
                return field.FieldMonth;
            case "year":
                return field.FieldYear;
            case "dateRange":
                return field.FieldDateRange;
            case "textarea":
                return field.FieldTextArea;
            case "cascader":
                return field.FieldCascader;
            case "selectLoadMore":
                return field.FieldSelectLoadMore;
            case "selectTree":
                return field.FieldSelectTree;
            case "editor":
                return field.FieldEditor;
            default:
                return field.FieldInput;
        }
    };

    const renderRow = (rows = []) => {
        if (Array.isArray(rows)) {
            let results = [], result;
            let _propsField = {};
            rows.map((item, index) => {
                if (!item.hidden) {
                    if (!item.type || item.type !== "custom") {
                        _propsField = {
                            key: item.key,
                            col: item.col && !isNaN(item.col) && item.col <= 12 && item.col > 0 ? item.col : 12,
                            url: item.url && typeof item.url === "string" ? item.url : undefined,
                            selectDefaultValue: item.selectDefaultValue && typeof item.selectDefaultValue === "object" ? item.selectDefaultValue : undefined,
                            valueKey: item.valueKey && typeof item.valueKey === "string" ? item.valueKey : undefined,
                            labelKey: item.labelKey && typeof item.labelKey === "string" ? item.labelKey : undefined,
                            childrenKey: item.childrenKey && typeof item.childrenKey === "string" ? item.childrenKey : undefined,
                            searchKey: item.searchKey && typeof item.searchKey === "string" ? item.searchKey : undefined,
                            searchKeyExtend: item.searchKeyExtend && typeof item.searchKeyExtend === "string" ? item.searchKeyExtend : undefined,
                            pageSize: item.pageSize && !isNaN(item.pageSize) && !isNaN(parseInt(item.pageSize, 0)) ? parseInt(item.pageSize, 0) : undefined,
                            wrapperClass: item.wrapperClassName && typeof item.wrapperClassName === "string" ? item.wrapperClassName : "",
                            label: item.label ? item.label : undefined,
                            placeholder: item.placeholder ? item.placeholder : undefined,
                            mode: item.mode ? item.mode : "default",
                            size: item.size ? item.size : "default",
                            autoSize: item.autoSize === true ? true : { minRows: 2, maxRows: 6 },
                            fieldType: item.fieldType ? item.fieldType : "text",
                            className: item.className ? item.className : "",
                            checkValid: item.checkValid && typeof item.checkValid === "boolean" ? item.checkValid : false,
                            disabled: item.disabled ? true : false,
                            validate: item.validates && Array.isArray(item.validates) ? item.validates : [],
                            warn: item.warnings && Array.isArray(item.warnings) ? item.warnings : [],
                            options: item.options && Array.isArray(item.options) ? item.options : [],
                            dataSource: item.dataSource && Array.isArray(item.dataSource) ? item.dataSource : [],
                            addonBefore: item.addonBefore ? item.addonBefore : undefined,
                            addonAfter: item.addonAfter ? item.addonAfter : undefined,
                            suffix: item.suffix ? item.suffix : undefined,
                            fromDate: item.fromDate && typeof item.fromDate === "string" ? item.fromDate : undefined,
                            toDate: item.toDate && typeof item.toDate === "string" ? item.toDate : undefined,
                            minDate: item.minDate && typeof item.minDate === "string" ? item.minDate : null,
                            maxDate: item.maxDate && typeof item.maxDate === "string" ? item.maxDate : null,
                            min: item.min,
                            max: item.max,
                            readOnly: item.readOnly ? true : false,
                            allowClear: item.allowClear,
                            loading: item.loading,
                            onClick: item.onClick && typeof item.onClick === "function" ? item.onClick : undefined,
                            onChange: item.onChange && typeof item.onChange === "function" ? item.onChange : undefined,
                            onBlur: item.onBlur && typeof item.onBlur === "function" ? item.onBlur : undefined,
                            onFocus: item.onFocus && typeof item.onFocus === "function" ? item.onFocus : undefined,
                            onKeyDown: item.onKeyDown && typeof item.onKeyDown === "function" ? item.onKeyDown : undefined,
                            onLoadMore: item.onLoadMore && typeof item.onLoadMore === "function" ? item.onLoadMore : undefined,
                            changeCallback: item.changeCallback && typeof item.changeCallback === "function" ? item.changeCallback : undefined,
                            searchData: item.searchData,
                            showText: item.showText,
                            renderData: item.renderData,
                            disabledDate: item.disabledDate,
                            getPopupContainer: item.getPopupContainer,
                        }
                        result = <div key={index} className={`col-md-${_propsField.col}  ${_propsField.wrapperClass}`}>
                            <Field
                                key={`field-${index}`}
                                name={item.name}
                                component={getComponentFromFileType(_propsField.fieldType)}
                                {..._propsField}
                            />
                        </div>
                        return results.push(result);
                    }
                    else {
                        if (item.renderCustom) {
                            return results.push(item.renderCustom);
                        }
                        else {
                            return null;
                        }
                    }
                }
                else {
                    return null;
                }
            });
            return results;
        }
        else {
            return null;
        }
    };
    return <React.Fragment>
        <div className={`ant-form clearfix ant-form-${style.type ? style.type : formLayout} ${formClassName && typeof formClassName === "string" ? formClassName : ""}`}>
            {
                (Array.isArray(data)) ? data.map((item, index) => {
                    return <div className="ant-row" key={index}>
                        {renderRow(item)}
                    </div>
                }) : null
            }
        </div>
    </React.Fragment>
}

export default CommonFormContent;