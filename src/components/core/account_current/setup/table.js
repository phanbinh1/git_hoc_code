import React, { Fragment } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Switch } from "antd";
import * as constants from "./../../../../constants/constants";
import * as act from "./../../../../actions";

const SetupTable = () => {

    const dispatch = useDispatch();
    const handleChangeLayout = (value = {}) => {
        dispatch(act.handleChangeLayout(value));
    }

    const config = useSelector(state => state.core.config);
    const { table } = config

    const handleChangeTableStyle = (tableStyle = {}) => {
        var value = { ...table, ...tableStyle };
        handleChangeLayout({
            key: constants.CONST_LAYOUT_KEY_TABLE,
            value
        });
    }

    return <Fragment>
        <div className="config-item" onClick={() => handleChangeTableStyle({ fullText: !table.fullText })}>
            Chỉ hiển thị trên 1 dòng
                <Switch
                size="small"
                checked={!table.fullText}
                checkedChildren={<i className="fa fa-check" />}
                unCheckedChildren={<i className="fa fa-times" />}
                className="config-item-switch-right"
            />
        </div>
        <div className="config-item" onClick={() => handleChangeTableStyle({ allowCopy: !table.allowCopy })}>
            Cho phép sao chép khi click
                    <Switch
                size="small"
                checked={table.allowCopy}
                checkedChildren={<i className="fa fa-check" />}
                unCheckedChildren={<i className="fa fa-times" />}
                className="config-item-switch-right"
            />
        </div>
    </Fragment >
}

export default SetupTable;