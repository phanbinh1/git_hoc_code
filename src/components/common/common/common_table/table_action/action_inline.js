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

import React, { Fragment } from 'react';
import { Button, Popconfirm, Tooltip } from "antd";

const ActionInline = ({
    actions = [],
    getPopupContainer
}) => {
    return <Fragment>
        <div className="action-table-inline action-table">
            {actions.map((item) => {
                return item.confirm ?
                    <Tooltip key={`${item.uid}`} title={item.tooltip} mouseEnterDelay={0.5}>
                        <Popconfirm
                            className={`action-table-item`}
                            title={item.confirmLabel}
                            onConfirm={() => item.onClick()}
                            okText="Đồng ý"
                            okType="danger"
                            cancelText="Hủy"
                            getPopupContainer={getPopupContainer}
                            disabled={item.disabled}
                            placement="bottomRight"
                        >
                            <Button type={item.type} disabled={item.disabled} shape={item.shape} >
                                <i className={`${item.icon} ${item.label ? "m-r-5" : ""}`} />
                                {item.label}
                            </Button>
                        </Popconfirm>
                    </Tooltip> :
                    <Tooltip title={item.tooltip} mouseEnterDelay={0.5}>
                        <Button key={item.uid} type={item.type} disabled={item.disabled} className={`action-table-item`} shape={item.shape} onClick={() => item.onClick()} >
                            <i className={`${item.icon}  ${item.label ? "m-r-5" : ""}`} />
                            {item.label}
                        </Button>
                    </Tooltip>
            })}
        </div>
    </Fragment >
}
export default ActionInline;