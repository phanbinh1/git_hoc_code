import React, { useState } from 'react';
import { Form } from "antd";
import { store } from "./../../";
import { Field, touch } from "redux-form";
import * as validates from "./../validate";
import { sizeDefault } from "./";
import { ComponentDatePicker } from "./date";

export default ({
    readOnly,
    input,
    checkValid = false,
    disabled = false,
    label,
    size = sizeDefault,
    mode = "default",
    meta: { form, touched, error, warning, dispatch },
    getPopupContainer
}) => {

    var validateStatus = "";
    var help = "";
    if (touched && checkValid) {
        if (error) {
            if (error.from) {
                validateStatus = "error"; help = error.from;
            }
            else if (error.to) {
                validateStatus = "error"; help = error.to;
            }
        }
        else if (warning) { validateStatus = "warning"; help = warning }
    }

    const state = store.getState();
    const fromDate = state && state.form && state.form[form] && state.form[form].values &&
        state.form[form].values[input.name] && state.form[form].values[input.name].from ?
        state.form[form].values[input.name].from : "";
    const toDate = state && state.form && state.form[form] && state.form[form].values &&
        state.form[form].values[input.name] && state.form[form].values[input.name].to ?
        state.form[form].values[input.name].to : "";
    return (<React.Fragment>
        <Form.Item
            hasFeedback
            validateStatus={validateStatus}
            help={help}
            label={label && <span className={checkValid ? "ant-form-item-required" : ""}>{label}</span>}
        >
            <ComponentDateRange
                readOnly={readOnly}
                input={input}
                size={size}
                disabled={disabled}
                toDate={toDate}
                fromDate={fromDate}
                mode={mode}
                checkValid={checkValid}
                dispatch={dispatch}
                form={form}
                getPopupContainer
            />
        </Form.Item>
    </React.Fragment>)
}

const ComponentDateRange = ({
    readOnly,
    input,
    size,
    disabled,
    toDate,
    fromDate,
    mode,
    checkValid,
    dispatch,
    form,
    getPopupContainer
}) => {
    const [startOpen, setStartOpen] = useState(false);
    const [endOpen, setEndOpen] = useState(false);
    const handleStartOpenChange = open => {
        setStartOpen(open);
        !open && setEndOpen(true);
    };
    const handleEndOpenChange = open => setEndOpen(open);
    const onTouch = () => dispatch(touch(form, input.name));

    return <React.Fragment>
        <div >
            <div style={mode === "default" ? { display: "inline-block", width: "calc(50% - 13px)", marginRight: 26 } : {}}>
                <Field
                    name={`${input.name}.from`}
                    component={ComponentDatePicker}
                    readOnly={readOnly}
                    placeholder="Từ ngày"
                    size={size}
                    disabled={disabled}
                    maxDate={toDate}
                    open={startOpen}
                    onOpenChange={handleStartOpenChange}
                    checkValid={checkValid}
                    validate={checkValid ? [validates.VALIDATE_COMMON_FROM_DATE] : []}
                    onTouch={onTouch}
                    getPopupContainer={getPopupContainer}
                />
            </div>
            <div style={mode === "default" ? { display: "inline-block", width: "calc(50% - 13px)" } : {}}>
                <Field
                    name={`${input.name}.to`}
                    component={ComponentDatePicker}
                    readOnly={readOnly}
                    placeholder="Đến ngày"
                    size={size}
                    disabled={disabled}
                    minDate={fromDate}
                    open={endOpen}
                    onOpenChange={handleEndOpenChange}
                    checkValid={checkValid}
                    validate={checkValid ? [validates.VALIDATE_COMMON_TO_DATE] : []}
                    onTouch={onTouch}
                    getPopupContainer={getPopupContainer}
                />
            </div>
        </div>
    </React.Fragment>
}