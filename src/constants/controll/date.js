import React, { useState } from 'react';
import { Form, DatePicker } from "antd";
import moment from 'moment';
import { change } from "redux-form";
import { sizeDefault, dateFormat } from "./";
import { Base64, createID, findFirstScrollParent } from '../main';

export default ({
    readOnly,
    input,
    checkValid = false,
    disabled = false,
    placeholder,
    className = "",
    id,
    label,
    minDate,
    maxDate,
    size = sizeDefault,
    disabledDate,
    meta: { touched, error, warning, form, field, dispatch },
    getPopupContainer
}) => {
    var validateStatus = "";
    var help = "";
    if (touched && checkValid && !disabled && !readOnly) {
        if (error) { validateStatus = "error"; help = error }
        else if (warning) { validateStatus = "warning"; help = warning }
    }
    return <Form.Item
        hasFeedback
        validateStatus={validateStatus}
        help={help}
        label={label && <span className={checkValid ? "ant-form-item-required" : ""}>{label}</span>}
    >
        <ComponentDatePicker
            disabledDate={disabledDate}
            readOnly={readOnly}
            input={input}
            disabled={disabled}
            placeholder={placeholder}
            className={className}
            id={id}
            minDate={minDate}
            maxDate={maxDate}
            size={size}
            meta={{ form, dispatch }}
            getPopupContainer={getPopupContainer}
        />
    </Form.Item>
}

export const ComponentDatePicker = ({
    readOnly,
    input,
    disabled = false,
    placeholder,
    className = "",
    id = createID(),
    minDate,
    maxDate,
    open,
    onOpenChange,
    size = sizeDefault,
    onTouch,
    disabledDate = [],
    meta: { form, dispatch, touched },
    getPopupContainer
}) => {

    if (touched && typeof onTouch === "function") {
        onTouch();
    }
    const [_open, _setOpen] = useState(false);
    const _onOpenChange = open => _setOpen(open);

    if (minDate && moment(minDate, dateFormat).isValid()) {
        minDate = moment(minDate, dateFormat);
    }
    else {
        minDate = undefined;
    }
    if (maxDate && moment(maxDate, dateFormat).isValid()) {
        maxDate = moment(maxDate, dateFormat);
    }

    var value = moment(input.value, dateFormat).isValid() ? moment(input.value, dateFormat) : null;
    if (value) {
        var currentDateTime = new Date(value.format()).getTime();
        if (minDate && new Date(minDate.format()).getTime() > currentDateTime) {
            value = null;
        }
        else if (maxDate && new Date(maxDate.format()).getTime() < currentDateTime) {
            value = null;
        }
    }
    return <DatePicker
        {...input}
        allowClear={!readOnly}
        readOnly={readOnly}
        value={value}
        id={id}
        className={className}
        placeholder={placeholder}
        disabled={disabled}
        size={size}
        style={{ width: "100%", marginTop: "3px" }}
        disabledDate={d => {
            return !d
                || (minDate && minDate.valueOf() > d.valueOf())
                || (maxDate && maxDate.valueOf() < d.valueOf())
                || (disabledDate && Array.isArray(disabledDate) && disabledDate.findIndex(_d => _d === d.format(dateFormat)) >= 0)
                || (disabledDate && typeof disabledDate === "function" && disabledDate(d))
        }}
        format={dateFormat}
        onChange={(date, dateString) => {
            !readOnly && dispatch(change(form, input.name, dateString))
            input.onChange && typeof input.onChange === "function" && input.onChange(dateString);
        }}
        dateRender={(current) => {
            return (
                <div className="ant-calendar-date" >
                    {current.date()}
                </div>
            );
        }}
        open={readOnly ? false : open ? open : _open}
        onOpenChange={onOpenChange && typeof onOpenChange === "function" ? onOpenChange : _onOpenChange}
        showToday={false}
        dropdownClassName={`form-date-picker-dropdown`}
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
}