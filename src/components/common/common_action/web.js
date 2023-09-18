
import React, { Fragment, useEffect, useState } from 'react';
import { Button, Tooltip, Dropdown } from "antd";
import * as actID from "./../../../constants/action_id";
import ModalConfirm from './modal_confirm';
import history from "./../../../App";
import elementResizeEvent from "element-resize-event";

export const CONST_BTN_SIZE_DEFAULT = "default"
export const CONST_BTN_SHAPE_DEFAULT = undefined;
export const CONST_BTN_CLS_DEFAULT = "btn-header-page-action";

const getWidthBackIcon = () => {
    return 27;
}

const getWidthTitle = () => {
    const elm = document.querySelector(`#content-title .ant-page-header.ant-page-header-ghost > .ant-page-header-heading >.ant-page-header-heading-title`);
    return elm ? elm.clientWidth : 0;
}

const getWidthSubTitle = () => {
    const elm = document.querySelector(`#content-title .ant-page-header.ant-page-header-ghost > .ant-page-header-heading >.ant-page-header-heading-sub-title`);
    return elm ? elm.clientWidth : 0;
}

const getWidthPageHeading = () => {
    const elm = document.querySelector(`#content-title .ant-page-header.ant-page-header-ghost > .ant-page-header-heading`);
    return elm ? elm.clientWidth : 0;
}

const getWidthActionWrapper = () => {
    const elm = document.getElementById("action-wrapper");
    return elm ? elm.clientWidth : 0;

}

const setMaxWidthActionWrapper = ({ pageHeading, backIcon, subTitle, title, actionWrapper }) => {
    const elm = document.getElementById("action-wrapper");
    const maxWidth = pageHeading - backIcon - subTitle - title
    elm.style.maxWidth = `${maxWidth}px`;

    const divElm = document.createElement("div");
    divElm.innerHTML = elm.innerHTML;
    document.body.appendChild(divElm);
    divElm.className = "action-wrapper list-action";
    divElm.style.display = "inline-block";
    const width = divElm.clientWidth;
    document.body.removeChild(divElm);
    if (width > maxWidth) {
        elm.setAttribute("small-icon", "");
    }
    else {
        elm.removeAttribute("small-icon");
    }
}

const CommonActionWeb = ({ loading = 0, listAction = [], arrAction = [] }) => {
    const [size, setSize] = useState({
        backIcon: getWidthBackIcon(),
        title: getWidthTitle(),
        subTitle: getWidthSubTitle(),
        pageHeading: getWidthPageHeading(),
        actionWrapper: getWidthActionWrapper()
    })

    const pageHeadingResize = () => {
        setSize({
            backIcon: getWidthBackIcon(),
            title: getWidthTitle(),
            subTitle: getWidthSubTitle(),
            pageHeading: getWidthPageHeading(),
            actionWrapper: getWidthActionWrapper()
        })
    }

    useEffect(() => {
        pageHeadingResize();
        const pageHeadingElm = document.querySelector(`#content-title .ant-page-header.ant-page-header-ghost > .ant-page-header-heading`);
        elementResizeEvent(pageHeadingElm, () => {
            pageHeadingResize();
        })
    }, []);

    useEffect(() => {
        pageHeadingResize();
    }, [listAction, arrAction]);

    useEffect(() => {
        setMaxWidthActionWrapper(size);
    }, [size.backIcon, size.pageHeading, size.subTitle, size.title])

    const renderContent = () => {
        const _listAction = listAction;
        let result = [];
        let existAction = false;
        let actionObj = null;

        _listAction.findIndex(item => item.idChucNang === actID.ACT_BACK) === -1 && _listAction.push({
            idChucNang: actID.ACT_BACK,
            name: "Quay lại",
            icon: `fa fa-reply`,
            hidden: true,
            handleClick: () => history.go(-1)
        })

        _listAction
            .filter((item) => {
                existAction = false;
                actionObj = null;
                arrAction.map((action) => {
                    if (action.key === item.idChucNang) {
                        existAction = true;
                        actionObj = action;
                    }
                    return null;
                });
                return existAction && actionObj !== null && !actionObj.hidden;
            })
            .map((item, i, arr) => {
                const itemClassName = `list-action-item ${arr.length - 1 === i ? "list-action-item-last" : ""}`
                existAction = false;
                actionObj = null;
                arrAction.map((action) => {
                    if (action.key === item.idChucNang) {
                        existAction = true;
                        actionObj = action;
                    }
                    return null;
                });
                if (actionObj.isConfirm) {
                    result.push(<ModalConfirm
                        shape={CONST_BTN_SHAPE_DEFAULT}
                        key={`modal-confirm-key-${i}`}
                        onMouseEnter={actionObj.onMouseEnter ? actionObj.onMouseEnter : null}
                        onMouseLeave={actionObj.onMouseLeave ? actionObj.onMouseLeave : null}
                        disabled={(actionObj.hasOwnProperty("disabled") && actionObj.disabled) || loading > 0}
                        tooltip={actionObj.tooltip}
                        btnType={actionObj.type}
                        beforeText={actionObj.beforeText}
                        text={actionObj.text || item.name}
                        afterText={actionObj.afterText}
                        title={actionObj.confirmTitle}
                        okText={actionObj.confirmOkText}
                        okType={actionObj.confirmOkType}
                        cancelText={actionObj.confirmCancelText}
                        onOk={actionObj.handleClick}
                        iconClass={`${actionObj.hasOwnProperty("iconClass") ? actionObj.iconClass : `${item.icon} `}`}
                    />);
                }
                else {
                    return result.push(<Tooltip title={actionObj.tooltip} key={`tooltip-key-${i}`}>
                        {
                            actionObj.dropdown && actionObj.dropdown.overlay ?
                                <Dropdown
                                    trigger={actionObj.dropdown.trigger || ["click"]}
                                    overlay={actionObj.dropdown.overlay || null}
                                    disabled={actionObj.disabled || loading > 0}
                                >
                                    <Button
                                        onMouseEnter={actionObj.onMouseEnter ? actionObj.onMouseEnter : null}
                                        onMouseLeave={actionObj.onMouseLeave ? actionObj.onMouseLeave : null}
                                        size={CONST_BTN_SIZE_DEFAULT}
                                        shape={CONST_BTN_SHAPE_DEFAULT}
                                        type={actionObj.type}
                                        disabled={actionObj.disabled || loading > 0}
                                        className={itemClassName}
                                    >
                                        <span className="header-action-icon">
                                            <i className={`${actionObj.hasOwnProperty("iconClass") ? actionObj.iconClass : `${item.icon}`}`} />
                                        </span>
                                        <span className="header-action-label">{actionObj.beforeText}{actionObj.text || item.name}{actionObj.afterText}<i className="fa fa-angle-down m-l-5" /></span>
                                    </Button>
                                </Dropdown>
                                :
                                <Button
                                    onMouseEnter={actionObj.onMouseEnter ? actionObj.onMouseEnter : null}
                                    onMouseLeave={actionObj.onMouseLeave ? actionObj.onMouseLeave : null}
                                    size={CONST_BTN_SIZE_DEFAULT}
                                    shape={CONST_BTN_SHAPE_DEFAULT}
                                    onClick={actionObj.handleClick}
                                    type={actionObj.type}
                                    disabled={actionObj.disabled || loading > 0}
                                    className={itemClassName}
                                >
                                    <span className="header-action-icon">
                                        <i className={`${actionObj.hasOwnProperty("iconClass") ? actionObj.iconClass : `${item.icon}`}`} />
                                    </span>
                                    <span className="header-action-label">{actionObj.beforeText}{actionObj.text || item.name}{actionObj.afterText}</span>
                                </Button>
                        }
                    </Tooltip>);
                }
                return result;
            })
        return result;
    }

    const getScrollLeft = (index) => {
        const elms = document.querySelectorAll("#action-wrapper>.list-action-item");
        let left = null;
        if (elms[index]) {
            left = elms[index].offsetLeft;
        }
        return (left >= 20 ? left - 20 : 0);
    }

    const scrollLeft = () => {
        const elm = document.getElementById("action-wrapper");
        const disabledHandle = elm.getAttribute("handle-scroll-disabled")
        const index = parseInt(elm.getAttribute("index") || "0");
        const _index = index <= 0 ? 0 : index - 1;
        const scrollLeft = getScrollLeft(_index);
        if (!disabledHandle || disabledHandle !== "left") {
            elm.setAttribute("index", `${_index}`);
            elm.scrollTo(scrollLeft, 0);
        }
    }

    const scrollRight = () => {
        const elm = document.getElementById("action-wrapper");
        const disabledHandle = elm.getAttribute("handle-scroll-disabled")
        const elms = document.querySelectorAll("#action-wrapper>.list-action-item");
        const index = parseInt(elm.getAttribute("index") || "0");
        const _index = index >= elms.length ? elms.length : index + 1;
        const scrollLeft = getScrollLeft(_index);
        if (!disabledHandle || disabledHandle !== "right") {
            elm.setAttribute("index", `${_index}`);
            elm.scrollTo(scrollLeft, 0);
        }
    }

    const onScroll = () => {
        const elm = document.getElementById("action-wrapper");
        const { scrollLeft, scrollWidth, clientWidth } = elm;
        if (scrollLeft === 0) {
            elm.setAttribute("handle-scroll-disabled", "left");
        }
        else if (scrollLeft + clientWidth === scrollWidth) {
            elm.setAttribute("handle-scroll-disabled", "right");
        }
        else {
            elm.removeAttribute("handle-scroll-disabled");
        }
    }

    return <Fragment>
        <div className="action-wrapper list-action" id="action-wrapper" onScroll={onScroll} index="0" >
            <span className="header-action-scroll header-action-scroll-left" onClick={scrollLeft}><i className="fa fa-angle-left" /></span>
            {renderContent()}
            <span className="header-action-scroll header-action-scroll-right" onClick={scrollRight}><i className="fa fa-angle-right" /></span>
        </div>
    </Fragment>
}

export default CommonActionWeb;