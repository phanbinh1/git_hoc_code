import React from "react";
import { Menu } from "antd";
import * as main from "./../../../../constants/main";

export default ({
    col,
    pageKey,
    setColumns,
    expanded
}) => {
    if (!col || !pageKey || !setColumns) {
        return null;
    }
    let columnsFormats = main.getColumnsLocalStorage({ pageKey }).format;
    const clearFormatDisabled = Object.keys(col._format).length === 0;

    const _setColumns = (columns = [], colKey, format = {}) => {
        return columns.map(item => {
            if (item.colKey === colKey) {
                item._format = format;
            }
            return {
                ...item,
                children: Array.isArray(item.children) ? _setColumns(item.children, colKey, format) : undefined
            }
        })
    }


    return <Menu style={{ width: 200 }} className="ant-dropdown-menu">
        <li
            className="ant-dropdown-menu-item"
            key="text-bold"
            onClick={() => {
                const format = { ...col._format, font_b: !col._format.font_b }
                columnsFormats[col.colKey] = format;
                main.setColumnsLocalStorage({ columnsFormat: { ...columnsFormats }, pageKey })
                setColumns(columns => _setColumns(columns, col.colKey, format))
            }}
        >
            <i className={`fa fa-check m-r-10 ${col._format.font_b ? "fa-show" : "fa-hide"} `} />
            <i className="fa fa-bold m-r-5" />
            <b>In đậm</b>
        </li>
        <li
            key="text-italic"
            className="ant-dropdown-menu-item"
            onClick={() => {
                const format = { ...col._format, font_i: !col._format.font_i }
                columnsFormats[col.colKey] = format;
                main.setColumnsLocalStorage({ columnsFormat: { ...columnsFormats }, pageKey })
                setColumns(columns => _setColumns(columns, col.colKey, format))
            }}
        >
            <i className={`fa fa-check m-r-10 ${col._format.font_i ? "fa-show" : "fa-hide"} `} />
            <i className="fa fa-italic m-r-5" />
            <i>In nghiêng</i>
        </li>
        <li
            key="text-underline"
            className="ant-dropdown-menu-item"
            onClick={() => {
                const format = { ...col._format, font_u: !col._format.font_u }
                columnsFormats[col.colKey] = format;
                main.setColumnsLocalStorage({ columnsFormat: { ...columnsFormats }, pageKey })
                setColumns(columns => _setColumns(columns, col.colKey, format))
            }}
        >
            <i className={`fa fa-check m-r-10 ${col._format.font_u ? "fa-show" : "fa-hide"} `} />
            <i className="fa fa-underline m-r-5" />
            <u>Gạch chân</u>
        </li>
        <Menu.Divider />
        <Menu.SubMenu
            key="text-align"
            className="ant-dropdown-submenu-item"
            title={
                <span>
                    <i className={`fa fa-check m-r-10 fa-hide `} />
                    <i className="fa fa-align-justify m-r-5" />
                    <span>Căn chỉnh</span>
                </span>
            }
        >
            <li
                key="text-align-left"
                className="ant-dropdown-menu-item"
                onClick={() => {
                    const format = { ...col._format, text_align: col._format && col._format.text_align !== "left" ? "left" : undefined }
                    columnsFormats[col.colKey] = format;
                    main.setColumnsLocalStorage({ columnsFormat: { ...columnsFormats }, pageKey })
                    setColumns(columns => _setColumns(columns, col.colKey, format))
                }}
            >
                <i className={`fa fa-check m-r-10 ${col._format.text_align === "left" ? "fa-show" : "fa-hide"} `} />
                <i className="fa fa-align-left m-r-5" />
                <span>Trái</span>
            </li>
            <Menu.Item
                key="text-align-center"
                className="ant-dropdown-menu-item"
                onClick={() => {
                    const format = { ...col._format, text_align: col._format && col._format.text_align !== "center" ? "center" : undefined }
                    columnsFormats[col.colKey] = format;
                    main.setColumnsLocalStorage({ columnsFormat: { ...columnsFormats }, pageKey })
                    setColumns(columns => _setColumns(columns, col.colKey, format))
                }}
            >
                <i className={`fa fa-check m-r-10 ${col._format.text_align === "center" ? "fa-show" : "fa-hide"} `} />
                <i className="fa fa-align-center m-r-5" />
                <span>Giữa</span>
            </Menu.Item>
            <Menu.Item
                key="text-align-right"
                className="ant-dropdown-menu-item"
                onClick={() => {
                    const format = { ...col._format, text_align: col._format && col._format.text_align !== "right" ? "right" : undefined }
                    columnsFormats[col.colKey] = format;
                    main.setColumnsLocalStorage({ columnsFormat: { ...columnsFormats }, pageKey })
                    setColumns(columns => _setColumns(columns, col.colKey, format))
                }}
            >
                <i className={`fa fa-check m-r-10 ${col._format.text_align === "right" ? "fa-show" : "fa-hide"} `} />
                <i className="fa fa-align-right m-r-5" />
                <span>Phải</span>
            </Menu.Item>
        </Menu.SubMenu>
        <Menu.Divider />
        <Menu.SubMenu
            key="col-fixed"
            className="ant-dropdown-submenu-item"
            title={<span><i className={`fa fa-check m-r-10 fa-hide `} />Cố định</span>}
            disabled={col._level !== 1 || expanded}
        >
            <Menu.Item
                key="col-fixed-left"
                className="ant-dropdown-menu-item"
                onClick={() => {
                    const format = { ...col._format, fixed: col._format && col._format.fixed !== "left" ? "left" : false }
                    columnsFormats[col.colKey] = format;
                    main.setColumnsLocalStorage({ columnsFormat: { ...columnsFormats }, pageKey })
                    setColumns(columns => _setColumns(columns, col.colKey, format))
                }}
            >
                <i className={`fa fa-check m-r-10 ${col._format.fixed === "left" ? "fa-show" : "fa-hide"} `} />
                <span>Trái</span>
            </Menu.Item>
            <Menu.Item
                key="col-fixed-right"
                className="ant-dropdown-menu-item"
                onClick={() => {
                    const format = { ...col._format, fixed: col._format && col._format.fixed !== "right" ? "right" : false }
                    columnsFormats[col.colKey] = format;
                    main.setColumnsLocalStorage({ columnsFormat: { ...columnsFormats }, pageKey })
                    setColumns(columns => _setColumns(columns, col.colKey, format))
                }}
            >
                <i className={`fa fa-check m-r-10 ${col._format.fixed === "right" ? "fa-show" : "fa-hide"} `} />
                <span>Phải</span>
            </Menu.Item>
        </Menu.SubMenu>
        <Menu.Divider />
        <Menu.Item
            disabled={clearFormatDisabled}
            className="ant-dropdown-menu-item"
            key="remove-format"
            onClick={() => {
                const format = {}
                columnsFormats[col.colKey] = format;
                main.setColumnsLocalStorage({ columnsFormat: { ...columnsFormats }, pageKey })
                setColumns(columns => _setColumns(columns, col.colKey, format))
            }}
        >
            <i className={`fa fa-check m-r-10 fa-hide `} />
            <i className="fa fa-eraser m-r-5" />
            <span>Xóa định dạng</span>
        </Menu.Item>
    </Menu >
}