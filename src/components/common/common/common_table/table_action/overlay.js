import React from 'react';
import { Popconfirm, Tooltip } from "antd";

const TableActionOverlay = ({
    actions = [],
    getPopupContainer,
    setVisiable
}) => {
    return <ul
        className="ant-dropdown-menu ant-dropdown-menu-light ant-dropdown-menu-root ant-dropdown-menu-vertical action-table action-table-dropdown"
    >
        {actions.map((item) => {
            const disabled = item.disabled;
            return item.confirm ?
                <li
                    key={item.uid}
                    className={`ant-dropdown-menu-item action-table-item action-table-item-confirm ${disabled ? "ant-dropdown-menu-item-disabled" : ""}`}
                >
                    <Popconfirm
                        title={item.confirmLabel}
                        onConfirm={() => {
                            setVisiable(false);
                            item.onClick();
                        }}
                        okText="Đồng ý"
                        okType="danger"
                        cancelText="Hủy"
                        getPopupContainer={getPopupContainer}
                        disabled={item.disabled}
                    >
                        <Tooltip title={item.tooltip} getPopupContainer={getPopupContainer} mouseEnterDelay={0.5}>
                            <span className="action-table-item-content">
                                <i className={`${item.icon} ${item.label ? "m-r-5" : ""}`} />
                                {item.label}
                            </span>
                        </Tooltip>
                    </Popconfirm>
                </li> :
                <li
                    key={item.uid}
                    className={`ant-dropdown-menu-item action-table-item ${disabled ? "ant-dropdown-menu-item-disabled" : ""}`}
                    onClick={() => {
                        setVisiable(false);
                        item.onClick();
                    }}
                >
                    <Tooltip title={item.tooltip} getPopupContainer={getPopupContainer} mouseEnterDelay={0.5}>
                        <span className="action-table-item-content">
                            <i className={`${item.icon}  ${item.label ? "m-r-5" : ""}`} />
                            {item.label}
                        </span>
                    </Tooltip>
                </li>
        })}
    </ul>
}

export default TableActionOverlay;