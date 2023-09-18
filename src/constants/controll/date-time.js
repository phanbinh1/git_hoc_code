import React from 'react';
import { Form, DatePicker, } from "antd";
import moment from 'moment';
import { sizeDefault, dateTimeFormat, dateFormat } from "./";
import { useDispatch } from 'react-redux';
import { blur, change } from 'redux-form';
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
    const dispatch = useDispatch();
    var validateStatus = "";
    var help = "";
    if (touched && checkValid) {
        if (error) { validateStatus = "error"; help = error }
        else if (warning) { validateStatus = "warning"; help = warning }
    }
    var value = moment(input.value, dateTimeFormat).isValid() ? moment(input.value, dateTimeFormat) : null;
    return (<React.Fragment>
        <Form.Item
            hasFeedback
            validateStatus={validateStatus}
            help={help}
            label={label && <span className={checkValid ? "ant-form-item-required" : ""}>{label}</span>}
        >
            <DatePicker
                {...input}
                onBlur={e => {
                    e.preventDefault();
                    input.onBlur && e.target.value !== 0 && input.onBlur(e)
                }}
                readOnly={readOnly}
                showTime
                value={value}
                id={id}
                className={className}
                placeholder={placeholder}
                disabled={disabled}
                size={size}
                style={{ width: "100%" }}
                format={dateTimeFormat}
                onChange={(date, dateString) => {
                    !readOnly && dispatch(change(form, input.name, dateString))
                }}
                dateRender={(current) => {
                    return (
                        <div className="ant-calendar-date" >
                            {current.date()}
                        </div>
                    );
                }}
                showToday={false}
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
