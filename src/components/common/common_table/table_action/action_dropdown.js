/**
 *  actions     |   Array [{...action1},{...actions2}]
 *  ex:
 *  action1:{
 *      idChucNang  |   Required : false
 *      sort        |   Number              default:    permission.sort
 *      label       |   String              default:    permission.name
 *      icon        |   String              default:    permission.icon
 *      confirm     |   Boolean             default:    false
 *      confirmLabel|   String | Node       default:    'Bạn chắc chắn muốn thao tác?'
 *      onClick     |   Function            default:    message('Thao tác chưa được định nghĩa')
 *      type        |   String('danger','success','primary','default')  Default:'default'
 *  }
 *  mode:   "dropdown","inline"     Default:"dropdown"
 */

import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Spin } from "antd";
import * as main from "./../../../../constants/main";
import TableActionOverlay from "./overlay";

const ActionDropdown = ({
    actions,
    getPopupContainer,
    firstLoad,
    onVisibleChange
}) => {
    const [_visiable, _setVisiable] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentClassName] = useState(main.createID())
    const _getPopupContainer = (e) => {
        if (getPopupContainer === false) {
            return document.body;
        }
        else if (getPopupContainer && typeof getPopupContainer === "function") {
            return getPopupContainer(e) || document.body;
        }
        const currentElm = document.getElementById(currentClassName);
        if (currentElm) {
            const tblId = currentElm.getAttribute("tbl-id");
            const elmScroll = document.querySelector(`${tblId ? `#${tblId} ` : ""}.table-custom .ant-table > .ant-table-content >.ant-table-scroll > .ant-table-body  > .ant-table-fixed`);
            return elmScroll || document.body
        }
        return document.body
    }

    return <React.Fragment>
        <Dropdown
            className="tbl-action-dropdown"
            overlay={() => {
                return <Spin spinning={loading}>
                    <TableActionOverlay
                        actions={actions}
                        setVisiable={_setVisiable}
                        getPopupContainer={_getPopupContainer}
                    />
                </Spin>
            }}
            trigger={["click"]}
            visible={_visiable}
            onVisibleChange={async (_visiable) => {
                _visiable && setLoading(true);
                onVisibleChange && await onVisibleChange(_visiable);
                _visiable && setLoading(false);
                _setVisiable(_visiable)
            }}
            placement="bottomRight"
            overlayClassName={`table-action-overlay ${currentClassName}`}
            disabled={firstLoad && actions.length === 0}
            getPopupContainer={_getPopupContainer}
        >
            <Button id={currentClassName}>
                <i className="fa fa-wrench m-r-5" />Thao tác<i className={`fa fa-angle-${_visiable ? "up" : "down"} m-l-10`} />
            </Button>
        </Dropdown>
    </React.Fragment >
}

export default ActionDropdown;