import React, { } from 'react';
import { Button, Divider } from "antd";
import * as constants from "./../../../constants/constants";

const CONST_BTN_SIZE_DEFAULT = "default"
const CONST_BTN_SHAPE_DEFAULT = undefined;
const CONST_BTN_CLS_DEFAULT = "btn-form-action";


const CommonAction = ({
    actions,
    actionAlign,
    // redux form
    handleSubmit,
    reset,
    pristine,
    submitting
}) => {

    const renderAction = () => {
        /*
        **  actions=[
        **      {
        **          htmlType,       // submit | reset | button => default:button
        **          type,
        **          label,          // required 
        **          loading,        // true | false     => default: false
        **          disabled,       // true | false     => default: false
        **          handleClick,    // function 
        **          align,          // left | right | center     => default : center 
        **          icon,           // class icon  
        **      }
        **  ]
        */
        const align = actionAlign === "left" || actionAlign === "right" || actionAlign === "center" ? actionAlign : "center";
        return <React.Fragment>
            <div className="ant-row">
                <div className="col-md-12">
                    <Divider />
                </div>
            </div>
            <div className="ant-row" style={{ marginBottom: "30px" }}>
                <div className="col-md-12" style={{ textAlign: align }}>
                    {formatActions(actions && Array.isArray(actions) ? actions : [])}
                </div>
            </div >
        </React.Fragment>
    };

    const formatActions = (actions) => {
        let result = [];
        const btnSubmit = {
            htmlType: constants.FORM_HTML_TYPE_SUBMIT,
            type: constants.CONST_TYPE_BTN_SUBMIT,
            label: "Lưu",
            icon: "fa fa-save",
            // disabled: pristine || submitting,
            block: false
        }

        const btnReset = {
            htmlType: constants.FORM_HTML_TYPE_RESET,
            type: constants.CONST_TYPE_BTN_CANCEL,
            disabled: pristine || submitting,
            handleClick: reset,
            label: "Làm mới",
            icon: "fa fa-refresh",
            block: false
        }

        const indexBtnSubmit = findHTMLType(actions, constants.FORM_HTML_TYPE_SUBMIT);
        const indexBtnReset = findHTMLType(actions, constants.FORM_HTML_TYPE_RESET);
        if (indexBtnSubmit === -1) {
            actions.unshift(btnSubmit);
        }
        else {
            var actSubmit = actions[indexBtnSubmit];
            if (indexBtnSubmit !== 0) {
                actions[indexBtnSubmit] = actions[0];
                actions[0] = {
                    ...btnSubmit,
                    label: actSubmit.label ? actSubmit.label : "Lưu",
                    icon: actSubmit.icon ? actSubmit.icon : "fa fa-save",
                    block: actSubmit.block && typeof actSubmit.block === "boolean" ? actSubmit.block : false,
                    hidden: actSubmit.hidden && typeof actSubmit.hidden === "boolean" ? actSubmit.hidden : false,
                    shape: actSubmit.shape && typeof actSubmit.shape === "string" ? actSubmit.shape : CONST_BTN_SHAPE_DEFAULT,
                    size: actSubmit.size && typeof actSubmit.size === "string" ? actSubmit.size : CONST_BTN_SIZE_DEFAULT,
                }
            }
            else {
                actions[indexBtnSubmit] = {
                    ...btnSubmit,
                    label: actSubmit.label ? actSubmit.label : "Lưu",
                    icon: actSubmit.icon ? actSubmit.icon : "fa fa-save",
                    block: actSubmit.block && typeof actSubmit.block === "boolean" ? actSubmit.block : false,
                    hidden: actSubmit.hidden && typeof actSubmit.hidden === "boolean" ? actSubmit.hidden : false,
                    shape: actSubmit.shape && typeof actSubmit.shape === "string" ? actSubmit.shape : CONST_BTN_SHAPE_DEFAULT,
                    size: actSubmit.size && typeof actSubmit.size === "string" ? actSubmit.size : CONST_BTN_SIZE_DEFAULT,
                }
            }
        }

        if (indexBtnReset === -1) {
            actions.push(btnReset);
        }
        else {
            const actReset = actions[indexBtnReset];
            actions[indexBtnReset] = {
                ...btnReset,
                label: actReset.label ? actReset.label : "Làm mới",
                icon: actReset.icon ? actReset.icon : "fa fa-refresh",
                block: actReset.block && typeof actReset.block === "boolean" ? actReset.block : false,
                hidden: actReset.hidden && typeof actReset.hidden === "boolean" ? actReset.hidden : false,
                shape: actReset.shape && typeof actReset.shape === "string" ? actReset.shape : CONST_BTN_SHAPE_DEFAULT,
                size: actReset.size && typeof actReset.size === "string" ? actReset.size : CONST_BTN_SIZE_DEFAULT,
            }
        }
        let _propsButton = {};
        actions.map((item, index) => {
            _propsButton = {
                className: `${index === actions.length - 1 ? "" : "m-r-10 "} ${CONST_BTN_CLS_DEFAULT}`,
                onClick: (item.handleClick && typeof item.handleClick === "function") ?
                    ((handleSubmit && item.htmlType !== constants.FORM_HTML_TYPE_RESET && item.htmlType !== constants.FORM_HTML_TYPE_BUTTON) || item.isSubmit ?
                        handleSubmit((values) => item.handleClick(values)) :
                        item.handleClick) :
                    null,
                disabled: item.disabled ? true : false,
                type: (item.type && typeof item.type === "string") ? item.type : constants.CONST_TYPE_BTN_DEFAULT,
                htmlType: (item.htmlType && typeof item.htmlType === "string") ? item.htmlType : "button",
                label: item.label ? item.label : "",
                icon: item.icon ? item.icon + " m-r-5" : "",
                hidden: item.hidden ? true : false,
                block: item.block ? true : false,
                shape: item.shape && typeof item.shape === "string" ? item.shape : CONST_BTN_SHAPE_DEFAULT,
                size: item.size && typeof item.size === "string" ? item.size : CONST_BTN_SIZE_DEFAULT,
            }

            if (!_propsButton.hidden) {
                return result.push(<Button
                    key={index}
                    {..._propsButton}
                >
                    <i className={_propsButton.icon} />
                    <span>{_propsButton.label}</span>
                </Button>);
            }
            else {
                return null;
            }
        });
        return result;
    };

    const findHTMLType = ((list, htmlType) => {
        var result = -1;
        list.map((item, index) => {
            if (item.htmlType === htmlType) {
                result = index;
            }
            return index
        })
        return result;
    });

    return <React.Fragment>
        {
            actions === false ?
                null :
                renderAction()
        }
    </React.Fragment>
}

export default CommonAction;