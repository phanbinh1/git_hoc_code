import React, { Fragment } from "react";
import { useSelector } from 'react-redux';
import { Switch } from "antd";

const SetupMenu = ({ handleChangeMenuStyle }) => {

    const config = useSelector(state => state.core.config);
    const { menu_left } = config

    const m2Disabled = menu_left.mode === "vertical" || !menu_left.resize;
    const m3Disabled = menu_left.mode === "vertical";
    const m4Disabled = menu_left.mode !== "inline";
    return <Fragment>
        <div className="config-item" onClick={() => handleChangeMenuStyle({ mode: menu_left.mode === "vertical" ? "inline" : "vertical" })}>
            Thu nhỏ menu
                <Switch
                size="small"
                checked={menu_left.mode === "vertical"}
                checkedChildren={<i className="fa fa-check" />}
                unCheckedChildren={<i className="fa fa-times" />}
                className="config-item-switch-right"
            />
        </div>
        <div className={`config-item ${m2Disabled ? "config-item-disabled" : ""}`} onClick={() => !m2Disabled && handleChangeMenuStyle({ autoZoomOut: !menu_left.autoZoomOut })}>
            Tự động thu nhỏ menu
                <Switch
                size="small"
                checked={menu_left.autoZoomOut}
                checkedChildren={<i className="fa fa-check" />}
                unCheckedChildren={<i className="fa fa-times" />}
                className="config-item-switch-right"
                disabled={m2Disabled}
            />
        </div>
        <div className={`config-item ${m3Disabled ? "config-item-disabled" : ""}`} onClick={() => !m3Disabled && handleChangeMenuStyle({ resize: !menu_left.resize })}>
            Thay đổi độ rộng
                <Switch
                size="small"
                checked={menu_left.resize}
                checkedChildren={<i className="fa fa-check" />}
                unCheckedChildren={<i className="fa fa-times" />}
                className="config-item-switch-right"
                disabled={m3Disabled}
            />
        </div>
        <div className={`config-item ${m4Disabled ? "config-item-disabled" : ""}`} onClick={() => !m4Disabled && handleChangeMenuStyle({ fullText: !menu_left.fullText })}>
            Full text
                <Switch
                size="small"
                checked={menu_left.fullText}
                checkedChildren={<i className="fa fa-check" />}
                unCheckedChildren={<i className="fa fa-times" />}
                disabled={m4Disabled}
                className="config-item-switch-right"
            />
        </div>
    </Fragment >
}

export default SetupMenu;