import React, { Fragment } from "react";
import { CommonFieldset } from "../../../common";
import { Button } from "antd";
import { deepDiffMapper } from "../../../../constants/main";

const ActionBar = ({
    selected = [],
    onSelect,
    onUnselect,
    accountSelected = [],
    rowKey = "id"
}) => {
    return <Fragment>
        <CommonFieldset className="m-b-10 t-right">
            <Button disabled={selected.length === 0} onClick={onUnselect} className="m-r-10">
                <i className="fa fa-times m-r-5" /> Bỏ chọn ({selected.length})
            </Button>
            <Button type="primary" disabled={deepDiffMapper.equal(selected.map(item => item[rowKey]).sort(), accountSelected.map(item => item[rowKey]).sort())} onClick={onSelect}>
                <i className="fa fa-check m-r-5" /> Chọn ({selected.length})
            </Button>
        </CommonFieldset>
    </Fragment>
}

export default ActionBar;