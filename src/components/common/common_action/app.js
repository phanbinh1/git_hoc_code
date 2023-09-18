import React, { Fragment } from 'react';
import { Dropdown, Menu } from "antd";
import * as actID from "./../../../constants/action_id";
import history from "./../../../App";

export const CONST_BTN_SIZE_DEFAULT = "default"
export const CONST_BTN_SHAPE_DEFAULT = undefined;
export const CONST_BTN_CLS_DEFAULT = "btn-header-page-action";

const CommonActionApp = ({ loading = 0, listAction = [], arrAction = [] }) => {
    const renderContent = () => {
        const _listAction = listAction;
        let result = [];
        let existAction = false;
        let actionObj = null;
        _listAction.findIndex(item => item.idChucNang === actID.ACT_BACK) === -1 && _listAction.push({
            idChucNang: actID.ACT_BACK,
            name: "Quay lại",
            icon: "fa fa-reply m-r-5",
            hidden: true,
            handleClick: () => history.go(-1)
        })

        _listAction.map((item, key) => {
            existAction = false;
            actionObj = null;
            arrAction.map((action) => {
                if (action.key === item.idChucNang) {
                    existAction = true;
                    actionObj = action;
                }
                return null;
            });
            if (existAction && actionObj !== null && !actionObj.hidden) {
                if (actionObj.isConfirm) {
                    // result.push(<ModalConfirm
                    //     key={`modal-confirm-key-${key}`}
                    //     onMouseEnter={actionObj.onMouseEnter ? actionObj.onMouseEnter : null}
                    //     onMouseLeave={actionObj.onMouseLeave ? actionObj.onMouseLeave : null}
                    //     disabled={(actionObj.hasOwnProperty("disabled") && actionObj.disabled) || loading > 0}
                    //     tooltip={actionObj.tooltip}
                    //     btnType={actionObj.type}
                    //     beforeText={actionObj.beforeText}
                    //     text={actionObj.text || item.name}
                    //     afterText={actionObj.afterText}
                    //     title={actionObj.confirmTitle}
                    //     okText={actionObj.confirmOkText}
                    //     okType={actionObj.confirmOkType}
                    //     cancelText={actionObj.confirmCancelText}
                    //     onOk={actionObj.handleClick}
                    //     iconClass={actionObj.hasOwnProperty("iconClass") ? actionObj.iconClass : `${item.icon} m-r-10`}
                    // />);
                }
                else {
                    if (actionObj.dropdown && actionObj.dropdown.overlay) {
                        result.push(<Menu.SubMenu
                            onMouseEnter={actionObj.onMouseEnter ? actionObj.onMouseEnter : undefined}
                            onMouseLeave={actionObj.onMouseLeave ? actionObj.onMouseLeave : undefined}
                            disabled={actionObj.disabled || loading > 0}
                            className="list-action-item"
                            title={<Fragment>
                                <i className={actionObj.hasOwnProperty("iconClass") ? actionObj.iconClass : `${item.icon} m-r-5`} />
                                <span>
                                    {actionObj.hasOwnProperty("beforeText") && actionObj.beforeText}
                                    {actionObj.hasOwnProperty("text") ? actionObj.text : item.name}
                                    {actionObj.hasOwnProperty("afterText") && actionObj.afterText}
                                </span>
                            </Fragment>}
                            popupClassName="action-popup-container"
                        >
                            {actionObj.dropdown.overlay}
                        </Menu.SubMenu>)
                    }
                    else {
                        result.push(<Menu.Item
                            onMouseEnter={actionObj.onMouseEnter ? actionObj.onMouseEnter : undefined}
                            onMouseLeave={actionObj.onMouseLeave ? actionObj.onMouseLeave : undefined}
                            onClick={actionObj.handleClick}
                            disabled={actionObj.disabled || loading > 0}
                            className="list-action-item"
                        >
                            <i className={actionObj.hasOwnProperty("iconClass") ? actionObj.iconClass : `${item.icon} m-r-5`} />
                            <span>
                                {actionObj.hasOwnProperty("beforeText") && actionObj.beforeText}
                                {actionObj.hasOwnProperty("text") ? actionObj.text : item.name}
                                {actionObj.hasOwnProperty("afterText") && actionObj.afterText}
                            </span>
                        </Menu.Item>)
                    }
                }
            }
            return result;
        })
        return result;
    }

    return <Fragment>
        <div className="action-wrapper list-action" id="action-wrapper">
            {
                renderContent().length > 0 ?
                    <Dropdown trigger={["click"]} overlay={<Menu>{renderContent()}</Menu>}>
                        <div style={{ display: "inline-block", height: "100%", paddingTop: "5px" }}>
                            <i className="fa fa-2x fa-bars c-pointer" />
                        </div>
                    </Dropdown>
                    : null
            }
        </div>
    </Fragment>
}

export default CommonActionApp;