/*
*** - example
**
**  exData = [exRows, exRows1...]
**  exRows = [exRow, exRow1...]
**  exRow = {
**      type,               //** Text       (ex: "text","custom");
**      renderCustom,       //** React
**      col,                //** Number     ( (1 <= col <=12) && (12 % col ===0) )
**      name,               //** Text
**      label,              //** Text 
**      fieldType,          //** Text       (ex: text | checkbox | number | date | month | password | select | selectLoadMore | textarea )
**      className,          //** Text
**      checkValid,         //** Boolean 
**      disabled,           //** Boolean 
**      options,            //** Array      (ex: [{value,label...}]) use: Select, Radio
**      mode,               //** String     (ex: "default" | "multiple" | "tag") use: Select, SelectLoadMore
**      url,                //** String     use: SelectLoadMore
**      pageSize,           //** Number     min:10 use: SelectLoadMore
**      validates,          //** Array
**      warnings,           //** Array
**      onClick,            //** Function
**      onChange,           //** Function
**      onBlur,             //** Function
**      onFocus,            //** Function
**  }
**  =====================================================================
**  < CommonForm
**      data = { exData }
**      actions={exActions}
**      {...props }
**  />
*/

import React, { useEffect, useState, Fragment } from 'react';
import { useSelector } from "react-redux";
import { reduxForm, hasSubmitFailed, isPristine, isSubmitting, hasSubmitSucceeded } from 'redux-form';
import { connect } from 'react-redux';
import { Prompt, useHistory } from 'react-router-dom';
import { Drawer, Tooltip, Modal } from "antd";
import Content from "./form_content";
import Actions from "./form_actions";
import * as constants from "./../../../constants/constants";
import * as message from "./../../../constants/message";
import * as formName from "./../../../constants/form_name";
import CauHinh from "./cau_hinh";
import { Base64, findFirstScrollParent } from '../../../constants/main';

const CommonForm = ({
    wrapperClassName,
    formClassName,
    onSubmit,
    data,
    actions,
    actionAlign = "center",
    handleSubmit,
    reset,
    pristine,
    form,
    showSetup = false,
    style,
    submitFailed,
    submitting,
    submitSucceeded,
    formLayout = "vertical",
    confirmWhenLeave = false
}) => {
    const history = useHistory();
    const [visible, setVisible] = useState(false);

    const [leave, setLeave] = useState(true);
    const [confirmVisible, setConfirmVisible] = useState(false);

    const [_style, _setStyle] = useState({});
    const config = useSelector(state => state.core.config);

    useEffect(() => {
        submitFailed && message.error({
            content: constants.CONST_CONFIRM_DATA_MSG,
            duration: 2,
            key: constants.CONST_CONFIRM_DATA_KEY
        });
    }, [submitFailed]);

    useEffect(() => {
        const _form = form ? form : formName.FORM_NAME_DEFAULT;
        _setStyle(config.form && config.form.hasOwnProperty(_form) ? config.form[_form] : {});
    }, [config])

    const submit = (values) => {
        if (typeof onSubmit === "function") {
            onSubmit(values);
        }
    };

    return <Fragment>
        {
            showSetup &&
            <Drawer
                width={300}
                visible={visible}
                title={<React.Fragment><i className="fa fa-cog m-r-10" />Cấu hình</React.Fragment>}
                onClose={() => setVisible(false)}
            >
                <CauHinh form={form} />
            </Drawer>
        }
        <div
            className={`wrapper-form  clearfix ${wrapperClassName && typeof wrapperClassName === "string" ? wrapperClassName : ""} `}
            style={style ? style : {}}
            id={Base64.encode(form)}
        >
            {
                showSetup !== false &&
                <Tooltip title="Cấu hình" getPopupContainer={e => findFirstScrollParent(e)}>
                    <div className="config-form" onClick={() => setVisible(true)}>
                        <i className="fa fa-cog" />
                    </div>
                </Tooltip>
            }
            <Prompt

                when={confirmWhenLeave && leave && !pristine && !submitSucceeded}
                message={location => {
                    if (!confirmVisible) {
                        setConfirmVisible(true);
                        Modal.confirm({
                            autoFocusButton: "ok",
                            style: { top: 50 },
                            title: "Thông báo",
                            content: <Fragment>
                                Dữ liệu thay đổi có thể chưa được lưu.<br />
                                Bạn chắc chắn muốn rời trang?
                            </Fragment>,
                            onOk: () => {
                                setLeave(false);
                                return new Promise((resolve) => {
                                    setTimeout(() => {
                                        history.push({
                                            pathname: location.pathname,
                                            search: location.search,
                                            hash: location.hash
                                        });
                                        setLeave(true);
                                        setConfirmVisible(false);
                                        resolve();
                                    }, 100);
                                })
                            },
                            onCancel: () => {
                                setLeave(true);
                                setConfirmVisible(false);
                            },
                            cancelText: <Fragment><i className="fa fa-times mr-10" />Hủy</Fragment>,
                            okText: <Fragment><i className="fa fa-check mr-10" />Xác nhận</Fragment>
                        })
                    }
                    return false;
                }}
            />
            <form onSubmit={handleSubmit(submit)}>
                <Content data={data} style={_style} formLayout={formLayout} formClassName={formClassName} />
                <Actions
                    actionAlign={actionAlign}
                    actions={actions}
                    reset={reset}
                    submitting={submitting}
                    pristine={pristine}
                    handleSubmit={handleSubmit}
                    submit={submit}
                />
            </form>
        </div>
    </Fragment >
}

export default connect((
    state,
    {
        initialValues,
        form,
        formasyncValidate,
        asyncBlurFields,

        wrapperClassName,
        formClassName,
        onSubmit,
        data,
        actions,
        actionAlign = "center",
        reset,
        showSetup = false,
        style,
        formLayout = "vertical",
        confirmWhenLeave = false
    }) => {
    const _formName = form && typeof form === "string" ? form : formName.FORM_NAME_DEFAULT;
    return {
        submitSucceeded: hasSubmitSucceeded(_formName)(state),
        pristine: isPristine(_formName)(state),
        submitting: isSubmitting(_formName)(state),
        submitFailed: hasSubmitFailed(_formName)(state),
        initialValues: initialValues ? initialValues : {},
        form: _formName,
        formasyncValidate,
        asyncBlurFields,

        wrapperClassName,
        formClassName,
        onSubmit,
        data,
        actions,
        actionAlign,
        reset,
        showSetup,
        style,
        formLayout,
        confirmWhenLeave
    }
})(reduxForm({
    enableReinitialize: true,
    keepDirtyOnReinitialize: false
})(CommonForm))